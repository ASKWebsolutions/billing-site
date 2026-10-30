import { ClipboardCheck, FileText, Shield, TrendingUp, Eye, Activity, CheckCircle, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'

const billingServices = [
  { icon: ClipboardCheck, title: 'Claim Entry & Submission', desc: 'MBX Solutions delivers clean claim entry and electronic submission with thorough verification to minimize rejections and denials.', id: 'claim-entry' },
  { icon: FileText, title: 'Medical Coding', desc: 'Our certified coders ensure accurate ICD-10-CM, CPT and HCPCS coding aligned with your clinical documentation for maximum reimbursement.', id: 'coding' },
  { icon: Shield, title: 'Denial Management', desc: 'We identify, analyze and resolve denied claims efficiently through root-cause analysis, appeals and prevention strategies to recover lost revenue.', id: 'denial' },
  { icon: Eye, title: 'Claims Scrubbing', desc: 'Every claim is thoroughly reviewed before submission with payer-specific rule checks to catch errors early and ensure clean claims.', id: 'scrubbing' },
  { icon: TrendingUp, title: 'AR Follow-up', desc: 'Our team actively tracks unpaid claims, resolves denials and follows up with payers to improve collections and maximize your revenue cycle performance.', id: 'ar-followup' },
  { icon: Activity, title: 'Payment Posting', desc: 'We handle ERA/EOB processing and payment posting accurately so your accounts stay current and your revenue is tracked in real time.', id: 'payment-posting' },
]

const processSteps = [
  { number: '01', title: 'Credentialing', desc: 'Provider enrollment & payer setup' },
  { number: '02', title: 'Patient Intake', desc: 'Registration & documentation' },
  { number: '03', title: 'Coding', desc: 'Medical coding & review' },
  { number: '04', title: 'Claim Submission', desc: 'Electronic claim filing' },
  { number: '05', title: 'Payment Posting', desc: 'ERA/EOB processing & AR' },
]

const benefits = [
  'First-pass claim acceptance with thorough scrubbing',
  'Denial prevention through proactive error detection',
  'Payer-specific rule checks for accurate submissions',
  'Dedicated billing team with 15+ years of experience',
  'Transparent reporting and real-time revenue visibility',
  'No long-term lock-in contracts',
]

export default function MedicalBilling() {
  usePageSeo('/medical-billing')

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
            <span className="text-[18vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">MEDICAL BILLING</span>
          </div>
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Our Services
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Medical Billing<br />
              <span className="text-mbx-teal">That Gets You Paid</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions provides professional medical billing services that maximize reimbursements,
              reduce denials, and keep your revenue cycle running smoothly — so you can focus on patient care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get Free Audit</PrimaryButton>
              <a
                href="/services"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-mbx-teal/30 px-8 py-4 text-base font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal hover:bg-mbx-teal/10 hover:text-[#4486BF]"
              >
                Explore All Services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Offer"
              title="Complete Medical Billing Solutions"
              subtitle="From claim entry to payment posting, our experienced team handles every aspect of medical billing with precision and care."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {billingServices.map((item) => (
              <StaggerItem key={item.id}>
                <div id={item.id} className="group h-full rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-mbx-teal to-mbx-teal-light transition-all duration-500 group-hover:w-full" />
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-500 group-hover:bg-mbx-teal group-hover:text-white group-hover:shadow-lg group-hover:shadow-mbx-teal/20">
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

      {/* Why Medical Billing Matters */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <SectionHeading
                eyebrow="Why It Matters"
                title="Accurate Billing Means Healthy Revenue"
                subtitle="Medical billing errors cost practices thousands in lost revenue every year. Our team ensures every claim is accurate, complete, and submitted on time."
                centered={false}
              />
              <div className="grid gap-3">
                {benefits.map((item, i) => (
                  <AnimatedSection key={item} delay={0.1 + i * 0.05}>
                    <div className="flex items-center gap-3 rounded-xl border border-mbx-border bg-mbx-white px-5 py-3.5">
                      <CheckCircle size={16} className="shrink-0 text-mbx-teal" />
                      <span className="text-sm font-semibold text-mbx-navy">{item}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80"
                  alt="Medical billing team"
                  className="w-full rounded-3xl object-cover shadow-xl shadow-mbx-navy/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#4486BF] p-5 shadow-2xl flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-white">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white">98% First-Pass Rate</p>
                    <p className="text-xs text-white/75">Clean claims on first submission</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Billing Process */}
      <section className="py-28 lg:py-36 bg-atmos-soft">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Process"
              title="How Medical Billing Works"
              subtitle="A streamlined process that ensures accuracy at every step — from patient registration to final payment."
            />
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mx-auto max-w-5xl">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.1}>
                <div className="group">
                  <div className="rounded-2xl border border-mbx-teal/15 bg-white/70 p-6 text-center transition-all duration-500 hover:border-mbx-teal/35 hover:bg-white/90">
                    <span className="mb-3 block text-3xl font-extrabold text-mbx-teal/40 group-hover:text-mbx-teal transition-colors">
                      {step.number}
                    </span>
                    <h3 className="mb-1 text-sm font-extrabold text-mbx-navy">{step.title}</h3>
                    <p className="text-xs text-mbx-text-muted">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-sm text-mbx-text-muted max-w-3xl mx-auto">
                From credentialing and contracting to claims submission, collections, and payment posting — MBX Solutions helps
                healthcare providers maximize revenue while reducing administrative burden.
              </p>
            </div>
          </AnimatedSection>
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
              Ready to Improve<br />
              <span className="text-mbx-teal">Your Billing Performance?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Let MBX Solutions analyze your current billing processes and show you exactly where you can improve
              collections and reduce denials — at no cost.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Schedule Free Audit</PrimaryButton>
              <a
                href="/services"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-mbx-navy/20 px-8 py-4 text-base font-bold text-mbx-navy transition-all duration-300 hover:bg-mbx-navy hover:text-white hover:border-mbx-navy"
              >
                View All Services
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
