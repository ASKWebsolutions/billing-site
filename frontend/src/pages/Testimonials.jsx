import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../components/Animated'
import { Star, Quote } from 'lucide-react'
import { usePageSeo } from '../hooks/useSeo'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Testimonials() {
  usePageSeo('/testimonials')
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/testimonials`)
      .then(res => res.json())
      .then(data => { setTestimonials(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[340px] w-[340px] rounded-full bg-[#C7E7F8]/70 blur-[130px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Testimonials
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              What Our <span className="text-[#4486BF]">Clients Say</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Real feedback from healthcare organizations that trust MBX Solutions for their revenue cycle management.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block size-8 border-4 border-[#4486BF] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-mbx-text-muted">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <AnimatedSection key={t._id || t.name} delay={i * 0.08}>
                  <div className="group relative rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-[#4486BF]/30 hover:-translate-y-1 h-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-[#4486BF] to-[#5A9AD0] transition-all duration-500 group-hover:w-full" />
                    <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[#4486BF]/10 text-[#4486BF]">
                      <Quote size={22} />
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating || 5)].map((_, j) => (
                        <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-mbx-text-muted mb-6">&ldquo;{t.content}&rdquo;</p>
                    <div className="border-t border-mbx-border pt-5">
                      <p className="text-base font-extrabold text-mbx-navy">{t.name}</p>
                      {t.role && <p className="text-sm text-[#4486BF] font-medium">{t.role}</p>}
                      {t.source === 'user' && (
                        <span className="mt-1 inline-block rounded-full bg-[#4486BF]/10 px-2.5 py-0.5 text-[9px] font-bold text-[#4486BF] uppercase tracking-wider">Client Review</span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mbx-surface">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">
              Ready to Experience the MBX Difference?
            </h2>
            <p className="text-lg text-mbx-text-muted max-w-2xl mx-auto mb-8">
              Join the growing number of healthcare organizations that trust MBX Solutions for their revenue cycle management.
            </p>
            <a href="/connect-us" className="inline-flex items-center gap-2.5 rounded-xl bg-[#4486BF] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/20 hover:-translate-y-0.5">
              Get Started Today
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
