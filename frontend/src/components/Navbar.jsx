import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, MapPin } from 'lucide-react'
import TopUtilityHeader from './TopUtilityHeader'
import ChatWidget from './ChatWidget'
import { FEATURED_LOCATIONS } from '../data/locations'

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
    children: [
      { heading: 'Primary', items: [
        { label: 'Home Health Billing', path: '/services#home-health' },
        { label: 'Hospice Billing', path: '/services#hospice' },
      ]},
      { heading: 'Practices', items: [
        { label: 'Small Practice', path: '/projects/small' },
        { label: 'Large Practice', path: '/projects/large' },
      ]},
      { heading: 'Core Services', items: [
        { label: 'Claim Entry', path: '/services#claim-entry' },
        { label: 'Claims Scrubbing & Submission', path: '/services#claims-scrubbing' },
        { label: 'Medical Coding', path: '/services#medical-coding' },
        { label: 'AR Follow-up', path: '/services#ar-followup' },
      ]},
      { heading: 'Specialized', items: [
        { label: 'Denial Management', path: '/services#denial-management' },
        { label: 'Credentialing & Enrollment', path: '/services#credentialing' },
        { label: 'Free Audit', path: '/services#free-audit' },
      ]},
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
  { label: 'Free Billing Audit', path: '/free-billing-audit' },
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
            <img src="https://mbxsol.com/wp-content/uploads/2026/04/MBX-Solutions-Logo-2-e1779169428791.png" alt="MBX Solutions" className="h-8 md:h-10 lg:h-12 w-auto" />
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
                  <div className={`pointer-events-none invisible absolute z-50 top-full pt-3 opacity-0 scale-y-95 origin-top transition-all duration-250 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:scale-y-100 ${idx >= navItems.length - 2 ? 'right-0' : 'left-0'}`}>
                    {item.isLocations ? (
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
                      <div className={`${item.children.length > 1 ? 'min-w-[22rem]' : 'min-w-[16rem]'} w-max max-w-[calc(100vw-2.5rem)] rounded-2xl bg-white/95 backdrop-blur-md border border-mbx-teal/15 shadow-2xl shadow-[#0B2348]/15 p-5 max-h-[70vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mbx-teal/30`}>
                        {item.children.map((child, idx) => (
                          <div key={idx} className={idx > 0 ? 'mt-4 border-t border-mbx-teal/10 pt-4' : ''}>
                            {child.heading && (
                              <p className="mb-1.5 flex items-center gap-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-mbx-teal">
                                <span className="inline-block h-3.5 w-1 rounded-full bg-mbx-teal" />
                                {child.heading}
                              </p>
                            )}
                            <ul className="space-y-0.5">
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
                        ))}
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
                {navItems.map((item, idx) => (
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
