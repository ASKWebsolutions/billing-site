import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TestimonialsSection from './components/SectionTestimonials'
import ChatAlarmPoller from './components/admin/ChatAlarmPoller'
import useSeo from './hooks/useSeo'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const HIPAA = lazy(() => import('./pages/HIPAA'))
const Company = lazy(() => import('./pages/Company'))
const Resources = lazy(() => import('./pages/Resources'))
const AccountManager = lazy(() => import('./pages/AccountManager'))
const Pricing = lazy(() => import('./pages/Pricing'))
const MBXAdvantage = lazy(() => import('./pages/MBXAdvantage'))
const Software = lazy(() => import('./pages/Software'))
const MedicalAssistant = lazy(() => import('./pages/MedicalAssistant'))
const MedicalBilling = lazy(() => import('./pages/MedicalBilling'))
const RCMServices = lazy(() => import('./pages/RCMServices'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Solution = lazy(() => import('./pages/Solution'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const SmallProject = lazy(() => import('./pages/SmallProject'))
const LargeProject = lazy(() => import('./pages/LargeProject'))
const HomeHealthHospice = lazy(() => import('./pages/HomeHealthHospice'))
const ARRecovery = lazy(() => import('./pages/ARRecovery'))
const Team = lazy(() => import('./pages/Team'))
const Locations = lazy(() => import('./pages/Locations'))
const Location = lazy(() => import('./pages/Location'))
const FAQs = lazy(() => import('./pages/FAQs'))
const FreeBillingAudit = lazy(() => import('./pages/FreeBillingAudit'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Admin = lazy(() => import('./pages/Admin'))

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-mbx-teal/20 border-t-mbx-teal" />
        <p className="mt-4 text-sm font-medium text-mbx-text-muted">Loading...</p>
      </div>
    </div>
  )
}

/* Rendered only on /admin/* so it never competes with a page's own
   metadata. Mounted as a child so its effect runs after the page's. */
function AdminNoindex() {
  useSeo({
    title: 'Admin Dashboard',
    description: 'MBX Solutions administration dashboard.',
    noindex: true,
  })
  return null
}

function AppContent() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      {isAdmin && <AdminNoindex />}
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect-us" element={<Contact />} />
            <Route path="/hipaa" element={<HIPAA />} />
            <Route path="/company" element={<Company />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/account-manager" element={<AccountManager />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/mbx-advantage" element={<MBXAdvantage />} />
            <Route path="/software" element={<Software />} />
            <Route path="/medical-assistant" element={<MedicalAssistant />} />
            <Route path="/medical-billing" element={<MedicalBilling />} />
            <Route path="/rcm-services" element={<RCMServices />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects/small" element={<SmallProject />} />
            <Route path="/projects/large" element={<LargeProject />} />
            <Route path="/home-health-hospice" element={<HomeHealthHospice />} />
            <Route path="/ar-recovery" element={<ARRecovery />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:slug" element={<Location />} />
            <Route path="/team" element={<Team />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/free-billing-audit" element={<FreeBillingAudit />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && pathname !== '/mbx-advantage' && <TestimonialsSection />}
      {!isAdmin && <Footer />}
      {/* Admin-only, but lives at the root so a signed-in admin still gets
          alerted while browsing the public site. Renders nothing if logged out. */}
      <ChatAlarmPoller />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
