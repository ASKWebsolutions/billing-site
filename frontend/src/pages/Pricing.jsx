import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, DollarSign, TrendingUp, Building2, Plus, MessageCircleQuestion } from 'lucide-react'
import { AnimatedSection } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import PricingPlans from '../components/PricingPlans'
import { usePageSeo } from '../hooks/useSeo'

const faqs = [
  {
    question: 'How does MBX Solutions pricing work?',
    answer: 'MBX Solutions offers flexible pricing based on your practice size, claim volume, and services required. We have small practice packages starting at $999/month, large practice plans at $2,499/month, and enterprise solutions with custom pricing. Additional services like medical coding, AR follow-up, and credentialing are priced separately based on volume.',
  },
  {
    question: 'Is there a minimum contract period?',
    answer: 'No. MBX Solutions offers month-to-month pricing with no long-term contracts. You can start, pause, or cancel your service at any time without penalty. We believe in earning your business every month through results.',
  },
  {
    question: 'What is included in the basic package?',
    answer: 'Our small practice package includes claim entry & scrubbing, basic medical coding, weekly revenue reports, and HIPAA-compliant workflows — all for $999/month with no minimum volume requirements.',
  },
  {
    question: 'How is medical coding billed?',
    answer: 'Medical coding is billed per encounter at competitive rates starting from $3.50 per encounter. Volume discounts are available for higher volumes. Accurate coding ensures maximum reimbursement and compliance.',
  },
  {
    question: 'Do you offer volume discounts?',
    answer: 'Yes. MBX Solutions offers volume-based pricing discounts for higher claim volumes. Contact us for a customized quote based on your practice volume and specific needs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'MBX Solutions accepts credit card, ACH/bank transfer, and invoiced monthly billing. All payments are processed securely and compliant with healthcare financial regulations.',
  },
]

