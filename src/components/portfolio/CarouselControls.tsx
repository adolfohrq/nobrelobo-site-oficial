import React from 'react';
import { motion } from 'framer-motion';

interface CarouselControlsProps {
  currentSlide: number;
  totalSlides: number;
  isPaused: boolean;
  isInView: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onGoToSlide: (index: number) => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  currentSlide,
  totalSlides,
  isPaused,
  isInView,
  onPrevious,
  onNext,
  onTogglePause,
  onGoToSlide
}) => {
  return (
    <>
      {/* Botões de navegação principais */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between mt-6">
          {/* Botão anterior */}
          <motion.button
            onClick={onPrevious}
            className="group w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            aria-label="Slide anterior"
          >
            <svg
              className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Botão play/pause */}
          <motion.button
            onClick={onTogglePause}
            className={`group w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isPaused
                ? 'bg-primary/30 border-primary/50 shadow-lg shadow-primary/30'
                : 'bg-white/5 border-white/10 hover:bg-primary/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20'
            } backdrop-blur-sm`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            aria-label={isPaused ? "Retomar autoplay" : "Pausar autoplay"}
          >
            {isPaused ? (
              <svg
                className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </motion.button>

          {/* Botão próximo */}
          <motion.button
            onClick={onNext}
            className="group w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            aria-label="Próximo slide"
          >
            <svg
              className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Indicadores de slide (dots) */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide % totalSlides === index
                  ? 'bg-primary w-8 sm:w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselControls;
