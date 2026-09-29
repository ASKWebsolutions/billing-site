import { Stethoscope, CalendarClock, ShieldCheck, FileCheck2, Users, ClipboardList } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'

const specialities = ['Home Health', 'Hospice', 'Behavioral Health', 'Physical Therapy', 'Occupational Therapy', 'Cardiology', 'Internal Medicine', 'Psychiatric', 'Dental']

const services = [
  { icon: ClipboardList, title: 'Patient Intake', desc: 'MBX Solutions provides accurate intake processing and referral management across your network.', id: 'intake' },
  { icon: CalendarClock, title: 'Scheduling', desc: 'MBX Solutions handles appointment coordination and calendar management for your clinical team.', id: 'scheduling' },
  { icon: ShieldCheck, title: 'Insurance Verification', desc: 'MBX Solutions completes eligibility checks and prior authorization before patient visits.', id: 'verification' },
  { icon: FileCheck2, title: 'Documentation Follow-up', desc: 'MBX Solutions tracks incomplete charts and documentation to keep workflows moving.' },
  { icon: Users, title: 'Referral Coordination', desc: 'MBX Solutions coordinates seamlessly between referring providers and your practice.' },
  { icon: Stethoscope, title: 'Back-Office Support', desc: 'MBX Solutions handles administrative tasks, data entry, and operational workflows for you.' },
]

const steps = ['Referral', 'Intake', 'Scheduling', 'Documentation', 'Follow-up', 'Billing']

export default function MedicalAssistant() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Medical Assistant
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Extending Your Team's <span className="text-mbx-teal">Capacity</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions provides dedicated virtual medical assistants who handle the administrative workload —
              so your clinical team can focus on patient care.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="How It Works"
              title="A Seamless Workflow"
              subtitle="From referral to billing, MBX Solutions' assistants keep every step moving forward."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-0">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className="rounded-xl border-2 border-mbx-border bg-white px-6 py-3.5 text-sm font-bold text-mbx-navy shadow-sm transition-all hover:border-mbx-teal hover:shadow-lg hover:text-mbx-teal hover:-translate-y-0.5">
                      {step}
                    </div>
                    {i < steps.length - 1 && <span className="mx-3 text-mbx-teal font-bold hidden sm:block">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Speciality */}
      <section id="specialty" className="py-16 lg:py-20 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Speciality"
              title="Assistants Trained for Your Speciality"
              subtitle="MBX Solutions' virtual medical assistants are trained across the specialities healthcare organizations serve — so terminology, documentation and workflows feel familiar from day one."
            />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3">
              {specialities.map((s) => (
                <span key={s} className="rounded-full border border-mbx-teal/25 bg-mbx-teal/5 px-5 py-2.5 text-sm font-bold text-mbx-teal">
                  {s}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section id="intake" className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Assistants"
              title="What Our Medical Assistants Handle"
              subtitle="Determined by section: intake, scheduling, verification and more — all HIPAA-compliant and reliable with MBX Solutions."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {services.map((item) => (
              <StaggerItem key={item.title}>
                <div id={item.id} className="group h-full rounded-2xl border border-mbx-border bg-mbx-surface p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/30 hover:-translate-y-1">
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

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute -top-20 right-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              Add Capacity Without the Overhead
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-mbx-text-muted">
              Scale your team with MBX Solutions' dedicated virtual medical assistants — flexible, trained, and ready to help.
            </p>
            <PrimaryButton to="/connect-us" size="lg">Get a Virtual Assistant</PrimaryButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}