export default function Pricing() {
  usePageSeo('/pricing')
  const [openFaq, setOpenFaq] = useState(0)

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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
            <span className="text-[18vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">PRICING</span>
          </div>
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Transparent Pricing
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Simple, Honest<br />
              <span className="text-mbx-teal">Pricing for Every Practice</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions offers transparent, affordable pricing that scales with your practice — from solo providers to large healthcare organizations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Plans — same as Solution page */}
      <PricingPlans />

      {/* Framework — same as Solution page */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Framework"
              title="A Structured, End-to-End Approach"
              subtitle="MBX Solutions doesn't just manage billing — we build a structured revenue cycle where every step is compliant and optimized."
            />
          </AnimatedSection>

          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-5">
            {['Documentation', 'Coding', 'Claim', 'Payment', 'Revenue'].map((step, i) => (
              <AnimatedSection key={step} delay={i * 0.08}>
                <div className="group rounded-2xl bg-mbx-white border-2 border-mbx-border px-6 py-10 text-center transition-all duration-500 hover:border-mbx-teal hover:shadow-xl hover:-translate-y-1">
                  <span className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-mbx-teal text-sm font-extrabold text-white">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-base font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{step}</h4>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why MBX Pricing */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why MBX Pricing"
              title="Clear Value, No Hidden Fees"
              subtitle="We believe in transparent pricing so you know exactly what you're paying for — and exactly what you're getting back in revenue."
            />
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection className="flex-1" direction="right">
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'No Setup Fees', desc: 'No hidden setup or onboarding fees — just straightforward monthly pricing.' },
                  { icon: DollarSign, title: 'Pay for Results', desc: 'Our pricing is tied to value delivered. You pay for billing support, not for software licenses you don\'t need.' },
                  { icon: TrendingUp, title: 'Volume Flexibility', desc: 'Adjust your plan as your practice grows. No penalties for scaling up or down.' },
                  { icon: Building2, title: 'Custom Quotes Available', desc: 'Enterprise and large practice needs get custom pricing tailored to your specific operations.' },
                ].map((item, i) => (
                  <AnimatedSection key={item.title} delay={0.1 + i * 0.05}>
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-mbx-navy">{item.title}</h3>
                        <p className="mt-1 text-sm text-mbx-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.2}>
              <div className="rounded-2xl bg-gradient-to-br from-[#4486BF] to-[#2d6a9a] p-8 shadow-2xl shadow-[#4486BF]/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/15 text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white">Performance-Aligned</p>
                    <p className="text-xs text-white/70">Fee based on collections</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/80">
                  MBX Solutions' pricing is designed to align our success with yours. When we recover more revenue for your practice, we earn more — so we're always motivated to maximize your collections.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { value: '98.5%', label: 'Clean Claims Rate' },
                    { value: '30%', label: 'Denial Reduction' },
                    { value: '35%', label: 'A/R Reduction' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/10 px-4 py-3">
                      <p className="text-lg font-extrabold text-mbx-teal-light">{stat.value}</p>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-28 lg:py-36 bg-atmos-soft">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-[#4486BF]/8 blur-[140px]" />
          <div className="absolute bottom-1/4 -right-32 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/60 blur-[130px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* Left — heading + help card */}
            <AnimatedSection className="lg:sticky lg:top-36">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/80 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-mbx-teal">
                FAQ
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-mbx-navy leading-[1.05] md:text-5xl">
                Pricing Questions <span className="text-mbx-teal">Answered</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mbx-text-muted">
                Get clear answers to common questions about MBX Solutions pricing and billing.
              </p>

              <div className="mt-8 rounded-2xl border border-mbx-teal/15 bg-gradient-to-br from-white via-[#F3FAFF] to-[#E4F4FC] p-7 shadow-[0_20px_50px_-20px_rgba(11,35,72,0.25)]">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#4486BF] text-white">
                  <MessageCircleQuestion size={22} />
                </div>
                <h3 className="text-lg font-extrabold text-mbx-navy">Still have questions?</h3>
                <p className="mt-2 text-sm leading-relaxed text-mbx-text-muted">
                  Talk to our billing specialists — we'll walk you through plans and pricing for your practice.
                </p>
                <Link
                  to="/connect-us"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-mbx-teal px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-mbx-teal-dark hover:shadow-lg hover:shadow-mbx-teal/25"
                >
                  Ask a Question <ArrowRight size={15} />
                </Link>
              </div>
            </AnimatedSection>

            {/* Right — accordion cards */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <AnimatedSection key={faq.question} delay={index * 0.06}>
                    <div
                      className={`group rounded-2xl border transition-all duration-400 ${
                        isOpen
                          ? 'border-mbx-teal/40 bg-white shadow-xl shadow-mbx-teal/10'
                          : 'border-mbx-border bg-white/80 hover:border-mbx-teal/30 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-4 px-6 py-5 text-left"
                      >
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition-colors ${
                            isOpen ? 'bg-mbx-teal text-white' : 'bg-mbx-teal/10 text-mbx-teal'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className={`flex-1 text-base font-extrabold leading-snug transition-colors ${
                            isOpen ? 'text-mbx-teal' : 'text-mbx-navy group-hover:text-mbx-teal'
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? 'rotate-45 bg-mbx-teal text-white'
                              : 'bg-mbx-surface text-mbx-text-muted group-hover:bg-mbx-teal/10 group-hover:text-mbx-teal'
                          }`}
                        >
                          <Plus size={16} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-mbx-border/60 mx-6 px-0 py-5 pl-[3.25rem] text-sm leading-relaxed text-mbx-text-muted">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-mbx-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mbx-teal/5 blur-[150px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Get Started Today
            </span>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy leading-tight">
              Ready to Optimize<br />
              <span className="text-mbx-teal">Your Billing Costs?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Get a customized pricing quote from MBX Solutions based on your practice volume and needs. Free consultation, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get Free Quote</PrimaryButton>
              <Link
                to="/projects/small"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-mbx-navy/20 px-8 py-4 text-base font-bold text-mbx-navy transition-all duration-300 hover:bg-mbx-navy hover:text-white hover:border-mbx-navy"
              >
                View Small Practice Plan
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
