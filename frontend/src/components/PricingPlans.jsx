import { Link } from 'react-router-dom'
import { motion, MotionConfig } from 'framer-motion'
import { Check, UserRound, Briefcase, Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerChildren, StaggerItem } from './Animated'
import { SectionHeading } from './UI'
import { pricingPlans, comparisonColumns, comparisonRows } from '../data/pricingPlans'

function IncludedMark() {
  return (
    <span aria-label="Included" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
      <Check size={11} strokeWidth={3.5} />
    </span>
  )
}

function Dash() {
  return <span aria-label="Not included" className="text-[15px] font-bold leading-none text-mbx-border">—</span>
}

function PricingCard({ plan }) {
  const f = plan.featured
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1.5 ${
        f
          ? 'border-[#4486BF]/50 bg-gradient-to-b from-[#0B2348] via-[#12395F] to-[#1E5C8F] shadow-2xl shadow-[#0B2348]/30 pt-16'
          : 'border-mbx-border bg-white shadow-[0_2px_16px_rgba(11,35,72,0.05)] hover:border-mbx-teal/40 hover:shadow-xl'
      }`}
    >
      {f && (
        <>
          <div aria-hidden className="pointer-events-none absolute -top-16 -right-14 h-40 w-40 rounded-full bg-[#4486BF]/45 blur-3xl" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mbx-teal via-[#7FB2E5] to-transparent" />
        </>
      )}

      {f && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="absolute top-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-mbx-teal px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-mbx-teal/40"
        >
          <Sparkles size={12} />
          {plan.badge}
        </motion.span>
      )}

      {plan.custom && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-16 origin-top-right -rotate-[55deg] select-none whitespace-nowrap px-6 text-2xl font-extrabold uppercase tracking-[0.25em] text-[#4486BF]/10"
        >
          {plan.name}
        </span>
      )}

      <div className={f ? 'pt-2' : ''}>
        <p className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${f ? 'text-mbx-teal-light' : 'text-mbx-teal'}`}>{plan.category}</p>
        <h3 className={`mt-2 text-2xl font-extrabold tracking-tight ${f ? 'text-white' : 'text-mbx-navy'}`}>{plan.name}</h3>
        <span className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold ${f ? 'bg-white/10 text-white/80' : 'bg-mbx-surface text-mbx-text-muted'}`}>
          Criteria: {plan.criteria}
        </span>
      </div>

      <div className={`mt-6 border-t pt-6 ${f ? 'border-white/15' : 'border-mbx-border'}`}>
        {plan.price ? (
          <>
            <p className={`text-4xl font-extrabold tracking-tight ${f ? 'text-white' : 'text-mbx-navy'}`}>
              {plan.price} <span className={`text-xl font-bold ${f ? 'text-white/70' : 'text-mbx-text-muted'}`}>/ month</span>
            </p>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${f ? 'text-mbx-teal-light' : 'text-[#4486BF]'}`}>{plan.cadence}</p>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-serif text-4xl font-bold italic tracking-tight text-mbx-navy">Customize</p>
            <svg className="mt-3 w-28 shrink-0 text-[#4486BF]" viewBox="0 0 120 10" fill="none" aria-hidden>
              <path d="M3 7C28 3.5 64 2.5 117 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2.5">
          <UserRound size={14} className={`shrink-0 ${f ? 'text-mbx-teal-light' : 'text-[#4486BF]'}`} />
          <div>
            <p className={`text-[10px] font-extrabold uppercase tracking-widest ${f ? 'text-white/60' : 'text-mbx-text-muted'}`}>Dedicated Staff</p>
            <p className={`text-sm font-bold ${f ? 'text-white' : 'text-mbx-navy'}`}>{plan.staff}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Briefcase size={14} className={`shrink-0 ${f ? 'text-mbx-teal-light' : 'text-[#4486BF]'}`} />
          <div>
            <p className={`text-[10px] font-extrabold uppercase tracking-widest ${f ? 'text-white/60' : 'text-mbx-text-muted'}`}>Account Management</p>
            <p className={`text-sm font-bold ${f ? 'text-white' : 'text-mbx-navy'}`}>{plan.accountManagement}</p>
          </div>
        </div>
      </div>

      <p className={`mt-5 text-sm leading-relaxed ${f ? 'text-white/80' : 'text-mbx-text-muted'}`}>{plan.description}</p>

      {plan.custom ? (
        <div className="mt-6 flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#4486BF]/25 bg-[#F6FAFF] px-4 py-8 text-center">
          <div>
            <p className="font-serif text-2xl font-bold italic text-[#4486BF]">Customize</p>
            <p className="mt-2 text-xs leading-relaxed text-mbx-text-muted">Build your plan around your practice's volume.</p>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex-1">
          <p className={`mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] ${f ? 'text-white/60' : 'text-mbx-text-muted'}`}>What's Included</p>
          <ul className="space-y-2.5">
            {plan.inclusions.map((inc) => (
              <li key={inc} className={`flex items-start gap-2.5 text-[13px] leading-snug ${f ? 'text-white/90' : 'text-mbx-navy'}`}>
                <IncludedMark />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/connect-us"
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          f
            ? 'bg-mbx-teal text-white hover:bg-white hover:text-mbx-navy hover:shadow-white/20'
            : plan.cta === 'Start Growth'
              ? 'bg-[#4486BF] hover:bg-[#3a73a8] hover:shadow-[#4486BF]/25'
              : 'bg-mbx-navy hover:bg-[#4486BF] hover:shadow-[#4486BF]/20'
        }`}
      >
        {plan.cta}
        <ArrowRight size={15} />
      </Link>
    </div>
  )
}

function ComparisonTable() {
  return (
    <div className="mt-20">
      <AnimatedSection>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mbx-teal">Compare Side by Side</p>
          <h3 className="text-3xl font-extrabold tracking-tight text-mbx-navy md:text-4xl">Plans Comparison</h3>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="overflow-x-auto rounded-2xl border border-mbx-border bg-white shadow-[0_2px_16px_rgba(11,35,72,0.05)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="bg-mbx-navy px-6 py-5 text-sm font-extrabold text-white">
                  Feature / Service
                </th>
                {comparisonColumns.map((col) => {
                  const isGrowth = col.startsWith('Growth')
                  return (
                    <th
                      key={col}
                      scope="col"
                      className={`border-l px-6 py-5 text-center text-sm font-extrabold ${
                        isGrowth ? 'border-white/20 bg-[#7FB2E5] text-[#0B2348]' : 'border-white/10 bg-mbx-navy text-white'
                      }`}
                    >
                      {col}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => {
                const striped = i % 2 === 1
                return (
                  <tr key={row.feature} className={`transition-colors ${striped ? 'bg-[#F7F9FC]' : 'bg-white'} hover:bg-[#EFF6FC]`}>
                    <td className="border-t border-mbx-border px-6 py-3.5 text-sm font-semibold text-mbx-navy">{row.feature}</td>
                    <td className="border-l border-mbx-border/60 border-t border-mbx-border px-6 py-3.5 text-center">
                      {row.essential ? <IncludedMark /> : <Dash />}
                    </td>
                    <td className="border-l border-[#4486BF]/10 border-t border-mbx-border bg-[#F0F7FD] px-6 py-3.5 text-center">
                      {row.growth ? <IncludedMark /> : <Dash />}
                    </td>
                    <td className="border-l border-mbx-border/60 border-t border-mbx-border px-6 py-3.5 text-center">
                      {row.revenue ? <IncludedMark /> : <Dash />}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  )
}

function PricingCTAs() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
      {pricingPlans.map((plan) => (
        <Link
          key={plan.id}
          to="/connect-us"
          className={`inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
            plan.cta === 'Start Growth'
              ? 'bg-[#4486BF] hover:bg-[#3a73a8] hover:shadow-[#4486BF]/25'
              : 'bg-mbx-navy hover:bg-[#4486BF] hover:shadow-[#4486BF]/20'
          }`}
        >
          {plan.cta}
          <ArrowRight size={15} />
        </Link>
      ))}
    </div>
  )
}

export default function PricingPlans() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="reporting" className="relative scroll-mt-40 overflow-hidden bg-white py-28 lg:py-36">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[#4486BF]/8 blur-[140px]" />
          <div className="absolute -left-40 top-1/3 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/50 blur-[130px]" />
          <div className="absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[#E7F3FB]/80 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="MBX Solutions LLC"
              title="Plans Comparison"
              subtitle="Flexible revenue cycle solutions designed around the needs of your practice."
            />
          </AnimatedSection>

          <StaggerChildren className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.08}>
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.id} className="h-full">
                <PricingCard plan={plan} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <ComparisonTable />
          <PricingCTAs />
        </div>
      </section>
    </MotionConfig>
  )
}