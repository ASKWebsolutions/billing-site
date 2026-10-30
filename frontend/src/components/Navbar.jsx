import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MapPin,
  HeartPulse,
  HeartHandshake,
  Building2,
  Hospital,
  ShieldAlert,
  Wallet,
  FileCode2,
  ReceiptText,
  ClipboardCheck,
  Activity,
  FileText,
  Send,
  RefreshCw,
  BadgeCheck,
} from 'lucide-react'
import TopUtilityHeader from './TopUtilityHeader'
import ChatWidget from './ChatWidget'
import { FEATURED_LOCATIONS } from '../data/locations'

const SERVICE_GROUPS = {
  settings: [
    { label: 'Home Health Billing', path: '/services#home-health', icon: HeartPulse },
    { label: 'Hospice Billing', path: '/home-health-hospice', icon: HeartHandshake },
  ],
  practices: [
    { label: 'Small Practice', path: '/projects/small', icon: Building2 },
    { label: 'Large Practice', path: '/projects/large', icon: Hospital },
  ],
  core: [
    { label: 'Denial Management', path: '/services#denial-management', icon: ShieldAlert },
    { label: 'A-R Recovery', path: '/ar-recovery', icon: Wallet },
    { label: 'Medical Coding', path: '/services#medical-coding', icon: FileCode2 },
    { label: 'Medical Billing', path: '/medical-billing', icon: ReceiptText },
    { label: 'OASIS & QA', path: '/solution#oasis', icon: ClipboardCheck },
    { label: 'RCM', path: '/rcm-services', icon: Activity },
  ],
  operations: [
    { label: 'Claim Entry', path: '/services#claim-entry', icon: FileText },
    { label: 'Claims Scrubbing & Submission', path: '/services#claims-scrubbing', icon: Send },
    { label: 'AR Follow-up', path: '/services#ar-followup', icon: RefreshCw },
    { label: 'Credentialing & Enrollment', path: '/services#credentialing', icon: BadgeCheck },
  ],
}

function MenuHeading({ children }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">
      <span className="inline-block h-3 w-1 rounded-full bg-mbx-teal" />
      {children}
    </p>
  )
}

