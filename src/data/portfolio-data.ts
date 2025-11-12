// Tipos para os projetos do portfólio
export interface PortfolioItem {
  id: number;
  title: string;
  category: 'branding' | 'social-media' | 'websites' | 'videos';
  image: string;
  client: string;
  description: string;
  year: string;
}

export interface PortfolioCategory {
  id: string;
  label: string;
}

// Categorias disponíveis para filtro
export const portfolioCategories: PortfolioCategory[] = [
  { id: 'all', label: 'Todos' },
  { id: 'branding', label: 'Branding' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'websites', label: 'Websites' },
  { id: 'videos', label: 'Vídeos' }
];

// Dados do portfólio
export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Identidade Visual Moderna",
    category: "branding",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1000",
    client: "Café Aroma",
    description: "Redesenho completo da marca com foco em sustentabilidade e modernidade",
    year: "2023"
  },
  {
    id: 2,
    title: "Campanha de Lançamento",
    category: "branding",
    image: "https://images.unsplash.com/photo-1600775508114-5c30cf911a40?q=80&w=1000",
    client: "Tech Solutions",
    description: "Identidade visual para lançamento de produto inovador no mercado",
    year: "2023"
  },
  {
    id: 3,
    title: "Estratégia de Conteúdo",
    category: "social-media",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000",
    client: "Moda Express",
    description: "Planejamento e produção de conteúdo para Instagram e TikTok",
    year: "2023"
  },
  {
    id: 4,
    title: "Campanha Sazonal",
    category: "social-media",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    client: "Beleza Natural",
    description: "Estratégia de conteúdo para campanha de verão com influenciadores",
    year: "2022"
  },
  {
    id: 5,
    title: "E-commerce Responsivo",
    category: "websites",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000",
    client: "Moda Sustentável",
    description: "Desenvolvimento de loja online com foco em experiência do usuário",
    year: "2023"
  },
  {
    id: 6,
    title: "Portal Corporativo",
    category: "websites",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000",
    client: "Construtora Horizonte",
    description: "Website institucional com área de cliente e integração com CRM",
    year: "2022"
  }
];
