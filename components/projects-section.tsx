'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

interface ProjectItem {
  name: string
  role: string
  image: string
}

const projects: ProjectItem[] = [
  {
    name: 'PANDA COIN',
    role: 'Marketer',
    image: '/projects/panda coin.jpeg',
  },
  {
    name: 'MEME RESTAURANT',
    role: 'Co-Owner',
    image: '/projects/meme rerstaurant.jpeg',
  },
  {
    name: 'SPARK D',
    role: 'Moderator',
    image: '/projects/spark d.jpeg',
  },
  {
    name: 'UFC',
    role: 'Community Manager',
    image: '/projects/ufc.jpeg',
  },
  {
    name: 'VANCAT',
    role: 'Moderator',
    image: '/projects/vancat.jpeg',
  },
  {
    name: 'SPAGHETTI',
    role: 'Moderator',
    image: '/projects/spaghetti.jpeg',
  },
  {
    name: 'PIGEON',
    role: 'Community Manager',
    image: '/projects/pigeon.jpeg',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -7, transition: { duration: 0.25 } }}
      className="group relative w-full flex flex-col p-5 sm:p-6 transition-all duration-300 justify-between select-none"
    >
      {/* ── Outer Golden Ambient Hover Glow ── */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-gradient-to-b from-[#f0b14b]/30 via-[#c8892a]/15 to-transparent -z-10 pointer-events-none"
        style={{
          clipPath:
            'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
        }}
      />

      {/* ── Outer Chamfered Border & Background ── */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#d4a853]/90 via-[#8c6527]/70 to-[#d4a853]/60 p-[1.5px] transition-all duration-300 group-hover:from-[#ffd580] group-hover:via-[#e5a53d] group-hover:to-[#ffd580]"
        style={{
          clipPath:
            'polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)',
        }}
      >
        {/* Inner Card Solid Dark Surface */}
        <div
          className="w-full h-full bg-gradient-to-b from-[#150f08] via-[#0d0905] to-[#070503]"
          style={{
            clipPath:
              'polygon(21px 0, calc(100% - 21px) 0, 100% 21px, 100% calc(100% - 21px), calc(100% - 21px) 100%, 21px 100%, 0 calc(100% - 21px), 0 21px)',
          }}
        />
      </div>

      {/* ── Sci-Fi Corner Markings & Accents ── */}
      {/* Top-Left Diagonal Inner Accent Line */}
      <svg
        className="absolute top-3 left-3 w-8 h-8 pointer-events-none text-[#e5a84b]/70 group-hover:text-[#ffd68a] transition-colors z-20"
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

      {/* Bottom-Right Diagonal Inner Accent Line */}
      <svg
        className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none text-[#e5a84b]/70 group-hover:text-[#ffd68a] transition-colors z-20"
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

      {/* ── Big Full-Width Square / Rectangular Project Image ── */}
      <div className="relative z-10 w-full overflow-hidden rounded-xl border border-[#d4a853]/30 group-hover:border-[#e5a84b]/70 bg-black/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 select-none"
          />
          {/* Subtle Ambient Golden Gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {/* ── Bottom Project Information: Name & Role ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-5 pt-1">
        {/* Project Name (Astronomus) */}
        <h3 className="font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.06em] text-[#f7f2e4] group-hover:text-[#ffd68a] transition-colors duration-300">
          {project.name}
        </h3>

        {/* Role Pill / Badge */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e5a84b]/10 border border-[#e5a84b]/30 group-hover:border-[#e5a84b]/70 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5a84b] animate-pulse" />
          <span className="font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#e5a84b]">
            {project.role}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const rowOne = projects.slice(0, 4)
  const rowTwo = projects.slice(4, 7)

  return (
    <section id="work" className="relative w-full overflow-hidden bg-[#080604] text-white py-20 md:py-28 lg:py-32">
      {/* ── Background Glow Accents ── */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#e5a84b]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#e5a84b]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Full Width Content Layer ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        {/* ── Top Header Row ── */}
        <div className="max-w-3xl mb-14 md:mb-16">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#e5a84b]" />
            <span className="font-display text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#e5a84b] font-semibold">
              PROOF OF WORK
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] uppercase font-extrabold leading-[1.08] tracking-[0.03em]">
            <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
              FEATURED{' '}
            </span>
            <span className="bg-gradient-to-r from-[#f0b14b] via-[#e5a53d] to-[#c8892a] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(229,168,75,0.35)]">
              PROJECTS
            </span>
          </h2>

          {/* Description (Poppins) */}
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-sans font-normal text-[#cfc8b8] leading-relaxed max-w-2xl">
            A selection of Web3 projects I&apos;ve worked on, from community growth to full-stack support and launch campaigns.
          </p>
        </div>

        {/* ── Projects Grid Layout: Full Width (4 in Row 1, 3 in Row 2) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-6 sm:gap-8 w-full"
        >
          {/* Row 1: 4 Cards Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            {rowOne.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* Row 2: 3 Cards Centered Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-center gap-6 sm:gap-8 w-full">
            {rowTwo.map((project, index) => (
              <div key={index} className="w-full lg:w-[calc(25%-18px)]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
