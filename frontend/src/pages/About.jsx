import { Target, Eye, Heart, Shield, Users, CheckCircle, Award, BadgeCheck, LockKeyhole, HardHat, Stethoscope, FileText, TrendingUp, Zap } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton, SecondaryButton } from '../components/UI'

const stats = [
  { value: '98.5%', label: 'Billing Accuracy' },
  { value: '35%', label: 'A/R Reduction' },
  { value: '100%', label: 'HIPAA Compliant' },
  { value: '24/7', label: 'Client Support' },
]

const pillars = [
  { icon: Target, title: 'Our Mission', text: 'MBX Solutions empowers healthcare providers with accurate, compliant, and transparent Revenue Cycle Management that maximizes financial health and reduces administrative burden.' },
  { icon: Eye, title: 'Our Vision', text: 'MBX Solutions aims to be the most trusted revenue cycle partner for healthcare organizations across the United States — known for clarity, reliability, and results.' },
  { icon: Heart, title: 'Our Values', text: 'Patient-Centered, Results-Driven, Compliance-First, and Client Partnership guide every MBX Solutions workflow, decision, and engagement.' },
]

const approach = [
  { num: '01', title: 'Understand', desc: 'At MBX Solutions, we learn your organization, workflows, and revenue challenges.' },
  { num: '02', title: 'Design', desc: 'At MBX Solutions, we build a tailored support plan aligned with your goals.' },
  { num: '03', title: 'Implement', desc: 'At MBX Solutions, we integrate with your team and technology systems.' },
  { num: '04', title: 'Optimize', desc: 'At MBX Solutions, we continuously monitor and refine for better performance.' },
]

const expertise = [
  { icon: FileText, title: 'Home Health Depth', desc: 'PDGM, OASIS, LUPA — MBX Solutions understands the complexities of home health billing.' },
  { icon: Shield, title: 'Hospice Specialization', desc: 'NOE/NOTR, revenue codes, GIP/respite — MBX Solutions provides hospice-specific expertise.' },
  { icon: Users, title: 'Multi-Speciality Support', desc: 'From private practices to health systems, MBX Solutions scales to your needs.' },
  { icon: Zap, title: 'Technology Integration', desc: 'Modern MBX Solutions workflows that work alongside your existing systems.' },
  { icon: CheckCircle, title: 'Quality Assurance', desc: 'Documentation review, coding accuracy, and claims quality checks.' },
  { icon: TrendingUp, title: 'Operational Excellence', desc: 'Consistent, reliable revenue cycle support you can depend on from MBX Solutions.' },
]

