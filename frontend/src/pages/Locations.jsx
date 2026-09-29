import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, ShieldCheck, Banknote, Clock, CheckCircle, Stethoscope } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading, PrimaryButton } from '../components/UI'
import { LOCATIONS } from '../data/locations'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const bandStats = [
  { icon: ShieldCheck, value: '90%+', label: 'Rate' },
  { icon: Clock, value: '<40d', label: 'Days' },
  { icon: Banknote, value: '97%', label: 'Paid' },
]

const SPECIALTY_OPTIONS = [
  'Hospital / Health system',
  'Mental / Behavioral Health',
  'Physician Group',
  'DME',
  'Urgent Care',
  'Home Health',
  'Other',
]

function ConsultationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', practice: '', specialty: '', specialtyOther: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          agencyName: form.practice,
          specialty: form.specialty === 'Other' ? form.specialtyOther || 'Other' : form.specialty,
          message: 'Free consultation request from the Locations page.',
        }),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', email: '', phone: '', practice: '', specialty: '', specialtyOther: '' })
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError('Failed to send message. Please try again.')
    }
    setSending(false)
  }

  const inputClass = 'w-full rounded-xl border border-mbx-border bg-mbx-surface px-4 py-3 text-sm text-mbx-navy outline-none transition-all focus:border-[#4486BF] focus:ring-2 focus:ring-[#4486BF]/10'

  if (sent) {
    return (
      <div className="rounded-2xl border border-mbx-border bg-white p-10 text-center shadow-2xl shadow-mbx-navy/40">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle size={26} />
        </div>
        <h3 className="mb-2 text-2xl font-extrabold text-mbx-navy">Request Received!</h3>
        <p className="text-mbx-text-muted">Thank you for your interest. Our team will reach out to book your free consultation shortly.</p>
        <button onClick={() => setSent(false)} className="mt-5 text-sm font-bold text-[#4486BF] hover:underline">
          Send another request
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-mbx-border bg-white p-6 shadow-2xl shadow-mbx-navy/40 md:p-8">
      <h3 className="mb-1.5 text-xl font-extrabold text-mbx-navy md:text-2xl">
        Book Your <span className="text-[#4486BF]">Free Consultation</span>
      </h3>
      <p className="mb-6 text-sm text-mbx-text-muted">Fill out the form and the MBX Solutions team will get back to you promptly.</p>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-bold text-mbx-navy">Full Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-mbx-navy">Email *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Your email" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-mbx-navy">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-mbx-navy">Practice Name</label>
          <input type="text" name="practice" value={form.practice} onChange={handleChange} placeholder="Your practice / organization" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-mbx-navy">Speciality</label>
          <select
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Select Speciality</option>
            {SPECIALTY_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {form.specialty === 'Other' && (
            <input
              type="text"
              name="specialtyOther"
              value={form.specialtyOther}
              onChange={handleChange}
              placeholder="Enter Speciality"
              className={`${inputClass} mt-2`}
            />
          )}
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#4486BF] px-8 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Submit'}
          {!sending && <ArrowRight size={16} />}
        </button>
      </form>
    </div>
  )
}

export default function Locations() {
  return (
    <>
      <section className="relative overflow-hidden bg-mbx-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F4E] via-mbx-navy to-mbx-navy-light" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-mbx-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-[#4486BF]/10 blur-3xl" />
        <div className="relative container mx-auto max-w-5xl text-center">
          <AnimatedSection>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal-light">
              <MapPin size={14} />
              States
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-mbx-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              We are committed to delivering exceptional medical billing solutions
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
              From coast to coast, MBX Solutions helps healthcare providers get paid — accurately, quickly, and without the
              administrative headaches. Find your state and let's take your practice's revenue to the next level.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/connect-us" size="lg">Get in Touch</PrimaryButton>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm lg:gap-16">
              <div className="flex items-center gap-8 lg:gap-14">
                {bandStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="flex items-center gap-2 text-3xl font-extrabold text-mbx-teal-light">
                      <stat.icon size={22} className="text-mbx-teal" />
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-mbx-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Locations"
              title="Medical Billing Services in Every State"
              subtitle="We serve healthcare providers in all 50 states. Click on your state to explore MBX Solutions' medical billing, coding, and revenue cycle services."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {LOCATIONS.map((location) => (
              <StaggerItem key={location.slug}>
                <Link
                  to={`/locations/${location.slug}`}
                  className="group relative flex h-44 items-end overflow-hidden rounded-2xl border border-mbx-border bg-mbx-navy transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={location.image}
                    alt={`View of ${location.name}`}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/95 via-mbx-navy/40 to-mbx-navy/10 transition-colors duration-300 group-hover:via-mbx-navy/25" />
                  <div className="relative flex w-full items-center justify-between gap-2 p-5">
                    <p className="text-base font-extrabold text-mbx-white drop-shadow-sm">{location.name}</p>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-mbx-white backdrop-blur-sm transition-all duration-300 group-hover:bg-mbx-teal">
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-mbx-surface">
        <div className="container mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-mbx-teal">
                <Stethoscope size={15} />
                Free Consultation
              </span>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl lg:leading-[1.1]">
                Are you Ready to Book a Free Consultation?
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-mbx-text-muted">
                Whether you're just starting out or already working with another billing company, our experts will review
                your current billing process and show you exactly where revenue is slipping away — at no cost. No strings
                attached, just a clear picture of your practice's revenue health.
              </p>
              <ul className="space-y-4">
                {[
                  'Free 3-month back-date audit of your billing',
                  'Transparent, customized pricing for your practice',
                  'Dedicated assistant manager, available 24/7',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-medium text-mbx-navy">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-mbx-teal/10 text-mbx-teal">
                      <CheckCircle size={14} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <ConsultationForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}