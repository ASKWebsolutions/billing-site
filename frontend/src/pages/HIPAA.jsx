import { Shield, Quote, CheckCircle, HardHat, LockKeyhole, UserCheck, FileCheck2, Fingerprint, BadgeCheck } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from '../components/Animated'
import { SectionHeading } from '../components/UI'
import { usePageSeo } from '../hooks/useSeo'

const importance = [
  "It increases personal privacy in terms of the healthcare information of the patients.",
  "It prevents discrimination.",
  "It secures the process of sharing confidential health information.",
  "It streamlines different administrative healthcare functions and improves the efficiency of the whole healthcare industry.",
  "It ensures all the covered entities use the same code sets and nationally recognized identifiers.",
  "It requires the covered entities to implement multiple defenses to protect sensitive personal and health information.",
  "It mandates the use of strong passwords, and the providers should have a data backup plan.",
  "It reduces medical errors and further leads to regular auditing of the system.",
]

const certificates = [
  {
    icon: HardHat,
    title: 'What Is OSHA & Its Purpose',
    text: "At MBX Solutions, we recognize that the Occupational Safety and Health Administration, more commonly known by its acronym OSHA, was established by Congress in 1971 following the passage of the Occupational Safety and Health Act of 1970 to ensure safe and healthful working conditions for working men and women; obligating enforcement of the standards developed under the Act; assisting and encouraging states in their efforts to assure safe and healthful working conditions; by providing for research, information, education, and training in the field of occupational safety and health.",
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80',
    tag: 'Workplace Safety',
  },
  {
    icon: LockKeyhole,
    title: 'What Is HIPAA',
    text: "At MBX Solutions, we hold ourselves to the Health Insurance Portability and Accountability Act of 1996 (HIPAA), a federal law that requires the implementation of national standards to protect sensitive patient health information from being disclosed without the patient's consent or knowledge. The US Department of Health and Human Services (HHS) issued the HIPAA Privacy Rule to implement HIPAA requirements. Additionally, a portion of the data covered by the Privacy Rules is safe under the HIPAA Security Rule.",
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    tag: 'Data Privacy',
  },
  {
    icon: UserCheck,
    title: 'HIPAA Privacy Rule',
    text: "At MBX Solutions, we recognize that the Privacy Rule's rules govern how entities subject to the Privacy Rule use and disclose personal health information (also known as \"protected health information\"). \"Covered entities\" refers to these individuals and businesses. Individuals' rights to understand and regulate how their health information is used are similarly protected under the Privacy Rule.",
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    tag: 'Patient Rights',
  },
]

const testimonials = [
  {
    quote: "MBX Solutions' billing software has brought consistency and accuracy to our billing. We've seen a noticeable reduction in claim denials, and payments are processed more efficiently. The software has helped us maintain a steady cash flow without constant administrative headaches.",
    name: 'Dr. Sarah Thompson',
    role: 'Family Medicine',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&q=80',
  },
  {
    quote: "Billing errors and delayed reimbursements were recurring issues for us. Since working with MBX Solutions, our medical RCM solutions have significantly improved claim accuracy, reducing payment delays and ensuring smoother operations.",
    name: 'Dr. Michael Carter',
    role: 'Orthopedic Surgeon',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&q=80',
  },
  {
    quote: "Revenue cycle inefficiencies were affecting our practice's financial health. MBX Solutions' powerful medical billing functionalities have made claim submissions more precise, improved payment timelines, and allowed our staff to focus on patient care rather than billing disputes.",
    name: 'Dr. Emily Richardson',
    role: 'Healthcare Administrator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&q=80',
  },
]

