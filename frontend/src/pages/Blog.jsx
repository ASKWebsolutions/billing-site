import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CalendarDays, ArrowRight, ArrowUpRight, BookOpen, Clock, Newspaper } from 'lucide-react'
import { PrimaryButton } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'
import { breadcrumbSchema } from '../utils/seo'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DATE_OPTS = { year: 'numeric', month: 'short', day: 'numeric' }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const readTime = (post) =>
  Math.max(1, Math.ceil(String(post.content || '').split(/\s+/).length / 200))

/* ── Card cover: image or branded placeholder ── */
function Cover({ post, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div className="relative size-full bg-gradient-to-br from-[#4486BF] via-mbx-teal-light to-[#A9D5F0]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-white/30 blur-3xl" />
          <div className="flex size-full items-center justify-center">
            <Newspaper className="size-10 text-white/40" strokeWidth={1.25} />
          </div>
        </div>
      )}
      {/* bottom gradient for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-mbx-navy/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}

/* ── Standard post card ── */
function PostCard({ post }) {
  return (
    <motion.article variants={cardAnim} className="group relative flex h-full flex-col">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-mbx-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-mbx-teal/35 hover:shadow-xl hover:shadow-mbx-navy/[0.08]"
      >
        <div className="relative">
          <Cover post={post} className="aspect-[16/9] w-full" />
          {/* category chip */}
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-mbx-navy shadow-sm backdrop-blur">
            {post.category}
          </span>
          {/* read time */}
          <span className="absolute bottom-3 right-4 inline-flex items-center gap-1 rounded-full bg-[#4486BF]/90 px-2.5 py-1 text-[10.5px] font-bold text-white/95 backdrop-blur">
            <Clock size={10} />
            {readTime(post)} min
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-[11.5px] font-semibold text-mbx-text-muted">
            <CalendarDays size={12} className="text-mbx-teal" />
            {new Date(post.createdAt).toLocaleDateString('en-US', DATE_OPTS)}
            <span className="mx-1 size-0.5 rounded-full bg-mbx-border" />
            <span className="truncate">{post.author}</span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-[1.15rem] font-extrabold leading-snug tracking-tight text-mbx-navy transition-colors duration-300 group-hover:text-mbx-teal">
            {post.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-mbx-text-muted">
            {post.excerpt || String(post.content).replace(/[#*>`]/g, '').slice(0, 120) + '…'}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-mbx-border/70 pt-4">
            <span className="text-[13px] font-extrabold text-mbx-navy transition-colors group-hover:text-mbx-teal">
              Read Article
            </span>
            <span className="flex size-8 items-center justify-center rounded-full border border-mbx-border text-mbx-navy transition-all duration-300 group-hover:border-mbx-teal group-hover:bg-mbx-teal group-hover:text-white">
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:-rotate-45" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

/* ── Featured post (big, horizontal) ── */
function FeaturedCard({ post }) {
  return (
    <motion.article variants={cardAnim} className="group relative md:col-span-2">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-mbx-border/80 bg-white shadow-md shadow-mbx-navy/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:border-mbx-teal/35 hover:shadow-xl hover:shadow-mbx-navy/[0.1] md:flex-row"
      >
        <div className="relative md:w-[52%]">
          <Cover post={post} className="aspect-[16/9] w-full md:absolute md:inset-0 md:aspect-auto md:h-full" />
          <span className="absolute left-4 top-4 rounded-full bg-[#4486BF] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-white shadow-md">
            ★ Featured
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center p-7 md:p-9">
          <div className="flex items-center gap-2 text-[11.5px] font-semibold text-mbx-text-muted">
            <CalendarDays size={12} className="text-mbx-teal" />
            {new Date(post.createdAt).toLocaleDateString('en-US', DATE_OPTS)}
            <span className="mx-1 size-0.5 rounded-full bg-mbx-border" />
            <span className="truncate">{post.author}</span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-2xl font-extrabold leading-tight tracking-tight text-mbx-navy transition-colors duration-300 group-hover:text-mbx-teal md:text-[1.75rem]">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mbx-text-muted md:text-[15px]">
            {post.excerpt || String(post.content).replace(/[#*>`]/g, '').slice(0, 180) + '…'}
          </p>

          <div className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#4486BF] px-5 py-2.5 text-[13px] font-extrabold text-white transition-all duration-300 group-hover:gap-3.5 group-hover:bg-[#3a73a8]">
            Read Article
            <ArrowUpRight size={15} />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  usePageSeo('/blog', {
    jsonLd: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  })
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`${API}/api/blog`)
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch(`${API}/api/blog/categories`)
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const filtered = useMemo(
    () =>
      posts.filter(p => {
        const matchCat = activeCat === 'All' || p.category === activeCat
        const q = query.trim().toLowerCase()
        const matchQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        return matchCat && matchQuery
      }),
    [posts, activeCat, query]
  )

  const isClean = !query && activeCat === 'All'
  const featured = isClean ? filtered[0] : null
  const rest = isClean ? filtered.slice(1) : filtered

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[52vh] items-center overflow-hidden pt-40 pb-24 bg-atmos md:pt-44">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-[#4486BF]/12 blur-[140px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 size-96 rounded-full bg-[#C7E7F8]/70 blur-[140px]" />
        </div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mbx-teal">
              <BookOpen size={13} />
              MBX Blog
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-mbx-navy md:text-5xl lg:text-[3.4rem]">
              Insights &amp; <span className="bg-gradient-to-r from-mbx-teal to-mbx-teal-light bg-clip-text text-transparent">Billing Guides</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mbx-text-muted">
              MBX Solutions publishes practical articles on medical billing, revenue cycle management, coding and
              compliance — written for home health, home care and hospice agencies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Search + Filters ── */}
      <section className="sticky top-12 z-30 border-b border-mbx-border bg-white/95 py-4 backdrop-blur md:top-14 lg:top-[153px]">
        <div className="container mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCat === cat
                    ? 'bg-[#4486BF] text-white shadow-md shadow-[#4486BF]/20'
                    : 'bg-mbx-surface text-mbx-text-muted hover:bg-mbx-surface-warm hover:text-mbx-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mbx-text-muted/60" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-mbx-border bg-mbx-surface/60 py-2.5 pl-10 pr-4 text-sm font-medium text-mbx-text outline-none transition-all placeholder:text-mbx-text-muted/60 focus:border-mbx-teal/50 focus:bg-white focus:ring-4 focus:ring-mbx-teal/10"
            />
          </div>
        </div>
      </section>

      {/* ── Posts Grid ── */}
      <section className="bg-mbx-surface/40 py-16 md:py-20">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <div key="skeleton" className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-mbx-border bg-white">
                    <div className="aspect-[16/9] bg-mbx-surface-warm" />
                    <div className="space-y-3 p-6">
                      <div className="h-3 w-24 rounded bg-mbx-surface-warm" />
                      <div className="h-5 w-3/4 rounded-lg bg-mbx-surface-warm" />
                      <div className="h-3 w-full rounded bg-mbx-surface-warm" />
                      <div className="h-3 w-2/3 rounded bg-mbx-surface-warm" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-lg rounded-3xl border border-dashed border-mbx-border bg-white px-6 py-20 text-center"
              >
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-mbx-surface text-mbx-text-muted">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-lg font-extrabold text-mbx-navy">No articles found</h3>
                <p className="mt-2 text-sm text-mbx-text-muted">
                  {query || activeCat !== 'All'
                    ? 'Try a different search or category.'
                    : 'New articles are coming soon — check back shortly!'}
                </p>
                {(query || activeCat !== 'All') && (
                  <button
                    onClick={() => { setQuery(''); setActiveCat('All') }}
                    className="mt-6 rounded-xl bg-[#4486BF] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#3a73a8]"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${activeCat}-${query}`}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
              >
                {featured && <FeaturedCard post={featured} />}
                {rest.map(post => <PostCard key={post._id} post={post} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-mbx-border bg-atmos-cta py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4486BF]/12 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        <div className="container relative z-10 mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-mbx-navy md:text-4xl">
            Want Revenue Tips for Your Agency?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-mbx-text-muted">
            Talk to MBX Solutions' billing experts and get a free audit — no strings attached.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton to="/services#free-audit" size="lg">Claim Free Audit</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  )
}
