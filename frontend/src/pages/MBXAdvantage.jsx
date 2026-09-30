import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView, useReducedMotion } from 'framer-motion'
import {
  BadgeCheck, ShieldCheck, TrendingUp, Quote, CheckCircle, ArrowRight,
  FileText, Code2, ClipboardCheck, FileSearch, Gauge,
  LockKeyhole, Fingerprint,
} from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton, SecondaryButton } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'

const advantages = [
  {
    metric: '98.5%',
    eyebrow: 'Billing · Accuracy',
    title: 'Billing Accuracy',
    icon: BadgeCheck,
    tone: 'light',
    description: 'Our multi-tier verification process ensures minimal errors and maximum reimbursement rates. First-pass clean claims standard.',
  },
  {
    eyebrow: 'Security & Compliance',
    title: 'HIPAA & SOC2',
    subTitle: 'Compliant Infrastructure',
    icon: ShieldCheck,
    tone: 'dark',
    description: 'Military-grade data security protocols to protect patient information and your practice\'s reputation. End-to-end 256-bit encryption.',
    tags: ['HIPAA', 'SOC2', '256-bit Encryption'],
  },
  {
    metric: '35%',
    eyebrow: 'Reimbursement',
    title: 'Faster Reimbursement Cycle',
    icon: TrendingUp,
    tone: 'light',
    description: 'Optimized workflows reduce A/R days by an average of 35% within the first 6 months. Accelerated cash flow velocity.',
  },
  {
    eyebrow: 'Testimonials',
    title: 'What They Say About Us',
    icon: Quote,
    tone: 'quote',
    description: 'Watch and read firsthand how home health, hospice, and medical speciality leaders trust MBX Solutions to resolve stuck aging receivables and transform their daily billing operations.',
    link: '/testimonials',
    linkLabel: 'Explore Testimonials',
  },
]

