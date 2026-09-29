import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Award,
  Baby,
  BadgeCheck,
  Banknote,
  Bone,
  Brain,
  Brush,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Cross,
  Droplets,
  FileQuestion,
  FileText,
  FileWarning,
  FileX2,
  FlaskConical,
  Footprints,
  Globe2,
  Heart,
  HeartPulse,
  Hospital,
  Layers,
  Mail,
  Network,
  PersonStanding,
  Phone,
  Pill,
  Scissors,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  AnimatedSection,
  ScaleIn,
  StaggerChildren,
  StaggerItem,
} from '../components/Animated'
import ContactForm from '../components/ContactForm'

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goToAudit = () => {
  const el = document.getElementById('free-audit')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.location.href = '/free-billing-audit#free-audit'
}

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 2000, className = '' }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const current = useRef(0)
  const raf = useRef(0)

  const animateTo = (target, from, dur) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    const startTime = performance.now()
    const startVal = from
    const tick = (now) => {
      const p = Math.min((now - startTime) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = startVal + (target - startVal) * eased
      current.current = v
      setDisplay(v)
      raf.current = p < 1 ? requestAnimationFrame(tick) : 0
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = value
      setDisplay(value)
      return
    }
    if (started.current) {
      animateTo(value, current.current, Math.min(duration, 900))
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          started.current = true
          obs.disconnect()
          animateTo(value, 0, duration)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, decimals])

  const fmt =
    decimals > 0
      ? display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(display).toLocaleString('en-US')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt}
      {suffix}
    </span>
  )
}

function SectionHead({ eyebrow, icon: Icon, title, subtitle, dark = true, center = true, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <span
          className={`mb-6 inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] ${
            dark
              ? 'border-[#00D9C7]/30 bg-[#00D9C7]/5 text-[#00D9C7]'
              : 'border-[#0E9B8F]/25 bg-[#0E9B8F]/5 text-[#0E7C72]'
          }`}
        >
          <span
            className={`flex size-5 items-center justify-center rounded-full text-white ${
              dark ? 'bg-[#00D9C7]' : 'bg-[#0E9B8F]'
            }`}
          >
            <Icon size={11} strokeWidth={3} />
          </span>
          {eyebrow}
        </span>
      )}
      <h2
        className={`mb-5 text-3xl font-extrabold tracking-[-0.02em] leading-[1.08] md:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-[#F7F8FA]' : 'text-[#0B1428]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed md:text-lg ${dark ? 'text-[#B8C5D8]' : 'text-[#0B1428]/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function TealButton({ children, onClick, size = 'lg', className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#00D9C7] font-bold text-[#0B1428] transition-all duration-300 hover:shadow-xl hover:shadow-[#00D9C7]/25 hover:-translate-y-0.5 ${
        size === 'lg' ? 'px-7 py-3.5 text-sm md:px-8 md:text-[15px]' : 'px-5 py-2.5 text-sm'
      } ${className}`}
    >
      {children}
      <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  )
}

function OutlineButton({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#00D9C7]/40 px-7 py-3.5 text-sm font-bold text-[#F7F8FA] transition-all duration-300 hover:border-[#00D9C7] hover:text-[#0B1428] md:px-8 md:text-[15px] ${className}`}
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* 1. HERO + LIVE COLLECTIONS LEDGER + PROOF STRIP                    */
/* ------------------------------------------------------------------ */

const LEDGER_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    label: 'Revenue cycle analytics',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    label: 'Physician & home health billing',
  },
  {
    src: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop',
    label: 'Claims & medical records',
  },
]

const LEDGER_STYLES = [
  {
    icon: FileText,
    iconWrap: 'bg-[#0B1428]/5 text-[#0B1428]',
    barBg: 'bg-white',
    barBorder: 'border-[#0B1428]/[0.06]',
    valueClass: 'text-[#0B1428]',
  },
  {
    icon: Banknote,
    iconWrap: 'bg-[#00D9C7]/15 text-[#0E9B8F]',
    barBg: 'bg-[#E9F9F6]',
    barBorder: 'border-[#00D9C7]/25',
    valueClass: 'text-[#0E9B8F]',
  },
  {
    icon: TrendingUp,
    iconWrap: 'bg-[#FB923C]/15 text-[#EA7A2F]',
    barBg: 'bg-[#FFF7E6]',
    barBorder: 'border-[#F59E0B]/25',
    valueClass: 'text-[#EA7A2F]',
  },
]

const LEDGER_DATA = {
  '30d': [
    { label: 'Claims & 30-Day Episodes Submitted', number: 7840 },
    { label: 'Net Payments Collected (Deposited to Bank)', number: 314800, prefix: '$' },
    { label: 'Old AR Recovered (90+ Days Aging)', number: 68400, prefix: '$' },
  ],
  annual: [
    { label: 'Claims & Episodes Submitted (Annualized)', number: 94080 },
    { label: 'Net Payments Collected (Annualized)', number: 3777600, prefix: '$' },
    { label: 'Old AR Recovered (Annualized)', number: 820800, prefix: '$' },
  ],
}

