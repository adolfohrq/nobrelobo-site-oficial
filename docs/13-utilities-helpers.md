# Utilitários e Helpers

Este documento descreve os utilitários e funções auxiliares disponíveis no projeto Vorix.

## Localização

Todos os utilitários estão em `src/utils/`.

```
src/utils/
├── cn.ts                 # Class name merger
├── routeChecker.ts       # Validação de rotas
└── routerWarnings.ts     # Supressão de warnings
```

## Class Name Merger (cn)

### Localização: `src/utils/cn.ts`

Combina e mescla classes CSS, especialmente útil com Tailwind.

### Implementação

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Como Funciona

1. **clsx**: Concatena classes condicionalmente
2. **twMerge**: Mescla classes Tailwind conflitantes (último vence)

### Uso Básico

```tsx
import { cn } from '@/utils/cn';

// Simples
cn('px-2 py-1', 'px-3')
// → 'py-1 px-3' (px-3 sobrescreve px-2)

// Condicional
cn('base-class', isActive && 'active-class')
// → 'base-class active-class' (se isActive = true)

// Arrays
cn(['class1', 'class2'], 'class3')
// → 'class1 class2 class3'

// Objetos
cn({ 'active': isActive, 'disabled': isDisabled })
// → 'active' ou 'disabled' ou ambas (se true)
```

### Exemplos Práticos

#### Em Componentes

```tsx
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children
}) => {
  return (
    <button
      className={cn(
        // Classes base
        'rounded-lg font-medium transition-colors',

        // Variantes
        variant === 'default' && 'bg-accent text-accent-foreground',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',

        // Tamanhos
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3 text-lg',

        // Classes customizadas (sobrescreve anteriores)
        className
      )}
    >
      {children}
    </button>
  );
};

// Uso
<Button variant="primary" size="lg" className="w-full">
  Submit
</Button>
```

#### Com Estado

```tsx
const Card = ({ isActive, isDisabled }) => {
  return (
    <div
      className={cn(
        'p-6 rounded-lg border-2',
        isActive && 'border-primary bg-primary/10',
        isDisabled && 'opacity-50 cursor-not-allowed',
        !isActive && !isDisabled && 'border-border'
      )}
    >
      Card Content
    </div>
  );
};
```

## Route Checker

### Localização: `src/utils/routeChecker.ts`

Valida rotas e registra navegação para debug.

### Implementação

```typescript
export const checkRoute = (pathname: string): boolean => {
  const validRoutes = [
    '/',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
    '/knowledge-base'
  ];

  return validRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
};

export const logNavigation = (pathname: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`🧭 Navegação para: ${pathname}`);
  }
};

export const validateServiceSlug = (slug: string): boolean => {
  const validSlugs = [
    'seo-estrategico',
    'automacao-de-marketing',
    'inteligencia-artificial',
    'trafego-pago',
    'marketing-digital',
    'desenvolvimento-web',
    'social-media',
    'branding',
    'design-grafico'
  ];

  return validSlugs.includes(slug);
};
```

### Uso

```tsx
import { checkRoute, logNavigation, validateServiceSlug } from '@/utils/routeChecker';

// Verificar rota válida
const isValid = checkRoute('/services/seo-estrategico');

// Log de navegação (apenas dev)
useEffect(() => {
  logNavigation(location.pathname);
}, [location.pathname]);

// Validar slug de serviço
const ServicePage = () => {
  const { slug } = useParams();

  if (!validateServiceSlug(slug)) {
    return <NotFound />;
  }

  return <ServiceComponent slug={slug} />;
};
```

## Router Warnings Suppressor

### Localização: `src/utils/routerWarnings.ts`

Suprime warnings conhecidos do React Router v7.

### Implementação

```typescript
export const suppressRouterWarnings = () => {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    if (args[0]?.includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args) => {
    if (args[0]?.includes('React Router')) {
      return;
    }
    originalError.apply(console, args);
  };
};
```

### Uso

