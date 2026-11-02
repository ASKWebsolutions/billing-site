// Load env before anything reads process.env (cloudinary.config runs at import).
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import testimonialUpload from '../middleware/testimonialUpload.js'

// ── Models ──
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  url: { type: String, required: true },
  // Only set for images we uploaded ourselves. Gallery entries added by URL
  // have no Cloudinary asset, so cleanup must treat it as optional.
  publicId: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true })

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  agencyName: { type: String, default: '' },
  patientName: { type: String, default: '' },
  specialty: { type: String, default: '' },
  ehrSoftware: { type: String, default: '' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true })

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  content: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  image: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  // Cloudinary asset ids so delete/replace can clean up what we uploaded.
  imagePublicId: { type: String, default: '' },
  videoPublicId: { type: String, default: '' },
  active: { type: Boolean, default: true },
  approved: { type: Boolean, default: false },
  source: { type: String, enum: ['admin', 'user'], default: 'admin' },
  order: { type: Number, default: 0 },
}, { timestamps: true })

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: '', trim: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  category: { type: String, default: 'General', trim: true },
  tags: { type: [String], default: [] },
  author: { type: String, default: 'MBX Solutions' },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true })

// Auto-generate unique slug from title
blogSchema.pre('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80) + '-' + Date.now().toString(36)
  }
  next()
})

const chatSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  visitorName: { type: String, default: 'Visitor' },
  lastMessage: { type: String, default: '' },
  lastMessageAt: { type: Date, default: Date.now },
  adminUnread: { type: Number, default: 0 },
  visitorUnread: { type: Number, default: 0 },
  status: { type: String, enum: ['waiting', 'active', 'ended'], default: 'waiting' },
}, { timestamps: true })

const chatMessageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  sender: { type: String, enum: ['visitor', 'admin'], required: true },
  text: { type: String, required: true, trim: true },
  read: { type: Boolean, default: false },
}, { timestamps: true })

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema)
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema)
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
const ChatSession = mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema)
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema)

// ── DB Connection (cached) ──
let cached = null
async function connectDB() {
  if (cached) return cached
  cached = await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected')
  return cached
}

// ── Cloudinary ──
// Gallery images are referenced by URL rather than uploaded, so this is only
// used to clean up assets we uploaded ourselves.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Image URL Validation ────────────────────────────────────────────────────
// Gallery entries are plain links, so a typo or a dead page would otherwise
// save happily and render as a broken image. Confirm the host answers and
// really is serving an image before accepting the URL.
async function validateImageUrl(raw) {
  const value = String(raw || '').trim()
  if (!value) return { ok: false, error: 'Image URL is required' }
  if (value.length > 2000) return { ok: false, error: 'Image URL is too long' }

  let parsed
  try {
    parsed = new URL(value)
  } catch {
    return { ok: false, error: 'That does not look like a valid link' }
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { ok: false, error: 'Only http or https links are allowed' }
  }

  let res
  try {
    res = await fetch(value, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) })
  } catch {
    return { ok: false, error: 'Could not reach that link. Check it opens in a browser.' }
  }

  // Some hosts reject HEAD outright; only treat that as a hard failure.
  if (!res.ok && res.status !== 405) {
    return { ok: false, error: `That link returned error ${res.status}` }
  }

  const type = (res.headers.get('content-type') || '').toLowerCase()
  if (type && !type.startsWith('image/')) {
    return { ok: false, error: 'That link is not an image' }
  }
  return { ok: true, url: value }
}

// ── Auth Middleware ──
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch { res.status(401).json({ error: 'Invalid token' }) }
}

// ── Express App ──
const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())

// ── Login Rate Limiting ─────────────────────────────────────────────────────
// There is a single admin account, so an unguarded login endpoint lets anyone
// grind through passwords. Count failures per client IP and per email, and
// refuse further attempts once either threshold trips.
const LOGIN_MAX_FAILURES = 5
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000
const loginFailures = new Map()

// Drop expired entries so the map cannot grow without bound on a long-lived
// process.
setInterval(() => {
  const now = Date.now()
  for (const [key, rec] of loginFailures) {
    if (!rec.until || rec.until <= now) loginFailures.delete(key)
  }
}, LOGIN_LOCKOUT_MS).unref()

function secondsUntilFree(key) {
  const rec = loginFailures.get(key)
  if (!rec || !rec.until) return 0
  return rec.until > Date.now() ? Math.ceil((rec.until - Date.now()) / 1000) : 0
}

