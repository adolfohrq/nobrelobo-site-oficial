import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slugify } from '@/utils/slugify';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index }) => {
  // Gera o slug para o serviço usando o utilitário
  const serviceSlug = slugify(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/20 transition-all duration-300 group"
    >
      {/* Ícone do serviço */}
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 transform scale-125">
          {icon}
        </div>
      </div>
      
      {/* Título do serviço */}
      <h3 className="text-2xl font-gilroy font-bold text-white mb-4 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      {/* Descrição do serviço */}
      <p className="text-white/70 mb-6">
        {description}
      </p>
      
      {/* Botão "Saiba mais" com link para a página de detalhes */}
      <Link to={`/services/${serviceSlug}`}>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-primary flex items-center text-sm font-medium"
        >
          Saiba mais
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ECC80B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ServiceCard; 