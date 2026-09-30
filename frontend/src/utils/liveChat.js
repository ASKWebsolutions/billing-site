import { useState, useEffect } from 'react'

export const API = import.meta.env?.VITE_API_URL || 'http://localhost:5000'

export function getSessionId() {
  let id = localStorage.getItem('mbx_chat_session')
  if (!id) {
    id = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem('mbx_chat_session', id)
  }
  return id
}

let unread = 0
const listeners = new Set()

export function setUnreadCount(n) {
  unread = n
  listeners.forEach((fn) => fn(unread))
}

export function getUnreadCount() {
  return unread
}

export function subscribeUnread(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useUnreadCount() {
  const [count, setCount] = useState(unread)
  useEffect(() => subscribeUnread(setCount), [])
  return count
}

// ── Active conversation ─────────────────────────────────────────────────────
// The thread the admin currently has open. Alerts skip it so nobody gets
// rung for a message they are already reading.
let activeSession = null
const sessionListeners = new Set()

export function setActiveSession(sessionId) {
  if (activeSession === sessionId) return
  activeSession = sessionId
  sessionListeners.forEach((fn) => fn(activeSession))
}

export function getActiveSession() {
  return activeSession
}

export function subscribeActiveSession(fn) {
  sessionListeners.add(fn)
  return () => sessionListeners.delete(fn)
}

export function useActiveSession() {
  const [id, setId] = useState(activeSession)
  useEffect(() => subscribeActiveSession(setId), [])
  return id
}

// ── Alert diffing ───────────────────────────────────────────────────────────
// A backgrounded tab throttles polling to ~1/min, so a burst of 20 messages
// would otherwise queue 20 rings. Cap the burst; the badge still shows the
// true unread count.
export const MAX_BEEPS_PER_CYCLE = 5

export function diffUnread(prev = {}, next = {}) {
  let beeps = 0
  let top = null
  let topDelta = 0

  for (const [id, raw] of Object.entries(next)) {
    const current = raw || 0
    const before = prev[id] || 0
    if (current <= before) continue
    const delta = current - before
    beeps += delta
    if (delta > topDelta) {
      topDelta = delta
      top = id
    }
  }

  return { beeps: Math.min(beeps, MAX_BEEPS_PER_CYCLE), top }
}

// ── Audio ───────────────────────────────────────────────────────────────────
// Browsers refuse to make noise until the user has interacted with the page.
// The context must therefore be created AND resumed inside a real gesture —
// creating it from a polling timer leaves it suspended and every alarm is
// silent.
let audioCtx = null
let audioUnlocked = false
let ringQueueUntil = 0
const unlockListeners = new Set()

function ensureCtx() {
  if (audioCtx) return audioCtx
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  audioCtx = new Ctor()
  return audioCtx
}

export function isAudioUnlocked() {
  return audioUnlocked
}

export function onAudioUnlocked(fn) {
  if (audioUnlocked) {
    fn(true)
    return () => {}
  }
  unlockListeners.add(fn)
  return () => unlockListeners.delete(fn)
}

export async function unlockAudio() {
  const ctx = ensureCtx()
  if (!ctx) return false
  try {
    if (ctx.state === 'suspended') await ctx.resume()
    // Safari keeps the context locked until a buffer has actually played,
    // even after resume(). A one-sample silent buffer forces it open.
    if (!audioUnlocked) {
      const source = ctx.createBufferSource()
      source.buffer = ctx.createBuffer(1, 1, ctx.sampleRate)
      source.connect(ctx.destination)
      source.onended = () => source.disconnect()
      source.start(0)
    }
    audioUnlocked = ctx.state === 'running'
  } catch {
    audioUnlocked = false
  }

  if (audioUnlocked) {
    unlockListeners.forEach((fn) => fn(true))
    unlockListeners.clear()
  }
  return audioUnlocked
}

/** Latches audio open on the visitor's/admin's first click or keypress. */
export function installAudioUnlock() {
  const events = ['pointerdown', 'keydown', 'touchstart']
  let done = false

  const handler = () => {
    if (done) return
    done = true
    events.forEach((e) => window.removeEventListener(e, handler))
    unlockAudio()
  }

  events.forEach((e) => window.addEventListener(e, handler, { passive: true }))
  return () => {
    done = true
    events.forEach((e) => window.removeEventListener(e, handler))
  }
}

// Phone-style "ring-ring" — two bursts, each a pair of rising notes.
const RING_NOTES = [
  { offset: 0.0, freq: 988, dur: 0.15 },
  { offset: 0.19, freq: 1319, dur: 0.15 },
  { offset: 0.44, freq: 988, dur: 0.15 },
  { offset: 0.63, freq: 1319, dur: 0.15 },
]
const RING_DURATION = 0.9
const RING_SPACING = 1.3

function ringOnce(ctx, startAt, volume) {
  for (const { offset, freq, dur } of RING_NOTES) {
    const t = startAt + offset
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.00001, t)
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.02)
    gain.gain.setValueAtTime(volume, t + dur - 0.05)
    gain.gain.exponentialRampToValueAtTime(0.00001, t + dur)
    osc.start(t)
    osc.stop(t + dur + 0.02)
    osc.onended = () => {
      osc.disconnect()
      gain.disconnect()
    }
  }
}

/** Rings once per unread visitor message, queued so rings never overlap. */
export function playAlarm(count = 1) {
  const ctx = ensureCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') unlockAudio()

  const rings = Math.max(1, Math.min(MAX_BEEPS_PER_CYCLE, Math.floor(count) || 1))
  const start = Math.max(ctx.currentTime + 0.02, ringQueueUntil)
  for (let i = 0; i < rings; i++) ringOnce(ctx, start + i * RING_SPACING, 0.22)
  ringQueueUntil = start + (rings - 1) * RING_SPACING + RING_DURATION
}

export async function startChatSession(name = '') {
  return fetch(`${API}/api/chat/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: getSessionId(), name }),
  }).then((r) => r.json())
}

export async function sendVisitorMessage(text, name = '') {
  return fetch(`${API}/api/chat/${getSessionId()}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, name }),
  }).then((r) => r.json())
}

export async function fetchVisitorMessages(after) {
  const q = after ? `?after=${encodeURIComponent(after)}` : ''
  return fetch(`${API}/api/chat/${getSessionId()}/messages${q}`).then((r) => r.json())
}

export async function markVisitorRead() {
  return fetch(`${API}/api/chat/${getSessionId()}/read`, { method: 'POST' })
}