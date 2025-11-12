import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../general/SectionHeader'
import { Target, TrendingUp, Zap, Shield, Users, Award, CheckCircle } from 'lucide-react'

interface WhyChooseNobreLoboSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

const WhyChooseNobreLoboSection: React.FC<WhyChooseNobreLoboSectionProps> = ({
  id,
  title = "Por Que Escolher a Nobre Lobo",
  subtitle = "Somos mais que uma agência. Somos seu parceiro estratégico na jornada digital, combinando expertise técnica com visão de negócios para entregar resultados excepcionais."
}) => {
  // Referência para animação de scroll
  const sectionRef = useRef<HTMLElement>(null);
  
  // Efeitos de scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [100, 0, 0]);

  // Dados de benefícios principais
  const mainBenefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Estratégia Personalizada",
      description: "Cada marca é única. Criamos estratégias sob medida que refletem sua essência e objetivos específicos.",
      color: "from-primary/20 to-primary/5",
      features: ["Análise profunda do mercado", "Estratégia customizada", "Roadmap detalhado"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Crescimento Acelerado",
      description: "Resultados mensuráveis que impulsionam seu ROI. Crescimento consistente é nosso compromisso.",
      color: "from-blue-500/20 to-blue-500/5",
      features: ["ROI comprovado", "Crescimento sustentável", "Métricas transparentes"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Execução Ágil",
      description: "Metodologias modernas para entregas rápidas sem comprometer a qualidade. Agilidade é nossa vantagem.",
      color: "from-purple-500/20 to-purple-500/5",
      features: ["Metodologia ágil", "Entregas rápidas", "Qualidade garantida"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Confiança & Transparência",
      description: "Comunicação clara, relatórios detalhados e total transparência em cada etapa do projeto.",
      color: "from-green-500/20 to-green-500/5",
      features: ["Relatórios detalhados", "Comunicação clara", "Suporte 24/7"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Time Especializado",
      description: "Profissionais experientes e apaixonados, prontos para elevar sua marca ao próximo nível.",
      color: "from-orange-500/20 to-orange-500/5",
      features: ["Especialistas certificados", "Experiência comprovada", "Atualização constante"]
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excelência Reconhecida",
      description: "Prêmios, certificações e um portfólio que fala por si. Qualidade é nosso padrão.",
      color: "from-pink-500/20 to-pink-500/5",
      features: ["Certificações internacionais", "Prêmios de excelência", "Portfólio sólido"]
    }
  ];

  // Estatísticas impressionantes
  const stats = [
    { value: "350+", label: "Projetos Entregues", sublabel: "com excelência" },
    { value: "98%", label: "Satisfação", sublabel: "dos clientes" },
    { value: "5x", label: "ROI Médio", sublabel: "dos nossos clientes" },
    { value: "24/7", label: "Suporte", sublabel: "quando você precisa" }
  ];

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
          badge="Nossos Diferenciais"
          floatingTitleText="Escolha"
          iconComponent={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        {/* Estatísticas impressionantes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/30 transition-all duration-500 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-gilroy font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-white font-medium text-lg">{stat.label}</div>
                <div className="text-white/50 text-sm">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Grid de benefícios principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full hover:border-primary/30 transition-all duration-500">
                {/* Gradiente de fundo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Conteúdo */}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-2xl font-gilroy font-bold text-white mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Features específicas */}
                  <ul className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/60 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 lg:p-12">
            <h3 className="text-3xl md:text-4xl font-gilroy font-bold text-white mb-4">
              Pronto Para Começar Sua <span className="text-primary">Transformação Digital?</span>
            </h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Agende uma consultoria gratuita e descubra como podemos impulsionar seu negócio para o próximo nível.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-gilroy font-bold px-8 py-4 rounded-xl group flex items-center"
              >
                Agendar Consultoria Gratuita
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              
              <div className="flex items-center gap-3 text-white/70">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Sem compromisso • 100% gratuito</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default WhyChooseNobreLoboSection
