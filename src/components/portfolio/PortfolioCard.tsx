import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/data/portfolio-data';

interface PortfolioCardProps extends PortfolioItem {
  itemsPerView: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  category,
  image,
  client,
  description,
  itemsPerView
}) => {
  const cardWidth =
    itemsPerView === 1
      ? 'min(90vw, 380px)'
      : itemsPerView === 2
        ? 'calc(50vw - 48px)'
        : itemsPerView === 3
          ? 'calc(33.333vw - 48px)'
          : 'calc(25vw - 48px)';

  return (
    <motion.div
      className="flex-shrink-0 relative z-10 pr-3 md:pr-4"
      style={{
        width: cardWidth,
        maxWidth: itemsPerView === 1 ? "400px" : "420px",
        minWidth: itemsPerView === 1 ? "300px" : "240px",
        willChange: "transform",
        transform: "translate3d(0, 0, 0)"
      }}
    >
      <div className="group relative rounded-lg overflow-visible aspect-[4/5] bg-white/5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]">
        {/* Efeito de brilho amarelo nos cantos */}
        <motion.div
          className="absolute -inset-[1px] rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: "linear-gradient(90deg, transparent, transparent, transparent, rgba(236,200,11,0.08))",
            backgroundSize: "400% 100%",
            animation: "shimmerEffect 3s infinite"
          }}
        />

        {/* Brilhos nos cantos */}
        <motion.div
          className="absolute -top-1 -right-1 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 z-0"
          style={{
            background: "radial-gradient(circle, rgba(236,200,11,0.15) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="absolute -bottom-1 -left-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-0"
          style={{
            background: "radial-gradient(circle, rgba(236,200,11,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Card com conteúdo */}
        <motion.div
          className="w-full h-full relative z-10 bg-black/30 rounded-lg"
          whileHover={{
            boxShadow: "0 0 25px 2px rgba(236,200,11,0.1)",
            transition: { duration: 0.5 }
          }}
        >
          {/* Imagem */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <motion.img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700"
              whileHover={{
                scale: 1.05,
                filter: "brightness(1.05)",
                transition: { duration: 0.7, ease: "easeOut" }
              }}
            />
          </div>

          {/* Gradiente overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 from-10% via-black/75 via-30% to-black/10 to-90% opacity-90 rounded-lg group-hover:from-black/95 group-hover:via-black/85 group-hover:via-60% group-hover:to-black/40 transition-all duration-700 ease-in-out" />

          {/* Borda melhorada */}
          <motion.div
            className="absolute inset-0 rounded-lg overflow-hidden z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div
              className="absolute inset-px rounded-lg border-2 border-transparent bg-clip-padding"
              style={{
                background: "linear-gradient(135deg, rgba(236,200,11,0.2), transparent 50%, rgba(236,200,11,0.1))",
              }}
            />
          </motion.div>

          {/* Borda padrão */}
          <motion.div
            className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-primary/20 transition-colors duration-500 z-10"
          />

          {/* Conteúdo */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end z-20 overflow-visible">
            <motion.div
              initial={{ y: 5 }}
              whileHover={{ y: 0, transition: { duration: 0.3 } }}
              className="transform transition-transform duration-300 ease-out"
            >
              {/* Tag de categoria */}
              <div className="flex items-center mb-2 transform transition-transform duration-300 ease-out">
                <span className="text-primary font-medium uppercase tracking-wider text-[10px] px-2 py-0.5 bg-primary/10 rounded-sm">
                  {category.replace('-', ' ')}
                </span>
              </div>

              {/* Título do projeto */}
              <h3 className="text-white text-base sm:text-lg font-gilroy font-bold mb-1.5 group-hover:text-primary transition-all duration-300 drop-shadow-sm">
                {title}
              </h3>

              {/* Cliente */}
              <p className="text-white/80 text-xs mb-2 transition-all duration-300 group-hover:text-white/95">
                {client}
              </p>

              {/* Linha decorativa amarela */}
              <motion.div
                className="h-px bg-primary/30 w-0 group-hover:w-1/2 transition-all duration-500 mb-2"
              />

              {/* Descrição com animação de entrada */}
              <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out overflow-visible transform translate-y-2 group-hover:translate-y-0">
                <p className="text-white/90 text-xs mb-3 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Link para detalhes */}
              <div className="inline-flex items-center overflow-visible">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-primary text-black text-xs font-medium rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out"
                >
                  Ver projeto
                  <span className="ml-1.5 inline-block text-xs">→</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
