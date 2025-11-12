# Arquitetura do Projeto

## Visão Geral

O Vorix segue uma arquitetura de **Single Page Application (SPA)** baseada em componentes React, com renderização client-side e roteamento gerenciado pelo React Router v6.

## Estrutura de Diretórios

```
src/
├── App.tsx                          # Componente raiz com ErrorBoundary
├── main.tsx                         # Entry point da aplicação
│
├── routes/
│   └── index.tsx                    # Configuração centralizada de rotas
│
├── components/
│   ├── ui/                          # Componentes UI primitivos (Shadcn)
│   │   ├── button.tsx               # Botão com variantes
│   │   ├── accordion.tsx            # Accordion acessível
│   │   ├── dialog.tsx               # Modal/Dialog
│   │   ├── dropdown-menu.tsx        # Menu dropdown
│   │   ├── label.tsx                # Label de formulário
│   │   ├── navigation-menu.tsx      # Menu de navegação
│   │   ├── slot.tsx                 # Slot composition
│   │   └── CustomLink.tsx           # Link customizado
│   │
│   ├── general/                     # Componentes reutilizáveis gerais
│   │   ├── Layout.tsx               # Wrapper principal de layout
│   │   ├── Header.tsx               # Cabeçalho/Navbar
│   │   ├── Hero.tsx                 # Hero genérico
│   │   ├── PageHero.tsx             # Hero de páginas internas
│   │   ├── ServiceCard.tsx          # Card de serviço
│   │   ├── BlogCard.tsx             # Card de blog post
│   │   ├── PortfolioCard.tsx        # Card de projeto
│   │   ├── ScrollAnimation.tsx      # Wrapper de animação de scroll
│   │   ├── ScrollToTop.tsx          # Botão scroll-to-top
│   │   ├── Carousel.tsx             # Wrapper Embla Carousel
│   │   └── [outros 15+ componentes]
│   │
│   ├── sections/                    # Seções completas de páginas
│   │   ├── Footer.tsx               # Rodapé
│   │   ├── ServicesSection.tsx      # Seção de serviços
│   │   ├── PortfolioSection.tsx     # Seção de portfolio
│   │   ├── ContactSection.tsx       # Seção de contato
│   │   ├── TestimonialsSection.tsx  # Depoimentos
│   │   ├── FaqSection.tsx           # Perguntas frequentes
│   │   ├── design-grafico/          # Seções específicas de Design
│   │   └── seo-estrategico/         # Seções específicas de SEO
│   │
│   ├── heros/                       # Variações de hero
│   │   ├── DramaticHero.tsx         # Hero dramático
│   │   ├── GlassmorphismHero.tsx    # Hero glassmorphism
│   │   ├── GradientHero.tsx         # Hero com gradientes
│   │   ├── ImageSplitHero.tsx       # Hero split com imagem
│   │   ├── MinimalHero.tsx          # Hero minimalista
│   │   ├── NeumorphicHero.tsx       # Hero neumórfico
│   │   ├── ParticlesHero.tsx        # Hero com partículas
│   │   └── VideoHero.tsx            # Hero com vídeo
│   │
│   ├── icons/                       # Ícones customizados (SVG)
│   │   ├── AiIcon.tsx               # Ícone de IA
│   │   ├── BrandingIcon.tsx         # Ícone de branding
│   │   ├── ServiceIcons.tsx         # Ícones de serviços
│   │   └── [15+ ícones SVG]
│   │
│   ├── knowledge-base/              # Componentes da KB
│   │   ├── ArticleContent.tsx       # Conteúdo do artigo
│   │   ├── KnowledgeBaseCard.tsx    # Card de artigo KB
│   │   ├── SearchBar.tsx            # Barra de busca
│   │   └── Sidebar.tsx              # Sidebar de navegação
│   │
│   └── examples/                    # Componentes de exemplo
│
├── pages/                           # Páginas completas
│   ├── Home.tsx                     # Homepage principal
│   ├── Home2.tsx                    # Variante A/B #2
│   ├── Home3.tsx                    # Variante A/B #3
│   ├── Home7.tsx, Home8.tsx, Home9.tsx  # Mais variantes
│   ├── About.tsx, About2.tsx, About3.tsx
│   ├── Services.tsx                 # Overview de serviços
│   ├── Portfolio.tsx                # Galeria de projetos
│   ├── Blog.tsx                     # Listagem de blog
│   ├── BlogArticle.tsx              # Artigo individual
│   ├── Contact.tsx                  # Página de contato
│   ├── KnowledgeBase.tsx            # Hub da base de conhecimento
│   ├── ArticleDetail.tsx            # Detalhe de artigo KB
│   ├── CategoryPage.tsx             # Filtro por categoria
│   ├── TagPage.tsx                  # Filtro por tag
│   └── services/                    # Páginas de serviços
│       ├── seo-estrategico.tsx
│       ├── automacao-de-marketing.tsx
│       ├── inteligencia-artificial.tsx
│       ├── trafego-pago.tsx
│       ├── marketing-digital.tsx
│       ├── desenvolvimento-web.tsx
│       ├── social-media.tsx
│       ├── branding.tsx
│       └── design-grafico.tsx
│
├── styles/
│   ├── globals.css                  # Estilos globais + Tailwind
│   └── fonts.css                    # Imports de fontes
│
├── data/
│   └── knowledge-base-data.ts       # Dados estáticos da KB
│
├── types/
│   ├── index.d.ts                   # Tipos globais
│   └── knowledge-base.ts            # Tipos da KB
│
├── utils/
│   ├── cn.ts                        # Class name merger
│   ├── routeChecker.ts              # Validação de rotas
│   └── routerWarnings.ts            # Supressão de warnings
│
└── assets/                          # Imagens, SVGs, media
```

