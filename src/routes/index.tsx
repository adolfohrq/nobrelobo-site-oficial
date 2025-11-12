import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Home2 from '../pages/Home2';
import Home3 from '../pages/Home3';
import Home7 from '../pages/Home7';
import Home8 from '../pages/Home8';
import Home9 from '../pages/Home9';
import About from '../pages/About';
import About2 from '../pages/About2';
import About3 from '../pages/About3';
import About4 from '../pages/About4';
import About9 from '../pages/About9';
import Portfolio from '../pages/Portfolio';
import Blog from '../pages/Blog';
import BlogArticle from '../pages/BlogArticle';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import KnowledgeBase from '../pages/KnowledgeBase';
import ArticleDetail from '../pages/ArticleDetail';
import CategoryPage from '../pages/CategoryPage';
import TagPage from '../pages/TagPage';
import HerosPage from '../pages/HerosPage';
import RecursosGratuitos from '../pages/RecursosGratuitos';
import Privacidade from '../pages/Privacidade';
import routeChecker from '../utils/routeChecker';
import SEOPage from '../pages/services/seo-estrategico';
import AutomacaoMarketingPage from '../pages/services/automacao-de-marketing';
import InteligenciaArtificialPage from '../pages/services/inteligencia-artificial';
import TrafegoPagoPage from '../pages/services/trafego-pago';
import MarketingDigitalPage from '../pages/services/marketing-digital';
import DesenvolvimentoWebPage from '../pages/services/desenvolvimento-web';
import SocialMediaPage from '../pages/services/social-media';
import BrandingPage from '../pages/services/branding';
import DesignGraficoPage from '../pages/services/design-grafico';

// Componente para página não encontrada
const NotFound = () => {
  // Registra a navegação para uma página não encontrada
  const pathname = window.location.pathname;
  routeChecker.logNavigation(pathname);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111]">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-white text-xl mb-8">Página não encontrada</p>
      <a href="/" className="px-6 py-3 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors">
        Voltar para Home
      </a>
    </div>
  );
};

// Mapeamento de slugs para componentes de serviços
const servicePages = {
  'seo': SEOPage,
  'seo-estrategico': SEOPage,
  'automacao-de-marketing': AutomacaoMarketingPage,
  'inteligencia-artificial': InteligenciaArtificialPage,
  'trafego-pago': TrafegoPagoPage,
  'marketing-digital': MarketingDigitalPage,
  'desenvolvimento-web': DesenvolvimentoWebPage,
  'social-media': SocialMediaPage,
  'branding': BrandingPage,
  'design-grafico': DesignGraficoPage,
  // Adicione outros serviços aqui conforme forem criados
  // 'design-grafico': DesignPage,
  // etc.
};

// Componente para renderizar a página de serviço com base no slug
const ServicePage = () => {
  const slug = window.location.pathname.split('/').pop() || '';
  
  // Verifica se existe um componente para o slug
  const ServiceComponent = servicePages[slug as keyof typeof servicePages];
  
  if (ServiceComponent) {
    return <ServiceComponent />;
  }
  
  // Se não encontrar o componente, redireciona para a página 404
  return <NotFound />;
};

// Criando o roteador com as configurações básicas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home2',
    element: <Home2 />
  },
  {
    path: '/home3',
    element: <Home3 />
  },
  {
    path: '/home7',
    element: <Home7 />
  },
  {
    path: '/home8',
    element: <Home8 />
  },
  {
    path: '/home9',
    element: <Home9 />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/about2',
    element: <About2 />
  },
  {
    path: '/about3',
    element: <About3 />
  },
  {
    path: '/about4',
    element: <About4 />
  },
  {
    path: '/about9',
    element: <About9 />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/services/seo-estrategico',
    element: <SEOPage />
  },
  {
    path: '/services/automacao-de-marketing',
    element: <AutomacaoMarketingPage />
  },
  {
    path: '/services/inteligencia-artificial',
    element: <InteligenciaArtificialPage />
  },
  {
    path: '/services/trafego-pago',
    element: <TrafegoPagoPage />
  },
  {
    path: '/services/marketing-digital',
    element: <MarketingDigitalPage />
  },
  {
    path: '/services/desenvolvimento-web',
    element: <DesenvolvimentoWebPage />
  },
  {
    path: '/services/social-media',
    element: <SocialMediaPage />
  },
  {
    path: '/services/branding',
    element: <BrandingPage />
  },
  {
    path: '/services/design-grafico',
    element: <DesignGraficoPage />
  },
  {
    path: '/services/:slug',
    element: <ServicePage />
  },
  {
    path: '/portfolio',
    element: <Portfolio />
  },
  {
    path: '/heros',
    element: <HerosPage />
  },
  {
    path: '/recursos-gratuitos',
    element: <RecursosGratuitos />
  },
  {
    path: '/privacidade',
    element: <Privacidade />
  },
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/blog/:slug',
    element: <BlogArticle />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  // Rotas da Base de Conhecimentos
  {
    path: '/knowledge-base',
    element: <KnowledgeBase />
  },
  {
    path: '/knowledge-base/:articleId',
    element: <ArticleDetail />
  },
  {
    path: '/knowledge-base/category/:categoryName',
    element: <CategoryPage />
  },
  {
    path: '/knowledge-base/tag/:tagName',
    element: <TagPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes; 