import { motion } from 'framer-motion'
import { BadgeCheck, Clock, Banknote, ArrowRight, FileText } from 'lucide-react'
import { PrimaryButton } from '../components/UI'
import { AnimatedSection } from '../components/Animated'
import {
  Specialties,
  SizingCompare,
  ServicesGrid,
  Calculator,
  DenialLab,
  EhrCompats,
  CaseStudies,
  FinalCta,
} from './HomeHealthHospice'
import { usePageSeo } from '../hooks/useSeo'

export default function FreeBillingAudit() {
  usePageSeo('/free-billing-audit')
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-atmos">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute top-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-[#C7E7F8]/65 blur-[130px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-44 pb-16 md:pt-52 lg:pb-24">
          <AnimatedSection>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal"
            >
              <BadgeCheck size={13} /> Free Billing Audit
            </motion.span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              See Exactly Where Your Revenue Is Leaking — <span className="text-mbx-teal">For Free.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Our senior analysts pore over your aged trial balance, denials and compliance windows — then hand you a
              findings report with the exact recovery numbers. No payment reform, no obligation, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton to="/free-billing-audit#free-audit" size="lg">
                Request Your Free Audit <ArrowRight size={16} />
              </PrimaryButton>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { icon: Banknote, label: 'Zero upfront cost' },
                { icon: Clock, label: 'Findings in 48 hours' },
                { icon: FileText, label: 'BAA & HIPAA secured' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-sm font-bold text-mbx-navy">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/80 text-mbx-teal shadow-sm">
                    <c.icon size={16} />
                  </span>
                  {c.label}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PHYSICIAN PART B — SPECIALTIES */}
      <Specialties />

      {/* BUILT FOR BOTH WORLDS */}
      <SizingCompare />

      {/* END-TO-END REVENUE CYCLE */}
      <ServicesGrid />

      {/* FREE AR MODELER */}
      <Calculator />

      {/* DENIAL RESOLUTION LAB */}
      <DenialLab />

      {/* ZERO SOFTWARE SWITCHING */}
      <EhrCompats />

      {/* CASE STUDIES */}
      <CaseStudies />

      {/* START WITH PROOF */}
      <FinalCta />
    </main>
  )
}