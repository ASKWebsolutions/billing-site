import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Loader2, AlertCircle, ShieldCheck, FileSearch,
  Calculator, PhoneCall, Clock, Percent, Banknote,
  TrendingDown, PlayCircle, X, Quote, FileCode2, Gavel, RotateCcw,
} from 'lucide-react'
import { usePageSeo } from '../hooks/useSeo'
import CertificationsShowcase from '../components/CertificationsShowcase'
import { ScaleIn, StaggerChildren, StaggerItem } from '../components/Animated'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/* ============================== SECTION 1: HERO ============================== */

const heroStats = [
  { icon: Percent, value: '12.0%', label: 'Contingency Fee', sub: '$0 if unrecovered' },
  { icon: ShieldCheck, value: '95%', label: 'Overturn Rate', sub: 'Appeals won' },
  { icon: TrendingDown, value: '-35 Days', label: 'Avg A/R Reduction', sub: 'Within 60 days' },
  { icon: Clock, value: '72 Hours', label: 'Free Initial Audit', sub: 'Detailed report' },
]

function ARRecoveryHero() {
  return (
    <section className="bg-atmos hero-grid overflow-hidden">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          {/* Left copy */}
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mbx-teal">
              Specialized A/R Recovery Unit · 12% Contingency
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-mbx-navy md:text-5xl lg:text-[3.4rem]">
              Stop Writing Off Claims.{' '}
              <span className="text-gradient">Recover Your Trapped Cash.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-mbx-text-muted">
              Most healthcare practices lose $40,000 to $180,000 every year simply because claims sit
              stuck in unpaid aging buckets until the Timely Filing Limit (TFL) is crossed.
            </p>

            {/* Contingency promise card */}
            <div className="mb-10 max-w-xl rounded-2xl border-l-4 border-mbx-teal bg-white p-6 shadow-xl shadow-mbx-navy/10 md:p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-mbx-teal/10 text-mbx-teal">
                  <Banknote size={20} />
                </span>
                <h2 className="text-lg font-extrabold text-mbx-navy md:text-xl">
                  Our 12% Contingency Promise: No Recovery = $0 Fee
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-mbx-text-muted md:text-base">
                We perform a line-by-line forensic audit of all claims aging past 60, 90, and 120+
                days. You only pay a 12% fee after the funds are successfully deposited into your
                agency&apos;s bank account.
              </p>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <ScaleIn className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/60 shadow-2xl shadow-mbx-navy/20">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop"
                  alt="Healthcare billing specialist reviewing aged medical claims and accounts receivable"
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                  width="900"
                  height="675"
                />
              </div>
              {/* Floating mini card */}
              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-mbx-border bg-white p-4 shadow-xl shadow-mbx-navy/10 md:-left-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-mbx-text-muted">Recovery proof</p>
                <p className="mt-1.5 text-2xl font-extrabold text-mbx-teal">$136,800</p>
                <p className="text-xs text-mbx-text-muted">collected in 42 days</p>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* Four statistics cards */}
        <StaggerChildren className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 md:gap-5">
          {heroStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group h-full rounded-2xl border border-mbx-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-mbx-teal/40 hover:shadow-lg hover:shadow-mbx-navy/10">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal transition-colors duration-300 group-hover:bg-mbx-teal group-hover:text-white">
                  <stat.icon size={22} />
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-mbx-navy">{stat.label}</p>
                <p className="mt-0.5 text-xs text-mbx-text-muted">{stat.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ====================== SECTION 2: LIVE CONTINGENCY ESTIMATOR ====================== */

const SLIDER_STEPS = [20000, 100000, 125000, 250000, 400000]

const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 0 })

function ContingencyEstimator() {
  const [amount, setAmount] = useState(125000)
  const [raw, setRaw] = useState('125000')

  const results = useMemo(() => {
    const recoverable = amount * 0.9
    const fee = recoverable * 0.12
    const net = recoverable - fee
    return { recoverable, fee, net }
  }, [amount])

  const commit = (value) => {
    const clamped = Math.min(400000, Math.max(20000, Number(value) || 0))
    setAmount(clamped)
    setRaw(String(clamped))
  }

  const onSlider = (e) => {
    const step = Number(e.target.value)
    const v = SLIDER_STEPS[step]
    setAmount(v)
    setRaw(String(v))
  }

  const sliderIndex = SLIDER_STEPS.reduce(
    (best, v, i) => (Math.abs(v - amount) < Math.abs(SLIDER_STEPS[best] - amount) ? i : best),
    0,
  )

  return (
    <section className="bg-mbx-white">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">
            Live Contingency Estimator
          </span>
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-4xl lg:text-[2.75rem]">
            Calculate What You Keep from Your Trapped A/R
          </h2>
          <p className="inline-flex items-center gap-2 rounded-full border border-mbx-teal/25 bg-mbx-surface px-4 py-2 text-sm font-semibold text-mbx-navy">
            <Calculator size={16} className="text-mbx-teal" />
            Fee Model: 12% Contingency (No Upfront Payment)
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
          {/* Controls */}
          <div className="rounded-3xl border border-mbx-border bg-mbx-surface p-6 md:p-8">
            <label htmlFor="ar-amount" className="mb-1 block text-sm font-bold text-mbx-navy">
              Estimated Stuck A/R (&gt;60, &gt;90, &gt;120 Days)
            </label>
            <div className="mb-6 flex items-baseline gap-3">
              <p className="text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl">
                ${fmt(amount)}
              </p>
            </div>

            <input
              id="ar-amount"
              type="range"
              min="0"
              max={SLIDER_STEPS.length - 1}
              step="1"
              value={sliderIndex}
              onChange={onSlider}
              onMouseUp={() => commit(amount)}
              onTouchEnd={() => commit(amount)}
              onKeyUp={() => commit(amount)}
              className="w-full cursor-pointer accent-[#4486BF]"
              aria-valuetext={`$${fmt(amount)}`}
            />
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-mbx-text-muted">
              <span>$20,000</span>
              <span>$100,000</span>
              <span>$250,000</span>
              <span>$400,000</span>
            </div>

            <div className="mt-6">
              <label htmlFor="ar-numeric" className="mb-1 block text-xs font-bold text-mbx-navy">
                Or enter an exact amount
              </label>
              <div className="flex items-center rounded-xl border border-mbx-border bg-mbx-white focus-within:border-[#4486BF] focus-within:ring-2 focus-within:ring-[#4486BF]/10">
                <span className="pl-4 text-sm font-bold text-mbx-text-muted">$</span>
                <input
                  id="ar-numeric"
                  type="number"
                  min="20000"
                  max="400000"
                  step="1000"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  onBlur={() => commit(raw)}
                  onKeyDown={(e) => { if (e.key === 'Enter') commit(raw) }}
                  className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-mbx-navy outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-2xl border border-mbx-border bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-mbx-text-muted">Estimated Recoverable</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-[2.1rem]">
                ${fmt(Math.round(results.recoverable))}
              </p>
              <p className="mt-2 text-xs text-mbx-text-muted">~90% Historical recovery</p>
            </div>
            <div className="rounded-2xl border border-mbx-border bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-mbx-text-muted">MBX Contingency Fee (12%)</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-[2.1rem]">
                ${fmt(Math.round(results.fee))}
              </p>
              <p className="mt-2 text-xs text-mbx-text-muted">Paid only after collection</p>
            </div>
            {/* Highlighted net card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0B2348] via-[#12395F] to-[#1E5C8F] p-6 shadow-lg shadow-mbx-navy/25">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-mbx-teal-light">Net Cash to Practice</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-[2.1rem]">
                ${fmt(Math.round(results.net))}
              </p>
              <p className="mt-2 text-xs text-white/60">88% directly in your bank</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-mbx-teal/20 bg-mbx-surface p-5 md:p-6">
          <p className="text-sm leading-relaxed text-mbx-text-muted">
            <span className="font-bold text-mbx-navy">How the 12% model works:</span>{' '}
            If claims are uncollectible due to valid payer write-offs, you owe $0. We only invoice 12%
            after cash settles into your designated bank account via EFT.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ================= SECTION 3: DENIAL FORENSIC DIAGNOSTIC CENTER ================= */

const denialCategories = [
  {
    id: 1,
    percent: '28%',
    tag: 'of All Trapped Claims',
    title: 'Eligibility & Coverage Termination',
    impact: '$34,000+ Avg Annual Loss per Agency',
    description:
      'Patient enrolled in a Medicare Advantage HMO without the agency knowing, Medicaid coverage lapsed, or wrong Primary/Secondary payer coordination occurred.',
    reasons: [
      'Patient enrolled in private HMO (Humana, United, Aetna MA) and Medicare Part A was billed instead.',
      'Medicaid redetermination expiration: Patient coverage ended prior to date of service.',
      'Coordination of Benefits (COB) conflict: Payer demands proof that spouse commercial plan is non-primary.',
    ],
    codes: [
      { code: 'PR-26', note: 'Expenses incurred prior to coverage.' },
      { code: 'PR-27', note: 'Expenses incurred after coverage terminated.' },
      { code: 'OA-22', note: 'Coordination of benefits required.' },
    ],
    protocol:
      'Our recovery unit conducts electronic 270/271 historical eligibility checks, identifies the true active payer ID and policy number, obtains retroactive coverage exceptions, and generates immediate electronic crossover claims with EOB within 48 hours.',
    scenario:
      'Patient transferred to Humana Gold Medicare Advantage. Traditional Medicare recouped $14,200 from agency. MBX recovered $13,600 by filing retroactive HMO authorization appeal with hospital discharge records.',
    fix: 'Mandatory bi-weekly batch eligibility scrubbing to catch HMO plan switches before care is delivered.',
  },
  {
    id: 2,
    percent: '24%',
    tag: 'of Trapped Claims',
    title: 'Prior Authorization & Pre-Cert Lapse',
    impact: '$42,000+ Avg Annual Loss per Agency',
    description:
      'Care delivered before authorization was formally approved, visit count exceeded approved units, or authorization number was omitted from the 837 claim.',
    reasons: [
      'HMO approval delay: Clinical care commences based on verbal hospital referral.',
      'Service frequency mismatch: Doctor ordered PT 3/week but authorization only covered 2/week.',
      'Missing Box 63 authorization number on the 837 electronic institutional claim.',
    ],
    codes: [],
    protocol:
      'We review clinical chart progress notes, formulate peer-to-peer physician justification letters, file formal Retroactive Medical Necessity Appeals citing urgent hospital discharge criteria, and resubmit corrected claims.',
    scenario:
      'Aetna HMO denied weeks of skilled nursing ($12,400) for missing pre-cert. MBX cited acute hospital discharge continuity of care and overturned the denial, recovering the denied amount.',
    fix: 'Pre-Auth Tracker triggers alerts 10 days before units or authorization dates expire.',
  },
  {
    id: 3,
    percent: '19%',
    tag: 'of Trapped Claims',
    title: 'Modifier, CPT & ICD-10 Discrepancies',
    impact: '$26,000+ Avg Annual Loss per Agency',
    description:
      'Missing distinct procedural modifiers (59, XS, 25, KX), non-specific ICD-10 codes, or incorrect PDGM primary diagnosis sequencing triggering RTP (Return-to-Provider).',
    reasons: [
      'Missing Modifier 59 or XS on distinct therapy or concurrent nursing procedures.',
      'Missing Modifier KX when physical/speech therapy visits exceed annual Medicare thresholds.',
      'Coding primary diagnosis as a symptom code (e.g., R26.9 Gait abnormality) which Medicare PDGM rejects.',
    ],
    codes: [],
    protocol:
      'Our coding specialists audit rejected claims, append compliant CMS modifiers (e.g., Modifier 59, 25, or KX), re-sequence comorbidity subgroups, and transmit an electronic Type of Bill (TOB 327) adjustment claim within 24 hours.',
    scenario:
      'Therapy visit claims ($22,800) denied as bundled. MBX appended Modifier 59 and KX with audited therapy logs and recovered the full $22,800 in 18 days.',
    fix: 'Pre-claim clearinghouse scrubbers inspect every line item for mandatory modifier and diagnosis pairing.',
  },
  {
    id: 4,
    percent: '16%',
    tag: 'of Trapped Claims',
    title: 'Medical Records & Documentation Requests (ADRs)',
    impact: '$50,000+ Avg Annual Loss per Agency',
    description:
      'Payer issued an Additional Documentation Request (ADR), but physician failed to sign the CMS-485 Plan of Care within 30 days, or nurse visit notes were submitted late.',
    reasons: [
      'CMS ADR notice sent via paper mail and ignored by agency front desk until 45-day window expired.',
      'Physician signature missing, signature illegible, or lacking physician date stamp on the 485.',
      'Visiting clinician progress note contradicts homebound criteria in OASIS assessment.',
    ],
    codes: [
      { code: 'CO-252', note: 'Documentation was not received within the required timeframe.' },
      { code: 'CO-151', note: 'Payment denied - clinical necessity not documented.' },
    ],
    protocol:
      'Our clinical QA auditors immediately compile the complete clinical chart packet, retrieve signed verbal orders and physician attestation affidavits, draft clinical summary defense letters, and upload via certified portal/DDE within 5 days.',
    scenario:
      'Medicare MAC held $62,000 in ADR audits across 18 episodes. MBX coordinated with physicians for electronic signature addendums and cleared 17 of 18 claims, recovering $58,200.',
    fix: '485 Tracking Queue flags unsigned physician orders on Day 7, Day 14, and Day 21.',
  },
  {
    id: 5,
    percent: '13%',
    tag: 'of Trapped Claims',
    title: 'Timely Filing Limit (TFL) Expirations',
    impact: '$65,000+ Permanent Write-Off Risk',
    description:
      'The single biggest cause of permanent revenue destruction: claims sat unworked for 90, 180, or 365 days, and the payer rejected the appeal as past timely filing limit.',
    reasons: [
      'Previous biller gave up due to difficult claims and let the 90-day or 120-day filing deadline pass.',
      'Clearinghouse front-end rejection was never fixed and never reached the payer system.',
      'Secondary insurance was never billed after primary Medicare payment crossing secondary timely filing.',
    ],
    codes: [],
    protocol:
      'We extract clearinghouse 277 EDI Functional Acknowledgments showing the exact timestamp the original claim was accepted by the payer gateway. We submit a Timely Filing Overturn Dossier to payer claims supervisors, forcing them to adjudicate.',
    scenario:
      'Blue Cross denied $3,800 in claims as post 180-day timely filing. MBX retrieved the original clearinghouse EDI 277 acceptance log proving submission on Day 14, forcing Blue Cross to reopen and pay $3,400 with interest.',
    fix: 'Zero-touch queue flags any claim that has sat un-adjudicated past 25 days.',
  },
]

function DenialDetailPanel({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden rounded-3xl border border-mbx-border bg-white shadow-lg shadow-mbx-navy/5"
    >
      {/* Panel header */}
      <div className="border-b border-mbx-border bg-mbx-surface px-6 py-6 md:px-9">
        <h3 className="text-xl font-extrabold text-mbx-navy md:text-2xl">{category.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mbx-text-muted md:text-base">
          {category.description}
        </p>
      </div>

      <div className="grid gap-8 p-6 md:p-9 lg:grid-cols-2 lg:gap-10">
        {/* LEFT: reasons + remark codes */}
        <div className="space-y-8">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
              <FileSearch size={16} className="text-mbx-teal" />
              Primary Reasons Claims Sit Unpaid
            </h4>
            <ul className="space-y-3">
              {category.reasons.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mbx-text-muted">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-mbx-teal" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {category.codes.length > 0 && (
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
                <FileCode2 size={16} className="text-mbx-teal" />
                Common Payer Remark Codes Diagnosed
              </h4>
              <ul className="space-y-2.5">
                {category.codes.map((c) => (
                  <li key={c.code} className="flex items-start gap-3 rounded-xl border border-mbx-border bg-mbx-surface px-4 py-3">
                    <span className="shrink-0 rounded-md bg-mbx-teal/10 px-2 py-0.5 text-xs font-extrabold text-mbx-teal">
                      {c.code}
                    </span>
                    <span className="text-sm text-mbx-text-muted">{c.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT: protocol + scenario + long-term fix */}
        <div className="space-y-8">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
              <Gavel size={16} className="text-mbx-teal" />
              MBX Overturn & Recovery Protocol
            </h4>
            <p className="rounded-xl border-l-4 border-mbx-teal bg-mbx-surface p-4 text-sm leading-relaxed text-mbx-text-muted">
              {category.protocol}
            </p>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
              <PhoneCall size={16} className="text-mbx-teal" />
              Real Agency Scenario Recovered
            </h4>
            <p className="text-sm leading-relaxed text-mbx-text-muted">{category.scenario}</p>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
              <RotateCcw size={16} className="text-mbx-teal" />
              Long-Term Fix
            </h4>
            <p className="text-sm leading-relaxed text-mbx-text-muted">{category.fix}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DenialDiagnosticCenter() {
  const [active, setActive] = useState(1)
  const activeCategory = denialCategories.find((c) => c.id === active)

  return (
    <section className="bg-mbx-surface">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">
            Denial Forensic Diagnostic Center
          </span>
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-4xl lg:text-[2.75rem]">
            Why Claims Really Get Denied & How MBX Overturns Them
          </h2>
          <p className="text-lg leading-relaxed text-mbx-text-muted">
            Click into each root cause category below to see why claims fail, common CMS remark
            codes, and our exact forensic appeal protocol.
          </p>
        </div>

        {/* Category cards */}
        <div
          role="tablist"
          aria-label="Denial root cause categories"
          className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {denialCategories.map((cat) => {
            const selected = cat.id === active
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`denial-panel-${cat.id}`}
                id={`denial-tab-${cat.id}`}
                onClick={() => setActive(cat.id)}
                className={`group flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mbx-teal ${
                  selected
                    ? 'border-mbx-teal bg-[#4486BF] shadow-lg shadow-[#4486BF]/30'
                    : 'border-mbx-border bg-white hover:-translate-y-1 hover:border-mbx-teal/40 hover:shadow-md'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${selected ? 'text-white/70' : 'text-mbx-teal'}`}>
                  {String(cat.id).padStart(2, '0')}
                </span>
                <p className={`mt-1 text-2xl font-extrabold tracking-tight ${selected ? 'text-white' : 'text-mbx-navy'}`}>
                  {cat.percent}
                </p>
                <p className={`text-[11px] font-semibold ${selected ? 'text-white/70' : 'text-mbx-text-muted'}`}>{cat.tag}</p>
                <p className={`mt-3 flex-1 text-sm font-bold leading-snug ${selected ? 'text-white' : 'text-mbx-navy'}`}>
                  {cat.title}
                </p>
                <p className={`mt-3 text-[11px] font-semibold leading-snug ${selected ? 'text-mbx-teal-light' : 'text-mbx-teal'}`}>
                  {cat.impact}
                </p>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div
          id={`denial-panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`denial-tab-${activeCategory.id}`}
        >
          <AnimatePresence mode="wait">
            <DenialDetailPanel key={activeCategory.id} category={activeCategory} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ==================== SECTION 4: PROVEN TRACK RECORD – CASE STUDIES ==================== */

const caseTabs = ['Aged Receivables', 'Denial Resolution', 'EVV Clock-In']

function CaseStudyTabs() {
  const [tab, setTab] = useState(0)

  return (
    <section className="bg-mbx-white">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">
            Proven Track Record
          </span>
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-4xl lg:text-[2.75rem]">
            Real Agency Turnaround Case Studies
          </h2>
          <p className="text-lg leading-relaxed text-mbx-text-muted">
            Verifiable before-and-after results achieved through our 12% contingency recovery unit.
          </p>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Case study categories" className="mb-10 flex flex-wrap justify-center gap-3">
          {caseTabs.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`rounded-full border-2 px-6 py-2.5 text-sm font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mbx-teal ${
                tab === i
                  ? 'border-[#4486BF] bg-[#4486BF] text-white shadow-lg shadow-[#4486BF]/25'
                  : 'border-mbx-border bg-white text-mbx-navy hover:border-mbx-teal/50 hover:text-mbx-teal'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div
              key="aged"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="overflow-hidden rounded-3xl border border-mbx-border bg-white shadow-lg shadow-mbx-navy/5">
                {/* Case header */}
                <div className="border-b border-mbx-border bg-mbx-surface px-6 py-7 md:px-10 md:py-9">
                  <p className="mb-2 inline-flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-mbx-teal">
                    Home Health Agency (Medicare & HMO) · Houston, Texas · 92.1% Overturn Rate
                  </p>
                  <h3 className="text-xl font-extrabold text-mbx-navy md:text-2xl">
                    Aged Receivables Recovery for 120-Patient Home Health Agency
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    <CheckCircle2 size={13} />
                    Resolved in 42 Days
                  </span>
                </div>

                {/* Financial result cards */}
                <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-10 lg:grid-cols-4">
                  <div className="rounded-2xl border border-mbx-border bg-mbx-surface p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-mbx-text-muted">Initial Stuck A/R</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-mbx-navy">$148,600</p>
                    <p className="mt-2 text-xs text-mbx-text-muted">At 68 A/R Days</p>
                  </div>
                  <div className="rounded-2xl border border-mbx-border bg-mbx-surface p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-mbx-text-muted">Cash Collected</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-mbx-teal">$136,800</p>
                    <p className="mt-2 text-xs text-mbx-text-muted">92.1% Overturn Rate</p>
                  </div>
                  <div className="rounded-2xl border border-mbx-border bg-mbx-surface p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-mbx-text-muted">MBX Fee (12%)</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-mbx-navy">$16,416</p>
                    <p className="mt-2 text-xs text-mbx-text-muted">Only paid on collection</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-[#0B2348] via-[#12395F] to-[#1E5C8F] p-6 shadow-lg shadow-mbx-navy/20">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-mbx-teal-light">Net Agency Gain</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">$120,384</p>
                    <p className="mt-2 text-xs text-white/60">A/R down to 27 Days</p>
                  </div>
                </div>

                {/* Explanation + quote */}
                <div className="grid gap-8 px-6 pb-8 md:px-10 md:pb-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <h4 className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-mbx-navy">
                      Case Study Explanation
                    </h4>
                    <p className="text-sm leading-relaxed text-mbx-text-muted md:text-base">
                      Agency had over $148k trapped past 90 and 120 days that their previous
                      in-house biller had abandoned as uncollectible. MBX Solutions retrieved
                      clearinghouse 277 EDI proof, secured physician signature affidavits, and
                      recovered $136,800 in 42 days.
                    </p>
                  </div>
                  <div className="relative rounded-2xl border-l-4 border-mbx-teal bg-mbx-surface p-6">
                    <Quote size={28} className="mb-3 text-mbx-teal/40" />
                    <blockquote className="text-sm italic leading-relaxed text-mbx-navy md:text-base">
                      &ldquo;We were preparing to write off nearly $150k because our previous biller
                      said the timely filing deadline had passed. MBX came in on a 12% contingency
                      basis and recovered $136,800 into our bank account in 6 weeks. It literally
                      funded our expansion.&rdquo;
                    </blockquote>
                    <p className="mt-4 text-xs font-bold text-mbx-text-muted md:text-sm">
                      — Dr. Evelyn Reed, MD, Executive Director, Apex Home Health
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div
              key="denial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-dashed border-mbx-teal/40 bg-mbx-surface p-10 text-center"
            >
              <FileSearch size={32} className="mx-auto mb-4 text-mbx-teal" />
              <h3 className="text-lg font-extrabold text-mbx-navy md:text-xl">Denial Resolution Case Study</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-mbx-text-muted">
                Detailed before-and-after denial resolution results will be published here as client
                verifications are completed.
              </p>
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div
              key="evv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-dashed border-mbx-teal/40 bg-mbx-surface p-10 text-center"
            >
              <Clock size={32} className="mx-auto mb-4 text-mbx-teal" />
              <h3 className="text-lg font-extrabold text-mbx-navy md:text-xl">EVV Clock-In Case Study</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-mbx-text-muted">
                Detailed EVV visit-compliance results will be published here as client verifications
                are completed.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ======================== SECTION 5: CLIENT VIDEO TESTIMONIALS ======================== */

const videoTestimonials = [
  {
    duration: '02:18',
    videoId: 'CcK_3hC34MI',
    result: '$136,800 Recovered (42 Days)',
    org: 'Apex Home Health Partners, Houston, TX',
    person: 'Dr. Evelyn Reed, MD',
    designation: 'Executive Director & Co-Founder',
    quote:
      'MBX Solutions recovered $136,800 in 120-day claims our previous biller told us was dead money. With their 12% contingency fee, we only paid after the money was in our bank.',
  },
  {
    duration: '01:54',
    videoId: 'x91EUt036zc',
    result: '$58,900 Recovered (28 Days)',
    org: 'CareFirst Home Care & Pediatrics, Orlando, FL',
    person: 'Marcus Vance, MHA',
    designation: 'Administrator',
    quote:
      'Their root-cause denial analysis showed us exactly why Medicaid HMOs were denying our EVV visits. They fixed the problem and collected $58,900 in trapped revenue.',
  },
  {
    duration: '02:05',
    videoId: 'l0keF8vyoJ0',
    result: 'A/R Days Dropped from 59 to 24',
    org: 'Trinity Hospice & Palliative, Chicago, IL',
    person: 'Elena Rostova, RN',
    designation: 'Clinical & QA Director',
    quote:
      'They actually pick up the phone and talk to payer supervisors. They don\'t just hit resubmit like automated software. They understand clinical guidelines.',
  },
]

function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section className="bg-mbx-surface">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">
            Client Video Testimonials
          </span>
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-4xl lg:text-[2.75rem]">
            Hear From Practice Administrators & Directors
          </h2>
          <p className="text-lg leading-relaxed text-mbx-text-muted">
            Agency leaders share how MBX Solutions resolved their aging claims and prevented
            write-offs.
          </p>
        </div>

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videoTestimonials.map((t, i) => (
            <StaggerItem key={i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mbx-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-mbx-teal/40 hover:shadow-lg">
                {/* Thumbnail — related industry video poster */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0B2348] to-[#1E5C8F]">
                  <img
                    src={`https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`}
                    alt={`Related video thumbnail: ${t.result}`}
                    className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="480"
                    height="360"
                  />
                  <div className="absolute inset-0 bg-mbx-navy/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-mbx-teal shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <PlayCircle size={28} />
                    </span>
                    <span className="mt-3 rounded-md bg-black/40 px-2 py-0.5 text-xs font-bold text-white">
                      {t.duration}
                    </span>
                  </div>
                  <div className="absolute left-4 top-4 rounded-lg bg-[#4486BF] px-3 py-1.5 text-xs font-extrabold text-white shadow">
                    {t.result}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-mbx-teal">{t.org}</p>
                  <h3 className="mt-2 text-lg font-extrabold text-mbx-navy">{t.person}</h3>
                  <p className="text-xs font-semibold text-mbx-text-muted">{t.designation}</p>
                  <blockquote className="mt-3 flex-1 text-sm italic leading-relaxed text-mbx-text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <button
                    onClick={() => setActiveVideo(t)}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-mbx-teal/40 px-5 py-2.5 text-sm font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal hover:bg-mbx-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mbx-teal"
                  >
                    <PlayCircle size={16} />
                    Watch Testimonial & Transcript
                  </button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Video / transcript modal — opens only from real future media; shows details today */}
      <AnimatePresence>
        {activeVideo && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-mbx-navy/70 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Testimonial video from ${activeVideo.person}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white p-7 shadow-2xl md:p-9"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close testimonial details"
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-mbx-surface text-mbx-navy transition-colors hover:bg-mbx-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mbx-teal"
              >
                <X size={18} />
              </button>
              {/* Video — related industry embed */}
              <div className="mb-2 aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?rel=0`}
                  title={`Related video: ${activeVideo.result}`}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="mb-4 text-center text-[11px] font-semibold text-mbx-text-muted">
                Related industry video · client recording will be added once approved
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-mbx-teal">{activeVideo.org}</p>
              <h3 className="mt-1 text-xl font-extrabold text-mbx-navy">
                {activeVideo.person} — {activeVideo.designation}
              </h3>
              <p className="mt-1 text-sm font-bold text-mbx-teal">Result: {activeVideo.result}</p>
              <h4 className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-mbx-navy">Transcript</h4>
              <blockquote className="mt-2 rounded-xl bg-mbx-surface p-4 text-sm leading-relaxed text-mbx-text-muted">
                &ldquo;{activeVideo.quote}&rdquo;
              </blockquote>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ==================== SECTION 6: FREE A/R AUDIT – CONTACT FORM ==================== */

const initialForm = { agency: '', email: '', phone: '' }
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRe = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/

function AuditRequestForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.agency.trim()) errs.agency = 'Agency or practice name is required.'
    if (!form.email.trim()) errs.email = 'Email address is required.'
    else if (!emailRe.test(form.email.trim())) errs.email = 'Enter a valid email address.'
    if (!form.phone.trim()) errs.phone = 'Phone number is required.'
    else if (!phoneRe.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.agency.trim(),
          agencyName: form.agency.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message:
            'Free 48-Hour A/R Aging & Denial Forensic Report request from A-R Recovery page. Team: Client requests analysis of 60/90/120+ day aged claims and cash recovery forecast.',
        }),
      })
      if (res.ok) {
        setSent(true)
        setForm(initialForm)
      } else {
        let msg = 'Submission failed. Please try again.'
        try {
          const data = await res.json()
          if (data && data.error) msg = data.error
        } catch {
          /* non-JSON response */
        }
        setError(msg)
      }
    } catch {
      setError('Failed to submit. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  const fieldCls = (hasError) =>
    `w-full rounded-xl border bg-mbx-surface px-4 py-3 text-sm text-mbx-navy outline-none transition-all focus:ring-2 focus:ring-[#4486BF]/10 ${
      hasError ? 'border-red-400 focus:border-red-400' : 'border-mbx-border focus:border-[#4486BF]'
    }`

  return (
    <section id="request-audit" className="bg-mbx-navy">
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left copy */}
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal-light">
              Zero Upfront Cost · Zero Obligation
            </span>
            <h2 className="mb-6 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
              Get Your Free 48-Hour A/R Aging & Denial Forensic Report
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/65">
              Send us your aged summary report. Our recovery specialists will analyze your 60/90/120+
              day claims, identify which denials can be overturned, and deliver a cash recovery
              forecast within 48 hours.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Line-by-line forensic audit of 60/90/120+ day claims',
                'Denial overturn forecast with remark-code analysis',
                'No fee unless cash is recovered — ever',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/80 md:text-base">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-mbx-teal-light" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form card */}
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 md:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="mb-2 text-2xl font-extrabold text-mbx-navy">Audit Request Received!</h3>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-mbx-text-muted">
                  Our A/R recovery specialists will review your aging claims and send your cash
                  recovery forecast within 48 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 text-sm font-bold text-mbx-teal hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="mb-6 text-center text-xl font-extrabold text-mbx-navy md:text-2xl">
                  Request Your <span className="text-mbx-teal">Free A/R Audit</span>
                </h3>

                {error && (
                  <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600">
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="ar-agency" className="mb-1 block text-sm font-bold text-mbx-navy">
                      Agency or Practice Name *
                    </label>
                    <input
                      id="ar-agency"
                      type="text"
                      name="agency"
                      value={form.agency}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.agency)}
                      aria-describedby={errors.agency ? 'ar-agency-error' : undefined}
                      placeholder="Your agency / practice"
                      className={fieldCls(errors.agency)}
                    />
                    {errors.agency && (
                      <p id="ar-agency-error" className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertCircle size={13} /> {errors.agency}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ar-email" className="mb-1 block text-sm font-bold text-mbx-navy">
                      Director Email Address *
                    </label>
                    <input
                      id="ar-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'ar-email-error' : undefined}
                      placeholder="name@youragency.com"
                      className={fieldCls(errors.email)}
                    />
                    {errors.email && (
                      <p id="ar-email-error" className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertCircle size={13} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ar-phone" className="mb-1 block text-sm font-bold text-mbx-navy">
                      Direct Phone Number *
                    </label>
                    <input
                      id="ar-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'ar-phone-error' : undefined}
                      placeholder="(555) 123-4567"
                      className={fieldCls(errors.phone)}
                    />
                    {errors.phone && (
                      <p id="ar-phone-error" className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertCircle size={13} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#4486BF] px-8 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free 48-Hour A/R Audit
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-mbx-text-muted">
                  Your information stays confidential. We never request patient-level details
                  through this form.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================== PAGE ================================== */

export default function ARRecovery() {
  usePageSeo('/ar-recovery')

  return (
    <main className="bg-mbx-white">
      <ARRecoveryHero />
      <ContingencyEstimator />
      <DenialDiagnosticCenter />
      <CaseStudyTabs />
      <VideoTestimonials />
      <CertificationsShowcase />
      <AuditRequestForm />
    </main>
  )
}
