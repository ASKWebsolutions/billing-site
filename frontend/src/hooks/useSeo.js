import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  setMeta,
  setCanonical,
  setOpenGraph,
  setJsonLd,
  absoluteUrl,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from '../utils/seo'
import { SEO } from '../data/seo'

/**
 * Manages title, meta description, canonical, Open Graph, Twitter card and
 * JSON-LD for a route. All tags are marked data-seo and replaced on change.
 */
export default function useSeo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  noindex = false,
  jsonLd,
} = {}) {
  const { pathname } = useLocation()
  const canonicalPath = path ?? pathname
  // Callers build schema objects inline, so the reference changes every
  // render. Depend on a serialized key instead to avoid an effect loop.
  const jsonLdKey = JSON.stringify(jsonLd ?? null)

  useEffect(() => {
    const fullTitle = title || SITE_NAME
    const ogImage = absoluteUrl(image)

    setMeta({ title, description, keywords, noindex })
    setCanonical(canonicalPath)
    setOpenGraph({
      title: fullTitle,
      description,
      image: ogImage,
      type,
      url: canonicalPath,
    })
    setJsonLd(jsonLdKey === 'null' ? null : JSON.parse(jsonLdKey))
  }, [title, description, canonicalPath, image, type, keywords, noindex, jsonLdKey])
}

/**
 * Convenience wrapper for fixed routes: pulls metadata from src/data/seo.js.
 * Accepts overrides to merge, e.g. usePageSeo('/blog', { jsonLd: [...] }).
 */
export function usePageSeo(path, overrides) {
  const base = SEO[path] || {}
  const merged = { ...base, path, ...overrides }
  useSeo(merged)
  return merged
}
