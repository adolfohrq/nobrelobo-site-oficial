# Visão Geral do Projeto

## Sobre o Vorix

Vorix é um site institucional moderno para uma agência de marketing digital. O projeto apresenta serviços, portfolio, blog e uma base de conhecimento, tudo construído com tecnologias modernas e foco em performance e experiência do usuário.

## Contexto de Negócio

### Tipo de Projeto
- **Categoria**: Site institucional / Marketing
- **Público-alvo**: Empresas buscando serviços de marketing digital
- **Objetivo**: Apresentar serviços, gerar leads e estabelecer autoridade no mercado

### Serviços Oferecidos

O site apresenta 9 serviços principais:

1. **SEO Estratégico** - Otimização para motores de busca
2. **Automação de Marketing** - Ferramentas de automação
3. **Inteligência Artificial** - Soluções com IA
4. **Tráfego Pago** - Campanhas pagas (Google Ads, Meta Ads)
5. **Marketing Digital** - Estratégias digitais completas
6. **Desenvolvimento Web** - Sites e aplicações web
7. **Social Media** - Gestão de redes sociais
8. **Branding** - Identidade visual e posicionamento
9. **Design Gráfico** - Criação de materiais visuais

Cada serviço possui sua própria landing page otimizada.

## Stack Tecnológica

### Core Technologies

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 18.2.0 | Biblioteca UI |
| **TypeScript** | 5.0.2 | Tipagem estática |
| **Vite** | 6.0.1 | Build tool e dev server |
| **React Router** | 6.30.0 | Roteamento SPA |

### Styling & Animation

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Tailwind CSS** | 3.3.5 | Utility-first CSS |
| **Framer Motion** | 12.5.0 | Animações avançadas |
| **Styled Components** | 6.1.1 | CSS-in-JS |
| **Radix UI** | Vários | Primitivos acessíveis |

### UI & Forms

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Lucide React** | 0.291.0 | Biblioteca de ícones |
| **React Hook Form** | 7.48.2 | Gerenciamento de forms |
| **Yup** | 1.3.3 | Validação de schemas |
| **Embla Carousel** | 8.5.2 | Carrosséis responsivos |

### Developer Tools

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **ESLint** | 8.45.0 | Linting de código |
| **Jest** | 29.7.0 | Framework de testes |
| **React Testing Library** | 14.0.0 | Testes de componentes |
| **Storybook** | 8.6.14 | Documentação de componentes |

## Arquitetura Técnica

### Tipo de Aplicação
**Single Page Application (SPA)** - Todo o roteamento é client-side

### Renderização
- **Client-Side Rendering (CSR)** via React
- Conteúdo gerado no navegador
- Dados estáticos compilados no build

### Padrão Arquitetural
- **Component-Based Architecture**: Tudo é um componente
- **Composition over Inheritance**: Componentes compostos
- **Presentational vs Container**: Separação clara de responsabilidades

### Fluxo de Dados
```
Static Data Files → Components (Props) → Render
                                      ↓
                              Local State (useState)
                                      ↓
                              User Interactions
```

## Características Principais

### 1. Design System
- Tema dark-first com paleta de cores amarelo/ouro
- Sistema de componentes reutilizáveis (UI primitives)
- Variáveis CSS para customização
- Border radius customizado (1.5rem padrão)

### 2. Animações Avançadas
- Scroll-based animations com Framer Motion
- Parallax effects
- Staggered animations para listas
- Micro-interactions em hover/click

### 3. Responsividade
- Mobile-first approach
- Breakpoints customizados (xs: 480px → 2xl: 1000px)
- Grid system responsivo
- Imagens otimizadas

### 4. Performance
- Lazy loading de imagens
- Code splitting por rota
- Tree shaking automático (Vite)
- Tailwind CSS purge em produção
- HMR (Hot Module Replacement) no dev

### 5. SEO & Acessibilidade
- React Helmet Async para meta tags
- Componentes Radix UI (acessíveis por padrão)
- Estrutura semântica HTML
- Alt text em imagens

### 6. A/B Testing
- Múltiplas variantes de páginas (Home, Home2, Home3, Home7-9)
- Permite testes de diferentes layouts/mensagens
- Fácil comparação de performance