## Hierarquia de Componentes

### Fluxo de Renderização

```
App (ErrorBoundary + HelmetProvider)
  │
  └─── RouterProvider (React Router)
         │
         └─── Layout (Background, Header, Footer)
                │
                └─── Page Component (Home, Services, etc.)
                       │
                       └─── Sections (ServicesSection, etc.)
                              │
                              └─── General Components (Cards, etc.)
                                     │
                                     └─── UI Primitives (Button, etc.)
```

### Exemplo Concreto: Homepage

```tsx
<App>
  <ErrorBoundary>
    <HelmetProvider>
      <RouterProvider>
        <Layout>
          <Home>
            <Hero />
            <ServicesSection>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </ServicesSection>
            <PortfolioSection>
              <PortfolioCard />
              <PortfolioCard />
            </PortfolioSection>
            <TestimonialsSection />
            <ContactSection />
          </Home>
        </Layout>
      </RouterProvider>
    </HelmetProvider>
  </ErrorBoundary>
</App>
```

## Camadas de Abstração

### 1. UI Primitives (components/ui/)
**Responsabilidade**: Componentes básicos reutilizáveis e acessíveis

**Características**:
- Baseados em Radix UI
- Altamente customizáveis
- Acessíveis por padrão (WAI-ARIA)
- Sem lógica de negócio
- Estilizados com Tailwind + CVA (Class Variance Authority)

**Exemplos**:
```tsx
// Button com variantes
<Button variant="default" size="lg">Clique aqui</Button>
<Button variant="outline" size="sm">Secundário</Button>

// Accordion acessível
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta?</AccordionTrigger>
    <AccordionContent>Resposta</AccordionContent>
  </AccordionItem>
</Accordion>
```

### 2. General Components (components/general/)
**Responsabilidade**: Componentes de domínio reutilizáveis

**Características**:
- Compostos de UI primitives
- Contêm lógica de apresentação
- Recebem dados via props
- Podem ter estado local
- Animações e interações

**Exemplos**:
```tsx
// ServiceCard - composto de UI primitives
<ServiceCard
  title="SEO Estratégico"
  description="..."
  icon={<SearchIcon />}
  index={0}
/>

// BlogCard - com imagem e metadata
<BlogCard
  title="Título do Post"
  excerpt="..."
  image="/path/to/image.jpg"
  category="Marketing"
  readTime={5}
/>
```

