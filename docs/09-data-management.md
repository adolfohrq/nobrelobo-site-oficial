# Gerenciamento de Dados

Este documento descreve como os dados são gerenciados no projeto Vorix.

## Estratégia Atual

O projeto Vorix utiliza **dados estáticos** compilados no build. Não há integração com APIs ou banco de dados.

### Fluxo de Dados

```
Data Files (src/data/) → Components (Props) → Render
                                           ↓
                                   Local State (useState)
```

## Estrutura de Dados

### Knowledge Base Data

Localização: `src/data/knowledge-base-data.ts`

```tsx
// src/data/knowledge-base-data.ts
import { Article } from '@/types/knowledge-base';

export const articles: Article[] = [
  {
    id: 'seo-guia-completo',
    title: 'Guia Completo de SEO em 2024',
    excerpt: 'Aprenda as melhores práticas de SEO para 2024',
    content: `
      <h2>Introdução ao SEO</h2>
      <p>SEO é fundamental para...</p>
      <!-- Conteúdo HTML completo -->
    `,
    category: 'SEO',
    readTime: 10,
    date: '2024-01-15',
    author: {
      name: 'João Silva',
      avatar: '/avatars/joao.jpg',
      role: 'Especialista em SEO'
    },
    tags: ['seo', 'google', 'ranking'],
    featured: true,
    popular: true
  },
  // ... mais artigos
];

export const categories = [
  {
    name: 'SEO',
    slug: 'seo',
    description: 'Otimização para motores de busca',
    icon: <SearchIcon />
  },
  // ... mais categorias
];
```

### Tipos de Dados

```tsx
// src/types/knowledge-base.ts
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  category: string;
  readTime: number; // minutos
  date: string; // ISO format
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

export interface ArticleFilter {
  category?: string;
  tag?: string;
  searchQuery?: string;
}
```

## Estado Local com useState

### Estado de UI

```tsx
// Controle de menus
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

// Hover states
const [isHovered, setIsHovered] = useState(false);

// Modal/Dialog
const [isModalOpen, setIsModalOpen] = useState(false);

// Active tab/view
const [activeTab, setActiveTab] = useState('overview');
```

### Estado de Formulário

```tsx
// Formulário simples
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log(formData);
};
```

### Estado de Filtro

```tsx
// Filtros de portfolio
const [selectedCategory, setSelectedCategory] = useState<string>('all');
const [searchQuery, setSearchQuery] = useState('');

const filteredProjects = projects.filter(project => {
  const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
  const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});
```

## Dados em Componentes

### Pattern: Data em Pages, Props em Components

```tsx
// ❌ Ruim: Dados hardcoded no component
const ServicesSection = () => {
  const services = [
    { title: 'SEO', description: '...' },
    // ...
  ];

  return <div>{/* render */}</div>;
};

// ✅ Bom: Dados vêm via props
interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return <div>{/* render */}</div>;
};

// Page component gerencia dados
const Home = () => {
  const services = [
    { title: 'SEO', description: '...' },
    // ...
  ];

  return <ServicesSection services={services} />;
};
```

## Fetching de Dados (Futuro)

Quando integrar com APIs:

### Fetch com useEffect

```tsx
const [data, setData] = useState<Article[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      const articles = await response.json();
      setData(articles);
    } catch (err) {
      setError('Erro ao carregar artigos');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;

return <ArticleList articles={data} />;
```

### Custom Hook para Fetch

```tsx
// src/hooks/useArticles.ts
function useArticles() {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Uso
const Component = () => {
  const { data, loading, error } = useArticles();
  // ...
};
```

### React Query (Recomendado para futuro)

```tsx
import { useQuery } from '@tanstack/react-query';

function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      return res.json();
    }
  });
}

// Uso
const Component = () => {
  const { data, isLoading, error } = useArticles();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <ArticleList articles={data} />;
};
```

## Derived State

Estado calculado a partir de outros estados ou props:

```tsx
const Component = ({ items }: { items: Item[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Derived state - não precisa de useState
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const itemCount = filteredItems.length; // Também derived

  return (
    <div>
      <p>Mostrando {itemCount} itens</p>
      {filteredItems.map(item => <Card key={item.id} {...item} />)}
    </div>
  );
};
```

