# Padrões de Componentes

Este documento descreve os padrões de componentes utilizados no projeto Vorix, com exemplos práticos e boas práticas.

## Estrutura Base de um Componente

### Template Padrão

```tsx
// src/components/general/ExampleComponent.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ExampleComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'highlighted';
  className?: string;
  children?: React.ReactNode;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  variant = 'default',
  className,
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative p-6 rounded-lg',
        variant === 'highlighted' && 'border-2 border-primary',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      {children}
    </motion.div>
  );
};

export default ExampleComponent;
```

### Elementos do Template:

1. **Imports organizados**: React, bibliotecas externas, internos
2. **Interface TypeScript**: Props bem tipadas
3. **Valores default**: Props opcionais com defaults
4. **Estado local**: useState para interações
5. **Animações**: Framer Motion para entrada
6. **Classes dinâmicas**: cn() para merge de classes
7. **Export default**: Padrão do projeto

## Padrões de Cards

### 1. ServiceCard

Card para exibir serviços oferecidos.

```tsx
// src/components/general/ServiceCard.tsx
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-accent/50 p-8 hover:bg-accent transition-colors"
    >
      {/* Ícone */}
      <div className="mb-4 text-primary">{icon}</div>

      {/* Título */}
      <h3 className="mb-3 text-xl font-bold text-foreground">
        {title}
      </h3>

      {/* Descrição */}
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Hover Effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-primary"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
```

**Características**:
- Animação de entrada com stagger (delay baseado em index)
- Hover effect com barra de progresso
- Ícone como ReactNode (flexibilidade)
- Background com opacity
- Transição suave de cores

**Uso**:
```tsx
<ServiceCard
  title="SEO Estratégico"
  description="Otimização completa para motores de busca"
  icon={<SearchIcon className="w-8 h-8" />}
  index={0}
/>
```

### 2. BlogCard

Card para posts de blog.

```tsx
interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: number;
  date: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  category,
  readTime,
  date,
  slug
}) => {
  return (
    <Link to={`/blog/${slug}`}>
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="group overflow-hidden rounded-2xl bg-accent/30 hover:bg-accent/50 transition-all"
      >
        {/* Imagem */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              {category}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mb-4 text-muted-foreground line-clamp-3">
            {excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime} min de leitura</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
```

**Características**:
- Imagem com zoom no hover
- Badge de categoria
- Line-clamp para textos longos
- Metadata de leitura
- Lift effect no hover (y: -5)

### 3. PortfolioCard

Card para projetos do portfolio.

```tsx
interface PortfolioCardProps {
  title: string;
  category: string;
  image: string;
  description?: string;
  tags?: string[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  category,
  image,
  description,
  tags
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de fundo */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

      {/* Conteúdo */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        <span className="text-sm text-primary font-semibold mb-2">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {title}
        </h3>

        {description && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            className="text-muted-foreground overflow-hidden"
          >
            {description}
          </motion.p>
        )}

        {tags && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            className="flex flex-wrap gap-2 mt-3 overflow-hidden"
          >
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-primary/20 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
```

**Características**:
- Overlay com gradiente
- Conteúdo expandido no hover
- Tags animadas
- Aspect ratio fixo (quadrado)
- Zoom suave da imagem

## Padrões de Hero

### Hero Base Interface

Todos os heroes compartilham a mesma interface:

```tsx
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  variant?: 'default' | 'dramatic' | 'minimal' | 'video';
}
```

### 1. DramaticHero

Hero com efeitos dramáticos e parallax.

```tsx
const DramaticHero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />

      {/* Conteúdo */}
      <div className="container relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
```

**Características**:
- Parallax scroll
- Fade out ao scrollar
- Animações sequenciais (staggered)
- Gradiente de background
- CTA animado

### 2. MinimalHero

Hero minimalista com foco no conteúdo.

```tsx
const MinimalHero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="container py-32 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
};
```

**Características**:
- Design clean
- Fade in simples
- Sem distrações visuais
- Rápido de carregar

## Padrões de Sections

### SectionHeader Component

Cabeçalho padrão para seções:

```tsx
interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  align = 'center'
}) => {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center')}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
```

### ServicesSection

Seção para exibir serviços:

```tsx
interface ServicesSectionProps {
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <SectionHeader
          badge="Nossos Serviços"
          title="Soluções Completas para sua Empresa"
          description="Oferecemos serviços especializados em marketing digital"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
```

**Características**:
- Container centralizado
- Grid responsivo
- SectionHeader reutilizável
- Props tipadas

## Layout Patterns

### Container Pattern

```tsx
// Sempre use o container para centralizar conteúdo
<div className="container">
  {/* Conteúdo limitado a max-width: 1000px */}
</div>

// Com padding vertical
<section className="py-24">
  <div className="container">
    {/* ... */}
  </div>
</section>
```

### Grid Pattern

```tsx
// Grid responsivo padrão
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>

// Grid com auto-fit
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Flex Pattern

```tsx
// Flex center
<div className="flex items-center justify-center min-h-screen">
  {/* Conteúdo centrado */}
</div>

// Flex space-between
<div className="flex items-center justify-between">
  <div>Esquerda</div>
  <div>Direita</div>
</div>
```

## Padrões de Animação

### Entrada de Componente

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Conteúdo */}
</motion.div>
```

### Hover Effects

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* Conteúdo */}
</motion.div>
```

### Staggered Children

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {/* Conteúdo */}
    </motion.div>
  ))}
</motion.div>
```

## Boas Práticas

### ✅ Fazer

1. **Sempre tipar props** com TypeScript
2. **Usar valores default** para props opcionais
3. **Exportar como default** componentes principais
4. **Usar `cn()`** para merge de classes
5. **Adicionar `key`** em listas
6. **Usar `viewport={{ once: true }}`** para performance
7. **Lazy load imagens** com `loading="lazy"`
8. **Componentizar** lógica repetida

### ❌ Evitar

1. **Props drilling** excessivo (mais de 3 níveis)
2. **Componentes gigantes** (> 200 linhas)
3. **Lógica complexa** em components de apresentação
4. **Inline styles** (use Tailwind)
5. **Animações excessivas** (impacta performance)
6. **Estado global desnecessário**
7. **Dependências circulares**

## Checklist de Novo Componente

Ao criar um novo componente:

- [ ] Interface TypeScript definida
- [ ] Props opcionais com valores default
- [ ] Classes CSS usando Tailwind
- [ ] Animações (se aplicável) com Framer Motion
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessível (ARIA labels, keyboard navigation)
- [ ] Performance (memo, lazy loading se necessário)
- [ ] Documentado (comentários se lógica complexa)
- [ ] Exportado corretamente
- [ ] Testado visualmente em diferentes telas

---

[← Anterior: Arquitetura](./03-architecture.md) | [Próximo: Guia de Estilização →](./05-styling-guide.md)
