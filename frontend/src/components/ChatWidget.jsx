import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Headset, Send, X, MessageSquareText } from 'lucide-react'
import {
  startChatSession, sendVisitorMessage, fetchVisitorMessages, markVisitorRead,
} from '../utils/liveChat'

const WHATSAPP_URL = 'https://wa.me/15597777919'

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ChatWidget() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(null) // null | 'menu' | 'chat'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const lastAtRef = useRef(null)
  const listRef = useRef(null)

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
    })
  }, [])

  const openChat = useCallback(async () => {
    setMode('chat')
    setMenuOpen(false)
    await startChatSession(name).catch(() => {})
    try {
      const data = await fetchVisitorMessages()
      if (Array.isArray(data)) {
        setMessages(data)
        if (data.length > 0) lastAtRef.current = data[data.length - 1].createdAt
      }
    } catch { /* ignore */ }
  }, [name])

  const poll = useCallback(async () => {
    if (mode !== 'chat') return
    try {
      const data = await fetchVisitorMessages(lastAtRef.current)
      if (Array.isArray(data) && data.length > 0) {
        const newest = data[data.length - 1]
        lastAtRef.current = newest.createdAt
        setMessages((prev) => {
          const seen = new Set(prev.map((m) => m._id))
          return [...prev, ...data.filter((m) => !seen.has(m._id))]
        })
        if (data.some((m) => m.sender === 'admin')) markVisitorRead().catch(() => {})
      }
    } catch { /* ignore */ }
  }, [mode])

  useEffect(() => {
    if (mode !== 'chat') return
    const id = setInterval(poll, 2500)
    return () => clearInterval(id)
  }, [mode, poll])

  useEffect(() => {
    scrollBottom()
  }, [messages, scrollBottom])

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    setInput('')
    try {
      const msg = await sendVisitorMessage(text, name)
      if (msg && msg._id) {
        lastAtRef.current = msg.createdAt
        setMessages((prev) => [...prev, msg])
      }
    } catch { /* ignore */ } finally {
      setSending(false)
    }
  }

  const firstOpen = mode === null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popover: menu or chat */}
      <AnimatePresence mode="wait">
        {mode === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="w-72 max-w-[calc(100vw-2.5rem)] origin-bottom-right overflow-hidden rounded-2xl border border-white/20 bg-[#0B2348] shadow-2xl shadow-[#0B2348]/40"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-sm font-extrabold text-white">Talk to MBX Solutions</p>
              <p className="mt-0.5 text-xs text-white/60">Choose how you'd like to chat</p>
            </div>
            <div className="p-2.5 space-y-1.5">
              <button
                onClick={openChat}
                className="flex w-full items-center gap-3.5 rounded-xl bg-white/[0.06] px-4 py-3.5 text-left transition-all hover:bg-white/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#4486BF] text-white">
                  <Headset size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">Real Time Customer Support</span>
                  <span className="block text-xs text-white/50">Chat live with our team</span>
                </span>
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setMenuOpen(false); setMode(null) }}
                className="flex w-full items-center gap-3.5 rounded-xl bg-white/[0.06] px-4 py-3.5 text-left transition-all hover:bg-white/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  {WHATSAPP_ICON}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">WhatsApp</span>
                  <span className="block text-xs text-white/50">Message us on WhatsApp</span>
                </span>
              </a>
            </div>
          </motion.div>
        )}

        {mode === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex h-[440px] w-[calc(100vw-2.5rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-[#0B2348]/40"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#4486BF] px-4 py-3.5">
              <span className="relative flex size-9 items-center justify-center rounded-full bg-white/15 text-white">
                <Headset size={17} />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#25D366] ring-2 ring-[#4486BF]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-white">MBX Live Support</p>
                <p className="truncate text-[11px] text-white/70">Online now — replies in minutes</p>
              </div>
              <button
                onClick={() => { setMode(null); setMenuOpen(false) }}
                aria-label="Close chat"
                className="flex size-8 items-center justify-center rounded-lg text-white/70 transition-all hover:bg-white/15 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F3F7FB] px-4 py-4">
              {messages.length === 0 && (
                <div className="rounded-xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-[#0B2348] shadow-sm">
                  Hi! Welcome to MBX Solutions 👋 How can we help you today?
                </div>
              )}
              {messages.map((m) => (
                <div key={m._id} className={`flex ${m.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.sender === 'visitor'
                        ? 'rounded-tr-sm bg-[#4486BF] text-white'
                        : 'rounded-tl-sm bg-white text-[#0B2348]'
                    }`}
                  >
                    {m.text}
                    <p className={`mt-1 text-[10px] ${m.sender === 'visitor' ? 'text-white/60' : 'text-[#8A94A6]'}`}>
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Name input (first time only) */}
            {messages.length === 0 && (
              <div className="border-t border-[#E4EAF2] bg-white px-4 pt-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full rounded-xl border border-[#DDE5EE] bg-[#F7FAFC] px-3.5 py-2 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF]"
                />
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[#E4EAF2] bg-white px-3 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-[#DDE5EE] bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#4486BF] text-white transition-all hover:bg-[#3a73a8] disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill button */}
      <button
        onClick={() => {
          if (mode === 'chat') return
          if (firstOpen) { setMenuOpen(true); setMode('menu'); return }
          setMenuOpen(!menuOpen)
          if (!menuOpen && mode !== 'menu') setMode('menu')
          else if (menuOpen) { setMenuOpen(false); setMode(null) }
        }}
        aria-label="24/7 Availability support"
        className="group flex items-center gap-2.5 rounded-full bg-[#00B8A9] py-3 pl-4 pr-5 text-white shadow-xl shadow-[#00B8A9]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#00B8A9]/40"
      >
        <span className="relative flex">
          <span className="animate-whatsapp-ring pointer-events-none absolute inset-0 rounded-full bg-[#00B8A9]" aria-hidden="true" />
          <span className="relative flex items-center justify-center">
            <MessageSquareText size={19} />
          </span>
        </span>
        <span className="text-[13px] font-extrabold tracking-wide">24/7 Availability</span>
      </button>
    </div>
  )
}