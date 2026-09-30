import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import {
  setUnreadCount, playAlarm, installAudioUnlock, isAudioUnlocked, onAudioUnlocked,
  unlockAudio, getActiveSession, diffUnread,
} from '../../utils/liveChat'
import { Headset, BellRing } from 'lucide-react'
import { handleUnauthorized } from '../../utils/adminApi'

const API = import.meta.env?.VITE_API_URL || 'http://localhost:5000'

/**
 * Site-wide (admin-only) watcher for live-chat activity. Renders nothing until
 * a visitor message actually arrives, so it can sit at the app root while a
 * signed-in admin browses the public site.
 */
export default function ChatAlarmPoller() {
  const { token } = useAuth()
  const [toast, setToast] = useState(null)
  const [audioReady, setAudioReady] = useState(() => isAudioUnlocked())
  const prevCountsRef = useRef({})
  const initializedRef = useRef(false)
  const dismissTimerRef = useRef(null)

  const scheduleDismiss = useCallback(() => {
    clearTimeout(dismissTimerRef.current)
    dismissTimerRef.current = setTimeout(() => setToast(null), 6000)
  }, [])

  const showToast = useCallback((text) => {
    setToast({ id: Date.now(), text })
    scheduleDismiss()
  }, [scheduleDismiss])

  useEffect(() => onAudioUnlocked(setAudioReady), [])

  const poll = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch(`${API}/api/chat/admin/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (handleUnauthorized(res)) return
      const data = await res.json()
      if (!Array.isArray(data)) return

      const nowCounts = {}
      let total = 0
      data.forEach((s) => {
        const unread = s.adminUnread || 0
        nowCounts[s.sessionId] = unread
        total += unread
      })
      setUnreadCount(total)

      // First poll after mount: snapshot silently, never alarm on backlog.
      if (!initializedRef.current) {
        initializedRef.current = true
        prevCountsRef.current = nowCounts
        return
      }

      // Skip whichever thread the admin is reading right now.
      const active = getActiveSession()
      const prev = { ...prevCountsRef.current }
      const next = { ...nowCounts }
      if (active) {
        delete prev[active]
        delete next[active]
      }
      prevCountsRef.current = nowCounts

      // A brand-new session has adminUnread 0, so opening the chat box never
      // rings — only a real visitor message does.
      const { beeps, top } = diffUnread(prev, next)
      if (beeps === 0) return

      playAlarm(beeps)
      const who = (top && data.find((s) => s.sessionId === top)?.visitorName) || 'a visitor'
      showToast(beeps > 1 ? `${beeps} new messages from ${who}` : `New message from ${who}`)
    } catch { /* ignore network errors */ }
  }, [token, showToast])

  useEffect(() => {
    const uninstall = installAudioUnlock()
    const first = setTimeout(poll, 0)
    const id = setInterval(poll, 4000)
    return () => {
      uninstall()
      clearTimeout(first)
      clearInterval(id)
      clearTimeout(dismissTimerRef.current)
    }
  }, [poll])

  const dismiss = () => {
    clearTimeout(dismissTimerRef.current)
    setToast(null)
  }

  if (!token) return null

  return (
    <>
      {/* Only shown while the browser is still holding audio locked; once the
          admin clicks anything the latching listener takes over. */}
      <AnimatePresence>
        {!audioReady && (
          <motion.button
            key="unlock"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => { unlockAudio(); setAudioReady(isAudioUnlocked()) }}
            className="fixed bottom-6 left-6 z-[100] flex items-center gap-2.5 rounded-2xl border border-[#4486BF]/25 bg-white px-4 py-3 text-left shadow-2xl shadow-[#0B2348]/15"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#4486BF] text-white">
              <BellRing size={17} />
            </span>
            <span>
              <span className="block text-xs font-bold text-[#0B2348]">Enable chat alerts</span>
              <span className="block text-[11px] text-[#5A6B82]">Click once so new chats can ring</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.button
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            className="fixed top-20 right-4 md:right-6 z-[100] flex items-center gap-3 rounded-2xl border border-[#4486BF]/25 bg-white px-5 py-4 shadow-2xl shadow-[#0B2348]/15"
          >
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#4486BF] text-white">
              <Headset size={18} />
              <span className="absolute -top-1 -right-1 flex size-4 animate-pulse items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                !
              </span>
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold text-[#0B2348]">{toast.text}</span>
              <span className="block text-[11px] text-[#5A6B82]">Open Live Chat to reply</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
