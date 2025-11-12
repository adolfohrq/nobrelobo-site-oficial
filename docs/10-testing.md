# Testes

Este documento descreve a configuração de testes e padrões recomendados para o projeto Vorix.

## Status Atual

⚠️ **Nota**: O framework de testes está configurado, mas os testes ainda não foram implementados no projeto.

## Stack de Testes

### Ferramentas Configuradas

```json
{
  "jest": "^29.7.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.4",
  "jest-environment-jsdom": "^29.7.0"
}
```

- **Jest**: Framework de testes JavaScript
- **React Testing Library**: Testes de componentes React
- **Jest DOM**: Matchers customizados para DOM

## Configuração

### Scripts de Teste

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Jest Configuration

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
};
```

### Setup File

```ts
// jest.setup.js
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Padrões de Testes

### Testes de Componentes

#### Teste Básico

```tsx
// src/components/general/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

#### Teste com Props

```tsx
// src/components/general/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  const mockProps = {
    title: 'SEO Estratégico',
    description: 'Otimização para motores de busca',
    icon: <span data-testid="icon">Icon</span>,
    index: 0
  };

  it('renders all props correctly', () => {
    render(<ServiceCard {...mockProps} />);

    expect(screen.getByText('SEO Estratégico')).toBeInTheDocument();
    expect(screen.getByText('Otimização para motores de busca')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies correct animation delay based on index', () => {
    const { container } = render(<ServiceCard {...mockProps} index={2} />);

    // Verificar se o delay foi aplicado (0.2s para index 2)
    // Nota: Pode precisar de configuração adicional para testar animações Framer Motion
  });
});
```

### Testes de Hooks

```tsx
// src/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('retrieves value from localStorage on mount', () => {
    localStorage.setItem('key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('stored');
  });
});
```

### Testes de Integração

```tsx
// src/pages/Services.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from './Services';

describe('Services Page', () => {
  it('renders all services', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByText('SEO Estratégico')).toBeInTheDocument();
    expect(screen.getByText('Marketing Digital')).toBeInTheDocument();
    expect(screen.getByText('Design Gráfico')).toBeInTheDocument();
  });

  it('navigates to service detail on card click', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    const seoLink = screen.getByRole('link', { name: /seo estratégico/i });
    expect(seoLink).toHaveAttribute('href', '/services/seo-estrategico');
  });
});
```

### Testes de Formulários

```tsx
// src/components/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva');
    await userEvent.type(screen.getByLabelText(/email/i), 'joao@example.com');
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Mensagem de teste');

    userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        message: 'Mensagem de teste'
      });
    });
  });
});
```

## Testing Library Queries

### Prioridade de Queries

Use nesta ordem (mais acessível primeiro):

1. **getByRole** - Mais acessível
```tsx
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 1 })
```

2. **getByLabelText** - Para inputs
```tsx
screen.getByLabelText('Nome')
screen.getByLabelText(/email/i)
```

3. **getByPlaceholderText** - Placeholder
```tsx
screen.getByPlaceholderText('Digite seu nome')
```

4. **getByText** - Texto visível
```tsx
screen.getByText('Clique aqui')
screen.getByText(/título/i)
```

5. **getByTestId** - Último recurso
```tsx
screen.getByTestId('custom-element')
```

### Variantes de Queries

```tsx
// get* - Lança erro se não encontrar (use para elementos que devem existir)
screen.getByText('Título')

// query* - Retorna null se não encontrar (use para verificar ausência)
expect(screen.queryByText('Não existe')).not.toBeInTheDocument()

// find* - Async, aguarda elemento aparecer
await screen.findByText('Carregado')
```

## Mocking

### Mock de Módulos

```tsx
// Mock do react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ slug: 'test-slug' }),
}));

