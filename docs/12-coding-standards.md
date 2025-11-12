# Coding Standards

Este documento define os padrões de código para o projeto Vorix.

## Princípios Gerais

### SOLID Principles

1. **Single Responsibility**: Um componente = uma responsabilidade
2. **Open/Closed**: Aberto para extensão, fechado para modificação
3. **Liskov Substitution**: Componentes substituíveis
4. **Interface Segregation**: Interfaces específicas
5. **Dependency Inversion**: Dependa de abstrações

### DRY (Don't Repeat Yourself)

Reutilize código ao invés de duplicar.

```tsx
// ❌ Ruim: Duplicação
const Card1 = () => (
  <div className="rounded-lg bg-accent p-6">Content 1</div>
);

const Card2 = () => (
  <div className="rounded-lg bg-accent p-6">Content 2</div>
);

// ✅ Bom: Componente reutilizável
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg bg-accent p-6">{children}</div>
);
```

### KISS (Keep It Simple, Stupid)

Simplifique quando possível.

```tsx
// ❌ Ruim: Complexidade desnecessária
const getStatus = (value: number) => {
  if (value > 0) {
    if (value < 50) {
      return 'low';
    } else if (value < 80) {
      return 'medium';
    } else {
      return 'high';
    }
  } else {
    return 'none';
  }
};

// ✅ Bom: Simples e claro
const getStatus = (value: number) => {
  if (value <= 0) return 'none';
  if (value < 50) return 'low';
  if (value < 80) return 'medium';
  return 'high';
};
```

## Naming Conventions

### Arquivos

```
# Componentes: PascalCase
ServiceCard.tsx
BlogArticle.tsx
DramaticHero.tsx

# Utilitários: camelCase
cn.ts
routeChecker.ts
slugify.ts

# Tipos: PascalCase ou kebab-case
knowledge-base.ts
index.d.ts

# Páginas: PascalCase
Home.tsx
Services.tsx
About.tsx

# Páginas de serviço: kebab-case (match URL)
seo-estrategico.tsx
marketing-digital.tsx
```

### Variáveis e Constantes

```typescript
// camelCase para variáveis
const userName = 'João';
const itemCount = 10;
const isLoading = false;

// UPPER_SNAKE_CASE para constantes globais
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// camelCase para constantes locais
const defaultTheme = 'dark';
const primaryColor = '#ECC80B';
```

### Funções

```typescript
// camelCase para funções
const calculateTotal = (items: Item[]) => { };
const handleClick = () => { };
const fetchUserData = async () => { };

// Prefixos comuns
const getUserById = (id: string) => { }; // get*
const setUserName = (name: string) => { }; // set*
const isAuthenticated = () => { }; // is*
const hasPermission = () => { }; // has*
const canEdit = () => { }; // can*
const shouldRender = () => { }; // should*
```

### Componentes e Tipos

```typescript
// PascalCase sempre
const ServiceCard: React.FC<ServiceCardProps> = () => { };

interface ServiceCardProps {
  title: string;
}

type ButtonVariant = 'default' | 'primary';
```

### Event Handlers

```typescript
// Prefixo "handle"
const handleClick = () => { };
const handleSubmit = (e: React.FormEvent) => { };
const handleInputChange = (e: React.ChangeEvent) => { };

// Em props: prefixo "on"
interface ButtonProps {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
}
```

## Estrutura de Componentes

### Template Base

```tsx
// 1. Imports (agrupados)
import React, { useState, useEffect } from 'react'; // React
import { motion } from 'framer-motion'; // External libs
import { useNavigate } from 'react-router-dom'; // External libs
import { Button } from '@/components/ui/button'; // Internal: UI
import { cn } from '@/utils/cn'; // Internal: Utils
import type { User } from '@/types'; // Types

// 2. Interface
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Component
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 3.1 Hooks (ordem: estado, efeitos, refs, custom hooks)
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Side effects
  }, []);

  // 3.2 Handlers
  const handleClick = () => {
    setState(true);
    onAction?.();
  };

  // 3.3 Render helpers (se necessário)
  const renderContent = () => {
    return <div>Content</div>;
  };

  // 3.4 Return
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

// 4. Export
export default Component;
```

### Order of Hooks

