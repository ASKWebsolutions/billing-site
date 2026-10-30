import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import ReviewForm from './ReviewForm'

const serviceLinks = [
  { label: 'Medical Coding', path: '/services#medical-coding' },
  { label: 'Medical Billing', path: '/medical-billing' },
  { label: 'Billing & Claims', path: '/services#claim-entry' },
  { label: 'OASIS / QA', path: '/solution#oasis' },
  { label: 'Credentialing', path: '/services#credentialing' },
  { label: 'Virtual Assistance', path: '/medical-assistant' },
]

const sectorLinks = [
  { label: 'Home Health', path: '/home-health-hospice' },
  { label: 'Hospice', path: '/home-health-hospice' },
  { label: 'Behavioral Health', path: '/services' },
  { label: 'Private Practice', path: '/projects/small' },
  { label: 'Medical Groups', path: '/projects/large' },
  { label: 'Specialties', path: '/services#specialties' },
]

const badges = ['WellSky Certified', 'SOC 2 Type II', 'HIPAA Compliant']

const linkCls =
  'text-[14px] leading-relaxed text-[#D0D7E0] transition-colors duration-200 hover:text-[#F5F7FA]'

export default function Footer() {
  const [showReview, setShowReview] = useState(false)

  return (
    <footer className="relative bg-[#081B30] text-[#D0D7E0]">
      <div className="container mx-auto px-4 pb-8 pt-14 md:pt-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex rounded-lg bg-white px-3 py-2 ring-1 ring-white/10 transition-opacity duration-200 hover:opacity-90"
            >
              <img src="/reallogo.jpeg" alt="MBX Solutions" className="h-9 w-auto md:h-10" />
            </Link>

            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#D0D7E0]">
              MBX Solutions · Home Care & Healthcare Revenue Cycle Management
            </p>

            {/* Service highlight line */}
            <div className="mt-4 max-w-sm rounded-xl border border-[#1C3044] bg-[#0F2740] px-4 py-3">
              <p className="text-[12.5px] font-semibold leading-relaxed text-[#C5CFDB]">
                Specialized <Link to="/ar-recovery" className="font-bold text-[#F5F7FA] underline underline-offset-2 transition-colors hover:text-white">A/R Recovery: 12% Contingency</Link>
                {' · '}Full RCM: 2.99% / $699 mo · No Long-Term Contracts
              </p>
            </div>

            {/* Certification badges */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map(badge => (
                <span
                  key={badge}
                  className="rounded-lg border border-[#1C3044] bg-[#0F2740] px-3 py-1.5 text-[11.5px] font-medium text-[#C5CFDB]"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/mbxsol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7C93AC] transition-colors duration-200 hover:text-[#F5F7FA]"
                aria-label="LinkedIn"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mbxsol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7C93AC] transition-colors duration-200 hover:text-[#F5F7FA]"
                aria-label="Facebook"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mbxsol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7C93AC] transition-colors duration-200 hover:text-[#F5F7FA]"
                aria-label="Instagram"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#F5F7FA]">Services</h4>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Sectors */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-[#F5F7FA]">Sectors</h4>
            <ul className="mt-5 space-y-3">
              {sectorLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-[#F5F7FA]">Contact</h4>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a href="mailto:info@mbxsol.com" className={`inline-flex items-start gap-2.5 ${linkCls}`}>
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#7C93AC]" strokeWidth={1.75} />
                  info@mbxsol.com
                </a>
              </li>
              <li>
                <a href="tel:+18883706494" className={`inline-flex items-start gap-2.5 ${linkCls}`}>
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#7C93AC]" strokeWidth={1.75} />
                  888-370-6494
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-[14px] leading-relaxed text-[#D0D7E0]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#7C93AC]" strokeWidth={1.75} />
                Silver Spring, MD
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1C3044] pt-6 sm:flex-row">
          <p className="text-center text-xs text-[#9FB0C0] sm:text-left">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-semibold text-[#F5F7FA]">MBX Solutions LLC</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#9FB0C0]">
            <button
              onClick={() => setShowReview(true)}
              className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#F5F7FA]"
            >
              <Star size={12} /> Write a Review
            </button>
            <Link to="/privacy-policy" className="transition-colors duration-200 hover:text-[#F5F7FA]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <ReviewForm isOpen={showReview} onClose={() => setShowReview(false)} />
    </footer>
  )
}
