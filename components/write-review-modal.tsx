'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Sparkles, Send, User, Briefcase, CheckCircle, MessageSquare } from 'lucide-react'
import { submitReviewToFirebase, ReviewItem } from '@/lib/firebase'

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onReviewSubmitted?: (review: ReviewItem) => void
}

const RATING_LABELS: Record<number, string> = {
  5: '5.0 — Outstanding / Exceptional 🔥',
  4: '4.0 — Great / Highly Recommended ⚡',
  3: '3.0 — Good / Solid Delivery 👍',
  2: '2.0 — Fair / Needs Improvement',
  1: '1.0 — Poor Experience',
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
}: WriteReviewModalProps) {
  const [name, setName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your name or handle.')
      return
    }
    if (!projectName.trim()) {
      setErrorMessage('Please enter your project or community name.')
      return
    }
    if (!review.trim()) {
      setErrorMessage('Please write a brief review of your experience.')
      return
    }
    if (review.trim().length < 10) {
      setErrorMessage('Please provide a slightly more descriptive review (min 10 characters).')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await submitReviewToFirebase({
        name,
        projectName,
        role: role || 'Client',
        rating,
        review,
      })

      if (res.success) {
        setIsSuccess(true)
        if (onReviewSubmitted) {
          onReviewSubmitted({
            id: res.id,
            name,
            projectName,
            role: role || 'Client',
            rating,
            review,
            createdAt: new Date().toISOString(),
          })
        }

        setTimeout(() => {
          setIsSuccess(false)
          setName('')
          setProjectName('')
          setRole('')
          setRating(5)
          setReview('')
          onClose()
        }, 2200)
      } else {
        setErrorMessage(res.error || 'Failed to submit review. Please try again.')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl my-8 select-none"
          >
            {/* Ambient Golden Hover Glow */}
            <div
              className="absolute -inset-1.5 opacity-70 blur-2xl transition-opacity duration-500 bg-gradient-to-b from-[#f0b14b]/30 via-[#c8892a]/20 to-transparent -z-10 pointer-events-none"
              style={{
                clipPath:
                  'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
              }}
            />

            {/* Chamfered Outer Border Frame */}
            <div
              className="relative w-full bg-gradient-to-b from-[#f0b14b] via-[#8c6527] to-[#d4a853]/60 p-[1.5px] shadow-[0_10px_50px_rgba(0,0,0,0.9)]"
              style={{
                clipPath:
                  'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
              }}
            >
              {/* Inner Dark Surface */}
              <div
                className="w-full h-full bg-gradient-to-b from-[#150f08] via-[#0e0a06] to-[#070503] p-6 sm:p-8 md:p-9"
                style={{
                  clipPath:
                    'polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)',
                }}
              >
                {/* Sci-Fi Diagonal Lines in corners */}
                <svg
                  className="absolute top-3.5 left-3.5 w-7 h-7 pointer-events-none text-[#e5a84b]/60"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path d="M2 18 L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 text-[#a8a192] hover:text-[#f0b14b] transition-colors rounded-lg bg-white/5 hover:bg-white/10 z-20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSuccess ? (
                  /* ── Success Animation Screen ── */
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#e5a84b] to-[#ffd580] flex items-center justify-center shadow-[0_0_35px_rgba(229,168,75,0.6)] mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-[#120c04]" />
                    </motion.div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-white mb-3">
                      REVIEW PUBLISHED!
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#cfc8b8] max-w-sm">
                      Thank you for rating Nova Pow! {rating >= 3 ? 'Your review has been verified and published to the live client carousel.' : 'Your feedback has been received.'}
                    </p>

                    <div className="mt-6 flex items-center gap-1.5 text-[#e5a84b] text-xs font-semibold uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      UPDATING CAROUSEL...
                    </div>
                  </div>
                ) : (
                  /* ── Review Form Screen ── */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-[2px] bg-[#e5a84b]" />
                        <span className="font-display text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#e5a84b] font-bold">
                          RATE MY SERVICES
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.04em] text-white">
                        LEAVE A{' '}
                        <span className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent">
                          CLIENT REVIEW
                        </span>
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-[#a8a192] mt-1">
                        Share your experience working with Nova Pow on Web3 community growth, raids, or campaigns.
                      </p>
                    </div>

                    {/* Star Rating Selector */}
                    <div className="p-4 rounded-xl bg-black/40 border border-[#e5a84b]/20 flex flex-col items-center gap-2">
                      <label className="font-display text-xs uppercase tracking-[0.14em] text-[#e5a84b] font-semibold">
                        Select Rating (1 to 5 Stars)
                      </label>

                      <div className="flex items-center gap-2 my-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = (hoverRating !== null ? hoverRating : rating) >= star
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="p-1 sm:p-1.5 transition-transform hover:scale-125 focus:outline-none"
                              aria-label={`${star} Stars`}
                            >
                              <Star
                                className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-200 ${
                                  active
                                    ? 'fill-[#f0b14b] text-[#ffd580] drop-shadow-[0_0_12px_rgba(240,177,75,0.8)]'
                                    : 'fill-transparent text-[#665a48] hover:text-[#d4a853]'
                                }`}
                              />
                            </button>
                          )
                        })}
                      </div>

                      <span className="font-sans text-xs font-medium text-[#cfc8b8]">
                        {RATING_LABELS[hoverRating || rating]}
                      </span>

                      {rating < 3 && (
                        <p className="font-sans text-[11px] text-[#e5a84b]/80 italic">
                          Note: Only ratings with 3 or more stars are displayed on the public live carousel.
                        </p>
                      )}
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name / Handle */}
                      <div>
                        <label className="block font-display text-[11px] uppercase tracking-[0.14em] text-[#e5a84b] font-semibold mb-1.5">
                          Your Name or Handle *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c785b]" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Rivera (@alex_sol)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#0a0704] border border-[#d4a853]/30 focus:border-[#f0b14b] focus:ring-1 focus:ring-[#f0b14b] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-[#6d6150] outline-none transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Project Name */}
                      <div>
                        <label className="block font-display text-[11px] uppercase tracking-[0.14em] text-[#e5a84b] font-semibold mb-1.5">
                          Project / Token Name *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c785b]" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Panda Coin / Meme Hub"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full bg-[#0a0704] border border-[#d4a853]/30 focus:border-[#f0b14b] focus:ring-1 focus:ring-[#f0b14b] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-[#6d6150] outline-none transition-all font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Optional Role */}
                    <div>
                      <label className="block font-display text-[11px] uppercase tracking-[0.14em] text-[#a8a192] font-semibold mb-1.5">
                        Your Role (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Founder, Marketing Lead, Co-Owner"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#0a0704] border border-[#d4a853]/20 focus:border-[#f0b14b] focus:ring-1 focus:ring-[#f0b14b] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#6d6150] outline-none transition-all font-sans"
                      />
                    </div>

                    {/* Review Feedback Textarea */}
                    <div>
                      <label className="block font-display text-[11px] uppercase tracking-[0.14em] text-[#e5a84b] font-semibold mb-1.5">
                        Review & Experience *
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the impact Nova Pow had on your community, raid engagement, and token momentum..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          className="w-full bg-[#0a0704] border border-[#d4a853]/30 focus:border-[#f0b14b] focus:ring-1 focus:ring-[#f0b14b] rounded-lg p-3.5 text-sm text-white placeholder-[#6d6150] outline-none transition-all font-sans resize-none"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <p className="text-red-400 text-xs font-sans bg-red-950/40 border border-red-800/50 rounded-lg p-2.5 text-center">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer mt-1"
                    >
                      {/* Hover Glow */}
                      <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#ffd580] via-[#f0b14b] to-[#c8892a] opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300 -z-10" />

                      {/* Chamfered Shape Background */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-all duration-300 group-hover/btn:brightness-110 shadow-[0_4px_20px_rgba(214,154,50,0.35)]"
                        style={{
                          clipPath:
                            'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                        }}
                      />

                      {/* Button Content */}
                      {isSubmitting ? (
                        <div className="relative z-10 flex items-center gap-2 text-[#120c04] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em]">
                          <Sparkles className="w-4 h-4 animate-spin" />
                          PUBLISHING REVIEW...
                        </div>
                      ) : (
                        <div className="relative z-10 flex items-center gap-2 text-[#120c04] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em]">
                          <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          PUBLISH REVIEW
                        </div>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
