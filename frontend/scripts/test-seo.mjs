/**
 * Verifies src/utils/seo.js against a minimal DOM stub: checks that each
 * helper creates/updates the right tags, that re-runs replace rather than
 * duplicate, and that absoluteUrl builds correct canonical/OG values.
 */
import assert from 'node:assert'

// ── Minimal DOM stub ────────────────────────────────────────────────────────
class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase()
    this.attrs = {}
    this.textContent = ''
    this.parent = null
  }
  setAttribute(k, v) { this.attrs[k] = String(v) }
  getAttribute(k) { return this.attrs[k] }
  removeAttribute(k) { delete this.attrs[k] }
  get children() { return this._children || [] }
  remove() {
    if (!this.parent) return
    const i = this.parent.children.indexOf(this)
    if (i > -1) this.parent.children.splice(i, 1)
    this.parent = null
  }
}

const head = new El('head')
head._children = []
head.appendChild = el => { el.parent = head; head._children.push(el) }
head.querySelector = sel => {
  const m = sel.match(/^(meta|link|script)\[([\w-]+)="([^"]+)"\]$/)
  if (!m) return null
  const [, tag, attr, val] = m
  return head._children.find(c => c.tagName === tag.toUpperCase() && c.getAttribute(attr) === val) || null
}
head.querySelectorAll = sel => {
  const m = sel.match(/^(\w+)\[([\w-]+)(?:="([^"]*)")?\]$/)
  if (!m) return []
  const [, tag, attr, val] = m
  return head._children.filter(c => {
    if (c.tagName !== tag.toUpperCase()) return false
    if (c.getAttribute(attr) === undefined) return false
    return val === undefined ? true : c.getAttribute(attr) === val
  })
}

globalThis.document = { head, title: '', createElement: tag => new El(tag) }

// ── Load module under test ──────────────────────────────────────────────────
const mod = await import('../src/utils/seo.js')
const {
  setTitle, setMeta, setCanonical, setOpenGraph, setJsonLd,
  absoluteUrl, SITE_URL, organizationSchema, faqSchema,
  articleSchema, localBusinessSchema, breadcrumbSchema,
} = mod

const find = (tag, attr, val) => head.querySelector(`${tag}[${attr}="${val}"]`)
const allJsonLd = () => head.querySelectorAll('script[data-seo-jsonld]')
const clear = () => { head._children = []; document.title = '' }

let pass = 0
const check = (name, fn) => {
  clear()
  try { fn(); pass++; console.log(`  ok  ${name}`) }
  catch (e) { console.log(`  FAIL ${name}\n       ${e.message}`); process.exitCode = 1 }
}

console.log(`SITE_URL = ${SITE_URL}\n`)

console.log('absoluteUrl')
check('root path', () => assert.equal(absoluteUrl('/'), `${SITE_URL}/`))
check('nested path', () => assert.equal(absoluteUrl('/blog/post'), `${SITE_URL}/blog/post`))
check('no leading slash', () => assert.equal(absoluteUrl('services'), `${SITE_URL}/services`))
check('absolute passthrough', () => assert.equal(absoluteUrl('https://cdn.x.com/a.png'), 'https://cdn.x.com/a.png'))

console.log('\ntitle + meta')
check('title gets brand suffix', () => {
  setTitle('Medical Billing Services in Texas')
  assert.equal(document.title, 'Medical Billing Services in Texas | MBX Solutions')
})
check('title meta tag mirrors document.title', () => {
  setTitle('Software')
  assert.equal(find('meta', 'name', 'title').getAttribute('content'), 'Software | MBX Solutions')
})
check('empty title falls back to default', () => {
  setTitle('')
  assert.ok(document.title.length > 0)
})
check('description fans out to og + twitter', () => {
  setMeta({ description: 'Test description' })
  assert.equal(find('meta', 'name', 'description').getAttribute('content'), 'Test description')
  assert.equal(find('meta', 'property', 'og:description').getAttribute('content'), 'Test description')
  assert.equal(find('meta', 'name', 'twitter:description').getAttribute('content'), 'Test description')
})
check('noindex writes robots + googlebot', () => {
  setMeta({ noindex: true })
  assert.equal(find('meta', 'name', 'robots').getAttribute('content'), 'noindex, nofollow')
  assert.equal(find('meta', 'name', 'googlebot').getAttribute('content'), 'noindex, nofollow')
})
check('index overwrites a previous noindex', () => {
  setMeta({ noindex: true }); setMeta({ noindex: false })
  assert.equal(find('meta', 'name', 'robots').getAttribute('content'), 'index, follow')
})
check('theme-color set', () => {
  setMeta({ themeColor: '#0B2F4E' })
  assert.equal(find('meta', 'name', 'theme-color').getAttribute('content'), '#0B2F4E')
})
check('no duplicate tags across repeat calls', () => {
  setMeta({ description: 'a' }); setMeta({ description: 'b' }); setMeta({ description: 'c' })
  const n = head.querySelectorAll('meta[name="description"]').length
  assert.equal(n, 1)
})

console.log('\ncanonical + open graph')
check('canonical is absolute and unique', () => {
  setCanonical('/faqs')
  const link = head.querySelector('link[rel="canonical"]')
  assert.equal(link.getAttribute('href'), `${SITE_URL}/faqs`)
  setCanonical('/blog')
  assert.equal(head.querySelectorAll('link[rel="canonical"]').length, 1)
})
check('og:url matches canonical', () => {
  setCanonical('/team')
  assert.equal(find('meta', 'property', 'og:url').getAttribute('content'), `${SITE_URL}/team`)
})
check('og image is absolutised', () => {
  setOpenGraph({ title: 'T', description: 'D', image: absoluteUrl('/og-home.png') })
  assert.equal(find('meta', 'property', 'og:image').getAttribute('content'), `${SITE_URL}/og-home.png`)
  assert.equal(find('meta', 'name', 'twitter:card').getAttribute('content'), 'summary_large_image')
})

console.log('\nJSON-LD')
check('single object appended', () => {
  setJsonLd(organizationSchema())
  assert.equal(allJsonLd().length, 1)
  const parsed = JSON.parse(allJsonLd()[0].textContent)
  assert.equal(parsed['@type'], 'Organization')
  assert.equal(parsed.telephone, '+18883706494')
})
check('array appends each entry', () => {
  setJsonLd([breadcrumbSchema([{ name: 'Home', path: '/' }]), faqSchema([{ q: 'Q?', a: 'A.' }])])
  assert.equal(allJsonLd().length, 2)
})
check('replaces instead of appending', () => {
  setJsonLd(organizationSchema()); setJsonLd(organizationSchema()); setJsonLd(organizationSchema())
  assert.equal(allJsonLd().length, 1)
})
check('null clears all', () => {
  setJsonLd(organizationSchema()); setJsonLd(null)
  assert.equal(allJsonLd().length, 0)
})
check('FAQPage shape', () => {
  const s = faqSchema([{ q: 'Q1', a: 'A1' }, { q: 'Q2', a: 'A2' }])
  assert.equal(s['@type'], 'FAQPage')
  assert.equal(s.mainEntity.length, 2)
  assert.equal(s.mainEntity[0].acceptedAnswer.text, 'A1')
})
check('Article shape', () => {
  const s = articleSchema({
    title: 'T', description: 'D', image: '/img.png',
    datePublished: '2026-01-01T00:00:00.000Z', author: 'MBX Solutions', keywords: ['a', 'b'],
  })
  assert.equal(s['@type'], 'Article')
  assert.equal(s.image[0], `${SITE_URL}/img.png`)
  assert.equal(s.dateModified, '2026-01-01T00:00:00.000Z')
  assert.equal(s.keywords, 'a, b')
  assert.ok(s.publisher.logo.url.startsWith(SITE_URL))
})
check('ProfessionalService areaServed', () => {
  const s = localBusinessSchema({ name: 'X', description: 'D', areaServed: 'Texas' })
  assert.equal(s['@type'], 'ProfessionalService')
  assert.equal(s.areaServed.name, 'Texas')
  assert.equal(s.url, `${SITE_URL}/locations/texas`)
})
check('BreadcrumbList positions are 1-based', () => {
  const s = breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations' }])
  assert.equal(s.itemListElement[0].position, 1)
  assert.equal(s.itemListElement[1].position, 2)
  assert.equal(s.itemListElement[1].item, `${SITE_URL}/locations`)
})

console.log(`\n${pass} checks passed`)
