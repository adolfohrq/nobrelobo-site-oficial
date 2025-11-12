# CLAUDE.md

Este arquivo fornece orientações para o Claude Code ao trabalhar com código neste repositório.

## Preferência de Idioma

**IMPORTANTE**: Sempre responda ao usuário em Português (Português do Brasil). Todas as explicações, comentários e comunicações devem estar em português.

## Visão Geral do Projeto

Nobre Lobo é um site de agência de marketing digital construído com React, TypeScript, Vite e Tailwind CSS. O projeto apresenta múltiplas variantes de páginas (Home, Home2, Home3, Home7, Home8, Home9, About, About4, etc.) e páginas de destino específicas de serviços.

## Comandos de Desenvolvimento

```bash
# Inicia servidor de desenvolvimento (executa na porta 3010)
npm run dev

# Compilar para produção
npm run build

# Executar linter
npm run lint

# Executar testes
npm test

# Visualizar compilação de produção
npm preview
```

## Arquitetura

### Sistema de Roteamento

As rotas são gerenciadas centralmente em `src/routes/index.tsx` usando React Router v6. A aplicação utiliza:
- Rotas estáticas para páginas principais (Home, About, Portfolio, Blog, Contato, etc.)
- Rotas dinâmicas de serviços (`/services/:slug`) com um sistema de mapeamento que conecta slugs a componentes específicos
- Rotas da base de conhecimento com segmentos dinâmicos para artigos, categorias e tags
- Múltiplas variantes de página Home (Home, Home2, Home3, Home7, Home8, Home9) para testes A/B ou iterações de design

### Arquitetura de Componentes

Os componentes são organizados em categorias claras:

- **`src/components/ui/`**: Componentes Shadcn UI (button, accordion, dialog, dropdown-menu, label, navigation-menu, etc.) - Componentes altamente customizáveis e acessíveis do sistema Shadcn
- **`src/components/general/`**: Componentes React reutilizáveis (Hero, Layout, Navbar, SectionHeader, ServiceCard, PortfolioCard, BlogCard, SEO, etc.)
- **`src/components/sections/`**: Componentes de seção de página (Footer, ContactSection, ServicesSection, PortfolioSection, ValuesSection, ClientTypesSection, MissionSection, MethodologySection, LeaderSection, WhyChooseNobreLoboSection, etc.)
- **`src/components/sections/design-grafico/`**: Seções específicas de serviço (aninhadas por tipo de serviço)
- **`src/components/portfolio/`**: Componentes de portfólio (PortfolioCarousel, PortfolioCard, PortfolioFilters, etc.)
- **`src/components/heros/`**: Variações de componentes hero (DramaticHero, GlassmorphismHero, VideoHero, etc.)
- **`src/components/icons/`**: Componentes de ícones personalizados
- **`src/components/knowledge-base/`**: Componentes específicos da base de conhecimento
- **`src/pages/`**: Componentes de página completa, incluindo páginas de serviço em `src/pages/services/`

### Padrão de Layout

A aplicação utiliza um wrapper de layout consistente (`src/components/general/Layout.tsx`) que fornece:
- Padrão de grade de fundo fixo com sobreposição de cor primária
- Efeitos de desfoque de gradiente para profundidade visual
- Header e Footer envolvendo todas as páginas
- Rolar automaticamente para o topo nas mudanças de rota
- Componente ScrollToTop

As páginas são envolvidas com:
```tsx
<HelmetProvider> → <ErrorBoundary> → <RouterProvider> → <Layout> → Conteúdo da Página
```

### Sistema de Estilização