function noteLoginFailure(key) {
  const rec = loginFailures.get(key) || { count: 0, until: 0 }
  rec.count += 1
  if (rec.count >= LOGIN_MAX_FAILURES) {
    rec.until = Date.now() + LOGIN_LOCKOUT_MS
    rec.count = 0
  }
  loginFailures.set(key, rec)
}

function clearLoginFailures(key) {
  loginFailures.delete(key)
}

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// ── Auth Routes ──
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  const ip = req.ip || 'unknown'
  const keys = [`ip:${ip}`, `email:${String(email).toLowerCase()}`]
  const wait = Math.max(...keys.map(secondsUntilFree))
  if (wait > 0) {
    res.set('Retry-After', String(wait))
    return res.status(429).json({
      error: `Too many failed attempts. Try again in ${Math.ceil(wait / 60)} minute(s).`,
    })
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    keys.forEach(clearLoginFailures)
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token, email, role: 'admin' })
  }

  // Count the failure against both keys, and delay the reply so a tight script
  // cannot test passwords any faster than the lockout allows.
  keys.forEach(noteLoginFailure)
  const locked = keys.some((k) => secondsUntilFree(k) > 0)
  if (locked) {
    const wait = Math.max(...keys.map(secondsUntilFree))
    res.set('Retry-After', String(wait))
    return res.status(429).json({
      error: `Too many failed attempts. Try again in ${Math.ceil(wait / 60)} minute(s).`,
    })
  }
  res.status(401).json({ error: 'Invalid email or password' })
})

app.get('/api/auth/verify', auth, (req, res) => res.json({ valid: true, admin: req.admin }))

// ── Gallery Routes ──
app.get('/api/gallery', async (req, res) => {
  await connectDB()
  const images = await Gallery.find().sort({ order: 1, createdAt: -1 })
  res.json(images)
})

// Admin - add a gallery entry by image URL
app.post('/api/gallery', auth, async (req, res) => {
  await connectDB()
  const { title, category, url } = req.body
  const check = await validateImageUrl(url)
  if (!check.ok) return res.status(400).json({ error: check.error })

  const duplicate = await Gallery.findOne({ url: check.url })
  if (duplicate) return res.status(400).json({ error: 'That image is already in the gallery' })

  const image = await Gallery.create({
    title: String(title || '').trim().slice(0, 120) || 'Untitled',
    category: String(category || 'General').trim().slice(0, 40) || 'General',
    url: check.url,
  })
  res.status(201).json(image)
})

app.put('/api/gallery/:id', auth, async (req, res) => {
  await connectDB()
  const { title, category, url } = req.body
  const update = {}
  if (title !== undefined) update.title = String(title).trim().slice(0, 120) || 'Untitled'
  if (category !== undefined) update.category = String(category).trim().slice(0, 40) || 'General'
  if (url !== undefined && url !== '') {
    const check = await validateImageUrl(url)
    if (!check.ok) return res.status(400).json({ error: check.error })
    const duplicate = await Gallery.findOne({ url: check.url, _id: { $ne: req.params.id } })
    if (duplicate) return res.status(400).json({ error: 'That image is already in the gallery' })
    update.url = check.url
  }
  const image = await Gallery.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!image) return res.status(404).json({ error: 'Image not found' })
  res.json(image)
})

app.delete('/api/gallery/:id', auth, async (req, res) => {
  await connectDB()
  const image = await Gallery.findById(req.params.id)
  if (image) {
    // Only clean up Cloudinary for assets we uploaded; URL entries have none.
    if (image.publicId) await cloudinary.uploader.destroy(image.publicId).catch(() => {})
    await Gallery.findByIdAndDelete(req.params.id)
  }
  res.json({ message: 'Deleted' })
})

