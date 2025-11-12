import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../general/SectionHeader'
import { Target, Users, Lightbulb, Heart, Zap, Shield, CheckCircle2, LucideIcon } from 'lucide-react'

interface ValuesSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({
  id,
  title = "O que nos Move",
  subtitle = "Princípios que guiam cada decisão e projeto que realizamos"
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

  // Valores da empresa
  const values: ValueItem[] = [
    {
      icon: Target,
      title: 'Excelência',
      description: 'Comprometidos em superar expectativas em cada entrega.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalhamos lado a lado com nossos clientes como verdadeiros parceiros.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Sempre explorando novas tecnologias e abordagens criativas.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Paixão',
      description: 'Amamos o que fazemos e isso se reflete em cada projeto.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Zap,
      title: 'Agilidade',
      description: 'Processos otimizados para entregas rápidas sem perder qualidade.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Confiança',
      description: 'Transparência e integridade em todas as nossas relações.',
      color: 'from-indigo-500 to-violet-500'
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
          badge="Nossos Valores"
          floatingTitleText="Valores"
          iconComponent={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        {/* Grid de valores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {values.map((value, idx) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative h-full"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full hover:border-primary/30 transition-all duration-500 overflow-hidden">
                  {/* Gradiente de fundo */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                  {/* Glow effect */}
                  <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${value.color} rounded-full filter blur-3xl opacity-20`}
                  ></motion.div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Ícone com animação */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 text-white shadow-lg shadow-primary/20`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>

                    {/* Conteúdo */}
                    <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed flex-grow">
                      {value.description}
                    </p>

                    {/* Indicador visual */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-primary mt-6 pt-4 border-t border-white/10"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Valor fundamenta</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default ValuesSection
