'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Floating gold particle effect on canvas when scrolled
  useEffect(() => {
    if (!isScrolled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 80)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool
    const particleCount = 28
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += p.pulseSpeed

        // Wrap around
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        const currentOpacity = Math.max(0.1, Math.min(1, p.opacity * Math.sin(p.pulse)))

        // Draw glowing gold particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235, 175, 75, ${currentOpacity})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(240, 185, 80, 0.8)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isScrolled])

  return (
    <header
      className={`w-full z-50 transition-all duration-500 relative bg-[#080604] border-b border-[#d4a853]/15 py-4 md:fixed md:top-0 md:left-0 md:right-0 ${
        isScrolled
          ? 'md:bg-[#080604]/85 md:backdrop-blur-lg md:border-b md:border-[#d4a853]/20 md:shadow-[0_10px_30px_rgba(0,0,0,0.8)] md:py-3.5'
          : 'md:bg-transparent md:border-b md:border-transparent md:py-7'
      }`}
    >
      {/* ── Scrolled Gold Particles Canvas Background (Desktop) ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full pointer-events-none -z-10 hidden md:block"
          />
        )}
      </AnimatePresence>

      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex items-center justify-between">
        {/* ── Left: NOVA Hero Text Logo with Gold Glow ── */}
        <Link
          href="/"
          className="group relative inline-flex items-center select-none"
        >
          {/* Ambient Glow behind Logo */}
          <div className="absolute -inset-2 rounded-full bg-[#e5a84b]/20 blur-xl group-hover:bg-[#e5a84b]/40 transition-all duration-500 -z-10" />

          <div className="relative w-28 sm:w-36 md:w-44 h-auto transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/hero-text.png"
              alt="NOVA Logo"
              width={220}
              height={90}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_0_18px_rgba(229,168,75,0.5)]"
            />
          </div>
        </Link>

        {/* ── Right: LET'S CONNECT Chamfered Button with Gold Glow ── */}
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 active:scale-95 select-none"
        >
          {/* Ambient Gold Glow behind Button */}
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f5b853] to-[#c7882b] opacity-50 blur-md group-hover:opacity-90 group-hover:blur-lg transition-all duration-500 -z-10" />

          {/* Chamfered Sci-Fi Shape Background */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-all duration-300 group-hover:brightness-110 shadow-[0_2px_15px_rgba(214,154,50,0.35)]"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          />

          {/* Subtle Top-Edge Highlight Line */}
          <div
            className="absolute inset-[1px] pointer-events-none opacity-40 bg-gradient-to-b from-white/40 to-transparent"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          />

          {/* Button Text */}
          <span className="relative z-10 font-display text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-[#120c04]">
            LET&apos;S CONNECT
          </span>

          <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#120c04] transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </header>
  )
}
