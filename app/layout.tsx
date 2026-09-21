import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

/* ── Google Font: Poppins ─────────────────────────────────── */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

/* ── Custom Font: Astronomus (from public/) ───────────────── */
const astronomus = localFont({
  src: '../public/astronomus/Astronomus.ttf',
  variable: '--font-astronomus',
  display: 'swap',
})

/* ── Viewport Settings ────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: '#080604',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ── Comprehensive SEO / AEO / GEO Metadata ───────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://novapow.com'),
  title: {
    default: 'Nova — Web3 Community & Growth Specialist | Nova Pow',
    template: '%s | Nova Pow',
  },
  description:
    'Expert Web3 Community Manager, Growth Strategist & Marketing Specialist. Scaling decentralized ecosystems, memecoins, DeFi protocols, and launchpads with high-impact community raids, KOL marketing, and strategic execution.',
  applicationName: 'Nova Pow',
  authors: [{ name: 'Nova', url: 'https://x.com/Bitzygirl01' }],
  generator: 'Next.js',
  keywords: [
    'Nova',
    'Nova Pow',
    'Web3 Community Manager',
    'Crypto Growth Specialist',
    'Web3 Marketing Strategist',
    'Meme Coin Marketing',
    'Telegram Community Manager',
    'KOL Marketing Web3',
    'Crypto Ambassador Program',
    'Crypto Raiding & Shilling',
    'Crypto Community Moderator',
    'Web3 Staking & Launchpad',
    'Crypto Twitter Specialist',
    'Solana Meme Coin Growth',
    'Ethereum Community Builder',
    'Decentralized Ecosystem Scaling',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Nova',
  publisher: 'Nova Pow',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/icon.jpeg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/icon.jpeg', sizes: '512x512', type: 'image/jpeg' },
    ],
    shortcut: '/icon.jpeg',
    apple: [{ url: '/icon.jpeg', sizes: '180x180', type: 'image/jpeg' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novapow.com',
    title: 'Nova — Web3 Community & Growth Specialist | Nova Pow',
    description:
      'I help Web3 projects grow through hyper-engaged community management, KOL campaigns, viral marketing, and strategic launch execution.',
    siteName: 'Nova Pow',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Nova — Web3 Community & Growth Specialist Banner',
      },
      {
        url: '/icon.jpeg',
        width: 600,
        height: 600,
        type: 'image/jpeg',
        alt: 'Nova Pow Avatar & Logo',
      },
      {
        url: '/hero-text.png',
        width: 800,
        height: 350,
        type: 'image/png',
        alt: 'NOVA Official Brand Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova — Web3 Community & Growth Specialist | Nova Pow',
    description:
      'I help Web3 projects grow through community management, marketing, and strategic execution.',
    creator: '@Bitzygirl01',
    site: '@Bitzygirl01',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Nova — Web3 Community & Growth Specialist',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://novapow.com',
  },
  other: {
    // Platform-Specific Share & Discovery Hooks
    'telegram:channel': '@NOVA_pow',
    'telegram:creator': '@Web_3_nova',
    'twitter:image:alt': 'Nova — Web3 Community & Growth Specialist',
    'og:image:width': '1200',
    'og:image:height': '630',
    // GEO Metadata for Global & Localized Search
    'geo.region': 'US',
    'geo.placename': 'Global Web3',
    'distribution': 'Global',
    'rating': 'General',
    // AEO Knowledge Engine Hooks
    'aeo:entity': 'Nova (Web3 Community Specialist)',
    'aeo:expertise': 'Web3 Community Management, Growth Marketing, KOL Campaigns, Meme Coin Launches',
  },
}

/* ── JSON-LD Structured Data Schema (SEO + AEO Entity Graph) ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://novapow.com/#person',
      name: 'Nova',
      alternateName: 'Nova Pow',
      jobTitle: 'Web3 Community & Growth Specialist',
      description:
        'Professional Web3 Community Manager, Moderator, and Growth Marketing Strategist specializing in crypto tokens, launchpads, and decentralized communities.',
      image: 'https://novapow.com/icon.jpeg',
      url: 'https://novapow.com',
      sameAs: [
        'https://x.com/Bitzygirl01',
        'https://t.me/Web_3_nova',
        'https://t.me/NOVA_pow',
      ],
      knowsAbout: [
        'Web3 Community Management',
        'KOL Marketing & Creator Partnerships',
        'Ambassador Programs',
        'Telegram & Discord Moderation',
        'Crypto Raiding & Social Shilling',
        'Token Launchpad Strategies',
        'Memecoin Growth Marketing',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://novapow.com/#service',
      name: 'Nova Pow Web3 Growth Services',
      url: 'https://novapow.com',
      image: 'https://novapow.com/icon.jpeg',
      description:
        'Full-stack Web3 community growth, Telegram moderation, social raiding, and marketing consultancy.',
      provider: {
        '@id': 'https://novapow.com/#person',
      },
      areaServed: 'Worldwide',
      serviceType: [
        'Community Management',
        'KOL & Marketing',
        'Ambassador Program Management',
        'Raiding & Shilling',
        'Web3 Strategy & Consulting',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://novapow.com/#website',
      url: 'https://novapow.com',
      name: 'Nova Pow',
      description: 'Official portfolio and proof of work for Nova — Web3 Community Specialist.',
      publisher: {
        '@id': 'https://novapow.com/#person',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Inject Structured Data for AI & Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${astronomus.variable} font-sans antialiased bg-[#080604] text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