### 3. Sections (components/sections/)
**Responsabilidade**: Seções completas de páginas

**Características**:
- Compostas de General Components
- Auto-contidas (layout + lógica)
- Recebem dados como props
- Incluem animações de scroll
- Estrutura semântica (<section>)

**Exemplos**:
```tsx
// ServicesSection - exibe lista de serviços
<ServicesSection services={servicesData} />

// PortfolioSection - galeria de projetos
<PortfolioSection projects={projectsData} />
```

### 4. Pages (pages/)
**Responsabilidade**: Páginas completas

**Características**:
- Compostas de Sections
- Gerenciam dados da página
- SEO (Helmet)
- Layout específico se necessário

**Exemplos**:
```tsx
const Home: React.FC = () => {
  const services = [...];
  const projects = [...];

  return (
    <>
      <Helmet>
        <title>Vorix - Agência de Marketing</title>
      </Helmet>
      <Hero />
      <ServicesSection services={services} />
      <PortfolioSection projects={projects} />
      <ContactSection />
    </>
  );
};
```

## Padrões Arquiteturais

### 1. Composition Pattern

Componentes complexos são compostos de componentes simples:

```tsx
// Ruim: Componente monolítico
<MegaComponent data={data} />

// Bom: Composição
<Section>
  <SectionHeader title="Título" badge="Novo" />
  <Grid>
    {items.map(item => (
      <Card key={item.id}>
        <CardImage src={item.image} />
        <CardContent>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </Grid>
</Section>
```

### 2. Presentational vs Container

**Presentational Components** (maioria):
- Focados em como as coisas aparecem
- Recebem dados via props
- Não têm estado (ou estado UI apenas)
- Exemplo: ServiceCard, BlogCard

**Container Components** (páginas):
- Focados em como as coisas funcionam
- Gerenciam dados e estado
- Passam dados para presentational
- Exemplo: Home, Services

### 3. Higher-Order Components (HOC)

**ScrollAnimation** é um HOC que adiciona animações:

```tsx
// HOC que envolve children com animação
<ScrollAnimation yRange={[100, 0]} opacityRange={[0, 1]}>
  <ServiceCard {...props} />
</ScrollAnimation>
```

### 4. Render Props

Usado em componentes como Carousel:

```tsx
<Carousel>
  {(emblaApi) => (
    // Acesso à API do Embla
    <div>...</div>
  )}
</Carousel>
```

## Sistema de Roteamento

### Estrutura de Rotas (src/routes/index.tsx)

```tsx
const router = createBrowserRouter([
  // Rotas estáticas
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },

  // Rotas dinâmicas
  { path: "/services/:slug", element: <ServicePage /> },
  { path: "/blog/:slug", element: <BlogArticle /> },

  // Knowledge Base
  { path: "/knowledge-base", element: <KnowledgeBase /> },
  { path: "/knowledge-base/:articleId", element: <ArticleDetail /> },
  { path: "/knowledge-base/category/:categoryName", element: <CategoryPage /> },
  { path: "/knowledge-base/tag/:tagName", element: <TagPage /> },

  // A/B Testing variants
  { path: "/home2", element: <Home2 /> },
  { path: "/home3", element: <Home3 /> },

  // 404
  { path: "*", element: <NotFound /> }
]);
```

### Mapeamento de Serviços

```tsx
const servicePages = {
  'seo': SEOPage,
  'seo-estrategico': SEOPage,
  'automacao-de-marketing': AutomacaoMarketingPage,
  'inteligencia-artificial': IAPage,
  'trafego-pago': TrafegoPagoPage,
  'marketing-digital': MarketingDigitalPage,
  'desenvolvimento-web': DesenvolvimentoWebPage,
  'social-media': SocialMediaPage,
  'branding': BrandingPage,
  'design-grafico': DesignGraficoPage,
};

// ServicePage component resolve o slug
const ServicePage = () => {
  const { slug } = useParams();
  const Component = servicePages[slug];
  return Component ? <Component /> : <NotFound />;
};
```