function AdvantageCards() {
  return (
    <StaggerChildren className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
      {advantages.map((card) => (
        <StaggerItem key={card.title} className="h-full">
          <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-mbx-border bg-white px-7 py-9 text-center transition-all duration-500 hover:-translate-y-2 hover:border-mbx-teal/30 hover:shadow-xl hover:shadow-[#4486BF]/10">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#4486BF] to-mbx-teal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <span className="relative text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4486BF]">
              {card.eyebrow}
            </span>

            <div className="relative mt-5 flex size-14 items-center justify-center rounded-2xl bg-[#4486BF]/10 text-[#4486BF] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#4486BF] group-hover:to-mbx-teal group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#4486BF]/25">
              <card.icon size={24} />
            </div>

            {card.metric ? (
              <p className="relative mt-6 text-6xl font-extrabold leading-none tracking-tighter text-mbx-navy xl:text-[4rem]">
                {card.metric.split('%')[0]}
                <span className="text-4xl text-[#4486BF]">%</span>
              </p>
            ) : null}

            <h3 className="relative mt-5 text-xl font-extrabold leading-snug text-mbx-navy">
              <span className="text-[#4486BF]">{card.title.split(' ').slice(0, card.subTitle ? 1 : 2).join(' ')}</span>{' '}
              {card.subTitle || card.title.split(' ').slice(card.subTitle ? 1 : 2).join(' ')}
            </h3>

            {card.tags && (
              <div className="relative mt-5 flex flex-wrap justify-center gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-mbx-border bg-mbx-surface px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-mbx-navy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="relative my-6 h-px w-14 bg-mbx-border transition-all duration-500 group-hover:w-24 group-hover:bg-mbx-teal/40" />

            <p className="relative flex-1 text-sm leading-relaxed text-mbx-text-muted">{card.description}</p>

            {card.link && (
              <Link
                to={card.link}
                className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-mbx-navy px-6 py-3 text-sm font-extrabold text-mbx-white transition-all duration-300 hover:bg-[#4486BF] hover:shadow-lg hover:shadow-[#4486BF]/25"
              >
                {card.linkLabel}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </StaggerItem>
      ))}
    </StaggerChildren>
  )
}
const workflow = [
  { icon: FileText, title: 'Billing', description: 'Multi-tier claim entry, scrubbing, and submission designed for first-pass accuracy.' },
  { icon: Code2, title: 'Coding', description: 'Precision ICD-10, CPT, and HCPCS coding aligned with clinical documentation.' },
  { icon: ClipboardCheck, title: 'OASIS', description: 'Accurate OASIS assessments and scoring optimization for home health outcomes.' },
  { icon: FileSearch, title: 'QA', description: 'Rigorous chart review and quality checks before claims ever leave the door.' },
  { icon: Gauge, title: 'Improved Revenue Cycle', description: 'Faster reimbursement, fewer denials, and healthier cash flow from end to end.' },
]

const securityPoints = [
  'End-to-end 256-bit encryption protecting patient data at rest and in transit.',
  'Security-trained workforce handling protected health information.',
  'Audited workflows with role-based access to sensitive records.',
  'Compliance aligned with HIPAA rules and privacy regulations.',
]

function MetricCounter({ value, decimals = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1600
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, prefersReducedMotion])

  return <span ref={ref}>{display.toFixed(decimals)}</span>
}

export default function MBXAdvantage() {
  usePageSeo('/mbx-advantage')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <AnimatedSection>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
                The MBX Advantage
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
                One Streamlined Workflow for <span className="text-[#4486BF]">Billing, Coding, OASIS, and QA</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
                We combine billing, coding, OASIS, and QA into one streamlined workflow—eliminating gaps, reducing errors, and improving outcomes across your entire revenue cycle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton to="/connect-us" size="lg">Schedule Free Audit</PrimaryButton>
                <SecondaryButton to="/services" size="lg">Explore Services</SecondaryButton>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative hidden lg:block">
              <div className="relative mx-auto max-w-md xl:max-w-lg">
                <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-3xl bg-gradient-to-br from-[#4486BF]/20 to-mbx-teal/10" />
                <div className="relative overflow-hidden rounded-3xl border border-mbx-teal/15 shadow-2xl shadow-[#4486BF]/20">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=80"
                    alt="Healthcare team collaborating on patient care"
                    className="aspect-[4/3.4] w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/45 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-7 -left-8 rounded-2xl bg-mbx-white p-5 shadow-2xl shadow-mbx-navy/15 border border-mbx-border">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#4486BF]/10 text-[#4486BF]">
                      <BadgeCheck size={22} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-none text-mbx-navy">98.5%</p>
                      <p className="mt-1 text-xs text-mbx-text-muted">Clean Claim Rate</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-4 rounded-2xl bg-mbx-navy px-5 py-4 shadow-2xl shadow-mbx-navy/30 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-mbx-teal/15 text-mbx-teal-light">
                      <TrendingUp size={22} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-none text-mbx-white">35%</p>
                      <p className="mt-1 text-xs text-white/60">Faster Reimbursement</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Advantage Intro + Cards */}
      <section className="py-28 lg:py-36 bg-mbx-white relative overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-[#4486BF]/5 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-mbx-teal/5 blur-[150px]" />
        <div className="container mx-auto relative">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why MBX Solutions"
              title="Built to Deliver Better Revenue Cycle Outcomes"
              subtitle="Every part of our workflow is designed to reduce friction, improve accuracy, protect sensitive information, and accelerate reimbursement."
            />
          </AnimatedSection>
          <AdvantageCards />
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1800&q=80"
          alt="Medical professionals in a modern practice"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-mbx-navy/85" />
        <div className="container mx-auto relative z-10 py-20 text-center lg:py-24">
          <AnimatedSection>
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-mbx-white md:text-4xl lg:text-5xl">
              One Partner. One Workflow. Every Step of Your Revenue Cycle.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              Billing, coding, OASIS, and QA under one roof — no handoffs, no gaps, no surprises.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Streamlined Workflow */}
      <section className="py-28 lg:py-36 bg-mbx-surface relative overflow-hidden">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="One Streamlined Workflow"
              title="From Claim to Reimbursement, Under One Roof"
              subtitle="Billing, coding, OASIS, and QA connected into a single pipeline so nothing falls through the cracks."
            />
          </AnimatedSection>
          <div className="mx-auto max-w-6xl">
            {/* Vertical timeline (mobile / tablet) */}
            <div className="lg:hidden">
              {workflow.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 0.08}>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl border border-mbx-teal/20 bg-mbx-white text-mbx-teal shadow-lg shadow-[#4486BF]/10">
                        <step.icon size={28} />
                        <span className="absolute -top-2.5 -left-2.5 flex size-7 items-center justify-center rounded-full bg-[#4486BF] text-[11px] font-extrabold text-white">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {i < workflow.length - 1 && <div className="my-2 w-px flex-1 bg-gradient-to-b from-mbx-teal/60 to-mbx-teal/15" />}
                    </div>
                    <div className="flex-1 pt-1 pb-10">
                      <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">Step {i + 1}</p>
                      <h4 className="mb-1.5 text-lg font-extrabold text-mbx-navy">{step.title}</h4>
                      <p className="max-w-md text-sm leading-relaxed text-mbx-text-muted">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Horizontal process (desktop) */}
            <div className="hidden lg:flex lg:items-start">
              {workflow.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 0.09} className="relative flex-1 lg:px-5">
                  <div className="relative mb-7">
                    {i < workflow.length - 1 && (
                      <div className="absolute top-8 left-1/2 right-[-50%] h-[2px] bg-gradient-to-r from-mbx-teal/50 via-[#4486BF]/25 to-mbx-teal/50" />
                    )}
                    <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-mbx-teal/20 bg-mbx-white text-mbx-teal shadow-lg shadow-[#4486BF]/10">
                      <step.icon size={28} />
                    </div>
                    <span className="absolute -top-2.5 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#4486BF] text-[11px] font-extrabold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mb-2 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">Step {i + 1}</p>
                  <h4 className="mb-2 text-center text-lg font-extrabold text-mbx-navy">{step.title}</h4>
                  <p className="mx-auto max-w-[15rem] text-center text-sm leading-relaxed text-mbx-text-muted">{step.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security / Compliance */}
      <section className="py-28 lg:py-36 bg-mbx-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-to-br from-[#4486BF]/15 to-mbx-teal/10" />
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80"
                  alt="Secure healthcare data and technology"
                  className="relative aspect-[4/3.2] w-full rounded-3xl border border-mbx-border object-cover shadow-xl shadow-mbx-navy/10"
                  loading="lazy"
                />
                <div className="absolute inset-3 rounded-[1.25rem] border border-white/25" />
                <div className="absolute -top-5 -right-3 rounded-2xl bg-mbx-white p-4 shadow-2xl border border-mbx-border lg:-right-8">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-mbx-teal/10 text-mbx-teal">
                      <LockKeyhole size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-mbx-navy">256-bit Encryption</p>
                      <p className="text-[10px] text-mbx-text-muted">At rest &amp; in transit</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -left-3 rounded-2xl bg-mbx-white p-4 shadow-2xl border border-mbx-border lg:-left-8">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-[#4486BF]/10 text-[#4486BF]">
                      <Fingerprint size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-mbx-navy">PHI Protected</p>
                      <p className="text-[10px] text-mbx-text-muted">Security-trained staff</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <SectionHeading
                eyebrow="Security & Compliance"
                title="HIPAA & SOC2 Compliant Infrastructure"
                subtitle="Military-grade data security protocols to protect patient information and your practice's reputation. End-to-end 256-bit encryption."
                centered={false}
              />
              <div className="grid gap-3">
                {securityPoints.map((point, i) => (
                  <AnimatedSection key={point} delay={0.1 + i * 0.05}>
                    <div className="flex items-start gap-3 rounded-xl border border-mbx-border bg-mbx-surface px-5 py-3.5 transition-all hover:border-mbx-teal/40 hover:shadow-sm">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-mbx-teal" />
                      <span className="text-sm leading-relaxed text-mbx-text-muted">{point}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-8">
                <SecondaryButton to="/hipaa" size="md">Learn About Compliance</SecondaryButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Measurable Results */}
      <section className="py-28 lg:py-36 bg-mbx-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4486BF]/15 blur-[180px]" />
          <div className="absolute -bottom-24 -left-24 size-[380px] rounded-full bg-mbx-teal/10 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Measurable Results"
              title="Results That Show Up in Your Revenue"
              subtitle="The MBX advantage is measured where it matters most — accuracy and how fast your money comes back."
              light
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto" stagger={0.15}>
            <StaggerItem>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] hover:border-mbx-teal/30 hover:-translate-y-1">
                <div className="mb-6 flex justify-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[#4486BF]/20 text-mbx-teal-light">
                    <BadgeCheck size={26} />
                  </div>
                </div>
                <p className="text-6xl md:text-7xl font-extrabold tracking-tight text-mbx-teal-light">
                  <MetricCounter value={98.5} decimals={1} />
                  <span className="text-4xl md:text-5xl">%</span>
                </p>
                <div className="mx-auto my-6 h-px w-16 bg-mbx-teal/40" />
                <p className="mb-2 text-xl font-extrabold text-mbx-white">Billing Accuracy</p>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60">
                  Multi-tier verification sets the standard for first-pass clean claims.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] hover:border-mbx-teal/30 hover:-translate-y-1">
                <div className="mb-6 flex justify-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[#4486BF]/20 text-mbx-teal-light">
                    <TrendingUp size={26} />
                  </div>
                </div>
                <p className="text-6xl md:text-7xl font-extrabold tracking-tight text-mbx-teal-light">
                  <MetricCounter value={35} decimals={0} />
                  <span className="text-4xl md:text-5xl">%</span>
                </p>
                <div className="mx-auto my-6 h-px w-16 bg-mbx-teal/40" />
                <p className="mb-2 text-xl font-extrabold text-mbx-white">Faster Reimbursement Cycle</p>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60">
                  A/R days reduced by an average of 35% within the first 6 months.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute -bottom-20 right-0 size-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              See the MBX Advantage in Your Revenue Cycle
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Get a free audit and discover exactly where accuracy, speed, and security can improve your practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Schedule Free Audit</PrimaryButton>
              <SecondaryButton to="/connect-us" size="lg">Contact Us</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
