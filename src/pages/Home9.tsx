import React from 'react'
import Layout from '../components/general/Layout'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
  ArrowRight, Sparkles, TrendingUp, Target, Award, Users, Shield,
  CheckCircle2, Star, Rocket, Zap, Eye, Lightbulb, Crown,
  BarChart3, Globe, Code, Palette, MessageSquare, Search, Layers
} from 'lucide-react'
import ServicesSection from '../components/sections/ServicesSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import ContactSection from '../components/sections/ContactSection'

const Home9: React.FC = () => {
  // Estatísticas com ícones
  const stats = [
    { value: "500+", label: "Projetos de Sucesso", icon: <Target className="w-6 h-6" /> },
    { value: "99%", label: "Clientes Satisfeitos", icon: <Star className="w-6 h-6" /> },
    { value: "10x", label: "ROI Médio", icon: <TrendingUp className="w-6 h-6" /> },
    { value: "15+", label: "Anos de Experiência", icon: <Crown className="w-6 h-6" /> }
  ]

  // Valores da empresa (espírito do lobo)
  const values = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Liderança",
      description: "Como um lobo alfa, lideramos com estratégia e visão de futuro",
      image: "/lobo-hero6.jpg"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trabalho em Equipe",
      description: "A força da matilha está na união e colaboração do time",
      image: "/lobo-hero4.jpg"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visão Aguçada",
      description: "Identificamos oportunidades onde outros veem obstáculos",
      image: "/lobo-hero5.jpg"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agilidade",
      description: "Adaptação rápida e execução precisa em cada projeto",
      image: "/lobo-hero8.jpg"
    }
  ]

  // Serviços principais
  const mainServices = [
    {
      icon: <Search className="w-10 h-10" />,
      title: "SEO Estratégico",
      description: "Domine as primeiras posições do Google como um predador digital",
      features: ["Análise de Palavras-chave", "Link Building", "SEO Técnico", "Conteúdo Otimizado"],
      link: "/services/seo-estrategico",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "Branding & Design",
      description: "Identidade visual marcante que imprime sua marca na mente do cliente",
      features: ["Logo & Identidade", "Brand Guidelines", "Design Gráfico", "Embalagens"],
      link: "/services/design-grafico",
      gradient: "from-purple-600 to-pink-500"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Desenvolvimento Web",
      description: "Sites modernos, rápidos e otimizados para conversão máxima",
      features: ["Landing Pages", "E-commerce", "Aplicações Web", "Sites Institucionais"],
      link: "/services/desenvolvimento-web",
      gradient: "from-green-600 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Tráfego Pago",
      description: "Campanhas certeiras que trazem resultados mensuráveis",
      features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Remarketing"],
      link: "/services/trafego-pago",
      gradient: "from-orange-600 to-red-500"
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "Social Media",
      description: "Presença dominante nas redes sociais que gera engajamento real",
      features: ["Gestão de Redes", "Criação de Conteúdo", "Influencer Marketing", "Ads Sociais"],
      link: "/services/social-media",
      gradient: "from-pink-600 to-rose-500"
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Estratégia Digital",
      description: "Planejamento inteligente que guia sua marca ao topo",
      features: ["Consultoria", "Análise de Mercado", "Planejamento", "Growth Marketing"],
      link: "/services/marketing-digital",
      gradient: "from-yellow-600 to-amber-500"
    }
  ]

  // Depoimentos destacados
  const testimonials = [
    {
      text: "A Nobre Lobo transformou completamente nossa presença digital. Em 6 meses, nosso tráfego triplicou e as vendas aumentaram 250%!",
      author: "Carlos Mendes",
      role: "CEO, TechFlow",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      company: "TechFlow Solutions"
    },
    {
      text: "Profissionalismo e resultados excepcionais. A equipe entende profundamente de marketing digital e entrega além do esperado.",
      author: "Mariana Silva",
      role: "Diretora de Marketing",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      company: "Innovare"
    },
    {
      text: "Parceria estratégica de verdade. Eles não apenas executam, mas pensam junto conosco. Nosso ROI aumentou 500%!",
      author: "Roberto Alves",
      role: "Fundador",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      company: "EcoLife"
    }
  ]

  return (
    <Layout>
      {/* HERO SECTION COM IMAGEM DE LOBO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image com overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/lobo-home.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Conteúdo Hero */}
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Lado esquerdo - Texto */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm text-primary text-sm font-bold uppercase tracking-wider">
                    <Crown className="w-4 h-4" />
                    A Força de um Lobo Alfa
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold text-white mb-6 leading-tight"
                >
                  Domine o
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                    Território Digital
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed"
                >
                  Como a <strong className="text-primary">matilha mais estratégica</strong> do marketing digital,
                  caçamos resultados extraordinários com <strong className="text-primary">precisão</strong> e
                  <strong className="text-primary"> instinto aguçado</strong>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-10 py-6 rounded-full group shadow-2xl shadow-primary/30"
                    >
                      Liderar Meu Mercado
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link to="/portfolio">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 bg-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-primary/50 text-white font-bold text-base px-10 py-6 rounded-full"
                    >
                      Ver Conquistas
                    </Button>
                  </Link>
                </motion.div>

                {/* Mini stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-8"
                >
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-primary">{stat.icon}</div>
                      <div>
                        <div className="text-3xl font-gilroy font-bold text-primary">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Lado direito - Imagem destacada com stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  {/* Card flutuante com stats */}
                  <div className="absolute -top-10 -right-10 bg-black/80 backdrop-blur-2xl rounded-2xl border border-primary/30 p-6 z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-gilroy font-bold text-primary">10x</div>
                        <div className="text-white/70 text-sm">ROI Médio</div>
                      </div>
                    </div>
                  </div>

                  {/* Card flutuante inferior */}
                  <div className="absolute -bottom-10 -left-10 bg-black/80 backdrop-blur-2xl rounded-2xl border border-primary/30 p-6 z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-gilroy font-bold text-primary">15+</div>
                        <div className="text-white/70 text-sm">Anos Liderando</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES DA EMPRESA - Espírito do Lobo */}
      <section className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
              O Espírito do Lobo
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Nossos <span className="text-primary">Valores</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Incorporamos as características da matilha: força, estratégia e trabalho em equipe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${value.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 min-h-[400px] flex flex-col justify-end">
                  <div className="w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS PRINCIPAIS - Cards Detalhados */}
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
              Arsenal Completo
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              Nossos <span className="text-primary">Serviços</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Soluções completas para dominar todos os territórios digitais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={service.link}>
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Gradient hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-gilroy font-bold text-white mb-4 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                        <span>Explorar</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS DESTACADOS */}
      <section className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-gilroy font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
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
              Resultados Comprovados
            </span>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
              O Que Dizem <span className="text-primary">Nossos Clientes</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full border-2 border-primary/30"
                  />
                  <div>
                    <div className="text-white font-bold">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                    <div className="text-primary text-sm font-semibold">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS COMPLETOS */}
      <ServicesSection />

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* CTA FINAL COM IMAGEM DE LOBO */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background com imagem */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/lobo-hero9.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/85" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-black/60 backdrop-blur-2xl rounded-full border-2 border-primary/40">
                <Crown className="w-6 h-6 text-primary" />
                <span className="text-primary font-bold text-base uppercase tracking-widest">
                  Junte-se à Matilha Vencedora
                </span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold text-white mb-8 leading-tight">
              Pronto Para
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Dominar Seu Mercado?
              </span>
            </h2>

            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Agende uma <strong className="text-primary">consultoria estratégica gratuita</strong> e
              descubra como transformar sua marca em líder absoluta do seu segmento.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-14 py-8 rounded-full group shadow-[0_0_50px_rgba(236,200,11,0.3)] hover:shadow-[0_0_80px_rgba(236,200,11,0.5)] transition-all"
                >
                  <Crown className="mr-3 h-6 w-6" />
                  Liderar Agora
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-8 text-white/70 text-base"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">Consultoria 100% Gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">Sem Compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">Resposta em 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTATO */}
      <ContactSection />
    </Layout>
  )
}

export default Home9