## Layout System

### Layout Principal (components/general/Layout.tsx)

```tsx
<div className="min-h-screen bg-background">
  {/* Background Grid Pattern */}
  <div className="fixed inset-0 bg-grid-pattern opacity-10" />

  {/* Gradient Overlays */}
  <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial" />

  {/* Conteúdo */}
  <Header />
  <main>{children}</main>
  <Footer />
  <ScrollToTop />
</div>
```

### Características do Layout:
1. **Background fixo** com padrão de grid
2. **Overlays de gradiente** para profundidade visual
3. **Header fixo** (sticky) no topo
4. **Footer** em todas as páginas
5. **ScrollToTop button** quando scroll > 300px

## Gerenciamento de Estado

### Estado Local (useState)

Usado para:
- UI state (menu aberto/fechado, hover, etc.)
- Form inputs
- Scroll position
- Active tabs/accordions

```tsx
const [isOpen, setIsOpen] = useState(false);
const [activeTab, setActiveTab] = useState('tab1');
```

### Estado Derivado

Calculado a partir de props ou outros estados:

```tsx
const filteredProjects = projects.filter(p => p.category === activeCategory);
```

### Estado Global

**Não utilizado no projeto** - Todo estado é local aos componentes

Se necessário no futuro, considerar:
- Context API (para temas, autenticação)
- Zustand (estado global leve)
- Redux (aplicações complexas)

## Fluxo de Dados

### Unidirecional (Top-Down)

```
Page Component (dados)
      ↓ props
Section Component
      ↓ props
General Component (Card)
      ↓ props
UI Primitive (Button)
```

### Exemplo Prático:

```tsx
// Page: dados
const Home = () => {
  const services = [
    { id: 1, title: 'SEO', description: '...', icon: <SeoIcon /> },
    // ...
  ];

  return <ServicesSection services={services} />;
};

// Section: distribui dados
const ServicesSection = ({ services }) => {
  return (
    <section>
      <div className="grid">
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};

// Card: renderiza dados
const ServiceCard = ({ title, description, icon }) => {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

## Path Aliases

Configurado no `tsconfig.json` e `vite.config.ts`:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Uso**:
```tsx
// Sem alias (relativo)
import { Button } from '../../../components/ui/button';

// Com alias (absoluto)
import { Button } from '@/components/ui/button';
```

## Build Output

### Desenvolvimento (npm run dev)
- Servidor Vite em `localhost:3010`
- HMR ativo
- Source maps
- Sem minificação

### Produção (npm run build)
```
dist/
├── index.html              # HTML principal
├── assets/
│   ├── index-[hash].js     # Bundle JavaScript
│   ├── index-[hash].css    # Bundle CSS
│   └── [assets]-[hash]     # Assets otimizados
└── [public files]          # Arquivos públicos copiados
```

## Error Handling

### ErrorBoundary (App.tsx)

```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error("Erro na aplicação:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 404 Handling

```tsx
// NotFound component
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('404:', location.pathname);
  }, []);

  return (
    <div>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para home</Link>
    </div>
  );
};
```

## Performance Optimizations

1. **Code Splitting**: Automático por rota (React Router + Vite)
2. **Lazy Loading**: Imagens com `loading="lazy"`
3. **Tree Shaking**: Vite remove código não utilizado
4. **CSS Purge**: Tailwind remove classes não utilizadas
5. **Asset Optimization**: Vite otimiza imagens e SVGs
6. **HMR**: Hot Module Replacement no dev

## Conclusão

A arquitetura do Vorix é:
- **Modular**: Componentes independentes e reutilizáveis
- **Escalável**: Fácil adicionar novos componentes/páginas
- **Manutenível**: Estrutura clara e padrões consistentes
- **Performática**: Otimizações automáticas e manuais
- **Type-Safe**: TypeScript em todo o projeto

---

[← Anterior: Visão Geral](./02-project-overview.md) | [Próximo: Padrões de Componentes →](./04-component-patterns.md)