```tsx
// src/main.tsx
import { suppressRouterWarnings } from '@/utils/routerWarnings';

suppressRouterWarnings();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Utilitários Comuns (Para Implementar)

### Slugify

Converte texto em slug URL-friendly.

```typescript
// src/utils/slugify.ts
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiais
    .replace(/\s+/g, '-') // Espaços → hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove hífens no início/fim
};

// Uso
slugify('SEO Estratégico 2024'); // 'seo-estrategico-2024'
slugify('Olá Mundo!'); // 'ola-mundo'
```

### Format Date

Formata datas para pt-BR.

```typescript
// src/utils/formatDate.ts
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'full' = 'short'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    full: {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }
  }[format];

  return new Intl.DateTimeFormat('pt-BR', options).format(d);
};

// Uso
formatDate('2024-01-15'); // '15/01/2024'
formatDate('2024-01-15', 'long'); // '15 de janeiro de 2024'
formatDate('2024-01-15', 'full'); // 'segunda-feira, 15 de janeiro de 2024'
```

### Format Currency

Formata valores monetários.

```typescript
// src/utils/formatCurrency.ts
export const formatCurrency = (
  value: number,
  currency: 'BRL' | 'USD' = 'BRL'
): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(value);
};

// Uso
formatCurrency(1234.56); // 'R$ 1.234,56'
formatCurrency(1234.56, 'USD'); // 'US$ 1.234,56'
```

### Truncate Text

Trunca texto com ellipsis.

```typescript
// src/utils/truncate.ts
export const truncate = (
  text: string,
  maxLength: number,
  ellipsis: string = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length).trim() + ellipsis;
};

// Uso
truncate('Lorem ipsum dolor sit amet', 15); // 'Lorem ipsum...'
truncate('Short', 20); // 'Short'
```

### Debounce

Atrasa execução de função.

```typescript
// src/utils/debounce.ts
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Uso
const handleSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 300);

<input onChange={(e) => handleSearch(e.target.value)} />
```

### Throttle

Limita frequência de execução.

```typescript
// src/utils/throttle.ts
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Uso
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

window.addEventListener('scroll', handleScroll);
```

### Deep Clone

Clona objetos profundamente.

```typescript
// src/utils/deepClone.ts
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Uso
const original = { name: 'João', meta: { age: 30 } };
const copy = deepClone(original);
copy.meta.age = 31;
console.log(original.meta.age); // 30 (não afetado)
```

### Local Storage Helper

Wrapper type-safe para localStorage.

```typescript
// src/utils/storage.ts
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch {
      return defaultValue ?? null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Uso
storage.set('theme', 'dark');
const theme = storage.get<'light' | 'dark'>('theme', 'light');
storage.remove('theme');
```

### Array Helpers

Utilitários para arrays.

```typescript
// src/utils/array.ts
export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

// Uso
const articles = [
  { id: 1, category: 'SEO' },
  { id: 2, category: 'SEO' },
  { id: 3, category: 'Marketing' }
];

groupBy(articles, 'category');
// { "SEO": [...], "Marketing": [...] }

unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (aleatório)
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## Validadores

### Email Validator

```typescript
// src/utils/validators.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhone = (phone: string): boolean => {
  // Formato brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const regex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return regex.test(phone);
};
```

## Custom Hooks como Utilitários

### useDebounce

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Uso
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Fazer busca
      console.log('Searching:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
};
```

### useMediaQuery

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Uso
const Component = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      {isMobile && <MobileNav />}
      {isDesktop && <DesktopNav />}
    </div>
  );
};
```

## Boas Práticas

### ✅ Fazer

1. **Funções puras** quando possível
2. **Type-safe** com TypeScript
3. **Documentar** com JSDoc
4. **Testar** utilitários críticos
5. **Export named** para tree-shaking
6. **Um arquivo por utilitário** (ou agrupados por tema)
7. **Reutilizar** ao invés de duplicar

### ❌ Evitar

1. **Side effects** em utilitários
2. **Dependências desnecessárias**
3. **Código não testado**
4. **Funções muito genéricas** (otimize para casos de uso reais)
5. **Mutação de argumentos**

---

[← Anterior: Coding Standards](./12-coding-standards.md) | [Voltar ao Índice](./README.md)
