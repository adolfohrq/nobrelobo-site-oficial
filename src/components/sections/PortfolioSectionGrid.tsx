import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

// Tipos para os projetos do portfólio
interface PortfolioItem {
  id: number
  title: string
  category: string
  image: string
  client: string
  description: string
  results: string[]
  tags: string[]
}

// Dados dos projetos (expandidos e melhorados)
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Transformação Digital Completa",
    category: "Branding & Web",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1200",
    client: "Café Aroma Gourmet",
    description: "Redesenho total da marca com novo site e-commerce integrado, resultando em aumento de 300% nas vendas online.",
    results: ["+300% em vendas", "+150% em tráfego", "#1 no Google"],
    tags: ["Branding", "E-commerce", "SEO"]
  },
  {
    id: 2,
    title: "Campanha de Lançamento Viral",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200",
    client: "TechStart App",
    description: "Estratégia omnichannel com influenciadores que gerou 50 mil downloads na primeira semana de lançamento.",
    results: ["50K downloads", "2M impressões", "+500% ROI"],
    tags: ["Social Media", "Influencer", "Growth"]
  },
  {
    id: 3,
    title: "Reposicionamento de Marca",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600775508114-5c30cf911a40?q=80&w=1200",
    client: "Construtora Horizonte",
    description: "Nova identidade visual e posicionamento premium que elevou o ticket médio em 80% e atraiu clientes de alto padrão.",
    results: ["+80% ticket médio", "40 leads/mês", "Premium positioning"],
    tags: ["Branding", "Estratégia", "B2B"]
  },
  {
    id: 4,
    title: "E-commerce de Alta Conversão",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200",
    client: "Moda Sustentável",
    description: "Loja online otimizada com UX excepcional e integração completa com sistemas de gestão e marketplace.",
    results: ["5.2% conversão", "+200% vendas", "4.8★ rating"],
    tags: ["E-commerce", "UX/UI", "Desenvolvimento"]
  },
  {
    id: 5,
    title: "Estratégia de Conteúdo 360°",
    category: "Marketing Digital",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200",
    client: "Beleza Natural",
    description: "Planejamento e produção de conteúdo integrado para todas as plataformas, aumentando engajamento em 400%.",
    results: ["+400% engajamento", "100K followers", "15% conversão"],
    tags: ["Conteúdo", "Social", "Branding"]
  },
  {
    id: 6,
    title: "Portal Corporativo & CRM",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200",
    client: "Grupo Empresarial XYZ",
    description: "Plataforma web completa com área do cliente, CRM integrado e automação de processos comerciais.",
    results: ["-60% tempo operacional", "+180% produtividade", "ROI em 4 meses"],
    tags: ["Web App", "CRM", "Automação"]
  }
]

const PortfolioSectionGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Categorias únicas
  const categories = ['all', ...Array.from(new Set(portfolioData.map(item => item.category)))]

  // Filtrar projetos
  const filteredProjects = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === activeCategory)

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              Nosso Portfólio
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-gilroy font-bold text-white mb-6">
            Projetos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">Transformam</span>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            Cases reais de sucesso que comprovam nossa expertise em gerar resultados extraordinários
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {category === 'all' ? 'Todos os Projetos' : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === project.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center"
                  >
                    <ExternalLink className="w-6 h-6 text-primary-foreground" />
                  </motion.div>

                  {/* Results overlay */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: hoveredId === project.id ? 0 : 20,
                      opacity: hoveredId === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2"
                  >
                    {project.results.map((result, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold"
                      >
                        {result}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Client */}
                  <div className="text-primary text-sm font-semibold mb-2">
                    {project.client}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-gilroy font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    <span className="text-sm">Ver case completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl shadow-[0_0_50px_rgba(236,200,11,0.1)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/portfolio">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-10 py-6 rounded-full group shadow-lg shadow-primary/30"
            >
              Ver Todos os Projetos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSectionGrid
