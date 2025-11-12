# Guia de Estilização

Este documento descreve o sistema de estilização do projeto Vorix, incluindo Tailwind CSS, variáveis CSS, tema e padrões de responsividade.

## Sistema de Cores

### Paleta Principal (CSS Variables)

As cores são definidas como variáveis CSS usando o formato HSL (Hue, Saturation, Lightness):

```css
/* src/styles/globals.css */
:root {
  /* Cores principais */
  --primary: 50 91% 48.6%;           /* #ECC80B - Amarelo/Ouro vibrante */
  --primary-foreground: 0 0% 5.5%;   /* #0E0E0E - Preto para contraste */

  /* Cores de fundo */
  --background: 0 0% 5.5%;           /* #0E0E0E - Fundo escuro principal */
  --foreground: 0 0% 99.6%;          /* #FEFEFE - Texto claro */

  /* Cores de acento */
  --accent: 0 0% 10%;                /* #1A1A1A - Acento escuro */
  --accent-foreground: 0 0% 99.6%;   /* #FEFEFE - Texto sobre acento */

  /* Cores de muted */
  --muted: 0 0% 15%;                 /* #262626 - Muted escuro */
  --muted-foreground: 0 0% 78.4%;    /* #C8C8C8 - Texto muted */

  /* Cores de borda e card */
  --border: 0 0% 15%;                /* #262626 - Bordas sutis */
  --card: 0 0% 8%;                   /* #141414 - Background de cards */
  --card-foreground: 0 0% 99.6%;     /* #FEFEFE - Texto em cards */

  /* Cores de input */
  --input: 0 0% 15%;                 /* #262626 - Background de inputs */
  --ring: 50 91% 48.6%;              /* #ECC80B - Focus ring (primary) */

  /* Cores de feedback */
  --destructive: 0 84.2% 60.2%;      /* #E74C3C - Vermelho para erros */
  --destructive-foreground: 0 0% 99.6%; /* #FEFEFE - Texto em destrutivos */

  /* Outros */
  --radius: 1.5rem;                  /* 24px - Border radius padrão */
}
```

### Uso das Cores no Tailwind

```tsx
// Primary (amarelo/ouro)
<div className="bg-primary text-primary-foreground">
  Botão principal
</div>

// Background
<div className="bg-background text-foreground">
  Conteúdo padrão
</div>

// Accent
<div className="bg-accent text-accent-foreground">
  Card com destaque
</div>

// Muted (texto secundário)
<p className="text-muted-foreground">
  Texto secundário
</p>

// Border
<div className="border border-border">
  Elemento com borda
</div>
```

### Opacidade de Cores

Use `/` para aplicar opacidade:

```tsx
<div className="bg-primary/10">      {/* 10% opacity */}
<div className="bg-primary/20">      {/* 20% opacity */}
<div className="bg-primary/50">      {/* 50% opacity */}
<div className="bg-primary/90">      {/* 90% opacity */}
<div className="text-foreground/80"> {/* Texto com 80% opacity */}
```

## Tipografia

### Fontes

```css
/* Importadas em globals.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/gilroy-font@1.0.0/style.css');
```

**Configuração Tailwind**:
```js
// tailwind.config.js
fontFamily: {
  sans: ['Gilroy', 'Poppins', 'system-ui', 'sans-serif'],
  poppins: ['Poppins', 'sans-serif'],
  gilroy: ['Gilroy', 'sans-serif'],
  clash: ['Clash Display', 'sans-serif'],
  satoshi: ['Satoshi', 'sans-serif'],
}
```

### Escalas de Texto

```tsx
// Headings
<h1 className="text-4xl md:text-6xl font-bold">    {/* 36px / 60px */}
<h2 className="text-3xl md:text-5xl font-bold">    {/* 30px / 48px */}
<h3 className="text-2xl md:text-4xl font-bold">    {/* 24px / 36px */}
<h4 className="text-xl md:text-2xl font-semibold"> {/* 20px / 24px */}

// Body text
<p className="text-base">          {/* 14px (base customizado) */}
<p className="text-lg">            {/* 18px */}
<p className="text-xl">            {/* 20px */}

// Small text
<span className="text-sm">         {/* 12px */}
<span className="text-xs">         {/* 10px */}
```

**Nota**: O `fontSize` base foi customizado para 14px:

```js
// tailwind.config.js
fontSize: {
  base: '14px',  // Customizado (padrão seria 16px)
}
```

### Pesos de Fonte

```tsx
<p className="font-normal">   {/* 400 */}
<p className="font-medium">   {/* 500 */}
<p className="font-semibold"> {/* 600 */}
<p className="font-bold">     {/* 700 */}
```

### Line Height e Spacing