// ── Contact Routes ──
app.post('/api/contact', async (req, res) => {
  await connectDB()
  const { name, phone, email, agencyName, patientName, specialty, ehrSoftware, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message required' })
  const submission = await Contact.create({ name, phone, email, agencyName, patientName, specialty, ehrSoftware, message })
  res.status(201).json(submission)
})

// Admin - reads contact submissions, which include patient names and emails
app.get('/api/contact', auth, async (req, res) => {
  await connectDB()
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

app.patch('/api/contact/:id', auth, async (req, res) => {
  await connectDB()
  const submission = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
  res.json(submission)
})

app.delete('/api/contact/:id', auth, async (req, res) => {
  await connectDB()
  await Contact.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

// ── Testimonial Routes ──────────────────────────────────────────────────────
// Accepts multipart/form-data with optional `image` and `video` files (Cloudinary
// upload) alongside the text fields. Plain JSON with URL strings still works.
const testimonialMedia = testimonialUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
])

function destroyAsset(publicId, resourceType = 'image') {
  if (!publicId) return
  cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    .catch(() => {}) // best-effort cleanup, never block the response
}

// Pull media out of an upload request. New files win over URL strings; when no
// file is sent the URL fields (or the existing values on partial updates) apply.
function mediaFromRequest(req, existing = {}) {
  const imageFile = req.files?.image?.[0]
  const videoFile = req.files?.video?.[0]
  const bodyImage = typeof req.body?.image === 'string' ? req.body.image.trim() : null
  const bodyVideo = typeof req.body?.videoUrl === 'string' ? req.body.videoUrl.trim() : null

  let image, imagePublicId
  if (imageFile) {
    image = imageFile.path
    imagePublicId = imageFile.filename
  } else if (bodyImage !== null) {
    image = bodyImage
    imagePublicId = bodyImage === existing.image ? (existing.imagePublicId || '') : ''
  } else {
    image = existing.image || ''
    imagePublicId = existing.imagePublicId || ''
  }

  let videoUrl, videoPublicId
  if (videoFile) {
    videoUrl = videoFile.path
    videoPublicId = videoFile.filename
  } else if (bodyVideo !== null) {
    videoUrl = bodyVideo
    videoPublicId = bodyVideo === existing.videoUrl ? (existing.videoPublicId || '') : ''
  } else {
    videoUrl = existing.videoUrl || ''
    videoPublicId = existing.videoPublicId || ''
  }

  return { image, imagePublicId, videoUrl, videoPublicId, imageFile, videoFile }
}

// Remove Cloudinary assets that were replaced or cleared by an update.
function cleanupReplacedMedia(existing, next) {
  if (existing.imagePublicId && existing.imagePublicId !== next.imagePublicId && existing.image !== next.image) {
    destroyAsset(existing.imagePublicId, 'image')
  }
  if (existing.videoPublicId && existing.videoPublicId !== next.videoPublicId && existing.videoUrl !== next.videoUrl) {
    destroyAsset(existing.videoPublicId, 'video')
  }
}

app.get('/api/testimonials', async (req, res) => {
  await connectDB()
  const testimonials = await Testimonial.find({ active: true, approved: true }).sort({ order: 1, createdAt: -1 })
  res.json(testimonials)
})

app.post('/api/testimonials/submit', testimonialMedia, async (req, res) => {
  await connectDB()
  const { name, role, content, rating } = req.body
  if (!name || !content) return res.status(400).json({ error: 'Name and review required' })
  const media = mediaFromRequest(req)
  await Testimonial.create({
    name, role: role || '', content, rating: rating || 5,
    image: media.image, videoUrl: media.videoUrl,
    imagePublicId: media.imagePublicId, videoPublicId: media.videoPublicId,
    source: 'user', approved: false, active: true,
  })
  res.status(201).json({ message: 'Review submitted. It will appear after approval.' })
})

// Admin - includes unapproved submissions, so it must not be public
app.get('/api/testimonials/all', auth, async (req, res) => {
  await connectDB()
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 })
  res.json(testimonials)
})

app.post('/api/testimonials', auth, testimonialMedia, async (req, res) => {
  await connectDB()
  const { name, role, content, rating } = req.body
  if (!name || !content) return res.status(400).json({ error: 'Name and review required' })
  const media = mediaFromRequest(req)
  const testimonial = await Testimonial.create({
    name, role: role || '', content, rating: rating || 5,
    image: media.image, videoUrl: media.videoUrl,
    imagePublicId: media.imagePublicId, videoPublicId: media.videoPublicId,
    source: 'admin', approved: true,
  })
  res.status(201).json(testimonial)
})

app.put('/api/testimonials/:id', auth, testimonialMedia, async (req, res) => {
  await connectDB()
  const existing = await Testimonial.findById(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Testimonial not found' })

  const media = mediaFromRequest(req, existing)
  cleanupReplacedMedia(existing, media)

  // Only pass fields the client is allowed to change; media comes from above so
  // a partial JSON update (approve/toggle) can never wipe an upload.
  const update = { ...req.body }
  delete update._id
  delete update.__v
  delete update.createdAt
  delete update.updatedAt
  delete update.source
  delete update.imagePublicId
  delete update.videoPublicId
  update.image = media.image
  update.imagePublicId = media.imagePublicId
  update.videoUrl = media.videoUrl
  update.videoPublicId = media.videoPublicId

  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true })
  res.json(testimonial)
})

