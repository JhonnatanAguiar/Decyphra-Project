# 🚀 Decyphra Website - Reconstrução Completa

Site institucional da **Decyphra** - Agência Digital focada em desenvolvimento web, sistemas e APIs para pequenas e médias empresas.

## 📋 Sobre o Projeto

Este projeto é uma reconstrução completa do site da Decyphra, mantendo a identidade visual atual (cores verde neon, preto e branco) mas elevando a experiência para um nível premium, dinâmico e impressionante.

### 🎯 Objetivos

- ✅ Manter identidade visual (cores, fontes, estrutura básica)
- ✅ Criar experiência dinâmica e interativa
- ✅ Performance otimizada
- ✅ SEO completo
- ✅ Design responsivo
- ✅ Arquitetura escalável (MVC)

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** PostgreSQL (Prisma ORM)
- **Animações:** Framer Motion
- **Hospedagem:** Vercel (otimizado)

## 📁 Estrutura do Projeto

```
decyphra-website/
├── docs/                 # Documentação completa
│   ├── 01-PLANEJAMENTO.md
│   ├── 02-ARQUITETURA-MVC.md
│   ├── 03-ROTAS.md
│   ├── 04-DESIGN-SYSTEM.md
│   ├── 05-BANCO-DADOS.md
│   └── 06-ROADMAP.md
├── src/
│   ├── app/             # Next.js App Router
│   ├── models/           # Models (Prisma + Types)
│   ├── controllers/      # Controllers (Business Logic)
│   ├── views/            # Views (React Components)
│   └── lib/              # Utilities
├── prisma/               # Prisma Schema
├── public/               # Static assets
└── docker/               # Docker config
```

## 📚 Documentação

Toda a documentação está organizada na pasta `docs/`:

### 📋 Documentação Principal
- **[PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)** - **Documento central** com todo o planejamento, checklists e progresso
- **[LINHA-DO-TEMPO.md](./docs/LINHA-DO-TEMPO.md)** - Histórico cronológico de alterações e problemas resolvidos
- **[REVISOES.md](./docs/REVISOES.md)** - Histórico de revisões e verificações do projeto
- **[GUIA-GIT.md](./docs/GUIA-GIT.md)** - Guia completo de versionamento com Git

### 📁 Por Fase/Tópico
- **[Fase 1 - Setup](./docs/fase-1-setup/)** - Documentação específica da Fase 1
- **[Troubleshooting](./docs/troubleshooting/)** - Resolução de problemas

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- pnpm (gerenciador de pacotes - o projeto usa `pnpm-lock.yaml`)
  - Instalar: `npm install -g pnpm`
  - Ou usar `npx pnpm` quando necessário
- Conta no Neon (banco de dados)

**⚠️ IMPORTANTE:** Após adicionar/modificar dependências, sempre execute `npm run sync-lockfile` para sincronizar o `pnpm-lock.yaml`. Isso evita erros de deploy.

### Instalação

```bash
# Clonar repositório
git clone [url-do-repositorio]
cd decyphra-website

# Instalar dependências
# IMPORTANTE: Use pnpm (o projeto usa pnpm-lock.yaml)
# Se não tiver pnpm instalado: npm install -g pnpm
pnpm install

# Ou use npx se não quiser instalar globalmente:
# npx pnpm install

# Configurar variáveis de ambiente
# Crie o arquivo .env.local na raiz e adicione:
# DATABASE_URL="sua-connection-string-do-neon"
# Veja: docs/fase-1-setup/CONFIGURACAO-ENV.md

# Aplicar migrations (lê .env.local automaticamente)
npm run db:push

# Popular banco com dados iniciais
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🎨 Identidade Visual

### Cores

- **Primária:** Verde Neon (`#00FF88`)
- **Fundo:** Preto/Grafite Escuro (`#01080E`, `#000000`)
- **Texto:** Branco (`#E6F0F3`)
- **Secundário:** Cinza (`#999999`)

### Tipografia

- **Fonte:** Inter ou montserrat (ou similar sans-serif moderna)

## 📐 Arquitetura MVC

O projeto segue o paradigma **MVC (Model - View - Controller)**:

- **Models:** Estrutura de dados (Prisma + Zod)
- **Views:** Componentes React (UI)
- **Controllers:** Lógica de negócio (API Routes + Services)

Veja detalhes completos em [PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)

## 🗺️ Rotas Principais

### Frontend
- `/` - Home
- `/servicos` - Serviços
- `/portfolio` - Portfólio
- `/portfolio/[slug]` - Projeto individual
- `/sobre` - Sobre Nós
- `/depoimentos` - Depoimentos
- `/contato` - Contato
- `/status` - Status do site

### API (Versionada)
- `GET /api/v1/status` - Status da API e site
- `POST /api/v1/contact` - Enviar contato
- `POST /api/v1/newsletter` - Newsletter
- `GET /api/v1/projects` - Listar projetos
- `GET /api/v1/testimonials` - Depoimentos
- `GET /api/v1/services` - Serviços

Veja todas as rotas e detalhes em [PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)

## 🗄️ Banco de Dados

- **PostgreSQL via Neon** (serverless, auto-scaling)
- **Prisma ORM** para gerenciamento
- Schema completo e configuração em [PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)

