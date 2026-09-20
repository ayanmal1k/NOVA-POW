import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/services-section'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#080604]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
    </main>
  )
}
