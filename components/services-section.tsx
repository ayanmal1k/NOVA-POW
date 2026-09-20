'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const topServices = [
  {
    title: 'COMMUNITY\nMANAGEMENT',
    description: 'Build and manage active, loyal communities.',
    icon: '/services icons/community.png',
  },
  {
    title: 'KOL &\nMARKETING',
    description: 'Partner with creators and run campaigns that convert.',
    icon: '/services icons/megaphone.png',
  },
  {
    title: 'AMBASSADOR\nPROGRAM',
    description: 'Recruit and manage ambassadors for long-term growth.',
    icon: '/services icons/shield.png',
  },
]

const bottomServices = [
  {
    title: 'RAIDING &\nSHILLING',
    description: 'Increase visibility and drive real engagement.',
    icon: '/services icons/lightning.png',
  },
  {
    title: 'STRATEGY &\nCONSULTING',
    description: 'Data-driven plans for sustainable growth.',
    icon: '/services icons/chart.png',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
}

interface ServiceItem {
  title: string
  description: string
  icon: string
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative w-full flex flex-col items-center text-center p-7 sm:p-8 md:p-9 transition-all duration-300 min-h-[340px] sm:min-h-[360px] justify-between select-none"
    >
      {/* ── Outer Golden Ambient Hover Glow ── */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-gradient-to-b from-[#f0b14b]/30 via-[#c8892a]/10 to-transparent -z-10 pointer-events-none"
        style={{
          clipPath:
            'polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)',
        }}
      />

      {/* ── Outer Chamfered Border & Background ── */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#d4a853] via-[#8c6527] to-[#d4a853]/60 p-[1.5px] transition-all duration-300 group-hover:from-[#ffd580] group-hover:via-[#e5a53d] group-hover:to-[#ffd580]"
        style={{
          clipPath:
            'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
        }}
      >
        {/* Inner Card Solid Dark Surface */}
        <div
          className="w-full h-full bg-gradient-to-b from-[#150f08] via-[#0d0905] to-[#070503]"
          style={{
            clipPath:
              'polygon(19px 0, calc(100% - 19px) 0, 100% 19px, 100% calc(100% - 19px), calc(100% - 19px) 100%, 19px 100%, 0 calc(100% - 19px), 0 19px)',
          }}
        />
      </div>

      {/* ── Exact Sci-Fi Corner Markings & Accents from Reference ── */}
      {/* Top-Left Diagonal Inner Accent Line */}
      <svg
        className="absolute top-2.5 left-2.5 w-7 h-7 pointer-events-none text-[#e5a84b]/70 group-hover:text-[#ffd68a] transition-colors"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M2 18 L18 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-Right Diagonal Inner Accent Line (Slash Mark) */}
      <svg
        className="absolute bottom-2.5 right-2.5 w-7 h-7 pointer-events-none text-[#e5a84b]/70 group-hover:text-[#ffd68a] transition-colors"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M12 28 L28 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Big Golden 3D Icon ── */}
      <div className="relative z-10 my-auto flex items-center justify-center pt-2">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <div className="absolute inset-0 bg-[#e5a84b]/20 blur-2xl rounded-full pointer-events-none group-hover:bg-[#e5a84b]/40 transition-all duration-300" />
          <Image
            src={service.icon}
            alt={service.title.replace('\n', ' ')}
            width={120}
            height={120}
            priority
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(229,168,75,0.5)] select-none"
          />
        </div>
      </div>

      {/* ── Card Text Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center mt-6">
        {/* Title (Astronomus) */}
        <h3 className="font-display text-base sm:text-lg md:text-[1.15rem] font-bold uppercase tracking-[0.08em] text-[#f7f2e4] group-hover:text-[#ffd68a] transition-colors duration-300 leading-snug whitespace-pre-line">
          {service.title}
        </h3>

        {/* Description (Poppins) */}
        <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#a8a192] group-hover:text-[#cfc8b8] transition-colors duration-300 mt-2.5 leading-relaxed max-w-[240px]">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#080604] text-white py-20 md:py-28 lg:py-32">
      {/* ── Background Glow Accents ── */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#e5a84b]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#e5a84b]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 max-w-7xl mx-auto">
        {/* ── Top Header Row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
          {/* Left: Titles & Subtitle */}
          <div className="max-w-2xl">
            {/* Tag / Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#e5a84b]" />
              <span className="font-display text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#e5a84b] font-semibold">
                SERVICES
              </span>
            </div>

            {/* Main Header */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] uppercase font-extrabold leading-[1.1] tracking-[0.03em]">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                STRATEGY, COMMUNITY
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(229,168,75,0.35)]">
                &amp; GROWTH
              </span>
            </h2>

            {/* Paragraph (Poppins) */}
            <p className="mt-4 text-sm sm:text-base md:text-[17px] font-sans font-normal text-[#cfc8b8] leading-relaxed max-w-xl">
              From building active communities to driving real engagement, I provide end-to-end Web3 growth support.
            </p>
          </div>

          {/* Right: Contact Text Handwritten with Crown */}
          <div className="relative flex-shrink-0 self-start lg:self-center -mt-2 lg:mt-0">
            <div className="relative w-44 sm:w-56 md:w-64 lg:w-72">
              <div className="absolute inset-0 bg-[#e5a84b]/15 blur-2xl rounded-full pointer-events-none" />
              <Image
                src="/contact-text.png"
                alt="Real People Real Growth"
                width={360}
                height={160}
                className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(229,168,75,0.4)] select-none"
              />
            </div>
          </div>
        </div>

        {/* ── Services Layout: 3 in First Row, 2 Centered in Second Row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-6 sm:gap-7"
        >
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {topServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Row 2: 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-6 sm:gap-7">
            {bottomServices.map((service, index) => (
              <div key={index} className="w-full lg:w-[calc(33.333%-19px)]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
