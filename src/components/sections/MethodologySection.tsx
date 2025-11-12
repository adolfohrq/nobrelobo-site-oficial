import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../general/SectionHeader'
import { Globe, Layers, TrendingUp } from 'lucide-react'

interface MethodologySectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

const MethodologySection: React.FC<MethodologySectionProps> = ({
  id,
  title = "Como Trabalhamos",
  subtitle = "Um processo comprovado que garante resultados consistentes e mensuráveis."
}) => {
  // Referência para animação de scroll
  const sectionRef = useRef<HTMLElement>(null);

  // Efeitos de scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [50, 0, 0]);

  // Processo simplificado
  const processSteps = [
    {
      number: "01",
      title: "Descoberta & Análise",
      description: "Mergulhamos no seu negócio, concorrência e mercado para entender profundamente seus desafios e oportunidades.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Estratégia & Planejamento",
      description: "Criamos um roadmap personalizado com objetivos claros, KPIs mensuráveis e timeline realista.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Execução & Otimização",
      description: "Implementamos com precisão e refinamos continuamente baseado em dados reais para maximizar resultados.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ]

  return (
    <section ref={sectionRef} id={id} className="py-16 md:py-20 relative overflow-hidden">
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        {/* Cabeçalho da seção */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge="Nossa Metodologia"
          floatingTitleText="Processo"
          iconComponent={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mt-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex gap-8 mb-12 last:mb-0"
            >
              {/* Linha conectora */}
              {index !== processSteps.length - 1 && (
                <div className="absolute left-[2.6rem] top-24 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
              )}

              {/* Número e ícone */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary flex flex-col items-center justify-center">
                    <span className="text-2xl font-gilroy font-bold text-primary mb-1">{step.number}</span>
                    <div className="text-primary/70">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-2xl font-gilroy font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default MethodologySection
