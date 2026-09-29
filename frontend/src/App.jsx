import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TestimonialsSection from './components/SectionTestimonials'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import HIPAA from './pages/HIPAA'
import Admin from './pages/Admin'
import Company from './pages/Company'
import Resources from './pages/Resources'
import AccountManager from './pages/AccountManager'
import MBXAdvantage from './pages/MBXAdvantage'
import Software from './pages/Software'
import MedicalAssistant from './pages/MedicalAssistant'
import RCMServices from './pages/RCMServices'
import Capabilities from './pages/Capabilities'
import Solution from './pages/Solution'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import SmallProject from './pages/SmallProject'
import LargeProject from './pages/LargeProject'
import HomeHealthHospice from './pages/HomeHealthHospice'
import Team from './pages/Team'
import Locations from './pages/Locations'
import Location from './pages/Location'
import FAQs from './pages/FAQs'
import FreeBillingAudit from './pages/FreeBillingAudit'
import PrivacyPolicy from './pages/PrivacyPolicy'

function AppContent() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
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
          <Route path="/mbx-advantage" element={<MBXAdvantage />} />
          <Route path="/software" element={<Software />} />
          <Route path="/medical-assistant" element={<MedicalAssistant />} />
          <Route path="/rcm-services" element={<RCMServices />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects/small" element={<SmallProject />} />
          <Route path="/projects/large" element={<LargeProject />} />
          <Route path="/home-health-hospice" element={<HomeHealthHospice />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:slug" element={<Location />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/free-billing-audit" element={<FreeBillingAudit />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && pathname !== '/mbx-advantage' && <TestimonialsSection />}
      {!isAdmin && <Footer />}
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