## Local Storage

Persistir dados no navegador:

### Custom Hook

```tsx
// src/hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Uso
const Component = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme (Current: {theme})
    </button>
  );
};
```

## Form Management

### React Hook Form

```tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema de validação
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  message: yup.string().min(10, 'Mensagem muito curta').required('Mensagem é obrigatória')
}).required();

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula envio
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Nome</label>
        <input
          {...register('name')}
          id="name"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message">Mensagem</label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full p-2 border rounded"
        />
        {errors.message && <p className="text-destructive">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground px-6 py-2 rounded"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};
```

## Context API (Para Estado Global)

Quando necessário compartilhar estado entre múltiplos componentes:

### Criando um Context

```tsx
// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Usando o Context

```tsx
// App.tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

// Qualquer componente
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'dark' ? 'bg-background' : 'bg-white'}>
      <button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </header>
  );
};
```

## Data Transformation

### Filtros e Busca

```tsx
// Filtro por categoria
const filterByCategory = (items: Article[], category: string) => {
  return category === 'all'
    ? items
    : items.filter(item => item.category === category);
};

// Busca por texto
const searchItems = (items: Article[], query: string) => {
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.excerpt.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Ordenação
const sortByDate = (items: Article[]) => {
  return [...items].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Paginação
const paginate = <T,>(items: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
};
```

### Agrupamento

```tsx
// Agrupar artigos por categoria
const groupByCategory = (articles: Article[]) => {
  return articles.reduce((acc, article) => {
    const category = article.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, Article[]>);
};

// Uso
const grouped = groupByCategory(articles);
// { "SEO": [...], "Marketing": [...], "Design": [...] }

Object.entries(grouped).map(([category, items]) => (
  <div key={category}>
    <h2>{category}</h2>
    {items.map(item => <Card key={item.id} {...item} />)}
  </div>
));
```

## Memoization

### useMemo

Para cálculos pesados:

```tsx
const Component = ({ items }: { items: Item[] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sem memo - recalcula em TODA renderização
  const filteredItems = items.filter(item =>
    item.title.includes(searchQuery)
  );

  // Com memo - só recalcula quando dependências mudam
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.title.includes(searchQuery)
    );
  }, [items, searchQuery]);

  return <div>{/* render */}</div>;
};
```

### useCallback

Para funções que são passadas como props:

```tsx
const Parent = () => {
  const [count, setCount] = useState(0);

  // Sem callback - nova função toda renderização
  const handleClick = () => {
    console.log('Clicked');
  };

  // Com callback - mesma referência se dependências não mudam
  const handleClick = useCallback(() => {
    console.log('Clicked', count);
  }, [count]);

  return <Child onClick={handleClick} />;
};
```

## Boas Práticas

### ✅ Fazer

1. **Dados em arquivos separados** (`src/data/`)
2. **Tipar todos os dados** com TypeScript
3. **Props drilling máximo de 2-3 níveis**
4. **useMemo para cálculos pesados**
5. **useCallback para funções em props**
6. **Validar formulários** com yup/zod
7. **Loading e error states** sempre

### ❌ Evitar

1. **Dados hardcoded** em componentes
2. **Estado global desnecessário**
3. **Fetch sem error handling**
4. **Props drilling excessivo** (> 3 níveis)
5. **Objetos grandes no useState**
6. **Recálculos desnecessários** (sem memo)
7. **Mutação direta de state**

## Roadmap Futuro

Quando o projeto crescer:

### API Integration
- Integrar com backend REST ou GraphQL
- Implementar React Query para caching
- Adicionar interceptors para auth

### State Management
- Considerar Zustand para estado global leve
- Redux Toolkit para aplicações complexas
- Jotai/Recoil para estado atômico

### Data Fetching
- Server-Side Rendering (Next.js)
- Incremental Static Regeneration
- Optimistic updates

### Offline Support
- IndexedDB para cache local
- Service Workers
- Sync quando online

---

[← Anterior: Padrões de Animação](./08-animation-patterns.md) | [Próximo: Testes →](./10-testing.md)
