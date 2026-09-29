import { Link } from 'react-router-dom'
import { Mail, Phone, Clock, ShieldCheck, ArrowRight } from 'lucide-react'

const announceContainer = 'container mx-auto flex'
const iconProps = { size: 13, strokeWidth: 2 }

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
          className="group hidden cursor-pointer items-center gap-1 whitespace-nowrap rounded-full border border-[#18D6C0]/50 bg-white/10 px-2.5 py-1 text-[12px] font-bold text-[#18D6C0] transition-all hover:bg-[#18D6C0] hover:text-white active:scale-95 xl:text-[12.5px] lg:inline-flex"
        >
          Home Health & Hospice
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
             href="tel:+15597777919"
             className="group inline-flex cursor-pointer items-center rounded-[6px] border border-[#FFB300]/40 bg-[#FFB300]/10 px-2.5 py-[5px] text-[12.5px] font-bold leading-none text-[#FFB300] transition-all hover:bg-[#FFB300] hover:text-[#0B2348] active:scale-95"
           >
             559-777-7919
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