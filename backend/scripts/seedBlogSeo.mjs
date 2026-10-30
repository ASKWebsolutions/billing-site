/**
 * SEO blog seed script (2026)
 * Run:  cd backend && node scripts/seedBlogSeo.mjs
 *
 * Upserts 10 SEO-ready posts by slug. Safe to re-run — it only inserts or
 * updates the posts defined here and never touches other blog records.
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import post01 from './seoBlogs/01-home-health-rcm-mistakes.mjs'
import post02 from './seoBlogs/02-hospice-billing-denials-2026.mjs'
import post03 from './seoBlogs/03-oasis-e-qa-checklist-2026.mjs'
import post04 from './seoBlogs/04-clean-claims-rate-qa-process.mjs'
import post05 from './seoBlogs/05-reduce-ar-days-35-percent.mjs'
import post06 from './seoBlogs/06-provider-credentialing-payer-enrollment-2026.mjs'
import post07 from './seoBlogs/07-rcm-trends-2026-denial-prevention.mjs'
import post08 from './seoBlogs/08-home-health-vs-hospice-billing.mjs'
import post09 from './seoBlogs/09-payer-friction-home-health-revenue.mjs'
import post10 from './seoBlogs/10-in-house-vs-outsourced-medical-billing-2026.mjs'

dotenv.config()

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

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

const posts = [post01, post02, post03, post04, post05, post06, post07, post08, post09, post10]

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI missing in backend/.env')
    process.exit(1)
  }
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  for (const post of posts) {
    const res = await Blog.updateOne(
      { slug: post.slug },
      { $set: post },
      { upsert: true }
    )
    console.log(res.upsertedCount ? `Inserted: ${post.slug}` : `Updated:  ${post.slug}`)
  }

  const total = await Blog.countDocuments()
  console.log(`\nDone. Total blog posts in DB: ${total}`)
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
