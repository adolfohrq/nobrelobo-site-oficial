import React, { useState, useRef } from 'react'
import Layout from '../components/general/Layout'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import HeroPages from '../components/general/HeroPages'
import SEO from '../components/general/SEO'
import {
  Sparkles, Zap, Target, Users, Heart, TrendingUp, Award,
  Eye, Lightbulb, Shield, Star, ArrowRight, Play, CheckCircle2,
  Brain, Rocket, Palette, Code2, LineChart, Layers, Building
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Componente de Card Interativo com Animação
const InteractiveValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  details: string[];
}> = ({ icon, title, description, color, details }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer h-full"
    >
      <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 h-full overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-white/10`}>
        {/* Gradiente animado */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>

        {/* Glow effect */}
        <motion.div
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${color} rounded-full filter blur-3xl opacity-30`}
        ></motion.div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Ícone com animação */}
          <motion.div
            animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 text-white shadow-lg shadow-primary/20`}
          >
            {icon}
          </motion.div>

          {/* Conteúdo */}
          <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-white/70 leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          {/* Details animados */}
          <motion.div
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="space-y-2 mt-auto"
          >
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Componente de Estatística com Contador
const StatCounter: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}> = ({ value, label, icon, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className={`relative bg-gradient-to-br ${color} rounded-2xl p-8 overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
            {icon}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl font-gilroy font-bold text-white mb-2"
          >
            {value}
          </motion.div>

          <p className="text-white/90 font-medium">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Componente de Jornada Timeline
const JourneyStep: React.FC<{
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ year, title, description, icon, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex gap-8 mb-16 last:mb-0 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
    >
      {/* Linha conectora - Desktop only */}
      {index !== 0 && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-0 md:h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
      )}

      {/* Conteúdo */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="text-primary text-4xl font-gilroy font-bold">{year}</div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              {icon}
            </div>
          </div>

          <h3 className="text-2xl font-gilroy font-bold text-white mb-3">
            {title}
          </h3>

          <p className="text-white/70 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Círculo central - Desktop only */}
      <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 items-center justify-center">
        <motion.div
          whileInView={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 rounded-full bg-primary border-4 border-background"
        ></motion.div>
      </div>
    </motion.div>
  )
}

