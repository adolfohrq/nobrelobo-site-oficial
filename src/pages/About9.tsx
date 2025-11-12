import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/general/Layout';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Users, Target, Lightbulb, Heart, Zap, Shield } from 'lucide-react';

const About9: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Timeline data
  const timeline = [
    {
      year: '2018',
      title: 'Fundação',
      description: 'Iniciamos nossa jornada com o sonho de transformar o marketing digital.',
      metric: '3 fundadores'
    },
    {
      year: '2019',
      title: 'Primeiro Prêmio',
      description: 'Reconhecimento nacional pela excelência em campanhas digitais.',
      metric: '50+ clientes'
    },
    {
      year: '2021',
      title: 'Expansão',
      description: 'Crescimento da equipe e abertura de novo escritório.',
      metric: '150+ projetos'
    },
    {
      year: '2023',
      title: 'Transformação Digital',
      description: 'Implementação de IA e automação nos nossos processos.',
      metric: '300+ campanhas'
    },
    {
      year: '2025',
      title: 'Liderança de Mercado',
      description: 'Consolidação como referência em marketing digital inovador.',
      metric: '500+ clientes'
    }
  ];

  // Values data
  const values = [
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
  ];

  // Stats data
  const stats = [
    { number: 500, suffix: '+', label: 'Projetos Concluídos', duration: 2 },
    { number: 98, suffix: '%', label: 'Clientes Satisfeitos', duration: 2.5 },
    { number: 32, suffix: '', label: 'Especialistas', duration: 2 },
    { number: 27, suffix: '', label: 'Prêmios', duration: 2.2 }
  ];

  return (
    <Layout>
      <div ref={containerRef} className="relative">
        {/* Hero Section - Cinematográfico */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              y: useTransform(scrollYProgress, [0, 0.3], [0, 100])
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(/lobo-hero-about.jpg)',
                filter: 'brightness(0.4) contrast(1.2)'
              }}
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#111] z-10" />

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
                Nossa História
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transformando
              <br />
              <span className="text-primary">Ideias</span> em Realidade
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Uma jornada de inovação, paixão e resultados extraordinários desde 2018
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-gray-400 text-sm">Role para descobrir</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                Nossa Trajetória
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                A Jornada da <span className="text-primary">Nobre Lobo</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Cada marco representa um passo em direção à excelência
              </p>
            </motion.div>

            {/* Timeline Items */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 to-primary/10 hidden md:block" />

              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 relative bg-black/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                Nossos Valores
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                O que nos <span className="text-primary">Move</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Princípios que guiam cada decisão e projeto que realizamos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                Nossos Números
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Resultados que <span className="text-primary">Falam</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section - Split Screen */}
        <section className="py-24 px-4 relative bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <img
                  src="/lobo-hero3.jpg"
                  alt="Nossa Cultura"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                  Nossa Cultura
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Um Ambiente de <span className="text-primary">Crescimento</span>
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  Acreditamos que grandes resultados vêm de equipes felizes e motivadas.
                  Cultivamos um ambiente de aprendizado contínuo, colaboração e respeito mútuo.
                </p>
                <p className="text-gray-400 text-lg mb-8">
                  Cada membro da nossa equipe é valorizado por suas habilidades únicas e
                  encorajado a trazer suas ideias para a mesa. Juntos, somos mais fortes.
                </p>

                <div className="space-y-4">
                  <CultureItem
                    title="Ambiente Colaborativo"
                    description="Trabalhamos em equipe, compartilhando conhecimento e celebrando vitórias juntos"
                  />
                  <CultureItem
                    title="Aprendizado Contínuo"
                    description="Investimos no desenvolvimento profissional de cada membro da equipe"
                  />
                  <CultureItem
                    title="Work-Life Balance"
                    description="Respeitamos o tempo pessoal e promovemos bem-estar no trabalho"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
              {/* Background with blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-sm border border-primary/20" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Pronto para transformar seu <span className="text-primary">negócio</span>?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Vamos criar algo extraordinário juntos. Entre em contato e descubra como podemos ajudar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    className="px-8 py-4 bg-primary text-black font-semibold rounded-full hover:bg-primary/90 transition-all inline-flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fale Conosco
                  </motion.a>
                  <motion.a
                    href="/portfolio"
                    className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 inline-flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Portfólio
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

// Timeline Item Component
const TimelineItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className={`inline-block p-8 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-2xl ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}
        >
          <div className="text-primary text-sm font-medium mb-2">{item.metric}</div>
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </motion.div>
      </div>

      {/* Year Badge */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center font-bold text-black text-lg border-4 border-[#111]"
        >
          {item.year}
        </motion.div>
      </div>

      {/* Spacer for even layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

// Value Card Component
const ValueCard: React.FC<{ value: any; index: number }> = ({ value, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Gradient Overlay on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {value.title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
};

// Stat Card Component with Counter Animation
const StatCard: React.FC<{ stat: any; index: number }> = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = stat.duration * 1000;
      const steps = 60;
      const increment = stat.number / steps;
      const stepDuration = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          setCount(stat.number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.number, stat.duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-8 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-2xl text-center overflow-hidden group"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      <div className="relative z-10">
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary mb-2"
          animate={isInView ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {count}{stat.suffix}
        </motion.div>
        <div className="text-gray-400 text-lg font-medium">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

// Culture Item Component
const CultureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default About9;
