import { motion } from 'framer-motion'
import { PrimaryButton, SecondaryButton, CapabilityCard, SectionHeading } from '../components/UI'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import SectionStatsGrid from '../components/SectionStatsGrid'
import SectionAuditCTA from '../components/SectionAuditCTA'
import { CheckCircle, Zap } from 'lucide-react'

const capabilities = [
  {
    number: 1,
    title: 'Medical Billing & Claims',
    description: 'MBX Solutions provides end-to-end claim entry, scrubbing, submission and resubmission across billing platforms — built to stop denials before they happen.',
    link: '/services#claim-entry',
  },
  {
    number: 2,
    title: 'Medical Coding',
    description: 'MBX Solutions validates ICD-10-CM, CPT and HCPCS coding for accuracy, documentation alignment and compliance, so payers approve the first time.',
    link: '/services#medical-coding',
  },
  {
    number: 3,
    title: 'Credentialing & Enrollment',
    description: 'MBX Solutions handles provider credentialing, payer enrollment, CAQH setup and recredentialing — approvals on time, revenue without gaps.',
    link: '/services#credentialing',
  },
  {
    number: 4,
    title: 'A/R Follow-up & Denial Management',
    description: 'MBX Solutions performs active AR tracking, payer follow-up, denial root-cause analysis and appeals that recover revenue you were quietly losing.',
    link: '/services#ar-followup',
  },
  {
    number: 5,
    title: 'Revenue Cycle Management',
    description: 'MBX Solutions provides one connected RCM engine — from front-end eligibility to payment posting — for predictable, healthier cash flow.',
    link: '/rcm-services',
    featured: true,
  },
  {
    number: 6,
    title: 'EDI, ERA & EFT Setup',
    description: 'MBX Solutions builds seamless electronic workflows, clearinghouse integration and payment automation that remove manual work from your team.',
    link: '/services#edi-eft',
  },
  {
    number: 7,
    title: 'EHR & Practice Management',
    description: 'MBX Solutions brings deep experience across major EHR/PM platforms, so billing runs smoothly with the software you already use.',
    link: '/software',
  },
  {
    number: 8,
    title: 'Speciality Solutions',
    description: 'Home Health, Hospice, Behavioral Health, Physical Therapy, Cardiology and more — coded and billed by MBX Solutions specialists.',
    link: '/services#free-audit',
  },
  {
    number: 9,
    title: 'Analytics & Reporting',
    description: 'MBX Solutions delivers financial dashboards, KPI tracking and revenue trend analysis that turn billing data into smarter decisions.',
    link: '/services#analytics',
  },
]

const included = [
  'First-pass claim acceptance',
  'Denial prevention & recovery',
  'Compliance-first workflows',
  'Transparent reporting',
  'Dedicated billing team',
  'No long-term lock-in',
]

export default function Capabilities() {
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
            <span className="text-[18vw] font-extrabold text-mbx-teal/[0.04] tracking-tighter">CAPABILITIES</span>
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
              <Zap size={13} /> Our Capabilities
            </motion.span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Everything Your Revenue Cycle<br />
              <span className="text-mbx-teal">Needs to Stay Healthy.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              From clean claims and accurate coding to credentialing, collections and analytics —
              MBX Solutions gives healthcare organizations a complete revenue cycle capability stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get Free Audit</PrimaryButton>
              <SecondaryButton to="/services" size="lg">Explore Services</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Do"
              title="Capabilities That Protect Your Revenue"
              subtitle="MBX Solutions is a full-stack revenue cycle team handling the work your practice shouldn't have to — so you can focus on patients, not paperwork."
            />
          </AnimatedSection>
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <StaggerItem key={cap.number}>
                <CapabilityCard {...cap} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Included checklist band */}
      <section className="py-16 lg:py-20 bg-mbx-navy relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-[#4486BF]/10 blur-[120px]" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            <div className="flex-1">
              <AnimatedSection>
                <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal-light">
                  The MBX Standard
                </span>
                <h2 className="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight text-mbx-white leading-[1.1]">
                  Every Engagement Includes This
                </h2>
                <p className="text-lg leading-relaxed text-white/60 max-w-xl">
                  No matter what we handle for you, MBX Solutions runs a disciplined, transparent billing
                  operation that treats your revenue like it's our own.
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

      <SectionAuditCTA />
    </>
  )
}