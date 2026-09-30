import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Tag, Check, Newspaper, Home, ChevronRight } from 'lucide-react'
import { PrimaryButton } from '../components/UI'
import useSeo from '../hooks/useSeo'
import { articleSchema, breadcrumbSchema } from '../utils/seo'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DATE_OPTS = { year: 'numeric', month: 'long', day: 'numeric' }

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21.9v-8h2.7l.4-3.1h-3.1V8.8c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.3-.04-1.3-.12-2.45-.12-2.4 0-4.05 1.46-4.05 4.15v2.27H7.5v3.1h2.7v8z" />
  </svg>
)
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true" {...props}>
    <path d="M6.94 8.5v12.06H3.06V8.5h3.88zM7.19 4.69a2.19 2.19 0 11-4.38 0 2.19 2.19 0 014.38 0zM20.94 13.9v6.66h-3.87v-6.2c0-1.56-.56-2.62-1.96-2.62-1.07 0-1.7.72-1.98 1.41-.1.25-.13.6-.13.94v6.47H9.13s.05-10.5 0-11.6H13v1.64c.51-.79 1.43-1.92 3.49-1.92 2.55 0 4.45 1.66 4.45 5.22z" />
  </svg>
)
const LinkIconSvg = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
)

/* Inline formatting: **bold**, *italic* and [text](url) support.
    Internal links get crawlable anchors so blog posts can pass authority
    to service pages; external links open in a new tab. */
function renderInline(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-mbx-navy">{part.slice(2, -2)}</strong>
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const [, label, href] = link
        const external = /^https?:\/\//i.test(href)
        return (
          <a
            key={i}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="font-semibold text-mbx-teal underline decoration-mbx-teal/40 underline-offset-4 transition-colors hover:text-mbx-navy hover:decoration-mbx-navy"
          >
            {label}
          </a>
        )
      }
      return part
    })
}

