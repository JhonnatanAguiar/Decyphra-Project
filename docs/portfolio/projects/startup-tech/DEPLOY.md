# Deploy - Demo Startup Tech

> Passos para publicar o projeto na Vercel e configurar o subdomínio.

---

## 1. Projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. **Add New** → **Project**; importe o repositório do monorepo.
3. Em **Configure Project**:
   - **Root Directory:** `apps/demo-startup-tech`  
     (clique em **Edit**, digite `apps/demo-startup-tech`, confirme)
   - **Framework Preset:** Next.js (detectado)
   - **Build Command:** `pnpm --filter demo-startup-tech build` (ou use o `vercel.json` do app)
   - **Install Command:** `pnpm install`

4. **Environment Variables:**
   - `NEXT_PUBLIC_SITE_URL` = `https://startup-tech.decyphra.com.br`  
     (ou a URL de preview da Vercel até o domínio customizado estar ativo)

5. **Deploy.**

---

## 2. Subdomínio `startup-tech.decyphra.com.br`

1. No projeto na Vercel: **Settings** → **Domains**.
2. **Add** → `startup-tech.decyphra.com.br`.
3. Na sua zona DNS (onde `decyphra.com.br` está):
   - Crie um **CNAME**:
     - **Nome/host:** `startup-tech` (ou `startup-tech.decyphra` conforme o provedor)
     - **Destino/valor:** `cname.vercel-dns.com`  
       (ou o que a Vercel indicar em **Domains**)
   - Aguarde a propagação (minutos a algumas horas).

4. Na Vercel, verifique se o domínio aparece como **Valid**.
5. Atualize `NEXT_PUBLIC_SITE_URL` (se ainda estiver com a URL da Vercel) para `https://startup-tech.decyphra.com.br` e faça um novo deploy se necessário.

---

## 3. Site principal (Decyphra) – URL da demo

Para o estudo de caso em `/portfolio/startup-tecnologica` apontar para a demo:

- No projeto **site** da Vercel (ou no `.env` do `apps/site`), defina:
  - `NEXT_PUBLIC_DEMO_STARTUP_TECH_URL` = `https://startup-tech.decyphra.com.br`
- Se a variável não existir, o estudo de caso usa o fallback `https://startup-tech.decyphra.com.br`.

---

## 4. Monorepo: raiz e `vercel.json`

- O `vercel.json` em `apps/demo-startup-tech` define `buildCommand` e `installCommand` para o deploy a partir da pasta do app.
- Com **Root Directory** = `apps/demo-startup-tech`, a Vercel usa esse `vercel.json`; o `pnpm install` é executado a partir da raiz do repositório (comportamento típico em monorepos com pnpm).

---

## 5. Checklist

- [ ] Projeto Vercel criado com Root Directory `apps/demo-startup-tech`
- [ ] Variável `NEXT_PUBLIC_SITE_URL` configurada
- [ ] Domínio `startup-tech.decyphra.com.br` adicionado na Vercel
- [ ] CNAME `startup-tech` → `cname.vercel-dns.com` na DNS
- [ ] Domínio **Valid** na Vercel
- [ ] `NEXT_PUBLIC_DEMO_STARTUP_TECH_URL` no projeto **site** (opcional; fallback já definido)
