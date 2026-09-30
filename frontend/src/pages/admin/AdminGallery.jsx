import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHeader, EmptyState, ConfirmDialog, Toast } from '../../components/admin/AdminUI'
import { Trash2, Image, Grid3X3, List, Plus, Link2 } from 'lucide-react'
import { API, adminHeaders, handleUnauthorized } from '../../utils/adminApi'

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('General')
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('All')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => { fetchImages() }, [])

  const fetchImages = () => {
    fetch(`${API}/api/gallery`).then(r => r.json()).then(data => { setImages(data); setLoading(false) }).catch(() => setLoading(false))
  }

  const categories = ['All', ...new Set(images.map(i => i.category))]
  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter)

  const handleUpload = async (e) => {
    e.preventDefault()
    const link = url.trim()
    if (!link || uploading) return
    setUploading(true)
    try {
      const res = await fetch(`${API}/api/gallery`, {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify({ title: title.trim() || 'Untitled', category, url: link }),
      })
      if (handleUnauthorized(res)) return
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setToast({ message: 'Image added to gallery', type: 'success' })
        setTitle('')
        setUrl('')
        fetchImages()
      } else {
        setToast({ message: data.error || 'Could not add image', type: 'error' })
      }
    } catch {
      setToast({ message: 'Could not reach the server', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    const res = await fetch(`${API}/api/gallery/${confirmDelete}`, { method: 'DELETE', headers: adminHeaders() })
    if (handleUnauthorized(res)) return
    setConfirmDelete(null)
    setToast({ message: 'Image removed', type: 'success' })
    fetchImages()
  }

  return (
    <div>
      <PageHeader title="Gallery" subtitle={`${images.length} images uploaded`} />

      {/* Add by URL */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-2xl border border-[#DEE4EB] bg-white p-5">
        <h3 className="mb-1 text-sm font-extrabold text-[#0B2348]">Add Image</h3>
        <p className="mb-4 text-xs text-[#5A6B82]">Paste a direct image link. It is checked before saving, so broken links will not appear on the site.</p>
        <form onSubmit={handleUpload}>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Image title"
                className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
            </div>
            <div className="min-w-[140px]">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white">
                <option>General</option>
                <option>Team</option>
                <option>Office</option>
                <option>Events</option>
                <option>Operations</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[240px]">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#5A6B82]">Image URL</label>
              <div className="relative">
                <Link2 size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
                <input value={url} onChange={e => setUrl(e.target.value)} type="url" required
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA] py-2.5 pl-11 pr-4 text-sm text-[#0B2348] outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10 focus:bg-white" />
              </div>
            </div>
            <button type="submit" disabled={uploading || !url.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#4486BF] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#4486BF]/20 transition-all hover:bg-[#3a73a8] hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
              <Plus size={15} />
              {uploading ? 'Checking...' : 'Add Image'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Filters + View Toggle */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#0B2348] text-white shadow-md'
                  : 'bg-white text-[#5A6B82] border border-[#DEE4EB] hover:border-[#4486BF]/30 hover:text-[#0B2348]'
              }`}>
              {cat}
              {cat !== 'All' && <span className="ml-1 text-[10px] opacity-60">{images.filter(i => i.category === cat).length}</span>}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-[#DEE4EB] bg-white p-0.5">
          <button onClick={() => setView('grid')} className={`flex size-7 items-center justify-center rounded-md transition-all ${view === 'grid' ? 'bg-[#0B2348] text-white' : 'text-[#5A6B82]'}`}>
            <Grid3X3 size={14} />
          </button>
          <button onClick={() => setView('list')} className={`flex size-7 items-center justify-center rounded-md transition-all ${view === 'list' ? 'bg-[#0B2348] text-white' : 'text-[#5A6B82]'}`}>
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Images */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#DEE4EB] bg-white overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-[#F5F8FA]" />
              <div className="p-3 space-y-2"><div className="h-3.5 w-24 rounded bg-[#F5F8FA]" /><div className="h-2.5 w-16 rounded bg-[#F5F8FA]" /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Image} title="No images yet" description="Add your first image using the link box above." />
      ) : view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((img, i) => (
            <motion.div key={img._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className="group relative overflow-hidden rounded-2xl border border-[#DEE4EB] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0B2348]/[0.06] hover:-translate-y-0.5">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img.url} alt={img.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3.5">
                <p className="text-sm font-bold text-[#0B2348] truncate">{img.title}</p>
                <span className="mt-1 inline-block rounded-md bg-[#F5F8FA] px-2 py-0.5 text-[10px] font-bold text-[#5A6B82] uppercase tracking-wider">{img.category}</span>
              </div>
              <button onClick={() => setConfirmDelete(img._id)}
                className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-lg bg-red-500 text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:bg-red-600">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#DEE4EB] bg-white overflow-hidden">
          {filtered.map((img, i) => (
            <motion.div key={img._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="group flex items-center gap-4 border-b border-[#DEE4EB] px-5 py-3 last:border-0 hover:bg-[#F5F8FA]/50 transition-colors">
              <img src={img.url} alt={img.title} className="size-12 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#0B2348] truncate">{img.title}</p>
                <p className="text-xs text-[#5A6B82]">{img.category}</p>
              </div>
              <span className="text-[11px] text-[#5A6B82]">{new Date(img.createdAt).toLocaleDateString()}</span>
              <button onClick={() => setConfirmDelete(img._id)}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#5A6B82] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete}
        title="Delete Image" message="This action cannot be undone. The image will be removed from your gallery." />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  )
}
