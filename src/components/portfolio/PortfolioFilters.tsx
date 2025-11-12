import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioCategory } from '@/data/portfolio-data';

interface PortfolioFiltersProps {
  categories: PortfolioCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isInView: boolean;
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  isInView
}) => {
  return (
    <div className="container mx-auto px-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`group relative px-4 py-2 sm:px-3 sm:py-1.5 text-xs font-medium transition-all duration-300 overflow-hidden ${
              activeCategory === category.id
                ? 'text-primary'
                : 'text-white/60 hover:text-white/90'
            }`}
            aria-label={`Filtrar por ${category.label}`}
            aria-pressed={activeCategory === category.id}
          >
            {/* Indicador de ativo */}
            {activeCategory === category.id && (
              <motion.div
                layoutId="activeCategoryIndicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Efeito hover */}
            <span className="relative z-10">{category.label}</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioFilters;