export default function HIPAA() {
  usePageSeo('/hipaa')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
              <div className="flex-1">
                <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-mbx-teal/10 border border-mbx-teal/20 backdrop-blur-sm">
                  <Shield size={40} className="text-mbx-teal" />
                </div>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
                  HIPAA Compliance
                </span>
                <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
                  Protecting Patient <span className="text-mbx-teal">Health Information</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
                  MBX Solutions is committed to maintaining the highest standards of HIPAA compliance to protect patient health information.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {['PHI Protected', 'Security Trained Staff', 'Audited Workflows'].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-full bg-white/70 border border-mbx-teal/15 px-5 py-2.5 text-sm text-mbx-navy backdrop-blur-sm">
                      <CheckCircle size={14} className="text-mbx-teal" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatedSection className="flex-1" direction="left" delay={0.2}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=900&q=80"
                    alt="Healthcare professional reviewing medical records"
                    className="w-full rounded-3xl border border-mbx-teal/20 object-cover shadow-2xl shadow-[#4486BF]/20"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal">
                        <BadgeCheck size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-mbx-navy">100% HIPAA Compliant</p>
                        <p className="text-xs text-mbx-text-muted">All operational processes</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 rounded-2xl bg-[#4486BF] p-4 shadow-2xl border border-white/15">
                    <div className="flex items-center gap-2 text-white">
                      <Fingerprint size={20} className="text-white/80" />
                      <span className="text-sm font-bold">Data Secured</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HIPAA Compliance Statement */}
      <section className="py-28 lg:py-36 bg-mbx-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80"
                alt="Medical team collaborating on patient care"
                className="w-full rounded-3xl object-cover shadow-xl shadow-mbx-navy/10"
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <SectionHeading
                eyebrow="HIPAA Compliance"
                title="Our Commitment to Compliance"
                subtitle="As a reputable Medical Billing Service provider, MBX Solutions acknowledges and maintains that any provisions and regulations under HIPAA, OSHA, or any state legislation in the United States regarding any personal/private data, whether it is about the privacy and security of the health record or the financials of any individual or group, are followed and maintained by the operational processes."
                centered={false}
              />
              <div className="rounded-2xl border-l-4 border-mbx-teal bg-mbx-surface p-7">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal">
                    <FileCheck2 size={20} />
                  </div>
                  <p className="text-sm leading-relaxed text-mbx-text-muted">
                    MBX Solutions follows the patient information privacy and security rules very stringently. All members of our billing and coding consortium, transcription teams, as well as our workforce and business affiliates comply with HIPAA regulations and the MBX Solutions HIPAA policies. Any team member who deals closely with patient health information is provided training about the privacy and security procedures to handle patient health data. Moreover, this information is disclosed to no one except our clients, authorized to receive this information and employees working on the client's account.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MBX Solutions HBMA Certificates */}
      <section className="py-28 lg:py-36 bg-mbx-surface">
        <div className="container mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Certifications"
              title="MBX Solutions HBMA Certificates"
              subtitle="MBX Solutions follows the standards and regulations that guide how we protect sensitive health information."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {certificates.map((card) => (
              <StaggerItem key={card.title}>
                <div className="group h-full overflow-hidden rounded-2xl border border-mbx-border bg-mbx-white transition-all duration-500 hover:shadow-2xl hover:border-mbx-teal/30 hover:-translate-y-2 flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-mbx-navy backdrop-blur-sm">
                      {card.tag}
                    </span>
                    <div className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-xl bg-mbx-teal text-white shadow-lg shadow-mbx-teal/30">
                      <card.icon size={22} />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-7">
                    <h3 className="mb-3 text-xl font-extrabold text-mbx-navy group-hover:text-mbx-teal transition-colors">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-mbx-text-muted">{card.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Importance of HIPAA */}
      <section className="py-28 lg:py-36 bg-mbx-white relative overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-mbx-teal/5 blur-[150px]" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <AnimatedSection className="flex-1" direction="right">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80"
                alt="Secure healthcare data protection"
                className="w-full rounded-3xl object-cover shadow-xl shadow-mbx-navy/10"
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection className="flex-1" delay={0.15}>
              <SectionHeading
                eyebrow="Why It Matters"
                title="Importance Of HIPAA"
                subtitle="MBX Solutions recognizes that HIPAA is incredibly important for improving the privacy of healthcare details. Apart from these, the major implications of HIPAA are as follows:"
                centered={false}
              />
              <div className="grid gap-3">
                {importance.map((item, i) => (
                  <AnimatedSection key={i} delay={0.1 + i * 0.04}>
                    <div className="flex items-start gap-3 rounded-xl border border-mbx-border bg-mbx-surface px-5 py-3.5 transition-all hover:border-mbx-teal/40 hover:shadow-sm">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-mbx-teal" />
                      <span className="text-sm leading-relaxed text-mbx-text-muted">{item}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 lg:py-36 bg-atmos-soft relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-[#4486BF]/10 blur-[200px]" />
        <div className="absolute -top-20 right-0 size-[380px] rounded-full bg-[#C7E7F8]/60 blur-[140px]" />
        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Client Feedback"
              title="The Most Reliable Revenue Cycle Management (RCM) Experts"
              subtitle="Real feedback from healthcare professionals who trust MBX Solutions for their revenue cycle management."
            />
          </AnimatedSection>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="group relative h-full rounded-2xl border border-mbx-teal/15 bg-white/70 p-8 transition-all duration-500 hover:bg-white/90 hover:border-mbx-teal/30 hover:-translate-y-2 overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-mbx-teal to-mbx-teal-light transition-all duration-500 group-hover:w-full" />
                  <div className="absolute top-6 right-6 text-6xl text-mbx-teal/15 font-serif leading-none select-none">&ldquo;</div>
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal">
                    <Quote size={22} />
                  </div>
                  <p className="text-sm leading-relaxed text-mbx-text-muted mb-8">&ldquo;{t.quote}&rdquo;</p>
                  <div className="border-t border-mbx-teal/15 pt-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="size-12 rounded-full object-cover border-2 border-mbx-teal/30 transition-colors group-hover:border-mbx-teal"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-base font-extrabold text-mbx-navy">{t.name}</p>
                        <p className="text-sm text-mbx-teal font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-mbx-white border-t border-mbx-border">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">
              Trust MBX Solutions With Your Patient Data
            </h2>
            <p className="text-lg text-mbx-text-muted max-w-2xl mx-auto mb-8">
              MBX Solutions provides secure, compliant, and reliable revenue cycle management built around the protection of sensitive health information.
            </p>
            <a href="/connect-us" className="inline-flex items-center gap-2.5 rounded-xl bg-[#4486BF] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#3a73a8] hover:shadow-lg hover:shadow-[#4486BF]/20 hover:-translate-y-0.5">
              Get Started Today
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}