```tsx
// Line height
<p className="leading-normal">   {/* 1.5 */}
<p className="leading-relaxed">  {/* 1.625 */}
<p className="leading-loose">    {/* 2 */}

// Letter spacing
<h1 className="tracking-tight">  {/* -0.025em */}
<p className="tracking-normal">  {/* 0em */}
<p className="tracking-wide">    {/* 0.025em */}
```

## Espaçamento

### Sistema de Spacing

Tailwind usa escala de 4px:

```tsx
// Padding
<div className="p-4">   {/* 16px all sides */}
<div className="px-6">  {/* 24px horizontal */}
<div className="py-8">  {/* 32px vertical */}

// Margin
<div className="m-4">   {/* 16px all sides */}
<div className="mx-auto"> {/* Center horizontally */}
<div className="mt-6 mb-4"> {/* 24px top, 16px bottom */}

// Gap (para flex/grid)
<div className="flex gap-4">  {/* 16px entre itens */}
<div className="grid gap-6">  {/* 24px entre itens */}
```

### Espaçamento de Seções

Padrão para seções de página:

```tsx
<section className="py-24">      {/* 96px vertical */}
<section className="py-32">      {/* 128px vertical (hero) */}

// Com container
<section className="py-24">
  <div className="container">
    {/* Conteúdo */}
  </div>
</section>
```

## Responsividade

### Breakpoints

```js
// tailwind.config.js
screens: {
  xs: '480px',   // Extra small devices
  sm: '640px',   // Small devices (mobile landscape)
  md: '768px',   // Medium devices (tablets)
  lg: '800px',   // Large devices (small laptops)
  xl: '800px',   // Extra large (desktops) - NOTA: mesmo que lg
  '2xl': '1000px' // 2X large (large desktops)
}
```

### Mobile-First Approach

Sempre comece pelo mobile e adicione breakpoints:

```tsx
// Ruim (desktop-first)
<div className="grid-cols-3 md:grid-cols-1">

// Bom (mobile-first)
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Exemplos Práticos

```tsx
// Texto responsivo
<h1 className="text-3xl md:text-5xl lg:text-6xl">
  Título Responsivo
</h1>

// Layout responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Padding responsivo
<section className="py-12 md:py-16 lg:py-24">
  {/* Conteúdo */}
</section>

// Display responsivo
<div className="block md:hidden">
  {/* Apenas mobile */}
</div>
<div className="hidden md:block">
  {/* Desktop apenas */}
</div>

// Flex direction responsivo
<div className="flex flex-col md:flex-row gap-4">
  {/* Stack no mobile, row no desktop */}
</div>
```

## Container System

### Container Padrão

```tsx
<div className="container">
  {/* Conteúdo centralizado com max-width */}
</div>
```

**Configuração**:
```js
// tailwind.config.js
container: {
  center: true,
  padding: '1rem',
  screens: {
    '2xl': '1000px',  // Max-width customizado
  },
}
```

### Container com Padding

```tsx
// Container com padding horizontal
<div className="container px-4 md:px-6 lg:px-8">
  {/* Conteúdo */}
</div>
```

## Border Radius

### Valores Customizados

```js
// tailwind.config.js
borderRadius: {
  DEFAULT: '1.5rem',  // 24px - padrão do projeto
  'none': '0',
  'sm': '0.5rem',     // 8px
  'md': '1rem',       // 16px
  'lg': '1.5rem',     // 24px
  'xl': '2rem',       // 32px
  '2xl': '2.5rem',    // 40px
  'full': '9999px',
}
```

### Uso

```tsx
<div className="rounded">        {/* 24px - default */}
<div className="rounded-lg">     {/* 24px */}
<div className="rounded-xl">     {/* 32px */}
<div className="rounded-2xl">    {/* 40px */}
<div className="rounded-full">   {/* Circular */}

// Por lado
<div className="rounded-t-lg">   {/* Top apenas */}
<div className="rounded-b-lg">   {/* Bottom apenas */}
```

## Animações

### Animações Customizadas

```js
// tailwind.config.js
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
  'float': 'float 3s ease-in-out infinite',
  'float-slow': 'float 6s ease-in-out infinite',
  'float-slower': 'float 8s ease-in-out infinite',
}
```

### Uso

```tsx
// Ping lento
<div className="animate-ping-slow">
  <NotificationIcon />
</div>

// Float animation
<div className="animate-float">
  <FloatingElement />
</div>

// Accordion
<AccordionContent className="animate-accordion-down">
  {/* Conteúdo */}
</AccordionContent>
```

### Transições

```tsx
// Transição padrão
<div className="transition-colors duration-300">
  {/* Transição de cores */}
</div>

// Transição complexa
<div className="transition-all duration-500 ease-in-out">
  {/* Todas as propriedades */}
</div>