- **Abordagem Primária**: Tailwind CSS com configuração personalizada
- **Tema**: Modo escuro ativado via estratégia de classe (`darkMode: ["class"]`)
- **Sistema de cores**: Variáveis CSS baseadas em HSL para tematização (primary, secondary, accent, muted, etc.)
- **Fontes personalizadas**: Gilroy, Poppins, Clash Display, Satoshi
- **Animações personalizadas**: accordion, ping-slow, variações de flutuação
- **Container**: Container responsivo personalizado com largura máxima de 1000px (breakpoint 2xl)
- **Abordagem Secundária**: Styled Components para necessidades de estilização específicas de componentes
- **Padrão Visual**: Fundo escuro (#111) com cor primária amarela/ouro, opacidades de branco (white/5, white/10, white/60, white/80)

### Aliases de Caminho

O projeto usa `@/` como alias para o diretório `src/`:
```typescript
import { Component } from '@/components/ui/component'
```

### Configuração de TypeScript

- Modo strict ativado
- Alvo ES2020
- Transformação JSX React
- Avisos de locais/parâmetros não utilizados desativados
- Aliases de caminho configurados para `@/*` → `./src/*`

### Padrão de Páginas de Serviço

As páginas de serviço seguem um padrão específico:
1. Cada serviço tem um componente de página dedicado em `src/pages/services/`
2. Os serviços são mapeados em `src/routes/index.tsx` com o objeto `servicePages`
3. O componente `ServicePage` lida com roteamento dinâmico para slugs de serviço
4. Seções específicas de serviço podem existir em `src/components/sections/[service-name]/`

### Gerenciamento de Dados

- Dados estáticos armazenados em `src/data/` (por exemplo, `portfolio-data.ts`, `knowledge-base-data.ts`)
- Utilitários em `src/utils/` incluindo:
  - `cn.ts`: Utilitário de mesclagem de nome de classe Tailwind
  - `routeChecker.ts`: Logging de navegação de rota
  - `slugify.ts`: Conversão de strings para slug
  - `routerWarnings.ts`: Utilitários de aviso do roteador

### Tratamento de Erros

- Componente ErrorBoundary no nível da aplicação em `App.tsx`
- Componente NotFound 404 personalizado com logging de rota
- Páginas de erro amigáveis com navegação de volta para a página inicial

## Convenções Importantes

1. **Estrutura de componentes**: Páginas compõem seções, seções usam componentes gerais, componentes gerais usam primitivos de UI
2. **Múltiplas variantes**: O código mantém múltiplas versões de páginas-chave (Home, Home2, Home3, Home7, Home8, Home9, About, About4, etc.) - trate-as como implementações independentes
3. **Design modular**: Priorize reutilização de componentes e clara separação de responsabilidades
4. **Tema escuro primeiro**: O design principal usa fundos escuros (#111) com cor primária amarela/ouro
5. **Design responsivo**: Abordagem mobile-first com breakpoints personalizados (xs: 480px, sm: 640px, md: 768px, lg/xl: 800px, 2xl: 1000px)
6. **Acessibilidade**: Usa primitivos do Radix UI para fundações de componentes acessíveis
7. **Padrões de animação**: Usa Framer Motion com hooks `useScroll`, `useTransform`, `whileInView` para animações de rolagem
8. **Padding padrão de seção**: Todas as seções usam `py-16 md:py-20` para consistência visual

## Componentes Recém Criados (Última Sessão)

### Seções da Home
- **WhyChooseNobreLoboSection**: Seção com 6 benefícios da agência (Expertise, Resultados, Inovação, Suporte, Consultoria, Parcerias)
- **MethodologySection**: Processo de trabalho em 3 etapas (Descoberta & Análise, Estratégia & Planejamento, Execução & Otimização)

### Seções da About
- **ClientTypesSection**: Tipos de clientes (Startups, PMEs, Corporações)
- **ValuesSection**: 6 valores da empresa (Excelência, Colaboração, Inovação, Paixão, Agilidade, Confiança)
- **MissionSection**: Recriado seguindo padrão visual da Home com layout 2-colunas, cards de métricas e pontos-chave

### Páginas
- **About4.tsx**: Página "Sobre" alternativa com conteúdo abrangente

## Requisitos do Node

- Node.js >= 18.0.0
- npm >= 8.0.0

## Repositório Oficial

- **URL**: https://github.com/adolfohrq/nobrelobo-site-oficial.git
- **Branch Principal**: main
