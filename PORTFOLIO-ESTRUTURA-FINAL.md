# 🏗️ Estrutura Final da Página Portfolio

## Hierarquia de Componentes

```
<Layout>
├── Header (do Layout)
└── <main>
    ├── <HeroPages>
    │   └── Hero com imagem de fundo + overlay
    │
    ├── <motion.section> "Projetos em Destaque"
    │   ├── Header (Badge + Título + Descrição)
    │   └── <motion.div> Grid (containerVariants + itemVariants)
    │       └── {featuredProjects.map()} → Link → Card (16:9)
    │           ├── Imagem
    │           ├── Overlay Gradient
    │           ├── Conteúdo
    │           │   ├── Badge Categoria
    │           │   ├── Título
    │           │   ├── Cliente
    │           │   └── Link "Ver detalhes"
    │           └── Indicador ⭐ (animado)
    │
    ├── <motion.section> "Filtros e Busca"
    │   ├── <div> Campo Busca
    │   │   ├── Ícone (SVG lupa)
    │   │   └── <input> (onChange → setSearchQuery)
    │   │
    │   ├── <motion.div> Botões Categoria
    │   │   └── {categories.map()} → <motion.button>
    │   │       ├── className (ternário: ativo/inativo)
    │   │       └── onClick → setActiveCategory
    │   │
    │   └── {searchQuery && <motion.div>} "X projetos encontrados"
    │
    ├── <motion.section> "Grid Principal de Projetos"
    │   └── <AnimatePresence mode="wait">
    │       ├── {displayedProjects.length > 0 ? (
    │       │   <motion.div> Grid (containerVariants)
    │       │   └── {displayedProjects.map()} → <motion.div>
    │       │       └── Link → Card (4:5)
    │       │           ├── Imagem
    │       │           ├── Overlay Gradient
    │       │           ├── Efeito Shine
    │       │           └── Conteúdo
    │       │               ├── Badge
    │       │               ├── Título
    │       │               ├── Cliente
    │       │               ├── Descrição (hover)
    │       │               └── Link (hover)
    │       │
    │       └── ) : (
    │           <motion.div> EmptyState
    │           ├── Ícone (animated pulse)
    │           ├── Mensagem
    │           └── Botão "Limpar Filtros"
    │       )}
    │
    ├── <motion.section> "Estatísticas"
    │   └── <motion.div> Grid 3 colunas
    │       └── {stats.map()} → <motion.div>
    │           ├── <motion.h3> Número (animated)
    │           └── <p> Descrição
    │
    ├── <CtaSection />
    │   └── Call-to-action final
    │
    └── Footer (do Layout)
```

---

## Estrutura HTML Simplificada

### Seção de Destaques
```html
<section class="py-16 md:py-24">
  <div class="container max-w-6xl">
    <!-- Header -->
    <div class="mb-12 md:mb-16">
      <div class="flex items-center gap-3">
        <div class="h-1 w-12 bg-primary"></div>
        <span class="text-primary uppercase">Destaques</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        Projetos em Destaque
      </h2>
      <p class="text-white/60">Descrição...</p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card Destaque -->
      <a href="/portfolio/slug">
        <div class="relative overflow-hidden rounded-xl aspect-video bg-black/50 border border-white/10 hover:border-primary/30">
          <img src="..." class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <div class="absolute inset-0 p-6 flex flex-col justify-end">
            <span class="text-xs text-primary bg-primary/20 px-2 py-1 rounded-full w-fit">
              Categoria
            </span>
            <h3 class="text-xl font-bold text-white mt-3">Título</h3>
            <p class="text-sm text-white/70">Cliente</p>
            <div class="text-primary text-sm mt-2 opacity-0 group-hover:opacity-100">
              Ver detalhes →
            </div>
          </div>
          <!-- Estrela -->
          <div class="absolute top-4 right-4 text-2xl">⭐</div>
        </div>
      </a>
    </div>
  </div>
</section>
```