app.delete('/api/testimonials/:id', auth, async (req, res) => {
  await connectDB()
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
  if (testimonial) {
    destroyAsset(testimonial.imagePublicId, 'image')
    destroyAsset(testimonial.videoPublicId, 'video')
  }
  res.json({ message: 'Deleted' })
})

// ── Blog Routes ──

// Public - published posts only
app.get('/api/blog', async (req, res) => {
  await connectDB()
  try {
    const { category, search, limit } = req.query
    const query = { published: true }
    if (category && category !== 'All') query.category = category
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      query.$or = [{ title: rx }, { excerpt: rx }, { content: rx }, { tags: rx }]
    }
    let posts = Blog.find(query).sort({ createdAt: -1 })
    if (limit) posts = posts.limit(Number(limit))
    const data = await posts
    res.json(data)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - single post by slug
app.get('/api/blog/slug/:slug', async (req, res) => {
  await connectDB()
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    post.views += 1
    await post.save()
    res.json(post)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - categories list
app.get('/api/blog/categories', async (req, res) => {
  await connectDB()
  try {
    const cats = await Blog.distinct('category', { published: true })
    res.json(cats)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - blog sitemap with live slugs
// Static pages ship in public/sitemap.xml; this endpoint covers blog posts
// so newly published articles are discoverable without a redeploy.
const SITE_ORIGIN = (process.env.SITE_URL || 'https://mbxsol.com').replace(/\/+$/, '')

app.get('/api/sitemap.xml', async (req, res) => {
  await connectDB()
  try {
    const posts = await Blog.find({ published: true })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 })
      .lean()

    const urls = posts
      .map(p => {
        const lastmod = new Date(p.updatedAt || p.createdAt || Date.now()).toISOString().slice(0, 10)
        return [
          '  <url>',
          `    <loc>${SITE_ORIGIN}/blog/${p.slug}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>0.6</priority>',
          '  </url>',
        ].join('\n')
      })
      .join('\n')

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urls,
      '</urlset>',
    ].filter(Boolean).join('\n')

    res.set('Content-Type', 'application/xml; charset=utf-8')
    res.set('Cache-Control', 'public, max-age=3600')
    res.send(xml)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - all posts (including drafts)
app.get('/api/blog/admin/all', auth, async (req, res) => {
  await connectDB()
  try {
    const posts = await Blog.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - single post by id (for editing)
app.get('/api/blog/admin/:id', auth, async (req, res) => {
  await connectDB()
  try {
    const post = await Blog.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - create (cover via image URL)
app.post('/api/blog', auth, async (req, res) => {
  await connectDB()
  try {
    const { title, excerpt, content, category, tags, author, published, coverImage } = req.body
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' })
    const post = await Blog.create({
      title,
      excerpt: excerpt || '',
      content,
      category: category || 'General',
      tags: tags ? String(tags).split(',').map(t => t.trim()).filter(Boolean) : [],
      author: author || 'MBX Solutions',
      published: published === 'true' || published === true,
      coverImage: coverImage || '',
      coverPublicId: '',
    })
    res.status(201).json(post)
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Slug already exists, try a different title' })
    res.status(500).json({ error: err.message })
  }
})

// Admin - update (cover via image URL)
app.put('/api/blog/:id', auth, async (req, res) => {
  await connectDB()
  try {
    const post = await Blog.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    const { title, excerpt, content, category, tags, author, published, coverImage } = req.body
    if (title !== undefined) post.title = title
    if (excerpt !== undefined) post.excerpt = excerpt
    if (content !== undefined) post.content = content
    if (category !== undefined) post.category = category
    if (tags !== undefined) post.tags = String(tags).split(',').map(t => t.trim()).filter(Boolean)
    if (author !== undefined) post.author = author
    if (published !== undefined) post.published = published === 'true' || published === true
    if (coverImage !== undefined) {
      // If old cover was a Cloudinary upload, clean it up
      if (post.coverPublicId && coverImage !== post.coverImage) {
        await cloudinary.uploader.destroy(post.coverPublicId).catch(() => {})
        post.coverPublicId = ''
      }
      post.coverImage = coverImage
    }
    await post.save()
    res.json(post)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - delete
app.delete('/api/blog/:id', auth, async (req, res) => {
  await connectDB()
  try {
    const post = await Blog.findById(req.params.id)
    if (post) {
      if (post.coverPublicId) await cloudinary.uploader.destroy(post.coverPublicId)
      await Blog.findByIdAndDelete(req.params.id)
    }
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Live Chat Routes ──

// Public - start/resume a chat session
app.post('/api/chat/start', async (req, res) => {
  await connectDB()
  try {
    const { sessionId, name } = req.body
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' })
    let session = await ChatSession.findOne({ sessionId })
    if (!session) {
      session = await ChatSession.create({ sessionId, visitorName: name ? String(name).slice(0, 60) : 'Visitor' })
    } else if (name && session.visitorName === 'Visitor') {
      session.visitorName = String(name).slice(0, 60)
      await session.save()
    }
    res.json({ sessionId: session.sessionId, ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - visitor sends a message
app.post('/api/chat/:sessionId/messages', async (req, res) => {
  await connectDB()
  try {
    const sessionId = req.params.sessionId
    const text = String(req.body.text || '').trim().slice(0, 3000)
    if (!text) return res.status(400).json({ error: 'Message text required' })
    let session = await ChatSession.findOne({ sessionId })
    if (!session) session = await ChatSession.create({ sessionId, visitorName: String(req.body.name || 'Visitor').slice(0, 60) })
    session.lastMessage = text
    session.lastMessageAt = new Date()
    session.adminUnread = (session.adminUnread || 0) + 1
    if (session.status === 'waiting') session.status = 'active'
    await session.save()
    const msg = await ChatMessage.create({ sessionId, sender: 'visitor', text })
    res.status(201).json(msg)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - visitor polls for new messages (after = ISO timestamp)
app.get('/api/chat/:sessionId/messages', async (req, res) => {
  await connectDB()
  try {
    const sessionId = req.params.sessionId
    const after = req.query.after
    const query = { sessionId }
    if (after) query.createdAt = { $gt: new Date(after) }
    const messages = await ChatMessage.find(query).sort({ createdAt: 1 })
    res.json(messages)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public - visitor marks admin messages as read
app.post('/api/chat/:sessionId/read', async (req, res) => {
  await connectDB()
  try {
    const sessionId = req.params.sessionId
    await ChatMessage.updateMany({ sessionId, sender: 'admin', read: false }, { $set: { read: true } })
    await ChatSession.findOneAndUpdate({ sessionId }, { $set: { visitorUnread: 0 } })
    res.json({ message: 'Read' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - list all chat sessions (for alarm + list)
app.get('/api/chat/admin/conversations', auth, async (req, res) => {
  await connectDB()
  try {
    const sessions = await ChatSession.find().sort({ lastMessageAt: -1 })
    res.json(sessions)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - full message thread for a session
app.get('/api/chat/admin/:sessionId/messages', auth, async (req, res) => {
  await connectDB()
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 })
    res.json(messages)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - admin replies
app.post('/api/chat/admin/:sessionId/messages', auth, async (req, res) => {
  await connectDB()
  try {
    const sessionId = req.params.sessionId
    const text = String(req.body.text || '').trim().slice(0, 3000)
    if (!text) return res.status(400).json({ error: 'Message text required' })
    const session = await ChatSession.findOne({ sessionId })
    if (!session) return res.status(404).json({ error: 'Session not found' })
    session.lastMessage = text
    session.lastMessageAt = new Date()
    session.visitorUnread = (session.visitorUnread || 0) + 1
    session.status = 'active'
    await session.save()
    const msg = await ChatMessage.create({ sessionId, sender: 'admin', text })
    res.status(201).json(msg)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin - mark visitor messages read (clears alarm count)
app.post('/api/chat/admin/:sessionId/read', auth, async (req, res) => {
  await connectDB()
  try {
    const sessionId = req.params.sessionId
    await ChatMessage.updateMany({ sessionId, sender: 'visitor', read: false }, { $set: { read: true } })
    await ChatSession.findOneAndUpdate({ sessionId }, { $set: { adminUnread: 0 } })
    res.json({ message: 'Read' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Upload / request errors → JSON (never HTML) ──
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  console.error(`[error] ${req.method} ${req.path}:`, err)
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File is too large. Maximum size is 50MB.' })
  }
  if (err?.name === 'MulterError') {
    return res.status(400).json({ error: err.message })
  }
  if (err) {
    const status = err.status || err.statusCode || 500
    return res.status(status).json({ error: status === 500 ? 'Something went wrong' : err.message })
  }
  next()
})

// ── Vercel Export ──
export default app
