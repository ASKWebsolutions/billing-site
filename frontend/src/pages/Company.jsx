import { Target, Shield, Users, Heart, CheckCircle, ArrowRight, Award, Building2 } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/useSeo'

const values = [
  { icon: Heart, title: 'Patient-Centered', desc: 'Every MBX Solutions workflow starts with better patient outcomes in mind.' },
  { icon: Target, title: 'Results-Driven', desc: 'MBX Solutions measures success by the tangible improvements we deliver.' },
  { icon: Shield, title: 'Compliance-First', desc: 'HIPAA and regulatory awareness is embedded in everything MBX Solutions does.' },
  { icon: Users, title: 'Client Partnership', desc: 'MBX Solutions works alongside you as an extension of your team.' },
]

const companyLinks = [
  { label: 'About Us', path: '/about', desc: 'Meet the team behind MBX Solutions.' },
  { label: 'Gallery', path: '/gallery', desc: 'Browse photos from MBX Solutions events and community.' },
  { label: 'Testimonials', path: '/testimonials', desc: 'Hear what our clients say about MBX Solutions.' },
  { label: 'HIPAA Compliance', path: '/hipaa', desc: 'MBX Solutions\' commitment to data privacy and security.' },
  { label: 'Contact Us', path: '/connect-us', desc: 'Get in touch with the MBX Solutions team today.' },
]

export default function Company() {
  usePageSeo('/company')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#C7E7F8]/60 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Company
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Healthcare Expertise.<br />
              Revenue Intelligence.<br />
              <span className="text-mbx-teal">Human Support.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              MBX Solutions is a healthcare revenue cycle partner with deep expertise in billing, coding,
              and compliance — supporting organizations that want greater clarity, stronger workflows and
              more time to focus on care.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <div className="relative rounded-2xl bg-[#4486BF] p-10 shadow-2xl">
                <div className="mb-8 flex items-center gap-2">
                  <Building2 size={28} className="text-white/80" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">At a Glance</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '98.5%', label: 'Billing Accuracy' },
                    { value: '35%', label: 'A/R Reduction' },
                    { value: '100%', label: 'HIPAA Compliant' },
                    { value: '24/7', label: 'Client Support' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                      <p className="mt-1 text-sm font-bold text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                  <Award size={18} className="text-white/80 shrink-0" />
                  <p className="text-xs text-white/75">MBX Solutions is trusted by healthcare organizations across the United States</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <SectionHeading
                eyebrow="Who We Are"
                title="A Healthcare RCM Partner"
                subtitle="MBX Solutions specializes in healthcare revenue cycle management with particular expertise in Home Health and Hospice, while also supporting private practices, large groups and other healthcare organizations."
                centered={false}
              />
              <p className="text-base leading-relaxed text-mbx-text-muted">
                We understand that healthcare organizations face unique revenue challenges —
                and MBX Solutions brings deep operational knowledge to every billing, coding, and compliance workflow.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {['Home Health Expertise', 'Hospice Billing Knowledge', 'Private Practice Support', 'Enterprise Operations'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl bg-mbx-surface border border-mbx-border px-4 py-3.5">
                    <CheckCircle size={15} className="shrink-0 text-mbx-teal" />
                    <span className="text-sm font-semibold text-mbx-navy">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Values"
              title="What We Believe"
              subtitle="The principles that guide how MBX Solutions supports healthcare organizations."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group rounded-2xl bg-mbx-white border border-mbx-border p-7 text-center transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/30 hover:-translate-y-1">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-500 group-hover:bg-mbx-teal group-hover:text-white group-hover:shadow-lg group-hover:shadow-mbx-teal/20">
                    <value.icon size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{value.title}</h3>
                  <p className="text-sm text-mbx-text-muted leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Explore Company */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Explore"
              title="More About MBX Solutions"
              subtitle="Learn more about the MBX Solutions team, culture, and commitment to healthcare providers."
            />
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyLinks.map((link, i) => (
              <AnimatedSection key={link.label} delay={i * 0.07}>
                <Link to={link.path} className="group flex h-full items-center gap-4 rounded-2xl border border-mbx-border bg-mbx-surface p-6 transition-all duration-500 hover:shadow-xl hover:border-mbx-teal/40 hover:-translate-y-1">
                  <div className="flex-1">
                    <h3 className="text-base font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{link.label}</h3>
                    <p className="mt-1 text-sm text-mbx-text-muted">{link.desc}</p>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-mbx-teal transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36 bg-atmos-cta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute -bottom-20 left-0 h-[340px] w-[340px] rounded-full bg-[#DDF1FC]/80 blur-[130px]" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-mbx-navy">
              Partner With MBX
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