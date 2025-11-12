# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

**IMPORTANT**: Always respond to the user in Portuguese (Português do Brasil). All explanations, comments, and communications should be in Portuguese.

## Project Overview

Vorix is a React-based marketing agency website built with TypeScript, Vite, and Tailwind CSS. The project features multiple page variants (Home, Home2, Home3, Home7, Home8, Home9, etc.) and service-specific landing pages.

## Development Commands

```bash
# Start development server (runs on port 3010)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm test

# Preview production build
npm preview
```

## Architecture

### Routing System

Routes are centrally managed in `src/routes/index.tsx` using React Router v6. The application uses:
- Static routes for main pages (Home, About, Portfolio, Blog, Contact, etc.)
- Dynamic service routes (`/services/:slug`) with a mapping system that matches slugs to specific service components
- Knowledge base routes with dynamic segments for articles, categories, and tags
- Multiple Home page variants (Home, Home2, Home3, Home7, Home8, Home9) for A/B testing or design iterations

### Component Architecture

Components are organized into clear categories:

- **`src/components/ui/`**: Shadcn UI components (button, accordion, dialog, dropdown-menu, label, navigation-menu, slot, etc.) - These are highly customizable, accessible components from the Shadcn system
- **`src/components/general/`**: Reusable React components (Hero, Layout, Navbar, ScrollAnimation, ServiceCard, PortfolioCard, BlogCard, etc.)
- **`src/components/sections/`**: Page section components (Footer, ContactSection, ServicesSection, ProjectsSection, TestimonialsSection, etc.)
- **`src/components/sections/design-grafico/`**: Service-specific sections (nested by service type)
- **`src/components/heros/`**: Various hero component variations (DramaticHero, GlassmorphismHero, VideoHero, etc.)
- **`src/components/icons/`**: Custom icon components
- **`src/components/knowledge-base/`**: Knowledge base specific components
- **`src/pages/`**: Full page components including service pages in `src/pages/services/`

### Layout Pattern

The application uses a consistent layout wrapper (`src/components/general/Layout.tsx`) that provides:
- Fixed background grid pattern with primary color overlay
- Gradient blur effects for visual depth
- Header and Footer wrapping all pages
- Automatic scroll-to-top on route changes
- ScrollToTop button component

Pages are wrapped with:
```tsx
<HelmetProvider> → <ErrorBoundary> → <RouterProvider> → <Layout> → Page Content
```

### Styling System

- **Primary approach**: Tailwind CSS with custom configuration
- **Theme**: Dark mode enabled via class strategy (`darkMode: ["class"]`)
- **Color system**: HSL-based CSS variables for theming (primary, secondary, accent, muted, etc.)
- **Custom fonts**: Gilroy, Poppins, Clash Display, Satoshi
- **Custom animations**: accordion, ping-slow, float variations
- **Container**: Custom responsive container with max-width of 1000px (2xl breakpoint)
- **Secondary approach**: Styled Components for specific component styling needs

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:
```typescript
import { Component } from '@/components/ui/component'
```

### TypeScript Configuration

- Strict mode enabled
- ES2020 target
- React JSX transform
- Unused locals/parameters warnings disabled
- Path aliases configured for `@/*` → `./src/*`

### Service Pages Pattern

Service pages follow a specific pattern:
1. Each service has a dedicated page component in `src/pages/services/`
2. Services are mapped in `src/routes/index.tsx` with the `servicePages` object
3. The `ServicePage` component handles dynamic routing for service slugs
4. Service-specific sections may exist in `src/components/sections/[service-name]/`

### Data Management

- Static data stored in `src/data/` (e.g., `knowledge-base-data.ts`)
- Utilities in `src/utils/` including:
  - `cn.ts`: Tailwind class name merging utility
  - `routeChecker.ts`: Route navigation logging
  - `routerWarnings.ts`: Router warning utilities

### Error Handling

- Application-level ErrorBoundary component in `App.tsx`
- Custom 404 NotFound component with route logging
- Friendly error pages with navigation back to home

## Important Conventions

1. **Component structure**: Pages compose sections, sections use general components, general components use UI primitives
2. **Multiple variants**: The codebase maintains multiple versions of key pages (Home, Home2, Home3, etc.) - treat these as independent implementations
3. **Modular design**: Prioritize component reusability and clear separation of concerns
4. **Dark theme first**: The primary design uses dark backgrounds (#111) with yellow/gold primary color
5. **Responsive design**: Mobile-first approach with custom breakpoints (xs: 480px, sm: 640px, md: 768px, lg/xl: 800px, 2xl: 1000px)
6. **Accessibility**: Uses Radix UI primitives for accessible component foundations

## Node Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
