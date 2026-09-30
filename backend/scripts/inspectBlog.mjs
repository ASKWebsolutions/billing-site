/** Read-only inspection of the blog collection before seeding. */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const blogSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, excerpt: String,
  content: String, coverImage: String, coverPublicId: String,
  category: String, tags: [String], author: String,
  published: Boolean, views: Number,
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

// Same filter the seed script deletes with
const DELETE_FILTER = {
  $or: [
    { content: /ipsam suscipit/i },
    { content: /eveniet sunt/i },
    { content: /dolorum commodi/i },
    { content: /est non sint nesciun/i },
    { title: /^(Untitled|Test|Demo)/i },
  ],
}

const uri = process.env.MONGODB_URI
if (!uri) { console.error('MONGODB_URI missing'); process.exit(1) }

await mongoose.connect(uri)
console.log('Connected. DB host:', mongoose.connection.host, '/', mongoose.connection.name)

const total = await Blog.countDocuments()
const published = await Blog.countDocuments({ published: true })
const withImage = await Blog.countDocuments({ coverImage: { $nin: ['', null, undefined] } })
console.log(`\nTotals: ${total} posts, ${published} published, ${withImage} with coverImage`)

const doomed = await Blog.find(DELETE_FILTER).select('title').lean()
console.log(`\nDelete filter would match: ${doomed.length}`)
doomed.forEach(d => console.log(`  - ${d.title}`))

const posts = await Blog.find().select('title slug published createdAt coverImage').sort({ createdAt: -1 }).lean()
console.log(`\nExisting posts:`)
posts.forEach(p => {
  const img = p.coverImage ? p.coverImage.slice(0, 62) + '...' : '(none)'
  console.log(`  ${p.published ? 'PUB' : 'DRAFT'}  ${String(p.createdAt).slice(0, 10)}  ${p.slug}`)
  console.log(`         img: ${img}`)
})

await mongoose.disconnect()
