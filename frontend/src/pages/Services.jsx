import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, ChevronDown, ClipboardCheck, FileText, Activity, Shield, TrendingUp, Users, Zap, Target, BarChart3, Eye, Home, HeartPulse } from 'lucide-react'
import { AnimatedSection } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'

const services = [
  {
    id: 'home-health',
    icon: Home,
    title: 'Home Health Billing',
    tagline: 'Full-cycle billing for home health agencies',
    description: 'At MBX Solutions, we provide end-to-end billing for home health agencies — OASIS-based episode billing, PPS review, claim submission and A/R follow-up tailored to home care requirements.',
    details: ['OASIS & PPS review', 'HHRG optimization', 'Episode billing', 'CWF & U423 checks', 'Claim submission', 'A/R follow-up'],
  },
  {
    id: 'hospice',
    icon: HeartPulse,
    title: 'Hospice Billing',
    tagline: 'Compliant billing for hospice providers',
    description: 'At MBX Solutions, we provide specialized hospice billing covering election periods, level-of-care changes and certification periods — coded and billed accurately, fully compliant.',
    details: ['Election statement tracking', 'Certification period billing', 'Level-of-care changes', 'Continuous home care', 'Revocation processing', 'A/R follow-up'],
  },
  {
    id: 'claim-entry',
    icon: ClipboardCheck,
    title: 'Claim Entry',
    tagline: 'Error-free patient demo & claims entry',
    description: 'With 15+ years of experience, the MBX Solutions billing team delivers error-free patient demo and claims entry in various billing platforms without any delay.',
    details: ['Patient demographic verification', 'Insurance eligibility checks', 'Multi-platform claim entry', 'Error-free data processing', 'Fast turnaround time', 'Quality assurance checks'],
  },
  {
    id: 'claims-scrubbing',
    icon: Eye,
    title: 'Claims Scrubbing & Submission',
    tagline: 'Thoroughly reviewed, accurately coded claims',
    description: 'At MBX Solutions, we ensure every claim is thoroughly reviewed, accurately coded, and submitted on time to minimize denials, reduce rejections, and accelerate reimbursements.',
    details: ['Pre-submission claim scrubbing', 'Coding accuracy verification', ' payer-specific rule checks', 'Electronic claim submission', 'Batch processing optimization', 'Submission tracking'],
  },
  {
    id: 'ar-followup',
    icon: TrendingUp,
    title: 'AR Follow-up',
    tagline: 'Active tracking & collections',
    description: 'The MBX Solutions dedicated team actively tracks unpaid claims, resolves denials, and follows up with payers to improve collections and maximize your revenue cycle performance.',
    details: ['Aging AR analysis', 'Payer follow-up calls', 'Account reconciliation', 'Payment trend tracking', 'Escalation management', 'Collection optimization'],
  },
  {
    id: 'denial-management',
    icon: Shield,
    title: 'Denial Management',
    tagline: 'Resolve denials, recover revenue',
    description: 'At MBX Solutions, we identify, analyze, and resolve denied claims efficiently to reduce revenue loss, improve claim approval rates, and ensure faster payment recovery for your practice.',
    details: ['Denial root cause analysis', 'Appeal letter drafting', 'Corrected claim resubmission', 'Payer communication', 'Denial trend reporting', 'Prevention strategies'],
  },
  {
    id: 'medical-coding',
    icon: FileText,
    title: 'Medical Coding',
    tagline: 'Precision ICD-10 coding',
    description: 'At MBX Solutions, we handle claim rejections promptly by identifying errors, correcting issues, and resubmitting clean claims to ensure faster approvals and consistent revenue flow.',
    details: ['ICD-10-CM coding', 'CPT/HCPCS coding', 'Code validation & audit', 'Documentation alignment', 'Modifier application', 'Coding compliance review'],
  },
  {
    id: 'edi-eft',
    icon: Activity,
    title: 'EDI, ERA & EFT Setup',
    tagline: 'Seamless electronic workflows',
    description: 'At MBX Solutions, we streamline EDI, ERA, and EFT enrollments to ensure faster claim processing, secure electronic payments, and efficient remittance management for your practice.',
    details: ['EDI enrollment setup', 'ERA configuration', 'EFT bank setup', 'Clearinghouse integration', 'Payer connectivity', 'Testing & validation'],
  },
  {
    id: 'credentialing',
    icon: Users,
    title: 'Credentialing & Enrollment',
    tagline: 'Timely approvals, uninterrupted revenue',
    description: 'At MBX Solutions, we manage provider credentialing and payer enrollments efficiently to ensure timely approvals, compliance, and uninterrupted revenue flow for your healthcare practice.',
    details: ['Provider credentialing', 'Payer enrollment', 'CAQH profile setup', 'Recredentialing management', 'Contract negotiation', 'Enrollment tracking'],
  },
  {
    id: 'claim-rejection',
    icon: Zap,
    title: 'Claim Rejection & Resubmission',
    tagline: 'Fix errors, resubmit clean claims',
    description: 'At MBX Solutions, we handle claim rejections promptly by identifying errors, correcting issues, and resubmitting clean claims to ensure faster approvals and consistent revenue flow.',
    details: ['Rejection analysis', 'Error correction', 'Clean claim resubmission', 'Payer-specific fixes', 'Turnaround tracking', 'Revenue recovery'],
  },
  {
    id: 'patient-collections',
    icon: BarChart3,
    title: 'Patient Collections',
    tagline: 'Simplified patient payments',
    description: 'At MBX Solutions, we simplify patient collections by improving payment processes, reducing outstanding balances, and ensuring timely payments while maintaining a positive patient experience.',
    details: ['Patient statement processing', 'Payment plan setup', 'Balance follow-up', 'Collection strategy', 'Patient communication', 'Payment reconciliation'],
  },
  {
    id: 'value-based-care',
    icon: Target,
    title: 'Value-Based Care',
    tagline: 'Quality reporting & optimization',
    description: 'At MBX Solutions, we support value-based care programs by improving quality reporting, performance tracking, and reimbursement optimization to help providers deliver better patient outcomes and financial success.',
    details: ['Quality measure reporting', 'Performance benchmarking', 'HEDIS/CMS support', 'Care coordination', 'Outcome tracking', 'Reimbursement optimization'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Reporting',
    tagline: 'Data-driven decisions',
    description: 'At MBX Solutions, we provide detailed analytics and reporting to track financial performance, identify revenue gaps, and support smarter decisions for stronger practice growth and profitability.',
    details: ['Financial dashboards', 'Revenue trend analysis', 'Payer performance reports', 'KPI tracking', 'Custom report generation', 'Growth forecasting'],
  },
  {
    id: 'free-audit',
    icon: Eye,
    title: 'Free Billing Audit',
    tagline: 'Discover hidden revenue',
    description: 'At MBX Solutions, we provide a free audit on your practice of the last 3 months — even if you\'re with another billing company — and provide you a report on where revenue exists and how much we can improve it.',
    details: ['3-month billing review', 'Revenue leakage analysis', 'Denial pattern assessment', 'Compliance risk check', 'Improvement roadmap', 'ROI projection'],
  },
]

const specialties = [
  { title: 'Internal Medicine', desc: 'MBX Solutions provides comprehensive billing solutions designed to streamline patient care services, improve claim accuracy, and maximize reimbursements for internal medicine practices.' },
  { title: 'Cardiology', desc: 'MBX Solutions provides specialized revenue cycle management for cardiology practices, ensuring accurate coding, faster claims processing, and reduced payment delays.' },
  { title: 'Immunology', desc: 'MBX Solutions provides efficient billing support for immunology services with optimized workflows, accurate documentation, and improved reimbursement outcomes.' },
  { title: 'Pain Management', desc: 'MBX Solutions provides specialized billing for pain management practices with complex multi-procedure coding requirements.' },
  { title: 'Behavioral Health', desc: 'MBX Solutions provides specialized billing for behavioral health organizations, ABA providers, and related healthcare specialties.' },
  { title: 'Private Practice', desc: 'MBX Solutions delivers full-cycle revenue management for independent practices across family medicine, cardiology, PT, and more.' },
]

export default function Services() {
  usePageSeo('/services')
  const [expandedService, setExpandedService] = useState(null)
  const [activeSpecialty, setActiveSpecialty] = useState(0)

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
            <span className="text-[18vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">SERVICES</span>
          </div>
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Our Services
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Smart Billing & Coding Solutions<br />
              <span className="text-mbx-teal">for Home Health and Hospice</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions delivers end-to-end medical billing, credentialing, and revenue cycle management
              solutions that maximize reimbursements, reduce denials, and support the financial
              growth of your healthcare practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get Free Audit</PrimaryButton>
              <Link
                to="/capabilities"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-mbx-teal/30 px-8 py-4 text-base font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal hover:bg-mbx-teal/10 hover:text-[#4486BF]"
              >
                Explore Capabilities
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Offer"
              title="Comprehensive Medical Billing Services"
              subtitle="From claim entry to payment posting, our 15+ years experienced team at MBX Solutions handles every aspect of the revenue cycle with precision and expertise."
            />
          </AnimatedSection>

          {/* Services Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.05}>
                <div
                  id={service.id}
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                  className={`group relative rounded-2xl border p-7 lg:p-8 cursor-pointer transition-all duration-500 h-full overflow-hidden text-center ${
                    expandedService === index
                      ? 'border-mbx-teal/40 bg-[#4486BF] shadow-2xl shadow-[#4486BF]/25'
                      : 'border-mbx-border bg-mbx-white hover:border-mbx-teal/30 hover:shadow-xl hover:-translate-y-1.5'
                  }`}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    expandedService === index
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-mbx-teal/8 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-mbx-teal/5 rounded-full blur-[60px]" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon — centered */}
                    <div className={`mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                      expandedService === index
                        ? 'bg-mbx-teal text-white shadow-xl shadow-mbx-teal/30'
                        : 'bg-mbx-teal/10 text-mbx-teal group-hover:bg-mbx-teal group-hover:text-white group-hover:shadow-xl group-hover:shadow-mbx-teal/25 group-hover:scale-105'
                    }`}>
                      <service.icon size={28} />
                    </div>

                    {/* Number */}
                    <span className={`mb-3 block text-xs font-extrabold tracking-wider transition-colors ${
                      expandedService === index ? 'text-white/90' : 'text-mbx-border group-hover:text-mbx-teal/50'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <h3 className={`mb-2 text-xl font-extrabold transition-colors leading-tight ${
                      expandedService === index ? 'text-white' : 'text-mbx-navy group-hover:text-mbx-teal'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-sm font-medium transition-colors ${
                      expandedService === index ? 'text-white/80' : 'text-mbx-teal/70'
                    }`}>
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className={`mt-4 text-sm leading-relaxed transition-all duration-500 ${
                      expandedService === index ? 'text-white/50' : 'text-mbx-text-muted'
                    }`}>
                      {service.description}
                    </p>

                    {/* Details grid — only when expanded */}
                    <AnimatePresence>
                      {expandedService === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-2">
                              {service.details.map((detail) => (
                                <div key={detail} className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-xs font-semibold text-white border border-white/15">
                                  <CheckCircle size={12} className="shrink-0" />
                                  {detail}
                                </div>
                              ))}
                            </div>
                            <div className="mt-5">
                              <Link
                                to="/connect-us"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#4486BF] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/20"
                              >
                                Get Started <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand indicator */}
                    <div className={`mt-4 flex items-center justify-center gap-2 text-xs font-bold transition-colors ${
                      expandedService === index ? 'text-white' : 'text-mbx-text-muted group-hover:text-mbx-teal'
                    }`}>
                      <span>{expandedService === index ? 'Show less' : 'View details'}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${
                        expandedService === index ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Specialities"
              title="Explore Our Expertise Across Each Speciality"
              subtitle="Our expertise at MBX Solutions spans across multiple medical specialities, delivering customized billing, credentialing, and revenue cycle management solutions tailored to each practice."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="lg:w-2/5 space-y-2">
                  {specialties.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => setActiveSpecialty(i)}
                      className={`w-full text-left rounded-xl px-5 py-4 text-sm font-bold transition-all duration-300 ${
                        activeSpecialty === i
                          ? 'bg-[#4486BF] text-white shadow-lg'
                          : 'bg-mbx-white text-mbx-text-muted border border-mbx-border hover:border-mbx-teal/30 hover:text-mbx-navy'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
                <div className="lg:w-3/5">
                  <div className="rounded-2xl border border-mbx-border bg-mbx-white p-8 lg:p-10 min-h-[200px]">
                    <h3 className="text-2xl font-extrabold text-mbx-navy mb-3">{specialties[activeSpecialty].title}</h3>
                    <p className="text-mbx-text-muted leading-relaxed mb-6">{specialties[activeSpecialty].desc}</p>
                    <Link to="/connect-us" className="inline-flex items-center gap-2 text-sm font-bold text-mbx-teal hover:text-mbx-teal-dark transition-colors">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Billing Process */}
      <section className="py-28 lg:py-36 bg-atmos-soft">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Billing Process"
              title="Streamlined Medical Billing for Maximum Revenue"
              subtitle="MBX Solutions' streamlined medical billing process ensures accuracy, faster reimbursements, and complete revenue cycle management."
            />
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mx-auto max-w-5xl">
            {[
              { number: '01', title: 'Credentialing', desc: 'Provider enrollment & payer setup' },
              { number: '02', title: 'Patient Intake', desc: 'Registration & documentation' },
              { number: '03', title: 'Coding', desc: 'Medical coding & review' },
              { number: '04', title: 'Claim Submission', desc: 'Electronic claim filing' },
              { number: '05', title: 'Payment Posting', desc: 'ERA/EOB processing & AR' },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="rounded-2xl border border-mbx-teal/15 bg-white/70 p-6 text-center transition-all duration-500 hover:border-mbx-teal/35 hover:bg-white/90">
                  <span className="mb-3 block text-3xl font-extrabold text-mbx-teal/40 group-hover:text-mbx-teal transition-colors">
                    {step.number}
                  </span>
                  <h3 className="mb-1 text-sm font-extrabold text-mbx-navy">{step.title}</h3>
                  <p className="text-xs text-mbx-text-muted">{step.desc}</p>
                </div>
              </motion.div>
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

      {/* Free Audit CTA */}
      <section className="py-28 lg:py-36 bg-mbx-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mbx-teal/5 blur-[150px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Free Financial Audit
            </span>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy leading-tight">
              Discover What's Leaving<br />
              <span className="text-mbx-teal">Your Revenue Behind.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              At MBX Solutions, we provide a free audit of your practice for the last 3 months — even if you're with another
              billing company — and show you exactly where revenue exists and how much we can improve.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Free Revenue Leakage Analysis', 'Compliance Risk Assessment', 'Customized ROI Roadmap'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full bg-mbx-surface border border-mbx-border px-5 py-2.5 text-sm font-medium text-mbx-navy">
                  <CheckCircle size={14} className="text-mbx-teal" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Schedule Your Free Audit</PrimaryButton>
              <Link
                to="/capabilities"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-mbx-navy/20 px-8 py-4 text-base font-bold text-mbx-navy transition-all duration-300 hover:bg-mbx-navy hover:text-white hover:border-mbx-navy"
              >
                Explore Capabilities
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
