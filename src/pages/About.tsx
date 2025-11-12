import React from 'react';
import Layout from '../components/general/Layout';
import { motion } from 'framer-motion';
import SectionHeader from '../components/general/SectionHeader';
import ContactSection from '../components/sections/ContactSection';
import OurProcessSection from '../components/sections/OurProcessSection';
import HeroPages from '../components/general/HeroPages';
import MissionSection from '../components/sections/MissionSection';
import LeaderSection from '../components/sections/LeaderSection';
import ClientTypesSection from '../components/sections/ClientTypesSection';
import ValuesSection from '../components/sections/ValuesSection';
import SectionDivider from '../components/general/SectionDivider';


const About: React.FC = () => {
  // Valores da empresa
  const companyValues = [
    {
      icon: '🎯',
      title: 'Excelência',
      description: 'Buscamos a excelência em cada detalhe, superando expectativas e entregando resultados excepcionais.',
      delay: 0.1,
    },
    {
      icon: '🤝',
      title: 'Colaboração',
      description: 'Trabalhamos em estreita colaboração com nossos clientes, construindo parcerias duradouras baseadas em confiança.',
      delay: 0.2,
    },
    {
      icon: '💡',
      title: 'Inovação',
      description: 'Estamos constantemente explorando novas tecnologias e abordagens para oferecer soluções inovadoras.',
      delay: 0.3,
    },
    {
      icon: '⏱️',
      title: 'Compromisso',
      description: 'Cumprimos prazos e compromissos, mantendo comunicação transparente durante todo o processo.',
      delay: 0.4,
    },
    {
      icon: '📈',
      title: 'Resultados',
      description: 'Focamos em entregar resultados mensuráveis que impactam positivamente o negócio dos nossos clientes.',
      delay: 0.5,
    },
    {
      icon: '🔄',
      title: 'Adaptabilidade',
      description: 'Adaptamos nossas estratégias às mudanças do mercado e às necessidades específicas de cada cliente.',
      delay: 0.6,
    },
  ];

  // Dados de métricas e resultados
  const metricsData = [
    { label: 'Projetos Concluídos', value: '350+', suffix: 'desde 2018' },
    { label: 'Clientes Satisfeitos', value: '98%', suffix: 'taxa de retenção' },
    { label: 'Prêmios Conquistados', value: '27', suffix: 'reconhecimentos' },
    { label: 'Equipe Especializada', value: '32', suffix: 'profissionais' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroPages 
        title="SOBRE <br />NÓS<span class='text-primary'>.</span>"
        subtitle="Conheça a história, valores e a equipe por trás da Nobre Lobo, uma agência digital comprometida com a excelência e resultados extraordinários."
        badge="Sobre Nós"
        backgroundImage="/lobo-hero-about.jpg"
        height="h-[50vh] sm:h-[55vh] md:h-[60vh]"
        imageStyle={{
          objectFit: "cover",
          objectPosition: "center",
          brightness: "70",
          contrast: "120",
          scale: 1.1
        }}
      />


        {/* Section 1: Nossa Missão */}
        <MissionSection
          badge="Nossa Missão"
          title="Transformar Ideias em"
          titleHighlight="Realidade Digital"
          description="Transformar ideias em experiências digitais extraordinárias que conectam marcas com pessoas de forma autêntica e impactante. Criamos soluções que não apenas funcionam, mas que inspiram e transformam."
          image="/lobo-hero3.jpg"
          imageAlt="Nossa Missão"
          metrics={[
            { number: '8+', label: 'Anos de Experiência' },
            { number: '200+', label: 'Projetos Entregues' }
          ]}
        />

      {/* Seção do Líder */}
      <LeaderSection />

      <SectionDivider />

      <ValuesSection />

      <SectionDivider />

      <OurProcessSection />

      <SectionDivider />

      <ClientTypesSection />

    </Layout>
  );
};

export default About;