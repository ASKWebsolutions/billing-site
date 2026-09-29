import { ShieldCheck, Mail, Phone, MapPin, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/Animated'

const SECTIONS = [
  {
    title: 'Scope and Purpose',
    paragraphs: [
      'This Privacy Policy ("Policy") outlines how MBX Solutions, its affiliated companies, subsidiaries, and parent companies collect, use, and disclose information obtained from you through various websites and applications, including www.mbxsol.com (the "Sites").',
      'This Policy also applies to offline interactions such as visiting our offices, attending company events, and interacting with our representatives.',
      'This Policy does not apply to services with separate privacy policies or third-party websites (we are not responsible for their practices).',
      'MBX Solutions processes data on behalf of healthcare providers under applicable agreements, including HIPAA-compliant Business Associate Agreements (BAAs) where required.',
    ],
  },
  {
    title: 'What Services We Provide',
    paragraphs: [
      'MBX Solutions is a U.S.-based company providing medical billing, medical coding, provider credentialing, revenue cycle management (RCM), and healthcare technology solutions.',
      'Our cloud-based solutions support healthcare providers with electronic health records (EHR), patient engagement tools, and billing and revenue optimization.',
    ],
  },
  {
    title: 'What Personal Information We Collect',
    intro: 'When you interact with our services (including SMS), we may collect:',
    bullets: ['Phone number', 'Name (if provided)', 'Message content', 'Opt-in / Opt-out status', 'Message timestamps'],
    after: 'We may also collect name, email, address, IP address and device data, service usage data, employment/professional information, and general geolocation data.',
  },
  {
    title: 'How We Collect Data',
    intro: 'We collect data through:',
    bullets: ['Forms you fill out', 'Customer service interactions', 'Website usage (cookies, tracking tools)', 'Third-party partners', 'Public sources'],
  },
  {
    title: 'How We Use Your Information',
    intro: 'We use your information to:',
    bullets: [
      'Provide and improve services',
      'Respond to inquiries',
      'Deliver support',
      'Send service-related communications',
      'Maintain security and compliance',
    ],
    after: 'We only use your information for purposes you have consented to.',
  },
  {
    title: 'SMS Communication Policy',
    intro: 'We use SMS strictly for work-related communication with clients and internal communication among staff. We do NOT send promotional or marketing messages.',
    example: 'Examples: "Your billing update is available in your portal." · "Reminder: Team meeting tomorrow at 10 AM."',
  },
  {
    title: 'SMS Privacy Disclosure',
    blocks: [
      { label: 'What Information Is Collected', items: ['Phone number', 'Name (if provided)', 'Message content', 'Opt status', 'Date/time'] },
      { label: 'How It Is Used', items: ['Notifications and updates', 'Customer support', 'Managing preferences'] },
      { label: 'Data Sharing', text: 'We DO NOT sell, rent, or share your personal data with any third party.' },
    ],
  },
  {
    title: 'Opt-In and Opt-Out',
    paragraphs: [
      'Users must explicitly opt-in before receiving SMS. You can opt out anytime by replying STOP. You may also reply HELP for assistance. Once opted out, no further messages will be sent unless you opt in again.',
    ],
  },
  {
    title: 'SMS Terms of Service',
    bullets: [
      'By opting into SMS from a web form or other medium, you agree to receive SMS messages from MBX Solutions.',
      'Message frequency may vary.',
      'Message & data rates may apply.',
      'Reply STOP to opt out.',
      'Reply HELP for support.',
      'Privacy Policy: https://mbxsol.com/privacy-policy/',
    ],
  },
  {
    title: 'Communication Channels',
    paragraphs: [
      'We use RingCentral for client communication, internal communication, and callback requests. No marketing messages are sent via this platform.',
    ],
  },
  {
    title: 'Data Security',
    intro: 'We protect your data using:',
    bullets: ['Encryption (in transit & at rest)', 'Access controls', 'Secure HIPAA-compliant systems', 'Regular audits and staff training'],
    after: 'We retain data only as long as legally required.',
  },
  {
    title: 'Cookies and Tracking',
    intro: 'We use cookies and related technologies to improve user experience, analyze website usage, and maintain security. You can manage preferences via browser settings.',
  },
  {
    title: 'Mobile Data Policy',
    paragraphs: [
      'No mobile information will be shared with third parties for marketing. SMS consent data is never shared.',
    ],
  },
  {
    title: 'User Rights (Where Applicable)',
    intro: 'You may have rights to:',
    bullets: ['Access your data', 'Correct inaccuracies', 'Delete your data', 'Opt out of data usage'],
    after: 'To exercise these rights, contact us.',
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      'Our services are not intended for individuals under 18. We do not knowingly collect data from children under 13.',
    ],
  },
  {
    title: 'International Data Use',
    paragraphs: ['Data is processed under U.S. law, regardless of your location.'],
  },
  {
    title: 'Policy Updates',
    paragraphs: ['We may update this Policy at any time. Updates will be posted on www.mbxsol.com.'],
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/65 blur-[140px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-16 md:pt-60 lg:pt-48 lg:pb-24">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-mbx-teal/20 bg-mbx-teal/10 backdrop-blur-sm">
                <ShieldCheck size={38} className="text-mbx-teal" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-mbx-teal">
                <LockKeyhole size={13} strokeWidth={2.6} /> Legal
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-5xl lg:text-6xl">
                Privacy <span className="text-mbx-teal">Policy</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-mbx-text-muted md:text-xl">
                This Privacy Policy explains how MBX Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                collects, uses, and protects personal information. We are committed to protecting your privacy and
                ensuring full transparency in how your information is handled.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Effective Date: April 4, 2026', 'HIPAA-Aware Practices', 'SMS Consent Protected'].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-mbx-teal/15 bg-white/70 px-5 py-2.5 text-sm text-mbx-navy backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-mbx-surface py-16 lg:py-24">
        <div className="container mx-auto px-5 md:px-6 xl:px-8">
          <div className="mx-auto max-w-4xl space-y-12 rounded-3xl border border-mbx-border bg-mbx-white p-6 shadow-sm md:p-10 lg:p-12">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="flex items-center gap-3 text-lg font-extrabold text-mbx-navy md:text-xl">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-mbx-teal" aria-hidden="true" />
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 pl-4 text-sm leading-relaxed text-mbx-text-muted md:text-[15px]">
                  {s.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.intro && <p>{s.intro}</p>}
                  {s.bullets && (
                    <ul className="space-y-1.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-mbx-teal" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && <p>{s.after}</p>}
                  {s.example && (
                    <p className="rounded-xl border border-mbx-border bg-mbx-surface px-4 py-3 text-[13px] italic text-mbx-text-muted">
                      {s.example}
                    </p>
                  )}
                  {s.blocks &&
                    s.blocks.map((b) => (
                      <div key={b.label} className="rounded-xl border border-mbx-border bg-mbx-surface p-4">
                        <p className="text-[13px] font-extrabold text-mbx-navy">{b.label}</p>
                        {b.text && <p className="mt-1 text-[13px]">{b.text}</p>}
                        {b.items && (
                          <ul className="mt-1.5 space-y-1">
                            {b.items.map((it) => (
                              <li key={it} className="flex items-start gap-2.5 text-[13px]">
                                <span className="mt-[8px] size-1.5 shrink-0 rounded-full bg-mbx-teal" aria-hidden="true" />
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-mbx-teal/20 bg-mbx-surface p-6">
              <h2 className="text-lg font-extrabold text-mbx-navy">Contact Us</h2>
              <p className="mt-3 text-sm text-mbx-text-muted">MBX Solutions</p>
              <div className="mt-4 space-y-2.5 text-sm text-mbx-text-muted">
                <p className="flex items-center gap-2.5">
                  <MapPin size={15} className="shrink-0 text-mbx-teal" /> 2209 Keltrip Ct, Silver Spring, MD 20906
                </p>
                <a href="mailto:info@mbxsol.com" className="flex items-center gap-2.5 transition-colors hover:text-mbx-navy">
                  <Mail size={15} className="shrink-0 text-mbx-teal" /> info@mbxsol.com
                </a>
                <a href="tel:+18883706494" className="flex items-center gap-2.5 transition-colors hover:text-mbx-navy">
                  <Phone size={15} className="shrink-0 text-mbx-teal" /> 888-370-6494
                </a>
              </div>
              <p className="mt-5 text-sm text-mbx-text-muted">
                <Link to="/connect-us" className="font-bold text-mbx-teal hover:underline">
                  Contact our team
                </Link>{' '}
                for any privacy-related questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
