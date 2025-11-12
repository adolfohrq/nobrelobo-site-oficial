import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/data/portfolio-data';
import PortfolioCard from './PortfolioCard';
import CarouselControls from './CarouselControls';
import { usePortfolioCarousel } from '@/hooks/usePortfolioCarousel';

interface PortfolioCarouselProps {
  items: PortfolioItem[];
  activeCategory: string;
  isInView: boolean;
}

// Keyframes para animação de brilho
const shimmerKeyframes = `
@keyframes shimmerEffect {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0% 0;
  }
}
`;

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({
  items,
  activeCategory,
  isInView
}) => {
  // Filtrar itens com base na categoria
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  // Custom hook com toda a lógica do carrossel
  const {
    currentSlide,
    isPaused,
    itemsPerView,
    carouselRef,
    nextSlide,
    prevSlide,
    goToSlide,
    togglePause,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleMouseEnter,
    handleMouseLeave
  } = usePortfolioCarousel({ filteredItems, isInView });

  // Resetar slide quando categoria mudar
  useEffect(() => {
    goToSlide(0);
  }, [activeCategory]);

  if (filteredItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white/60">Nenhum projeto encontrado nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Injetar keyframes de animação */}
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />

      {/* Container do carrossel */}
      <motion.div
        ref={carouselRef}
        className="overflow-visible relative w-full cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          WebkitPerspective: 1000,
          perspective: 1000,
          WebkitTransform: "translate3d(0, 0, 0)",
          transform: "translate3d(0, 0, 0)"
        }}
      >
        <motion.div
          className="flex carousel-inner"
          initial={false}
          animate={{
            x: `calc(-${(currentSlide % filteredItems.length) * 100}% / ${itemsPerView})`
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 45,
            mass: 0.8,
            velocity: 0
          }}
        >
          {/* Renderizar cards principais */}
          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={`${item.id}-${index}`}
              {...item}
              itemsPerView={itemsPerView}
            />
          ))}

          {/* Duplicar cards para loop infinito */}
          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={`duplicate-${item.id}-${index}`}
              {...item}
              itemsPerView={itemsPerView}
            />
          ))}
        </motion.div>

        {/* Botões laterais de navegação (desktop only) */}
        {filteredItems.length > itemsPerView && (
          <div className="hidden md:block">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 z-30"
              aria-label="Slide anterior"
            >
              <svg
                className="w-6 h-6 text-white hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 z-30"
              aria-label="Próximo slide"
            >
              <svg
                className="w-6 h-6 text-white hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Controles de navegação */}
      {filteredItems.length > itemsPerView && (
        <CarouselControls
          currentSlide={currentSlide}
          totalSlides={filteredItems.length}
          isPaused={isPaused}
          isInView={isInView}
          onPrevious={prevSlide}
          onNext={nextSlide}
          onTogglePause={togglePause}
          onGoToSlide={goToSlide}
        />
      )}
    </div>
  );
};

export default PortfolioCarousel;
