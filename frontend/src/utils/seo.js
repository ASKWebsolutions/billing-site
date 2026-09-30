const DEFAULT_SITE_URL = 'https://mbxsol.com'

export const SITE_URL = (import.meta.env?.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')

export const SITE_NAME = 'MBX Solutions'
export const DEFAULT_OG_IMAGE = '/og-default.png'
export const DEFAULT_TWITTER_HANDLE = '@mbxsol'

export const CONTACT = {
  phone: '+18883706494',
  phoneFormatted: '+1 (888) 370-6494',
  email: 'info@mbxsol.com',
  logo: '/mbx-logo.png',
  linkedin: 'https://www.linkedin.com/company/mbxsol/',
  facebook: 'https://www.facebook.com/Mbxsol',
}

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const MANAGED_ATTR = 'data-seo'

function upsertMeta(keyAttr, keyValue, attrs) {
  let el = document.head.querySelector(`meta[${keyAttr}="${keyValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(keyAttr, keyValue)
    el.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(el)
  }
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === null || value === '') el.removeAttribute(name)
    else el.setAttribute(name, value)
  }
  return el
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

function removeManaged(selector) {
  document.head.querySelectorAll(selector).forEach(el => el.remove())
}

export function setTitle(title) {
  const full = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Healthcare Revenue Cycle Management`
  document.title = full
  upsertMeta('name', 'title', { content: full })
  return full
}

export function setMeta({ title, description, keywords, noindex, themeColor, locale = 'en_US' }) {
  if (title !== undefined) setTitle(title)
  if (description !== undefined) {
    upsertMeta('name', 'description', { content: description })
    upsertMeta('property', 'og:description', { content: description })
    upsertMeta('name', 'twitter:description', { content: description })
  }
  if (keywords !== undefined) upsertMeta('name', 'keywords', { content: keywords })
  if (noindex !== undefined) {
    const content = noindex ? 'noindex, nofollow' : 'index, follow'
    upsertMeta('name', 'robots', { content })
    upsertMeta('name', 'googlebot', { content })
  }
  if (themeColor !== undefined) upsertMeta('name', 'theme-color', { content: themeColor })
  upsertMeta('property', 'og:locale', { content: locale })
}

export function setCanonical(pathOrUrl) {
  const href = absoluteUrl(pathOrUrl)
  upsertLink('canonical', href)
  upsertMeta('property', 'og:url', { content: href })
  upsertMeta('name', 'twitter:url', { content: href })
  return href
}

export function setOpenGraph({ title, description, image, type = 'website', url, siteName = SITE_NAME }) {
  upsertMeta('property', 'og:title', { content: title })
  upsertMeta('property', 'og:type', { content: type })
  upsertMeta('property', 'og:site_name', { content: siteName })
  upsertMeta('property', 'og:image', { content: image })
  upsertMeta('property', 'og:image:alt', { content: title })
  upsertMeta('property', 'og:image:width', { content: '1200' })
  upsertMeta('property', 'og:image:height', { content: '630' })
  upsertMeta('name', 'twitter:card', { content: 'summary_large_image' })
  upsertMeta('name', 'twitter:site', { content: DEFAULT_TWITTER_HANDLE })
  upsertMeta('name', 'twitter:title', { content: title })
  upsertMeta('name', 'twitter:image', { content: image })
  if (url) upsertMeta('property', 'og:url', { content: absoluteUrl(url) })
  else if (description) upsertMeta('property', 'og:description', { content: description })
}

export function setJsonLd(data) {
  removeManaged('script[data-seo-jsonld]')
  if (!data) return
  const list = Array.isArray(data) ? data : [data]
  list.filter(Boolean).forEach(item => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(CONTACT.logo),
    image: absoluteUrl(CONTACT.logo),
    description:
      'MBX Solutions is a healthcare revenue cycle management company delivering medical billing, coding, credentialing and virtual assistance for home health, hospice and physician practices.',
    telephone: CONTACT.phone,
    email: CONTACT.email,
    sameAs: [CONTACT.linkedin, CONTACT.facebook],
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'Revenue Cycle Management',
      'Medical Billing',
      'Home Health Billing',
      'Hospice Billing',
      'PDGM',
      'Medical Coding',
      'Physician Credentialing',
      'Accounts Receivable Recovery',
    ],
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleSchema({ title, description, image, datePublished, dateModified, author, keywords }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [absoluteUrl(image)] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Organization', name: author || SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: absoluteUrl(CONTACT.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog`) },
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
  }
}

export function faqSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function localBusinessSchema({ name, description, areaServed, telephone = CONTACT.phone, email = CONTACT.email, address }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    alternateName: name,
    url: absoluteUrl(`/locations/${areaServed.toLowerCase().replace(/\s+/g, '-')}`),
    description,
    image: absoluteUrl(CONTACT.logo),
    logo: absoluteUrl(CONTACT.logo),
    telephone,
    email,
    priceRange: '$$',
    parentOrganization: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'State', name: areaServed },
    ...(address
      ? { address: { '@type': 'PostalAddress', ...address } }
      : {}),
    sameAs: [CONTACT.linkedin, CONTACT.facebook],
  }
}
