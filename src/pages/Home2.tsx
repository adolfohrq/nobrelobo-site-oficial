import React, { useRef } from 'react'
import Layout from '../components/general/Layout'
import SEO from '../components/general/SEO'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { ArrowRight, TrendingUp, Target, Zap, Shield, Users, Award } from 'lucide-react'
import WhyChooseNobreLoboSection from '../components/sections/WhyChooseNobreLoboSection'

const Home2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])


  // Estatísticas
  const stats = [
    { value: "350+", label: "Projetos Entregues", sublabel: "com excelência" },
    { value: "98%", label: "Satisfação", sublabel: "dos clientes" },
    { value: "5x", label: "ROI Médio", sublabel: "dos nossos clientes" },
    { value: "24/7", label: "Suporte", sublabel: "quando você precisa" }
  ]

  // Depoimentos
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "CEO, TechStart",
      image: "https://i.pravatar.cc/150?img=12",
      text: "A Nobre Lobo transformou completamente nossa presença digital. Em 6 meses, aumentamos nosso tráfego em 300% e as conversões em 150%."
    },
    {
      name: "Mariana Silva",
      role: "Diretora de Marketing, Innovare",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Profissionalismo e resultados excepcionais. A equipe entende profundamente de estratégias digitais e entrega muito além do esperado."
    },
    {
      name: "Roberto Alves",
      role: "Fundador, EcoLife",
      image: "https://i.pravatar.cc/150?img=33",
      text: "Parceria estratégica de verdade. Eles não apenas executam, mas pensam junto conosco em cada decisão. Resultados impressionantes!"
    }
  ]

  // Processo
  const process = [
    {
      step: "01",
      title: "Descoberta",
      description: "Mergulhamos profundamente no seu negócio, mercado e objetivos para criar uma estratégia sólida."
    },
    {
      step: "02",
      title: "Estratégia",
      description: "Desenvolvemos um plano personalizado com métricas claras e roadmap detalhado."
    },
    {
      step: "03",
      title: "Execução",
      description: "Implementamos com precisão, utilizando as melhores práticas e tecnologias do mercado."
    },
    {
      step: "04",
      title: "Otimização",
      description: "Monitoramos, analisamos e refinamos continuamente para maximizar resultados."
    }
  ]

  return (
    <Layout>
      <SEO
        title="Transforme sua Marca com Marketing Digital"
        description="Soluções completas de marketing digital: Design, Social Media, SEO, Tráfego Pago e Desenvolvimento Web. 350+ projetos entregues, 98% de satisfação."
        keywords="transformação digital, branding, marketing estratégico, ROI, crescimento digital"
      />
      <div ref={containerRef}>
        {/* Hero Section - Moderno e Impactante */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background com gradientes animados */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ECC80B 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Conteúdo Hero */}
          <motion.div 
            className="container mx-auto px-4 relative z-10 text-center pt-20"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Líder em Transformação Digital
              </span>
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-gilroy font-bold text-white mb-6 leading-tight"
            >
              Domine Seu
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Mercado Digital
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12"
            >
              Estratégias digitais que combinam a <strong className="text-primary">força de um lobo alfa</strong> com 
              a precisão da tecnologia moderna. Resultados concretos, crescimento sustentável.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-full group"
                >
                  Agendar Consultoria Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/portfolio">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-white font-bold text-base px-8 py-6 rounded-full"
                >
                  Ver Nossos Cases
                </Button>
              </Link>
            </motion.div>

            {/* Stats rápidas */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-gilroy font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-white font-medium">{stat.label}</div>
                  <div className="text-white/50 text-sm">{stat.sublabel}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/50">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 rotate-90" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Seção Por Que Escolher a Nobre Lobo */}
        <WhyChooseNobreLoboSection />

        {/* Seção de Processo */}
        <section className="py-32 relative bg-white/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="text-primary text-sm font-bold uppercase tracking-wider mb-4 block">
                Nossa Metodologia
              </span>
              <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
                Como <span className="text-primary">Trabalhamos</span>
              </h2>
              <p className="text-white/70 text-xl max-w-3xl mx-auto">
                Um processo testado e aprovado que entrega resultados consistentes.
              </p>
            </motion.div>

            {/* Timeline do processo */}
            <div className="max-w-5xl mx-auto">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex gap-8 mb-12 last:mb-0"
                >
                  {/* Linha vertical */}
                  {index !== process.length - 1 && (
                    <div className="absolute left-[2.6rem] top-20 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                  )}
                  
                  {/* Número do step */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-2xl font-gilroy font-bold text-primary">{item.step}</span>
                    </div>
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                    <h3 className="text-2xl font-gilroy font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Depoimentos */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="text-primary text-sm font-bold uppercase tracking-wider mb-4 block">
                Depoimentos
              </span>
              <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6">
                O Que Dizem <span className="text-primary">Nossos Clientes</span>
              </h2>
            </motion.div>

            {/* Grid de depoimentos */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all duration-300"
                >
                  {/* Aspas */}
                  <div className="text-primary text-6xl font-serif mb-4">"</div>
                  
                  {/* Texto */}
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  {/* Autor */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-primary/30"
                    />
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-white/50 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-32 relative overflow-hidden">
          {/* Background com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-gilroy font-bold text-white mb-8">
                Pronto Para Dar o
                <br />
                <span className="text-primary">Próximo Passo?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
                Agende uma consultoria gratuita e descubra como podemos transformar 
                sua presença digital e multiplicar seus resultados.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 rounded-full group"
                  >
                    Falar com Especialista
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <div className="flex items-center gap-3 text-white/70">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Sem compromisso • 100% gratuito</span>
                </div>
              </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/50 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Agência Certificada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>350+ Clientes Satisfeitos</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>98% Taxa de Sucesso</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home2

