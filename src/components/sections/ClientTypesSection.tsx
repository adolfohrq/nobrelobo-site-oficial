import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../general/SectionHeader'
import { Rocket, Building, Layers, CheckCircle2 } from 'lucide-react'

interface ClientTypeSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

const ClientTypesSection: React.FC<ClientTypeSectionProps> = ({
  id,
  title = "Trabalhamos com Todos",
  subtitle = "De startups ousadas a grandes corporações, temos experiência para potencializar qualquer negócio."
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

  // Tipos de clientes
  const clientTypes = [
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Startups",
      description: "Ajudamos startups a conquistar mercado com estratégias ágeis e crescimento acelerado.",
      color: "from-orange-500 to-red-500",
      examples: [
        "Empresas de 2-30 pessoas",
        "Fase de validação ou scale-up",
        "Orçamento variável e criativo"
      ]
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "PMEs",
      description: "Transformamos negócios estabelecidos com modernização digital e otimização de processos.",
      color: "from-blue-500 to-cyan-500",
      examples: [
        "Empresas de 30-200 pessoas",
        "Busca de inovação e crescimento",
        "Processos estruturados"
      ]
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Corporações",
      description: "Parceiros estratégicos de grandes empresas em transformação digital e inovação.",
      color: "from-purple-500 to-pink-500",
      examples: [
        "Empresas 200+ pessoas",
        "Projetos complexos e estratégicos",
        "Múltiplas áreas e departamentos"
      ]
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
          badge="Nossos Clientes"
          floatingTitleText="Clientes"
          iconComponent={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 15H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        {/* Grid de tipos de clientes */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clientTypes.map((clientType, idx) => (
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
                <div className={`absolute inset-0 bg-gradient-to-br ${clientType.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Glow effect */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${clientType.color} rounded-full filter blur-3xl opacity-20`}
                ></motion.div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Ícone com animação */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${clientType.color} flex items-center justify-center mb-6 text-white shadow-lg shadow-primary/20`}
                  >
                    {clientType.icon}
                  </motion.div>

                  {/* Conteúdo */}
                  <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {clientType.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed mb-8 flex-grow">
                    {clientType.description}
                  </p>

                  {/* Exemplos animados */}
                  <motion.div
                    className="space-y-3"
                  >
                    {clientType.examples.map((example, exIdx) => (
                      <motion.div
                        key={exIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (idx * 0.1) + (exIdx * 0.1) }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">
                          {example}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ClientTypesSection