### Seção de Filtros
```html
<section class="py-12 md:py-16 border-y border-white/10">
  <div class="container max-w-6xl">
    <!-- Busca -->
    <div class="mb-8">
      <div class="relative">
        <svg class="absolute left-4 top-1/2">...</svg>
        <input
          type="text"
          placeholder="Buscar projetos..."
          class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50"
        />
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-3">
      {/* Botões de categoria */}
      <button class="px-4 py-2 rounded-full bg-white/5 text-white border border-white/10">
        Todos os Projetos
      </button>
      <button class="px-4 py-2 rounded-full bg-primary text-black border border-primary">
        Branding (ativo)
      </button>
    </div>

    <!-- Contador -->
    {searchQuery && <p class="mt-4 text-sm text-white/60">6 projetos encontrados</p>}
  </div>
</section>
```

### Grid Principal
```html
<section class="py-16 md:py-24">
  <div class="container max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card Projeto -->
      <a href="/portfolio/slug" class="group">
        <div class="relative overflow-hidden rounded-xl aspect-[4/5] bg-black/50 border border-white/10 hover:border-primary/50">
          <img src="..." class="w-full h-full object-cover group-hover:scale-105" />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

          <!-- Shine Effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100" style="background: linear-gradient(135deg, transparent, rgba(236,200,11,0.05), transparent)" />

          <!-- Conteúdo -->
          <div class="absolute inset-0 p-5 flex flex-col justify-end">
            <div>
              <span class="text-xs text-primary bg-primary/20 px-2.5 py-1 rounded-full">
                {category}
              </span>
              <h3 class="text-lg font-bold text-white mt-3 group-hover:text-primary">
                {title}
              </h3>
              <p class="text-sm text-white/70 mt-1.5">
                {client}
              </p>

              <!-- Descrição (aparece no hover) -->
              <div class="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100">
                <p class="text-xs text-white/80 mt-3">{description}</p>
              </div>

              <!-- Link (aparece no hover) -->
              <div class="flex items-center gap-2 text-primary text-sm opacity-0 group-hover:opacity-100 mt-3">
                Ver detalhes →
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>

    <!-- Estado Vazio -->
    {displayedProjects.length === 0 && (
      <div class="py-20 text-center">
        <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20">
          🔍
        </div>
        <h3 class="text-2xl font-bold text-white">Nenhum projeto encontrado</h3>
        <p class="text-white/60 mt-2">Tente ajustar sua busca ou categoria</p>
        <button class="px-6 py-3 mt-8 bg-primary/10 text-primary border border-primary/30 rounded-full">
          Limpar Filtros
        </button>
      </div>
    )}
  </div>
</section>
```

### Seção de Estatísticas
```html
<section class="py-16 md:py-20 border-y border-white/10">
  <div class="container max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <h3 class="text-4xl md:text-5xl font-bold text-primary">25+</h3>
        <p class="text-white/60">Projetos Completados</p>
      </div>
      <div>
        <h3 class="text-4xl md:text-5xl font-bold text-primary">18+</h3>
        <p class="text-white/60">Clientes Satisfeitos</p>
      </div>
      <div>
        <h3 class="text-4xl md:text-5xl font-bold text-primary">95%</h3>
        <p class="text-white/60">Taxa de Sucesso</p>
      </div>
    </div>
  </div>
</section>
```

---

## Fluxo de Dados

```typescript
// Estados
const [displayedProjects, setDisplayedProjects] = useState(portfolioData)
const [activeCategory, setActiveCategory] = useState('all')
const [searchQuery, setSearchQuery] = useState('')

// Efeito: Filtrar quando category ou search muda
useEffect(() => {
  let filtered = portfolioData

  // 1. Filtro por categoria
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory)
  }

  // 2. Filtro por busca
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.client.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  setDisplayedProjects(filtered)
}, [activeCategory, searchQuery])

// Render
return (
  <>
    {/* Seção Destaques */}
    {featuredProjects.length > 0 && <DestaqueSection />}

    {/* Filtros */}
    <Filtros
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      resultCount={displayedProjects.length}
    />

    {/* Grid */}
    <GridProjetos projects={displayedProjects} />

    {/* Estatísticas */}
    <Estatisticas />
  </>
)
```

