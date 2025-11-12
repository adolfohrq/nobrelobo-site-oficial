# Rotas e Navegação

Este documento descreve o sistema de roteamento do projeto Vorix usando React Router v6.

## Configuração do Router

### Estrutura Centralizada (src/routes/index.tsx)

Todas as rotas são definidas em um único arquivo para facilitar manutenção:

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
// ... outros imports

const router = createBrowserRouter([
  // Rotas aqui
]);

export default router;
```

## Tipos de Rotas

### 1. Rotas Estáticas

Rotas fixas com componentes dedicados:

```tsx
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/blog', element: <Blog /> },
  { path: '/contact', element: <Contact /> },
]);
```

### 2. Rotas Dinâmicas

Rotas com parâmetros variáveis:

```tsx
const router = createBrowserRouter([
  // Serviço específico por slug
  {
    path: '/services/:slug',
    element: <ServicePage />
  },

  // Artigo de blog por slug
  {
    path: '/blog/:slug',
    element: <BlogArticle />
  },

  // Knowledge Base por ID
  {
    path: '/knowledge-base/:articleId',
    element: <ArticleDetail />
  },
]);
```

**Acessando parâmetros**:

```tsx
import { useParams } from 'react-router-dom';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  return <div>Serviço: {slug}</div>;
};
```

### 3. Rotas de Knowledge Base

Sistema completo de filtros:

```tsx
const router = createBrowserRouter([
  // Hub principal
  {
    path: '/knowledge-base',
    element: <KnowledgeBase />
  },

  // Artigo específico
  {
    path: '/knowledge-base/:articleId',
    element: <ArticleDetail />
  },

  // Filtro por categoria
  {
    path: '/knowledge-base/category/:categoryName',
    element: <CategoryPage />
  },

  // Filtro por tag
  {
    path: '/knowledge-base/tag/:tagName',
    element: <TagPage />
  },
]);
```

### 4. Rotas de A/B Testing

Múltiplas variantes de páginas:

```tsx
const router = createBrowserRouter([
  // Variantes de Home
  { path: '/', element: <Home /> },
  { path: '/home2', element: <Home2 /> },
  { path: '/home3', element: <Home3 /> },
  { path: '/home7', element: <Home7 /> },
  { path: '/home8', element: <Home8 /> },
  { path: '/home9', element: <Home9 /> },

  // Variantes de About
  { path: '/about', element: <About /> },
  { path: '/about2', element: <About2 /> },
  { path: '/about3', element: <About3 /> },
]);
```

### 5. Rota 404

Catch-all para páginas não encontradas:

```tsx
const router = createBrowserRouter([
  // ... outras rotas

  // 404 - sempre por último
  {
    path: '*',
    element: <NotFound />
  },
]);
```

## Mapeamento de Serviços

### Sistema de Mapeamento Slug → Componente

```tsx
// src/routes/index.tsx
import SEOPage from '@/pages/services/seo-estrategico';
import AutomacaoPage from '@/pages/services/automacao-de-marketing';
// ... outros imports

const servicePages: Record<string, React.ComponentType> = {
  'seo': SEOPage,
  'seo-estrategico': SEOPage,
  'automacao-de-marketing': AutomacaoPage,
  'inteligencia-artificial': IAPage,
  'trafego-pago': TrafegoPagoPage,
  'marketing-digital': MarketingDigitalPage,
  'desenvolvimento-web': DesenvolvimentoWebPage,
  'social-media': SocialMediaPage,
  'branding': BrandingPage,
  'design-grafico': DesignGraficoPage,
};

// Component resolver
const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const Component = slug ? servicePages[slug] : null;

  if (!Component) {
    return <NotFound />;
  }

  return <Component />;
};
```

### Adicionando Novo Serviço

1. Crie o componente em `src/pages/services/`:

```tsx
// src/pages/services/novo-servico.tsx
const NovoServico: React.FC = () => {
  return (
    <div>
      <h1>Novo Serviço</h1>
      {/* Conteúdo */}
    </div>
  );
};

export default NovoServico;
```

2. Adicione ao mapeamento em `src/routes/index.tsx`:

```tsx
import NovoServico from '@/pages/services/novo-servico';

const servicePages = {
  // ... existentes
  'novo-servico': NovoServico,
};
```

3. URLs disponíveis:
   - `/services/novo-servico`

## Navegação

### Link Component

Use `Link` do React Router (não `<a>`):

```tsx
import { Link } from 'react-router-dom';

// Link básico
<Link to="/about">Sobre Nós</Link>

// Link com classes
<Link to="/services" className="text-primary hover:text-primary/80">
  Nossos Serviços
</Link>

// Link dinâmico
<Link to={`/blog/${slug}`}>Leia Mais</Link>
```

### Navegação Programática

Use o hook `useNavigate`:

```tsx
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar para rota
    navigate('/contact');

    // Navegar com estado
    navigate('/blog/123', { state: { from: 'home' } });

    // Voltar
    navigate(-1);

    // Substituir (não adiciona ao histórico)
    navigate('/login', { replace: true });
  };

  return <button onClick={handleClick}>Ir para Contato</button>;
};
```

### NavLink (Link Ativo)

Para indicar rota ativa no menu:

```tsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/services"
  className={({ isActive }) =>
    isActive ? 'text-primary' : 'text-foreground'
  }
