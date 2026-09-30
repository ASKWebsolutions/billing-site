import { motion } from 'framer-motion'
import { Building2, ServerCog, BarChart3, ShieldCheck, Layers, Users2, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import SectionStatsGrid from '../components/SectionStatsGrid'
import { usePageSeo } from '../hooks/useSeo'

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