'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Send, Twitter } from 'lucide-react'

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

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050402] border-t border-[#d4a853]/20 text-white py-12 sm:py-16">
      {/* ── Background Subtle Golden Glow ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e5a84b]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* ── Full Width Content Layer ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#d4a853]/15">
          {/* ── Left: Hero-Text (NOVA Logo) with Ambient Glow ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group relative inline-flex items-center mb-3 select-none">
              {/* Ambient Glow behind logo */}
              <div className="absolute -inset-2 rounded-full bg-[#e5a84b]/20 blur-xl group-hover:bg-[#e5a84b]/40 transition-all duration-500 -z-10" />
              <div className="relative w-36 sm:w-44 md:w-48 h-auto transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/hero-text.png"
                  alt="NOVA Logo"
                  width={240}
                  height={100}
                  className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(229,168,75,0.45)]"
                />
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-[13px] text-[#a8a192] leading-relaxed max-w-xs">
              Web3 Community, Growth &amp; Marketing Specialist.
            </p>
          </div>

          {/* ── Middle: Animated X & Telegram Interactive Badges ── */}
          <div className="flex items-center justify-center gap-5">
            {/* Telegram Button */}
            <motion.a
              href="https://t.me/Web_3_nova"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 p-3.5 transition-all duration-300"
            >
              {/* Golden Ambient Blur Glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f5b853] to-[#c7882b] rounded-full opacity-0 group-hover:opacity-80 blur-md transition-opacity duration-300 -z-10" />

              {/* Icon Circle Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#1c140a] to-[#0c0804] border border-[#d4a853]/40 group-hover:border-[#e5a84b] flex items-center justify-center text-[#e5a84b] group-hover:text-white shadow-[0_4px_15px_rgba(0,0,0,0.6)] transition-all duration-300">
                <TelegramIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </motion.a>

            {/* X (Twitter) Button */}
            <motion.a
              href="https://x.com/Bitzygirl01"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 p-3.5 transition-all duration-300"
            >
              {/* Golden Ambient Blur Glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f5b853] to-[#c7882b] rounded-full opacity-0 group-hover:opacity-80 blur-md transition-opacity duration-300 -z-10" />

              {/* Icon Circle Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#1c140a] to-[#0c0804] border border-[#d4a853]/40 group-hover:border-[#e5a84b] flex items-center justify-center text-[#e5a84b] group-hover:text-white shadow-[0_4px_15px_rgba(0,0,0,0.6)] transition-all duration-300">
                <XIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </motion.a>
          </div>

          {/* ── Right: Navigation Links ── */}
          <div className="flex items-center gap-6 font-sans text-xs sm:text-sm text-[#cfc8b8]">
            <a href="#services" className="hover:text-[#ffd68a] transition-colors font-medium">
              Services
            </a>
            <span className="text-[#d4a853]/40">•</span>
            <a href="#work" className="hover:text-[#ffd68a] transition-colors font-medium">
              Proof of Work
            </a>
            <span className="text-[#d4a853]/40">•</span>
            <a href="#contact" className="hover:text-[#ffd68a] transition-colors font-medium">
              Contact
            </a>
          </div>
        </div>

        {/* ── Bottom Credits Bar ── */}
        <div className="pt-8 flex items-center justify-center text-center">
          <p className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-[#a8a192]">
            MADE BY{' '}
            <a
              href="https://t.me/AyanMalikkkk"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent font-extrabold hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_12px_rgba(229,168,75,0.4)] ml-1"
            >
              AMEX
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
