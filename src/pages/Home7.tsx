import React, { useRef, useState } from 'react'
import Layout from '../components/general/Layout'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
  ArrowRight, Sparkles, Zap, Target, TrendingUp,
  Award, Users, Shield, Check, ChevronRight, Play,
  Globe, Layers, Code2, Palette, BarChart,
  MessageSquare, Star, CheckCircle2
} from 'lucide-react'

const Home7: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Serviços em destaque com ícones e cores
  const featuredServices = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "SEO Estratégico",
      description: "Domine as primeiras posições do Google e atraia clientes qualificados.",
      color: "from-blue-500 to-cyan-500",
      link: "/services/seo-estrategico"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Gráfico",
      description: "Identidade visual memorável que comunica sua essência.",
      color: "from-purple-500 to-pink-500",
      link: "/services/design-grafico"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Desenvolvimento Web",
      description: "Sites rápidos, responsivos e otimizados para conversão.",
      color: "from-green-500 to-emerald-500",
      link: "/services/desenvolvimento-web"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Tráfego Pago",
      description: "Campanhas inteligentes que maximizam seu ROI.",
      color: "from-orange-500 to-red-500",
      link: "/services/trafego-pago"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Social Media",
      description: "Presença marcante nas redes sociais que gera engajamento.",
      color: "from-pink-500 to-rose-500",
      link: "/services/social-media"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automação",
      description: "Inteligência artificial e automação para escalar resultados.",
      color: "from-yellow-500 to-amber-500",
      link: "/services/automacao-de-marketing"
    }
  ]

  // Números de impacto
  const impactNumbers = [
    { number: "350+", label: "Projetos Concluídos", sublabel: "com excelência" },
    { number: "98%", label: "Taxa de Satisfação", sublabel: "dos nossos clientes" },
    { number: "5x", label: "ROI Médio", sublabel: "retorno sobre investimento" },
    { number: "10+", label: "Anos no Mercado", sublabel: "de experiência comprovada" }
  ]

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

  // Diferenciais competitivos
  const differentials = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Experiência Comprovada",
      text: "Mais de 10 anos transformando negócios digitalmente"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Time Especializado",
      text: "Profissionais certificados e apaixonados por resultados"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Transparência Total",
      text: "Relatórios detalhados e comunicação constante"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Foco em ROI",
      text: "Cada ação pensada para gerar retorno mensurável"
    }
  ]

  // Depoimentos destacados
  const testimonials = [
    {
      text: "A Nobre Lobo não apenas entregou, superou todas as expectativas. Nosso faturamento online triplicou em 6 meses!",
      author: "Carolina Ribeiro",
      role: "CEO, Fashion Tech",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5
    },
    {
      text: "Profissionalismo, criatividade e resultados excepcionais. A melhor parceria que fizemos para o crescimento digital.",
      author: "Marcos Oliveira",
      role: "Diretor de Marketing, InnovaTech",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5
    }
  ]

  return (
    <Layout>
      {/* HERO SECTION - Impactante e Moderno */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com gradientes e efeitos */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/98">
          {/* Círculos animados de fundo */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px]"
          ></motion.div>

          {/* Grid pattern sutil */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(#ECC80B 1px, transparent 1px), linear-gradient(90deg, #ECC80B 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
        </div>

        {/* Conteúdo Hero */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 relative z-10 pt-32 pb-20"
        >
          <div className="max-w-6xl mx-auto">
            {/* Badge com animação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-primary text-sm font-bold uppercase tracking-wider">
                  Agência Digital de Alto Impacto
                </span>
              </div>
            </motion.div>

            {/* Título Principal - Grande e Impactante */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold text-white leading-[1.1] mb-4">
                Transforme Sua
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                  Presença Digital
                </span>
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Estratégias digitais que combinam <strong className="text-primary font-bold">criatividade</strong>,
              <strong className="text-primary font-bold"> tecnologia</strong> e
              <strong className="text-primary font-bold"> dados</strong> para gerar
              resultados extraordinários para o seu negócio.
            </motion.p>

            {/* CTAs em destaque */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-full group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Agendar Consultoria Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/50 text-white font-bold text-base px-8 py-6 rounded-full transition-all"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Cases de Sucesso
                </Button>
              </Link>
            </motion.div>

            {/* Números de impacto */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {impactNumbers.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-gilroy font-bold text-primary mb-2">
                    {item.number}
                  </div>
                  <div className="text-white font-semibold text-sm md:text-base mb-1">
                    {item.label}
                  </div>
                  <div className="text-white/50 text-xs md:text-sm">
                    {item.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs uppercase tracking-wider">Descubra mais</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* SERVIÇOS EM DESTAQUE - Grid Moderno */}
      <section className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Nossos Serviços
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Soluções <span className="text-primary">Completas</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Do planejamento estratégico à execução impecável, oferecemos tudo que seu negócio precisa para crescer online.
            </p>
          </motion.div>

          {/* Grid de Serviços */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <Link to={service.link}>
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    {/* Gradiente de fundo no hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      {/* Ícone */}
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>

                      {/* Título */}
                      <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      {/* Descrição */}
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Link com seta */}
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>Saiba mais</span>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${hoveredService === index ? 'translate-x-2' : ''}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA para ver todos os serviços */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-white font-bold px-8 py-6 rounded-full"
              >
                Ver Todos os Serviços
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NOSSO PROCESSO - Timeline Moderno */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Nossa Metodologia
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Como <span className="text-primary">Trabalhamos</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Um processo comprovado que garante resultados consistentes e mensuráveis.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex gap-6 md:gap-8 mb-12 last:mb-0"
              >
                {/* Linha conectora */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[2.4rem] md:left-[2.8rem] top-24 w-0.5 h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"></div>
                )}

                {/* Número e ícone */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary flex flex-col items-center justify-center">
                      <span className="text-2xl md:text-3xl font-gilroy font-bold text-primary mb-1">{step.number}</span>
                      <div className="text-primary/70">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-gilroy font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS - Bento Grid Compacto */}
      <section className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Por Que Escolher a Nobre Lobo
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Nossos <span className="text-primary">Diferenciais</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {differentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-gilroy font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - Carousel Elegante */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              Depoimentos
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Histórias de <span className="text-primary">Sucesso</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Autor */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full border-2 border-primary/30"
                  />
                  <div>
                    <div className="text-white font-bold">{testimonial.author}</div>
                    <div className="text-white/50 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL - Grande e Impactante */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        {/* Background com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10"></div>

        {/* Círculos decorativos */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  Vamos Crescer Juntos
                </span>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-gilroy font-bold text-white mb-8">
              Pronto Para Dar o
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Próximo Passo?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Agende uma <strong className="text-primary">consultoria estratégica gratuita</strong> e
              descubra como podemos transformar sua presença digital e multiplicar seus resultados.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-7 rounded-full group shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all"
                >
                  Começar Agora
                  <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Consultoria 100% Gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Sem Compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Resposta em até 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home7
