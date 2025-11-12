# Convenções TypeScript

Este documento descreve as convenções e boas práticas de TypeScript utilizadas no projeto Vorix.

## Configuração TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Características principais**:
- **strict: true** - Modo estrito ativado
- **noUnusedLocals/Parameters: false** - Permite variáveis não usadas
- **Path aliases** - `@/*` aponta para `./src/*`

## Convenções de Naming

### Componentes

```tsx
// PascalCase para componentes
const ServiceCard: React.FC<ServiceCardProps> = () => { };
const BlogArticle: React.FC = () => { };
const Header: React.FC = () => { };
```

### Interfaces e Types

```tsx
// PascalCase com sufixo "Props" para props de componentes
interface ServiceCardProps {
  title: string;
  description: string;
}

// PascalCase para tipos de dados
interface Article {
  id: string;
  title: string;
  content: string;
}

// PascalCase para tipos utilitários
type ServiceSlug = string;
type ComponentVariant = 'default' | 'highlighted';
```

### Variáveis e Funções

```tsx
// camelCase para variáveis
const userName = 'João';
const isActive = true;
const projectCount = 10;

// camelCase para funções
const handleClick = () => { };
const fetchData = async () => { };
const calculateTotal = (items: Item[]) => { };
```

### Constantes

```tsx
// UPPER_SNAKE_CASE para constantes globais
const MAX_ITEMS = 100;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;

// camelCase para constantes locais
const defaultTheme = 'dark';
const primaryColor = '#ECC80B';
```

### Enums

```tsx
// PascalCase para enum name, PascalCase para valores
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// Uso
const role: UserRole = UserRole.Admin;
```

**Nota**: O projeto prefere **union types** ao invés de enums:

```tsx
// Preferido
type UserRole = 'admin' | 'user' | 'guest';

// Ao invés de enum
enum UserRole { Admin, User, Guest }
```

## Tipagem de Componentes

### Props Interface

```tsx
// Interface para props (sempre)
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

// Componente tipado
const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn('base-classes', className)}
    >
      {children}
    </button>
  );
};
```

### Children Prop

```tsx
// ReactNode para children (aceita tudo)
interface LayoutProps {
  children: React.ReactNode;
}

// ReactElement para children específicos
interface ModalProps {
  children: React.ReactElement<HTMLDivElement>;
}

// Função como children (render prop)
interface DataLoaderProps<T> {
  children: (data: T) => React.ReactNode;
}
```

### Event Handlers

```tsx
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Uso
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // ...
};
```

### Refs

```tsx
// useRef com tipo específico
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// Uso
useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;
```

### State

```tsx
// Tipo inferido automaticamente
const [count, setCount] = useState(0); // number
const [name, setName] = useState(''); // string

// Tipo explícito quando necessário
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);

// Interface complexa
interface FormState {
  name: string;
  email: string;
  message: string;
}

const [formData, setFormData] = useState<FormState>({
  name: '',
  email: '',
  message: '',
});
```

## Tipos de Dados

### Modelos de Dados

```tsx
// src/types/knowledge-base.ts
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  featured?: boolean; // Opcional
  popular?: boolean;  // Opcional
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

### Union Types

```tsx
// Status types
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Button variants
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

// Size options
type Size = 'sm' | 'md' | 'lg' | 'xl';

// Uso
const [status, setStatus] = useState<LoadingState>('idle');
```

### Utility Types

```tsx
// Partial - Torna todas as props opcionais
type PartialUser = Partial<User>;

// Required - Torna todas as props obrigatórias
type RequiredConfig = Required<Config>;

// Pick - Seleciona props específicas
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// Omit - Remove props específicas
type UserWithoutPassword = Omit<User, 'password'>;

// Record - Objeto com chaves e valores tipados
type ServiceMap = Record<string, React.ComponentType>;

// Exemplo prático
const servicePages: Record<string, React.ComponentType> = {
  'seo': SEOPage,
  'marketing': MarketingPage,
};
```

### Intersection Types

```tsx
// Combina múltiplos tipos
interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

type UserWithTimestamps = User & Timestamps;

// Uso
const user: UserWithTimestamps = {
  id: '1',
  name: 'João',
  email: 'joao@example.com',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-02',
};
```

### Generic Types

```tsx
// Função genérica
function identity<T>(value: T): T {
  return value;
}

