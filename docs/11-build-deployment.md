# Build e Deploy

Este documento descreve o processo de build e opções de deploy para o projeto Vorix.

## Build Tool: Vite

O projeto usa Vite 6.0 como build tool e dev server.

### Vantagens do Vite

- ⚡ Dev server extremamente rápido (ESM nativo)
- 🔥 Hot Module Replacement (HMR) instantâneo
- 📦 Build otimizado com Rollup
- 🎯 Tree-shaking automático
- 🔧 Configuração mínima

## Configuração do Vite

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr() // SVGs como componentes React
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  publicDir: 'public',
  server: {
    port: 3009,
    open: true,
    hmr: {
      host: 'localhost'
    },
    fs: {
      strict: true
    },
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion']
        }
      }
    }
  },
  define: {
    'process.env': {},
    'process.browser': true,
    'process.version': JSON.stringify(process.version)
  }
});
```

## Scripts de Build

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite --port 3010 --host",
    "build": "tsc -p tsconfig.build.json && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Comandos

#### Desenvolvimento

```bash
npm run dev
```

- Inicia servidor em `http://localhost:3010`
- HMR ativado
- Source maps completos
- Sem minificação

#### Build de Produção

```bash
npm run build
```

**Processo**:
1. Compila TypeScript (`tsc -p tsconfig.build.json`)
2. Verifica tipos
3. Vite build (Rollup)
4. Minifica código (esbuild)
5. Otimiza assets
6. Gera build na pasta `dist/`

#### Preview Build Local

```bash
npm run preview
```

- Serve o build de produção localmente
- Testa antes do deploy
- Simula ambiente de produção

## Estrutura do Build

### dist/ Output

```
dist/
├── index.html              # HTML principal
├── assets/
│   ├── index-[hash].js     # Bundle JavaScript principal
│   ├── vendor-[hash].js    # Dependências (React, etc.)
│   ├── motion-[hash].js    # Framer Motion (code split)
│   ├── index-[hash].css    # CSS compilado
│   ├── [asset]-[hash].svg  # SVGs otimizados
│   ├── [asset]-[hash].jpg  # Imagens otimizadas
│   └── ...
├── favicon.ico
└── robots.txt
```

### Hash de Arquivos

Vite adiciona hash aos nomes para cache busting:
- `index-abc123.js` → Novo hash quando conteúdo muda
- Browser cacheia com segurança
- Atualizações automáticas

## Otimizações de Build

### Code Splitting

```typescript
// Automático por rota (React Router + Vite)
const About = lazy(() => import('./pages/About'));

// Manual chunks (vite.config.ts)
manualChunks: {
  vendor: ['react', 'react-dom'],
  motion: ['framer-motion']
}
```

### Tree Shaking

Remoção automática de código não utilizado:

```typescript
// Apenas getByText é incluído no bundle
import { getByText } from '@testing-library/react';

// Com Tailwind, apenas classes usadas são incluídas
```

### Minificação

```typescript
// vite.config.ts
build: {
  minify: 'esbuild', // Mais rápido que terser
  cssMinify: true,
}
```

### Asset Optimization

```typescript
// Imagens < 4kb → inline como base64
// Imagens > 4kb → arquivo separado com hash

// SVGs → otimizados e pode ser inlined
```

## Environment Variables

### Criando .env

```bash
# .env.local (gitignore)
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=UA-XXXXXXX
```

### Usando em Código

```typescript
// Sempre prefixo VITE_
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

console.log('API:', apiUrl);
console.log('Mode:', import.meta.env.MODE); // 'development' | 'production'
```

### .env Files

```
.env                # Todas environments (commitado)
.env.local          # Local overrides (gitignored)
.env.development    # Dev environment
.env.production     # Prod environment
```

## Opções de Deploy

### 1. Vercel (Recomendado)

**Vantagens**: Deploy automático, CDN global, HTTPS grátis, preview deployments

#### Setup

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Deploy para produção:
```bash
vercel --prod
```

#### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### GitHub Integration

1. Conecte repositório no dashboard Vercel
2. Cada push → deploy automático
3. PRs → preview deployment
4. Merge to main → produção

### 2. Netlify

**Vantagens**: Similar ao Vercel, forms handling, edge functions

#### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Deploy

```bash
# Via Netlify CLI
npm i -g netlify-cli
netlify deploy --prod
```

### 3. GitHub Pages

**Vantagens**: Grátis, integrado com GitHub

#### Setup

1. Instalar gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicionar script:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Configurar base em vite.config.ts:
```typescript
export default defineConfig({
  base: '/nome-do-repo/', // Para GitHub Pages
});
```

4. Deploy:
```bash
npm run deploy
```

### 4. AWS S3 + CloudFront

**Vantagens**: Controle total, escalável

#### Setup

1. Build:
```bash
npm run build
```

2. Upload para S3:
```bash
aws s3 sync dist/ s3://seu-bucket --delete
```

3. Invalidar CloudFront:
```bash
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

### 5. Docker

Para containerização:

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build & Run

```bash
docker build -t vorix-app .
docker run -p 8080:80 vorix-app
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Performance Checklist

### Build Otimizações

- [x] Code splitting implementado
- [x] Tree shaking ativado
- [x] Minificação (esbuild)
- [x] CSS purge (Tailwind)
- [x] Asset optimization
- [x] Gzip compression (servidor)

### Runtime Otimizações

- [ ] Lazy loading de rotas
- [x] Lazy loading de imagens
- [ ] Service Worker (PWA)
- [ ] Prefetch de rotas críticas
- [ ] Cache headers corretos

## Monitoramento

### Analytics

```typescript
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track page views
const location = useLocation();
useEffect(() => {
  ReactGA.send({ hitType: 'pageview', page: location.pathname });
}, [location]);
```

### Error Tracking (Sentry)

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## Lighthouse Score Goals

Target scores para produção:

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

### Verificar Score

```bash
# Via CLI
npm install -g lighthouse
lighthouse https://seu-site.com --view

# Ou use Chrome DevTools → Lighthouse tab
```

## Troubleshooting

### Build Falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Erro de TypeScript

```bash
# Verificar tipos
npx tsc --noEmit

# Build com tipos
npm run build
```

### 404 em Rotas SPA

Configure rewrites no servidor:

```
/* → /index.html (200)
```

Necessário para SPAs com client-side routing.

## Checklist de Deploy

- [ ] `npm run lint` sem erros
- [ ] `npm test` passa (quando testes implementados)
- [ ] `npm run build` sucesso
- [ ] Testar build local com `npm run preview`
- [ ] Environment variables configuradas
- [ ] Redirects/rewrites configurados
- [ ] HTTPS configurado
- [ ] CDN configurado (se aplicável)
- [ ] Analytics instalado
- [ ] Error tracking configurado
- [ ] Lighthouse score verificado
- [ ] Cross-browser testing
- [ ] Mobile testing

## Comandos Úteis

```bash
# Análise do bundle
npm run build -- --mode analyze

# Build com source maps
npm run build -- --sourcemap

# Build sem minificação (debug)
npm run build -- --minify false

# Limpar dist
rm -rf dist

# Verificar tamanho do build
du -sh dist/
```

---

[← Anterior: Testes](./10-testing.md) | [Próximo: Coding Standards →](./12-coding-standards.md)