---

## Variantes Framer Motion

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,        // 100ms entre filhos
      delayChildren: 0.3           // 300ms antes de começar
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },   // Começa abaixo
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]  // cubic-bezier
    }
  }
}

// Uso
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={containerVariants}
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Conteúdo */}
    </motion.div>
  ))}
</motion.div>
```

---

## Estados Visuais do Card

### Estado Normal
```
┌─────────────────────┐
│    [IMAGEM]         │
│    [OVERLAY]        │
│  Category Badge     │
│  Título             │
│  Cliente            │
└─────────────────────┘
```

### Estado Hover
```
┌─────────────────────┐
│    [IMAGEM+ZOOM]    │ ← scale 1.05
│    [OVERLAY+SHINE]  │ ← mais opaco
│  Category Badge ✨  │ ← bg-primary/30
│  Título (primária)  │ ← color change
│  Cliente            │
│  Descrição... ✓     │ ← fade in
│  Ver detalhes →     │ ← fade in
└─────────────────────┘
  ↑ elevação -4px (Y offset)
```

---

## Responsividade Detalhada

### Mobile Styles
```css
/* Hero */
h-[50vh]

/* Grid Destaque */
grid-cols-1

/* Filtros */
input: w-full
buttons: flex-wrap

/* Grid Principal */
grid-cols-1

/* Cards */
aspect-[4/5] ← mantém proporção

/* Tipografia */
text-sm: descrição
text-base: cliente
text-lg: título
text-3xl: section title
```

### Tablet Styles
```css
/* Hero */
h-[55vh]

/* Grid Destaque */
md:grid-cols-2

/* Grid Principal */
md:grid-cols-2

/* Tipografia */
text-base: descrição
text-lg: título
text-4xl: section title
```

### Desktop Styles
```css
/* Hero */
h-[60vh]

/* Grid Destaque */
lg:grid-cols-3 ← COMPLETO

/* Grid Principal */
lg:grid-cols-3 ← COMPLETO

/* Hover Effects */
group-hover:* ← ATIVADO

/* Tipografia */
text-base/lg: descrição
text-lg/xl: título
text-5xl: section title
```

---

## Performance Checklist

```
✅ Imagens lazy loading
✅ will-change: transform em animações
✅ transform: translate3d(0, 0, 0) para GPU
✅ Sem renderizações desnecessárias
✅ useCallback para callbacks
✅ Variants sem cálculos dinâmicos
✅ AnimatePresence modo="wait"
✅ whileInView com once: true
```

---

## Integração com Roteamento

```typescript
// Link para projeto
<Link to={`/portfolio/${project.slug}`}>
  <Card />
</Link>

// Route definida em routes/index.tsx
{
  path: '/portfolio/:slug',
  element: <PortfolioDetail />
}

// Acesso ao slug em PortfolioDetail
const { slug } = useParams()
const project = portfolioData.find(p => p.slug === slug)
```

---

## Versão Simplificada (sem detalhes)

```
Portfolio Page
├── Hero (mantido)
├── Destaques Section
│   └── Grid 3 cols com cards 16:9
├── Filtros & Busca Section
│   ├── Input com onChange
│   └── Botões com onClick
├── Projetos Grid Section
│   ├── AnimatePresence
│   └── Grid 3 cols com cards 4:5
├── Stats Section
│   └── 3 números grandes
├── CTA Section (mantido)
└── Footer (do Layout)
```

---

**Data:** 12 de Novembro de 2024
**Status:** ✅ Estrutura Finalizada
**Versão:** 1.0.0