```tsx
// 1. State hooks
const [value, setValue] = useState('');
const [isOpen, setIsOpen] = useState(false);

// 2. Refs
const inputRef = useRef<HTMLInputElement>(null);
const containerRef = useRef<HTMLDivElement>(null);

// 3. Context
const theme = useTheme();
const auth = useAuth();

// 4. Router hooks
const navigate = useNavigate();
const location = useLocation();
const { id } = useParams();

// 5. Effects
useEffect(() => { }, []);

// 6. Callbacks
const handleClick = useCallback(() => { }, []);

// 7. Memos
const filteredItems = useMemo(() => [], []);

// 8. Custom hooks
const { data, loading } = useData();
```

## Comentários

### Quando Comentar

```tsx
// ✅ Bom: Explica "por quê", não "o quê"
// Workaround para bug do Safari com backdrop-filter
const styles = { WebkitBackdropFilter: 'blur(10px)' };

// ❌ Ruim: Comenta o óbvio
// Define a variável count como 0
const count = 0;

// ✅ Bom: Documenta função complexa
/**
 * Calcula o desconto baseado em múltiplas regras de negócio.
 * Aplica desconto progressivo: 5% até 100 itens, 10% acima.
 * @param items - Lista de itens do pedido
 * @param userTier - Nível do usuário (bronze, silver, gold)
 * @returns Valor do desconto em reais
 */
const calculateDiscount = (items: Item[], userTier: string) => {
  // Implementação
};
```

### JSDoc para Funções Públicas

```tsx
/**
 * Formata valor monetário para BRL.
 * @param value - Valor numérico
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns String formatada com R$
 * @example
 * formatCurrency(1234.56) // "R$ 1.234,56"
 */
export const formatCurrency = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
  }).format(value);
};
```

### TODO Comments

```tsx
// TODO: Implementar lazy loading de imagens
// FIXME: Corrigir bug de scroll em mobile
// HACK: Workaround temporário, refatorar depois
// NOTE: Esta função será depreciada na v2.0
```

## Formatação

### Indentação

- **2 espaços** (não tabs)
- Configurado no ESLint

### Comprimento de Linha

- **Máximo 100 caracteres** (recomendado)
- Quebrar linhas longas

```tsx
// ❌ Ruim: Linha muito longa
<Button variant="primary" size="lg" onClick={handleSubmit} disabled={isLoading} className="w-full">

// ✅ Bom: Quebrar atributos
<Button
  variant="primary"
  size="lg"
  onClick={handleSubmit}
  disabled={isLoading}
  className="w-full"
>
  Submit
</Button>
```

### Espaçamento

```tsx
// ✅ Bom: Espaços consistentes
const sum = a + b;
if (condition) { }
const array = [1, 2, 3];
const obj = { name: 'João', age: 30 };

// ❌ Ruim: Espaços inconsistentes
const sum=a+b;
if(condition){}
const array=[1,2,3];
```

### Aspas

Use **aspas simples** para strings:

```tsx
const name = 'João';
const className = 'bg-primary';

// Aspas duplas apenas em JSX
<div className="bg-primary">
```

### Ponto e vírgula

**Sempre use ponto e vírgula**:

```tsx
const value = 10;
const name = 'João';
```

## Organização de Imports

### Ordem

```tsx
// 1. React
import React, { useState, useEffect } from 'react';

// 2. External libraries (alfabético)
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 3. Internal - UI components
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

// 4. Internal - General components
import ServiceCard from '@/components/general/ServiceCard';
import Header from '@/components/general/Header';

// 5. Internal - Utils, Hooks, Data
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { articles } from '@/data/knowledge-base-data';

// 6. Types (sempre por último)
import type { Article, Category } from '@/types/knowledge-base';

// 7. Styles (se aplicável)
import './styles.css';
```

### Named vs Default Imports

```tsx
// Preferir named exports para utils
export const slugify = (text: string) => { };
import { slugify } from '@/utils/slugify';

// Default export para componentes principais
const ServiceCard = () => { };
export default ServiceCard;
import ServiceCard from '@/components/general/ServiceCard';

// Named exports para múltiplos componentes no mesmo arquivo
export const Button = () => { };
export const ButtonGroup = () => { };
import { Button, ButtonGroup } from '@/components/ui/button';
```

## Tratamento de Erros

### Try-Catch

```tsx
// ✅ Bom: Tratamento de erros específico
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Re-throw para componente tratar
  }
};
```

