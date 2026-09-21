'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  maxOpacity: number
  pulseSpeed: number
  pulse: number
}

interface ClickSpark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  decay: number
  color: string
}

export default function GoldParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Ambient floating particles
    const particleCount = Math.min(45, Math.floor(window.innerWidth / 30))
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      maxOpacity: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI * 2,
    }))

    // Click burst sparks array
    const clickSparks: ClickSpark[] = []
    const goldPalette = [
      '#FFD580',
      '#F0B14B',
      '#E5A53D',
      '#DCA142',
      '#FFF3D6',
      '#C8892A',
    ]

    const handleClick = (e: MouseEvent) => {
      const sparkCount = 18
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4.5 + 1.5
        clickSparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 3.2 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.018,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        })
      }
    }
    window.addEventListener('click', handleClick)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Render Ambient Gold Floating Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += p.pulseSpeed

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        const currentOpacity = Math.max(0.08, Math.min(p.maxOpacity, p.opacity * Math.sin(p.pulse)))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 185, 80, ${currentOpacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(255, 215, 120, 0.7)'
        ctx.fill()
      }

      // 2. Render Interactive Click Gold Sparks
      for (let i = clickSparks.length - 1; i >= 0; i--) {
        const s = clickSparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.08 // subtle gravity
        s.vx *= 0.98 // air drag
        s.alpha -= s.decay

        if (s.alpha <= 0) {
          clickSparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, s.alpha)
        ctx.fillStyle = s.color
        ctx.shadowBlur = 14
        ctx.shadowColor = s.color

        // Draw diamond/star sparkle shape for big sparks, circle for small
        if (s.size > 2.2) {
          ctx.beginPath()
          ctx.moveTo(s.x, s.y - s.size * 1.6)
          ctx.lineTo(s.x + s.size * 0.8, s.y)
          ctx.lineTo(s.x, s.y + s.size * 1.6)
          ctx.lineTo(s.x - s.size * 0.8, s.y)
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
