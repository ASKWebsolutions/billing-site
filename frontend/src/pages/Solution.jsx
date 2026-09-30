import { Layers, FileText, ClipboardCheck, BarChart3, Workflow, UserCheck, CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import PricingPlans from '../components/PricingPlans'
import { usePageSeo } from '../hooks/useSeo'

const pillars = [
  { icon: FileText, title: 'Medical Billing', desc: 'MBX Solutions delivers clean claims, faster payments, zero revenue leakage — full-cycle billing support from charge capture to payment posting.', id: 'billing', color: 'from-mbx-teal/20 to-mbx-teal/5' },
  { icon: ClipboardCheck, title: 'Medical Coding', desc: 'MBX Solutions provides precision ICD-10, CPT and HCPCS coding aligned with clinical documentation for maximum reimbursement.', id: 'coding', color: 'from-blue-500/20 to-blue-500/5' },
  { icon: Workflow, title: 'OASIS & QA', desc: 'MBX Solutions delivers accurate OASIS assessments, scoring optimization, and rigorous chart review for better outcomes.', id: 'oasis', color: 'from-mbx-teal/20 to-mbx-teal/5' },
  { icon: BarChart3, title: 'Reporting & Analytics', desc: 'MBX Solutions delivers clear revenue dashboards and KPI reporting for data-driven decisions.', color: 'from-blue-500/20 to-blue-500/5' },
  { icon: UserCheck, title: 'Credentialing', desc: 'MBX Solutions manages the complete provider enrollment lifecycle — from credentialing to recredentialing and contracting.', id: 'credentialing', color: 'from-mbx-teal/20 to-mbx-teal/5' },
  { icon: Layers, title: 'EDI & EFT', desc: 'MBX Solutions handles seamless electronic claims, ERA/EOB and EFT setup for faster, cleaner payments.', id: 'edi', color: 'from-blue-500/20 to-blue-500/5' },
]

export default function Solution() {
  usePageSeo('/solution')
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
              Solution
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              One Partner, <span className="text-mbx-teal">End-to-End</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Billing, coding, QA, credentialing and reporting — MBX Solutions connects everything into one streamlined solution that eliminates gaps and maximizes revenue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Billing', 'Coding', 'OASIS QA', 'Credentialing', 'Reporting'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full bg-white/70 border border-mbx-teal/15 px-5 py-2.5 text-sm text-mbx-navy">
                  <CheckCircle size={14} className="text-mbx-teal" />
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Solution"
              title="Every Step Connected, Every Claim Optimized"
              subtitle="MBX Solutions combines billing, coding, OASIS, QA, and credentialing into one workflow — eliminating gaps and improving outcomes across your entire revenue cycle."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {pillars.map((item) => (
              <StaggerItem key={item.title}>
                <div id={item.id} className="group relative rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1 overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative z-10">
                    <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-500 group-hover:bg-mbx-teal group-hover:text-white">
                      <item.icon size={26} />
                    </div>
                    <h3 className="mb-3 text-lg font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-mbx-text-muted">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Pricing */}
      <PricingPlans />

      {/* Framework */}
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

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute -bottom-20 right-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              Build Your Solution With MBX
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Tell MBX Solutions about your practice and we'll design the right revenue cycle solution for you.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Design My Solution</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}