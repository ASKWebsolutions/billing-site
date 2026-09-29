import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ShieldCheck, Award, FileCheck2, BadgeCheck, MapPin, Clock, TrendingUp,
  Stethoscope, Users, Headset, Phone, ArrowRight,
} from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem, CountUp } from '../components/Animated'
import { SectionHeading, PrimaryButton, SecondaryButton } from '../components/UI'
import { FEATURED_LOCATIONS, findLocation } from '../data/locations'

const whyStats = [
  { target: 130, suffix: '+', label: 'Dedicated Assistant Managers', sub: 'Available for direct communication at any time, without the hassle of long hold times.', icon: Headset },
  { target: 95, suffix: '%', label: 'Clients Retention', sub: 'Across US', icon: Users },
  { target: 11, suffix: '+', label: 'Years of Experience', sub: 'Delivering reliable medical billing excellence.', icon: Award },
]

const benefits = [
  { icon: MapPin, label: '3+ Locations', desc: 'Trusted by healthcare providers across the US.' },
  { icon: BadgeCheck, label: 'Free Trial 3 Months', desc: 'Experience our services completely risk-free.' },
  { icon: FileCheck2, label: 'Free Back Date Audit', desc: 'Uncover revenue your practice is currently missing.' },
  { icon: TrendingUp, label: 'Weekly Reporting', desc: 'Full transparency with reports, every single week.' },
  { icon: Users, label: 'Tailored Services', desc: 'Solutions built around your speciality and workflow.' },
]

const partnerSoftwares = [
  { name: 'CureMD', className: 'font-extrabold text-lg tracking-tight', color: '#4472C4' },
  { name: 'Tebra', className: 'font-extrabold text-lg italic tracking-tight', color: '#29ABE2' },
  { name: 'Azalea Health', className: 'font-extrabold text-base tracking-tight lowercase', color: '#0B2F4E' },
  { name: '+ Your Practice of Choice', className: 'font-bold text-[13px] uppercase tracking-[0.12em]', color: '#4486BF' },
]

const services = [
  {
    title: 'Revenue Cycle Management',
    description: 'Streamline your entire revenue process with our end-to-end Revenue Cycle Management services. We handle everything from patient intake and eligibility to claims submission, payment posting, and denial management.',
    link: '/rcm-services',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    title: 'Credentialing Services',
    description: 'Simplify the credentialing process with our expert services, ensuring fast and accurate insurer accreditation. We help providers secure contracts and avoid delays.',
    link: '/services#credentialing',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
  },
  {
    title: 'Prior Authorization Services',
    description: 'Ensure timely patient care with our Prior Authorization services. We manage the submission and approval process efficiently, reducing delays and speeding up patient treatment.',
    link: '/rcm-services',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    title: 'Medical Billing',
    description: 'Maximize collections and reduce administrative workload with our expert billing services. We ensure accurate and timely claims submission for providers, improving cash flow.',
    link: '/services',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
  {
    title: 'Insurance Verification',
    description: 'Get accurate, up-to-date insurance information to prevent claim rejections. Our comprehensive verification services save you time and money, ensuring smooth claim processing.',
    link: '/rcm-services',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  },
  {
    title: 'Medical Coding',
    description: 'Avoid costly errors with accurate medical coding from our certified experts. We specialize in precise coding, ensuring quick and accurate claim submissions for timely reimbursements.',
    link: '/rcm-services#coding',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  },
]

const whyState = [
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'We understand the healthcare landscape and the unique challenges providers face, allowing us to offer tailored solutions that meet your specific needs.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our team is available around the clock to address any concerns or questions you may have about your billing process.',
  },
  {
    icon: TrendingUp,
    title: 'Cost-Effective Solutions',
    description: 'We offer competitive pricing to help healthcare providers save money while maximizing revenue potential.',
  },
]

const industries = [
  'Physicians', 'Dentists', 'Chiropractors',
  'Specialists', 'Hospitals and Clinics', 'Urgent Care Centers', 'Outpatient Facilities',
]

