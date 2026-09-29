import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  HeartPulse,
  HelpCircle,
  Mail,
  Minus,
  Phone,
  Plus,
  Rocket,
  Shield,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/Animated'
import { PrimaryButton } from '../components/UI'

const CATEGORIES = [
  {
    id: 'billing',
    icon: Banknote,
    title: 'Billing & Revenue Cycle',
    questions: [
      {
        q: 'What does a full revenue cycle management engagement include?',
        a: 'Your entire cash lifecycle under one accountable team: patient intake & demographic auditing, real-time eligibility and benefits verification, prior authorization, 24-hour charge entry with double-QC, certified medical coding (CPT / ICD-10 / HCPCS), clean claim submission, ERA/EOB payment posting and reconciliation, root-cause denial management, systematic A/R aging follow-up, old A/R recovery, physician credentialing & CAQH, and executive net-collection reporting.',
      },
      {
        q: 'How do you price your services? Are there any hidden fees?',
        a: 'We are performance-aligned. Fee schedules are based on a percentage of net collections, so we get paid only when you get paid. There are no setup fees, no software fees, no per-claim surcharges, and no hidden costs — the structure is documented up front and locked in before we start.',
      },
      {
        q: 'How long does it take to see results?',
        a: 'Most clients see front-end rejections drop and payments post faster within the first 30 days. A/R days typically improve by 60–90 days, and meaningful old A/R recovery lands within the first year. Your free 90-day AR audit gives you a baseline of exactly where the cash is trapped on day one.',
      },
      {
        q: 'Can you really recover 90- and 120-day-old A/R?',
        a: 'Yes. Our Old A/R Recovery Strike Team mines aging buckets, rebuilds clean documentation, and files targeted appeals before appeal windows close. Recovery of 90+ day receivables is exactly what our free audit measures and what the recovery team is built for.',
      },
    ],
  },
  {
    id: 'home-health-hospice',
    icon: HeartPulse,
    title: 'Home Health & Hospice',
    questions: [
      {
        q: 'What is the difference between your Physician Part B billing and your Home Health & Hospice division?',
        a: 'Physician Part B covers outpatient clinical care billed with CPT/ICD-10 to Medicare Part B and commercial payers. Home Health & Hospice is an institutional division that handles Medicare Part A UB-04 claims, PDGM 30-day payment periods, mandatory NOAs, hospice NOEs, 4 levels of care, and aggregate/inpatient cap compliance — a completely different billing universe with its own dedicated team.',
      },
      {
        q: 'What if we miss a mandatory 5-day NOA / NOE deadline?',
        a: 'That is exactly why our team exists. We file the NOA within 48 hours of the start of care and the hospice NOE within 48 hours of election — inside the 5-calendar-day CMS window every time. Our compliance calendar tracks every episode and election, so a penalty day never happens on our watch.',
      },
      {
        q: 'Do we need to change our current EHR / PM software?',
        a: 'No. We work inside WellSky, Axxess, HCHB, KanTime, MatrixCare, athenaHealth, eClinicalWorks, Kareo, AdvancedMD, Epic, NextGen and most major platforms — plus we log directly into FISS/DDE for Medicare. Zero conversions, zero duplicate entry, zero disruption.',
      },
      {
        q: 'How do you monitor hospice aggregate and inpatient caps?',
        a: 'We run a rolling monthly actuarial audit that projects your aggregate cap position, tracks per-beneficiary spending, and monitors inpatient bed-day utilization. Strategy flags are raised before overshoot so a six-figure recoupment never gets the chance to happen.',
      },
    ],
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Compliance & Security',
    questions: [
      {
        q: 'Are you HIPAA & HITECH compliant?',
        a: 'Fully. We operate under a signed Business Associate Agreement (BAA), enforce role-based access and encryption on every system, and back every engagement with strict confidentiality guarantees.',
      },
      {
        q: 'Who handles the medical coding? Are they certified?',
        a: 'Every coder in our team is AAPC / AHIMA certified. Coding is speciality-specific — meaning the cardiology coders know echo and cath lab rules, the PDGM team knows OASIS-E and HIPPS, and everyone stays current on regional Medicare LCDs and modifier rules.',
      },
      {
        q: 'How is my financial and patient data protected?',
        a: 'Data is encrypted at rest and in transit, access is role-based and audited, and every engagement is covered by a signed BAA. We never share your data with third parties and never use it for anything outside your account.',
      },
    ],
  },
  {
    id: 'getting-started',
    icon: Rocket,
    title: 'Getting Started',
    questions: [
      {
        q: 'How do I get started?',
        a: 'Request your free 90-day AR audit using the form on this site. Within 24 hours you will receive a personalized AR findings report — exact recovery numbers, front-end rejection causes, and denial root causes — with zero obligation to continue.',
      },
      {
        q: 'Who is a good fit for MBX Solutions?',
        a: 'Physician practices of any size, home health agencies, hospices, MSOs, urgent care and rural health clinics. If you rely on Medicare Part B, PDGM, or hospice reimbursement — or simply want aging A/R collected — you fit.',
      },
      {
        q: 'Is physician credentialing and payer enrollment included?',
        a: 'Yes. Credentialing, CAQH maintenance, and PECOS / payer enrollment are part of the full service — so claims never stall or die on an enrollment gap or an outdated profile.',
      },
    ],
  },
]

