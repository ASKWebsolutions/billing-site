import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StatCard } from '../../components/admin/AdminUI'
import { Image, MessageSquare, Star, TrendingUp, FileText } from 'lucide-react'
import { API, adminHeaders, handleUnauthorized } from '../../utils/adminApi'

// Parses the body only after confirming the session is still valid. Without
// this a 401 body ({ error: 'Invalid token' }) reaches the code below, where
// .filter is not a function and the dashboard silently renders all zeros.
const getJSON = (path) =>
  fetch(`${API}${path}`, { headers: adminHeaders() }).then((r) => {
    if (handleUnauthorized(r)) return null
    return r.json()
  })

export default function DashboardOverview() {
  const [stats, setStats] = useState({ gallery: 0, contacts: 0, testimonials: 0, unread: 0, blog: 0 })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getJSON('/api/gallery'),
      getJSON('/api/contact'),
      getJSON('/api/testimonials/all'),
      getJSON('/api/blog/admin/all'),
    ]).then(([gallery, contacts, testimonials, blogPosts]) => {
      if (!gallery || !contacts || !testimonials || !blogPosts) return
      setStats({
        gallery: gallery.length,
        contacts: contacts.length,
        testimonials: testimonials.length,
        unread: contacts.filter(c => !c.read).length,
        blog: Array.isArray(blogPosts) ? blogPosts.length : 0,
      })
      setRecentContacts(contacts.slice(0, 5))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={Image} label="Gallery Images" value={stats.gallery} color="#4486BF" delay={0} />
        <StatCard icon={MessageSquare} label="Total Messages" value={stats.contacts} color="#0B2348" delay={0.05} />
        <StatCard icon={Star} label="Testimonials" value={stats.testimonials} color="#5A9AD0" delay={0.1} />
        <StatCard icon={TrendingUp} label="Unread Messages" value={stats.unread} color={stats.unread > 0 ? '#E53935' : '#4486BF'} delay={0.15} />
        <StatCard icon={FileText} label="Blog Posts" value={stats.blog} color="#5A9AD0" delay={0.2} />
      </div>

      {/* Recent Messages */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-[#DEE4EB] bg-white"
      >
        <div className="flex items-center justify-between border-b border-[#DEE4EB] px-6 py-4">
          <h3 className="text-sm font-extrabold text-[#0B2348]">Recent Messages</h3>
          <a href="/admin/messages" className="text-xs font-bold text-[#4486BF] hover:underline">View all</a>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block size-6 border-3 border-[#4486BF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentContacts.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#5A6B82]">No messages yet.</div>
        ) : (
          <div className="divide-y divide-[#DEE4EB]">
            {recentContacts.map(c => (
              <div key={c._id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F8FA]/50 transition-colors">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0B2348] text-xs font-bold text-white">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#0B2348] truncate">{c.name}</p>
                    {!c.read && <span className="size-1.5 rounded-full bg-[#4486BF] shrink-0" />}
                  </div>
                  <p className="text-xs text-[#5A6B82] truncate">{c.message}</p>
                </div>
                <span className="shrink-0 text-[11px] font-medium text-[#5A6B82]">
                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
