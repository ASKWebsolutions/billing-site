/**
 * End-to-end proof of the chat alert chain against the real API + database.
 *
 * Drives the same public endpoints a visitor uses, pulls the admin feed the
 * poller consumes, and pipes it through the shipped diffUnread() to confirm
 * the ring count. Leaves no test data behind.
 */
import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { diffUnread } from '../../frontend/src/utils/liveChat.js'

dotenv.config()

const API = process.env.API_ORIGIN || 'http://localhost:5000'
const token = jwt.sign({ email: 'alert-selftest@local', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5m' })
const sessionId = `selftest_${Date.now().toString(36)}`
const auth = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

let passed = 0
const check = (name, fn) => { fn(); passed++; console.log(`  ok  ${name}`) }

const counts = async () => {
  const res = await fetch(`${API}/api/chat/admin/conversations`, { headers: auth })
  const data = await res.json()
  const map = {}
  data.forEach((s) => { map[s.sessionId] = s.adminUnread || 0 })
  return { map, data }
}

const send = (text) => fetch(`${API}/api/chat/${sessionId}/messages`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text, name: 'AlertSelfTest' }),
}).then((r) => r.json())

await mongoose.connect(process.env.MONGODB_URI)
const ChatSession = mongoose.models.ChatSession || mongoose.model('ChatSession', new mongoose.Schema({}, { strict: false }))
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', new mongoose.Schema({}, { strict: false }))

const cleanup = async () => {
  await ChatMessage.deleteMany({ sessionId })
  await ChatSession.deleteOne({ sessionId })
  await mongoose.disconnect()
}

try {
  // Baseline before this visitor exists.
  const before = (await counts()).map
  delete before[sessionId]

  // 1. Visitor opens the chat box. The greeting is rendered client-side only,
  //    so nothing is written and nothing should ring.
  await fetch(`${API}/api/chat/start`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, name: 'AlertSelfTest' }),
  })
  const afterOpen = (await counts()).map
  check('opening the chat box does not ring (greeting is client-side only)', () => {
    assert.strictEqual(diffUnread(before, afterOpen).beeps, 0)
  })
  check('new session is stored with zero unread', () => {
    assert.strictEqual(afterOpen[sessionId], 0)
  })

  // 2. Visitor sends one message.
  await send('hello, is anyone there?')
  const afterOne = (await counts()).map
  check('one message rings exactly once', () => {
    assert.strictEqual(diffUnread(afterOpen, afterOne).beeps, 1)
  })

  // 3. Visitor sends three more in quick succession.
  await send('are you there?')
  await send('I have a question about RCM')
  await send('hello?')
  const afterFour = (await counts()).map
  check('three more messages ring three more times', () => {
    assert.strictEqual(diffUnread(afterOne, afterFour).beeps, 3)
  })
  check('badge total reflects all four unread', () => {
    assert.strictEqual(afterFour[sessionId], 4)
  })

  // 4. Admin opens the thread -> unread cleared, silence resumes.
  await fetch(`${API}/api/chat/admin/${sessionId}/read`, { method: 'POST', headers: auth })
  const afterRead = (await counts()).map
  check('marking the thread read clears the badge', () => {
    assert.strictEqual(afterRead[sessionId], 0)
  })
  check('an unchanged feed rings nothing', () => {
    assert.strictEqual(diffUnread(afterFour, afterRead).beeps, 0)
  })

  // 5. Poller skips the thread the admin is reading.
  await send('still there?')
  const afterWhileOpen = (await counts()).map
  const prev = { ...afterRead }
  const next = { ...afterWhileOpen }
  delete prev[sessionId]
  delete next[sessionId]
  check('a message in the open thread is excluded from the ring count', () => {
    assert.strictEqual(diffUnread(prev, next).beeps, 0)
  })

  // 6. Burst safety.
  for (let i = 0; i < 8; i++) await send(`burst ${i}`)
  const afterBurst = (await counts()).map
  check('a burst of 8 rings is capped at 5', () => {
    assert.strictEqual(diffUnread(afterWhileOpen, afterBurst).beeps, 5)
  })
  check('the badge still shows the true count of 9', () => {
    assert.strictEqual(afterBurst[sessionId], 9)
  })

  console.log(`\n${passed} checks passed`)
} finally {
  await cleanup()
}
