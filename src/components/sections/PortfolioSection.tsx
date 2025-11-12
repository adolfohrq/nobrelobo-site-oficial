import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../general/SectionHeader';
import PortfolioFilters from '../portfolio/PortfolioFilters';
import PortfolioCarousel from '../portfolio/PortfolioCarousel';
import { portfolioData, portfolioCategories } from '@/data/portfolio-data';

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 relative overflow-hidden"
      tabIndex={0}
    >
      <div className="relative z-10">
        {/* Cabeçalho da seção */}
        <div className="container mx-auto px-4 mb-10">
          <SectionHeader
            title={
              <>
                Projetos que <span className="text-primary">transformam</span>
              </>
            }
            subtitle="Soluções criativas que destacam nossos clientes no mercado, com foco em resultados reais e inovação."
            badge="Nosso Portfólio"
            floatingTitleText="PORTFÓLIO"
            iconComponent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
            }
          />
        </div>

        {/* Filtros de categoria */}
        <PortfolioFilters
          categories={portfolioCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          isInView={isInView}
        />

        {/* Carrossel de projetos */}
        <PortfolioCarousel
          items={portfolioData}
          activeCategory={activeCategory}
          isInView={isInView}
        />

        {/* Botão ver todos */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link to="/portfolio" className="group inline-flex items-center">
              <span className="relative text-white text-lg font-medium overflow-hidden">
                Ver todos os projetos
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </span>
              <motion.svg
                className="ml-3 w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  repeatDelay: 1
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Divisor com gradiente */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </section>
  );
};

export default PortfolioSection;
