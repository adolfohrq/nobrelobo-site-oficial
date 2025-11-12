import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../general/SectionHeader';
import { Users } from 'lucide-react';

const LeaderSection: React.FC = () => {
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
      className="relative py-10 overflow-hidden"
      id="lideranca"
    >
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        {/* Header da seção usando SectionHeader */}
        <SectionHeader
          title={
            <>
              Liderança
              <span className="text-primary block">Visionária</span>
            </>
          }
          subtitle="Conheça quem está à frente da transformação digital, liderando com paixão, estratégia e compromisso com resultados excepcionais."
          badge="CEO & Fundador"
          floatingTitleText="LIDERANÇA"
          iconComponent={
            <Users className="w-8 h-8 text-primary" />
          }
        />

        <div className="max-w-5xl mx-auto mt-20">
          {/* Conteúdo Central Minimalista */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* Imagem - 2 colunas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/adolfo.png"
                  alt="Adolfo Henrique Nack Borba - CEO da Nobre Lobo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Conteúdo - 3 colunas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Nome e título */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-gilroy font-bold text-white mb-3 leading-tight">
                  Adolfo Henrique<br />Nack Borba
                </h2>
                <p className="text-xl text-white/60">
                  Liderando a transformação digital com visão estratégica
                </p>
              </div>

              {/* Métricas simplificadas - apenas 3 */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
                <div>
                  <div className="text-3xl font-gilroy font-bold text-primary mb-1">8+</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Anos</div>
                </div>
                <div>
                  <div className="text-3xl font-gilroy font-bold text-primary mb-1">350+</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Projetos</div>
                </div>
                <div>
                  <div className="text-3xl font-gilroy font-bold text-primary mb-1">98%</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Sucesso</div>
                </div>
              </div>

              {/* Descrição curta */}
              <p className="text-white/80 text-lg leading-relaxed">
                Fundador da Nobre Lobo, combina criatividade e estratégia para criar
                soluções digitais que geram resultados mensuráveis e transformam negócios.
              </p>
            </motion.div>
          </div>

          {/* Citação minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center max-w-3xl mx-auto"
          >
            <blockquote className="text-2xl lg:text-3xl font-gilroy text-white/90 italic leading-relaxed">
              "Transformar é unir estratégia, pessoas e propósito."
            </blockquote>
            <p className="text-primary font-medium mt-4">— Adolfo Henrique</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeaderSection;