const faqs = [
  { q: 'What is medical billing?', a: 'Medical billing is the process of submitting and following up on claims with health insurance companies to ensure healthcare providers are reimbursed for their services. It involves coding services and diagnoses accurately, submitting claims, and managing payments and denials.' },
  { q: 'Why should I outsource my medical billing?', a: 'Outsourcing medical billing allows you to focus on patient care rather than administrative tasks. With experienced professionals managing your billing, you reduce errors, improve cash flow, and increase efficiency, all while ensuring compliance with regulations.' },
  { q: 'What types of practices do you work with?', a: 'We serve a wide variety of healthcare providers including physicians, dentists, chiropractors, specialists, urgent care centers, outpatient facilities, and more. No matter your medical speciality, we can tailor a solution to meet your needs.' },
  { q: 'How does your billing process work?', a: 'Our billing process begins with data collection and verification, followed by accurate medical coding, submission of claims, payment posting, and reconciliation. We also handle denial management and follow-up procedures to ensure timely payments.' },
  { q: 'Are your services HIPAA-compliant?', a: 'Yes, MBX Solutions is fully committed to maintaining HIPAA compliance and ensuring the security and privacy of your patient data. We follow industry best practices and utilize secure systems to protect sensitive information.' },
  { q: 'How much do your medical billing services cost?', a: 'Our pricing is customized based on the size of your practice and the services you require. We offer competitive pricing designed to be cost-effective while delivering high-quality billing solutions. Contact us for a quote.' },
  { q: 'Can you help with denied claims?', a: 'Yes, we actively monitor denied claims, address discrepancies, and follow up with insurance companies to ensure your claims are reprocessed and paid correctly. Our experienced team works diligently to resolve any issues promptly.' },
  { q: 'How do I get started with your services?', a: 'Getting started is simple! Reach out to us for an initial consultation. We will discuss your practice\'s needs, review your current billing processes, and tailor a solution that fits your requirements. Contact us today to learn more!' },
]

const certifications = [
  { icon: Award, label: 'AAPC Certified' },
  { icon: ShieldCheck, label: 'HIPAA Compliant' },
  { icon: FileCheck2, label: 'AAHAM Member' },
  { icon: BadgeCheck, label: 'ISO 9001 Aligned' },
]