**Neon** oferece:
- ✅ 512MB gratuito
- ✅ Auto-scaling
- ✅ Branching de banco (dev/prod)
- ✅ Backups automáticos

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run sync-lockfile # ⚠️ IMPORTANTE: Sincroniza pnpm-lock.yaml após adicionar dependências

# Banco de Dados
npm run db:migrate        # Migration padrão (desenvolvimento)
npm run db:migrate:dev    # Migration com nome customizado: node scripts/migrate.js dev --name nome_da_migration
npm run db:migrate:deploy # Deploy migration (produção)
npm run db:migrate:reset  # Reset banco e aplica todas migrations (desenvolvimento)
npm run db:push           # Push schema direto (lê .env.local)
npm run db:seed           # Popula banco com dados iniciais
npm run db:seed:admin     # Popula banco com dados de teste do admin
npm run db:studio         # Abre Prisma Studio (lê .env.local)
npm run db:generate       # Gera Prisma Client
npm run test:connection # Testa conexão com banco

# Testes
npm run test         # Executa testes (Vitest)

# Qualidade
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript

# Performance e Análise
npm run lighthouse   # Auditoria Lighthouse (performance, a11y, SEO)
npm run analyze      # Análise de bundle size (webpack-bundle-analyzer)
npm run a11y:test    # Testes de acessibilidade (pa11y)
npm run a11y:axe     # Testes de acessibilidade (axe-core)
```

## 🚢 Deploy

O projeto está configurado e em produção na **Vercel**.

### Deploy Atual

- **URL de Produção:** [decyphra.com.br](https://decyphra.com.br)
- **Plataforma:** Vercel
- **Banco de Dados:** Neon PostgreSQL
- **Monitoramento:** Vercel SpeedInsights + Google Analytics 4

### Documentação Completa

Veja o **[Guia de Deploy](./docs/DEPLOY.md)** para:
- Instruções detalhadas de deploy
- Configuração de variáveis de ambiente
- Configuração de domínio
- Troubleshooting

Veja o **[Guia de E-mails (Resend vs Zoho)](./docs/EMAILS-RESEND-ZOHO.md)** para:
- Diferenças entre e-mails transacionais e corporativos
- Como configurar Resend e Zoho
- Integração completa passo a passo
- Boas práticas

### Variáveis de Ambiente Necessárias

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="https://decyphra.com.br"
NEXT_PUBLIC_SITE_NAME="Decyphra"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..." # Opcional (Google Analytics)
RESEND_API_KEY="re_..." # Opcional (E-mails transacionais)
EMAIL_FROM="noreply@decyphra.com.br" # Opcional (E-mail remetente)
EMAIL_TO="contato@decyphra.com.br" # Opcional (E-mail destinatário)
```

## 📈 Roadmap e Progresso

Veja o roadmap completo com checklists atualizados em [PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)

Para status detalhado do que falta, consulte: [STATUS-FINAL.md](./docs/STATUS-FINAL.md)

**Status Atual:** 
- ✅ Fases 0-6: Concluídas (100%)
- ⏳ Fase 7: Quase concluída (95% completo)
  - ✅ Deploy: 100%
  - ✅ Monitoramento: 100% (SpeedInsights, GA4, Sentry configurados)
  - ✅ Documentação Final: 100%
  - ⏳ Testes Manuais: Pendentes (checklists criados)

**Ver:** [`docs/STATUS-FINAL.md`](./docs/STATUS-FINAL.md) para detalhes do que falta

## 📚 Documentação Adicional

### 🚀 Deploy e Manutenção
- **[DEPLOY.md](./docs/DEPLOY.md)** - Guia completo de deploy na Vercel e outras plataformas
- **[MANUTENCAO.md](./docs/MANUTENCAO.md)** - Guia de manutenção, atualizações e troubleshooting
- **[MONITORAMENTO.md](./docs/MONITORAMENTO.md)** - Guia completo de monitoramento (Speed Insights, GA4, Sentry, Uptime)

### 🧪 Testes
- **[TESTES.md](./docs/TESTES.md)** - Estratégia e guia de testes
- **[TESTES-MANUAIS.md](./docs/TESTES-MANUAIS.md)** - Checklist de testes manuais

### ♿ Acessibilidade
- **[ACESSIBILIDADE.md](./docs/ACESSIBILIDADE.md)** - Guia completo de acessibilidade
- **[A11Y-TESTES.md](./docs/A11Y-TESTES.md)** - Como executar testes de acessibilidade

### ⚡ Performance
- **[PERFORMANCE.md](./docs/PERFORMANCE.md)** - Otimizações e ferramentas de análise
- **[CORE-WEB-VITALS.md](./docs/CORE-WEB-VITALS.md)** - Métricas Core Web Vitals

## 🤝 Contribuindo

Este é um projeto interno da Decyphra. Para sugestões ou melhorias, entre em contato.

## 📄 Licença

Jhonnatan Aguiar - Decyphra © 2025

## 📞 Contato

- **Email:** jhonnatanaguiar@decyphra.com.br
- **Telefone:** +55 (19) 9 9432-3750 / +55 (19) 9 8990-1716
- **Site:** [decyphra.com.br](https://decyphra.com.br)

---

**Desenvolvido com ❤️ pela equipe Decyphra**