// Mock de API
jest.mock('@/utils/api', () => ({
  fetchArticles: jest.fn(() => Promise.resolve([
    { id: '1', title: 'Article 1' }
  ])),
}));
```

### Mock de Framer Motion

```tsx
// jest.setup.js
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 0,
}));
```

### Mock de LocalStorage

```tsx
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock as any;
```

## Cobertura de Testes

### Executar com Cobertura

```bash
npm run test:coverage
```

### Metas de Cobertura

```js
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Relatório de Cobertura

```
coverage/
├── lcov-report/
│   └── index.html    # Abra no navegador
└── coverage-summary.json
```

## Teste de Acessibilidade

### jest-axe

```bash
npm install --save-dev jest-axe
```

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Testes E2E (Futuro)

### Playwright (Recomendado)

```bash
npm install --save-dev @playwright/test
```

```ts
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3010');

  await expect(page.locator('h1')).toContainText('Vorix');
  await expect(page.locator('nav')).toBeVisible();
});

test('navigates to services page', async ({ page }) => {
  await page.goto('http://localhost:3010');

  await page.click('text=Serviços');
  await expect(page).toHaveURL(/\/services/);
});
```

## Boas Práticas

### ✅ Fazer

1. **Testar comportamento**, não implementação
2. **Usar queries acessíveis** (getByRole, getByLabelText)
3. **Mockar dependências externas** (APIs, navegação)
4. **Testar casos de erro** além de casos felizes
5. **Usar userEvent** ao invés de fireEvent
6. **Seguir AAA pattern** (Arrange, Act, Assert)
7. **Testes independentes** (não dependem de ordem)
8. **Cleanup automático** (React Testing Library faz isso)

### ❌ Evitar

1. **Testar detalhes de implementação** (classes CSS, state interno)
2. **getByTestId como primeira opção**
3. **Testes muito complexos** (divida em menores)
4. **Testes que dependem de timing** (use waitFor)
5. **Snapshots excessivos** (use com moderação)
6. **Duplicação de testes** (DRY principle)

## Estrutura de Teste Recomendada

```tsx
describe('ComponentName', () => {
  // Setup comum
  const defaultProps = {
    title: 'Test Title',
    onClick: jest.fn(),
  };

  // Cleanup (se necessário)
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testes de renderização
  describe('rendering', () => {
    it('renders with required props', () => {
      // Test
    });

    it('renders with optional props', () => {
      // Test
    });
  });

  // Testes de interação
  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      // Test
    });
  });

  // Testes de edge cases
  describe('edge cases', () => {
    it('handles null values', () => {
      // Test
    });

    it('handles empty arrays', () => {
      // Test
    });
  });

  // Testes de acessibilidade
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      // Test
    });
  });
});
```

## Exemplo Completo

```tsx
// src/components/general/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  const defaultProps = {
    title: 'SEO Estratégico',
    description: 'Otimização para motores de busca',
    icon: <span data-testid="icon">📊</span>,
    index: 0,
  };

  describe('rendering', () => {
    it('renders all content correctly', () => {
      render(<ServiceCard {...defaultProps} />);

      expect(screen.getByText('SEO Estratégico')).toBeInTheDocument();
      expect(screen.getByText(/otimização para motores/i)).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('applies highlighted variant when specified', () => {
      const { container } = render(
        <ServiceCard {...defaultProps} variant="highlighted" />
      );

      expect(container.firstChild).toHaveClass('border-2', 'border-primary');
    });
  });

  describe('interactions', () => {
    it('calls onClick when card is clicked', async () => {
      const handleClick = jest.fn();
      render(<ServiceCard {...defaultProps} onClick={handleClick} />);

      await userEvent.click(screen.getByText('SEO Estratégico'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ServiceCard {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

## Comandos Úteis

```bash
# Executar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com cobertura
npm run test:coverage

# Teste específico
npm test ServiceCard

# Atualizar snapshots
npm test -- -u

# Modo verbose
npm test -- --verbose
```

## Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

[← Anterior: Gerenciamento de Dados](./09-data-management.md) | [Próximo: Build e Deploy →](./11-build-deployment.md)
