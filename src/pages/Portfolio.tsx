import React, { useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import Layout from '../components/general/Layout'
import HeroPages from '../components/general/HeroPages'
import CtaSection from '../components/sections/CtaSection'
import { portfolioData, PortfolioItem } from '@/data/portfolio-data'
import { Link } from 'react-router-dom'

const PortfolioPage: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  // Estado para filtros e busca
  const [displayedProjects, setDisplayedProjects] = useState<PortfolioItem[]>(portfolioData)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Categorias únicas
  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'branding', label: 'Branding' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'websites', label: 'Websites' },
    { id: 'videos', label: 'Vídeos' }
  ]

  // Filtrar projetos baseado em categoria e busca
  useEffect(() => {
    let filtered = portfolioData

    // Filtrar por categoria
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory)
    }

    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setDisplayedProjects(filtered)
  }, [activeCategory, searchQuery])

  // Projetos em destaque
  const featuredProjects = portfolioData.filter(p => p.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const categoryMap: Record<string, string> = {
    'branding': 'Branding',
    'social-media': 'Social Media',
    'websites': 'Web Design',
    'videos': 'Marketing Digital'
  }

  return (
    <Layout>
      {/* Hero Section */}
      <HeroPages
        title="NOSSO <br />PORTFÓLIO<span class='text-primary'>.</span>"
        subtitle="Explore os casos de sucesso que desenvolvemos e os resultados concretos que alcançamos para nossos clientes."
        badge="Casos de Sucesso"
        backgroundImage="/lobo-hero-portfolio.jpg"
        height="h-[50vh] sm:h-[55vh] md:h-[60vh]"
        imageStyle={{
          objectFit: "cover",
          objectPosition: "center",
          brightness: "75",
          contrast: "110",
          scale: 1.05
        }}
      />

      {/* Seção de Projetos em Destaque */}
      {featuredProjects.length > 0 && (
        <motion.section
          ref={ref}
          className="py-16 md:py-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Header da seção */}
            <motion.div className="mb-12 md:mb-16" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <span className="text-primary font-medium uppercase tracking-wider text-sm">Destaques</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Projetos em Destaque
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">
                Conheça os projetos que marcaram presença e geraram resultados excepcionais para nossos clientes.
              </p>
            </motion.div>

            {/* Grid de projetos em destaque */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link to={`/portfolio/${project.slug}`}>
                    <div className="relative overflow-hidden rounded-xl aspect-video bg-black/50 border border-white/10 hover:border-primary/30 transition-all duration-500">
                      {/* Imagem */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

                      {/* Conteúdo */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="transform group-hover:translate-y-0 transition-transform duration-500">
                          <div className="inline-flex items-center mb-3">
                            <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 bg-primary/20 text-primary rounded-full">
                              {categoryMap[project.category] || project.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-white/70 mb-3 group-hover:text-white/90 transition-colors duration-300">
                            {project.client}
                          </p>
                          <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            Ver detalhes
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Indicador de destaque */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-primary text-2xl"
                        >
                          ⭐
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Filtros e Busca */}
      <motion.section
        className="py-12 md:py-16 relative border-y border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Busca */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar projetos, clientes ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Filtros de categoria */}
          <motion.div
            className="flex flex-wrap gap-3 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-black border border-primary'
                    : 'bg-white/5 text-white border border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Resultado da busca */}
          {searchQuery && (
            <motion.div
              className="mt-4 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {displayedProjects.length} projeto{displayedProjects.length !== 1 ? 's' : ''} encontrado{displayedProjects.length !== 1 ? 's' : ''}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Grid/Lista de Projetos */}
      <motion.section
        className="py-16 md:py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            {displayedProjects.length > 0 ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <Link to={`/portfolio/${project.slug}`}>
                      <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-black/50 border border-white/10 hover:border-primary/50 transition-all duration-500">
                        {/* Imagem */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 from-5% via-black/60 via-30% to-black/20 to-80% group-hover:from-black/97 group-hover:via-black/70 group-hover:to-black/30 transition-all duration-500" />

                        {/* Efeito shine no hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(236,200,11,0.05) 50%, transparent 100%)'
                          }}
                        />

                        {/* Conteúdo */}
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <motion.div
                            className="transform transition-all duration-500"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                          >
                            {/* Badge de categoria */}
                            <div className="inline-flex items-center mb-3 w-fit">
                              <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 bg-primary/20 text-primary rounded-full group-hover:bg-primary/30 transition-colors duration-300">
                                {categoryMap[project.category] || project.category}
                              </span>
                            </div>

                            {/* Título */}
                            <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {project.title}
                            </h3>

                            {/* Cliente */}
                            <p className="text-sm text-white/70 mb-3 group-hover:text-white/90 transition-colors duration-300">
                              {project.client}
                            </p>

                            {/* Descrição (aparece no hover) */}
                            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-500 mb-3">
                              <p className="text-xs text-white/80 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            {/* Link para detalhes */}
                            <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                              Ver detalhes
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="py-20 text-center"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-8 h-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Nenhum projeto encontrado</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  Tente ajustar sua busca ou categoria para encontrar os projetos que procura.
                </p>
                <motion.button
                  onClick={() => {
                    setActiveCategory('all')
                    setSearchQuery('')
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-full font-medium transition-all duration-300"
                >
                  Limpar Filtros
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Estatísticas */}
      <motion.section
        className="py-16 md:py-20 relative border-y border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '25+', label: 'Projetos Completados' },
              { number: '18+', label: 'Clientes Satisfeitos' },
              { number: '95%', label: 'Taxa de Sucesso' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.h3
                  className="text-4xl md:text-5xl font-bold text-primary mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <CtaSection />
    </Layout>
  )
}

export default PortfolioPage 