function ServicesMegaMenu() {
  return (
    <div className="w-[56rem] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-mbx-teal/15 bg-white/95 shadow-2xl shadow-[#0B2348]/15 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 border-b border-mbx-border/70 bg-gradient-to-r from-mbx-surface via-white to-white px-6 py-3.5">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-mbx-teal">
            <span className="inline-block h-3.5 w-1 rounded-full bg-mbx-teal" />
            Services
          </p>
          <p className="mt-1 truncate text-[13px] font-semibold text-mbx-navy">
            Revenue cycle support built for home health &amp; hospice
          </p>
        </div>
        <Link
          to="/services"
          className="group/all inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-mbx-navy transition-colors hover:bg-mbx-teal/5 hover:text-mbx-teal"
        >
          View all services
          <ArrowRight size={13} className="text-mbx-teal transition-transform duration-200 group-hover/all:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-[11.5rem_minmax(0,1fr)_13rem] gap-5 px-6 py-5">
        <div className="space-y-5">
          <div>
            <MenuHeading>Billing by Setting</MenuHeading>
            <ul className="space-y-0.5">
              {SERVICE_GROUPS.settings.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group/link flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-semibold text-mbx-text-muted transition-all duration-200 hover:bg-mbx-teal/5 hover:text-mbx-navy"
                  >
                    <item.icon size={14} className="shrink-0 text-mbx-teal/70 transition-colors group-hover/link:text-mbx-teal" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-mbx-border/60 pt-4">
            <MenuHeading>Practice Size</MenuHeading>
            <ul className="space-y-0.5">
              {SERVICE_GROUPS.practices.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group/link flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-semibold text-mbx-text-muted transition-all duration-200 hover:bg-mbx-teal/5 hover:text-mbx-navy"
                  >
                    <item.icon size={14} className="shrink-0 text-mbx-teal/70 transition-colors group-hover/link:text-mbx-teal" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-x border-mbx-border/60 px-5">
          <MenuHeading>Core Services</MenuHeading>
          <div className="grid grid-cols-2 gap-1">
            {SERVICE_GROUPS.core.map((item) => (
              <Link
                key={item.path + item.label}
                to={item.path}
                className="group/tile flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-2 transition-all duration-200 hover:border-mbx-teal/25 hover:bg-white hover:shadow-sm hover:shadow-mbx-navy/5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-mbx-teal/10 text-mbx-teal transition-colors duration-200 group-hover/tile:bg-mbx-teal group-hover/tile:text-mbx-white">
                  <item.icon size={14} />
                </span>
                <span className="text-[12.5px] font-semibold leading-tight text-mbx-text-muted transition-colors group-hover/tile:text-mbx-navy">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <MenuHeading>Billing Operations</MenuHeading>
          <ul className="space-y-0.5">
            {SERVICE_GROUPS.operations.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] font-medium leading-tight text-mbx-text-muted transition-all duration-200 hover:bg-mbx-teal/5 hover:text-mbx-navy"
                >
                  {item.label}
                  <ArrowRight size={12} className="ml-auto shrink-0 -translate-x-1 text-mbx-teal opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/free-billing-audit"
            className="group/audit mt-3 flex items-center justify-between gap-2 rounded-xl border border-mbx-teal/20 bg-mbx-teal/5 px-3 py-2.5 text-[12px] font-bold text-mbx-navy transition-colors hover:border-mbx-teal/40 hover:bg-mbx-teal/10"
          >
            Free Billing Audit
            <ArrowRight size={13} className="text-mbx-teal transition-transform duration-200 group-hover/audit:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mx-6 mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl bg-mbx-navy px-5 py-3.5">
        <div className="min-w-0">
          <p className="text-[13px] font-extrabold text-mbx-white">Not sure which service fits your practice?</p>
          <p className="mt-0.5 text-[11px] text-white/60">Free 90-day A/R audit · 12% contingency A/R recovery · no long-term contracts.</p>
        </div>
        <Link
          to="/connect-us"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#4486BF] px-4 py-2 text-[11px] font-bold text-mbx-white transition-all duration-300 hover:bg-[#3a73a8]"
        >
          Talk to an expert
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Home Health & Hospice', path: '/home-health-hospice', placeRight: true },
  {
    label: 'Company',
    path: '/company',
    children: [
      { heading: 'Company', items: [
        { label: 'Why MBX', path: '/company' },
        { label: 'About Us', path: '/about' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'HIPAA Compliance', path: '/hipaa' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Contact Us', path: '/connect-us' },
        { label: 'Blog', path: '/blog' },
      ]},
      { heading: 'Teams', items: [
        { label: 'Meet Our Team', path: '/team' },
      ]},
    ],
  },
  {
    label: 'Locations',
    path: '/locations',
    isLocations: true,
    children: [
      { heading: 'Locations', items: [
        ...FEATURED_LOCATIONS.map((loc) => ({ label: loc.name, path: `/locations/${loc.slug}` })),
        { label: 'View all locations', path: '/locations', isViewAll: true },
      ]},
    ],
  },
  {
    label: 'Services',
    path: '/services',
    isServices: true,
    children: [
      { heading: 'Billing by Setting', items: SERVICE_GROUPS.settings },
      { heading: 'Practice Size', items: SERVICE_GROUPS.practices },
      { heading: 'Core Services', items: SERVICE_GROUPS.core },
      { heading: 'Billing Operations', items: SERVICE_GROUPS.operations },
    ],
  },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { heading: 'Resources', items: [
        { label: 'Resource Center', path: '/resources' },
        { label: 'Account Manager', path: '/account-manager' },
        { label: 'Free Billing Audit', path: '/services#free-audit' },
        { label: 'Compliance (HIPAA)', path: '/hipaa' },
        { label: 'Our Services', path: '/services' },
      ]},
    ],
  },
  {
    label: 'The MBX Advantage',
    path: '/mbx-advantage',
  },
  {
    label: 'Software',
    path: '/software',
    children: [
      { heading: 'Software', items: [
        { label: 'Billing Software', path: '/software' },
        { label: 'RCM Dashboard', path: '/software#dashboard' },
        { label: 'Coding Tools', path: '/software#coding' },
      ]},
    ],
  },
  {
    label: 'RCM Services',
    path: '/rcm-services',
    children: [
      { heading: 'RCM Services', items: [
        { label: 'Revenue Cycle Management', path: '/rcm-services' },
        { label: 'Medical Coding', path: '/rcm-services#coding' },
        { label: 'AR Follow-up', path: '/rcm-services#ar' },
        { label: 'Denial Management', path: '/rcm-services#denial' },
        { label: 'A-R Recovery', path: '/ar-recovery' },
      ]},
    ],
  },
  {
    label: 'Solution',
    path: '/solution',
    children: [
      { heading: 'Solution', items: [
        { label: 'End-to-End Solution', path: '/solution' },
        { label: 'Billing & Coding', path: '/solution#billing' },
        { label: 'OASIS & QA', path: '/solution#oasis' },
        { label: 'Reporting', path: '/solution#reporting' },
      ]},
    ],
  },
  { label: 'Pricing', path: '/pricing' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setExpandedMobile(null)
    setHasScrolled(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    let frameId = 0
    const handleScroll = () => {
      if (frameId) return

      frameId = requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 12)
        frameId = 0
      })
    }

    setHasScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`absolute left-0 right-0 top-0 hidden overflow-hidden transition-[opacity,transform] duration-300 ease-out will-change-transform lg:block ${
            hasScrolled ? 'pointer-events-none -translate-y-full opacity-0' : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
        >
          <TopUtilityHeader />
        </div>
        <header
          className={`relative bg-white shadow-lg shadow-black/5 transition-transform duration-300 ease-out will-change-transform ${
            hasScrolled ? 'translate-y-0' : 'lg:translate-y-[84px]'
          }`}
        >
        <nav className="container mx-auto grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2 md:gap-4 lg:py-2.5 xl:gap-6">
          <Link to="/" className="relative z-10 shrink-0">
            <img src="/reallogo.jpeg" alt="MBX Solutions" className="h-8 md:h-10 lg:h-12 w-auto" />
          </Link>

          <div className="hidden min-w-0 items-center justify-center xl:flex">
            {navItems.filter((item) => !item.placeRight).map((item, idx) => (
              <div key={item.label} className="group relative">
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    className="px-2.5 xl:px-3 py-2.5 text-[13px] xl:text-sm font-semibold text-[#4486BF] hover:text-mbx-navy transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className="-ml-1 text-mbx-text-muted/50 group-hover:text-mbx-text-muted transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown size={12} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  )}
                </div>

                {item.children && (
                  <div className={`pointer-events-none invisible absolute z-50 top-full pt-3 opacity-0 scale-y-95 origin-top transition-all duration-250 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:scale-y-100 ${idx >= navItems.length - 2 ? 'right-0' : item.children.length > 2 ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}>
                    {item.isServices ? (
                      <ServicesMegaMenu />
                    ) : item.isLocations ? (
                      <div className="w-[44rem] max-w-[calc(100vw-2.5rem)] rounded-2xl bg-white/95 backdrop-blur-md border border-mbx-teal/15 shadow-2xl shadow-[#0B2348]/15 p-5 max-h-[80vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mbx-teal/30">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">
                            <span className="inline-block h-4 w-1.5 rounded-full bg-mbx-teal" />
                            Our Locations
                          </p>
                          <Link
                            to="/locations"
                            className="group/item flex items-center gap-1.5 text-[13px] font-bold text-mbx-navy transition-colors hover:text-mbx-teal"
                          >
                            View all locations
                            <ArrowRight size={14} className="text-mbx-teal transition-transform duration-200 group-hover/item:translate-x-1" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 xl:grid-cols-4 gap-1">
                          {FEATURED_LOCATIONS.map((loc) => (
                            <Link
                              key={loc.slug}
                              to={`/locations/${loc.slug}`}
                              className="group/item flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-mbx-text-muted transition-all duration-200 hover:text-mbx-navy hover:bg-mbx-teal/5 hover:pl-4"
                            >
                              <MapPin size={13} className="shrink-0 text-mbx-teal/60" />
                              {loc.name}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl bg-mbx-navy px-5 py-4">
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold text-mbx-white">Find your state. We'll take it from there.</p>
                            <p className="mt-0.5 text-xs text-white/60">Some billing companies have a comfort zone. Ours isn't limited by a zip code.</p>
                          </div>
                          <div className="flex items-center gap-5">
                            {[
                              { value: '90%+', label: 'Rate' },
                              { value: '<40d', label: 'Days' },
                              { value: '97%', label: 'Paid' },
                            ].map((stat) => (
                              <div key={stat.label}>
                                <p className="text-base font-extrabold leading-none text-mbx-teal-light">{stat.value}</p>
                                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                          <Link
                            to="/connect-us"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#4486BF] px-4 py-2.5 text-xs font-bold text-mbx-white transition-all duration-300 hover:bg-[#3a73a8]"
                          >
                            Talk to an expert
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className={`${item.children.length > 1 ? 'min-w-[22rem]' : 'min-w-[16rem]'} w-max max-w-[calc(100vw-2.5rem)] relative rounded-2xl bg-white/95 backdrop-blur-md border border-mbx-teal/15 shadow-2xl shadow-[#0B2348]/15 p-5 max-h-[70vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mbx-teal/30`}>
                        {item.children.length > 2 && (
                          <div aria-hidden="true" className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-[#4486BF] via-[#5A9AD0] to-transparent" />
                        )}
                        <div className={item.children.length > 2 ? 'flex items-stretch' : ''}>
                        {item.children.map((child, idx) => {
                          const wide = item.children.length > 2
                          const wrapCls = wide
                            ? `${idx > 0 ? 'border-l border-mbx-teal/10 pl-5' : ''} ${idx < item.children.length - 1 ? 'pr-5' : ''}`
                            : idx > 0 ? 'mt-4 border-t border-mbx-teal/10 pt-4' : ''
                          return (
                          <div key={idx} className={wrapCls}>
                            {child.heading && (
                              <p className="mb-1.5 flex items-center gap-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">
                                <span className="inline-block h-3.5 w-1 rounded-full bg-mbx-teal" />
                                {child.heading}
                              </p>
                            )}
                            <ul className={item.children.length > 2 ? 'space-y-1' : 'space-y-0.5'}>
                              {(child.items || [child]).map((sub, subIdx) => (
                                <li key={subIdx}>
                                  <Link
                                    to={sub.path}
                                    className="group/item flex items-center rounded-lg px-3 py-2 text-[13.5px] font-medium text-mbx-text-muted transition-all duration-200 hover:text-mbx-navy hover:bg-mbx-teal/5 hover:pl-4"
                                  >
                                    {sub.label}
                                    <ArrowRight size={14} className="ml-auto -translate-x-1 text-mbx-teal opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          )
                        })}
                        </div>
                        {item.children.length > 2 && (
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl bg-mbx-navy px-5 py-4">
                            <div className="min-w-0">
                              <p className="text-sm font-extrabold text-mbx-white">Not sure which service fits your practice?</p>
                              <p className="mt-0.5 text-xs text-white/60">Free 90-day A/R audit · 12% contingency A/R recovery · no long-term contracts.</p>
                            </div>
                            <Link
                              to="/connect-us"
                              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#4486BF] px-4 py-2.5 text-xs font-bold text-mbx-white transition-all duration-300 hover:bg-[#3a73a8]"
                            >
                              Talk to an expert
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end shrink-0">
            <button
              className="relative z-10 flex size-11 items-center justify-center text-mbx-navy xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-atmos-cta xl:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto pt-24 pb-10 px-8 md:pt-32 lg:pt-40">
              <ul className="space-y-0">
                {navItems.filter((item) => !item.placeRight).map((item, idx) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="border-b border-mbx-teal/15"
                  >
                    <div className="flex items-center justify-between py-5">
                      <Link to={item.path} className="text-[1.35rem] font-bold text-mbx-navy">
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          className="flex size-10 items-center justify-center text-mbx-text-muted"
                          onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                          aria-expanded={expandedMobile === item.label}
                        >
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${expandedMobile === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.children && expandedMobile === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pl-4 space-y-1">
                            {item.children.map((child, cIdx) => (
                              <div key={cIdx}>
                                {child.heading && (
                                  <p className="mb-1.5 mt-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">
                                    <span className="inline-block h-3.5 w-1 rounded-full bg-mbx-teal" />
                                    {child.heading}
                                  </p>
                                )}
                                {(child.items || [child]).map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    to={sub.path}
                                    className="block rounded-lg py-2.5 pl-3 text-base text-mbx-text-muted transition-colors hover:text-mbx-navy"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/home-health-hospice"
                className="mt-8 flex items-center justify-center gap-2 rounded-[6px] bg-[#00B8A9] px-8 py-4 text-lg font-bold text-white"
              >
                Home Health & Hospice <ArrowRight size={18} />
              </Link>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 space-y-3"
              >
                <Link
                  to="/connect-us"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#4486BF] px-8 py-4 text-lg font-bold text-mbx-white"
                >
                  Get Free Audit <ArrowRight size={18} />
                </Link>
                <Link
                  to="/connect-us"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-mbx-teal/40 px-8 py-4 text-lg font-bold text-mbx-navy"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatWidget />
    </>
  )
}
