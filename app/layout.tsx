import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
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

export const metadata: Metadata = {
  title: 'Nova Pow',
  description: 'Nova Pow — Premium Experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${astronomus.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
