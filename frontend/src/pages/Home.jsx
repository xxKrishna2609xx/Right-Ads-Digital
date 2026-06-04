import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import AboutSection from '../components/home/AboutSection'
import ServicesSection from '../components/home/ServicesSection'
import VisionSection from '../components/home/VisionSection'
import TeamSection from '../components/home/TeamSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import ContactSection from '../components/home/ContactSection'
import CTABanner from '../components/home/CTABanner'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <VisionSection />
      <TeamSection />
      <TestimonialsSection />
      <CTABanner />
      <ContactSection />
    </main>
  )
}
