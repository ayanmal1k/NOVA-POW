'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Sparkles, Send, Radio } from 'lucide-react'

// Custom X (Twitter) SVG icon
function XIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Custom Telegram SVG icon
function TelegramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 18,
    },
  },
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#080604] text-white py-20 md:py-28 lg:py-32">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#e5a84b]/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#e5a84b]/6 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Full Width Container ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* ── Left Column: Contact-Text Graphic + Headline ── */}
          <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col items-start">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#e5a84b]" />
              <span className="font-display text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#e5a84b] font-semibold">
                GET IN TOUCH
              </span>
            </div>

            {/* Main Section Header */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] uppercase font-extrabold leading-[1.08] tracking-[0.03em]">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                LET&apos;S WORK{' '}
              </span>
              <span className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(229,168,75,0.35)]">
                TOGETHER
              </span>
            </h2>

            {/* Contact-Text Image (Real People Real Growth) with Ambient Glow */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] my-6 sm:my-8">
              <div className="absolute inset-0 bg-[#e5a84b]/20 blur-3xl rounded-full pointer-events-none" />
              <Image
                src="/contact-text.png"
                alt="Real People Real Growth"
                width={500}
                height={220}
                className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(229,168,75,0.45)] select-none"
              />
            </div>

            {/* Description (Poppins) */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#cfc8b8] leading-relaxed max-w-xl">
              Ready to scale your Web3 community, execute viral marketing campaigns, or launch your token with real momentum? Connect with me directly on Telegram or X.
            </p>
          </motion.div>

          {/* ── Right Column: Direct Action Buttons Card ── */}
          <motion.div variants={itemVariants} className="lg:col-span-6 w-full">
            <div className="group relative w-full p-7 sm:p-9 md:p-10 transition-all duration-300">
              {/* Outer Golden Ambient Hover Glow */}
              <div
                className="absolute -inset-1 opacity-60 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-gradient-to-b from-[#f0b14b]/20 via-[#c8892a]/10 to-transparent -z-10 pointer-events-none"
                style={{
                  clipPath:
                    'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                }}
              />

              {/* Chamfered Outer Border Frame */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#d4a853] via-[#8c6527] to-[#d4a853]/60 p-[1.5px] transition-all duration-300 group-hover:from-[#ffd580] group-hover:via-[#e5a53d] group-hover:to-[#ffd580]"
                style={{
                  clipPath:
                    'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                }}
              >
                {/* Inner Dark Surface */}
                <div
                  className="w-full h-full bg-gradient-to-b from-[#150f08] via-[#0d0905] to-[#070503]"
                  style={{
                    clipPath:
                      'polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)',
                  }}
                />
              </div>

              {/* Sci-Fi Corner Accent Markings */}
              <svg
                className="absolute top-3.5 left-3.5 w-8 h-8 pointer-events-none text-[#e5a84b]/70 z-20"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path d="M2 18 L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg
                className="absolute bottom-3.5 right-3.5 w-8 h-8 pointer-events-none text-[#e5a84b]/70 z-20"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path d="M12 28 L28 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Action Buttons Content */}
              <div className="relative z-10 w-full flex flex-col items-start">
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-[#f7f2e4] mb-2">
                  DIRECT ACCESS
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#a8a192] mb-8">
                  Connect with me directly on social channels or join the official Telegram broadcast channel.
                </p>

                {/* ── Row 1: 2 Buttons in a Row (Telegram & X) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full mb-5">
                  {/* Connect on Telegram Button */}
                  <a
                    href="https://t.me/Web_3_nova"
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative w-full inline-flex items-center justify-center gap-3 px-5 py-4 transition-all duration-300 active:scale-95"
                  >
                    {/* Hover Glow */}
                    <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f5b853] to-[#c7882b] opacity-30 blur-md group-hover/btn:opacity-80 transition-opacity duration-300 -z-10" />

                    {/* Chamfered Shape Background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-all duration-300 group-hover/btn:brightness-110 shadow-[0_4px_20px_rgba(214,154,50,0.35)]"
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                      }}
                    />

                    {/* Button Content */}
                    <TelegramIcon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#120c04] transition-transform group-hover/btn:scale-110" />
                    <span className="relative z-10 font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em] text-[#120c04]">
                      CONNECT ON TELEGRAM
                    </span>
                  </a>

                  {/* Connect on X Button */}
                  <a
                    href="https://x.com/Bitzygirl01"
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative w-full inline-flex items-center justify-center gap-3 px-5 py-4 transition-all duration-300 active:scale-95"
                  >
                    {/* Hover Glow */}
                    <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f5b853] to-[#c7882b] opacity-30 blur-md group-hover/btn:opacity-80 transition-opacity duration-300 -z-10" />

                    {/* Chamfered Shape Background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-all duration-300 group-hover/btn:brightness-110 shadow-[0_4px_20px_rgba(214,154,50,0.35)]"
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                      }}
                    />

                    {/* Button Content */}
                    <XIcon className="relative z-10 w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#120c04] transition-transform group-hover/btn:scale-110" />
                    <span className="relative z-10 font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em] text-[#120c04]">
                      CONNECT ON X
                    </span>
                  </a>
                </div>

                {/* ── Row 2: Double-Width Button: JOIN NOVA POW ── */}
                <a
                  href="https://t.me/NOVA_pow"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 sm:py-5 transition-all duration-300 active:scale-[0.98]"
                >
                  {/* Intense Outer Glow */}
                  <div className="absolute -inset-1.5 rounded-sm bg-gradient-to-r from-[#ffd580] via-[#f0b14b] to-[#c8892a] opacity-50 blur-lg group-hover/btn:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Chamfered Shape Background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#f5ba54] via-[#e5a53d] to-[#c28225] transition-all duration-300 group-hover/btn:brightness-115 shadow-[0_6px_30px_rgba(229,168,75,0.5)]"
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    }}
                  />

                  {/* Inner Highlight Line */}
                  <div
                    className="absolute inset-[1.5px] pointer-events-none opacity-40 bg-gradient-to-b from-white/40 to-transparent"
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    }}
                  />

                  {/* Button Content */}
                  <Radio className="relative z-10 w-5 h-5 text-[#120c04] animate-pulse" />
                  <span className="relative z-10 font-display text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[#120c04]">
                    JOIN NOVA POW
                  </span>
                  <ArrowRight className="relative z-10 w-5 h-5 text-[#120c04] transition-transform duration-300 group-hover/btn:translate-x-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
