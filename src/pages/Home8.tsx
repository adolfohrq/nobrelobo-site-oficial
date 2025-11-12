import React from 'react'
import Layout from '../components/general/Layout'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
  ArrowRight, Sparkles, TrendingUp, Target, Award, Users,
  CheckCircle2, Star, Rocket, Zap, Shield, Eye, Lightbulb,
  BarChart3, Globe, Code, Palette, MessageSquare, Search
} from 'lucide-react'
import ServicesSection from '../components/sections/ServicesSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import OurProcessSection from '../components/sections/OurProcessSection'
import ContactSection from '../components/sections/ContactSection'
import WhyChooseNobreLoboSection from '../components/sections/WhyChooseNobreLoboSection'

const Home8: React.FC = () => {
  // Estatísticas de impacto
  const stats = [
    { value: "350+", label: "Projetos Entregues", sublabel: "com excelência", icon: <Rocket className="w-5 h-5" /> },
    { value: "98%", label: "Taxa de Satisfação", sublabel: "dos clientes", icon: <Star className="w-5 h-5" /> },
    { value: "5x", label: "ROI Médio", sublabel: "retorno garantido", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "24/7", label: "Suporte Ativo", sublabel: "sempre disponível", icon: <Shield className="w-5 h-5" /> }
  ]

  // Benefícios principais
  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Estratégia Personalizada",
      description: "Soluções sob medida para seus objetivos específicos de negócio"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Qualidade Comprovada",
      description: "Mais de 10 anos de experiência entregando resultados excepcionais"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Time Especializado",
      description: "Profissionais certificados e apaixonados por inovação digital"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Resultados Mensuráveis",
      description: "Acompanhamento de métricas e otimização contínua de performance"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Transparência Total",
      description: "Relatórios detalhados e comunicação clara em todas as etapas"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Agilidade na Execução",
      description: "Processos otimizados para entregas rápidas sem perder qualidade"
    }
  ]

  // Serviços em destaque
  const featuredServices = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "SEO Estratégico",
      description: "Domine as primeiras posições do Google",
      link: "/services/seo-estrategico",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Gráfico",
      description: "Identidade visual memorável e impactante",
      link: "/services/design-grafico",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desenvolvimento Web",
      description: "Sites modernos e otimizados para conversão",
      link: "/services/desenvolvimento-web",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Tráfego Pago",
      description: "Campanhas que maximizam seu investimento",
      link: "/services/trafego-pago",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Social Media",
      description: "Presença marcante nas redes sociais",
      link: "/services/social-media",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Estratégias integradas para crescimento",
      link: "/services/marketing-digital",
      color: "from-yellow-500 to-amber-500"
    }
  ]

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com gradientes */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
            className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px]"
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(#ECC80B 1px, transparent 1px), linear-gradient(90deg, #ECC80B 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
        </div>

        {/* Conteúdo Hero */}
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm text-primary text-sm font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Agência Digital de Alto Desempenho
              </span>
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold text-white mb-6 leading-tight"
            >
              Transforme Sua Marca em um
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Fenômeno Digital
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Estratégias digitais que combinam <strong className="text-primary">criatividade</strong>,
              <strong className="text-primary"> tecnologia</strong> e <strong className="text-primary">resultados mensuráveis</strong> para
              levar seu negócio ao próximo nível.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-10 py-6 rounded-full group shadow-lg shadow-primary/30 transition-all"
                >
                  Agendar Consultoria Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/50 text-white font-bold text-base px-10 py-6 rounded-full transition-all"
                >
                  Ver Cases de Sucesso
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all group"
                >
                  <div className="text-primary/70 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-gilroy font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-white/50 text-xs">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS - Grid de Cards */}
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
              Diferenciais que <span className="text-primary">Fazem a Diferença</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Mais de 10 anos de experiência transformando negócios através do marketing digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS EM DESTAQUE - Grid Compacto */}
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
              Serviços Premium
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Soluções <span className="text-primary">Completas</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Do planejamento estratégico à execução impecável
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={service.link}>
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>

                      <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-white/70 mb-6">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>Saiba mais</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/services">
              <Button
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-white font-bold px-8 py-6 rounded-full"
              >
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS COMPLETA */}
      <ServicesSection />

      {/* POR QUE ESCOLHER */}
      <WhyChooseNobreLoboSection />

      {/* NOSSO PROCESSO */}
      <OurProcessSection />

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* DEPOIMENTOS */}
      <TestimonialsSection />

      {/* CONTATO/CTA */}
      <ContactSection />

      {/* CTA FINAL */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  Pronto Para Crescer?
                </span>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-gilroy font-bold text-white mb-8">
              Vamos Transformar Seu
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Negócio Digital
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Agende uma <strong className="text-primary">consultoria estratégica gratuita</strong> e
              descubra como podemos multiplicar seus resultados online.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-7 rounded-full group shadow-2xl shadow-primary/30"
                >
                  Começar Agora
                  <Rocket className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

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
                <span>Resposta em 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home8
