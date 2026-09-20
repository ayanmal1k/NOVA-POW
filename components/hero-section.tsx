'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18,
    },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen w-full overflow-hidden bg-[#080604] text-white flex items-start justify-start">
      {/* ── Background Layer: Desktop & Mobile ── */}
      <div
        className="absolute inset-0 z-0 hidden md:block bg-cover bg-no-repeat bg-right lg:bg-[center_right] xl:bg-right transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
        }}
      />
      <div
        className="absolute inset-0 z-0 block md:hidden bg-cover bg-no-repeat bg-top transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('/hero-bg-mobile.png')`,
        }}
      />

      {/* ── Full Width Content Layer — Attached to Top ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-6 sm:pt-8 md:pt-32 lg:pt-36 pb-16 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-start"
        >
          {/* ── Top Pill Badge (Hidden on mobile) ── */}
          <motion.div variants={itemVariants} className="hidden md:block mb-3 sm:mb-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-[#d4a853]/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,168,83,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#e5a84b] animate-pulse" />
              <span className="font-display text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#e9c785] font-semibold">
                WEB3 COMMUNITY &amp; GROWTH SPECIALIST
              </span>
            </div>
          </motion.div>

          {/* ── Hero NOVA Text Image (Golden Brush Title) ── */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-[350px] sm:max-w-[460px] md:max-w-[510px] lg:max-w-[550px] -ml-2 sm:-ml-3 my-1 sm:my-2"
          >
            <Image
              src="/hero-text.png"
              alt="NOVA"
              width={650}
              height={260}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(229,168,75,0.45)] select-none"
            />
          </motion.div>

          {/* ── Subheadings: BUILDS COMMUNITIES ── */}
          <motion.div variants={itemVariants} className="mt-1 sm:mt-2 space-y-1">
            <div className="font-display text-2xl sm:text-3xl md:text-[2rem] tracking-[0.18em] uppercase text-[#f3eedf] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              BUILDS
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.85rem] xl:text-[4.2rem] tracking-[0.06em] font-extrabold uppercase text-white leading-none drop-shadow-[0_0_25px_rgba(255,215,130,0.35)]">
              COMMUNITIES
            </h1>
          </motion.div>

          {/* ── Description Paragraph (Poppins) ── */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-[17px] md:text-xl font-sans font-normal text-[#cfc8b8] leading-relaxed max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            I help Web3 projects grow through community management, marketing, and strategic execution.
          </motion.p>

          {/* ── Sci-Fi Chamfered CTA Button (Astronomus) ── */}
          <motion.div variants={itemVariants} className="mt-9 sm:mt-11">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-3.5 px-7 sm:px-9 py-4 sm:py-4.5 transition-all duration-300 active:scale-95"
            >
              {/* Outer Golden Glow on Hover */}
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f5b853] to-[#c7882b] opacity-40 blur-md group-hover:opacity-80 transition-opacity duration-500 -z-10" />

              {/* Main Button Background with Sci-Fi Chamfered Corners */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-transform duration-300 group-hover:brightness-110 shadow-[0_4px_25px_rgba(214,154,50,0.4)]"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                }}
              />

              {/* Subtle Sci-Fi Corner Accent / Notch Line */}
              <div
                className="absolute inset-[1.5px] pointer-events-none opacity-40 bg-gradient-to-b from-white/30 to-transparent"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                }}
              />

              {/* Button Content */}
              <span className="relative z-10 font-display text-sm sm:text-[15px] font-bold uppercase tracking-[0.14em] text-[#120c04]">
                VIEW MY WORK
              </span>

              <ArrowRight className="relative z-10 w-5 h-5 text-[#120c04] transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