// Hover transition
<button className="bg-primary hover:bg-primary/90 transition-colors">
  Botão
</button>
```

## Shadows e Effects

### Box Shadow

```tsx
<div className="shadow-sm">    {/* Sombra pequena */}
<div className="shadow-md">    {/* Sombra média */}
<div className="shadow-lg">    {/* Sombra grande */}
<div className="shadow-xl">    {/* Sombra extra grande */}
<div className="shadow-2xl">   {/* Sombra máxima */}
```

### Backdrop Blur (Glassmorphism)

```tsx
<div className="backdrop-blur-sm bg-background/80">
  {/* Glassmorphism effect */}
</div>

<div className="backdrop-blur-md bg-primary/10">
  {/* Glass card */}
</div>
```

### Gradientes

```tsx
// Linear gradients
<div className="bg-gradient-to-r from-primary to-accent">
  {/* Gradiente horizontal */}
</div>

<div className="bg-gradient-to-b from-background via-accent to-background">
  {/* Gradiente vertical com ponto médio */}
</div>

// Radial gradient (customizado)
<div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent">
  {/* Gradiente radial */}
</div>
```

## Utilitários Customizados

### Class Name Merger (cn)

```tsx
import { cn } from '@/utils/cn';

// Merge de classes com conditional
<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' ? 'bg-primary' : 'bg-accent',
  className // Props className
)}>
  {/* Conteúdo */}
</div>
```

### Class Variance Authority (CVA)

Usado para componentes com variantes:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Uso
<button className={buttonVariants({ variant: 'outline', size: 'lg' })}>
  Botão
</button>
```

## Grid System

### Grid Responsivo

```tsx
// 1 coluna mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Auto-fit (adapta automaticamente)
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Grid com áreas nomeadas (CSS Grid)
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
  <header>Header</header>
  <main>Main</main>
  <footer>Footer</footer>
</div>
```

## Flexbox

### Patterns Comuns

```tsx
// Center tudo
<div className="flex items-center justify-center min-h-screen">
  {/* Conteúdo centralizado */}
</div>

// Space between
<div className="flex items-center justify-between">
  <div>Esquerda</div>
  <div>Direita</div>
</div>

// Stack vertical com gap
<div className="flex flex-col gap-4">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>

// Wrap
<div className="flex flex-wrap gap-2">
  {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
</div>
```

## Aspect Ratio

```tsx
// Aspect ratio fixo
<div className="aspect-video">     {/* 16:9 */}
<div className="aspect-square">    {/* 1:1 */}
<div className="aspect-[4/3]">     {/* 4:3 customizado */}

// Exemplo: Card com imagem
<div className="relative aspect-video overflow-hidden rounded-lg">
  <img src={image} alt={alt} className="w-full h-full object-cover" />
</div>
```

## Overlay Pattern

Padrão para overlays em imagens:

```tsx
<div className="relative">
  {/* Imagem */}
  <img src={image} alt={alt} className="w-full h-full object-cover" />

  {/* Overlay escuro */}
  <div className="absolute inset-0 bg-background/80" />

  {/* Conteúdo sobre overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
    <h3 className="text-2xl font-bold text-foreground">
      Título
    </h3>
    <p className="text-muted-foreground">
      Descrição
    </p>
  </div>
</div>
```

## Estados Interativos

### Hover, Focus, Active

```tsx
// Hover
<button className="bg-primary hover:bg-primary/90 transition-colors">
  Botão
</button>

// Focus (acessibilidade)
<input className="border-input focus:border-primary focus:ring-2 focus:ring-primary" />

// Active (quando clicado)
<button className="active:scale-95 transition-transform">
  Clique
</button>

// Group hover
<div className="group">
  <img className="group-hover:scale-110 transition-transform" />
  <p className="group-hover:text-primary transition-colors">Texto</p>
</div>
```

## Boas Práticas

### ✅ Fazer

1. **Use variáveis CSS** para cores (não hardcode hex)
2. **Mobile-first** sempre
3. **Use `cn()`** para merge de classes
4. **Componha classes** ao invés de criar novas
5. **Reutilize padrões** (não reinvente a roda)
6. **Teste em múltiplos** tamanhos de tela
7. **Use semantic colors** (primary, muted, etc)

### ❌ Evitar

1. **Inline styles** (use Tailwind)
2. **Valores mágicos** (`w-[437px]` → use escala)
3. **Classes conflitantes** (`p-4 p-6`)
4. **!important** (refatore ao invés)
5. **Cores hardcoded** (`#ECC80B` → use `primary`)
6. **Desktop-first** responsiveness
7. **Classes muito específicas** (componetize)

---

[← Anterior: Padrões de Componentes](./04-component-patterns.md) | [Próximo: Rotas e Navegação →](./06-routing-navigation.md)