>
  Serviços
</NavLink>
```

## Hooks do React Router

### useParams

Acessa parâmetros da URL:

```tsx
import { useParams } from 'react-router-dom';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();

  return <div>Artigo: {slug}</div>;
};
```

### useLocation

Acessa informações da localização atual:

```tsx
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // location.pathname -> '/services'
  // location.search -> '?filter=seo'
  // location.hash -> '#section'
  // location.state -> estado passado via navigate

  return (
    <header>
      <p>Você está em: {location.pathname}</p>
    </header>
  );
};
```

### useNavigate

Navegação programática (já visto acima).

### useSearchParams

Para query strings:

```tsx
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q'); // ?q=seo
  const filter = searchParams.get('filter'); // &filter=blog

  const updateSearch = () => {
    setSearchParams({ q: 'novo-termo', filter: 'portfolio' });
  };

  return (
    <div>
      <p>Busca: {query}</p>
      <button onClick={updateSearch}>Atualizar</button>
    </div>
  );
};
```

## Layout com Outlet

### Layout Wrapper

Se usar layouts aninhados (não é o caso atual):

```tsx
// Layout component
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Renderiza rotas filhas */}
      </main>
      <Footer />
    </div>
  );
};

// Router config
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
    ],
  },
]);
```

**Nota**: O projeto atual usa `Layout` como wrapper em `App.tsx`, não via Outlet.

## Scroll Behavior

### Scroll to Top em Navegação

Implementado no `Layout.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div>{children}</div>;
};
```

### Scroll to Element

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Page = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return <div>{/* Conteúdo */}</div>;
};
```

## Loading States

### Lazy Loading de Rotas

Para code splitting:

```tsx
import { lazy, Suspense } from 'react';

const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));

const router = createBrowserRouter([
  {
    path: '/about',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
    ),
  },
]);
```

## Proteção de Rotas

### Protected Route Pattern

Para rotas autenticadas (quando necessário):

```tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth(); // Custom hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Uso
const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
```

## Geração de URLs

### Helper para URLs de Serviços

```tsx
// src/utils/slugify.ts
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Espaços → hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .trim();
};

// Uso
const serviceSlug = slugify('SEO Estratégico'); // 'seo-estrategico'
const url = `/services/${serviceSlug}`;
```

## Redirecionamentos

### Redirect Component

```tsx
import { Navigate } from 'react-router-dom';

// Redirect simples
const OldPage = () => {
  return <Navigate to="/new-page" replace />;
};

// Redirect condicional
const Page = () => {
  const shouldRedirect = true;

  if (shouldRedirect) {
    return <Navigate to="/other-page" />;
  }

  return <div>Conteúdo</div>;
};
```

## Error Handling

### NotFound Component

```tsx
// src/pages/NotFound.tsx
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('404 - Rota não encontrada:', location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Página não encontrada</p>
        <Link to="/" className="text-primary hover:underline">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};
```

## Breadcrumbs

### Implementação de Breadcrumbs

```tsx
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/" className="text-primary hover:underline">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? (
              <span className="text-muted-foreground capitalize">
                {value.replace(/-/g, ' ')}
              </span>
            ) : (
              <Link to={to} className="text-primary hover:underline capitalize">
                {value.replace(/-/g, ' ')}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
```

## Boas Práticas

### ✅ Fazer

1. **Usar `Link`** ao invés de `<a>` para navegação interna
2. **Centralizar rotas** em um arquivo (`routes/index.tsx`)
3. **Tipar parâmetros** com TypeScript (`useParams<{ slug: string }>()`)
4. **Lazy load** rotas pesadas para code splitting
5. **Scroll to top** em mudanças de rota
6. **404 handling** com rota catch-all
7. **Validar slugs** antes de usar em componentes

### ❌ Evitar

1. **Tags `<a>`** para navegação interna (quebra SPA)
2. **Hardcode URLs** (use constantes ou helpers)
3. **Esquecer de tipar** parâmetros do useParams
4. **Rotas duplicadas** ou conflitantes
5. **Navegação sem feedback** (loading states)
6. **Parâmetros não sanitizados** (risco de XSS)

## Mapa de Rotas do Projeto

```
/                                    → Home (variantes: /home2, /home3, etc.)
/about                               → About (variantes: /about2, /about3)
/services                            → Services (overview)
/services/:slug                      → ServicePage (dinâmico)
  ├─ /services/seo-estrategico
  ├─ /services/automacao-de-marketing
  ├─ /services/inteligencia-artificial
  ├─ /services/trafego-pago
  ├─ /services/marketing-digital
  ├─ /services/desenvolvimento-web
  ├─ /services/social-media
  ├─ /services/branding
  └─ /services/design-grafico
/portfolio                           → Portfolio
/blog                                → Blog (listagem)
/blog/:slug                          → BlogArticle (dinâmico)
/knowledge-base                      → KnowledgeBase (hub)
/knowledge-base/:articleId           → ArticleDetail
/knowledge-base/category/:category   → CategoryPage
/knowledge-base/tag/:tag             → TagPage
/contact                             → Contact
*                                    → NotFound (404)
```

---

[← Anterior: Guia de Estilização](./05-styling-guide.md) | [Próximo: Convenções TypeScript →](./07-typescript-conventions.md)