const certificates = [
  { icon: LockKeyhole, title: 'HIPAA Compliant', desc: 'MBX Solutions protects patient information under strict privacy and security policies.' },
  { icon: HardHat, title: 'OSHA Compliant', desc: 'Safe and healthful working conditions maintained across MBX Solutions operations.' },
  { icon: Award, title: 'HBMA Standards', desc: 'MBX Solutions is aligned with the Healthcare Billing & Management Association best practices.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#C7E7F8]/60 blur-[140px]" />
          <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#4486BF]/8 blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              About MBX Solutions
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Healthcare Revenue,<br />
              <span className="text-mbx-teal">Without the Complexity.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions is a healthcare revenue cycle partner with deep expertise in Home Health
              and Hospice — combining billing, coding, OASIS, and QA into one streamlined workflow.
              Greater clarity. Stronger workflows. More time to focus on care.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Start a Conversation</PrimaryButton>
              <SecondaryButton to="/services#free-audit" size="lg">Get a Free Audit</SecondaryButton>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <StaggerChildren className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.08}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-mbx-teal/20 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-mbx-teal/40 hover:bg-white/90">
                  <p className="text-3xl font-extrabold text-mbx-teal lg:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-mbx-text-muted">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Purpose"
              title="What Drives Us at MBX Solutions"
              subtitle="The principles that guide how MBX Solutions supports healthcare organizations."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-5 md:grid-cols-3" stagger={0.1}>
            {pillars.map((pillar, i) => (
              <StaggerItem key={pillar.title}>
                <div className={`h-full rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  i === 0
                    ? 'bg-[#4486BF] text-white shadow-xl shadow-[#4486BF]/25'
                    : 'border border-mbx-border bg-mbx-surface'
                }`}>
                  <div className={`mb-6 flex size-14 items-center justify-center rounded-2xl ${
                    i === 0 ? 'bg-mbx-teal/20 text-mbx-teal-light' : 'bg-mbx-teal/10 text-mbx-teal'
                  }`}>
                    <pillar.icon size={26} />
                  </div>
                  <h3 className={`mb-3 text-xl font-extrabold ${i === 0 ? 'text-white' : 'text-mbx-navy'}`}>{pillar.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === 0 ? 'text-white/60' : 'text-mbx-text-muted'}`}>{pillar.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1">
              <SectionHeading
                eyebrow="Who We Are"
                title="A Healthcare RCM Partner, Not Just a Vendor"
                subtitle="MBX Solutions specializes in healthcare revenue cycle management with particular expertise in Home Health and Hospice, while also supporting private practices, large groups and other healthcare organizations. We understand the unique revenue challenges you face — and our team brings deep operational knowledge to every billing, coding, and compliance workflow."
                centered={false}
              />
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Home Health Expertise',
                  'Hospice Billing Knowledge',
                  'Private Practice Support',
                  'Enterprise Operations',
                  'Technology-Enabled',
                  'Quality-Focused',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-mbx-border bg-mbx-white px-5 py-4 transition-all hover:border-mbx-teal/40 hover:shadow-sm">
                    <CheckCircle size={16} className="shrink-0 text-mbx-teal" />
                    <span className="text-sm font-semibold text-mbx-navy">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-28 lg:py-36 bg-atmos-soft relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/10 blur-[200px]" />
        <div className="absolute top-0 right-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/60 blur-[140px]" />
        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Approach"
              title="A Structured Path to Your Revenue Goals"
              subtitle="A structured approach from MBX Solutions to understanding and supporting your revenue cycle."
            />
          </AnimatedSection>

          <StaggerChildren className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {approach.map((step) => (
              <StaggerItem key={step.num}>
                <div className="group h-full rounded-2xl bg-white/70 border border-mbx-teal/15 p-7 transition-all duration-500 hover:bg-white/90 hover:border-mbx-teal/30 hover:-translate-y-1">
                  <span className="text-4xl font-extrabold text-mbx-teal/40 group-hover:text-mbx-teal transition-colors">{step.num}</span>
                  <h3 className="mt-5 text-lg font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mbx-text-muted">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Expertise"
              title="What Sets MBX Apart"
              subtitle="Deep healthcare revenue cycle knowledge combined with modern technology-enabled workflows at MBX Solutions."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {expertise.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-mbx-border bg-mbx-surface p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/30 hover:-translate-y-1">
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

      {/* Certified Team & Compliance */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1">
              <SectionHeading
                eyebrow="Certified Team & Compliance"
                title="Certified Experts Behind Every Claim"
                subtitle="15+ years of experience, CPC certified coders, experienced billing specialists, and personalized service teams at MBX Solutions — dedicated to your revenue performance and protected by compliance-first workflows."
                centered={false}
              />
              <div className="mt-8 flex flex-wrap gap-2.5">
                {['CPC Certified Coders', 'RCM Specialists', 'OASIS Experts', 'Credentialing Team', 'QA Analysts', 'Dedicated Support'].map((role) => (
                  <span key={role} className="inline-flex items-center gap-2 rounded-full border border-mbx-border bg-mbx-white px-4 py-2 text-xs font-semibold text-mbx-navy transition-all hover:border-mbx-teal hover:text-mbx-teal">
                    <BadgeCheck size={13} className="text-mbx-teal" />
                    {role}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.title} className="flex items-start gap-5 rounded-2xl border border-mbx-border bg-mbx-white p-7 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/30 hover:-translate-y-1">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal">
                      <cert.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-mbx-navy">{cert.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-mbx-text-muted">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute -top-20 right-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <Stethoscope size={34} className="mx-auto text-mbx-teal" />
            <h2 className="mt-6 mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              Partner With MBX Solutions
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Discover how MBX Solutions can support your organization's revenue cycle.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Start a Conversation</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}