/* Structured content renderer: headings, quotes, lists, paragraphs */
function ContentBlocks({ content }) {
  const blocks = String(content).split(/\n{2,}/).map(b => b.trim()).filter(Boolean)
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="flex items-start gap-3.5 pt-8 text-[1.45rem] font-extrabold leading-snug tracking-tight text-mbx-navy md:text-[1.65rem]">
              <span className="mt-[0.55em] h-[3px] w-7 shrink-0 rounded-full bg-mbx-teal" aria-hidden="true" />
              {renderInline(block.slice(3))}
            </h2>
          )
        }
        if (block.startsWith('### ')) {
          return (
            <h3 key={i} className="pt-4 text-xl font-bold leading-snug text-mbx-navy">
              {renderInline(block.slice(4))}
            </h3>
          )
        }
        const lines = block.split('\n').map(l => l.trim())
        // Quote block
        if (lines.every(l => l.startsWith('> ') || l === '')) {
          return (
            <blockquote key={i} className="rounded-r-2xl border-l-4 border-mbx-teal bg-mbx-surface/80 px-6 py-5">
              {lines.filter(l => l.startsWith('> ')).map((l, j) => (
                <p key={j} className="text-[15.5px] font-medium italic leading-relaxed text-mbx-navy/80">{renderInline(l.slice(2))}</p>
              ))}
            </blockquote>
          )
        }
        // Bullet list
        if (lines.every(l => l.startsWith('- ') || l === '')) {
          return (
            <ul key={i} className="space-y-3.5 pl-1">
              {lines.filter(l => l.startsWith('- ')).map((l, j) => (
                <li key={j} className="flex gap-3.5">
                  <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-mbx-teal" aria-hidden="true" />
                  <span className="text-[15.5px] leading-[1.8] text-mbx-text-muted">{renderInline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          )
        }
        // Numbered list
        if (lines.every(l => /^\d+\.\s/.test(l) || l === '')) {
          return (
            <ol key={i} className="space-y-3.5">
              {lines.filter(l => /^\d+\.\s/.test(l)).map((l, j) => (
                <li key={j} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-mbx-teal/10 text-[12px] font-extrabold text-mbx-teal">
                    {j + 1}
                  </span>
                  <span className="text-[15.5px] leading-[1.8] text-mbx-text-muted">{renderInline(l.replace(/^\d+\.\s/, ''))}</span>
                </li>
              ))}
            </ol>
          )
        }
        // Paragraph
        return (
          <p key={i} className="text-[15.5px] leading-[1.9] text-mbx-text-muted">
            {renderInline(block)}
          </p>
        )
      })}
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLoading(true)
    setPost(null)
    setRelated([])
    window.scrollTo(0, 0)
    fetch(`${API}/api/blog/slug/${slug}`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => { setLoading(false); setPost(null) })
  }, [slug])

  useEffect(() => {
    if (post) {
      fetch(`${API}/api/blog?limit=4`)
        .then(r => r.json())
        .then(data => setRelated((Array.isArray(data) ? data : []).filter(p => p._id !== post._id).slice(0, 3)))
        .catch(() => {})
    }
  }, [post])

  useSeo({
    title: post ? post.title : 'Article Not Found',
    description: post ? post.excerpt : 'This article is unavailable or has been unpublished.',
    path: `/blog/${slug}`,
    image: post?.coverImage || undefined,
    type: 'article',
    noindex: !loading && !post,
    jsonLd: post
      ? [
          articleSchema({
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: post.author,
            keywords: post.tags,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]
      : null,
  })

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-mbx-teal/20 border-t-mbx-teal" />
          <p className="mt-4 text-sm font-medium text-mbx-text-muted">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white px-4">
        <div className="w-full max-w-md rounded-3xl border border-dashed border-mbx-border bg-mbx-surface/50 px-6 py-16 text-center">
          <h1 className="text-2xl font-extrabold text-mbx-navy">Article not found</h1>
          <p className="mt-2 text-sm text-mbx-text-muted">This post may have been unpublished or removed.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 rounded-xl bg-[#4486BF] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#3a73a8]"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  const readTime = Math.max(1, Math.ceil(String(post.content).split(/\s+/).length / 200))

  return (
    <>
      {/* ── Hero (centered) ── */}
      <section className="relative overflow-hidden pt-36 pb-16 bg-atmos md:pt-48 md:pb-20 lg:pt-48">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
        <div className="hero-grid absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-[#4486BF]/12 blur-[140px]" />

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            {/* Breadcrumb */}
            <nav className="mb-7 flex items-center gap-1.5 text-[13px] font-medium text-mbx-text-muted" aria-label="Breadcrumb">
              <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-mbx-teal">
                <Home size={13} />
                Home
              </Link>
              <ChevronRight size={13} className="text-mbx-border" />
              <Link to="/blog" className="transition-colors hover:text-mbx-teal">Blog</Link>
            </nav>

            {/* Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="rounded-full border border-mbx-teal/30 bg-white/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-mbx-teal">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mbx-teal/15 bg-white/70 px-3.5 py-1 text-[11px] font-bold text-mbx-navy">
                <Clock size={12} />
                {readTime} min read
              </span>
            </div>

            <h1 className="mt-6 text-[1.75rem] font-extrabold leading-[1.25] tracking-tight text-mbx-navy md:text-[2.35rem] md:leading-[1.22]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-mbx-text-muted md:text-[17px]">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-mbx-text-muted">
              <span className="inline-flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-mbx-teal to-mbx-teal-dark text-[13px] font-extrabold text-white shadow-md">
                  {post.author.charAt(0).toUpperCase()}
                </span>
                <span className="font-semibold text-mbx-navy">{post.author}</span>
              </span>
              <span className="hidden h-4 w-px bg-mbx-border sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {new Date(post.createdAt).toLocaleDateString('en-US', DATE_OPTS)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article card on soft background ── */}
      <section className="bg-mbx-surface/60 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-mbx-border bg-white shadow-xl shadow-mbx-navy/[0.07]"
          >
            {/* Cover image (top of card) */}
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="aspect-[16/8] w-full object-cover"
              />
            ) : (
              <div className="relative aspect-[16/7] w-full bg-gradient-to-br from-[#4486BF] via-mbx-teal-light to-[#A9D5F0]">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="absolute -bottom-10 -right-10 size-48 rounded-full bg-white/30 blur-3xl" />
                <div className="flex size-full items-center justify-center">
                  <Newspaper className="size-12 text-white/40" strokeWidth={1.25} />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-10 sm:px-10 md:px-12 md:py-12">
              <ContentBlocks content={post.content} />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t border-mbx-border pt-8">
                  <Tag size={15} className="mr-1 text-mbx-text-muted" />
                  {post.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-mbx-border bg-mbx-surface px-4 py-1.5 text-xs font-bold text-mbx-text-muted transition-colors hover:border-mbx-teal/40 hover:text-mbx-teal">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author + Share */}
              <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-mbx-border bg-mbx-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4486BF] to-[#3570A0] text-lg font-extrabold text-white shadow-lg">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[15px] font-extrabold text-mbx-navy">{post.author}</p>
                    <p className="mt-0.5 text-xs font-medium leading-relaxed text-mbx-text-muted">
                      Medical Billing &amp; RCM Team · Home Health · Hospice
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="mr-1 hidden text-[11px] font-bold uppercase tracking-wider text-mbx-text-muted md:block">
                    Share
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex size-10 items-center justify-center rounded-xl border border-mbx-border bg-white text-mbx-text-muted transition-all hover:border-mbx-teal/40 hover:bg-mbx-teal hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex size-10 items-center justify-center rounded-xl border border-mbx-border bg-white text-mbx-text-muted transition-all hover:border-mbx-teal/40 hover:bg-mbx-teal hover:text-white"
                  >
                    <LinkedinIcon />
                  </a>
                  <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="flex size-10 items-center justify-center rounded-xl border border-mbx-border bg-white text-mbx-text-muted transition-all hover:border-mbx-teal/40 hover:bg-mbx-teal hover:text-white"
                  >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <LinkIconSvg />}
                  </button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Below card nav */}
          <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 rounded-xl border border-mbx-border bg-white px-5 py-2.5 text-sm font-bold text-mbx-navy shadow-sm transition-all hover:border-mbx-teal/40 hover:text-mbx-teal"
            >
              <ArrowLeft size={15} />
              All Articles
            </button>
            <PrimaryButton to="/services#free-audit" size="md">Free Audit</PrimaryButton>
          </div>
        </div>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="border-t border-mbx-border bg-white py-16 md:py-20">
          <div className="container mx-auto">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mbx-teal">Keep Reading</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-mbx-navy md:text-3xl">More Articles</h2>
              </div>
              <Link to="/blog" className="hidden items-center gap-1.5 text-sm font-bold text-mbx-teal transition-colors hover:text-mbx-navy sm:inline-flex">
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid gap-7 md:grid-cols-3">
              {related.map(p => (
                <Link
                  key={p._id}
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mbx-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-mbx-teal/35 hover:shadow-xl hover:shadow-mbx-navy/[0.08]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {p.coverImage ? (
                      <img src={p.coverImage} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    ) : (
                      <div className="relative size-full bg-gradient-to-br from-[#4486BF] via-mbx-teal-light to-[#A9D5F0]">
                        <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-white/30 blur-3xl" />
                        <div className="flex size-full items-center justify-center">
                          <Newspaper className="size-9 text-white/40" strokeWidth={1.25} />
                        </div>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-mbx-navy shadow-sm backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11.5px] font-semibold text-mbx-text-muted">
                      {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="mt-2 line-clamp-2 flex-1 text-[1.05rem] font-extrabold leading-snug text-mbx-navy transition-colors group-hover:text-mbx-teal">
                      {p.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-mbx-teal opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Read Article <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-mbx-border bg-atmos-cta py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4486BF]/12 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        <div className="container relative z-10 mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-mbx-navy md:text-4xl">Need Help With Your Billing?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-mbx-text-muted">
            Get a free billing audit from MBX Solutions' experts and see exactly where your revenue is leaking.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton to="/services#free-audit" size="lg">Claim Free Audit</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  )
}
