import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, EmptyState, ConfirmDialog, Toast } from '../../components/admin/AdminUI'
import { Star, Plus, Pencil, Trash2, Eye, EyeOff, Quote, X, Check, Ban, Clock, User, Shield } from 'lucide-react'
import { API, adminHeaders, adminAuthHeaders, handleUnauthorized } from '../../utils/adminApi'

const emptyForm = { name: '', role: '', content: '', rating: 5, image: '', videoUrl: '' }
const MAX_UPLOAD_MB = 50

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchTestimonials() }, [])

  const fetchTestimonials = () => {
    fetch(`${API}/api/testimonials/all`, { headers: adminHeaders() })
      .then(r => { if (handleUnauthorized(r)) return null; return r.json() })
      .then(data => { if (!data) return; setTestimonials(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  const openForm = (t = null) => {
    setImageFile(null)
    setVideoFile(null)
    if (t) { setForm({ name: t.name, role: t.role, content: t.content, rating: t.rating, image: t.image || '', videoUrl: t.videoUrl || '' }); setEditingId(t._id) }
    else { setForm(emptyForm); setEditingId(null) }
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); setImageFile(null); setVideoFile(null) }

  const pickFile = (setter) => (e) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setToast({ message: `File is too large (max ${MAX_UPLOAD_MB}MB)`, type: 'error' })
      e.target.value = ''
      return
    }
    setter(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `${API}/api/testimonials/${editingId}` : `${API}/api/testimonials`
    try {
      let headers, body
      if (imageFile || videoFile) {
        // multipart — browser must set Content-Type (with boundary) itself
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''))
        if (imageFile) fd.append('image', imageFile)
        if (videoFile) fd.append('video', videoFile)
        headers = adminAuthHeaders()
        body = fd
      } else {
        headers = adminHeaders()
        body = JSON.stringify(form)
      }
      const res = await fetch(url, { method, headers, body })
      if (handleUnauthorized(res)) return
      if (res.ok) {
        setToast({ message: editingId ? 'Testimonial updated' : 'Testimonial added', type: 'success' })
        closeForm(); fetchTestimonials()
      } else {
        const err = await res.json().catch(() => ({}))
        setToast({ message: err.error || 'Failed to save', type: 'error' })
      }
    } catch { setToast({ message: 'Failed to save', type: 'error' }) }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    const res = await fetch(`${API}/api/testimonials/${confirmDelete}`, { method: 'DELETE', headers: adminHeaders() })
    if (handleUnauthorized(res)) return
    setConfirmDelete(null)
    setToast({ message: 'Testimonial deleted', type: 'success' })
    fetchTestimonials()
  }

  const approve = async (t) => {
    const res = await fetch(`${API}/api/testimonials/${t._id}`, {
      method: 'PUT', headers: adminHeaders(),
      body: JSON.stringify({ approved: true }),
    })
    if (handleUnauthorized(res)) return
    setToast({ message: `"${t.name}" approved and now visible on site`, type: 'success' })
    fetchTestimonials()
  }

  const reject = async (t) => {
    const res = await fetch(`${API}/api/testimonials/${t._id}`, {
      method: 'PUT', headers: adminHeaders(),
      body: JSON.stringify({ approved: false }),
    })
    if (handleUnauthorized(res)) return
    setToast({ message: `"${t.name}" rejected and hidden from site`, type: 'info' })
    fetchTestimonials()
  }

  const toggleActive = async (t) => {
    const res = await fetch(`${API}/api/testimonials/${t._id}`, {
      method: 'PUT', headers: adminHeaders(),
      body: JSON.stringify({ active: !t.active }),
    })
    if (handleUnauthorized(res)) return
    fetchTestimonials()
  }

  const pending = testimonials.filter(t => t.source === 'user' && !t.approved)
  const approved = testimonials.filter(t => t.approved)
  const allUser = testimonials.filter(t => t.source === 'user')

  const filtered = filter === 'all' ? testimonials
    : filter === 'pending' ? pending
    : filter === 'approved' ? approved
    : filter === 'admin' ? testimonials.filter(t => t.source === 'admin')
    : allUser

  const tabs = [
    { id: 'all', label: 'All', count: testimonials.length },
    { id: 'pending', label: 'Pending', count: pending.length, color: 'amber' },
    { id: 'approved', label: 'Approved', count: approved.length, color: 'green' },
    { id: 'admin', label: 'Admin', count: testimonials.filter(t => t.source === 'admin').length },
    { id: 'user', label: 'User Reviews', count: allUser.length },
  ]

  return (
    <div>
      <PageHeader title="Testimonials" subtitle={`${testimonials.length} total, ${pending.length} pending approval`}
        action={() => openForm()} actionLabel="Add Testimonial" actionIcon={Plus} />

      {/* Inline Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden">
            <div className="rounded-2xl border border-[#DEE4EB] bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-extrabold text-[#0B2348]">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                <button onClick={closeForm} className="flex size-8 items-center justify-center rounded-lg text-[#5A6B82] hover:bg-[#F5F8FA] hover:text-[#0B2348] transition-all">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Client Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Smith"
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Role / Title</label>
                    <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Hospice Director"
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Testimonial *</label>
                  <textarea required rows={4} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="What did the client say..."
                    className="w-full resize-none rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="transition-transform hover:scale-110">
                        <Star size={22} className={n <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Image URL (optional)</label>
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/image.jpg"
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
                    <label className="mb-1.5 mt-3 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Or upload image</label>
                    <input type="file" accept="image/*" onChange={pickFile(setImageFile)}
                      className="block w-full cursor-pointer rounded-xl border border-dashed border-[#DEE4EB] bg-[#F5F8FA] px-3 py-2 text-xs text-[#5A6B82] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#4486BF]/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#4486BF] hover:border-[#4486BF]/40 transition-all" />
                    {imageFile ? (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                        <img src={URL.createObjectURL(imageFile)} alt="" className="size-8 rounded object-cover" />
                        <span className="flex-1 truncate text-xs font-bold text-emerald-700">{imageFile.name}</span>
                        <button type="button" onClick={() => setImageFile(null)} className="text-emerald-600 hover:text-red-500" aria-label="Remove image">
                          <X size={14} />
                        </button>
                      </div>
                    ) : form.image && editingId ? (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#F5F8FA] px-3 py-2">
                        <img src={form.image} alt="" className="size-8 rounded object-cover" onError={e => { e.target.style.display = 'none' }} />
                        <span className="flex-1 truncate text-xs text-[#5A6B82]">Current image saved</span>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Video URL (optional)</label>
                    <input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=... or direct video URL"
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
                    <label className="mb-1.5 mt-3 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Or upload video (max {MAX_UPLOAD_MB}MB)</label>
                    <input type="file" accept="video/*" onChange={pickFile(setVideoFile)}
                      className="block w-full cursor-pointer rounded-xl border border-dashed border-[#DEE4EB] bg-[#F5F8FA] px-3 py-2 text-xs text-[#5A6B82] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#4486BF]/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#4486BF] hover:border-[#4486BF]/40 transition-all" />
                    {videoFile ? (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
                        <span className="flex-1 truncate text-xs font-bold text-blue-700">{videoFile.name}</span>
                        <button type="button" onClick={() => setVideoFile(null)} className="text-blue-600 hover:text-red-500" aria-label="Remove video">
                          <X size={14} />
                        </button>
                      </div>
                    ) : form.videoUrl && editingId ? (
                      <div className="mt-2 rounded-lg bg-[#F5F8FA] px-3 py-2 text-xs text-[#5A6B82]">Current video saved</div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="submit" disabled={saving}
                    className="rounded-xl bg-[#4486BF] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#4486BF]/20 transition-all hover:bg-[#3a73a8] disabled:opacity-50">
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Save Testimonial'}
                  </button>
                  <button type="button" onClick={closeForm}
                    className="rounded-xl border border-[#DEE4EB] px-6 py-2.5 text-sm font-bold text-[#5A6B82] hover:border-[#0B2348]/20 hover:text-[#0B2348] transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Reviews Banner */}
      {pending.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-extrabold text-amber-800">{pending.length} review{pending.length > 1 ? 's' : ''} waiting for approval</p>
              <p className="text-xs text-amber-600">User-submitted reviews need your approval before appearing on the site.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              filter === t.id
                ? 'bg-[#0B2348] text-white shadow-md'
                : 'bg-white text-[#5A6B82] border border-[#DEE4EB] hover:border-[#4486BF]/30'
            }`}>
            {t.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${filter === t.id ? 'bg-white/20' : 'bg-[#F5F8FA]'}`}>{t.count}</span>
            {t.id === 'pending' && t.count > 0 && <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />}
          </button>
        ))}
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#DEE4EB] bg-white p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-xl bg-[#F5F8FA] shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-32 rounded bg-[#F5F8FA]" />
                  <div className="h-3 w-full rounded bg-[#F5F8FA]" />
                  <div className="h-3 w-3/4 rounded bg-[#F5F8FA]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Star}
          title={filter === 'pending' ? 'No pending reviews' : 'No testimonials'}
          description={filter === 'pending' ? 'All user reviews have been processed.' : 'Add your first testimonial to build trust.'}
          action={filter !== 'pending' ? () => openForm() : undefined}
          actionLabel="Add Testimonial" actionIcon={Plus} />
      ) : (
        <div className="space-y-4">
          {filtered.map((t, i) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className={`rounded-2xl border bg-white transition-all duration-300 ${
                t.source === 'user' && !t.approved
                  ? 'border-amber-200 shadow-sm shadow-amber-100'
                  : t.approved
                    ? 'border-[#DEE4EB]'
                    : 'border-dashed border-[#DEE4EB] opacity-60'
              }`}>

              {/* Pending Review - Big Approval UI */}
              {t.source === 'user' && !t.approved ? (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      <Clock size={12} /> Pending Review
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                      <User size={11} /> User Submitted
                    </span>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-[#0B2348] mb-4">&ldquo;{t.content}&rdquo;</p>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#0B2348] text-xs font-bold text-white">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0B2348]">{t.name}</p>
                      {t.role && <p className="text-xs text-[#5A6B82]">{t.role}</p>}
                    </div>
                    <span className="text-[11px] text-[#5A6B82]">{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Big Approval Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-[#DEE4EB]">
                    <button onClick={() => approve(t)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5">
                      <Check size={18} strokeWidth={3} /> Approve & Show on Site
                    </button>
                    <button onClick={() => reject(t)}
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 px-5 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50 hover:border-red-300">
                      <Ban size={16} /> Reject
                    </button>
                    <button onClick={() => setConfirmDelete(t._id)}
                      className="flex items-center justify-center rounded-xl border-2 border-[#DEE4EB] px-4 py-3 text-sm font-bold text-[#5A6B82] transition-all hover:border-red-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Regular Card - Admin or Approved User */
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {t.source === 'admin' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#4486BF]/10 px-2.5 py-1 text-[10px] font-bold text-[#4486BF] uppercase tracking-wider">
                            <Shield size={10} /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            <User size={10} /> User
                          </span>
                        )}
                        {t.approved ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                            <Check size={10} /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            Hidden
                          </span>
                        )}
                        {!t.active && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                            <EyeOff size={10} /> Inactive
                          </span>
                        )}
                        {t.image && <span className="text-[10px] text-green-600 font-bold">Has Image</span>}
                        {t.videoUrl && <span className="text-[10px] text-blue-600 font-bold">Has Video</span>}
                      </div>

                      <div className="flex gap-0.5 mb-2">
                        {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-sm leading-relaxed text-[#5A6B82] line-clamp-2 mb-3">&ldquo;{t.content}&rdquo;</p>
                      {t.image && (
                        <img src={t.image} alt="" className="mb-3 h-16 w-16 rounded-lg object-cover border border-[#DEE4EB]" onError={(e) => { e.target.style.display = 'none' }} />
                      )}

                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#0B2348] text-[10px] font-bold text-white">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0B2348]">{t.name}</p>
                          {t.role && <p className="text-xs text-[#5A6B82]">{t.role}</p>}
                        </div>
                        <span className="text-[11px] text-[#5A6B82]">{new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 shrink-0">
                      {t.source === 'user' && !t.approved && (
                        <button onClick={() => approve(t)}
                          className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-[11px] font-bold text-white transition-all hover:bg-emerald-600">
                          <Check size={13} strokeWidth={3} /> Approve
                        </button>
                      )}
                      {t.source === 'user' && t.approved && (
                        <button onClick={() => reject(t)}
                          className="flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-600 transition-all hover:bg-amber-100">
                          <Ban size={13} /> Unapprove
                        </button>
                      )}
                      <button onClick={() => toggleActive(t)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#DEE4EB] px-3 py-2 text-[11px] font-bold text-[#5A6B82] transition-all hover:border-[#4486BF] hover:text-[#4486BF]"
                        title={t.active ? 'Hide' : 'Show'}>
                        {t.active ? <Eye size={13} /> : <EyeOff size={13} />} {t.active ? 'Visible' : 'Hidden'}
                      </button>
                      <button onClick={() => openForm(t)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#DEE4EB] px-3 py-2 text-[11px] font-bold text-[#5A6B82] transition-all hover:border-[#4486BF] hover:text-[#4486BF]">
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => setConfirmDelete(t._id)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#DEE4EB] px-3 py-2 text-[11px] font-bold text-[#5A6B82] transition-all hover:border-red-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete}
        title="Delete Testimonial" message="This testimonial will be permanently removed. This action cannot be undone." />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  )
}
