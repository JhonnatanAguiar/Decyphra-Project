# 📋 Planejamento Completo - Decyphra Website

> **Documento Central de Planejamento**  
> Este arquivo consolida toda a documentação de planejamento do projeto.  
> Última atualização: Dezembro 2024

---

## 📑 Índice

1. [Objetivo e Visão Geral](#objetivo-e-visão-geral)
2. [Identidade Visual](#identidade-visual)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Arquitetura MVC](#arquitetura-mvc)
5. [Rotas do Projeto](#rotas-do-projeto)
6. [Design System](#design-system)
7. [Banco de Dados](#banco-de-dados)
8. [Versionamento de API](#versionamento-de-api)
9. [Roadmap com Checklists](#roadmap-com-checklists)
10. [Responsabilidades](#responsabilidades)
11. [Configurações](#configurações)

---

## 🎯 Objetivo e Visão Geral

Reconstruir completamente o site da Decyphra, mantendo a identidade visual atual (cores, fontes, estrutura básica), mas elevando a experiência para um nível premium, dinâmico e impressionante, similar aos sites de referência de agências digitais de alto nível.

### Referências de Inspiração
- **Locomotive.ca** - Scroll suave, animações elegantes, design minimalista
- **Resn.co.nz** - Interatividade, efeitos visuais impressionantes
- **Obys.agency** - Transições suaves, layout criativo
- **ActiveTheory.net** - Experiências imersivas, WebGL

### Princípios
1. **Mantendo Identidade:** Cores verde neon, preto e branco como base
2. **Performance First:** Site rápido, mesmo com animações
3. **Mobile First:** Design responsivo desde o início
4. **Acessibilidade:** Seguir WCAG 2.1 AA mínimo
5. **SEO:** Otimização completa para mecanismos de busca
6. **Escalabilidade:** Estrutura preparada para crescimento futuro

---

## 🎨 Identidade Visual

### Paleta de Cores
- **Primária (Destaque):** Verde Neon (`#00FF88`)
- **Fundo Principal:** Preto/Grafite Escuro (`#01080E` / `#000000`)
- **Texto Principal:** Branco (`#E6F0F3`)
- **Texto Secundário:** Cinza Claro (`#CCCCCC` / `#999999`)
- **Acentos:** Gradientes verdes e efeitos de brilho neon

### Tipografia
- **Fonte Principal:** Inter ou Montserrat (sans-serif moderna e limpa)
- **Títulos:** Fonte robusta e impactante
- **Corpo:** Fonte leve e legível

### Estilo Visual
- Clean e minimalista
- Elementos gráficos sutis (padrões geométricos, brilhos)
- Contraste forte (preto/branco/verde)
- Estética digital e tecnológica

---

## 🛠️ Stack Tecnológica

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Scroll:** Locomotive Scroll ou similar (para efeitos dinâmicos)

### Backend
- **API Routes:** Next.js API Routes (App Router)
- **ORM:** Prisma 5.19.0
- **Validação:** Zod

### Banco de Dados
- **Primário:** PostgreSQL via **Neon** (serverless, gratuito, auto-scaling)
- **Configuração:** `.env.local` via `dotenv-cli`

### Hospedagem
- **Produção:** Vercel (otimizado)
- **Migrations:** Estrutura preparada para migração fácil

---

## 🏗️ Arquitetura MVC

### Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router (Views)
│   ├── (routes)/          # Rotas públicas
│   ├── api/v1/           # API Routes (Controllers) - Versionadas
│   └── layout.tsx         # Layout principal
│
├── models/                 # Models (Prisma + TypeScript)
│   ├── schemas/           # Schemas Zod
│   └── types/             # Types TypeScript
│
├── controllers/            # Controllers (Lógica de negócio)
│   ├── api/               # Controllers de API
│   └── services/          # Services (regras de negócio)
│
├── views/                  # Componentes React (Views)
│   ├── components/        # Componentes reutilizáveis
│   ├── sections/          # Seções de página
│   └── layouts/           # Layouts específicos
│
└── lib/                    # Utilitários e helpers
    ├── db/                # Configuração do banco
    ├── utils/             # Funções utilitárias
    └── constants/         # Constantes
```

### Fluxo de Dados MVC

```
VIEW → CONTROLLER → SERVICE → MODEL → DATABASE
  ↑                                    ↓
  └────────── Response ←────────────────┘
```

### Convenções de Nomenclatura
- **Components:** PascalCase (`ContactForm.tsx`)
- **Services:** camelCase (`contact.service.ts`)
- **Controllers:** camelCase (`contact.controller.ts`)
- **Types:** PascalCase (`ContactInput`)
- **Schemas:** camelCase (`contact.schema.ts`)
- **Constants:** UPPER_SNAKE_CASE (`SITE_NAME`)

---

## 🗺️ Rotas do Projeto

### Frontend

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/(routes)/page.tsx` | Home |
| `/servicos` | `app/(routes)/servicos/page.tsx` | Serviços |
| `/portfolio` | `app/(routes)/portfolio/page.tsx` | Portfólio |
| `/portfolio/[slug]` | `app/(routes)/portfolio/[slug]/page.tsx` | Projeto individual |
| `/sobre` | `app/(routes)/sobre/page.tsx` | Sobre Nós |
| `/depoimentos` | `app/(routes)/depoimentos/page.tsx` | Depoimentos |
| `/contato` | `app/(routes)/contato/page.tsx` | Contato |
| `/status` | `app/(routes)/status/page.tsx` | Status do site |

### API (Versionadas - `/api/v1/...`)

| Método | Rota | Arquivo | Descrição |
|--------|------|---------|-----------|
| GET | `/api/v1/status` | `app/api/v1/status/route.ts` | Status da API e site |
| POST | `/api/v1/contact` | `app/api/v1/contact/route.ts` | Enviar contato |
| POST | `/api/v1/newsletter` | `app/api/v1/newsletter/route.ts` | Newsletter |
| GET | `/api/v1/projects` | `app/api/v1/projects/route.ts` | Listar projetos |
| GET | `/api/v1/projects/[slug]` | `app/api/v1/projects/[slug]/route.ts` | Detalhes do projeto |
| GET | `/api/v1/testimonials` | `app/api/v1/testimonials/route.ts` | Depoimentos |
| GET | `/api/v1/services` | `app/api/v1/services/route.ts` | Serviços |

---

## 🎨 Design System

### Cores (Tailwind)

```typescript
primary: {
  500: '#00FF88', // Verde neon principal
}
dark: {
  950: '#01080E', // Fundo principal
  1000: '#000000', // Preto puro
}
light: {
  50: '#E6F0F3', // Texto principal
}
```

### Tipografia
- **Fonte:** Inter (via Google Fonts)
- **Fallback:** Montserrat, system-ui, sans-serif

### Componentes Base
- Button (primary, secondary, ghost, dark)
- Input, Textarea, Select
- Card (default, elevated, interactive, featured)
- Badge/Tag
- Modal, Loading Spinner, Toast

### Efeitos Visuais
- Glow/Neon effects
- Hover effects (elevação, glow, scale)
- Scroll animations (fade in, slide up, parallax)
- Page transitions

---

## 💾 Banco de Dados

### Schema Prisma

**Tabelas:**
- `projects` - Projetos do portfólio
- `services` - Serviços oferecidos
- `testimonials` - Depoimentos
- `contact_submissions` - Formulários de contato
- `newsletter_subscribers` - Newsletter

### Configuração

- **Provider:** Neon (PostgreSQL serverless)
- **Connection:** Via `.env.local` usando `dotenv-cli`
- **Scripts:** Todos usam `npx dotenv-cli -e .env.local -- prisma ...`

---

## 🔄 Versionamento de API

**Padrão:** `/api/v{version}/{endpoint}`

- **Versão atual:** v1
- **Estrutura:** `app/api/v1/...`
- **Headers:** `X-API-Version: v1`

---

## 🚀 Roadmap com Checklists

### ✅ Fase 0: Planejamento (CONCLUÍDA)
- [x] Análise do site atual
- [x] Documentação de planejamento
- [x] Definição de arquitetura MVC
- [x] Mapeamento de rotas
- [x] Design system
- [x] Schema do banco de dados

---

### 🚀 Fase 1: Setup e Estrutura Base
**Status:** ✅ **CONCLUÍDA (100% completo)**

#### 1.1 Inicialização do Projeto
- [x] Criar projeto Next.js 14+ com TypeScript
- [x] Configurar ESLint e Prettier
- [x] Configurar Git e .gitignore
- [x] Estruturar pastas MVC
- [x] Configurar variáveis de ambiente

#### 1.2 Configuração de Estilização
- [x] Instalar e configurar Tailwind CSS
- [x] Configurar design tokens (cores, tipografia, espaçamentos)
- [x] Criar arquivo de estilos globais
- [x] Configurar fontes (Inter) - ✅ Concluído (via next/font/google)

#### 1.3 Banco de Dados
- [x] Criar conta no Neon
- [x] Configurar projeto Neon
- [x] Configurar Prisma
- [x] Criar schema do banco de dados
- [x] Configurar Prisma para usar .env.local (dotenv-cli)
- [x] Aplicar migrations (db:push) - ✅ Concluído
- [x] Configurar Prisma Client
- [x] Criar seed de dados iniciais (serviços) - ✅ Concluído (8 serviços criados)

#### 1.4 Configurações Base
- [x] Configurar next.config.jsclea
- [x] Configurar tsconfig.json
- [x] Criar utilitários base (cn, format, etc.)
- [x] Configurar constantes do site

**Progresso:** 100% completo ✅

**Status:** Fase 1 **CONCLUÍDA E REVISADA** ✅
- ✅ Seed executado com sucesso (8 serviços no banco)
- ✅ Fontes Inter configuradas
- ✅ Tudo funcionando perfeitamente
- ✅ Revisão completa realizada - **SEM ERROS**
- ✅ TypeScript: Sem erros
- ✅ ESLint: Sem erros
- ✅ Build: Compila com sucesso
- ✅ 9 componentes UI criados e testados

**Próximo passo:** ✅ **PRONTO PARA FASE 2 (Design System)**

---

### 🎨 Fase 2: Design System e Componentes Base
**Status:** ⏳ Em Progresso (72% completo)

#### 2.1 Componentes UI Base
- [x] Button (todas as variantes) - ✅ Concluído e testado
- [x] Input (todas as variantes) - ✅ Concluído e testado
- [x] Textarea (todas as variantes) - ✅ Concluído e testado
- [x] Select (todas as variantes) - ✅ Concluído e testado
- [x] Card (todas as variantes) - ✅ Concluído e testado
- [x] Badge/Tag (todas as variantes) - ✅ Concluído e testado
- [x] Modal (todas as funcionalidades) - ✅ Concluído e testado
- [x] Loading Spinner (todas as variantes) - ✅ Concluído e testado
- [x] Toast/Notification (todas as variantes) - ✅ Concluído e testado

#### 2.2 Componentes de Layout
- [x] Header (com navegação desktop e mobile) - ✅ Concluído e testado
- [x] Navigation (desktop) - ✅ Integrado no Header
- [x] MobileMenu - ✅ Integrado no Header
- [x] Footer (variantes default e minimal) - ✅ Concluído e testado
- [x] Container (todas as variantes) - ✅ Concluído e testado
- [x] Section (todas as variantes) - ✅ Concluído e testado

#### 2.3 Componentes de Animação
- [x] FadeIn (direções e delay configuráveis) - ✅ Concluído e testado
- [ ] ScrollReveal
- [ ] Parallax (opcional)
- [ ] PageTransition

#### 2.4 Hooks Customizados
- [ ] useScroll
- [ ] useAnimation
- [ ] useForm (com react-hook-form)

---

### 📄 Fase 3: Páginas Principais
**Status:** ⏳ Pendente

#### 3.1 Home Page (`/`)
- [ ] Hero Section (com animação de entrada)
- [ ] Seção de Serviços Preview
- [ ] Seção de Estatísticas (contadores animados)
- [ ] Seção de Projetos em Destaque
- [ ] Seção de Depoimentos Preview
- [ ] CTA Section
- [ ] Integração com APIs

#### 3.2 Página de Serviços (`/servicos`)
- [ ] Hero Section
- [ ] Lista de Serviços (cards expandíveis)
- [ ] Seção de Processo
- [ ] CTA Section
- [ ] Integração com API de serviços

#### 3.3 Página de Portfólio (`/portfolio`)
- [ ] Hero Section
- [ ] Sistema de Filtros
- [ ] Grid de Projetos (responsivo)
- [ ] Paginação ou Infinite Scroll
- [ ] Integração com API de projetos

#### 3.4 Página de Projeto Individual (`/portfolio/[slug]`)
- [ ] Hero com imagem/vídeo
- [ ] Informações do projeto
- [ ] Descrição detalhada
- [ ] Galeria de imagens
- [ ] Navegação (anterior/próximo)
- [ ] Integração com API

#### 3.5 Página Sobre (`/sobre`)
- [ ] Hero Section
- [ ] História/Timeline
- [ ] Equipe
- [ ] Valores
- [ ] Diferenciais
- [ ] CTA Section

#### 3.6 Página Depoimentos (`/depoimentos`)
- [ ] Hero Section
- [ ] Grid de Depoimentos
- [ ] Suporte a vídeos (se houver)
- [ ] Integração com API

#### 3.7 Página Contato (`/contato`)
- [ ] Hero Section
- [ ] Formulário de Contato
- [ ] Informações de Contato
- [ ] Redes Sociais
- [ ] Validação de formulário

#### 3.8 Página Status (`/status`)
- [ ] Hero Section
- [ ] Status da API (cards informativos)
- [ ] Status do Banco de Dados
- [ ] Métricas do Servidor
- [ ] Uptime e histórico
- [ ] Integração com `/api/v1/status`

---

### ⚡ Fase 4: Funcionalidades Dinâmicas
**Status:** ⏳ Pendente

#### 4.1 Animações de Scroll
- [ ] Implementar scroll suave
- [ ] Animações fade in ao scroll
- [ ] Animações slide up
- [ ] Parallax effects (se necessário)
- [ ] Sticky sections

#### 4.2 Interatividade
- [ ] Hover effects em cards
- [ ] Hover effects em botões
- [ ] Efeitos de glow/neon
- [ ] Micro-interações em formulários
- [ ] Transições entre páginas

#### 4.3 Efeitos Especiais
- [ ] Background effects (partículas, gradientes)
- [ ] Text reveal animations
- [ ] Loading states elegantes
- [ ] Cursor customizado (opcional)

#### 4.4 Performance
- [ ] Lazy loading de imagens
- [ ] Code splitting
- [ ] Otimização de bundle
- [ ] Image optimization

---

### 🔧 Fase 5: Backend e Integrações
**Status:** ⏳ Pendente

#### 5.1 API Routes (Versionadas)
- [ ] GET `/api/v1/status` (status do site e API)
- [ ] POST `/api/v1/contact` (formulário de contato)
- [ ] POST `/api/v1/newsletter` (newsletter)
- [ ] GET `/api/v1/projects` (listar projetos)
- [ ] GET `/api/v1/projects/[slug]` (detalhes)
- [ ] GET `/api/v1/testimonials` (depoimentos)
- [ ] GET `/api/v1/services` (serviços)

#### 5.2 Services
- [ ] Contact Service
- [ ] Email Service (Resend ou SendGrid)
- [ ] Project Service
- [ ] Newsletter Service

#### 5.3 Validação
- [ ] Schemas Zod para todas as APIs
- [ ] Validação de formulários
- [ ] Tratamento de erros

#### 5.4 Integrações
- [ ] Configurar serviço de email
- [ ] Testar envio de emails
- [ ] Configurar rate limiting (opcional)

---

### 🔍 Fase 6: SEO e Otimizações
**Status:** ⏳ Pendente

#### 6.1 SEO
- [ ] Meta tags em todas as páginas
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Schema.org markup
- [ ] Sitemap.xml
- [ ] robots.txt

#### 6.2 Performance
- [ ] Lighthouse audit
- [ ] Otimização de imagens
- [ ] Font optimization
- [ ] Bundle analysis
- [ ] Core Web Vitals

#### 6.3 Acessibilidade
- [ ] Testes com screen reader
- [ ] Contraste de cores
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Alt texts

---

### 🚢 Fase 7: Testes e Deploy
**Status:** ⏳ Pendente

#### 7.1 Testes
- [ ] Testes de funcionalidade
- [ ] Testes de responsividade (mobile, tablet, desktop)
- [ ] Testes de navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testes de formulários
- [ ] Testes de APIs

#### 7.2 Deploy
- [ ] Configurar Vercel
- [ ] Configurar variáveis de ambiente
- [ ] Configurar banco de dados em produção
- [ ] Aplicar migrations
- [ ] Configurar domínio
- [ ] SSL/HTTPS

#### 7.3 Monitoramento
- [ ] Configurar analytics (Google Analytics ou similar)
- [ ] Error tracking (Sentry ou similar)
- [ ] Uptime monitoring

#### 7.4 Documentação Final
- [ ] README.md completo
- [ ] Documentação de deploy
- [ ] Guia de manutenção

---

## 👥 Responsabilidades

### ✅ Você Precisa Fazer Manualmente

1. **Configurações de Contas:**
   - [x] Criar conta no Neon
   - [x] Configurar projeto Neon
   - [ ] Configurar serviço de email (Fase 5)
   - [ ] Configurar Vercel (Fase 7)

2. **Configurações Locais:**
   - [x] Node.js 18+ instalado
   - [x] npm instalado
   - [x] Criar `.env.local` com DATABASE_URL

3. **Decisões e Aprovações:**
   - [ ] Revisar e aprovar componentes visuais
   - [ ] Fornecer conteúdo real (textos, imagens)
   - [ ] Aprovar animações e interações

### 🤖 Eu Posso Fazer Automaticamente

- [x] Estrutura completa de pastas MVC
- [x] Arquivos de configuração
- [x] Configuração do Tailwind CSS
- [x] Schema do Prisma
- [x] Componentes React
- [x] Páginas e rotas
- [x] API Routes
- [x] Services e Controllers
- [x] Utilitários e helpers
- [x] Estilos e animações

---

## ⚙️ Configurações

### Variáveis de Ambiente (`.env.local`)

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Next.js
NEXT_PUBLIC_SITE_URL="https://decyphra.com.br"
NEXT_PUBLIC_SITE_NAME="Decyphra"
NEXT_PUBLIC_API_VERSION="v1"

# Email (Futuro - Fase 5)
EMAIL_FROM="noreply@decyphra.com.br"
EMAIL_TO="jhonnatanaguiar@decyphra.com.br"
RESEND_API_KEY=""
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Banco de Dados (lê .env.local automaticamente)
npm run db:migrate   # Aplica migrations
npm run db:push      # Push schema direto
npm run db:seed      # Popula banco com dados iniciais
npm run db:studio    # Abre Prisma Studio
npm run db:generate  # Gera Prisma Client
npm run test:connection # Testa conexão com banco

# Qualidade
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

---

## 📊 Progresso Geral

| Fase | Progresso | Status |
|------|-----------|--------|
| Fase 0: Planejamento | 100% | ✅ Concluída |
| Fase 1: Setup | 100% | ✅ **Concluída e Revisada** |
| Fase 2: Design System | 55% | ⏳ Em Progresso |
| Fase 3: Páginas | 0% | ⏳ Pendente |
| Fase 4: Dinâmicas | 0% | ⏳ Pendente |
| Fase 5: Backend | 0% | ⏳ Pendente |
| Fase 6: SEO | 0% | ⏳ Pendente |
| Fase 7: Deploy | 0% | ⏳ Pendente |

**Progresso Total:** ~20% completo

---

## 📝 Notas Importantes

1. **Código Limpo:** Manter código simples, claro e fácil de entender
2. **Sem Overbuilding:** Evitar complexidade desnecessária
3. **Passo a Passo:** Uma coisa de cada vez
4. **Profissional:** Qualidade sobre velocidade
5. **Documentação:** Este arquivo será atualizado conforme progredimos

---

**Última atualização:** Dezembro 2024  
**Status:** Fase 1 concluída e revisada (100% completo) ✅
