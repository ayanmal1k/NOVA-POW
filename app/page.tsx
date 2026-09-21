import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/services-section'
import ProjectsSection from '@/components/projects-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import GoldParticlesBg from '@/components/gold-particles-bg'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#080604] relative">
      <GoldParticlesBg />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
