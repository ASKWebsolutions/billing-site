import { MonitorSmartphone, BarChart3, Code2, ShieldCheck, Zap, Globe2, CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'

const features = [
  { icon: Zap, title: 'Fast Claim Submission', desc: 'MBX Solutions submits clean, scrubbed claims electronically the same day — reducing rejections and speeding up payments.' },
  { icon: ShieldCheck, title: 'HIPAA-Compliant', desc: 'MBX Solutions encrypts patient data and protects it with strict security protocols at every step of the workflow.' },
  { icon: Code2, title: 'Smart Coding Assistance', desc: 'MBX Solutions provides ICD-10 and CPT coding support that aligns with clinical documentation for maximum reimbursement.' },
  { icon: Globe2, title: 'Payer Connectivity', desc: 'MBX Solutions provides built-in EDI, ERA and EFT integrations with major clearinghouses and payers.' },
]

export default function Software() {
  usePageSeo('/software')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Software
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Technology-Enabled <span className="text-mbx-teal">RCM Software</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions' modern billing software and dashboards bring clarity to your revenue cycle and help your team work faster.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Software Features"
              title="Built for Speed, Accuracy & Transparency"
              subtitle="MBX Solutions software works alongside your existing systems to keep billing accurate, compliant, and on time."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {features.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group relative h-full rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-mbx-teal to-mbx-teal-light transition-all duration-500 group-hover:w-full" />
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

      {/* Dashboard */}
      <section id="dashboard" className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <SectionHeading
                eyebrow="Real-Time Visibility"
                title="RCM Dashboard & Analytics"
                subtitle="MBX Solutions helps you track claims, payments, and denials in one place with clear, real-time reporting."
                centered={false}
              />
              <div className="grid gap-3">
                {[
                  { label: 'Claims Submitted', value: '1,247' },
                  { label: 'Clean Claims Rate', value: '94.2%' },
                  { label: 'Avg Days to Payment', value: '28' },
                ].map((item, i) => (
                  <AnimatedSection key={item.label} delay={0.1 + i * 0.05}>
                    <div className="flex items-center justify-between rounded-xl bg-mbx-white border border-mbx-border px-5 py-3.5">
                      <span className="text-sm text-mbx-text-muted">{item.label}</span>
                      <span className="text-sm font-bold text-mbx-teal">{item.value}</span>
                    </div>
                  </AnimatedSection>
                ))}
                <AnimatedSection delay={0.25}>
                  <div className="rounded-xl bg-mbx-white border border-mbx-border px-5 py-3.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-mbx-text-muted">Revenue Performance</span>
                      <span className="text-xs text-mbx-teal font-bold">+12% this quarter</span>
                    </div>
                    <div className="h-2 rounded-full bg-mbx-border">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-mbx-teal to-mbx-teal-light" />
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              <p className="mt-4 text-xs text-mbx-text-muted">Illustrative data — MBX technology-enabled approach</p>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
                  alt="Revenue analytics dashboard"
                  className="w-full rounded-3xl object-cover shadow-xl shadow-mbx-navy/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-2xl flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal">
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-mbx-navy">Clear Reporting</p>
                    <p className="text-xs text-mbx-text-muted">KPI tracking & custom reports</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Coding Tools */}
      <section id="coding" className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row-reverse">
            <AnimatedSection className="flex-1" direction="right">
              <SectionHeading
                eyebrow="Precision Coding"
                title="Medical Coding Tools"
                subtitle="MBX Solutions coding software focuses on accuracy and compliance, aligned to clinical documentation."
                centered={false}
              />
              <div className="grid gap-3">
                {[
                  'ICD-10, CPT & HCPCS support',
                  'Documentation alignment checks',
                  'Coding audit & QA workflows',
                  'Compliance-first validation',
                ].map((item, i) => (
                  <AnimatedSection key={item} delay={0.1 + i * 0.05}>
                    <div className="flex items-center gap-3 rounded-xl bg-mbx-surface border border-mbx-border px-5 py-3.5">
                      <CheckCircle size={16} className="shrink-0 text-mbx-teal" />
                      <span className="text-sm font-semibold text-mbx-navy">{item}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80"
                alt="Medical coding workstation"
                className="w-full rounded-3xl object-cover shadow-xl shadow-mbx-navy/10"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mbx-surface">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal">
              <MonitorSmartphone size={30} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">See the Software in Action</h2>
            <p className="text-lg text-mbx-text-muted max-w-2xl mx-auto mb-8">
              Talk to our team for a walkthrough of how MBX software can streamline your revenue cycle.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Request a Demo</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}