import { motion } from 'framer-motion'
import { FileCheck2, Stethoscope, BadgeCheck, Wallet, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import SectionStatsGrid from '../components/SectionStatsGrid'
import { usePageSeo } from '../hooks/useSeo'

const services = [
  { icon: FileCheck2, title: 'Claim Entry & Scrubbing', desc: 'MBX Solutions performs accurate claim entry, eligibility checks and scrubbing before submission so clean claims leave on the first pass.' },
  { icon: Stethoscope, title: 'Coding & AR Follow-up', desc: 'MBX Solutions handles ICD-10/CPT coding and proactive follow-up that keeps your small practice billing working without extra hires.' },
  { icon: BadgeCheck, title: 'Credentialing & Enrollment', desc: 'MBX Solutions manages provider credentialing and payer enrollment so you get paid without the paperwork delays.' },
]

const included = ['Fixed transparent pricing', 'Dedicated billing specialist', 'Weekly revenue reports', 'HIPAA-compliant workflows', 'No long-term contracts', 'Phone & email support']

export default function SmallProject() {
  usePageSeo('/projects/small')
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
            <span className="text-[14vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">SMALL PRACTICE</span>
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
              <Wallet size={13} /> Small Practice
            </motion.span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Billing Support Built for <span className="text-mbx-teal">Small Practices</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              You handle the patients — MBX Solutions handles the billing. A complete, affordable revenue cycle
              service designed for small clinics, solo providers and home care startups.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Start a Small Practice</PrimaryButton>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border-2 border-mbx-teal/30 px-6 py-3.5 text-sm font-bold text-mbx-navy transition-all hover:border-mbx-teal hover:bg-mbx-teal/5">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What's Included"
              title="Everything a Small Practice Needs"
              subtitle="MBX Solutions offers no bloated contracts or hidden fees — just the billing essentials that keep your revenue healthy."
            />
          </AnimatedSection>
          <StaggerChildren className="grid gap-6 md:grid-cols-3">
            {services.map((item) => (
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
      <section className="py-16 lg:py-20 bg-mbx-navy relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-[#4486BF]/10 blur-[120px]" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            <div className="flex-1">
              <AnimatedSection>
                <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal-light">Simple & Transparent</span>
                <h2 className="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight text-mbx-white leading-[1.1]">
                  Small Practices, Big Expectations
                </h2>
                <p className="text-lg leading-relaxed text-white/60 max-w-xl">
                  MBX Solutions' small practice package is built to fit modest volumes and tight budgets — without
                  sacrificing accuracy, compliance or response time.
                </p>
              </AnimatedSection>
            </div>
            <div className="flex-1">
              <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3.5">
                    <CheckCircle size={18} className="shrink-0 text-mbx-teal-light" />
                    <span className="text-sm font-semibold text-mbx-white">{item}</span>
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
              Ready to Get Your Billing in Order?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Start with a free audit from MBX Solutions and see exactly where your small practice is losing revenue.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Get Free Audit</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}