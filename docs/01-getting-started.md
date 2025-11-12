# Getting Started - Guia de Início Rápido

Este guia irá ajudá-lo a configurar o ambiente de desenvolvimento do projeto Vorix.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**: versão >= 18.0.0
- **npm**: versão >= 8.0.0
- **Git**: para clonar o repositório

### Verificando Versões

```bash
node --version   # Deve retornar v18.x.x ou superior
npm --version    # Deve retornar 8.x.x ou superior
```

## Instalação

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd nobrelobo-site-master
```

### 2. Instale as Dependências

```bash
npm install
```

Este comando irá instalar todas as dependências listadas no `package.json`, incluindo:
- React 18.2
- TypeScript 5.0
- Vite 6.0
- Tailwind CSS 3.3
- Framer Motion 12.5
- React Router 6.30
- E muitas outras...

## Comandos de Desenvolvimento

### Servidor de Desenvolvimento

```bash
npm run dev
```

- Inicia o servidor de desenvolvimento na porta **3010**
- Abre automaticamente o navegador
- Hot Module Replacement (HMR) ativado
- Acesse: `http://localhost:3010`

### Build de Produção

```bash
npm run build
```

- Compila o TypeScript
- Gera bundle otimizado com Vite
- Saída na pasta `dist/`
- Tailwind CSS purgado (apenas classes utilizadas)

### Preview do Build

```bash
npm run preview
```

- Serve o build de produção localmente
- Útil para testar antes do deploy
- Simula ambiente de produção

### Linting

```bash
npm run lint
```

- Executa ESLint em todos os arquivos `.ts` e `.tsx`
- Verifica padrões de código
- Relata warnings e erros

### Testes

```bash
npm test
```

- Executa testes com Jest
- React Testing Library configurado
- **Nota:** Framework configurado, mas testes ainda não implementados

## Estrutura Inicial do Projeto

Após a instalação, você terá a seguinte estrutura:

```
nobrelobo-site-master/
├── node_modules/        # Dependências instaladas
├── public/              # Assets estáticos
├── src/                 # Código fonte
│   ├── components/      # Componentes React
│   ├── pages/           # Páginas da aplicação
│   ├── routes/          # Configuração de rotas
│   ├── styles/          # Estilos globais
│   ├── utils/           # Utilitários
│   ├── data/            # Dados estáticos
│   ├── types/           # Tipos TypeScript
│   ├── App.tsx          # Componente raiz
│   └── main.tsx         # Entry point
├── docs/                # Documentação (você está aqui!)
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
├── tailwind.config.js   # Configuração Tailwind
└── postcss.config.js    # Configuração PostCSS
```

## Verificando a Instalação

Após executar `npm run dev`, você deve ver:

```
VITE v6.0.1  ready in XXX ms

  ➜  Local:   http://localhost:3010/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Abra `http://localhost:3010` no navegador e você verá a homepage do Vorix.

## Próximos Passos

Agora que seu ambiente está configurado:

1. **Explore o código**: Comece pelos componentes em `src/components/general/`
2. **Entenda as rotas**: Veja `src/routes/index.tsx`
3. **Leia a arquitetura**: Consulte [Arquitetura](./03-architecture.md)
4. **Conheça os padrões**: Veja [Padrões de Componentes](./04-component-patterns.md)

## Problemas Comuns

### Erro: "Cannot find module"

**Solução**: Execute `npm install` novamente ou delete `node_modules` e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3010 already in use"

**Solução**: Mate o processo na porta 3010 ou use outra porta:

```bash
npm run dev -- --port 3011
```

### Erro de TypeScript

**Solução**: Certifique-se de que está usando TypeScript 5.0+:

```bash
npm list typescript
```

### Build falha

**Solução**: Verifique se há erros de linting primeiro:

```bash
npm run lint
```

## Recursos Adicionais

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## Dicas de Desenvolvimento

1. **Hot Reload**: Alterações em componentes são refletidas instantaneamente
2. **Path Aliases**: Use `@/` para importar de `src/` (ex: `import { Button } from '@/components/ui/button'`)
3. **Console**: Use o console do navegador para debug (React DevTools recomendado)
4. **Tailwind IntelliSense**: Instale a extensão do VS Code para autocompletar classes

## Configuração do Editor (VS Code)

Extensões recomendadas:

- **ES7+ React/Redux/React-Native snippets**: Snippets para React
- **Tailwind CSS IntelliSense**: Autocompletar Tailwind
- **TypeScript Importer**: Auto-import de tipos
- **ESLint**: Linting em tempo real
- **Prettier**: Formatação de código

---

**Pronto!** Você está preparado para começar a desenvolver no projeto Vorix.

[← Voltar ao Índice](./README.md) | [Próximo: Visão Geral do Projeto →](./02-project-overview.md)
