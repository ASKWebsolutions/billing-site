import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../components/Animated'
import { SectionHeading } from '../components/UI'
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { usePageSeo } from '../hooks/useSeo'

export default function Gallery() {
  usePageSeo('/gallery')
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [broken, setBroken] = useState(() => new Set())

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/gallery`)
      .then(res => res.json())
      .then(data => { setImages(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = [...new Set(images.map(img => img.category))]
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory)

  const navigate = (dir) => {
    const idx = filtered.findIndex(img => img._id === selected._id)
    const next = dir === 'next' ? (idx + 1) % filtered.length : (idx - 1 + filtered.length) % filtered.length
    setSelected(filtered[next])
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[#C7E7F8]/70 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Our Gallery
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              See Our <span className="text-[#4486BF]">Work in Action</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              A visual showcase of the MBX Solutions team, operations, and the healthcare organizations we support.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          {/* Category Filter */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#4486BF] text-white shadow-lg shadow-[#4486BF]/20'
                      : 'bg-mbx-surface text-mbx-text-muted hover:bg-mbx-surface-warm hover:text-mbx-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block size-8 border-4 border-[#4486BF] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-mbx-text-muted">Loading gallery...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-mbx-text-muted">No images in the gallery yet.</p>
              <p className="mt-2 text-sm text-mbx-text-muted">Images uploaded from the admin dashboard will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-mbx-border hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  onClick={() => setSelected(img)}
                >
                  {broken.has(img._id) ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-mbx-surface text-mbx-text-muted">
                      <ImageOff size={26} className="mb-2 opacity-50" />
                      <p className="px-4 text-center text-xs">{img.title}</p>
                    </div>
                  ) : (
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      decoding="async"
                      onError={() => setBroken((prev) => new Set(prev).add(img._id))}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm font-bold text-white">{img.title}</p>
                    <p className="text-xs text-white/60 mt-1">{img.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4486BF]/95 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={() => setSelected(null)}>
            <X size={28} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); navigate('prev') }}>
            <ChevronLeft size={32} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); navigate('next') }}>
            <ChevronRight size={32} />
          </button>
          <motion.div
            key={selected._id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {broken.has(selected._id) ? (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-2xl bg-white/10 text-white/70">
                <ImageOff size={40} className="mb-3 opacity-60" />
                <p className="text-sm">This image could not be loaded</p>
              </div>
            ) : (
              <img
                src={selected.url}
                alt={selected.title}
                decoding="async"
                onError={() => setBroken((prev) => new Set(prev).add(selected._id))}
                className="w-full h-full object-contain rounded-2xl"
              />
            )}
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-white">{selected.title}</p>
              <p className="text-sm text-white/50">{selected.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
