# 🚀 Guia de Deploy - Decyphra Website

Guia completo para fazer deploy do site em produção.

---

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com) (recomendado) ou outra plataforma de hospedagem
- Conta no [Neon](https://neon.tech) para banco de dados PostgreSQL
- Repositório Git (GitHub, GitLab, Bitbucket)
- Domínio configurado (opcional, mas recomendado)

---

## 🎯 Deploy na Vercel (Recomendado)

### 1. Preparação

#### 1.1 Variáveis de Ambiente

Crie um arquivo `.env.local` ou configure as variáveis no painel da Vercel:

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Next.js (Públicas - acessíveis no cliente)
NEXT_PUBLIC_SITE_URL="https://decyphra.com.br"
NEXT_PUBLIC_SITE_NAME="Decyphra"
NEXT_PUBLIC_API_VERSION="v1"

# Google Analytics (Opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Email (Resend - Opcional)
EMAIL_FROM="noreply@decyphra.com.br"
EMAIL_TO="jhonnatanaguiar@decyphra.com.br"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"
RESEND_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxx"
```

**Importante:**
- Variáveis `NEXT_PUBLIC_*` são expostas ao cliente
- `DATABASE_URL` deve ser a string de conexão do Neon para produção
- Configure o domínio no Resend antes de usar envio de emails

### 2. Configuração na Vercel

#### 2.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Conecte seu repositório Git (GitHub/GitLab/Bitbucket)
4. Selecione o repositório `Decyphra-Project`

#### 2.2 Configurar Projeto

**Framework Preset:**
- Framework: **Next.js** (detectado automaticamente)

**Build Settings:**
- Build Command: `npm run build` (padrão)
- Output Directory: `.next` (padrão)
- Install Command: `npm install` (ou `pnpm install` se usar pnpm)

**Root Directory:**
- Deixe vazio (raiz do projeto)

#### 2.3 Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings → Environment Variables** e adicione todas as variáveis listadas na seção 1.1:

1. Clique em "Add New"
2. Digite o nome da variável (ex: `DATABASE_URL`)
3. Cole o valor
4. Selecione os ambientes (Production, Preview, Development)
5. Clique em "Save"

**Variáveis obrigatórias:**
- `DATABASE_URL` (Production)

**Variáveis recomendadas:**
- `NEXT_PUBLIC_SITE_URL` (Production)
- `NEXT_PUBLIC_SITE_NAME` (Production)

**Variáveis opcionais:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (para Google Analytics)
- `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` (para envio de emails)

#### 2.4 Configurar Domínio

1. Vá em **Settings → Domains**
2. Clique em "Add Domain"
3. Digite seu domínio (ex: `decyphra.com.br`)
4. Siga as instruções para configurar DNS:
   - Adicione um registro `CNAME` apontando para `cname.vercel-dns.com`
   - Ou adicione um registro `A` com o IP fornecido
5. Aguarde a verificação (pode levar alguns minutos)

A Vercel configura SSL/HTTPS automaticamente quando o domínio é verificado.

### 3. Primeiro Deploy

1. Após configurar tudo, clique em **Deploy**
2. Aguarde o build completar (pode levar 2-5 minutos)
3. Após o deploy, configure o banco de dados:

#### 3.1 Configurar Banco de Dados

**No Neon:**
1. Acesse [console.neon.tech](https://console.neon.tech)
2. Crie um novo projeto (ou use o existente)
3. Copie a connection string
4. Configure na Vercel como `DATABASE_URL`

**Aplicar Schema:**
Após o primeiro deploy, você pode:
- Usar `prisma db push` localmente apontando para a DATABASE_URL de produção
- Ou criar migrations e aplicá-las

**Popular Dados Iniciais:**
```bash
# Localmente, configure .env.local com DATABASE_URL de produção
DATABASE_URL="postgresql://..."

# Execute o seed
npm run db:seed
```

### 4. Deploys Automáticos

A Vercel faz deploy automático:
- **Production:** A cada push na branch `main` (ou branch padrão configurada)
- **Preview:** A cada push em outras branches ou Pull Requests

---

## 🔄 Atualizações e Migrations

### Aplicar Migrations

**Opção 1: Via CLI da Vercel**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Aplicar migrations em produção
vercel env pull .env.production
# Edite .env.production com DATABASE_URL de produção
npx dotenv-cli -e .env.production -- prisma migrate deploy
```

**Opção 2: Via Script Local**

1. Configure temporariamente `.env.local` com `DATABASE_URL` de produção
2. Execute:
```bash
npm run db:migrate
```

---

## 🌍 Outras Plataformas

### Netlify

1. Conecte o repositório Git
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Adicione variáveis de ambiente
3. Configure domínio e SSL

### Railway

1. Conecte o repositório Git
2. Configure:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Adicione variáveis de ambiente
3. Configure domínio

### Self-hosted (VPS/Docker)

Veja documentação do Next.js para deploy standalone:
- Build: `npm run build`
- Start: `npm start` (usa Node.js server)

---

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Todas as variáveis de ambiente configuradas
- [ ] `DATABASE_URL` aponta para banco de produção
- [ ] Domínio configurado e DNS propagado
- [ ] Schema do banco aplicado (`prisma db push` ou migrations)
- [ ] Dados iniciais populados (seed)
- [ ] Build local funciona (`npm run build`)
- [ ] Testes passando (`npm run test`)
- [ ] Type check passando (`npm run type-check`)
- [ ] Lint sem erros (`npm run lint`)

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

**Solução:** Verifique se todas as dependências estão no `package.json` e o `package-lock.json` / `pnpm-lock.yaml` está atualizado.

### Erro: "Database connection failed"

**Solução:**
- Verifique se `DATABASE_URL` está configurada corretamente
- Verifique se o banco Neon está ativo
- Verifique se o IP está permitido (Neon permite todos por padrão)

### Erro: "Build failed"

**Solução:**
- Veja os logs de build na Vercel
- Teste o build localmente: `npm run build`
- Verifique se não há erros de TypeScript: `npm run type-check`

### Domínio não funciona

**Solução:**
- Aguarde propagação DNS (pode levar até 48h)
- Verifique configuração DNS no seu provedor
- Use ferramenta de verificação DNS (ex: dnschecker.org)

---

## 📊 Monitoramento Pós-Deploy

Após o deploy, monitore:

1. **Vercel Analytics:**
   - Speed Insights (automático)
   - Web Analytics (se configurado)

2. **Google Analytics:**
   - Verifique se eventos estão sendo rastreados
   - Configure goals e conversões

3. **Logs:**
   - Acesse **Deployments → [deployment] → Runtime Logs** na Vercel

4. **Status da API:**
   - Acesse `/status` no site para verificar saúde da API

---

## 🔐 Segurança

- ✅ Nunca commite `.env.local` no Git
- ✅ Use variáveis de ambiente na Vercel
- ✅ Configure rate limiting se necessário
- ✅ Mantenha dependências atualizadas
- ✅ Use HTTPS sempre (automático na Vercel)

---

## 📚 Referências

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Next.js Deploy](https://nextjs.org/docs/deployment)
- [Documentação Neon](https://neon.tech/docs)
- [Documentação Prisma Deploy](https://www.prisma.io/docs/guides/deployment)

---

**Última atualização:** 26/12/2024
