import { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '@/data/portfolio-data';

interface UsePortfolioCarouselProps {
  filteredItems: PortfolioItem[];
  isInView: boolean;
}

export const usePortfolioCarousel = ({ filteredItems, isInView }: UsePortfolioCarouselProps) => {
  // Estados principais
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Estados de interação
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Ref para o container do carrossel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Navegação
  const nextSlide = () => setCurrentSlide(prev => prev + 1);
  const prevSlide = () => setCurrentSlide(prev => prev - 1);
  const goToSlide = (index: number) => setCurrentSlide(index);
  const togglePause = () => setIsPaused(prev => !prev);

  // Responsividade - calcular itens por visualização
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) {
          setItemsPerView(1);
        } else if (width < 1024) {
          setItemsPerView(2);
        } else if (width < 1536) {
          setItemsPerView(3);
        } else {
          setItemsPerView(4);
        }
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide, filteredItems.length, isInView, itemsPerView]);

  // Loop infinito - resetar posição
  useEffect(() => {
    if (currentSlide >= filteredItems.length * 2) {
      setTimeout(() => {
        setCurrentSlide(currentSlide % filteredItems.length);
      }, 10);
    } else if (currentSlide < 0) {
      setTimeout(() => {
        setCurrentSlide(filteredItems.length + currentSlide);
      }, 10);
    }
  }, [currentSlide, filteredItems.length]);

  // Navegação por teclado
  useEffect(() => {
    if (!isInView) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, isPaused]);

  // Handlers de touch (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    setTouchDelta(diff);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 75) {
      if (touchDelta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setIsTouching(false);
    setTouchDelta(0);
    setTimeout(() => setIsPaused(false), 500);
  };

  // Handlers de mouse drag (desktop)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPaused(true);
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = dragStartX - currentX;

    if (diff > 50) {
      nextSlide();
      setIsDragging(false);
    } else if (diff < -50) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    handleDragEnd();
  };

  return {
    // Estados
    currentSlide,
    isPaused,
    itemsPerView,
    carouselRef,

    // Ações
    nextSlide,
    prevSlide,
    goToSlide,
    togglePause,

    // Handlers de touch
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,

    // Handlers de drag
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleMouseEnter,
    handleMouseLeave
  };
};
