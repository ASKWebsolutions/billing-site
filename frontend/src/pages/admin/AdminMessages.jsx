import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, EmptyState, ConfirmDialog, Toast } from '../../components/admin/AdminUI'
import { MessageSquare, Eye, Trash2, Mail, MailOpen, Phone, Clock, Search } from 'lucide-react'
import { API, adminHeaders, handleUnauthorized } from '../../utils/adminApi'

export default function AdminMessages() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => { fetchContacts() }, [])

  const fetchContacts = () => {
    fetch(`${API}/api/contact`, { headers: adminHeaders() })
      .then(r => { if (handleUnauthorized(r)) return null; return r.json() })
      .then(data => { if (!data) return; setContacts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  const unreadCount = contacts.filter(c => !c.read).length
  const filtered = contacts
    .filter(c => filter === 'all' || (filter === 'unread' && !c.read) || (filter === 'read' && c.read))
    .filter(c => {
      const q = search.toLowerCase()
      return c.name.toLowerCase().includes(q)
        || c.email.toLowerCase().includes(q)
        || c.message.toLowerCase().includes(q)
        || (c.agencyName || '').toLowerCase().includes(q)
        || (c.patientName || '').toLowerCase().includes(q)
        || (c.specialty || '').toLowerCase().includes(q)
        || (c.ehrSoftware || '').toLowerCase().includes(q)
    })

  const handleMarkRead = async (id) => {
    const res = await fetch(`${API}/api/contact/${id}`, { method: 'PATCH', headers: adminHeaders() })
    if (handleUnauthorized(res)) return
    fetchContacts()
    if (selectedMsg?._id === id) setSelectedMsg(prev => ({ ...prev, read: true }))
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    const res = await fetch(`${API}/api/contact/${confirmDelete}`, { method: 'DELETE', headers: adminHeaders() })
    if (handleUnauthorized(res)) return
    setConfirmDelete(null)
    if (selectedMsg?._id === confirmDelete) setSelectedMsg(null)
    setToast({ message: 'Message deleted', type: 'success' })
    fetchContacts()
  }

  const openMessage = (c) => {
    setSelectedMsg(c)
    if (!c.read) handleMarkRead(c._id)
  }

  return (
    <div>
      <PageHeader title="Messages" subtitle={`${contacts.length} total, ${unreadCount} unread`} />

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', count: contacts.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'read', label: 'Read', count: contacts.length - unreadCount },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                filter === f.id
                  ? 'bg-[#0B2348] text-white shadow-md'
                  : 'bg-white text-[#5A6B82] border border-[#DEE4EB] hover:border-[#4486BF]/30'
              }`}>
              {f.id === 'unread' && <Mail size={12} />}
              {f.id === 'read' && <MailOpen size={12} />}
              {f.label}
              <span className={`ml-0.5 text-[10px] ${filter === f.id ? 'opacity-60' : 'opacity-40'}`}>({f.count})</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B82]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
            className="w-full sm:w-64 rounded-xl border border-[#DEE4EB] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10" />
        </div>
      </div>

      {/* Messages List + Detail */}
      <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
        {/* List */}
        <div className={`rounded-2xl border border-[#DEE4EB] bg-white overflow-hidden ${selectedMsg ? 'hidden lg:block' : ''}`}>
          {loading ? (
            <div className="divide-y divide-[#DEE4EB]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
                  <div className="size-10 rounded-xl bg-[#F5F8FA] shrink-0" />
                  <div className="flex-1 space-y-2"><div className="h-3.5 w-28 rounded bg-[#F5F8FA]" /><div className="h-3 w-48 rounded bg-[#F5F8FA]" /></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={MessageSquare} title="No messages" description={search ? 'No messages match your search.' : 'No contact form submissions yet.'} />
          ) : (
            <div className="divide-y divide-[#DEE4EB] max-h-[calc(100vh-280px)] overflow-y-auto">
              {filtered.map(c => (
                <button key={c._id} onClick={() => openMessage(c)}
                  className={`flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-[#F5F8FA]/60 ${
                    selectedMsg?._id === c._id ? 'bg-[#4486BF]/[0.04] border-l-2 border-l-[#4486BF]' : 'border-l-2 border-l-transparent'
                  }`}>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0B2348] text-xs font-bold text-white">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0B2348] truncate">{c.name}</p>
                      {!c.read && <span className="size-1.5 rounded-full bg-[#4486BF] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#5A6B82] truncate">{c.message}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-[#5A6B82] mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedMsg ? (
            <motion.div key={selectedMsg._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="rounded-2xl border border-[#DEE4EB] bg-white p-6 lg:sticky lg:top-6 lg:self-start">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#0B2348] text-sm font-bold text-white">
                    {selectedMsg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-[#0B2348]">{selectedMsg.name}</p>
                    <p className="text-xs text-[#5A6B82]">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMsg(null)} className="text-[#5A6B82] hover:text-[#0B2348] text-sm lg:hidden">✕</button>
              </div>

              <div className="mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-[#0B2348]">
                  <Mail size={14} className="text-[#5A6B82]" />
                  <span className="font-medium">{selectedMsg.email}</span>
                </div>
                {selectedMsg.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-[#0B2348]">
                    <Phone size={14} className="text-[#5A6B82]" />
                    <span className="font-medium">{selectedMsg.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-[#5A6B82]">
                  <Clock size={14} />
                  <span>{new Date(selectedMsg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {(selectedMsg.agencyName || selectedMsg.patientName || selectedMsg.specialty || selectedMsg.ehrSoftware) && (
                <div className="mb-4 grid gap-2.5 sm:grid-cols-2">
                  {selectedMsg.agencyName && (
                    <div className="rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/70 px-3.5 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A94A6]">Agency</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#0B2348]">{selectedMsg.agencyName}</p>
                    </div>
                  )}
                  {selectedMsg.patientName && (
                    <div className="rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/70 px-3.5 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A94A6]">Patient Census</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#0B2348]">{selectedMsg.patientName}</p>
                    </div>
                  )}
                  {selectedMsg.specialty && (
                    <div className="rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/70 px-3.5 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A94A6]">Speciality</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#0B2348]">{selectedMsg.specialty}</p>
                    </div>
                  )}
                  {selectedMsg.ehrSoftware && (
                    <div className="rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/70 px-3.5 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A94A6]">EHR Software</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#0B2348]">{selectedMsg.ehrSoftware}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="rounded-xl bg-[#F5F8FA] p-4">
                <p className="text-sm leading-relaxed text-[#0B2348] whitespace-pre-wrap">{selectedMsg.message}</p>
              </div>

              <div className="mt-5 flex gap-3">
                {!selectedMsg.read && (
                  <button onClick={() => handleMarkRead(selectedMsg._id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#DEE4EB] px-4 py-2.5 text-sm font-bold text-[#5A6B82] hover:border-[#4486BF] hover:text-[#4486BF] transition-all">
                    <Eye size={15} /> Mark as Read
                  </button>
                )}
                <button onClick={() => setConfirmDelete(selectedMsg._id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex items-center justify-center rounded-2xl border border-dashed border-[#DEE4EB] bg-white min-h-[300px]">
              <div className="text-center">
                <Mail size={32} className="mx-auto mb-3 text-[#DEE4EB]" />
                <p className="text-sm text-[#5A6B82]">Select a message to view details</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmDialog isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete}
        title="Delete Message" message="This message will be permanently deleted. This action cannot be undone." />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  )
}
