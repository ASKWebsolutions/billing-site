import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import SectionStatsGrid from '../components/SectionStatsGrid'
import { usePageSeo } from '../hooks/useSeo'
import { Building2, ServerCog, BarChart3, ShieldCheck, Layers, Users2, CheckCircle, ArrowRight } from 'lucide-react'

const workflowSteps = [
  { number: '01', title: 'Credentialing', desc: 'Provider enrollment & payer setup', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=520&q=60' },
  { number: '02', title: 'Contracting', desc: 'Payer rate negotiation', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=520&q=60' },
  { number: '03', title: 'Patient Intake', desc: 'Registration & documentation', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=520&q=60' },
  { number: '04', title: 'Documentation', desc: 'Clinical record completion', image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=520&q=60' },
  { number: '05', title: 'Coding', desc: 'Medical coding & review', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=520&q=60' },
  { number: '06', title: 'Claim Submission', desc: 'Electronic claim filing', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=520&q=60' },
  { number: '07', title: 'Payment Posting', desc: 'ERA/EOB processing', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=520&q=60' },
  { number: '08', title: 'AR Follow-up', desc: 'Aging receivables recovery', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=520&q=60' },
  { number: '09', title: 'Denial Management', desc: 'Appeals & corrections', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=520&q=60' },
  { number: '10', title: 'Reporting', desc: 'Analytics & optimization', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=520&q=60' },
]

const capabilities = [
  { icon: Building2, title: 'Multi-Site Billing Ops', desc: 'MBX Solutions delivers unified billing across multiple facilities and locations — one dashboard, one team, consistent results.' },
  { icon: ServerCog, title: 'Full-Service RCM', desc: 'MBX Solutions delivers eligibility, coding, claims, payment posting and AR management as one accountable pipeline.' },
  { icon: Layers, title: 'Scalable Workflows', desc: 'MBX Solutions\' dedicated teams scale with your claim volume — peak seasons and growth handled without strain.' },
  { icon: BarChart3, title: 'Advanced Reporting', desc: 'MBX Solutions provides executive dashboards, KPI tracking and payer analytics that give leadership visibility at every level.' },
  { icon: Users2, title: 'Dedicated Account Team', desc: 'With MBX Solutions, you get a named billing manager and support pod that knows your operation, your payers and your targets.' },
  { icon: ShieldCheck, title: 'Compliance & Security', desc: 'MBX Solutions bakes enterprise-grade HIPAA compliance, audits and data protection into every workflow.' },
]

const stats = [
  { number: '500+', label: 'Claims Processed Daily' },
  { number: '99%', label: 'First-Pass Clean Claims' },
  { number: '30%', label: 'Average Reduction in Denials' },
  { number: '24/7', label: 'Expert Billing Support' },
]

export default function LargeProject() {
  usePageSeo('/projects/large')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-[#C7E7F8]/65 blur-[130px]" />
          <div className="absolute top-10 left-1/4 h-[320px] w-[320px] rounded-full bg-[#DDF1FC]/80 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 select-none pointer-events-none">
            <span className="text-[14vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">LARGE PRACTICE</span>
          </div>
        </div>
        <div className="container mx-auto relative z-10 pt-44 md:pt-48 lg:pt-44 pb-16 lg:pb-24">
          <AnimatedSection>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal"
            >
              <Building2 size={13} /> Large Practice
            </motion.span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Enterprise-Grade Revenue Cycle for <span className="text-mbx-teal">Growing Agencies</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              A complete, scalable RCM partnership from MBX Solutions for large home health, hospice and multi-site
              organizations that need volume, certainty and leadership-grade reporting.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Talk to Our Team</PrimaryButton>
              <Link to="/rcm-services" className="inline-flex items-center gap-2 rounded-xl border-2 border-mbx-teal/30 px-6 py-3.5 text-sm font-bold text-mbx-navy transition-all hover:border-mbx-teal hover:bg-mbx-teal/5">
                See RCM Services <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-mbx-navy">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-10 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-[#29ABE2] mb-2">{s.number}</p>
                <p className="text-[13px] text-white/60 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Large Practice Scope"
              title="Built to Handle Serious Volume"
              subtitle="The larger the operation, the more a disconnected billing stack costs you. MBX Solutions replaces it with one accountable engine."
            />
          </AnimatedSection>
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-mbx-border bg-mbx-surface p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/30 hover:-translate-y-1">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-500 group-hover:bg-mbx-teal group-hover:text-white">
                    <item.icon size={26} />
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-mbx-text-muted">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Included */}
      <section className="py-16 lg:py-20 bg-atmos relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            <div className="flex-1">
              <AnimatedSection>
                <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">The Large Practice Promise</span>
                <h2 className="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight text-mbx-navy leading-[1.1]">
                  Accountability at Every Scale
                </h2>
                <p className="text-lg leading-relaxed text-mbx-text-muted max-w-xl">
                  From onboarding to daily claims flow, every MBX Solutions large practice gets clear SLAs, named
                  points of contact and reporting leadership can actually act on.
                </p>
              </AnimatedSection>
            </div>
            <div className="flex-1">
              <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Signed SLAs & KPIs', 'Dedicated account manager', 'Daily claim submission', 'Dashboard access for leadership', 'Quarterly strategy reviews', 'Priority escalation support'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white border border-mbx-border px-4 py-3.5 shadow-sm">
                    <CheckCircle size={18} className="shrink-0 text-mbx-teal" />
                    <span className="text-sm font-semibold text-mbx-navy">{item}</span>
                  </div>
                ))}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Cycle Section — with images */}
      <section className="relative overflow-hidden bg-atmos-soft py-28 lg:py-36">
        <div className="absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-50" />
          <div className="absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-mbx-teal/30 to-transparent" />
          <div className="pointer-events-none absolute -top-24 right-0 size-[420px] rounded-full bg-[#4486BF]/10 blur-[160px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-[360px] rounded-full bg-[#C7E7F8]/60 blur-[150px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-[0.15em] uppercase text-mbx-teal">
                The Revenue Cycle
              </span>
              <h2 className="mt-6 mb-6 text-3xl font-extrabold leading-tight tracking-tight text-mbx-navy md:text-4xl lg:text-5xl">
                Every Step Connected.
              </h2>
              <p className="text-lg text-mbx-text-muted">
                From credentialing to reporting, MBX Solutions supports every stage of the healthcare revenue cycle.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="group h-full"
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-mbx-border bg-white shadow-[0_2px_16px_rgba(11,35,72,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#4486BF]/40 hover:shadow-xl hover:shadow-[#4486BF]/10">
                    <div className="relative h-28 overflow-hidden sm:h-32">
                      <img
                        src={step.image}
                        alt={`${step.title} — healthcare revenue cycle`}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2348]/55 via-[#0B2348]/15 to-transparent" />
                      <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-lg bg-white/90 text-xs font-extrabold text-[#4486BF] shadow-sm backdrop-blur-sm">
                        {step.number}
                      </span>
                      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#4486BF] to-[#5A9AD0] transition-all duration-500 group-hover:w-full" />
                    </div>

                    <div className="flex flex-1 flex-col items-center p-5 text-center">
                      <h3 className="text-sm font-extrabold text-mbx-navy transition-colors group-hover:text-[#4486BF]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-mbx-text-muted">{step.desc}</p>
                      <div className="mt-auto flex items-center justify-center gap-1.5 pt-3 text-[10px] font-bold text-mbx-teal">
                        <CheckCircle size={12} />
                        Active
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-mbx-text-muted/70">
                MBX Solutions provides operational support across the entire revenue cycle ecosystem.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <SectionStatsGrid />

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              Let's Discuss Your Large Practice
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Get a free RCM analysis from MBX Solutions for your agency and see what a dedicated billing operation can recover for you.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Claim Free Audit</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}