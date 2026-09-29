import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Stethoscope, Building2, HeartPulse } from 'lucide-react'

const sectors = [
  {
    icon: Stethoscope,
    label: 'Physicians & Medical Practices',
    desc: 'MBX Solutions delivers tailored billing solutions for solo and group practices across all specialties.',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80',
  },
  {
    icon: Building2,
    label: 'Hospitals & Clinics',
    desc: 'MBX Solutions provides end-to-end RCM for multi-department hospitals and outpatient clinics.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  },
  {
    icon: HeartPulse,
    label: 'Healthcare Centers',
    desc: 'MBX Solutions delivers comprehensive revenue cycle management for community and speciality centers.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80',
  },
]

export default function SectionHealthcareSectors() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
      <div className="container mx-auto">
        {/* Heading — centered */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold text-[#29ABE2] mb-2 tracking-wide uppercase">Our Sectors</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D66] leading-tight mb-3">
            Specialized Revenue Cycle Management for{' '}
            <span className="text-[#29ABE2]">Diverse Healthcare Sectors</span>
          </h2>
          <div className="w-[60px] h-[3px] bg-[#F5A623] mx-auto mb-5" />
          <p className="text-[15px] text-mbx-text-muted max-w-2xl mx-auto leading-relaxed">
            Our specialized services at MBX Solutions are designed to address the specific needs of various healthcare providers, from hospitals and private practices to dental clinics and behavioral health centers.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#DEE4EB] cursor-pointer min-h-[340px]"
            >
              {/* Image — full card background, reveals on hover */}
              <div className="absolute inset-0 transition-all duration-700 ease-in-out">
                <img
                  src={sector.image}
                  alt={sector.label}
                  className="w-full h-full object-cover opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0B3D66]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Default content (visible when not hovered) */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center transition-all duration-500">
                {/* Icon */}
                <div className="mb-5 flex size-[72px] items-center justify-center rounded-2xl bg-[#E8F4FD] text-[#0B3D66] transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg">
                  <sector.icon size={36} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0B3D66] transition-colors duration-500 group-hover:text-white mb-2">
                  {sector.label}
                </h3>

                {/* Default subtitle */}
                <p className="text-[13px] text-mbx-text-muted transition-all duration-500 group-hover:opacity-0 group-hover:h-0 group-hover:mb-0 max-w-[250px] leading-relaxed">
                  {sector.desc}
                </p>

                {/* Hover content */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 mt-2">
                  <p className="text-[13px] text-white/80 max-w-[250px] leading-relaxed mb-4">
                    {sector.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#29ABE2] group-hover:text-[#F5A623] transition-colors duration-300">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#29ABE2] to-[#F5A623] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