## Estrutura de Páginas

### Páginas Principais

1. **Home** (+ variantes Home2, Home3, Home7-9)
   - Hero section
   - Serviços em destaque
   - Portfolio
   - Depoimentos
   - CTA

2. **About** (+ variantes About2, About3)
   - História da empresa
   - Time
   - Valores

3. **Services**
   - Overview de todos os serviços
   - Cards com links para páginas específicas

4. **Portfolio**
   - Galeria de projetos
   - Filtros por categoria
   - Modal de detalhes

5. **Blog**
   - Listagem de artigos
   - Categorias
   - Artigos individuais

6. **Knowledge Base**
   - Hub de conhecimento
   - Artigos por categoria/tag
   - Sistema de busca
   - Sidebar com navegação

7. **Contact**
   - Formulário de contato
   - Informações de contato
   - Mapa (se aplicável)

### Páginas de Serviço (9 páginas)

Cada serviço possui página dedicada:
- `/services/seo-estrategico`
- `/services/automacao-de-marketing`
- `/services/inteligencia-artificial`
- `/services/trafego-pago`
- `/services/marketing-digital`
- `/services/desenvolvimento-web`
- `/services/social-media`
- `/services/branding`
- `/services/design-grafico`

## Requisitos do Sistema

### Desenvolvimento
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Sistema Operacional**: Windows, macOS, Linux
- **Navegador**: Chrome, Firefox, Safari, Edge (versões recentes)

### Produção
- **Servidor**: Qualquer servidor web estático (Nginx, Apache, Vercel, Netlify)
- **HTTPS**: Recomendado
- **CDN**: Opcional (para assets estáticos)

## Dependências Principais

### Dependências de Produção (runtime)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.30.0",
  "framer-motion": "^12.5.0",
  "tailwindcss": "^3.3.5",
  "styled-components": "^6.1.1",
  "lucide-react": "^0.291.0",
  "react-hook-form": "^7.48.2",
  "react-helmet-async": "^2.0.4"
}
```

### Dependências de Desenvolvimento
```json
{
  "vite": "^6.0.1",
  "typescript": "^5.0.2",
  "eslint": "^8.45.0",
  "jest": "^29.7.0",
  "@testing-library/react": "^14.0.0"
}
```

## Convenções de Idioma

- **Código**: Inglês (nomes de variáveis, funções, componentes)
- **Conteúdo**: Português (textos do site, comentários)
- **Commits**: Português
- **Documentação**: Português

## Filosofia do Projeto

### Princípios de Design

1. **Mobile-First**: Sempre comece pelo mobile
2. **Dark Theme**: Design focado em modo escuro
3. **Performance**: Priorize velocidade e eficiência
4. **Acessibilidade**: Use componentes acessíveis (Radix UI)
5. **Consistência**: Mantenha padrões em todo o projeto

### Princípios de Código

1. **DRY (Don't Repeat Yourself)**: Reutilize componentes
2. **KISS (Keep It Simple, Stupid)**: Simplicidade primeiro
3. **Separation of Concerns**: Separe lógica de apresentação
4. **Type Safety**: Sempre use TypeScript
5. **Composition**: Componha componentes complexos de simples

## Roadmap Futuro

### Planejado
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar i18n (internacionalização) para inglês
- [ ] Integrar CMS headless para blog
- [ ] Implementar analytics (Google Analytics / Mixpanel)
- [ ] Adicionar formulários com backend real
- [ ] Implementar SSR (Server-Side Rendering) com Next.js (avaliação)

### Em Consideração
- [ ] PWA (Progressive Web App) features
- [ ] Dark/Light mode toggle (atualmente apenas dark)
- [ ] Sistema de notificações
- [ ] Chat ao vivo

## Métricas de Sucesso

### Performance
- **Lighthouse Score**: > 90 em todas as categorias
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzip)

### Qualidade de Código
- **TypeScript Coverage**: 100%
- **ESLint Warnings**: 0
- **Test Coverage**: > 80% (quando implementado)

---

[← Anterior: Getting Started](./01-getting-started.md) | [Próximo: Arquitetura →](./03-architecture.md)
