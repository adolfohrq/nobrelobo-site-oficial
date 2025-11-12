import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence, useMotionValueEvent, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress para barra no topo
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Verificar se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  // Items de navegação
  const navItems = [
    { name: 'Início', path: '/' },
    {
      name: 'Versões',
      path: '#',
      submenu: [
        { name: '— Home —', path: '#', divider: true },
        { name: 'Home 1', path: '/' },
        { name: 'Home 2', path: '/home2' },
        { name: 'Home 3', path: '/home3' },
        { name: 'Home 7', path: '/home7' },
        { name: 'Home 8', path: '/home8' },
        { name: 'Home 9', path: '/home9' },
        { name: '— Sobre —', path: '#', divider: true },
        { name: 'About 1', path: '/about' },
        { name: 'About 2', path: '/about2' },
        { name: 'About 3', path: '/about3' },
        { name: 'About 9', path: '/about9' },
      ]
    },
    { name: 'Sobre', path: '/about' },
    {
      name: 'Serviços',
      path: '/services',
      submenu: [
        { name: 'SEO Estratégico', path: '/services/seo-estrategico' },
        { name: 'Marketing Digital', path: '/services/marketing-digital' },
        { name: 'Desenvolvimento Web', path: '/services/desenvolvimento-web' },
        { name: 'Social Media', path: '/services/social-media' },
        { name: 'Branding', path: '/services/branding' },
      ]
    },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      {/* Barra de progresso de scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.header 
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'mt-0' : 'mt-0'
        }`}
      >
        {/* Background com glassmorphism premium */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl shadow-2xl border-b border-white/5' 
            : 'bg-gradient-to-r from-background/40 via-background/30 to-background/40 backdrop-blur-md'
        }`}>
          {/* Padrão decorativo sutil */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 200, 11, 0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}></div>
          </div>
          
          {/* Glow effect no topo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-between py-4">
            {/* Logo com efeito premium */}
            <Link to="/" className="relative group flex-shrink-0">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Glow effect amarelo atrás do logo */}
                <div className="absolute inset-0 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <img 
                  src="/logo.png" 
                  alt="Nobre Lobo" 
                  className={`relative z-10 object-contain transition-all duration-500 ${
                    isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
                  }`}
                />
                
                {/* Linha decorativa embaixo do logo */}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Link>

            {/* Navegação Desktop - Centralizada e Premium */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isItemActive = isActive(item.path);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <div 
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => hasSubmenu && setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 flex items-center space-x-1 ${
                        isItemActive 
                          ? 'text-primary' 
                          : 'text-white/80 hover:text-primary'
                      }`}
                    >
                      <span>{item.name}</span>
                      {hasSubmenu && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${
                          activeSubmenu === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                      
                      {/* Indicador ativo único */}
                      {isItemActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      />
                    </Link>

                    {/* Submenu Premium */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 py-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                          >
                            {/* Glow interno */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                            {item.submenu!.map((subitem, idx) => (
                              (subitem as any).divider ? (
                                <div
                                  key={`${subitem.name}-${idx}`}
                                  className="text-xs px-4 py-2 text-primary/60 font-semibold uppercase tracking-wider mt-2 first:mt-0"
                                >
                                  {subitem.name}
                                </div>
                              ) : (
                                <Link
                                  key={subitem.name}
                                  to={subitem.path}
                                  className={`block px-4 py-3 text-sm transition-all duration-200 relative group/sub ${
                                    isActive(subitem.path)
                                      ? 'text-primary bg-primary/5'
                                      : 'text-white/70 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <span className="relative z-10">{subitem.name}</span>
                                  <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover/sub:h-full transition-all duration-300"
                                  />
                                </Link>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTAs e Contato Premium */}
            <div className="flex items-center space-x-3">
              {/* Telefone - Desktop */}
              <a 
                href="tel:+5548996084931" 
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <Phone size={14} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-white/80 group-hover:text-white">+55 (48) 9.9608-4931</span>
              </a>

              {/* Botão CTA Premium */}
              <Link to="/contact" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(236, 200, 11, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-gilroy font-bold text-sm tracking-wide shadow-lg shadow-primary/20 group"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                  
                  <span className="relative z-10 flex items-center">
                    Entre em Contato
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: '0 0 20px rgba(236, 200, 11, 0.5)' }}
                  />
                </motion.button>
              </Link>

              {/* Menu Mobile Button */}
              <motion.button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 flex items-center justify-center transition-colors group"
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <X size={20} className="text-primary" />
                ) : (
                  <Menu size={20} className="text-white/80 group-hover:text-primary transition-colors" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Linha decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </motion.header>

      {/* Menu Mobile - Drawer Premium Fluido */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Menu Drawer Fluido */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[280px] xs:w-[320px] max-w-[85vw] bg-background/98 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Header Minimalista */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <img src="/logo.png" alt="Nobre Lobo" className="h-8" />
                <motion.button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} className="text-white/60" />
                </motion.button>
              </div>

              {/* Navegação Fluida */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                {navItems.map((item, index) => {
                  const isItemActive = isActive(item.path);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => !hasSubmenu && setMobileMenuOpen(false)}
                        className={`relative block px-4 py-3.5 rounded-xl font-gilroy font-bold text-sm transition-all duration-200 ${
                          isItemActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-white/80 hover:bg-white/5 hover:text-white active:scale-[0.98]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          {hasSubmenu && (
                            <ChevronDown size={14} className="text-white/40" />
                          )}
                        </div>
                        
                        {/* Indicador lateral */}
                        {isItemActive && (
                          <motion.div 
                            layoutId="mobileActiveIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                          />
                        )}
                      </Link>

                      {/* Submenu */}
                      {hasSubmenu && (
                        <div className="mt-1.5 ml-3 space-y-1">
                          {item.submenu!.map((subitem, idx) => (
                            (subitem as any).divider ? (
                              <div
                                key={`${subitem.name}-${idx}`}
                                className="text-xs px-4 py-2 text-primary/60 font-semibold uppercase tracking-wider mt-2 first:mt-0"
                              >
                                {subitem.name}
                              </div>
                            ) : (
                              <Link
                                key={subitem.name}
                                to={subitem.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                                  isActive(subitem.path)
                                    ? 'text-primary bg-primary/5'
                                    : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                                }`}
                              >
                                • {subitem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer com CTAs */}
              <div className="p-6 space-y-3 border-t border-white/5 bg-gradient-to-t from-primary/5 to-transparent">
                {/* Telefone */}
                <a 
                  href="tel:+5548996084931"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                >
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm text-white/80">+55 (48) 9.9608-4931</span>
                </a>

                {/* CTA Principal */}
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl font-gilroy font-bold text-sm shadow-lg shadow-primary/20"
                    whileTap={{ scale: 0.98 }}
                  >
                    Entre em Contato
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
