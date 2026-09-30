import { FileText, BookOpen, Shield, BarChart3, Download, CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton, SecondaryButton } from '../components/UI'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/useSeo'

const resources = [
  { icon: FileText, title: 'Free Billing Audit', desc: 'Get a free revenue leakage analysis from MBX Solutions and identify untapped revenue opportunities for your practice.', path: '/services#free-audit', color: 'from-mbx-teal/20 to-mbx-teal/5' },
  { icon: BookOpen, title: 'Service Guides', desc: 'Understand MBX Solutions\' billing, coding, and revenue cycle services in plain language.', path: '/services', color: 'from-blue-500/20 to-blue-500/5' },
  { icon: Shield, title: 'Compliance Center', desc: 'Learn about HIPAA and how MBX Solutions protects sensitive patient health information.', path: '/hipaa', color: 'from-mbx-teal/20 to-mbx-teal/5' },
  { icon: BarChart3, title: 'RCM Insights', desc: 'Explore how modern revenue cycle management at MBX Solutions improves cash flow and reduces denials.', path: '/rcm-services', color: 'from-blue-500/20 to-blue-500/5' },
]

const quickFacts = [
  'Revenue cycle explained: from claim to payment.',
  'How clean claims affect your bottom line.',
  'OSHA and HIPAA: what they mean for your practice.',
  'Credentialing timelines and how to speed them up.',
  'Denial management: root causes and fixes.',
  'Why accurate medical coding matters.',
]

export default function Resources() {
  usePageSeo('/resources')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Resources
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Helpful Resources & <span className="text-mbx-teal">Knowledge Center</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Guides, tools, and insights from MBX Solutions to help your practice improve billing accuracy, reduce denials,
              and stay compliant.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Explore Resources"
              title="Everything You Need to Grow"
              subtitle="Practical tools and information from MBX Solutions for healthcare providers and revenue teams."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {resources.map((item) => (
              <StaggerItem key={item.title}>
                <Link to={item.path} className="group relative flex h-full flex-col rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative z-10">
                    <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-500 group-hover:bg-mbx-teal group-hover:text-white">
                      <item.icon size={26} />
                    </div>
                    <h3 className="mb-3 text-lg font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-mbx-text-muted">{item.desc}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <SectionHeading
                eyebrow="Quick Facts"
                title="RCM Made Simple"
                subtitle="Key topics we cover with our clients every day at MBX Solutions — simplified so you can make confident decisions."
                centered={false}
              />
              <div className="grid gap-3">
                {quickFacts.map((fact, i) => (
                  <AnimatedSection key={fact} delay={0.1 + i * 0.05}>
                    <div className="flex items-start gap-3 rounded-xl border border-mbx-border bg-mbx-white px-5 py-3.5 transition-all hover:border-mbx-teal/40 hover:shadow-sm">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-mbx-teal" />
                      <span className="text-sm leading-relaxed text-mbx-text-muted">{fact}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="rounded-3xl bg-[#4486BF] p-10 shadow-2xl">
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Download size={26} />
                </div>
                <h3 className="mb-3 text-2xl font-extrabold text-white">Free Revenue Audit Checklist</h3>
                <p className="mb-8 text-sm leading-relaxed text-white/85">
                  Download our simple MBX Solutions checklist to spot revenue leakage in your current billing process before you ever pay for an audit.
                </p>
                <div className="space-y-2 mb-8">
                  {['Claim quality review', 'Denial trend check', 'Aging AR analysis', 'Coding accuracy scan'].map((step) => (
                    <div key={step} className="flex items-center gap-2.5 text-sm text-white/85">
                      <CheckCircle size={14} className="text-white/80" />
                      {step}
                    </div>
                  ))}
                </div>
                <PrimaryButton to="/connect-us" className="w-full">Get the Checklist</PrimaryButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mbx-white border-t border-mbx-border">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">Still Have Questions?</h2>
            <p className="text-lg text-mbx-text-muted max-w-2xl mx-auto mb-8">
              The MBX Solutions team is here to help you understand the revenue cycle and find the right support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Talk to an Expert</PrimaryButton>
              <SecondaryButton to="/services" size="lg">Explore Services</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}