import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Menu, X, Instagram, Facebook } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Detectar scroll para mudar a aparência do header
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYPos;
    const direction = latest > previous ? "down" : "up";
    
    if (latest > 150 && direction === "down" && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    setLastYPos(latest);
  });

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Verificar se o link está ativo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Links de navegação
  const navItems: Array<{ name: string; path: string; submenu?: Array<{ name: string; path: string; divider?: boolean }> }> = [
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
        { name: 'Automação de Marketing', path: '/services/automacao-de-marketing' },
        { name: 'Inteligência Artificial', path: '/services/inteligencia-artificial' },
        { name: 'Tráfego Pago', path: '/services/trafego-pago' },
        { name: 'Marketing Digital', path: '/services/marketing-digital' },
        { name: 'Desenvolvimento Web', path: '/services/desenvolvimento-web' },
        { name: 'Social Media', path: '/services/social-media' },
        { name: 'Branding', path: '/services/branding' },
        { name: 'Design Gráfico', path: '/services/design-grafico' },
      ]
    },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <>
      <nav 
        ref={navRef}
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          opacity: hidden ? 0 : 1,
        }}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3' 
            : 'py-5'
        }`}
      >
        {/* Fundo com efeito de vidro */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}></div>
        
        {/* Linha decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Nobre Lobo" className="h-10 object-contain" />
                <div className="hidden md:block h-8 w-px bg-border/20"></div>
                <div className="hidden md:flex space-x-3">
                  <motion.div
                    onClick={() => window.open('https://www.instagram.com/nobreloboagencia/', '_blank')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    <Instagram size={16} />
                  </motion.div>
                  <motion.div
                    onClick={() => window.open('https://www.facebook.com/nobreloboagencia/', '_blank')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    <Facebook size={16} />
                  </motion.div>
                </div>
              </div>
            </Link>
            
            {/* Links de navegação - Desktop */}
            <div className="hidden lg:flex items-center">
              {navItems.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm uppercase tracking-widest font-medium px-4 py-2 transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'text-primary' 
                        : 'text-white/80 hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {link.submenu && (
                      <span className="ml-1 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </span>
                    )}
                  </Link>
                  
                  {link.submenu && (
                    <div className="absolute left-0 mt-2 w-64 rounded-xl bg-background/90 backdrop-blur-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2">
                        {link.submenu.map((sublink, idx) => (
                          sublink.divider ? (
                            <div
                              key={`${sublink.name}-${idx}`}
                              className="text-xs px-4 py-2 text-primary/60 font-semibold uppercase tracking-wider mt-2 first:mt-0"
                            >
                              {sublink.name}
                            </div>
                          ) : (
                            <Link
                              key={sublink.name}
                              to={sublink.path}
                              className={`block text-sm px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive(sublink.path)
                                  ? 'bg-primary/20 text-primary'
                                  : 'text-white/80 hover:bg-white/5 hover:text-primary'
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Botão de contato */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <Button className="bg-transparent hover:bg-primary text-white hover:text-primary-foreground border border-primary/50 hover:border-primary text-sm uppercase tracking-widest font-medium px-6 py-2 transition-all duration-300">
                  Entre em Contato
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-background z-50 flex flex-col"
          >
            {/* Linha decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.png" alt="Nobre Lobo" className="h-10 object-contain" />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((link, index) => (
                    <motion.div 
                      key={link.name} 
                      className="border-b border-border/10 py-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link 
                        to={link.path} 
                        className={`block text-base uppercase tracking-widest font-medium ${
                          isActive(link.path) ? 'text-primary' : 'text-white/80 hover:text-primary'
                        } transition-colors`}
                        onClick={() => link.submenu ? null : setMobileMenuOpen(false)}
                      >
                        {link.name}
                        {link.submenu && (
                          <span className="ml-2 inline-block float-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </span>
                        )}
                      </Link>
                      
                      {link.submenu && (
                        <div className="mt-2 ml-4 space-y-1">
                          {link.submenu.map((sublink, idx) => (
                            sublink.divider ? (
                              <div
                                key={`${sublink.name}-${idx}`}
                                className="text-xs px-3 py-2 text-primary/60 font-semibold uppercase tracking-wider mt-2 first:mt-0"
                              >
                                {sublink.name}
                              </div>
                            ) : (
                              <Link
                                key={sublink.name}
                                to={sublink.path}
                                className={`block text-sm py-2 px-3 rounded-lg ${
                                  isActive(sublink.path)
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-white/70 hover:bg-white/5 hover:text-primary'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sublink.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Redes sociais mobile */}
                <div className="flex items-center space-x-6 mt-8 justify-center">
                  <motion.div
                    onClick={() => window.open('https://www.instagram.com/nobreloboagencia/', '_blank')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    <Instagram size={18} />
                  </motion.div>
                  <motion.div
                    onClick={() => window.open('https://www.facebook.com/nobreloboagencia/', '_blank')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    <Facebook size={18} />
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-6">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-transparent hover:bg-primary text-white hover:text-primary-foreground border border-primary/50 hover:border-primary text-sm uppercase tracking-widest font-medium py-3 transition-all duration-300"
                >
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botão de scroll para o topo - aparece quando o usuário rola para baixo */}
      <AnimatePresence>
        {isScrolled && !hidden && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-background/80 backdrop-blur-sm text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-primary/30 hover:bg-primary/10 transition-colors"
            aria-label="Voltar ao topo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 