const TRUST = [
  { value: '98.5%', label: 'Billing Accuracy' },
  { value: '35%', label: 'A/R Reduction' },
  { value: '100%', label: 'HIPAA Compliant' },
  { value: '24/7', label: 'Client Support' },
]

const scrollToCat = (id) => {
  const el = document.getElementById(`cat-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="space-y-3.5">
      {items.map((f, idx) => {
        const isOpen = open === idx
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
              isOpen ? 'border-mbx-teal/40 shadow-lg shadow-mbx-teal/5' : 'border-mbx-border'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-extrabold leading-snug text-mbx-navy md:text-base">{f.q}</span>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? 'bg-mbx-teal text-white' : 'bg-mbx-teal/10 text-mbx-teal'
                }`}
              >
                {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-sm leading-relaxed text-mbx-text-muted md:px-6">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function FAQs() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-atmos">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#C7E7F8]/60 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 px-4 pt-72 pb-16 md:pt-60 lg:pt-48 lg:pb-20">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              <HelpCircle size={14} /> FAQs
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Frequently Asked<br />
              <span className="text-mbx-teal">Questions</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Straight answers on billing, revenue cycle management, Home Health &amp; Hospice, compliance, and how to
              get started with MBX Solutions.
            </p>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/70 border border-mbx-teal/15 px-4 py-3 text-center">
                  <p className="text-xl font-extrabold text-mbx-navy">{s.value}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-mbx-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Body */}
      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-14 lg:grid-cols-[300px_1fr]">
            {/* Category nav */}
            <aside className="lg:sticky lg:top-32 h-fit">
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">Categories</p>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => scrollToCat(c.id)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-mbx-border bg-mbx-surface px-4 py-3 text-left text-sm font-bold text-mbx-navy transition-all duration-200 hover:border-mbx-teal/40 hover:bg-white hover:pl-5"
                    >
                      <c.icon size={17} className="shrink-0 text-mbx-teal" />
                      {c.title}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-mbx-navy p-6 text-white">
                <p className="text-base font-extrabold">Still have questions?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  Our team replies the same business day. Ask us anything about billing, coding, or collections.
                </p>
                <div className="mt-4 space-y-2.5">
                  <a href="mailto:hello@mbxsol.com" className="flex items-center gap-2.5 text-sm font-bold text-mbx-teal-light hover:text-white transition-colors">
                    <Mail size={15} /> hello@mbxsol.com
                  </a>
                  <a href="tel:+18000000000" className="flex items-center gap-2.5 text-sm font-bold text-mbx-teal-light hover:text-white transition-colors">
                    <Phone size={15} /> (800) 000-0000
                  </a>
                </div>
                <Link
                  to="/connect-us"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4486BF] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#3a73a8]"
                >
                  Contact our team <ArrowRight size={14} />
                </Link>
              </div>
            </aside>

            {/* Questions */}
            <div>
              {CATEGORIES.map((c, ci) => (
                <div key={c.id} id={`cat-${c.id}`} className={ci > 0 ? 'mt-16 scroll-mt-32' : 'scroll-mt-32'}>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal">
                      <c.icon size={22} />
                    </span>
                    <div>
                      <h2 className="text-2xl font-extrabold text-mbx-navy md:text-[28px]">{c.title}</h2>
                      <p className="text-xs font-semibold text-mbx-text-muted">
                        {c.questions.length} answer{c.questions.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <AnimatedSection>
                    <Accordion items={c.questions} />
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mbx-surface py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-8 rounded-3xl bg-mbx-navy px-8 py-12 text-center lg:flex-row lg:justify-between lg:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-mbx-teal/10 blur-[100px]" />
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mbx-teal-light">Still not sure?</p>
                <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Get a Free 90-Day AR Audit.
                </h2>
                <p className="mt-3 max-w-xl text-sm md:text-base text-white/60">
                  See exactly how much revenue is trapped in your aging A/R, denials, and missed compliance windows — free
                  and delivered within 24 hours.
                </p>
              </div>
              <PrimaryButton to="/connect-us" size="lg" className="relative z-10 shrink-0">
                Request Free Audit
              </PrimaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}