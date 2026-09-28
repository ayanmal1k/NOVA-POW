'use client'

import React, { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Star, MessageSquarePlus, Sparkles, CheckCircle2, ShieldCheck, Quote } from 'lucide-react'
import { subscribeToFirebaseReviews, ReviewItem } from '@/lib/firebase'
import WriteReviewModal from '@/components/write-review-modal'

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

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
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

// Single Review Card in the ongoing Carousel
function ReviewCard({ review }: { review: ReviewItem }) {
  // Only 3, 4, 5 stars
  const starsCount = Math.min(5, Math.max(3, Number(review.rating) || 5))

  return (
    <div className="group relative w-[310px] sm:w-[360px] md:w-[400px] flex-shrink-0 p-5 sm:p-6 transition-all duration-300 select-none">
      {/* ── Outer Golden Ambient Hover Glow ── */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-gradient-to-b from-[#f0b14b]/25 via-[#c8892a]/15 to-transparent -z-10 pointer-events-none"
        style={{
          clipPath:
            'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
        }}
      />

      {/* ── Chamfered Border & Container ── */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#d4a853]/70 via-[#8c6527]/50 to-[#d4a853]/40 p-[1.5px] transition-all duration-300 group-hover:from-[#ffd580] group-hover:via-[#e5a53d] group-hover:to-[#ffd580]"
        style={{
          clipPath:
            'polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)',
        }}
      >
        {/* Inner Card Background */}
        <div
          className="w-full h-full bg-gradient-to-b from-[#161009] via-[#0e0a06] to-[#070503]"
          style={{
            clipPath:
              'polygon(21px 0, calc(100% - 21px) 0, 100% 21px, 100% calc(100% - 21px), calc(100% - 21px) 100%, 21px 100%, 0 calc(100% - 21px), 0 21px)',
          }}
        />
      </div>

      {/* Sci-Fi Diagonal Corner Accent Markings */}
      <svg
        className="absolute top-3 left-3 w-6 h-6 pointer-events-none text-[#e5a84b]/60 group-hover:text-[#ffd580] transition-colors z-20"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path d="M2 18 L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none text-[#e5a84b]/60 group-hover:text-[#ffd580] transition-colors z-20"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path d="M12 28 L28 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Row: Stars + Project Tag */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            {/* Stars Row */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                    starIndex <= starsCount
                      ? 'fill-[#f0b14b] text-[#ffd580] drop-shadow-[0_0_8px_rgba(240,177,75,0.7)]'
                      : 'fill-transparent text-[#5c4e3e]'
                  }`}
                />
              ))}
              <span className="font-display text-xs font-bold text-[#f0b14b] ml-1">
                {starsCount}.0
              </span>
            </div>

            {/* Verified Badge */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5a84b]/10 border border-[#e5a84b]/30">
              <ShieldCheck className="w-3 h-3 text-[#e5a84b]" />
              <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-[#e5a84b]">
                Verified
              </span>
            </div>
          </div>

          {/* Project Name Pill */}
          <div className="mb-3">
            <span className="inline-block font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.08em] text-[#ffd580] bg-[#e5a84b]/10 px-2.5 py-1 rounded border border-[#e5a84b]/20">
              {review.projectName}
            </span>
          </div>

          {/* Review Text Quote */}
          <div className="relative my-2">
            <Quote className="absolute -top-1.5 -left-1 w-5 h-5 text-[#e5a84b]/20 rotate-180 pointer-events-none" />
            <p className="font-sans text-xs sm:text-sm text-[#cfc8b8] leading-relaxed pl-3 italic line-clamp-4 group-hover:text-white transition-colors">
              &ldquo;{review.review}&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom Reviewer Info */}
        <div className="mt-4 pt-3 border-t border-[#e5a84b]/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Avatar Initials Circle */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8c6527] to-[#e5a84b] flex items-center justify-center text-[#120c04] font-display font-bold text-xs shadow-[0_0_10px_rgba(229,168,75,0.3)]">
              {review.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'N'}
            </div>

            <div>
              <h4 className="font-display text-xs sm:text-[13px] font-bold text-white group-hover:text-[#ffd580] transition-colors">
                {review.name}
              </h4>
              <p className="font-sans text-[11px] text-[#a8a192]">
                {review.role || 'Web3 Partner'}
              </p>
            </div>
          </div>

          {/* Star Accent */}
          <Sparkles className="w-4 h-4 text-[#e5a84b]/40 group-hover:text-[#e5a84b] transition-colors" />
        </div>
      </div>
    </div>
  )
}

export default function RatingSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Realtime subscription to Firebase reviews (filtered >= 3 stars)
  useEffect(() => {
    const unsubscribe = subscribeToFirebaseReviews((fetchedReviews) => {
      // Strictly only 3 or above stars
      const filtered = fetchedReviews.filter((r) => Number(r.rating) >= 3)
      setReviews(filtered)
    })
    return () => unsubscribe()
  }, [])

  // Optimistic review addition
  const handleReviewSubmitted = (newReview: ReviewItem) => {
    if (newReview.rating >= 3) {
      setReviews((prev) => [newReview, ...prev])
    }
  }

  // Calculate real metrics from real reviews
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
      : '5.0'

  // Repeat real reviews to create a smooth infinite marquee loop
  const repeatCount = reviews.length > 4 ? 3 : reviews.length > 0 ? 6 : 0
  const marqueeReviews = Array(repeatCount).fill(reviews).flat()

  return (
    <section
      id="reviews"
      className="relative w-full overflow-hidden bg-[#080604] text-white py-20 md:py-28 border-t border-[#d4a853]/10"
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e5a84b]/6 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e5a84b]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#e5a84b]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Section Header & CTAs ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16"
        >
          {/* Left: Headline + Tag */}
          <motion.div variants={headerVariants} className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#e5a84b]" />
              <span className="font-display text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#e5a84b] font-semibold">
                RATE MY SERVICES
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] uppercase font-extrabold leading-[1.1] tracking-[0.03em]">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                CLIENT REVIEWS &{' '}
              </span>
              <span className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(229,168,75,0.35)]">
                RATINGS
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base md:text-lg font-sans text-[#cfc8b8] leading-relaxed">
              Real feedback from founders, project teams, and Web3 communities. Every review is live, verified, and saved to Firebase.
            </p>
          </motion.div>

          {/* Right: Average Score & Write Review CTA */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6"
          >
            {/* Rating Highlight Pill */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#150f08]/90 border border-[#e5a84b]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#f0b14b]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(Number(avgRating))
                          ? 'fill-[#f0b14b] text-[#ffd580]'
                          : 'fill-transparent text-[#5c4e3e]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-display text-[11px] uppercase tracking-wider text-[#a8a192] mt-0.5">
                  {avgRating} / 5.0 Rating Avg
                </span>
              </div>
              <div className="h-8 w-[1px] bg-[#e5a84b]/20" />
              <div className="flex flex-col">
                <span className="font-display text-base font-bold text-white">
                  {reviews.length}
                </span>
                <span className="font-display text-[10px] uppercase tracking-wider text-[#a8a192]">
                  {reviews.length === 1 ? 'Real Review' : 'Real Reviews'}
                </span>
              </div>
            </div>

            {/* "Write a Review" Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {/* Golden Ambient Glow */}
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#ffd580] via-[#f0b14b] to-[#c8892a] opacity-50 blur-md group-hover/btn:opacity-90 group-hover/btn:blur-lg transition-all duration-300 -z-10" />

              {/* Chamfered Shape Background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] transition-all duration-300 group-hover/btn:brightness-110 shadow-[0_4px_20px_rgba(214,154,50,0.35)]"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
              />

              {/* Button Inner Content */}
              <MessageSquarePlus className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#120c04] transition-transform group-hover/btn:rotate-12" />
              <span className="relative z-10 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#120c04]">
                WRITE A REVIEW
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Reviews Carousel / Empty State ── */}
      {reviews.length === 0 ? (
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="relative max-w-2xl mx-auto p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#161009] via-[#0d0905] to-[#070503] border border-[#e5a84b]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center flex flex-col items-center">
            {/* Top Stars Icon */}
            <div className="flex items-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-6 h-6 fill-[#f0b14b] text-[#ffd580] drop-shadow-[0_0_10px_rgba(240,177,75,0.8)] animate-pulse"
                />
              ))}
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-white mb-2">
              BE THE FIRST TO RATE MY SERVICES
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#cfc8b8] max-w-lg mb-6 leading-relaxed">
              Have you worked with Nova Pow on community building, meme marketing, or telegram raids? Click below to share your experience and get featured on the live showcase.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative inline-flex items-center justify-center gap-2.5 px-7 py-3 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#ffd580] to-[#c8892a] opacity-50 blur-md group-hover/btn:opacity-90 transition-opacity -z-10" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a]"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              />
              <Sparkles className="relative z-10 w-4 h-4 text-[#120c04]" />
              <span className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#120c04]">
                WRITE FIRST REVIEW
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* ── Ongoing Continuous Infinite Carousel ── */
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right Fade Masks for Smooth Infinite Flow */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#080604] via-[#080604]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#080604] via-[#080604]/80 to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex w-full group/marquee">
            <div className="flex gap-6 sm:gap-8 animate-marquee group-hover/marquee:[animation-play-state:paused]">
              {marqueeReviews.map((reviewItem, idx) => (
                <ReviewCard key={`${reviewItem.id || 'rev'}-${idx}`} review={reviewItem} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal for Submitting New Review ── */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  )
}
