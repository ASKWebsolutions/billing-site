import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import ContactForm from './ContactForm'

const slides = [
  {
    id: 'intro',
    bg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&auto=format&fit=crop&q=80',
    giant: 'RCM',
    eyebrow: 'MBX Solutions',
    lines: ['Stop Writing Off Claims.', 'Recover Your', 'Trapped Cash.'],
    highlightIndex: 2,
    para: 'Most healthcare practices lose $40,000 to $180,000 every year simply because claims sit stuck in unpaid aging buckets until the Timely Filing Limit (TFL) is crossed.',
    card: {
      title: 'Why MBX Solutions',
      tagline: 'Full-cycle RCM, simplified for your practice.',
      bullets: [
        'Industry-leading 98.5% clean claims rate',
        '24/7 expert billing support',
        '5-day claims turnaround',
      ],
    },
    buttons: [
      { label: 'Get Your Free Billing Audit', to: '/free-billing-audit' },
      { label: 'Explore Our Capabilities', to: '/capabilities' },
    ],
  },
  {
    id: 'billing',
    bg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&auto=format&fit=crop&q=80',
    giant: '20%',
    eyebrow: 'Services',
    lines: ['Boost Collections &', 'Grow Your Practice', 'by 20%'],
    highlightIndex: 2,
    para: null,
    card: {
      title: 'Medical Billing Services',
      tagline: 'MBX Solutions: clean claims, faster payments, zero revenue leakage.',
      bullets: [
        'Electronic claim submission within 24–48 hours',
        'Aggressive denial appeals & timely filing management',
        'ERA/EOB payment posting & reconciliation',
      ],
    },
    buttons: [
      { label: 'Get Your Free Billing Audit', to: '/free-billing-audit' },
      { label: 'Explore Services', to: '/services' },
    ],
  },
  {
    id: 'coding',
    bg: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&auto=format&fit=crop&q=80',
    giant: 'CODING',
    eyebrow: 'Services',
    lines: ['Precision Coding That', 'Drives Accuracy &', 'Maximizes Reimbursement.'],
    highlightIndex: 2,
    para: null,
    card: {
      title: 'Medical Coding (ICD-10)',
      tagline: 'MBX Solutions: ICD-10 coding that maximizes reimbursement.',
      bullets: [
        'Certified ICD-10-CM & CPT clinical coders',
        'PDGM case-mix grouping & diagnosis sequencing',
        'Turnaround in as fast as 24 hours',
      ],
    },
    buttons: [
      { label: 'Get Your Free Billing Audit', to: '/free-billing-audit' },
      { label: 'Explore Services', to: '/services' },
    ],
  },
]

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 10000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-atmos"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <AnimatePresence>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.bg}
              alt=""
              className="h-[115%] w-full object-cover object-[center_30%] opacity-85 translate-y-8"
            />
          </motion.div>
        </AnimatePresence>
        {/* Readability scrim behind content */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/45 to-white/0"
          aria-hidden="true"
        />
        {/* Blue glows */}
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#4486BF]/10 blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-[#4486BF]/6 blur-[100px]" />
        {/* Giant background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.giant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="block text-[20vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter"
            >
              {slide.giant}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Subtle pulse line */}
        <svg className="absolute bottom-0 left-0 right-0 h-24 text-mbx-teal/8" viewBox="0 0 1440 90" preserveAspectRatio="none">
          <motion.path
            d="M0,45 L120,45 L140,15 L160,75 L180,30 L200,60 L220,45 L360,45 L380,20 L400,70 L420,35 L440,55 L460,45 L600,45 L620,18 L640,72 L660,32 L680,58 L700,45 L840,45 L860,22 L880,68 L900,38 L920,52 L940,45 L1080,45 L1100,15 L1120,75 L1140,30 L1160,60 L1180,45 L1320,45 L1340,20 L1360,70 L1380,35 L1400,55 L1440,45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-24">
          {/* Left: Slide content */}
          <div className="min-h-[440px] sm:min-h-[480px] lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {slide.eyebrow && (
                  <span className="mb-4 inline-flex items-center rounded-full border border-mbx-teal/30 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-mbx-teal">
                    {slide.eyebrow}
                  </span>
                )}

                <motion.p
                  className="text-[1.7rem] font-extrabold tracking-tight text-mbx-navy sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.08]"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: index === 0 ? 0.4 : 0.05 } },
                  }}
                >
                  {slide.lines.map((line, i) => (
                    <motion.span
                      key={i}
                      className="block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {i === slide.highlightIndex ? <span className="text-[#00B8A9]">{line}</span> : line}
                    </motion.span>
                  ))}
                </motion.p>

                {/* Stable, non-rotating h1 so crawlers always read a single
                    keyword-relevant headline instead of one of three slides. */}
                <h1 className="sr-only">
                  Healthcare Revenue Cycle Management Services for Home Health, Hospice and Physician Practices
                </h1>

                {slide.para && (
                  <motion.p
                    className="mt-4 max-w-xl text-base font-medium leading-relaxed text-mbx-navy/75 md:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index === 0 ? 1 : 0.3 }}
                  >
                    {slide.para}
                  </motion.p>
                )}

                {slide.card && (
                  <div className="mt-6 max-w-2xl rounded-2xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-[#0B2348]/10 backdrop-blur-md">
                    <h3 className="text-[15px] font-extrabold uppercase tracking-wide text-mbx-navy">
                      {slide.card.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-mbx-teal">{slide.card.tagline}</p>
                    {slide.card.desc && (
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-mbx-text-muted">
                        {slide.card.desc}
                      </p>
                    )}
                    <ul className="mt-4 space-y-2">
                      {slide.card.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13.5px] font-medium text-mbx-text-muted">
                          <CheckCircle size={16} className="mt-0.5 shrink-0 text-mbx-teal" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.div
                  className="mt-7 flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index === 0 ? 1.2 : 0.4 }}
                >
                  {slide.buttons.map((btn) => (
                    <Link
                      key={btn.label}
                      to={btn.to}
                      className="group inline-flex items-center gap-2.5 rounded-xl bg-[#4486BF] px-8 py-4 text-base font-bold text-mbx-white transition-all duration-300 hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/20 hover:-translate-y-0.5"
                    >
                      {btn.label}
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="mt-8 flex items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.lines.map((l) => l).join(' ')}`}
                  className="group"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-12 bg-[#4486BF]' : 'w-6 bg-mbx-navy/25 group-hover:bg-mbx-navy/40'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-extrabold tracking-widest text-mbx-navy/40">
                0{index + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex w-full max-w-md mx-auto lg:mx-0 lg:h-full"
          >
            <ContactForm compact className="flex-1" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}