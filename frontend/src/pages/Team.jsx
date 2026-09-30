import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { X, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import TeamCard from '../components/TeamCard'
import { teamMembers, TEAM_CATEGORIES, TEAM_STATS } from '../data/teamData'
import { usePageSeo } from '../hooks/useSeo'

const collage = [
  teamMembers[0].image,
  teamMembers[7].image,
  teamMembers[6].image,
  teamMembers[12].image,
]

function ProfileModal({ member, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#061530]/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#061530]/30"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-mbx-navy shadow-md backdrop-blur transition-colors hover:bg-mbx-teal hover:text-white"
        >
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="relative h-72 md:h-auto">
            <img
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mbx-navy/10 to-transparent md:hidden" />
          </div>
          <div className="p-7 md:p-10">
            <span className="mb-3 inline-block rounded-full border border-mbx-teal/25 bg-mbx-teal/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-mbx-teal">
              {member.specialty}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-mbx-navy">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold text-mbx-teal">{member.role}</p>
            <p className="mt-1 text-xs font-medium text-mbx-text-muted">{member.location}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-mbx-text-muted">{member.bio}</p>
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-mbx-navy">Areas of Expertise</p>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((item) => (
                  <span key={item} className="flex items-center gap-1.5 rounded-full bg-[#F3FAFF] border border-mbx-border px-3 py-1.5 text-xs font-semibold text-mbx-navy">
                    <CheckCircle size={12} className="text-mbx-teal" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/connect-us"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-mbx-teal px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-mbx-teal-dark hover:shadow-lg hover:shadow-mbx-teal/25"
            >
              Work With Our Team <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Team() {
  usePageSeo('/team')
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () => active === 'all' ? teamMembers : teamMembers.filter((m) => m.category === active),
    [active]
  )

  return (
    <MotionConfig reducedMotion="user">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5FAFD] pt-44 md:pt-48 lg:pt-44 pb-16 lg:pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5FAFD] via-[#EAF6FF] to-[#CDEAF8]" />
          <div className="absolute top-1/4 -left-32 h-[480px] w-[480px] rounded-full bg-[#4486BF]/15 blur-[140px]" />
          <div className="absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[#8FC5E8]/30 blur-[140px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            <span className="text-[22vw] font-extrabold text-mbx-teal/[0.05] tracking-tighter">OUR TEAM</span>
          </div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/80 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-mbx-teal"
              >
                Our Team
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-5 text-4xl font-extrabold tracking-tight text-mbx-navy leading-[1.05] md:text-5xl lg:text-6xl"
              >
                People who make the <span className="text-mbx-teal">difference.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-mbx-text-muted"
              >
                Meet the MBX Solutions professionals dedicated to delivering thoughtful support, responsive
                communication and exceptional service for your organization.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  to="/connect-us"
                  className="inline-flex items-center gap-2 rounded-xl bg-mbx-teal px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-mbx-teal-dark hover:shadow-lg hover:shadow-mbx-teal/25"
                >
                  Work With Us <ArrowRight size={15} />
                </Link>
                <Link
                  to="/company"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-mbx-teal/30 px-7 py-3.5 text-sm font-bold text-mbx-navy transition-all duration-300 hover:border-mbx-teal hover:bg-mbx-teal/5"
                >
                  Why MBX
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="mt-10 space-y-4 sm:space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl shadow-[#0B2348]/10">
                    <img src={collage[0]} alt="Olivia Carter, Senior Assistant Manager" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl shadow-[#0B2348]/10">
                    <img src={collage[1]} alt="Rachel Green, Director of Client Services" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl shadow-[#0B2348]/10">
                    <img src={collage[2]} alt="Michael Torres, Senior Assistant Manager" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl shadow-[#0B2348]/10">
                    <img src={collage[3]} alt="Adam Wright, Client Support Manager" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 bottom-6 rounded-2xl border border-mbx-teal/15 bg-white/95 backdrop-blur px-5 py-4 shadow-xl flex items-center gap-3">
                <ShieldCheck size={22} className="text-mbx-teal" />
                <span className="text-sm font-extrabold text-mbx-navy leading-tight">HIPAA-Compliant<br />Team</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-mbx-navy">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {TEAM_STATS.map((s) => (
              <div key={s.label} className="border-white/10 px-6 py-9 text-center lg:border-r last:border-r-0">
                <p className="text-3xl md:text-4xl font-extrabold text-[#29ABE2] mb-2">{s.value}</p>
                <p className="text-[13px] text-white/60 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="py-20 lg:py-28 bg-mbx-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-mbx-teal/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-mbx-teal"
            >
              Team Directory
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-mbx-navy"
            >
              The professionals behind <span className="text-mbx-teal">your revenue.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 mb-12"
          >
            {TEAM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  active === cat.id
                    ? 'bg-mbx-teal text-white shadow-lg shadow-mbx-teal/25'
                    : 'border border-mbx-border bg-mbx-surface text-mbx-text-muted hover:border-mbx-teal/40 hover:text-mbx-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TeamCard member={member} onSelect={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProfileModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </MotionConfig>
  )
}