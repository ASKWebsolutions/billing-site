/** Validates blog content shape: word count, structure, and internal links. */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({
  title: String, slug: String, excerpt: String, content: String,
  coverImage: String, category: String, tags: [String], published: Boolean,
}))

await mongoose.connect(process.env.MONGODB_URI)
const posts = await Blog.find({ published: true }).sort({ createdAt: 1 }).lean()

// Paths that actually exist in App.jsx
const VALID_PATHS = new Set([
  '/', '/services', '/home-health-hospice', '/rcm-services', '/software',
  '/medical-assistant', '/capabilities', '/solution', '/mbx-advantage',
  '/account-manager', '/free-billing-audit', '/projects/small', '/projects/large',
  '/gallery', '/testimonials', '/about', '/company', '/team', '/resources',
  '/faqs', '/locations', '/blog', '/connect-us', '/hipaa', '/privacy-policy',
])

let problems = 0
for (const p of posts) {
  const words = String(p.content).trim().split(/\s+/).length
  const h2 = (p.content.match(/^## /gm) || []).length
  const h3 = (p.content.match(/^### /gm) || []).length
  const lists = (p.content.match(/^- /gm) || []).length
  const links = [...p.content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => m[2])
  const badLinks = links.filter(h => !VALID_PATHS.has(h) && !/^https?:/i.test(h))
  const needsLink = ['Blog', 'Coding', 'Compliance', 'Billing', 'Operations', 'Industry News'].includes(p.category)

  const issues = []
  if (words < 700) issues.push(`short (${words}w)`)
  if (h2 < 4) issues.push(`only ${h2} h2`)
  if (!p.coverImage) issues.push('no image')
  if (!p.excerpt || p.excerpt.length < 80) issues.push('weak excerpt')
  if (p.tags.length < 4) issues.push(`only ${p.tags.length} tags`)
  if (needsLink && links.length === 0) issues.push('no internal links')
  if (badLinks.length) issues.push(`BAD LINKS: ${badLinks.join(', ')}`)

  if (issues.length) problems++
  console.log(`${issues.length ? 'WARN' : 'ok  '} ${String(words).padStart(4)}w  h2:${h2} h3:${h3} li:${String(lists).padStart(2)} link:${links.length}  [${p.category}]`)
  console.log(`     ${p.title}`)
  if (issues.length) console.log(`     -> ${issues.join(' | ')}`)
}

console.log(`\n${posts.length} posts checked, ${problems} with warnings`)
const cats = [...new Set(posts.map(p => p.category))].sort()
console.log('categories:', cats.join(', '))
await mongoose.disconnect()
