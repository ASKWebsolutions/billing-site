import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import useSeo from '../hooks/useSeo'

export default function NotFound() {
  useSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    noindex: true,
  })

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-atmos overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(68,134,191,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(68,134,191,0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
        <div className="absolute -bottom-20 right-0 h-[380px] w-[380px] rounded-full bg-[#C7E7F8]/70 blur-[140px]" />
        <div className="absolute top-0 left-0 h-[320px] w-[320px] rounded-full bg-[#DDF1FC]/80 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          {/* 404 */}
          <p className="text-[120px] md:text-[180px] font-extrabold text-mbx-teal/[0.06] leading-none select-none">404</p>

          <div className="mt-[-40px] md:mt-[-60px]">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#4486BF]/10 text-[#4486BF]">
              <Search size={28} />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-mbx-navy tracking-tight">Page Not Found</h1>
            <p className="mt-4 max-w-md mx-auto text-base text-mbx-text-muted leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#4486BF] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4486BF]/20 transition-all hover:bg-[#3a73a8] hover:shadow-xl hover:-translate-y-0.5">
                <Home size={16} />
                Go Home
              </Link>
              <button onClick={() => window.history.back()}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-mbx-teal/30 px-7 py-3.5 text-sm font-bold text-mbx-navy transition-all hover:border-mbx-teal hover:text-[#4486BF]">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
