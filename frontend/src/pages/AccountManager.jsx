import { UserCheck, LineChart, CalendarCheck2, FileSearch, Zap, BarChart3, PhoneCall, MessagesSquare, ShieldCheck, Handshake, CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton, SecondaryButton, ProcessStep } from '../components/UI'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/useSeo'

const accountManagerFeatures = [
  { icon: UserCheck, title: 'Single Point of Contact', desc: 'You get one dedicated Account Manager who knows your practice inside-out. No phone tag, no repeating your story to a new person each month.' },
  { icon: LineChart, title: 'Real-Time Transparency', desc: 'Live dashboards showing claim status, denial trends, and AR aging so you always know exactly where your revenue cycle stands.' },
  { icon: CalendarCheck2, title: 'Proactive Revenue Reviews', desc: 'Scheduled monthly and quarterly business reviews where we walk through performance, wins, and action plans together.' },
  { icon: FileSearch, title: 'Hands-On Claim Resolution', desc: 'Your Account Manager personally investigates aged and denied claims and follows each one through to resolution.' },
  { icon: Zap, title: 'Priority Escalation', desc: 'Urgent issues get escalated to senior teams immediately, with clear ownership and response time commitments.' },
  { icon: BarChart3, title: 'Clear KPI Reporting', desc: 'Clean claim rate, days in AR, collection percentage, and more — reported in plain language, not jargon.' },
]

const process = [
  { number: '01', title: 'Onboarding & Setup', description: 'We plug into your current workflow, review your billing gaps, and set your performance baseline in the first two weeks.' },
  { number: '02', title: 'Dedicated Manager Assigned', description: 'You are matched with an experienced Account Manager who becomes your single, accountable point of contact.' },
  { number: '03', title: 'Ongoing Reporting', description: 'You receive clear, regular reports on claims, denials, and collections with proactive recommendations.' },
  { number: '04', title: 'Business Reviews', description: 'We meet monthly and quarterly to review performance, plan adjustments, and keep your revenue cycle improving.' },
]

const commitments = [
  'A named manager who answers within one business day.',
  'Versions you can actually understand, not billing jargon.',
  'Proactive alerts before small issues become big problems.',
  'Your financial data handled with strict HIPAA compliance.',
  'A partner invested in your practice growth, not just your invoices.',
]

export default function AccountManager() {
  usePageSeo('/account-manager')
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
              Account Manager
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              One Dedicated Manager for <span className="text-mbx-teal">Your Whole Revenue Cycle</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              At MBX Solutions, every account gets a named Account Manager who owns your billing, coding, and collections
              experience — so you always know exactly who is looking after your practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get Your Account Manager</PrimaryButton>
              <SecondaryButton to="/services" size="lg">Explore Services</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What You Get"
              title="An Account Manager That Works Like a Partner"
              subtitle="A single, accountable point of contact who proactively manages your revenue cycle and keeps you informed at every step."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {accountManagerFeatures.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-mbx-border bg-white p-8 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-mbx-teal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

      {/* How it works */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <SectionHeading
                eyebrow="How It Works"
                title="From Sign-Up to a Partnered Revenue Cycle"
                subtitle="Getting your dedicated Account Manager at MBX Solutions is simple and fast."
                centered={false}
              />
              {process.map((step, i) => (
                <ProcessStep key={step.number} number={step.number} title={step.title} description={step.description} isLast={i === process.length - 1} />
              ))}
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <div className="rounded-3xl bg-mbx-navy p-10 shadow-2xl">
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/15 text-mbx-teal-light">
                  <Handshake size={26} />
                </div>
                <h3 className="mb-3 text-2xl font-extrabold text-mbx-white">Our Commitment to You</h3>
                <p className="mb-8 text-sm leading-relaxed text-white/60">
                  Here is what every MBX Solutions account promises — no fine print, no exceptions.
                </p>
                <div className="space-y-3.5 mb-8">
                  {commitments.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-mbx-teal-light" />
                      {item}
                    </div>
                  ))}
                </div>
                <PrimaryButton to="/connect-us" className="w-full">Request Your Manager</PrimaryButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Communication band */}
      <section className="py-20 bg-mbx-white border-t border-mbx-border">
        <div className="container mx-auto">
          <div className="rounded-3xl bg-[#4486BF] p-10 lg:p-14 shadow-2xl">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:text-left">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <PhoneCall size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white md:text-3xl">Always a Real Human on the Other End</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                    Call, email, or message your Account Manager directly whenever you need answers about your claims, payments, or reports.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/connect-us"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-mbx-navy transition-all duration-300 hover:bg-mbx-teal-light"
                >
                  <MessagesSquare size={16} /> Start a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mbx-surface border-t border-mbx-border">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <div className="mb-6 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal">
                <ShieldCheck size={30} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">Ready for a Partner in Your Corner?</h2>
            <p className="text-lg text-mbx-text-muted max-w-2xl mx-auto mb-8">
              Get a dedicated Account Manager from MBX Solutions and take control of your revenue cycle today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Book a Free Audit</PrimaryButton>
              <SecondaryButton to="/team" size="lg">Meet Our Team</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}