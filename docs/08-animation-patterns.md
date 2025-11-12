# Padrões de Animação

Este documento descreve os padrões de animação utilizados no projeto Vorix usando Framer Motion.

## Framer Motion

Biblioteca principal para animações avançadas no projeto.

```bash
npm install framer-motion@12.5.0
```

## Animações Básicas

### Fade In

Componente aparece com fade:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

### Slide In (Vertical)

Componente desliza de baixo para cima:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

### Slide In (Horizontal)

```tsx
// Da esquerda
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>

// Da direita
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

### Scale In

Componente cresce:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

## Animações com Scroll

### whileInView

Anima quando elemento entra na viewport:

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }} // Anima apenas uma vez
  transition={{ duration: 0.6 }}
>
  Conteúdo
</motion.div>
```

**Opções de viewport**:

```tsx
viewport={{
  once: true,      // Anima apenas uma vez
  amount: 0.3,     // % do elemento visível para trigger (0-1)
  margin: "100px", // Margem para trigger
}}
```

### useScroll Hook

Track scroll progress:

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

const Component = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        opacity: useTransform(scrollYProgress, [0, 1], [1, 0]),
        scale: useTransform(scrollYProgress, [0, 1], [1, 0.8]),
      }}
    >
      Fade out ao scrollar
    </motion.div>
  );
};
```

### Scroll com Target

Anima baseado na posição de um elemento específico:

```tsx
const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>
        Parallax effect
      </motion.div>
    </div>
  );
};
```

**Offset Options**:
- `"start start"` - Início do elemento com início do viewport
- `"end start"` - Fim do elemento com início do viewport
- `"center center"` - Centro do elemento com centro do viewport
- `"end end"` - Fim do elemento com fim do viewport

### Parallax Effect

```tsx
const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <img src={background} alt="Background" className="w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-10">
        Conteúdo sobre o parallax
      </div>
    </section>
  );
};
```

## Staggered Animations

### Stagger Children

Anima filhos sequencialmente:

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1 // 100ms entre cada filho
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
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Delay Based on Index

```tsx
{services.map((service, index) => (
  <motion.div
    key={service.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.1 // Stagger de 100ms
    }}
  >
    <ServiceCard {...service} />
  </motion.div>
))}
```

## Hover Animations

### Hover Scale

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  Hover para crescer
</motion.div>
```

### Hover + Tap

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Clique em mim
</motion.button>
```

### Hover com Transform Origin

```tsx
<motion.div
  whileHover={{
    scale: 1.1,
    rotate: 5
  }}
  transition={{ duration: 0.3 }}
  style={{ transformOrigin: 'center' }}
>
  Hover com rotação
</motion.div>
```

### Group Hover Effect

```tsx
<div className="group">
  <motion.img
    className="transition-transform duration-500"
    whileHover={{ scale: 1.1 }}
  />
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    whileHover={{ opacity: 1, height: 'auto' }}
    transition={{ duration: 0.3 }}
  >
    Conteúdo revelado no hover
  </motion.div>
</div>
```

## Animações de Layout

### layoutId

Anima transições entre estados:

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    {!isOpen && (
      <motion.div
        layoutId="card"
        onClick={() => setIsOpen(true)}
      >
        Thumbnail
      </motion.div>
    )}

    {isOpen && (
      <motion.div
        layoutId="card"
        onClick={() => setIsOpen(false)}
      >
        Expanded View
      </motion.div>
    )}
  </>
);
```

### layout Prop

Auto-anima mudanças de layout:

```tsx
<motion.div layout>
  {items.map(item => (
    <motion.div key={item.id} layout>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Animações de Entrada/Saída

### AnimatePresence

Para componentes que entram/saem do DOM:

```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      Modal ou Overlay
    </motion.div>
  )}
</AnimatePresence>
```

### Mode="wait"

Aguarda exit antes de montar novo componente:

```tsx
<AnimatePresence mode="wait">
  <motion.div key={currentView}>
    {currentView === 'list' ? <ListView /> : <GridView />}
  </motion.div>
</AnimatePresence>
```

## Variants (Padrão Recomendado)

### Definindo Variants

```tsx
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

// Uso
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  whileHover="hover"
  viewport={{ once: true }}
>
  Card Content
</motion.div>
```

### Variants com Parâmetros

```tsx
const itemVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    y: 30,
    transition: {
      delay: custom * 0.1
    }
  }),
  visible: {
    opacity: 1,
    y: 0
  }
};

// Uso
{items.map((item, index) => (
  <motion.div
    key={item.id}
    custom={index}
    variants={itemVariants}
    initial="hidden"
    animate="visible"
  >
    {item.content}
  </motion.div>
))}
```

## Custom Transitions

### Easing Functions

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 1,
    ease: "easeInOut"     // Suave início e fim
    // ease: "easeIn"      // Aceleração gradual
    // ease: "easeOut"     // Desaceleração gradual
    // ease: "linear"      // Velocidade constante
    // ease: [0.17, 0.67, 0.83, 0.67] // Cubic bezier customizado
  }}
/>
```