function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="bg-mbx-surface py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.35fr]">
          <AnimatedSection direction="left" className="lg:sticky lg:top-40">
            <SectionHeading
              centered={false}
              eyebrow="FAQ"
              title="Frequently Asked Questions (FAQs)"
              subtitle="Get clear and concise answers about our Medical Billing Services, including how we streamline claim submissions, reduce billing errors, accelerate reimbursements, and improve your practice's cash flow."
            />
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                alt="Healthcare professional supporting MBX Solutions clients"
                className="aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between rounded-2xl bg-mbx-navy/90 px-6 py-4 backdrop-blur-sm">
                <div>
                  <p className="text-2xl font-extrabold text-mbx-teal-light">
                    <CountUp target={24} suffix="/7" />
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">US-Based Support</p>
                </div>
                <p className="max-w-[180px] text-right text-[13px] leading-snug text-white/70">
                  Your dedicated manager is just a text away.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <div className={`rounded-xl border transition-all duration-300 ${
                  open === i ? 'border-mbx-teal/30 bg-mbx-white shadow-md' : 'border-mbx-border bg-mbx-white hover:border-mbx-teal/20'
                }`}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                    aria-expanded={open === i}
                  >
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      open === i ? 'bg-mbx-teal text-white' : 'bg-mbx-surface text-mbx-teal'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex-1 text-sm font-bold transition-colors ${open === i ? 'text-mbx-teal' : 'text-mbx-navy'}`}>
                      {faq.q}
                    </span>
                    <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-mbx-teal' : 'text-mbx-text-muted'}`} />
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-17">
                          <p className="text-sm leading-relaxed text-mbx-text-muted">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Location() {
  const { slug } = useParams()
  const location = findLocation(slug)

  if (!location) {
    return <Navigate to="/locations" replace />
  }

  const state = location.name

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-mbx-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F4E] via-mbx-navy to-mbx-navy-light" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-mbx-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-[#4486BF]/10 blur-3xl" />
        <div className="relative container mx-auto max-w-5xl text-center">
          <AnimatedSection>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal-light">
              <MapPin size={14} />
              {state}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-mbx-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Medical Billing Services in {state}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/60">
              At MBX Solutions, we provide comprehensive and reliable medical billing solutions to healthcare providers in {state}.
              Our team of certified experts specializes in managing the entire billing cycle, ensuring that your practice
              maximizes revenue while minimizing administrative burdens.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Schedule a Free Consultation</PrimaryButton>
              <SecondaryButton to="/connect-us" size="lg" light>Contact Sales</SecondaryButton>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold tracking-wide text-white/70"
                >
                  <cert.icon size={15} className="text-mbx-teal-light" />
                  {cert.label}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 sm:gap-6">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
                alt="MBX Solutions medical billing team"
                className="h-36 w-full rounded-2xl object-cover shadow-lg ring-1 ring-white/10 sm:h-48 lg:h-56"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Provider reviewing patient information"
                className="h-36 w-full rounded-2xl object-cover shadow-lg ring-1 ring-white/10 sm:h-48 lg:h-56 lg:-mt-6"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Healthcare facility"
                className="h-36 w-full rounded-2xl object-cover shadow-lg ring-1 ring-white/10 sm:h-48 lg:h-56"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Choose"
              title="Why Choose MBX Solutions?"
              subtitle={`Choosing MBX Solutions means choosing a local partner who understands the healthcare landscape in ${state}.`}
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-14">
            {whyStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group rounded-2xl border border-mbx-border bg-mbx-white p-8 text-center transition-all duration-500 hover:border-mbx-teal/40 hover:shadow-xl hover:-translate-y-1">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-mbx-teal/10 text-mbx-teal transition-all duration-300 group-hover:bg-mbx-teal group-hover:text-white">
                    <stat.icon size={26} />
                  </div>
                  <p className="text-4xl font-extrabold text-mbx-navy">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-bold text-mbx-navy">{stat.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-mbx-text-muted">{stat.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <AnimatedSection direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
                  alt="MBX Solutions claims processing specialist"
                  className="aspect-[5/4] w-full rounded-3xl object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-5 left-5 flex items-center gap-4 rounded-2xl bg-mbx-navy px-6 py-4 shadow-xl">
                  <p className="text-3xl font-extrabold text-mbx-teal-light">90%+</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Rate</p>
                    <p className="text-sm font-bold text-mbx-white">First-Pass Claims</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="group flex flex-col rounded-2xl border border-mbx-border bg-mbx-surface p-5 transition-all duration-300 hover:border-mbx-teal/40 hover:bg-mbx-white hover:shadow-lg">
                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal transition-colors duration-300 group-hover:bg-mbx-teal group-hover:text-white">
                      <benefit.icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-mbx-navy">{benefit.label}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-mbx-text-muted">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PARTNERS SOFTWARES ── */}
      <section className="py-16 lg:py-20 bg-mbx-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">Partners Softwares</span>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl lg:leading-[1.1]">
                Seamless Integration With Your EMR
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-mbx-text-muted">
                MBX Solutions integrates seamlessly with industry-leading software such as CureMD, Tebra, Azalea Health,
                and any of practice choice, ensuring efficient and secure billing processes for your practice.
              </p>
              <div className="flex flex-wrap gap-3">
                {partnerSoftwares.map((sw) => (
                  <span
                    key={sw.name}
                    className="inline-flex items-center rounded-xl border border-mbx-border bg-mbx-white px-5 py-3 shadow-sm transition-all duration-300 hover:border-mbx-teal/40 hover:shadow-md"
                    style={{ color: sw.color }}
                  >
                    <span className={sw.className}>{sw.name}</span>
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                  alt="MBX Solutions clinical specialist"
                  className="col-span-2 h-64 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Support representative helping a provider"
                  className="h-40 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80"
                  alt="Medical data and documentation"
                  className="h-40 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
            <AnimatedSection direction="left" className="flex-1">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80"
                  alt="Medical billing team at MBX Solutions"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute right-5 bottom-5 rounded-2xl bg-mbx-navy/90 px-6 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-mbx-teal-light">11+</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="flex-1">
              <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">About MBX Solutions</span>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl lg:leading-[1.1]">
                Medical Billing & Coding Services in {state}
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-mbx-text-muted">
                At MBX Solutions, we specialize in providing comprehensive and reliable medical billing solutions to
                healthcare providers in {state}. Our mission is to streamline the medical billing process, reduce errors,
                and optimize cash flow for practices of all sizes. With years of experience and a team of certified
                professionals, we deliver the expertise needed to help your practice thrive.
              </p>
              <PrimaryButton to="/connect-us">Schedule a Free Consultation</PrimaryButton>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 lg:py-28 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Services"
              title={`Our Medical Billing Services in ${state}`}
              subtitle="At MBX Solutions, we offer comprehensive billing and coding solutions designed to streamline your practice's revenue cycle. From accurate coding to timely claim submissions, we specialize in maximizing revenue, improving cash flow, and reducing administrative workload, serving organizations of all sizes from small practices to large hospitals. Let us simplify the billing process so you can focus on patient care."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <StaggerItem key={service.title}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mbx-border bg-mbx-white transition-all duration-500 hover:border-mbx-teal/40 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-xl bg-mbx-teal text-sm font-bold text-mbx-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2.5 text-lg font-extrabold text-mbx-navy transition-colors group-hover:text-mbx-teal">{service.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-mbx-text-muted">{service.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mbx-teal">
                      Learn More
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <AnimatedSection delay={0.15}>
            <div className="mt-12 text-center">
              <SecondaryButton to="/services" size="lg">View All Services</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY {STATE} ── */}
      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr]">
            <AnimatedSection direction="left" className="lg:sticky lg:top-40">
              <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">Local Advantage</span>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl lg:leading-[1.1]">
                Why Medical Billing Services in {state}?
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-mbx-text-muted">
                {`Choosing MBX Solutions means choosing a local partner who understands the healthcare landscape in ${state}.
                We are dedicated to helping ${state}-based medical practices achieve operational efficiency, financial
                stability, and growth. By outsourcing your billing to us, you benefit from:`}
              </p>
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="MBX Solutions team collaborating with a practice"
                  className="aspect-[5/4] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute right-5 bottom-5 left-5 flex items-center gap-4 rounded-2xl bg-mbx-navy/90 px-6 py-4 backdrop-blur-sm">
                  <p className="text-3xl font-extrabold text-mbx-teal-light">95%</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Retention</p>
                    <p className="text-sm font-bold text-mbx-white">Clients That Stay</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <div className="space-y-5">
              {whyState.map((item, idx) => (
                <AnimatedSection key={item.title} delay={idx * 0.1}>
                  <div className="group flex gap-5 rounded-2xl border border-mbx-border bg-mbx-surface p-6 transition-all duration-300 hover:border-mbx-teal/40 hover:bg-mbx-white hover:shadow-lg">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal transition-colors group-hover:bg-mbx-teal group-hover:text-white">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-lg font-bold text-mbx-navy">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-mbx-text-muted">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="py-20 lg:py-28 bg-mbx-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-5 inline-block text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">Industries</span>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl lg:leading-[1.1]">
                Industries We Serve
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-mbx-text-muted">
                {`MBX Solutions proudly serves a wide range of healthcare professionals in ${state} and surrounding areas, including:`}
              </p>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <span key={industry} className="inline-flex items-center gap-2 rounded-full border border-mbx-teal/25 bg-mbx-white px-4 py-2.5 text-sm font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal hover:bg-mbx-teal/5">
                    <Stethoscope size={15} className="text-mbx-teal" />
                    {industry}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-mbx-text-muted">
                No matter your speciality, we can tailor a solution that helps you manage your medical billing efficiently
                and accurately.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80"
                  alt="Modern healthcare facility"
                  className="col-span-2 h-64 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80"
                  alt="Provider treating a patient"
                  className="h-44 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                  alt="Hospital and clinic"
                  className="h-44 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15}>
            <div className="mt-16 overflow-hidden rounded-3xl bg-mbx-navy p-10 text-center md:p-14">
              <h3 className="mb-4 text-2xl font-extrabold text-mbx-white md:text-3xl">Trusted by Leading Healthcare Providers</h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
                We proudly serve a diverse range of healthcare providers and support organizations of all sizes, from
                small practices to large hospitals — delivering reliable billing services that drive efficiency and
                maximize revenue. Our clients trust us to streamline their billing processes so they can focus on
                patient care.
              </p>
              <PrimaryButton to="/connect-us" size="lg">Schedule a Free Consultation</PrimaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── NATIONWIDE ── */}
      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Nationwide"
              title="Medical Billing Services Nationwide"
              subtitle="No matter where your practice is located, MBX Solutions offers reliable and efficient medical billing services nationwide."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
              {FEATURED_LOCATIONS.map((loc) => (
                <span
                  key={loc.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-mbx-border bg-mbx-surface px-5 py-2.5 text-sm font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal/40 hover:bg-mbx-teal/5"
                >
                  + {loc.name}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-mbx-navy to-mbx-navy-light p-8 md:p-14">
              <div className="absolute -top-24 -right-24 size-72 rounded-full bg-mbx-teal/15 blur-3xl" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Dedicated US-based support agent"
                  className="hidden h-48 w-64 rounded-2xl object-cover md:block"
                  loading="lazy"
                />
                <div>
                  <h3 className="mb-4 flex items-center gap-3 text-2xl font-extrabold text-mbx-white md:text-3xl">
                    <Headset className="shrink-0 text-mbx-teal-light" size={30} />
                    US-Based 24/7 Dedicated Support
                  </h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-white/60">
                    At MBX Solutions, our expert US-based support team is available 24/7 to ensure your billing processes
                    run smoothly. With over 130+ dedicated assistant managers, we offer direct communication at any time,
                    eliminating the hassle of long hold times. Whether it's a quick question, troubleshooting, or
                    real-time guidance, your dedicated manager is just a text away.
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-mbx-teal-light">
                    <CountUp target={130} suffix="+" />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Dedicated Managers</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── GET IN TOUCH ── */}
      <section className="relative overflow-hidden bg-mbx-navy py-20 lg:py-28">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mbx-navy/80 via-mbx-navy/60 to-mbx-navy/90" />
        <div className="relative container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-mbx-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Get in Touch with MBX Solutions Today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
              {`If you're looking for reliable, efficient, and expert medical billing services in ${state}, look no
              further than MBX Solutions. Let us help you streamline your billing process, reduce overhead costs, and
              improve your practice's cash flow.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">
                <Phone size={16} />
                Start Your Risk-Free Trial
              </PrimaryButton>
              <SecondaryButton to="/connect-us" size="lg" light>Get Free Audit</SecondaryButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}