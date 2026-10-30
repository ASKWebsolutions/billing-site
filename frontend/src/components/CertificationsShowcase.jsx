import { FileBadge2, ShieldCheck, Award, BadgeCheck } from 'lucide-react'
import { StaggerChildren, StaggerItem } from './Animated'

/* Proof image served from /public */
export const CERTIFICATIONS_IMG = '/certifications-proof.jpeg'

const certifications = [
  {
    icon: Award,
    short: 'AAPC',
    full: 'American Academy of Professional Coders',
    title: 'Certified Medical Coding',
    description:
      'AAPC is the largest professional body for medical coding in the United States. Our coding staff carries AAPC certification (CPC-track), which validates expert-level command of CPT, ICD-10 and HCPCS coding — including PDGM primary-diagnosis sequencing for home health. Certified coders mean fewer RTPs, fewer PTP bundling denials and cleaner first-pass claims.',
  },
  {
    icon: ShieldCheck,
    short: 'HIPAA',
    full: 'Health Insurance Portability & Accountability Act',
    title: 'Full PHI Safeguards',
    description:
      'Every claim, attachment and eligibility file we touch contains Protected Health Information (PHI). Our HIPAA-compliant operation is built on signed Business Associate Agreements (BAA), role-based access controls, encrypted workstations, secure clearinghouse transmissions and ongoing staff privacy training — so patient data never leaves a protected environment.',
  },
  {
    icon: FileBadge2,
    short: 'AAHAM',
    full: 'American Association of Healthcare Administrative Management',
    title: 'RCM Best Practices',
    description:
      'AAHAM certification covers the revenue-cycle disciplines that decide whether your aged claims get paid: eligibility and registration, charge capture, claim editing, payment posting, denial management and appeals. It keeps our A/R recovery unit aligned with payer and CMS workflows — the exact protocols we use to overturn eligibility, prior-auth and ADR denials.',
  },
  {
    icon: BadgeCheck,
    short: 'ISO 9001:2015',
    full: 'International Organization for Standardization',
    title: 'Quality Management Certified',
    description:
      'ISO 9001:2015 is an internationally audited quality management standard, not a one-time badge. It means our billing processes are documented, measured and continuously improved: defined SLAs, tracked error rates, corrective-action loops and management reviews — the discipline behind claims that keep moving instead of sitting in aging buckets.',
  },
]

export default function CertificationsShowcase({ className = '' }) {
  return (
    <section className={`border-y border-mbx-border bg-mbx-white ${className}`}>
      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">
            Certified &amp; Compliant
          </span>
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-mbx-navy md:text-4xl lg:text-[2.75rem]">
            Certified Standards Behind Every Claim We Touch
          </h2>
          <p className="text-lg leading-relaxed text-mbx-text-muted">
            Medical billing is a regulated, credential-driven discipline. These four certifications
            are the operating standard behind our coding accuracy, data security and quality control.
          </p>
        </div>

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <StaggerItem key={cert.short}>
              <article className="group flex h-full flex-col rounded-2xl border border-mbx-border bg-mbx-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mbx-teal/40 hover:bg-white hover:shadow-lg hover:shadow-mbx-navy/10">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-mbx-teal/10 text-mbx-teal transition-colors duration-300 group-hover:bg-mbx-teal group-hover:text-white">
                  <cert.icon size={22} />
                </div>
                <p className="text-lg font-extrabold text-mbx-navy">{cert.short}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-mbx-text-muted">
                  {cert.full}
                </p>
                <h3 className="mt-3 text-sm font-extrabold text-mbx-teal">{cert.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-mbx-text-muted">
                  {cert.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Proof of certification */}
        <div className="mx-auto mt-12 max-w-3xl">
          <figure className="overflow-hidden rounded-2xl border border-mbx-border bg-white shadow-md shadow-mbx-navy/5">
            <img
              src={CERTIFICATIONS_IMG}
              alt="MBX Solutions certification badges: AAPC certified professionals, HIPAA compliant, AAHAM member and ISO 9001:2015 certified company"
              className="w-full"
              loading="lazy"
              width="800"
              height="159"
            />
            <figcaption className="border-t border-mbx-border bg-mbx-surface px-5 py-3 text-center text-xs font-semibold text-mbx-text-muted">
              Our certification credentials — AAPC · HIPAA Compliant · AAHAM · ISO 9001:2015
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