function Ledger() {
  const [range, setRange] = useState('30d')
  const [imageIdx, setImageIdx] = useState(0)
  const rows = LEDGER_DATA[range]

  useEffect(() => {
    const id = setInterval(() => setImageIdx((i) => (i + 1) % LEDGER_IMAGES.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[#00D9C7]/10 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-3xl border border-[#E8E4DA] bg-[#FBF9F3] p-4 shadow-2xl shadow-black/40 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <h3 className="text-[14px] font-extrabold text-[#0B1428]">Live Collections Ledger</h3>
            <p className="text-[10px] font-semibold text-[#0B1428]/50">Billing One Iota · Real-time</p>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg bg-[#ECEDEF] p-0.5">
            {[
              { k: '30d', label: '30 Days' },
              { k: 'annual', label: 'Annualized' },
            ].map((t) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setRange(t.k)}
                aria-pressed={range === t.k}
                className={`rounded-md px-3 py-1.5 text-[10px] font-bold transition-all duration-200 ${
                  range === t.k
                    ? 'bg-white text-[#0B1428] shadow-md shadow-black/10'
                    : 'bg-transparent text-[#0B1428]/55 hover:bg-white/60 hover:text-[#0B1428]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {rows.map((r, i) => {
            const s = LEDGER_STYLES[i]
            return (
              <div key={r.label} className={`flex items-center gap-3 rounded-xl border p-3 ${s.barBorder} ${s.barBg}`}>
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${s.iconWrap}`}>
                  <s.icon size={16} />
                </span>
                <p className="min-w-0 flex-1 truncate text-[10px] font-semibold text-[#0B1428]/55">{r.label}</p>
                <p className={`shrink-0 text-base font-extrabold tracking-tight md:text-lg ${s.valueClass}`}>
                  {r.prefix ? (
                    <AnimatedNumber value={r.number} prefix={r.prefix} duration={1800} />
                  ) : (
                    <AnimatedNumber value={r.number} duration={1800} />
                  )}
                </p>
              </div>
            )
          })}
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#0B1428]/[0.06]">
          <div className="relative aspect-[16/9] bg-[#ECEDEF]">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIdx}
                src={LEDGER_IMAGES[imageIdx].src}
                alt={LEDGER_IMAGES[imageIdx].label}
                loading="lazy"
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                {LEDGER_IMAGES[imageIdx].label}
              </span>
              <div className="flex items-center gap-1.5">
                {LEDGER_IMAGES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                      i === imageIdx ? 'w-5 opacity-100' : 'w-1.5 opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const trust = [
    {
      title: 'Zero software changes',
      sub: 'Works with WellSky / Axxess / HCHB / athenaHealth / eClinicalWorks / Kareo.',
    },
    {
      title: 'Direct FISS / DDE terminal access',
      sub: 'Direct Medicare fiscal intermediary log-ins (Palmetto GBA, CGS, NGS).',
    },
    {
      title: '100% performance-aligned',
      sub: 'Our fee is tied to collections we actually deliver for you.',
    },
    {
      title: 'HIPAA & HITECH compliant',
      sub: 'Full BAA confidentiality on every engagement.',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0B1428] pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse at top center, black 20%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top center, black 20%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-32 right-[-10%] size-[540px] rounded-full bg-[#00D9C7]/10 blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[-8%] size-[480px] rounded-full bg-[#1E5BFF]/10 blur-[140px]" aria-hidden="true" />

      <div className="relative container mx-auto grid items-center gap-10 px-5 pt-24 md:px-6 md:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-44 xl:px-8">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1.5 rounded-full border border-[#00D9C7]/30 bg-[#00D9C7]/5 px-4 py-2 text-center text-[10px] font-bold tracking-wide text-[#00D9C7] sm:w-auto sm:rounded-full sm:px-3.5 sm:py-1.5 md:text-[11px]"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00D9C7] text-[#0B1428]">
              <HeartPulse size={11} strokeWidth={3} />
            </span>
            <span className="whitespace-nowrap">Physician Part B Specialists</span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="whitespace-nowrap">Home Health &amp; Hospice Division</span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="whitespace-nowrap">Zero Software Switching</span>
          </motion.div>

          <h1 className="text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#F7F8FA] sm:text-[32px] lg:text-[38px] xl:text-[44px]">
            Physician{' '}
            <span className="text-[#00D9C7]">Part B</span> &amp; Specialized{' '}
            <span className="text-[#00D9C7]">Home Health</span> &amp;{' '}
            <span className="text-[#00D9C7]">Hospice</span> Billing That <span className="text-[#00D9C7]">Actually Pays.</span>
          </h1>

          <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-[#B8C5D8] md:text-[15px]">
            From front-desk patient intake to{' '}
            <span className="font-bold text-[#00D9C7]">120+ day OLD AR</span> recovery. We eliminate front-end rejections,
            submit <span className="font-bold text-[#00D9C7]">98%+</span> clean claims, overturn chronic payer denials, and
            collect every dollar your clinic or agency earned. We cover all physician specialties and operate a dedicated
            institutional division for <span className="font-bold text-[#00D9C7]">Home Health &amp; Hospice</span> Care.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TealButton onClick={goToAudit}>Get Free Billing Audit</TealButton>
            <OutlineButton onClick={() => scrollToId('home-health-division')}>
              Explore Home Health &amp; Hospice Division
            </OutlineButton>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t.title} className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#00D9C7]" strokeWidth={2.2} />
                <div>
                  <p className="text-xs font-bold text-[#F7F8FA]">{t.title}</p>
                  <p className="text-[11px] leading-relaxed text-[#B8C5D8]/80">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:pl-2">
          <Ledger />
        </div>
      </div>

      {/* Proof strip */}
      <div className="relative container mx-auto px-5 md:px-6 xl:px-8">
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {[
            { number: 98.8, suffix: '%', decimals: 1, label: 'First-Pass Clean Claim Acceptance Rate' },
            { number: 0, suffix: '', decimals: 0, label: 'Penalty Days', sub: 'Mandatory 5-Day NOA / NOE Submissions Guaranteed' },
            { number: 32, prefix: '+', suffix: '%', decimals: 0, label: 'Average Net Collection Uplift' },
            { number: 24, suffix: ' Hrs', decimals: 0, label: 'Encounter &amp; Charge Entry Turnaround', sub: 'Double-QC on every batch' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0D1629] p-5 text-center md:p-6">
              <p className="text-xl font-extrabold tracking-tight text-[#00D9C7] md:text-[26px]">
                <AnimatedNumber value={s.number} prefix={s.prefix || ''} suffix={s.suffix} decimals={s.decimals || 0} />
              </p>
              <p className="mt-2 text-[11px] font-semibold leading-snug text-[#F7F8FA]">{s.label}</p>
              {s.sub && <p className="mt-1 text-[10px] leading-snug text-[#B8C5D8]/70">{s.sub}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. PREMIER CORE SPECIALIZATION                                     */
/* ------------------------------------------------------------------ */

function Specialization() {
  const stats = [
    {
      value: 0,
      prefix: '',
      suffix: '',
      big: '0',
      label: 'Penalty Days',
      sub: 'NOA 5-Day Guarantee — submitted within 48h of SOC.',
    },
    {
      value: null,
      big: 'Direct FISS/DDE',
      label: 'Standing MAC Terminal Access',
      sub: 'Palmetto GBA · CGS · NGS direct log-ins.',
    },
    {
      value: 100,
      prefix: '',
      suffix: '%',
      big: '100%',
      label: 'Cap Safe',
      sub: 'Hospice Aggregate Cap — rolling monthly actuarial audit.',
    },
    {
      value: 15000,
      prefix: '',
      suffix: '+',
      big: '15,000+',
      label: 'Episodes Billed / Month',
      sub: 'Axxess · WellSky · HCHB · KanTime.',
    },
  ]

  return (
    <section id="home-health-division" className="relative overflow-hidden bg-[#0D1629] py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          eyebrow="Our Premier Core Specialization"
          icon={HeartPulse}
          title={
            <>
              Specialized <span className="text-[#00D9C7]">Home Health</span> &amp; <span className="text-[#00D9C7]">Hospice Billing</span> Division
            </>
          }
          subtitle="Home Health is not traditional Part B. PDGM 30-day payment periods, mandatory 5-calendar-day Notices of Admission (NOA), institutional Medicare Part A UB-04 claims, hospice aggregate caps, and fiscal intermediary rules live in a separate billing universe — so we built an entire division around them. Our specialists log directly into your Medicare fiscal intermediary's FISS/DDE system, file every required notice on time, and monitor your hospice cap position monthly, so nothing you bill ever becomes an avoidable recoupment."
        />

        <StaggerChildren className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {stats.map((s, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="group h-full rounded-2xl border border-white/10 bg-[#17243A] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9C7]/40">
                <p className="text-2xl font-extrabold tracking-tight text-[#00D9C7] md:text-[28px]">
                  {s.value !== null ? (
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1800} />
                  ) : (
                    s.big
                  )}
                </p>
                <p className="mt-2 text-[15px] font-bold text-[#F7F8FA]">{s.label}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#B8C5D8]">{s.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3+5. CAPABILITY EXPLORER (tabs + expand)                           */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  {
    badge: 'HOME HEALTH',
    tone: 'teal',
    billType: 'TOB 32A · NOA 032A',
    title: 'NOA 5-Day Mandatory Window Execution',
    desc: 'The 5-calendar-day Notice of Admission is the single most expensive window in Medicare home health. One late filing forfeits entire episodes to a 1/30th reduction.',
    sla: 'Filed within 48h of SOC',
    cms: 'CMS Protection: NOA / 1/30th Penalty Defense',
    category: 'hh',
    deliverables: [
      'Intro 032A (U537F + RTP) filed at time of care',
      '48–72h receipt verification against the FI',
      'Physician 485 / face-to-face confirmed before submission',
      'Submission confirmation & audit trail captured',
      'Reward-penalty calendar mapped for every episode',
    ],
  },
  {
    badge: 'HOME HEALTH',
    tone: 'teal',
    billType: 'PDGM HIPPS Grouper',
    title: 'PDGM HIPPS Optimization & Case-Mix',
    desc: 'Every PDGM 30-day payment period is 1 of 432 HIPPS scenarios. We map your OASIS-E + ICD-10 comorbidity mix to the correct case-mix weights before the claim ever files.',
    sla: '24h double-QC re-verification',
    cms: 'CMS Protection: HIPPS Accuracy / DRG Integrity',
    category: 'hh',
    deliverables: [
      'Full 432 HIPPS scenario mapping',
      'OASIS-E item & ICD-10 comorbidity review',
      'Comorbidity / PEP assignment validation',
      'NPI & agency alignment checks',
      'Grouper re-verification before any submission',
    ],
  },
  {
    badge: 'HOME HEALTH',
    tone: 'teal',
    billType: 'LUPA Thresholds',
    title: 'LUPA Surveillance & Threshold Alerts',
    desc: 'Low-Utilization Payment Adjustments silently kill revenue when a 30-day period drops to 2–6 visits. We watch every OASIS start-of-care plan and flag it before it becomes a LUPA.',
    sla: 'Per-schedule threshold monitoring',
    cms: 'CMS Protection: LUPA / PEP Prevention',
    category: 'hh',
    deliverables: [
      '2–6 visit LUPA threshold tracking',
      'Missed-visit & level-of-care alerts',
      'High-LUPA payer mini-reports',
      'Visit utilization plan recalibration',
      'Exception-trigger communication to care team',
    ],
  },
  {
    badge: 'HOME HEALTH',
    tone: 'teal',
    billType: 'TOB 329 · F2F',
    title: '30-Day Final Claim (TOB 329)',
    desc: 'Step-by-step UB-04 final claim with a signed 485 + face-to-face, correctly episode-priced, and never past the voiding window',
    sla: '48h from period close',
    cms: 'CMS Protection: Timely Filing / 485-F2F Compliance',
    category: 'hh',
    deliverables: [
      'Signed 485 + face-to-face requirement verified',
      'OASIS-E finalized & locked',
      'Co-pay / deductible reconciliation',
      'Episode pricing & PEP validation',
      'Submission with confirmation & audit file',
    ],
  },
  {
    badge: 'HOSPICE',
    tone: 'gold',
    billType: 'TOB 81A / 82A',
    title: 'Hospice NOE Mandatory 5-Day Window',
    desc: "A late Notice of Election permanently forfeits hospice reimbursement. Our terminal-access specialists file the NOE before the clock runs out — every single election.",
    sla: 'Filed within 48h of election',
    cms: 'CMS Protection: NOE / Permanent Forfeit Defense',
    category: 'hospice',
    deliverables: [
      'NOE filed within 5 calendar days',
      'Election & revocation tracking',
      'Orphan claim cleanup & rebill',
      'TPE / review readiness files',
      'Forfeit-risk calendar eliminated',
    ],
  },
  {
    badge: 'HOSPICE',
    tone: 'gold',
    billType: 'UB-04 TOB 812',
    title: 'Hospice 4 Levels of Care Billing',
    desc: 'Routine, Continuous, Inpatient Respite & General Inpatient — each with distinct revenue codes, physician certifications, and documentation requirements. We map them precisely.',
    sla: '48h from level change',
    cms: 'CMS Protection: Rev Codes 0651 / 0652 / 0655 / 0656',
    category: 'hospice',
    deliverables: [
      'Level-of-care mapping (rev 0651–0656)',
      'Physician certification & recertification',
      'Service Intensity Add-on (SIA) final-7-days capture',
      'Continuous-care minutes validation',
      'Cap allocation readiness per beneficiary',
    ],
  },
  {
    badge: 'HOSPICE',
    tone: 'gold',
    billType: 'Aggregate · Inpatient Cap',
    title: 'Aggregate & Inpatient Cap Monitoring',
    desc: 'Overshooting the Medicare hospice aggregate or inpatient cap is a six-figure recoupment. We run a rolling actuarial audit monthly so you sit safely inside both caps.',
    sla: 'Rolling monthly actuarial audit',
    cms: 'CMS Protection: Cap-Year Compliance',
    category: 'hospice',
    deliverables: [
      'Monthly rolling cap projection',
      'Per-beneficiary aggregate tracking',
      'Inpatient cap bed-day monitoring',
      'Cap-year closeout & reconciliation',
      'Strategy flags raised before overshoot',
    ],
  },
  {
    badge: 'INDUSTRY-WIDE',
    tone: 'violet',
    billType: 'FISS/DDE · ADR/TPE',
    title: 'Direct FISS/DDE & ADR / TPE Defense',
    desc: 'We log into your fiscal intermediary terminal daily — file claims, pull remits, and fight ADRs / TPE probe signals with submission-ready appeal packets.',
    sla: 'ADR packets ≤ 14 days',
    cms: 'CMS Protection: ADR Response / TPE Readiness',
    category: 'both',
    deliverables: [
      'Direct FISS/DDE terminal access',
      'ADR packet assembled in ≤ 14 days',
      'TPE probe & review defense',
      'Reconsideration & appeal documentation',
      'Remittance & deny-reason trending',
    ],
  },
]

const CAP_TABS = [
  { key: 'all', label: 'All Capabilities', count: 8 },
  { key: 'hh', label: 'Home Health', count: 5, sub: 'PDGM / NOA / LUPA' },
  { key: 'hospice', label: 'Hospice', count: 4, sub: 'NOE / 4 Levels / Cap' },
]

const capTone = {
  teal: 'border-[#00D9C7]/25 bg-[#00D9C7]/10 text-[#00D9C7]',
  gold: 'border-[#F59E0B]/25 bg-[#F59E0B]/10 text-[#FBBF24]',
  violet: 'border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#A78BFA]',
}

function CapabilityExplorer() {
  const [tab, setTab] = useState('all')
  const [open, setOpen] = useState(0)

  const filtered = CAPABILITIES.filter((c) => tab === 'all' || c.category === tab || c.category === 'both')

  return (
    <section className="relative overflow-hidden bg-[#0B1428] py-20 lg:py-28">
      <div className="pointer-events-none absolute top-40 left-[-6%] size-[420px] rounded-full bg-[#00D9C7]/5 blur-[140px]" aria-hidden="true" />
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          eyebrow="Capabilities That Compound"
          icon={Layers}
          title={
            <>
              Eight Capabilities Built Around <span className="text-[#00D9C7]">PDGM, NOA, NOE &amp; Cap Law</span>
            </>
          }
          subtitle="One dedicated post-acute RCM squad, armed with direct FISS/DDE access, running every compliance window and revenue lever below — from front-end intake straight through the hospice cap year."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-stretch gap-2.5">
          {CAP_TABS.map((t) => {
            const active = tab === t.key
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all duration-300 ${
                  active
                    ? 'border-[#00D9C7] bg-[#00D9C7] text-[#0B1428]'
                    : 'border-white/10 bg-[#17243A] text-[#B8C5D8] hover:border-[#00D9C7]/40'
                }`}
              >
                <span className="text-sm font-bold">{t.label} ({t.count})</span>
                {t.sub && <span className={`hidden text-[10px] font-semibold md:block ${active ? 'text-[#0B1428]/70' : 'text-[#B8C5D8]/70'}`}>{t.sub}</span>}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-5"
          >
            {filtered.map((c, idx) => {
              const isOpen = open === idx
              return (
                <div
                  key={c.title}
                  className={`group rounded-2xl border bg-[#17243A] text-left transition-all duration-300 ${
                    isOpen ? 'border-[#00D9C7]/70' : 'border-white/10 hover:border-[#00D9C7]/40'
                  }`}
                >
                  <div className="p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] ${capTone[c.tone]}`}>
                        {c.badge}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#B8C5D8]">
                        {c.billType}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#F7F8FA] md:text-2xl">{c.title}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#B8C5D8]">{c.desc}</p>
                      </div>
                      <div className="shrink-0 space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9C7]/25 bg-[#00D9C7]/5 px-3 py-1.5 text-[11px] font-bold text-[#00D9C7]">
                          <Clock size={12} /> {c.sla}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-[#B8C5D8]">
                          <Shield size={12} /> {c.cms}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#00D9C7] transition-colors hover:text-[#F7F8FA]"
                      aria-expanded={isOpen}
                    >
                      <span>{isOpen ? 'Hide protocol' : 'View delivery protocol'}</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="open"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 bg-[#0D1629]/60 px-6 py-6 md:px-7">
                          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#00D9C7]">
                            What actually gets done
                          </p>
                          <ul className="grid gap-3 md:grid-cols-2">
                            {c.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#B8C5D8]">
                                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00D9C7]" strokeWidth={2.2} />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. WHY IN-HOUSE BILLING FAILS                                     */
/* ------------------------------------------------------------------ */

function WhyInHouse() {
  const [active, setActive] = useState(0)

  const risks = [
    {
      title: 'One late NOA loses thousands',
      desc: 'A single missed 5-day Notice of Admission triggers a 1/30th reduction across the whole episode — one 24-48 hour window is all it takes to forfeit the episode’s full reimbursement.',
      img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      imgBadge: 'NOA 5-Day Guarantee',
      imgCaption: '49,000+ NOAs filed to the calendar — zero 1/30th penalties.',
    },
    {
      title: 'Missed face-to-face = full write-off',
      desc: 'No valid F2F on file converts a clean claim into a zero-dollars-collected outcome. We verify the physician encounter before the claim ever leaves our queue.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
      imgBadge: 'Certified Post-Acute RCM Squad',
      imgCaption: 'Every 485 & face-to-face documented and verified before billing.',
    },
    {
      title: 'Un-monitored hospice cap',
      desc: 'Inpatient & aggregate cap overshoot becomes a six-figure CMS recoupment. Our actuarial audit tracks your cap position every single month.',
      img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      imgBadge: 'Hospice Cap Watch',
      imgCaption: 'Monthly actuarial cap-position audits protect your aggregate cap.',
    },
    {
      title: 'Denials aging past appeal windows',
      desc: 'Home health & hospice denials carry tight redetermination deadlines — silence means permanent loss. We action every denial the day it lands.',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      imgBadge: 'Denial Defense Team',
      imgCaption: 'Redetermination & appeal tracking on every single denial.',
    },
  ]

  const current = risks[active !== null ? active : 0]

  return (
    <section className="relative overflow-hidden bg-[#0D1629] py-20 lg:py-28">
      <div className="container mx-auto grid items-center gap-12 px-5 md:px-6 lg:grid-cols-2 xl:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.img}
                src={current.img}
                alt={current.title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1428]/95 via-[#0B1428]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00D9C7] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B1428]">
                <Users size={12} strokeWidth={3} /> {current.imgBadge}
              </div>
              <p className="mt-3 max-w-md text-[15px] font-bold leading-snug text-white md:text-lg">{current.imgCaption}</p>
            </div>
          </div>
          <div className="absolute -top-5 -right-5 hidden rounded-2xl border border-white/10 bg-[#17243A] px-5 py-4 shadow-xl shadow-black/30 md:block">
            <p className="text-[11px] font-semibold text-[#B8C5D8]">FISS/DDE daily log-ins</p>
            <p className="text-lg font-extrabold text-[#00D9C7]">1,240+ / mo</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl border border-white/10 bg-[#17243A] p-7 md:p-9">
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-[#00D9C7] text-[#0B1428]">
              <ShieldCheck size={24} strokeWidth={2.2} />
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#F7F8FA] md:text-[32px] md:leading-[1.1]">
              Why In-House Billing Fails
              <br />
              <span className="text-[#00D9C7]">Home Health &amp; Hospice</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#B8C5D8] md:text-[15px]">
              In-house teams juggling PDGM episodes, OASIS-E coding, UB-04 rules and fiscal intermediary deadlines almost
              always under-file notices, mis-price episodes, and let denials age past their appeal window. The result is{' '}
              <span className="font-bold text-[#F7F8FA]">real, collectable Medicare cash left on the table</span> — and
              most agencies recover less than 50% of what the benefit actually earns.
            </p>

            <div className="mt-6 space-y-3">
              {risks.map((r, i) => {
                const open = active === i
                return (
                  <div
                    key={r.title}
                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                      open ? 'border-[#00D9C7]/40 bg-[#0B1428]/60' : 'border-white/[0.07] bg-[#0B1428]/40 hover:border-[#00D9C7]/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3.5 p-4 text-left"
                    >
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold transition-colors duration-300 ${
                          open ? 'bg-[#00D9C7] text-[#0B1428]' : 'bg-white/5 text-[#00D9C7]'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className={`flex-1 text-sm font-bold transition-colors duration-300 ${open ? 'text-white' : 'text-[#F7F8FA]'}`}>
                        {r.title}
                      </p>
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          open ? 'rotate-180 bg-[#00D9C7]/15 text-[#00D9C7]' : 'bg-white/5 text-[#B8C5D8]'
                        }`}
                      >
                        <ChevronDown size={14} strokeWidth={2.5} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 pl-[58px] text-[13px] leading-relaxed text-[#B8C5D8]">{r.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. PHYSICIAN PART B — SPECIALTIES                                  */
/* ------------------------------------------------------------------ */

const SPECIALTIES = [
  { icon: HeartPulse, name: 'Cardiology & Interventional' },
  { icon: Bone, name: 'Orthopedics & Sports Medicine' },
  { icon: Activity, name: 'Interventional Pain & Spine' },
  { icon: Stethoscope, name: 'Internal Medicine' },
  { icon: Users, name: 'Family Practice & General Medicine' },
  { icon: Baby, name: 'Pediatrics & Adolescent Medicine' },
  { icon: Brain, name: 'Neurology & Sleep Medicine' },
  { icon: Pill, name: 'Psychiatry & Behavioral Health' },
  { icon: Brush, name: 'Dermatology & Mohs Surgery' },
  { icon: FlaskConical, name: 'Gastroenterology' },
  { icon: Scissors, name: 'General & Laparoscopic Surgery' },
  { icon: Droplets, name: 'Nephrology & Dialysis Care' },
  { icon: Cross, name: 'Urgent Care & Walk-In Clinics' },
  { icon: PersonStanding, name: 'Physical / Occupational / Speech Therapy' },
  { icon: Heart, name: 'OB/GYN & Women\u2019s Health' },
  { icon: Footprints, name: 'Podiatry & Foot/Ankle Surgery' },
]

export function Specialties() {
  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          dark={false}
          eyebrow="Physician Part B"
          icon={Stethoscope}
          title={
            <>
              Every Medical Specialty Covered <span className="text-[#0E9B8F]">With Precision</span>
            </>
          }
          subtitle="Certified AAPC / AHIMA coders and Part B specialists who know the CPT, ICD-10, HCPCS, modifiers and the regional Medicare LCDs that govern each specialty — so clean claims are the default, not the exception."
        />

        <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
          {SPECIALTIES.map((s) => (
            <StaggerItem key={s.name} className="h-full">
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-[#0B1428]/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E9B8F]/40 hover:shadow-xl hover:shadow-[#0E9B8F]/5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0E9B8F]/10 text-[#0E7C72] transition-colors duration-300 group-hover:bg-[#0E9B8F] group-hover:text-white">
                  <s.icon size={20} />
                </span>
                <p className="text-[13px] leading-snug font-bold text-[#0B1428] md:text-sm">{s.name}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 7. SMALL vs LARGE                                                  */
/* ------------------------------------------------------------------ */

export function SizingCompare() {
  const cols = [
    {
      tag: 'Small Practices & Independent Agencies',
      sub: '1–5 providers / census < 75',
      icon: Building2,
      featured: false,
      items: [
        ['4%–7%', 'Typical net collections for physician clinics today'],
        ['2–3 person pod', 'A dedicated team — never a shared, distracted bench'],
        ['Zero overhead', 'No payroll, software, or clearinghouse costs'],
        ['End-to-end', 'Credentialing, CAQH & PECOS handled for you'],
        ['24h turnaround', 'Charge entry & double-QC on every encounter'],
      ],
    },
    {
      tag: 'Large Practices, MSOs & Multi-Location Agencies',
      sub: '10+ providers / census 100+',
      icon: Hospital,
      featured: true,
      items: [
        ['3.25%–5.5%', 'Favorable net collections at institutional scale'],
        ['5,000–50,000+', 'Claims & episodes managed monthly'],
        ['Orchestration', 'Multi-NPI / multi-tax-ID coordination'],
        ['Defense lab', 'Dedicated Denial Defense Lab + OLD AR Strike Team'],
        ['Executive view', 'PowerBI / Tableau dashboards for leadership'],
      ],
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          dark={false}
          eyebrow="Built For Both Worlds"
          icon={Target}
          title={
            <>
              One System. <span className="text-[#0E9B8F]">Every Agency Size.</span>
            </>
          }
          subtitle="Whether you are a 3-physician clinic or a 100+ census home health & hospice organization, the delivery engine — and the fee model — fits the operation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cols.map((c) => (
            <div
              key={c.tag}
              className={`rounded-3xl border p-7 transition-all duration-300 md:p-9 ${
                c.featured
                  ? 'border-[#0E9B8F]/30 bg-[#0B1428] text-[#F7F8FA] shadow-2xl shadow-[#0B1428]/20'
                  : 'border-[#0B1428]/[0.08] bg-[#F7F8FA] text-[#0B1428]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-2xl ${
                      c.featured ? 'bg-[#00D9C7] text-[#0B1428]' : 'bg-[#0E9B8F] text-white'
                    }`}
                  >
                    <c.icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold leading-tight md:text-2xl">{c.tag}</h3>
                  <p className={`mt-1 text-sm font-semibold ${c.featured ? 'text-[#00D9C7]' : 'text-[#0E9B8F]'}`}>{c.sub}</p>
                </div>
              </div>
              <ul className="mt-7 space-y-4">
                {c.items.map(([v, l]) => (
                  <li key={l} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className={`mt-0.5 shrink-0 ${c.featured ? 'text-[#00D9C7]' : 'text-[#0E9B8F]'}`}
                      strokeWidth={2.2}
                    />
                    <div>
                      <p className={`text-[15px] font-extrabold ${c.featured ? 'text-white' : 'text-[#0B1428]'}`}>{v}</p>
                      <p className={`text-[13px] leading-relaxed ${c.featured ? 'text-[#B8C5D8]' : 'text-[#0B1428]/60'}`}>{l}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 8. 12 END-TO-END RCM SERVICES                                      */
/* ------------------------------------------------------------------ */

const SERVICES = [
  { num: '01', title: 'Patient Intake & Demographic Auditing', sla: '24h SLA', impact: 'Cuts front-end rejections', desc: 'Every demographic and insurance detail verified at intake so nothing bounces six weeks later.' },
  { num: '02', title: 'Real-Time Eligibility & Benefits Verification', sla: 'Same-Day SLA', impact: 'No surprise write-offs', desc: 'Live coverage, deductible, and benefit checks before the service is ever delivered.' },
  { num: '03', title: 'Prior & Retro Authorization Protocol', sla: '48h SLA', impact: 'Kills CO-197 denials', desc: 'Structured auth capture so elective and emergency services never file without the right approvals.' },
  { num: '04', title: '24-Hour Charge Entry & Double Quality Control', sla: '24h SLA', impact: 'Clean claim fuel', desc: 'Encounters posted same-day and dual-reviewed before they ever reach the clearinghouse.' },
  { num: '05', title: 'Certified Medical Coding (CPT / ICD-10 / HCPCS)', sla: '48h SLA', impact: 'AAPC/AHIMA certified', desc: 'Specialty-specific coders who assign the exact codes and modifiers that pay.' },
  { num: '06', title: 'Clean Claim Submission & Scrubbing', sla: 'Same-Day SLA', impact: '98%+ first-pass', desc: 'Claim-scrubbed against payer edits and submitted immediately — never batched for days.' },
  { num: '07', title: 'Payment Posting: ERA & EOB Line Reconciliation', sla: '24h SLA', impact: 'Exact bank-match', desc: 'Every payment reconciled to the dollar against the deposit in your bank account.' },
  { num: '08', title: 'Root-Cause Denial Management & Appeals', sla: '7–14 Day SLA', impact: 'Recover + prevent', desc: 'Denials dissected by root cause, appealed with evidence, and engineered out of workflows.' },
  { num: '09', title: 'Systematic A/R Aging Follow-Up', sla: '30 / 60 / 90 Plan', impact: 'No account sleeps', desc: 'Follow-up cadence so no receivable ever silently ages past its appeal window.' },
  { num: '10', title: 'Old A/R Recovery Strike Team', sla: '0–120+ Buckets', impact: 'Cash resurrected', desc: 'A dedicated team that mines 90 and 120+ day receivables and files targeted appeals.' },
  { num: '11', title: 'Physician Credentialing & CAQH Enrollment', sla: '60–90 Day SLA', impact: 'Clean payer enrollment', desc: 'End-to-end CAQH, PECOS, and payer enrollment so claims never die on enrollment gaps.' },
  { num: '12', title: 'Executive Analytics & Net Collection Reporting', sla: 'Monthly SLA', impact: 'Surgical visibility', desc: 'Crystal-clear dashboards on clean claims, collection rate, and cash flow every single month.' },
]

export function ServicesGrid() {
  return (
    <section className="overflow-hidden bg-[#F7F8FA] py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          dark={false}
          eyebrow="End-to-End Revenue Cycle"
          icon={Zap}
          title={
            <>
              Twelve Services That Cover the <span className="text-[#0E9B8F]">Entire Cash Lifecycle</span>
            </>
          }
          subtitle="From the first patient intake call to the final 120-day-old A/R recovery appeal — one accountable team, one transparent dashboard, no hand-offs."
        />

        <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.num} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-[#0B1428]/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E9B8F]/40 hover:shadow-xl hover:shadow-[#0E9B8F]/5">
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold tracking-tight text-[#0E9B8F]/20 transition-colors duration-300 group-hover:text-[#0E9B8F]">
                    {s.num}
                  </span>
                  <span className="rounded-full border border-[#0E9B8F]/20 bg-[#0E9B8F]/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#0E7C72]">
                    {s.sla}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-extrabold leading-snug text-[#0B1428]">{s.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#0B1428]/60">{s.desc}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0E9B8F]">
                  <BadgeCheck size={14} /> {s.impact}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 9. AR / REVENUE MODELER CALCULATOR                                 */
/* ------------------------------------------------------------------ */

export function Calculator() {
  const [monthly, setMonthly] = useState(180000)
  const [providers, setProviders] = useState(3)
  const [denialRate, setDenialRate] = useState(12)
  const [aging, setAging] = useState(28)

  const recoveryFactor = Math.min(1, 0.55 + providers * 0.05)
  const recovered = monthly * (1 - denialRate / 100) * recoveryFactor
  const denialSavings = monthly * (denialRate / 100) * 0.9
  const total = recovered + denialSavings

  const inputs = [
    { key: 'monthly', label: 'Monthly Billing', prefix: '$', value: monthly, suffix: '', min: 10000, max: 500000, step: 5000 },
    { key: 'providers', label: 'Active Billing Providers', prefix: '', value: providers, suffix: '', min: 1, max: 20, step: 1 },
    { key: 'denialRate', label: 'Current Denial Rate', prefix: '', value: denialRate, suffix: '%', min: 2, max: 40, step: 1 },
    { key: 'aging', label: 'A/R Past 90 Days', prefix: '', value: aging, suffix: '%', min: 5, max: 60, step: 1 },
  ]

  const set = (key, v) => {
    const n = Number(v)
    if (!Number.isFinite(n)) return
    if (key === 'monthly') setMonthly(n)
    if (key === 'providers') setProviders(Math.round(n))
    if (key === 'denialRate') setDenialRate(Math.round(n))
    if (key === 'aging') setAging(Math.round(n))
  }

  return (
    <section className="relative overflow-hidden bg-[#0B1428] py-20 lg:py-28">
      <div className="pointer-events-none absolute top-10 right-[-8%] size-[460px] rounded-full bg-[#00D9C7]/8 blur-[140px]" aria-hidden="true" />
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          eyebrow="Free AR Modeler"
          icon={Target}
          title={
            <>
              How Much Cash Is Trapped in Your <span className="text-[#00D9C7]">Aging A/R?</span>
            </>
          }
          subtitle="Slide in your real numbers and watch what a dedicated Part B + Post-Acute team could put back in your bank account within the first year."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="rounded-3xl border border-white/10 bg-[#17243A] p-7 md:p-8">
            <div className="space-y-7">
              {inputs.map((f) => (
                <div key={f.key}>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label className="text-sm font-bold text-[#F7F8FA]">{f.label}</label>
                    <span className="rounded-lg bg-[#00D9C7]/10 px-3 py-1 text-sm font-extrabold text-[#00D9C7]">
                      {f.prefix}
                      {f.value.toLocaleString('en-US')}
                      {f.suffix}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={f.value}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full accent-[#00D9C7]"
                    aria-label={f.label}
                  />
                  <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#B8C5D8]/50">
                    <span>
                      {f.prefix}
                      {f.min.toLocaleString('en-US')}
                      {f.suffix}
                    </span>
                    <span>
                      {f.prefix}
                      {f.max.toLocaleString('en-US')}
                      {f.suffix}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 rounded-xl border border-white/[0.07] bg-[#0B1428]/40 p-4 text-[12px] leading-relaxed text-[#B8C5D8]">
              Projection model based on Billing One Iota engagement benchmarks across physician Part B, PDGM, and hospice
              accounts. Actual results vary by operation.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-[#17243A] p-7 md:p-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#B8C5D8]">Estimated recovery · Year One</p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#00D9C7] md:text-[46px]">
                <AnimatedNumber value={total} prefix="$" duration={1200} />
              </p>
              <p className="mt-1 text-sm font-semibold text-[#F7F8FA]">Total First-Year Net Cash Uplift</p>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0B1428]/40 p-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#F7F8FA]">Old A/R Recovered (90+ days)</p>
                    <p className="text-[11px] text-[#B8C5D8]">One-time cash pulled back from aging buckets</p>
                  </div>
                  <p className="shrink-0 text-lg font-extrabold text-[#FB923C]">
                    <AnimatedNumber value={recovered} prefix="$" duration={1200} />
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0B1428]/40 p-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#F7F8FA]">Annual Denial Elimination Savings</p>
                    <p className="text-[11px] text-[#B8C5D8]">Prevented write-offs from cleaner claims</p>
                  </div>
                  <p className="shrink-0 text-lg font-extrabold text-[#00D9C7]">
                    <AnimatedNumber value={denialSavings} prefix="$" duration={1200} />
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#00D9C7] px-5 py-4">
                <div>
                  <p className="text-[13px] font-extrabold text-[#0B1428]">Performance-aligned</p>
                  <p className="text-[11px] font-semibold text-[#0B1428]/70">We get paid when you collect.</p>
                </div>
                <TrendingUp size={22} className="text-[#0B1428]" />
              </div>
            </div>
            <TealButton onClick={() => scrollToId('free-audit')} className="lg:self-start">
              Lock In This Uplift With a Free Audit
            </TealButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 10. DENIAL RESOLUTION LAB                                          */
/* ------------------------------------------------------------------ */

const DENIALS = [
  {
    code: 'CO-197',
    icon: FileQuestion,
    name: 'Prior Authorization Lacking | Claim Lacks Supporting Info',
    mistake: 'Service billed on the first clean-claim date without confirming the plan authorized the exact procedure, on the exact date of service.',
    protocol: [
      'Eligibility + authorization check at the front desk before every service',
      'Auth-to-claim attachment verified before release to the clearinghouse',
      'Denial logged at receipt with the exact missing evidence flagged',
      'Appeal file routed with the authorization reference the same day',
    ],
    recovery: '92%',
    sla: '7–10 Days',
  },
  {
    code: 'CO-16',
    icon: FileWarning,
    name: 'Payment Adjusted Because Claim Lacks Information / Evidence',
    mistake: 'Claims submitted with only a superbill — no operative report, progress notes, or referral documentation attached.',
    protocol: [
      'Document-quota mapping per payer before submission',
      'Missing-document escalation to the provider within 24 hours',
      'Appeal resubmission with the complete clinical record',
    ],
    recovery: '88%',
    sla: '7–14 Days',
  },
  {
    code: 'CO-97',
    icon: Layers,
    name: 'Service Bundled (NCCI) | Performed For Which Payment May Not Be Made',
    mistake: 'Inclusive procedures billed separately — surgeon charges the colonoscopy and the polypectomy, or global codes split into components.',
    protocol: [
      'NCCI / Medically Unlikely Edit screening before every submission',
      'Modifier & component re-mapping to billed global service',
      'Corrected claim filed within the CPA window',
    ],
    recovery: '79%',
    sla: '14–21 Days',
  },
  {
    code: 'CO-4',
    icon: Copy,
    name: 'Dup of Claim/Service | Payment Adjusted Due to Duplicate',
    mistake: 'The same claim hitting both the clearinghouse and FISS/DDE, or a corrected claim filed as a new original.',
    protocol: [
      'Duplicate claim detection at intake',
      'Clearinghouse + FI submission de-dup rules enforced',
      'Merged claims reconciled back to the single original',
    ],
    recovery: '96%',
    sla: '1–3 Days',
  },
  {
    code: 'PR-204',
    icon: ShieldAlert,
    name: 'Service Not Covered / Benefit Limit Exhausted',
    mistake: 'Therapy visits or specialty services billed past the payer benefit cap as though coverage was unlimited.',
    protocol: [
      'Benefit-exhaust tracking loaded before scheduling',
      'Patient financial responsibility captured in advance',
      'Alternate revenue path (secondary coverage, patient pay) triggered',
    ],
    recovery: '82%',
    sla: '10–21 Days',
  },
  {
    code: 'CO-18',
    icon: FileX2,
    name: 'Duplicate Claim / Service Rejection',
    mistake: 'Same-day duplicate submissions from the PM and the biller — one immediately rejected by the payer.',
    protocol: [
      'Real-time submission de-dupe monitor',
      'Rejected duplicate voided and merged into the original',
      'Root-cause fix fed back into the charge pipeline',
    ],
    recovery: '97%',
    sla: '24 Hours',
  },
]

export function DenialLab() {
  const [open, setOpen] = useState(0)

  return (
    <section className="overflow-hidden bg-[#F7F8FA] py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          dark={false}
          eyebrow="Denial Resolution Lab"
          icon={ShieldCheck}
          title={
            <>
              The Six Denials We Kill <span className="text-[#0E9B8F]">Before They Cost You</span>
            </>
          }
          subtitle="These six codes account for the overwhelming majority of Part B, PDGM, and hospice denials. Each one has a proven, repeatable resolution protocol in our lab."
        />

        <div className="mt-12 space-y-4">
          {DENIALS.map((d, idx) => {
            const isOpen = open === idx
            return (
              <div
                key={d.code}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-[#0E9B8F]/50 bg-white shadow-lg shadow-[#0E9B8F]/5' : 'border-[#0B1428]/[0.08] bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen ? 'bg-[#0E9B8F] text-white' : 'bg-[#0E9B8F]/10 text-[#0E7C72]'
                    }`}
                  >
                    <d.icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#0B1428] px-2 py-0.5 text-[11px] font-extrabold tracking-wider text-white">
                        {d.code}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                          isOpen ? 'bg-[#0E9B8F]/10 text-[#0E7C72]' : 'bg-[#0B1428]/5 text-[#0B1428]/60'
                        }`}
                      >
                        Recovery {d.recovery}
                      </span>
                      <span className="hidden rounded-md bg-[#0B1428]/5 px-2 py-0.5 text-[11px] font-bold text-[#0B1428]/60 sm:inline">
                        Resolution {d.sla}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[15px] font-extrabold leading-snug text-[#0B1428]">{d.name}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#0E9B8F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="open"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 border-t border-[#0B1428]/[0.06] bg-[#F7F8FA] p-5 md:p-6 lg:grid-cols-[1fr_0.47fr]">
                        <div>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E9B8F]">
                            The usual mistake
                          </p>
                          <p className="text-sm leading-relaxed text-[#0B1428]/70">{d.mistake}</p>
                          <div className="mt-5 space-y-2.5">
                            {d.protocol.map((p) => (
                              <div key={p} className="flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0E9B8F]" strokeWidth={2.2} />
                                <p className="text-sm leading-relaxed text-[#0B1428]/80">{p}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid content-center grid-cols-2 gap-3">
                          <div className="rounded-xl border border-[#0E9B8F]/20 bg-white p-4 text-center">
                            <p className="text-xl font-extrabold text-[#0E9B8F]">{d.recovery}</p>
                            <p className="mt-0.5 text-[11px] font-semibold text-[#0B1428]/50">Recovery rate</p>
                          </div>
                          <div className="rounded-xl border border-[#0B1428]/10 bg-white p-4 text-center">
                            <p className="text-xl font-extrabold text-[#0B1428]">{d.sla}</p>
                            <p className="mt-0.5 text-[11px] font-semibold text-[#0B1428]/50">Resolution SLA</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 11. EHR / PM COMPATIBILITY                                         */
/* ------------------------------------------------------------------ */

const EHR_GROUPS = [
  {
    icon: HeartPulse,
    title: 'Home Health & Hospice Platforms',
    systems: ['WellSky / Kinnser', 'Axxess', 'Homecare Homebase (HCHB)', 'KanTime', 'MatrixCare', 'Alora'],
  },
  {
    icon: Stethoscope,
    title: 'Physician & Clinical PM/EHR',
    systems: [
      'athenaHealth (AthenaOne)',
      'eClinicalWorks',
      'Kareo / Tebra',
      'AdvancedMD',
      'Epic',
      'NextGen',
      'Practice Fusion',
      'ModMed',
      'PointClickCare',
      'Allscripts / Veradigm',
    ],
  },
  {
    icon: Globe2,
    title: 'Clearinghouses & Medicare Terminals',
    systems: ['Direct FISS / DDE', 'Palmetto GBA', 'CGS', 'NGS', 'Availity', 'Change Healthcare', 'Waystar', 'Office Ally'],
  },
]

export function EhrCompats() {
  return (
    <section className="relative overflow-hidden bg-[#0D1629] py-20 lg:py-28">
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          eyebrow="Zero Software Switching"
          icon={Network}
          title={
            <>
              Bring Your Current <span className="text-[#00D9C7]">EHR / PM</span> — We Plug Straight In
            </>
          }
          subtitle="No conversions, no duplicate data entry, no disruption. If your platform is below, our team works inside your stack from week one."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {EHR_GROUPS.map((g, i) => (
            <ScaleIn key={g.title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-[#17243A] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9C7]/40">
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-[#00D9C7]/10 text-[#00D9C7]">
                  <g.icon size={22} />
                </span>
                <h3 className="text-lg font-extrabold text-[#F7F8FA]">{g.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.systems.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-[#B8C5D8] transition-colors duration-300 hover:border-[#00D9C7]/40 hover:text-[#00D9C7]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 12. CASE STUDIES                                                   */
/* ------------------------------------------------------------------ */

const CASE_STUDIES = [
  {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    tag: 'Home Health & Hospice',
    headline: '$420,000 in Stalled PDGM Claims & Penalty-Free NOAs Achieved',
    org: 'Suncrest Home Health & Palliative Care',
    meta: 'Census 145 · Tampa, FL · WellSky + Direct DDE',
    metrics: [
      ['A/R Days', '72 → 21'],
      ['First-Pass Clean', '74.2% → 99.5%'],
      ['Old AR Recovered', '$420,000'],
      ['Net Collection Uplift', '+38.5%'],
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80',
    tag: 'Hospice',
    headline: '0 Lost Election Days In the First 6 Months',
    org: 'Serenity Grace Hospice & Inpatient Care',
    meta: 'Census 95 · Houston, TX · HCHB',
    metrics: [
      ['Claim Cycle Time', '54 → 18 Days'],
      ['First-Pass Clean', '78% → 99.1%'],
      ['Cap Projection', '100% On-Target'],
      ['Net Collection Uplift', '+24.0%'],
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    tag: 'Physician Part B',
    headline: 'Clearing a 5-Figure Backlog & Doubling Clean Claims',
    org: 'Southwest Heart & Vascular Clinic',
    meta: '4 Providers · Phoenix, AZ · athenaHealth',
    metrics: [
      ['A/R Days', '58 → 27'],
      ['First-Pass Clean', '98.9%'],
      ['Old AR Recovered', '$184,320'],
      ['Net Collection Uplift', '+28.4%'],
    ],
  },
]

export function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-[#0B1428] py-20 lg:py-28">
      <div className="pointer-events-none absolute top-0 left-[-8%] size-[420px] rounded-full bg-[#00D9C7]/6 blur-[140px]" aria-hidden="true" />
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <SectionHead
          eyebrow="Real Engagements, Real Deposits"
          icon={Award}
          title={
            <>
              Case Studies From the <span className="text-[#00D9C7]">Home Health, Hospice &amp; Part B</span> Frontline
            </>
          }
          subtitle="Representative engagements across all three divisions — names changed where protected, numbers reported straight from the ledgers."
        />

        <StaggerChildren className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {CASE_STUDIES.map((c) => (
            <StaggerItem key={c.org} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#17243A] transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9C7]/50">
                <div className="relative overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.org}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1428]/90 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#00D9C7] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1428]">
                    {c.tag}
                  </span>
                  <p className="absolute bottom-4 left-4 rounded-xl bg-[#0B1428]/80 px-3.5 py-1.5 text-[12px] font-bold text-[#F7F8FA] backdrop-blur">
                    <span className="text-[#00D9C7]">{c.meta}</span>
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[15px] font-extrabold leading-snug text-[#F7F8FA]">{c.headline}</p>
                  <p className="mt-1.5 text-[12px] font-semibold text-[#B8C5D8]/80">{c.org}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {c.metrics.map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-white/[0.07] bg-[#0B1428]/40 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#B8C5D8]/70">{k}</p>
                        <p className="mt-0.5 text-[15px] font-extrabold text-[#00D9C7]">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 14. FREE 90-DAY AUDIT CTA (uses shared ContactForm)                 */
/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section id="free-audit" className="relative overflow-hidden bg-[#0D1629] py-20 lg:py-28">
      <div className="pointer-events-none absolute top-[-10%] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-[#00D9C7]/10 blur-[150px]" aria-hidden="true" />
      <div className="container mx-auto px-5 md:px-6 xl:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHead
              eyebrow="Start With Proof"
              icon={BadgeCheck}
              title={
                <>
                  Request Your Free Part B &amp;{' '}
                  <span className="text-[#00D9C7]">Home Health / Hospice AR Audit</span>
                </>
              }
              subtitle="In 24 hours you will know exactly how much revenue is dying in your front-end rejections, aging A/R, and missed compliance windows — before you spend a single dollar with us."
            />
            <StaggerChildren className="mt-8 space-y-4" stagger={0.09}>
              {[
                {
                  icon: ShieldCheck,
                  title: 'Strict BAA & HIPAA confidentiality',
                  desc: 'A signed Business Associate Agreement protects every file from the moment we touch it.',
                },
                {
                  icon: Banknote,
                  title: 'Zero upfront cost',
                  desc: 'The audit is free for every qualified practice, clinic, home health & hospice agency.',
                },
                {
                  icon: Clock,
                  title: 'Delivered within 24 hours',
                  desc: 'A personalized AR findings report — with the exact recovery numbers like the ones above.',
                },
              ].map((b) => (
                <StaggerItem key={b.title}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#17243A] p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#00D9C7]/10 text-[#00D9C7]">
                      <b.icon size={20} />
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-[#F7F8FA]">{b.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-[#B8C5D8]">{b.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@billingoneiota.com"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-[#B8C5D8] transition-colors hover:border-[#00D9C7]/40 hover:text-[#00D9C7]"
              >
                <Mail size={16} /> hello@billingoneiota.com
              </a>
              <a
                href="tel:+18000000000"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-[#B8C5D8] transition-colors hover:border-[#00D9C7]/40 hover:text-[#00D9C7]"
              >
                <Phone size={16} /> (800) 000-0000
              </a>
            </div>
          </div>

          <AnimatedSection delay={0.15}>
            <ContactForm className="h-full" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HomeHealthHospice() {
  return (
    <main className="bg-[#0B1428]">
      <Hero />
      <Specialization />
      <CapabilityExplorer />
      <WhyInHouse />
    </main>
  )
}