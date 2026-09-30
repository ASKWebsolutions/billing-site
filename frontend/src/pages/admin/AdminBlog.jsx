import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, EmptyState, ConfirmDialog, Toast } from '../../components/admin/AdminUI'
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Search, FileText, ImageIcon, Loader2, LinkIcon,
} from 'lucide-react'
import { API, adminHeaders, handleUnauthorized } from '../../utils/adminApi'

const emptyForm = {
  title: '', excerpt: '', content: '', category: 'General', tags: '', author: 'MBX Solutions', published: false, coverImage: '',
}

const CATEGORIES = ['General', 'Billing', 'Coding', 'RCM', 'Compliance', 'Industry News']

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = () => {
    fetch(`${API}/api/blog/admin/all`, { headers: adminHeaders() })
      .then(r => {
        if (handleUnauthorized(r)) return null
        return r.json()
      })
      .then(data => { if (!data) return; setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setLoading(false) })
  }

  const openForm = (post = null) => {
    if (post) {
      setForm({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        category: post.category || 'General',
        tags: (post.tags || []).join(', '),
        author: post.author || 'MBX Solutions',
        published: post.published,
        coverImage: post.coverImage || '',
      })
      setEditingId(post._id)
    } else {
      setForm(emptyForm)
      setEditingId(null)
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      setToast({ message: 'Title and content are required', type: 'error' })
      return
    }
    setSaving(true)
    try {
      const url = editingId ? `${API}/api/blog/${editingId}` : `${API}/api/blog`
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setToast({ message: editingId ? 'Post updated successfully' : 'Post created successfully', type: 'success' })
        closeForm()
        fetchPosts()
      } else {
        setToast({ message: data.error || 'Failed to save post', type: 'error' })
      }
    } catch {
      setToast({ message: 'Failed to save post', type: 'error' })
    }
    setSaving(false)
  }

  const togglePublish = async (post) => {
    await fetch(`${API}/api/blog/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ published: !post.published }),
    })
    setToast({ message: post.published ? `"${post.title.slice(0, 30)}..." unpublished` : `"${post.title.slice(0, 30)}..." published`, type: 'info' })
    fetchPosts()
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    await fetch(`${API}/api/blog/${confirmDelete._id}`, { method: 'DELETE', headers: adminHeaders() })
    setConfirmDelete(null)
    setToast({ message: 'Post deleted', type: 'success' })
    fetchPosts()
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )
  const publishedCount = posts.filter(p => p.published).length

  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle={`${posts.length} posts · ${publishedCount} published · ${posts.length - publishedCount} drafts`}
        action={() => openForm()}
        actionLabel="New Post"
        actionIcon={Plus}
      />

      {/* Search */}
      {posts.length > 0 && (
        <div className="mb-5 relative max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6B82]/60" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-xl border border-[#DEE4EB] bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-[#0B2348] outline-none transition-all placeholder:text-[#5A6B82]/60 focus:border-[#4486BF]/50 focus:ring-4 focus:ring-[#4486BF]/10"
          />
        </div>
      )}

      {/* Inline Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <div className="rounded-2xl border border-[#DEE4EB] bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0B2348]">{editingId ? 'Edit Post' : 'New Blog Post'}</h3>
                <button onClick={closeForm} className="flex size-8 items-center justify-center rounded-lg text-[#5A6B82] transition-all hover:bg-[#F5F8FA] hover:text-[#0B2348]">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. 5 Ways to Reduce Claim Denials"
                    required
                    className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-2.5 text-sm font-semibold text-[#0B2348] outline-none transition-all placeholder:font-normal placeholder:text-[#5A6B82]/50 focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Short Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    placeholder="One-two line summary shown on blog cards..."
                    className="w-full resize-none rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all placeholder:text-[#5A6B82]/50 focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                  />
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Cover Image URL</label>
                  <div className="relative">
                    <LinkIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6B82]/60" />
                    <input
                      type="url"
                      value={form.coverImage}
                      onChange={e => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 py-2.5 pl-10 pr-4 text-sm text-[#0B2348] outline-none transition-all placeholder:text-[#5A6B82]/50 focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                    />
                  </div>
                  {form.coverImage.trim() ? (
                    <div className="relative mt-3 overflow-hidden rounded-xl border border-[#DEE4EB]">
                      <img
                        src={form.coverImage}
                        alt="Cover preview"
                        className="aspect-[16/9] w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex'
                        }}
                        onLoad={(e) => {
                          e.currentTarget.style.display = 'block'
                          if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'none'
                        }}
                      />
                      <div className="hidden aspect-[16/9] w-full flex-col items-center justify-center gap-2 bg-[#F5F8FA] text-[#5A6B82]">
                        <ImageIcon size={22} />
                        <span className="text-xs font-semibold">Image load nahi hui — URL check karo</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '' })}
                        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-[#5A6B82]/70">
                      Internet se image ka direct link paste karo (right-click image → “Copy image address”). Optional — blank chhoda to branded placeholder dikhega.
                    </p>
                  )}
                </div>

                {/* Category + Author */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-2.5 text-sm font-semibold text-[#0B2348] outline-none transition-all focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Author</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-2.5 text-sm font-semibold text-[#0B2348] outline-none transition-all focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    placeholder="denials, billing, medicare"
                    className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-2.5 text-sm text-[#0B2348] outline-none transition-all placeholder:text-[#5A6B82]/50 focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5A6B82]">Content *</label>
                    <span className="text-[10px] font-medium text-[#5A6B82]/70">
                      Tip: use "## " for headings and "- " for bullet points, blank line between blocks
                    </span>
                  </div>
                  <textarea
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    rows={14}
                    required
                    placeholder={'Write your article here...\n\n## Section Heading\n\nParagraph text...\n\n- Bullet point one\n- Bullet point two'}
                    className="w-full rounded-xl border border-[#DEE4EB] bg-[#F5F8FA]/50 px-4 py-3 font-mono text-[13px] leading-relaxed text-[#0B2348] outline-none transition-all placeholder:text-[#5A6B82]/50 focus:border-[#4486BF]/50 focus:bg-white focus:ring-4 focus:ring-[#4486BF]/10"
                  />
                </div>

                {/* Publish toggle + actions */}
                <div className="flex flex-col gap-4 border-t border-[#DEE4EB] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.published}
                      onClick={() => setForm({ ...form, published: !form.published })}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${form.published ? 'bg-emerald-500' : 'bg-[#DEE4EB]'}`}
                    >
                      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${form.published ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                    <span className="text-sm font-bold text-[#0B2348]">
                      {form.published ? 'Published' : 'Draft'}
                      <span className="ml-2 font-medium text-[#5A6B82]">{form.published ? '— visible on website' : '— hidden from website'}</span>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="rounded-xl border border-[#DEE4EB] px-5 py-2.5 text-sm font-bold text-[#5A6B82] transition-all hover:border-[#0B2348]/20 hover:text-[#0B2348]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#4486BF] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#4486BF]/20 transition-all hover:bg-[#3a73a8] disabled:opacity-60"
                    >
                      {saving && <Loader2 size={15} className="animate-spin" />}
                      {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      {loading ? (
        <div className="rounded-2xl border border-[#DEE4EB] bg-white p-12 text-center">
          <div className="inline-block size-7 animate-spin rounded-full border-[3px] border-[#4486BF] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={search ? 'No posts match your search' : 'No blog posts yet'}
          description={search ? 'Try a different search term.' : 'Create your first article — it will appear on the website once published.'}
          action={search ? undefined : () => openForm()}
          actionLabel="New Post"
          actionIcon={Plus}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-center gap-4 rounded-2xl border border-[#DEE4EB] bg-white p-4 transition-all hover:border-[#4486BF]/30 hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0B2348] to-[#4486BF]/60">
                {post.coverImage ? (
                  <img src={post.coverImage} alt="" className="size-full object-cover" />
                ) : (
                  <ImageIcon size={20} className="text-white/30" />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate text-sm font-extrabold text-[#0B2348]">{post.title}</h4>
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    post.published ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {post.published ? <Eye size={10} /> : <EyeOff size={10} />}
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-[#5A6B82]">
                  {post.category} · {post.author} · {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {post.views > 0 && ` · ${post.views} views`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => togglePublish(post)}
                  title={post.published ? 'Unpublish' : 'Publish'}
                  className={`flex size-9 items-center justify-center rounded-xl transition-all ${
                    post.published
                      ? 'text-emerald-600 hover:bg-emerald-50'
                      : 'text-[#5A6B82] hover:bg-[#4486BF]/10 hover:text-[#4486BF]'
                  }`}
                >
                  {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => openForm(post)}
                  title="Edit"
                  className="flex size-9 items-center justify-center rounded-xl text-[#5A6B82] transition-all hover:bg-[#4486BF]/10 hover:text-[#4486BF]"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setConfirmDelete(post)}
                  title="Delete"
                  className="flex size-9 items-center justify-center rounded-xl text-[#5A6B82] transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete this post?"
        message={`"${confirmDelete?.title}" will be permanently removed along with its cover image.`}
        loading={false}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