### Spring Animation

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 100,  // Rigidez da mola
    damping: 10,     // Amortecimento
    mass: 1          // Massa do objeto
  }}
/>
```

### Tween (Padrão)

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "tween",
    duration: 0.5,
    ease: "easeOut"
  }}
/>
```

## ScrollAnimation Component (Wrapper Customizado)

### Implementação

```tsx
// src/components/general/ScrollAnimation.tsx
interface ScrollAnimationProps {
  children: React.ReactNode;
  yRange?: [number, number];
  opacityRange?: [number, number];
  scaleRange?: [number, number];
  offsetStart?: string;
  offsetEnd?: string;
  once?: boolean;
  disabled?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  yRange = [50, 0],
  opacityRange = [0, 1],
  scaleRange,
  offsetStart = "start end",
  offsetEnd = "end start",
  once = true,
  disabled = false
}) => {
  const ref = useRef<HTMLDivElement>(null);

  if (disabled) {
    return <>{children}</>;
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd]
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  const scale = scaleRange
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : undefined;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      initial={{ opacity: opacityRange[0] }}
      whileInView={{ opacity: opacityRange[1] }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};
```

### Uso do ScrollAnimation

```tsx
// Fade in simples
<ScrollAnimation>
  <ServiceCard {...service} />
</ScrollAnimation>

// Parallax customizado
<ScrollAnimation
  yRange={[100, -50]}
  opacityRange={[0, 1, 0.8]}
  scaleRange={[0.9, 1]}
>
  <Hero />
</ScrollAnimation>

// Animação reversa
<ScrollAnimation
  yRange={[-30, 30]}
  offsetStart="start start"
  offsetEnd="end end"
>
  <FloatingElement />
</ScrollAnimation>
```

## Path Animations (SVG)

### Draw Animation

```tsx
<motion.svg viewBox="0 0 100 100">
  <motion.path
    d="M 10 10 L 90 90"
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2, ease: "easeInOut" }}
  />
</motion.svg>
```

### Morphing

```tsx
<motion.path
  animate={{
    d: isOpen
      ? "M 20 20 L 80 80 M 20 80 L 80 20" // X
      : "M 20 40 L 80 40 M 20 60 L 80 60" // Menu
  }}
  transition={{ duration: 0.3 }}
/>
```

## Performance Best Practices

### ✅ Otimizações

1. **Use whileInView com once: true**
```tsx
<motion.div whileInView={{...}} viewport={{ once: true }} />
```

2. **Prefira transform e opacity** (GPU accelerated)
```tsx
// Bom (GPU)
animate={{ x: 100, opacity: 1, scale: 1.1 }}

// Evitar (CPU)
animate={{ width: '100%', height: '200px', backgroundColor: 'red' }}
```

3. **Use will-change para animações complexas**
```tsx
<motion.div style={{ willChange: 'transform' }}>
```

4. **Desabilite animações em mobile se necessário**
```tsx
const isMobile = window.innerWidth < 768;

<motion.div
  animate={!isMobile ? { scale: 1.1 } : undefined}
>
```

### ❌ Evitar

1. **Animar muitos elementos simultaneamente** (>50)
2. **Animações complexas em loops infinitos**
3. **Animar propriedades que causam reflow** (width, height, top, left)
4. **Variantes muito complexas** (divida em múltiplas animações)

## Tailwind + Framer Motion

### Combinando Classes e Motion

```tsx
<motion.div
  className="rounded-lg bg-primary p-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  Componente híbrido
</motion.div>
```

### Transitions CSS vs Framer

```tsx
// CSS transitions (para estados simples)
<div className="transition-colors duration-300 hover:bg-primary">
  Hover simples
</div>

// Framer Motion (para animações complexas)
<motion.div
  whileHover={{
    scale: 1.05,
    rotate: 5,
    backgroundColor: "var(--primary)"
  }}
>
  Hover complexo
</motion.div>
```

## Exemplos Práticos

### Card com Hover Lift

```tsx
<motion.div
  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
  transition={{ duration: 0.3 }}
  className="rounded-2xl bg-accent p-6"
>
  <h3>Título do Card</h3>
  <p>Descrição</p>
</motion.div>
```

### Hero com Fade + Stagger

```tsx
<div>
  <motion.h1
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Título Principal
  </motion.h1>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    Subtítulo
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
  >
    <Button>Call to Action</Button>
  </motion.div>
</div>
```

---

[← Anterior: Convenções TypeScript](./07-typescript-conventions.md) | [Próximo: Gerenciamento de Dados →](./09-data-management.md)
