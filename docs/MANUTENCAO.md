# 🔧 Guia de Manutenção - Decyphra Website

Guia completo para manutenção e atualizações do site.

---

## 📋 Índice

1. [Atualizações de Dependências](#atualizações-de-dependências)
2. [Manutenção do Banco de Dados](#manutenção-do-banco-de-dados)
3. [Atualização de Conteúdo](#atualização-de-conteúdo)
4. [Monitoramento e Logs](#monitoramento-e-logs)
5. [Backup](#backup)
6. [Troubleshooting Comum](#troubleshooting-comum)
7. [Boas Práticas](#boas-práticas)

---

## 📦 Atualizações de Dependências

### Verificar Dependências Desatualizadas

```bash
# Verificar pacotes desatualizados
npm outdated

# Atualizar package.json com versões mais recentes (cuidado!)
npm-check-updates -u
```

### Atualizar Dependências

**Atualização Segura (Recomendada):**

```bash
# Atualizar uma dependência específica
npm install package-name@latest

# Atualizar todas as dependências minor/patch (seguro)
npm update

# Verificar após atualização
npm run type-check
npm run lint
npm run test
npm run build
```

**Atualização Completa (Cuidado):**

```bash
# 1. Fazer backup primeiro
git commit -am "backup antes de atualizar dependências"

# 2. Atualizar
npm install

# 3. Testar tudo
npm run type-check
npm run lint
npm run test
npm run build

# 4. Se tudo OK, commitar
git add package.json package-lock.json pnpm-lock.yaml
git commit -m "chore: atualiza dependências"
```

### Atualizar Next.js

```bash
npm install next@latest react@latest react-dom@latest
npm run build
```

### Atualizar Prisma

```bash
npm install prisma@latest @prisma/client@latest
npx prisma generate
```

---

## 🗄️ Manutenção do Banco de Dados

### Aplicar Migrations

```bash
# Gerar nova migration
npm run db:migrate

# Aplicar migrations pendentes em produção
# (após configurar DATABASE_URL de produção)
npx dotenv-cli -e .env.production -- prisma migrate deploy
```

### Reset do Banco (Cuidado - Apaga dados!)

```bash
# Reset completo (apaga tudo)
npx dotenv-cli -e .env.local -- prisma migrate reset

# Recriar schema sem apagar dados
npm run db:push
```

### Backup do Banco

**Via Neon Dashboard:**
1. Acesse [console.neon.tech](https://console.neon.tech)
2. Vá em **Backups**
3. Faça backup manual ou configure backups automáticos

**Via SQL Dump:**
```bash
# Exportar dados
pg_dump $DATABASE_URL > backup.sql

# Importar dados
psql $DATABASE_URL < backup.sql
```

### Prisma Studio (Visualizar/Editar Dados)

```bash
# Abrir Prisma Studio localmente
npm run db:studio

# Ou apontando para produção (cuidado!)
DATABASE_URL="postgresql://..." npx prisma studio
```

---

## 📝 Atualização de Conteúdo

### Páginas e Textos

- **Arquivos:** `app/(routes)/**/page.tsx` e `*PageClient.tsx`
- **Textos centralizados:** `src/lib/constants/copy.ts` (se existir)
- **Metadata:** `src/lib/constants/metadata.ts`

### Imagens

- **Pasta:** `public/`
- **Otimização:** Use Next.js Image component (`next/image`)
- **Formatos:** Preferir WebP/AVIF

### Serviços

- **Via API:** `GET /api/v1/services` (banco de dados)
- **Via Prisma Studio:** Editar tabela `Service`
- **Via Seed:** Atualizar `prisma/seed.ts` e rodar `npm run db:seed`

### Projetos

- **Via API:** `GET /api/v1/projects` (banco de dados)
- **Via Prisma Studio:** Editar tabela `Project`
- **Via Seed:** Atualizar `prisma/seed.ts`

### Depoimentos

- **Via API:** `GET /api/v1/testimonials` (banco de dados)
- **Via Prisma Studio:** Editar tabela `Testimonial`
- **Via Seed:** Atualizar `prisma/seed.ts`

---

## 📊 Monitoramento e Logs

### Vercel Logs

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto
3. Vá em **Deployments → [deployment] → Runtime Logs**

### Google Analytics

- Acesse [analytics.google.com](https://analytics.google.com)
- Verifique eventos, conversões, tráfego

### Status da API

- Acesse `/status` no site
- Verifica:
  - Status da API
  - Conexão com banco
  - Métricas do servidor

### Performance

```bash
# Auditoria Lighthouse local
npm run lighthouse

# Verificar bundle size
npm run analyze
```

---

## 💾 Backup

### Backup Completo do Projeto

```bash
# Fazer commit de todas as mudanças
git add .
git commit -m "backup antes de manutenção"

# Push para repositório remoto
git push origin main
```

### Backup do Banco de Dados

**Automático (Neon):**
- Neon faz backups automáticos
- Acesse via dashboard

**Manual:**
```bash
# Exportar schema
npx prisma db pull

# Exportar dados (via pg_dump)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## 🐛 Troubleshooting Comum

### Site não carrega

1. Verificar logs na Vercel
2. Verificar se build foi bem-sucedido
3. Verificar variáveis de ambiente
4. Verificar status do banco de dados

### Erro 500 (Internal Server Error)

1. Verificar logs na Vercel
2. Verificar `DATABASE_URL`
3. Verificar se Prisma Client está gerado
4. Verificar erros no console do browser

### Imagens não aparecem

1. Verificar se arquivos estão em `public/`
2. Verificar paths (usar `/` no início)
3. Verificar configuração do `next.config.js` para domínios externos

### Formulário não envia

1. Verificar `RESEND_API_KEY` (se configurado)
2. Verificar logs da API `/api/v1/contact`
3. Verificar conexão com banco

### Build falha na Vercel

1. Testar build local: `npm run build`
2. Verificar erros de TypeScript: `npm run type-check`
3. Verificar dependências no `package.json`
4. Verificar se `pnpm-lock.yaml` está atualizado

---

## ✅ Boas Práticas

### Antes de Fazer Mudanças

1. ✅ Fazer backup (commit no Git)
2. ✅ Testar localmente
3. ✅ Verificar lint e type-check
4. ✅ Testar build

### Git Workflow

```bash
# Criar branch para feature/correção
git checkout -b feature/nome-da-feature

# Fazer mudanças e commitar
git add .
git commit -m "feat: descrição da mudança"

# Push e criar Pull Request
git push origin feature/nome-da-feature
```

### Code Quality

```bash
# Antes de commitar, sempre:
npm run lint          # Verificar código
npm run type-check    # Verificar tipos
npm run test          # Rodar testes
npm run build         # Testar build
```

### Deploy Seguro

1. ✅ Testar localmente primeiro
2. ✅ Fazer deploy em preview/staging
3. ✅ Testar em preview
4. ✅ Fazer merge para main (deploy automático)
5. ✅ Monitorar logs após deploy

---

## 📅 Tarefas Periódicas

### Semanal

- [ ] Verificar logs de erro na Vercel
- [ ] Verificar Google Analytics
- [ ] Verificar status da API (`/status`)

### Mensal

- [ ] Verificar dependências desatualizadas
- [ ] Fazer backup do banco
- [ ] Revisar e atualizar conteúdo se necessário
- [ ] Verificar performance (Lighthouse)

### Trimestral

- [ ] Atualizar dependências principais (Next.js, React, etc.)
- [ ] Revisar e otimizar performance
- [ ] Auditoria de segurança
- [ ] Revisar documentação

---

## 🔗 Links Úteis

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Neon Dashboard:** [console.neon.tech](https://console.neon.tech)
- **Google Analytics:** [analytics.google.com](https://analytics.google.com)
- **Prisma Docs:** [prisma.io/docs](https://www.prisma.io/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

## 📞 Suporte

Em caso de problemas:

1. Verificar este guia
2. Verificar logs
3. Verificar documentação do projeto (`docs/`)
4. Consultar documentação oficial (Next.js, Prisma, Vercel)

---

**Última atualização:** 26/12/2024
