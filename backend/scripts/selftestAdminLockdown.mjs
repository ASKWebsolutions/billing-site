/**
 * End-to-end checks for the admin auth lockdown and the gallery link system.
 *
 * Confirms (a) every admin-only route rejects anonymous callers, (b) the
 * routes the public site depends on still answer without a token, and
 * (c) gallery entries can be added by URL with broken/duplicate links
 * rejected. Every row it creates is removed again before exiting.
 */
import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const API = process.env.API_ORIGIN || 'http://localhost:5000'
const token = jwt.sign({ email: 'lockdown-selftest@local', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5m' })
const auth = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
const json = { 'Content-Type': 'application/json' }
const BAD_ID = '000000000000000000000000'

// A real, stable image, plus things that must be rejected.
const REAL_IMAGE = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80'
const NOT_AN_IMAGE = 'https://example.com/'

let passed = 0
const check = async (name, fn) => { await fn(); passed++; console.log(`  ok  ${name}`) }
const statusOf = async (path, options) => (await fetch(`${API}${path}`, options)).status

await mongoose.connect(process.env.MONGODB_URI)
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', new mongoose.Schema({}, { strict: false }))
const created = []

const cleanup = async () => {
  await Gallery.deleteMany({ url: REAL_IMAGE })
  await Gallery.deleteMany({ url: { $in: created } })
  await mongoose.disconnect()
}

try {
  console.log('Admin routes reject anonymous callers')
  for (const [method, path] of [
    ['GET', '/api/contact'],
    ['GET', '/api/testimonials/all'],
    ['GET', '/api/blog/admin/all'],
    ['GET', '/api/chat/admin/conversations'],
  ]) {
    await check(`${method} ${path} -> 401`, async () => {
      assert.strictEqual(await statusOf(path), 401)
    })
  }

  for (const [method, path, body] of [
    ['POST', '/api/gallery', { title: 'x', url: REAL_IMAGE }],
    ['PUT', `/api/gallery/${BAD_ID}`, { title: 'x' }],
    ['DELETE', `/api/gallery/${BAD_ID}`],
    ['POST', '/api/testimonials', { name: 'a', role: 'b', content: 'c' }],
    ['PUT', `/api/testimonials/${BAD_ID}`, { title: 'x' }],
    ['DELETE', `/api/testimonials/${BAD_ID}`],
    ['PATCH', `/api/contact/${BAD_ID}`],
    ['DELETE', `/api/contact/${BAD_ID}`],
  ]) {
    await check(`${method} ${path.replace(BAD_ID, ':id')} -> 401`, async () => {
      const res = await statusOf(path, { method, headers: json, body: body ? JSON.stringify(body) : undefined })
      assert.strictEqual(res, 401)
    })
  }

  console.log('\nPublic routes still work without a token')
  for (const path of [
    '/api/health',
    '/api/gallery',
    '/api/blog',
    '/api/blog/categories',
    '/api/testimonials',
  ]) {
    await check(`GET ${path} -> 200`, async () => {
      assert.strictEqual(await statusOf(path), 200)
    })
  }

  console.log('\nGallery accepts good links and rejects bad ones')
  await Gallery.deleteMany({ url: REAL_IMAGE })

  const add = await fetch(`${API}/api/gallery`, {
    method: 'POST', headers: auth,
    body: JSON.stringify({ title: 'Self Test', category: 'Operations', url: REAL_IMAGE }),
  })
  const added = await add.json()
  created.push(added._id)
  await check('valid image URL is saved', async () => {
    assert.strictEqual(add.status, 201)
    assert.strictEqual(added.url, REAL_IMAGE)
    assert.strictEqual(added.category, 'Operations')
  })
  await check('URL entries store no Cloudinary publicId', async () => {
    assert.ok(!added.publicId)
  })

  await check('duplicate URL is rejected', async () => {
    const dup = await fetch(`${API}/api/gallery`, {
      method: 'POST', headers: auth,
      body: JSON.stringify({ title: 'Dup', url: REAL_IMAGE }),
    })
    assert.strictEqual(dup.status, 400)
  })

  await check('a link that is not an image is rejected', async () => {
    const notImage = await fetch(`${API}/api/gallery`, {
      method: 'POST', headers: auth,
      body: JSON.stringify({ title: 'Bad', url: NOT_AN_IMAGE }),
    })
    assert.strictEqual(notImage.status, 400)
  })

  for (const [label, url] of [
    ['a malformed link', 'definitely not a url'],
    ['a javascript scheme', 'javascript:alert(1)'],
    ['an empty value', '   '],
  ]) {
    await check(`${label} is rejected`, async () => {
      const res = await fetch(`${API}/api/gallery`, {
        method: 'POST', headers: auth,
        body: JSON.stringify({ title: 'Bad', url }),
      })
      assert.strictEqual(res.status, 400)
    })
  }

  await check('authorised delete works without a Cloudinary asset', async () => {
    const del = await fetch(`${API}/api/gallery/${added._id}`, { method: 'DELETE', headers: auth })
    assert.strictEqual(del.status, 200)
  })
  await check('deleted image is really gone', async () => {
    assert.strictEqual(await Gallery.countDocuments({ _id: added._id }), 0)
  })

  console.log(`\n${passed} checks passed`)
} finally {
  await cleanup()
}
