import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../general/SectionHeader'
import { Target, Award, CheckCircle2 } from 'lucide-react'

interface MissionMetric {
  number: string
  label: string
}

interface MissionSectionProps {
  badge?: string
  title: string
  titleHighlight: string
  description: string
  image?: string
  imageAlt?: string
  metrics?: MissionMetric[]
  className?: string
}

const MissionSection: React.FC<MissionSectionProps> = ({
  badge = "Nossa Missão",
  title,
  titleHighlight,
  description,
  image,
  imageAlt = "Nossa Missão",
  metrics = [
    { number: '8+', label: 'Anos de Experiência' },
    { number: '200+', label: 'Projetos Entregues' }
  ],
  className = ""
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

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 md:py-20 overflow-hidden ${className}`}
      id="missao"
    >
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        {/* Header da seção usando SectionHeader */}
        <SectionHeader
          title={
            <>
              {title}
              <span className="text-primary block">{titleHighlight}</span>
            </>
          }
          subtitle={description}
          badge={badge}
          floatingTitleText="MISSÃO"
          iconComponent={
            <Target className="w-8 h-8 text-primary" />
          }
        />

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            {image && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </motion.div>
            )}

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Mission Description Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-gilroy font-bold text-white">
                      Nossa Missão
                    </h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed text-lg">
                  {description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-5xl font-gilroy font-bold text-primary mb-3"
                      >
                        {metric.number}
                      </motion.div>
                      <div className="text-white/70 font-medium text-sm">
                        {metric.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key Points */}
              <div className="space-y-3 pt-4">
                {[
                  "Transformar ideias em experiências digitais extraordinárias",
                  "Conectar marcas com pessoas de forma autêntica",
                  "Entregar resultados mensuráveis e impactantes"
                ].map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 leading-relaxed">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default MissionSection
