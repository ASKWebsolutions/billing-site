import { Link } from 'react-router-dom'
import { Stethoscope, Wind, Scan, Zap, Droplet, Shield, Thermometer, Activity, Heart, Bone, Microscope, Ear, SmilePlus, Pill, Building } from 'lucide-react'

const specialties = [
  { icon: Stethoscope, label: 'Primary Care' },
  { icon: Wind, label: 'Pulmonology' },
  { icon: Scan, label: 'Radiology' },
  { icon: Zap, label: 'Urgent Care' },
  { icon: Droplet, label: 'Urology' },
  { icon: Shield, label: 'Workers Comp' },
  { icon: Thermometer, label: 'Wound Care' },
  { icon: Activity, label: 'Anesthesia' },
  { icon: Heart, label: 'Cardiology' },
  { icon: Bone, label: 'Chiropractic' },
  { icon: Microscope, label: 'Clinical Lab' },
  { icon: Building, label: 'DME' },
  { icon: SmilePlus, label: 'Dental' },
  { icon: Stethoscope, label: 'Dermatology' },
  { icon: Pill, label: 'Endocrinology' },
  { icon: Ear, label: 'FQHC' },
]

const doubled = [...specialties, ...specialties]

export default function SectionSpecialtiesScroll() {
  return (
    <section className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#29ABE2] mb-2 tracking-wide">EHR Flexible Medical Billing</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D66] leading-tight mb-2">
            All Specialities
          </h2>
          <div className="w-[50px] h-[3px] bg-[#F5A623] mx-auto" />
        </div>

        {/* Infinite auto-scroll strip */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="scroll-track overflow-hidden">
            <div className="scroll-inner">
              {doubled.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[90px] group cursor-pointer">
                  <div className="flex size-14 items-center justify-center text-[#0B3D66] transition-all duration-300 group-hover:text-[#29ABE2] group-hover:scale-110">
                    <s.icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="text-[12px] font-semibold text-[#0B3D66] text-center leading-tight whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-[5px] bg-[#0B3D66] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#082A4A] hover:shadow-lg min-h-[48px]"
          >
            All Specialities
          </Link>
        </div>
      </div>

      <style>{`
        .scroll-track {
          width: 100%;
        }
        .scroll-inner {
          display: flex;
          gap: 2rem;
          animation: scrollSpecialties 30s linear infinite;
          width: max-content;
        }
        .scroll-track:hover .scroll-inner {
          animation-play-state: paused;
        }
        @keyframes scrollSpecialties {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
