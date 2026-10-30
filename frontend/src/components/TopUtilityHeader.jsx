import { Link } from 'react-router-dom'
import { Mail, Phone, Clock, ShieldCheck, ArrowRight } from 'lucide-react'

const announceContainer = 'container mx-auto flex'
const iconProps = { size: 13, strokeWidth: 2 }

const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function TopAnnouncementBar() {
  return (
      <div className="border-b border-white/10 bg-[#4486BF] text-white">
      <div
        className={`${announceContainer} flex-col items-center justify-center gap-1.5 py-0.5 text-center lg:h-[42px] lg:flex-row lg:flex-nowrap lg:justify-between lg:gap-2 lg:overflow-hidden lg:py-0.5 lg:text-left`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-2.5 lg:flex-nowrap lg:justify-start lg:gap-x-1.5 xl:gap-x-2.5">
          <span className="whitespace-nowrap rounded-[6px] border border-white/30 bg-white/15 px-2 py-1 text-[11px] font-semibold leading-none tracking-wide text-white">
            Limited Availability
          </span>
          <p className="whitespace-nowrap text-[12px] font-medium leading-snug text-white/85 xl:text-[12.5px]">
            <span className="hidden xl:inline">Stop Losing Revenue! </span>
            <span className="font-bold text-white">Get a FREE Billing Audit</span> for Your Home
            Health, Home Care &amp; Hospice Agency with MBX Solutions.
          </p>
          <Link
            to="/services#free-audit"
            className="group inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-[6px] border border-white/30 bg-white/15 px-2 py-1 text-[12px] font-bold text-white transition-all hover:bg-white hover:text-[#0B2348] active:scale-95 xl:text-[12.5px]"
          >
            Claim Free Audit
            <ArrowRight size={13} strokeWidth={2.5} className="hidden transition-transform group-hover:translate-x-0.5 xl:inline" />
          </Link>
        </div>

        <Link
          to="/home-health-hospice"
          className="group hidden cursor-pointer items-center gap-1 whitespace-nowrap rounded-[6px] border border-[#00B8A9]/50 bg-[#00B8A9] px-2.5 py-1 text-[12px] font-bold text-white transition-all hover:text-[#0B2348] active:scale-95 xl:text-[12.5px] lg:inline-flex"
        >
          Home Health &amp; Hospice
          <ArrowRight size={13} strokeWidth={2.5} className="hidden transition-transform group-hover:translate-x-0.5 xl:inline" />
        </Link>
      </div>
    </div>
  )
}

function Divider({ className = '' }) {
  return <span aria-hidden="true" className={`inline-block h-3.5 w-px bg-white/10 ${className}`} />
}

export function TopContactBar() {
  return (
    <div className="bg-[#4486BF] text-white">
      <div
        className={`${announceContainer} flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 md:justify-start lg:h-[42px] lg:flex-nowrap lg:py-0.5`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] leading-none lg:flex-nowrap">
<a
             href="mailto:info@mbxsol.com"
             className="flex cursor-pointer items-center gap-1.5 rounded-[6px] px-1.5 py-1 text-white/85 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
           >
             <Mail className="text-white/70" {...iconProps} />
             info@mbxsol.com
           </a>

           <Divider className="hidden sm:inline-block" />

           <span className="hidden text-white/45 sm:inline">Need Help? Call Us:</span>
            <a
              href="tel:+18883706494"
              className="group flex cursor-pointer items-center gap-1.5 text-white/90 transition-all hover:text-white active:scale-95"
            >
              <Phone className="text-white/70" {...iconProps} />
              <span className="inline-flex cursor-pointer items-center rounded-[6px] border border-[#FFB300]/40 bg-[#FFB300]/10 px-2.5 py-[5px] font-bold leading-none text-[#FFB300] transition-all group-hover:bg-[#FFB300] group-hover:text-[#0B2348]">888-370-6494</span>
            </a>

           <span aria-hidden="true" className="font-light text-white/25">|</span>

           <a
             href="https://wa.me/15597777919"
             target="_blank"
             rel="noopener noreferrer"
             title="Message us on WhatsApp"
             className="group flex cursor-pointer items-center gap-1.5 text-white/90 transition-all hover:text-white active:scale-95"
           >
             <WhatsAppIcon className="size-[13px] shrink-0 text-white/70" />
             <span className="inline-flex cursor-pointer items-center rounded-[6px] border border-[#FFB300]/40 bg-[#FFB300]/10 px-2.5 py-[5px] font-bold leading-none text-[#FFB300] transition-all group-hover:bg-[#FFB300] group-hover:text-[#0B2348]">559-777-7919</span>
           </a>

          <Divider className="hidden lg:inline-block" />

           <span className="hidden items-center gap-1.5 text-white/75 lg:flex">
             <Clock className="text-white/70" {...iconProps} />
             24/7 Expert Billing Support
           </span>

           <Divider className="hidden xl:inline-block" />

           <span className="hidden items-center gap-1.5 text-white/75 xl:flex">
             <ShieldCheck className="text-white/70" {...iconProps} />
             Consent
           </span>
        </div>

        <Link
           to="/connect-us"
           className="inline-flex h-[26px] cursor-pointer items-center rounded-[5px] bg-white px-3.5 text-[12px] font-bold text-[#0B2348] transition-all hover:bg-[#EAF6FF] active:scale-95"
         >
           Get Free Quote
         </Link>
      </div>
    </div>
  )
}

export default function TopUtilityHeader({ className = '' }) {
  return (
    <div className={className}>
      <TopAnnouncementBar />
      <TopContactBar />
    </div>
  )
}