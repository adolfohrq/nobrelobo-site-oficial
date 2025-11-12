import React from 'react'
import Layout from '../components/general/Layout'
import SEO from '../components/general/SEO'
import Hero from '../components/general/Hero'
import PortfolioSection from '../components/sections/PortfolioSection'
import ContactSection from '../components/sections/ContactSection'
import CtaSection from '../components/sections/CtaSection'
import ServicesSection from '../components/sections/ServicesSection'
import IntroductionSection from '../components/sections/IntroductionSection'
import SectionDivider from '../components/general/SectionDivider'
import WhyChooseNobreLoboSection from '../components/sections/WhyChooseNobreLoboSection'
import MethodologySection from '../components/sections/MethodologySection'

const HomePage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Nobre Lobo - Agência de Marketing Digital"
        description="Transforme sua presença digital com a Nobre Lobo. Especialistas em Design Gráfico, Social Media, SEO, Tráfego Pago e Desenvolvimento Web."
        keywords="marketing digital, design gráfico, social media, SEO, tráfego pago, desenvolvimento web, agência de marketing"
      />
      <Hero />

      <SectionDivider />

      <ServicesSection />

      <SectionDivider />

      <WhyChooseNobreLoboSection />

      <SectionDivider />

      <MethodologySection />

      <SectionDivider />

      <PortfolioSection />

      <SectionDivider />

      <ContactSection />
    </Layout>
  )
}

export default HomePage 