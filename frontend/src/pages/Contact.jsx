import { AnimatedSection } from '../components/Animated'
import ContactForm from '../components/ContactForm'
import { usePageSeo } from '../hooks/useSeo'

export default function Contact() {
  usePageSeo('/connect-us')
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-atmos overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3FAFF] via-[#E4F4FC] to-[#A9D5F0]" />
          <div className="hero-grid absolute inset-0" />
          <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#4486BF]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[340px] w-[340px] rounded-full bg-[#C7E7F8]/70 blur-[130px]" />
        </div>
        <div className="container mx-auto relative z-10 pt-72 pb-20 md:pt-60 lg:pt-48 lg:pb-28">
          <AnimatedSection>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbx-teal/30 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-mbx-teal">
              Contact Us
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-mbx-navy md:text-5xl lg:text-6xl leading-[1.1]">
              Have a <span className="text-[#4486BF]">Question?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mbx-text-muted md:text-xl">
              Send us a message. The MBX Solutions team will get back to you promptly with the right solution for your practice.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-28 lg:py-36 bg-mbx-white">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-mbx-navy mb-4">
                  Send us a message
                </h2>
                <p className="text-lg text-mbx-text-muted">
                  Have a question about MBX Solutions' services? Send us your inquiry and our team will get back to you promptly.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="shadow-xl shadow-mbx-navy/5">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}