// Interface genérica
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Uso
const userResponse: ApiResponse<User> = {
  data: { id: '1', name: 'João' },
  status: 200,
  message: 'Success',
};

// Componente genérico
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
```

## Tipagem de Hooks

### Custom Hooks

```tsx
// Hook com retorno tipado
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// Uso
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
```

### useReducer

```tsx
// State e actions tipados
interface State {
  count: number;
  user: User | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Uso
const [state, dispatch] = useReducer(reducer, {
  count: 0,
  user: null,
});
```

### useContext

```tsx
// Context tipado
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

// Hook customizado
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## Tipagem de Framer Motion

### Motion Components

```tsx
import { motion } from 'framer-motion';

// Variants tipados
interface Variants {
  hidden: {
    opacity: number;
    y: number;
  };
  visible: {
    opacity: number;
    y: number;
  };
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Motion props
<motion.div
  initial="hidden"
  animate="visible"
  variants={variants}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

### Scroll Animations

```tsx
import { useScroll, useTransform, MotionValue } from 'framer-motion';

// MotionValue tipado
const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll();

const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 300]);
const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
```

## Tipagem de Formulários

### React Hook Form

```tsx
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <span>Campo obrigatório</span>}
    </form>
  );
};
```

## Type Guards

### Type Narrowing

```tsx
// Type guard function
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === 'string' && typeof obj.email === 'string';
}

// Uso
const data: unknown = fetchData();

if (isUser(data)) {
  // TypeScript sabe que data é User aqui
  console.log(data.name);
}
```

### Discriminated Unions

```tsx
type Success = {
  status: 'success';
  data: User;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

// Type narrowing
function handleResult(result: Result) {
  if (result.status === 'success') {
    // TypeScript sabe que result é Success
    console.log(result.data.name);
  } else {
    // TypeScript sabe que result é Error
    console.log(result.message);
  }
}
```

## Asserts e Type Casting

### Type Assertions

```tsx
// As syntax (preferido)
const element = document.getElementById('root') as HTMLDivElement;

// Angle bracket (evitar em TSX)
const element = <HTMLDivElement>document.getElementById('root');

// Non-null assertion (!)
const element = document.getElementById('root')!; // Afirma que não é null

// Type assertion com unknown
const value = input as unknown as MyType; // Double assertion
```

### Const Assertions

```tsx
// Sem const assertion
const config = {
  theme: 'dark',
  fontSize: 14,
}; // type: { theme: string; fontSize: number }

// Com const assertion
const config = {
  theme: 'dark',
  fontSize: 14,
} as const; // type: { readonly theme: "dark"; readonly fontSize: 14 }

// Array com const assertion
const colors = ['red', 'blue', 'green'] as const;
type Color = typeof colors[number]; // "red" | "blue" | "green"
```

## Boas Práticas

### ✅ Fazer

1. **Sempre tipar props** de componentes com interfaces
2. **Usar inferência** quando possível (não sobre-tipar)
3. **Preferir interfaces** para objetos, types para unions
4. **Tipar event handlers** corretamente
5. **Usar utility types** (Partial, Pick, Omit) para DRY
6. **Criar type guards** para type narrowing seguro
7. **Exportar types** reutilizáveis em arquivos dedicados
8. **Usar strict mode** sempre

### ❌ Evitar

1. **`any`** - Use `unknown` se não sabe o tipo
2. **Type assertions desnecessárias** - Deixe inferência trabalhar
3. **Interfaces vazias** - Não adiciona valor
4. **Enums** - Prefira union types
5. **Tipos muito complexos** - Simplifique quando possível
6. **Ignorar erros** com `@ts-ignore` - Corrija a causa
7. **Duplicação de tipos** - Reutilize e exporte

## Exemplos Práticos

### Componente Completo Tipado

```tsx
// src/components/general/ServiceCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  variant?: 'default' | 'highlighted';
  className?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  index,
  variant = 'default',
  className,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-accent/50 p-8',
        variant === 'highlighted' && 'border-2 border-primary',
        className
      )}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
```

---

[← Anterior: Rotas e Navegação](./06-routing-navigation.md) | [Próximo: Padrões de Animação →](./08-animation-patterns.md)