const About4: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Valores da empresa
  const coreValues = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Inovação Radical",
      description: "Não seguimos padrões. Criamos novos caminhos de pensamento que transformam indústrias.",
      color: "from-yellow-500 to-orange-500",
      details: ["Metodologias proprietárias", "Tecnologias de ponta", "Pesquisa contínua"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Foco em Resultados",
      description: "Cada ação é estratégica. Medimos impacto real e provamos valor com dados concretos.",
      color: "from-red-500 to-pink-500",
      details: ["ROI comprovado", "Métricas transparentes", "Accountability total"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Parceria Genuína",
      description: "Seus objetivos são nossos objetivos. Crescemos juntos, celebramos vitórias juntos.",
      color: "from-pink-500 to-purple-500",
      details: ["Dedicação 100%", "Comunicação clara", "Suporte contínuo"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Excelência Técnica",
      description: "Mesclamos arte e ciência. Design excepcional aliado a performance técnica impecável.",
      color: "from-blue-500 to-cyan-500",
      details: ["Código limpo", "Performance otimizada", "Escalabilidade garantida"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transparência Total",
      description: "Sem segredos. Você entende exatamente o que fazemos, como fazemos e por quê.",
      color: "from-green-500 to-emerald-500",
      details: ["Relatórios detalhados", "Comunicação semanal", "Documentação completa"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Velocidade Estratégica",
      description: "Ágil sem ser apressado. Rápidos em decisões, precisos em execução.",
      color: "from-purple-500 to-indigo-500",
      details: ["Processos ágeis", "Iteração rápida", "Entrega consistente"]
    }
  ]

  // Jornada da empresa
  const journey = [
    {
      year: "2013",
      title: "O Começo",
      description: "Três amigos apaixonados por marketing digital abrem uma pequena agência em um escritório compartilhado com sonhos grandes.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      year: "2016",
      title: "Primeira Expansão",
      description: "Atingimos 50 clientes ativos e estabelecemos metodologia própria que se torna referência no mercado.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: "2019",
      title: "Escala & Impacto",
      description: "Chegamos a 150+ clientes, abrimos sucursal em São Paulo e conquistamos prêmios internacionais.",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "Transformação Digital",
      description: "Pandemic acelerou nossas inovações. Salvamos 47 negócios da falência com soluções rápidas.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "Reconhecimento Global",
      description: "Nobre Lobo reconhecida entre as top 10 agências de marketing da América Latina. 350+ projetos entregues.",
      icon: <Star className="w-6 h-8" />
    },
    {
      year: "2024",
      title: "Futuro Agora",
      description: "Integrando IA em todas as operações, abrindo novos serviços e preparando a próxima geração de líderes.",
      icon: <Brain className="w-6 h-6" />
    }
  ]

  // Estatísticas impressionantes
  const stats = [
    {
      value: "350+",
      label: "Projetos Entregues",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-primary to-yellow-500"
    },
    {
      value: "98%",
      label: "Taxa de Satisfação",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-red-500"
    },
    {
      value: "5x",
      label: "ROI Médio",
      icon: <LineChart className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      value: "10+",
      label: "Anos de Experiência",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500"
    }
  ]

  // Tipos de clientes
  const clientTypes = [
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Startups",
      description: "Ajudamos startups a conquistar mercado com estratégias ágeis e crescimento acelerado.",
      examples: ["Empresas de 2-30 pessoas", "Fase de validação ou scale-up", "Orçamento variável"]
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "PMEs",
      description: "Transformamos negócios estabelecidos com modernização digital e otimização de processos.",
      examples: ["Empresas de 30-200 pessoas", "Busca de inovação", "Processos estruturados"]
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Corporações",
      description: "Parceiros estratégicos de grandes empresas em transformação digital e inovação.",
      examples: ["Empresas 200+ pessoas", "Projetos complexos", "Múltiplas áreas"]
    }
  ]

  return (
    <Layout>
      <SEO
        title="Sobre a Nobre Lobo - Agência de Marketing Digital"
        description="Conheça a história, valores e impacto da Nobre Lobo. 350+ projetos, 10 anos transformando negócios."
        keywords="sobre nobre lobo, agência marketing, história, valores, equipe"
      />

      {/* HERO SECTION */}
      <HeroPages
        title="A História por Trás da Nobre Lobo"
        subtitle="Mais de uma década transformando visões em realidade digital. Somos apaixonados por criar experiências que vendem."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&h=600&fit=crop"
      />

      {/* SEÇÃO: MISSÃO, VISÃO, VALORES */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Quem Somos
            </span>
            <h2 className="text-5xl md:text-7xl font-gilroy font-bold text-white mb-8">
              Nosso <span className="text-primary">Propósito</span>
            </h2>
          </motion.div>

          {/* Três pilares principais */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Nossa Missão",
                content: "Transformar a presença digital de empresas através de estratégias inovadoras que geram impacto real, crescimento sustentável e relacionamentos duradouros.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Eye className="w-10 h-10" />,
                title: "Nossa Visão",
                content: "Ser a agência parceira mais confiável e eficaz da América Latina, reconhecida pela excelência, inovação e impacto transformador nos negócios de nossos clientes.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Nossa Paixão",
                content: "Acreditamos que marketing digital bem feito é uma forma de arte e ciência. Criamos experiências memoráveis que conectam marcas com pessoas reais.",
                color: "from-red-500 to-orange-500"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${item.color} rounded-3xl p-8 overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-white mb-6">
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-gilroy font-bold text-white mb-4">
                      {item.title}
                    </h3>

                    <p className="text-white/90 leading-relaxed text-lg">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: ESTATÍSTICAS DE IMPACTO */}
      <section className="py-20 md:py-28 relative bg-white/[0.02] overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white">
              Números que <span className="text-primary">Falam</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, idx) => (
              <StatCounter
                key={idx}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: VALORES FUNDAMENTAIS */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Nossos Valores
            </span>
            <h2 className="text-5xl md:text-7xl font-gilroy font-bold text-white mb-8">
              O que nos <span className="text-primary">Diferencia</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Seis pilares que guiam cada decisão, cada projeto, cada relacionamento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, idx) => (
              <InteractiveValueCard
                key={idx}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
                details={value.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: JORNADA */}
      <section className="py-20 md:py-28 relative bg-white/[0.02] overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Nossa Jornada
            </span>
            <h2 className="text-5xl md:text-7xl font-gilroy font-bold text-white mb-8">
              Uma Década de <span className="text-primary">Transformação</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {journey.map((step, idx) => (
              <JourneyStep
                key={idx}
                year={step.year}
                title={step.title}
                description={step.description}
                icon={step.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: TIPOS DE CLIENTES */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Nossos Clientes
            </span>
            <h2 className="text-5xl md:text-7xl font-gilroy font-bold text-white mb-8">
              Trabalhamos com <span className="text-primary">Todos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              De startups ousadas a grandes corporações, temos experiência para potencializar qualquer negócio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {clientTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>

                <h3 className="text-2xl font-gilroy font-bold text-white mb-4">
                  {type.title}
                </h3>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {type.description}
                </p>

                <div className="space-y-2">
                  {type.examples.map((example, exIdx) => (
                    <div key={exIdx} className="flex items-center gap-2 text-white/80 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-gilroy font-bold text-white mb-8">
              Pronto Para <span className="text-primary">Começar</span> Sua Transformação?
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Vamos trabalhar juntos para transformar sua visão em realidade digital. Agende uma consultoria estratégica gratuita.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-gilroy font-bold px-10 py-4 rounded-full flex items-center gap-2 shadow-lg shadow-primary/30"
                >
                  Agendar Consultoria
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary/30 hover:border-primary text-white font-gilroy font-bold px-10 py-4 rounded-full flex items-center gap-2"
                >
                  Ver Casos de Sucesso
                  <Play className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default About4
