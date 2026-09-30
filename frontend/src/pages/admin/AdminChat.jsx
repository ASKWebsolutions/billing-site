import { useState, useEffect, useRef, useCallback } from 'react'
import { PageHeader, EmptyState } from '../../components/admin/AdminUI'
import { useAuth } from '../../contexts/AuthContext'
import { setActiveSession } from '../../utils/liveChat'
import { MessageCircle, Send, Headset, ArrowLeft } from 'lucide-react'
import { API, handleUnauthorized } from '../../utils/adminApi'

const authHeaders = (token) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

export default function AdminChat() {
  const { token } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)
  const lastSeenVisitorRef = useRef(null)

  const fetchSessions = useCallback(() => {
    fetch(`${API}/api/chat/admin/conversations`, { headers: authHeaders(token) })
      .then((r) => {
        if (handleUnauthorized(r)) return null
        return r.json()
      })
      .then((data) => {
        if (data === null) return
        if (Array.isArray(data)) setSessions(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [token])

  const markRead = useCallback((id) => {
    fetch(`${API}/api/chat/admin/${id}/read`, { method: 'POST', headers: authHeaders(token) })
      .then((r) => { if (handleUnauthorized(r)) return null; return fetchSessions() })
      .catch(() => {})
  }, [token, fetchSessions])

  const fetchThread = useCallback((id) => {
    fetch(`${API}/api/chat/admin/${id}/messages`, { headers: authHeaders(token) })
      .then((r) => {
        if (handleUnauthorized(r)) return null
        return r.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) return
        setMessages(data)
        // The backend only clears adminUnread when /read is posted, and it
        // increments on every visitor message. Re-post while the admin is
        // actually reading so the badge and alarm counter stay honest.
        const newestVisitor = [...data].reverse().find((m) => m.sender === 'visitor')
        if (newestVisitor && newestVisitor._id !== lastSeenVisitorRef.current) {
          lastSeenVisitorRef.current = newestVisitor._id
          markRead(id)
        }
      })
      .catch(() => {})
  }, [token, markRead])

  useEffect(() => {
    fetchSessions()
    const id = setInterval(fetchSessions, 4000)
    return () => clearInterval(id)
  }, [fetchSessions])

  useEffect(() => {
    if (!selectedId) return
    lastSeenVisitorRef.current = null
    fetchThread(selectedId)
    const id = setInterval(() => fetchThread(selectedId), 3000)
    return () => clearInterval(id)
  }, [selectedId, fetchThread])

  // Tell the alarm poller which thread is on screen so it stays quiet.
  useEffect(() => {
    setActiveSession(selectedId)
    return () => setActiveSession(null)
  }, [selectedId])

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const openSession = (id) => {
    setSelectedId(id)
    fetchThread(id)
    markRead(id)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending || !selectedId) return
    setSending(true)
    setInput('')
    try {
      const res = await fetch(`${API}/api/chat/admin/${selectedId}/messages`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ text }),
      })
      if (handleUnauthorized(res)) { setInput(text); return }
      const msg = await res.json().catch(() => null)
      if (msg && msg._id) setMessages((prev) => [...prev, msg])
      fetchSessions()
    } catch { setInput(text) } finally {
      setSending(false)
    }
  }

  const totalUnread = sessions.reduce((sum, s) => sum + (s.adminUnread || 0), 0)
  const waiting = sessions.filter((s) => s.status === 'waiting').length

  const shortId = (id) => (id ? id.slice(-6).toUpperCase() : '...')

  return (
    <div>
      <PageHeader title="Live Chat" subtitle={`${sessions.length} conversations, ${totalUnread} unread${waiting ? `, ${waiting} waiting` : ''}`} />

      <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
        {/* Conversation list */}
        <div className={`overflow-hidden rounded-2xl border border-[#DEE4EB] bg-white ${selectedId ? 'hidden lg:block' : ''}`}>
          {loading ? (
            <div className="divide-y divide-[#DEE4EB]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
                  <div className="size-10 rounded-xl bg-[#F5F8FA] shrink-0" />
                  <div className="flex-1 space-y-2"><div className="h-3.5 w-28 rounded bg-[#F5F8FA]" /><div className="h-3 w-48 rounded bg-[#F5F8FA]" /></div>
                </div>
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <EmptyState icon={MessageCircle} title="No conversations yet" description="When a visitor starts a live chat, it will appear here instantly." />
          ) : (
            <div className="divide-y divide-[#DEE4EB] max-h-[calc(100vh-280px)] overflow-y-auto">
              {sessions.map((s) => (
                <button key={s.sessionId} onClick={() => openSession(s.sessionId)}
                  className={`flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-[#F5F8FA]/60 ${
                    selectedId === s.sessionId ? 'bg-[#4486BF]/[0.04] border-l-2 border-l-[#4486BF]' : 'border-l-2 border-l-transparent'
                  }`}>
                  <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0B2348] text-xs font-bold text-white">
                    {(s.visitorName || 'V').charAt(0).toUpperCase()}
                    {(s.adminUnread || 0) > 0 && (
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#4486BF] text-[9px] font-bold text-white">
                        {s.adminUnread}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0B2348] truncate">{s.visitorName}</p>
                      <span className="shrink-0 text-[10px] font-semibold text-[#8A94A6]">#{shortId(s.sessionId)}</span>
                      {s.status === 'waiting' && <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-600 uppercase tracking-wide">waiting</span>}
                    </div>
                    <p className="text-xs text-[#5A6B82] truncate">{s.lastMessage || 'Opened chat — no message yet'}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-[#5A6B82] mt-0.5">
                    {new Date(s.lastMessageAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat thread */}
        <div className={`${!selectedId ? 'hidden lg:flex' : 'flex'} h-[calc(100vh-240px)] lg:h-[calc(100vh-280px)] flex-col overflow-hidden rounded-2xl border border-[#DEE4EB] bg-white`}>
          {!selectedId ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <Headset size={34} className="mb-3 text-[#DEE4EB]" />
              <p className="text-sm text-[#5A6B82]">Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-2 border-b border-[#DEE4EB] bg-white/70 px-3 py-3.5 sm:gap-3 sm:px-5">
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Back to conversations"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#5A6B82] hover:bg-[#F5F8FA] transition-all lg:hidden"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="relative flex size-9 items-center justify-center rounded-full bg-[#0B2348] text-xs font-bold text-white">
                  {(sessions.find((s) => s.sessionId === selectedId)?.visitorName || 'V').charAt(0).toUpperCase()}
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#25D366] ring-2 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-[#0B2348]">
                    {sessions.find((s) => s.sessionId === selectedId)?.visitorName} <span className="text-[11px] font-semibold text-[#8A94A6]">#{shortId(selectedId)}</span>
                  </p>
                  <p className="text-[11px] text-[#5A6B82]">Live chat visitor</p>
                </div>
              </div>

              {/* Messages */}
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F3F7FB] px-4 py-4">
                {messages.map((m) => (
                  <div key={m._id} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        m.sender === 'admin'
                          ? 'rounded-tr-sm bg-[#4486BF] text-white'
                          : 'rounded-tl-sm bg-white text-[#0B2348]'
                      }`}
                    >
                      {m.text}
                      <p className={`mt-1 text-[10px] ${m.sender === 'admin' ? 'text-white/60' : 'text-[#8A94A6]'}`}>
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply */}
              <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[#DEE4EB] bg-white px-3 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={messages.length === 0 ? 'Send a welcome message...' : 'Type your reply...'}
                  className="flex-1 rounded-xl border border-[#DDE5EE] bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF]"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  aria-label="Send reply"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#4486BF] text-white transition-all hover:bg-[#3a73a8] disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}