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
- **[GUIA-GIT.md](./docs/GUIA-GIT.md)** - Guia completo de versionamento com Git

### 📁 Por Fase/Tópico
- **[Fase 1 - Setup](./docs/fase-1-setup/)** - Documentação específica da Fase 1
- **[Troubleshooting](./docs/troubleshooting/)** - Resolução de problemas

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Neon (banco de dados)

### Instalação

```bash
# Clonar repositório
git clone [url-do-repositorio]
cd decyphra-website

# Instalar dependências
npm install

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

# Banco de Dados
npm run db:migrate   # Aplica migrations (lê .env.local)
npm run db:push      # Push schema direto (lê .env.local)
npm run db:seed      # Popula banco com dados iniciais
npm run db:studio    # Abre Prisma Studio (lê .env.local)
npm run db:generate  # Gera Prisma Client
npm run test:connection # Testa conexão com banco

# Qualidade
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Deploy automático

### Outras Plataformas

O projeto está preparado para migração fácil. Veja documentação de deploy em cada plataforma.

## 📈 Roadmap e Progresso

Veja o roadmap completo com checklists atualizados em [PLANEJAMENTO-COMPLETO.md](./docs/PLANEJAMENTO-COMPLETO.md)

**Status Atual:** Fase 1 em progresso (85% completo)

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
