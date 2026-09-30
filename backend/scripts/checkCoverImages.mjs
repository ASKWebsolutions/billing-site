/** HEAD-checks every coverImage URL in the blog collection. */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({ coverImage: String, slug: String }))

await mongoose.connect(process.env.MONGODB_URI)
const posts = await Blog.find({ coverImage: { $nin: ['', null, undefined] } })
  .select('slug coverImage').lean()

console.log(`Checking ${posts.length} cover images...\n`)

const results = await Promise.all(posts.map(async p => {
  try {
    const res = await fetch(p.coverImage, { method: 'HEAD', redirect: 'follow' })
    return { slug: p.slug, status: res.status, type: res.headers.get('content-type'), len: res.headers.get('content-length') }
  } catch (e) {
    return { slug: p.slug, status: 'ERR', type: e.message, len: null }
  }
}))

let ok = 0
let bad = 0
for (const r of results) {
  const pass = r.status === 200
  if (pass) ok++
  else bad++
  console.log(`  ${pass ? 'ok  ' : 'FAIL'} ${r.status}  ${String(r.type).padEnd(18)} ${r.slug}`)
}

console.log(`\n${ok} reachable, ${bad} broken`)
await mongoose.disconnect()
if (bad > 0) process.exitCode = 1