### Error Boundaries

```tsx
// Usar ErrorBoundary para erros de componentes
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

## Conditional Rendering

### Ternários Simples

```tsx
// ✅ Bom: Ternário simples
{isLoading ? <Spinner /> : <Content />}

// ❌ Ruim: Ternários aninhados
{isLoading ? <Spinner /> : hasError ? <Error /> : hasData ? <Content /> : null}

// ✅ Bom: Múltiplas condições
{isLoading && <Spinner />}
{hasError && <Error />}
{hasData && <Content />}
```

### Early Returns

```tsx
// ✅ Bom: Early return
const Component = ({ data }) => {
  if (!data) return <EmptyState />;
  if (data.length === 0) return <EmptyState />;

  return <div>{/* Render normal */}</div>;
};

// ❌ Ruim: Nested conditions
const Component = ({ data }) => {
  return (
    <div>
      {data ? (
        data.length > 0 ? (
          <div>{/* Render */}</div>
        ) : (
          <EmptyState />
        )
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
```

## Performance

### React.memo

```tsx
// Use para componentes que re-renderizam com props iguais
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Render pesado */}</div>;
});
```

### useMemo e useCallback

```tsx
// useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// useCallback para funções em props
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Keys em Listas

```tsx
// ✅ Bom: Key único e estável
{items.map(item => (
  <Card key={item.id} {...item} />
))}

// ❌ Ruim: Index como key (se lista pode mudar)
{items.map((item, index) => (
  <Card key={index} {...item} />
))}

// ⚠️ Aceitável: Index se lista é estática
{STATIC_ITEMS.map((item, index) => (
  <Card key={index} {...item} />
))}
```

## Acessibilidade

### Semantic HTML

```tsx
// ✅ Bom: HTML semântico
<header>
  <nav>
    <ul>
      <li><a href="/about">Sobre</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título</h1>
    <p>Conteúdo</p>
  </article>
</main>

// ❌ Ruim: Divs para tudo
<div>
  <div>
    <div><div>Sobre</div></div>
  </div>
</div>
```

### ARIA Labels

```tsx
// Botões sem texto
<button aria-label="Fechar modal">
  <XIcon />
</button>

// Inputs com labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Links descritivos
<a href="/about" aria-label="Saiba mais sobre a empresa">
  Saiba mais
</a>
```

## Segurança

### XSS Prevention

```tsx
// ✅ Bom: React escapa automaticamente
<div>{userInput}</div>

// ⚠️ Cuidado: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

// Sanitize primeiro
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);
```

### Validação de Input

```tsx
// Sempre valide inputs
const schema = yup.object({
  email: yup.string().email().required(),
  age: yup.number().min(18).max(120).required(),
});
```

## ESLint Rules

### Principais Regras Ativas

```json
{
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Desabilitar Regra (Use com Parcimônia)

```tsx
// Linha específica
// eslint-disable-next-line no-console
console.log('Debug info');

// Arquivo inteiro
/* eslint-disable no-console */
```

## Git Commit Messages

### Formato

```
tipo(escopo): descrição curta

Descrição detalhada (opcional)

Relacionado: #123
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (não afeta lógica)
- **refactor**: Refatoração de código
- **test**: Adicionar/corrigir testes
- **chore**: Manutenção (build, deps)

### Exemplos

```bash
feat(services): adiciona página de SEO estratégico

fix(header): corrige menu mobile em iPhone
Fecha menu ao clicar em link

docs(readme): atualiza instruções de setup

refactor(utils): simplifica função de slugify

style(components): formata com prettier

test(hooks): adiciona testes para useLocalStorage

chore(deps): atualiza react para 18.2.1
```

## Code Review Checklist

- [ ] Código segue padrões do projeto
- [ ] Nomes de variáveis/funções descritivos
- [ ] Sem código comentado/debug logs
- [ ] TypeScript sem `any`
- [ ] Props tipadas corretamente
- [ ] Componente responsivo
- [ ] Acessibilidade considerada
- [ ] Performance considerada (memo se necessário)
- [ ] Testes adicionados (quando aplicável)
- [ ] Documentação atualizada

---

[← Anterior: Build e Deploy](./11-build-deployment.md) | [Próximo: Utilitários e Helpers →](./13-utilities-helpers.md)
