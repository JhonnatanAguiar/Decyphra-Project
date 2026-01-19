# Planejamento Completo - Demo Startup Tech (SaaS) - Portfólio Decyphra

> **Projeto:** Demo Startup Tech / SaaS  
> **Local no monorepo:** `apps/demo-startup-tech`  
> **Objetivo:** Criar uma landing page + experiência SaaS altamente impactante, usada como vitrine da Decyphra.

---

## 🎯 Objetivo e Visão Geral

Criar um site demo de uma **startup tecnológica / produto SaaS**, com foco máximo em **UI/UX**, transições suaves, animações, storytelling e percepção de produto premium.

- O projeto deve:
  - Impressionar visualmente (motion, microinterações, background criativo).
  - Contar uma história clara sobre o produto (dor → solução → prova social → CTA).
  - Ser **independente** visual e estruturalmente do site da Decyphra.
  - Seguir a **metodologia Decyphra** (fases, organização, qualidade de código), mas com backend apenas o mínimo necessário.

---

## 🧱 Tipo de Projeto

- **Tipo:** Landing Page + “SaaS preview” (sections que simulam o produto)
- **Arquitetura:** App Next.js 14+ (App Router) em `apps/demo-startup-tech`
- **Foco:** Frontend, animações, organização de componentes e seções
- **Backend mínimo:** 
  - Formulário de contato ou “request access” (pode usar API simples ou mock)
  - Sem CRM real, sem banco complexo – apenas o suficiente para a experiência.

---

## 🎨 Diretrizes de Identidade (Fase 0 - Conceito)

> Detalhes (paleta final, fontes, etc.) serão decididos na Fase 1/2; aqui apenas o **conceito**.

- **Paleta (conceito):**
  - Tons de azul/violeta futurista
  - Gradientes sutis (tech moderno)
  - Toques de neon (não necessariamente verde)

- **Tipografia (conceito):**
  - Fonte display moderna para títulos (ex: Poppins, Space Grotesk, etc.)
  - Fonte limpa e legível para corpo (ex: Inter, DM Sans, etc.)

- **Estilo visual:**
  - Elementos 3D leves (cards, botões, tilts), mas com equilíbrio.
  - Background animado ou interativo na hero (pode reaproveitar ideias do site, mas com identidade própria).
  - Ícones e ilustrações coerentes com SaaS.

---

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14+ (App Router), em `apps/demo-startup-tech`
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion (e eventualmente GSAP, se necessário)
- **Formulários:** React Hook Form + Zod (opcional, se houver formulário)
- **Infra workspace:** Pode usar `@decyphra/tokens` e `@decyphra/utils` se fizer sentido, sem poluir a identidade visual.

---

## 🏗️ Arquitetura do App (Proposta)

```text
apps/demo-startup-tech/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/            # Componentes UI específicos deste projeto
│   │   └── sections/      # Seções da landing (Hero, Features, Pricing, etc.)
│   ├── lib/
│   │   └── constants/     # Textos, links, dados mockados
│   └── styles/            # Tema, tokens específicos do projeto (se necessário)
├── public/
│   ├── logo.svg
│   └── images/
└── README.md
```

---

## 🚀 Roadmap por Fases (Demo Startup Tech)

### ✅ Fase 0: Planejamento (esta fase)

- [x] Definir objetivo do projeto (SaaS demo, foco em UI/UX)
- [x] Definir tipo de site (landing page + preview)
- [x] Alinhar com estratégia de portfólio em monorepo (`PORTFOLIO-ESTRATEGIA.md`)
- [x] Criar documentos do projeto:
  - [x] `PLANEJAMENTO-COMPLETO.md` (este arquivo)
  - [x] `LINHA-DO-TEMPO.md`
  - [x] `REVISOES.md`
- [x] Definir estrutura geral do app em `apps/demo-startup-tech` (conceitualmente)

### ✅ Fase 1: Setup e Estrutura Base

- [x] Criar pasta `apps/demo-startup-tech`
- [x] Inicializar Next.js 14+ com TypeScript e Tailwind
- [x] Configurar `tsconfig`, `eslint`, `prettier` (seguindo metodologia Decyphra, simplificada)
- [x] Garantir que `pnpm --filter demo-startup-tech dev` funcione
- [x] Documentar scripts no `README.md` do projeto

### ✅ Fase 2: Design System do Projeto

- [x] Definir paleta de cores final (para este projeto)
- [x] Definir tipografia (títulos + corpo)
- [x] Configurar Tailwind com tema do projeto (`tailwind.config.ts`)
- [x] Criar componentes base:
  - [x] `Button`
  - [x] `Card`
  - [ ] Tipografia utilitária adicional (títulos, parágrafos) – opcional nas próximas iterações
- [x] Garantir consistência visual com o conceito da Fase 0

### ✅ Fase 3: Estrutura de Páginas

- [x] `Header` e `Footer` próprios
- [x] Seções principais:
  - [x] Hero (com destaque forte e CTA)
  - [x] Features / Benefits
  - [x] Social proof (logos / depoimentos fictícios)
  - [x] Pricing / Planos (mesmo que mock)
  - [x] CTA final
- [x] Página 404 customizada (opcional, mas desejável)

### ✅ Fase 4: Animações e Interatividade

- [x] Animações de entrada das seções (Framer Motion)
- [x] Microinterações em botões e cards
- [x] Background animado ou interativo na hero
- [x] Scroll suave / pequenas transições entre seções

### ✅ Fase 5: Funcionalidades Mínimas

- [x] Formulário de “Request access” ou “Join waitlist”
  - [x] Validação básica (nome, email) — Zod no cliente e na API
  - [x] Feedback visual (sucesso/erro) — RequestAccessForm com estados e mensagens
  - [x] Backend simples: mock, log ou integrações mínimas (sem CRM) — POST /api/request-access

### ✅ Fase 6: Performance, SEO e Acessibilidade

- [x] Ajustar performance (Lighthouse) — viewport, themeColor, font display: swap; recomenda-se rodar Lighthouse em produção
- [x] SEO básico (metadata, Open Graph, etc.) — title, description, keywords, openGraph, twitter, robots, metadataBase
- [x] Verificar contrastes, foco, navegação por teclado — skip link "Ir ao conteúdo", focus-visible em links e botões, main#main, BackToTop por scroll (acessível por teclado), labels no formulário

### ✅ Fase 7: Deploy e Integração com o Site da Decyphra

- [x] Configurar projeto na Vercel (rootDirectory `apps/demo-startup-tech`) — `vercel.json` no app; guia em `docs/portfolio/projects/startup-tech/DEPLOY.md`
- [x] Configurar subdomínio (`startup-tech.decyphra.com.br`) — passos documentados em `DEPLOY.md` (CNAME, Domains na Vercel)
- [x] Criar estudo de caso no site principal (`/portfolio/...`) — `apps/site`: rota `/portfolio/[slug]`, `CaseStudyClient`, conteúdo estático para `startup-tecnologica`; card no Portfolio atualizado; sitemap; `NEXT_PUBLIC_DEMO_STARTUP_TECH_URL`

---

## 👥 Responsabilidades

- **Este documento**: manter atualizado conforme avançamos nas fases.
- **Linha do tempo**: registrar marcos em `LINHA-DO-TEMPO.md` deste projeto.
- **Revisões**: após cada bloco importante (setup, design system, páginas, etc.), registrar em `REVISOES.md`.

---

## 📌 Status Atual

- **Projeto:** Demo Startup Tech (SaaS)
- **Fase:** 7 - Deploy e Integração com o Site da Decyphra (**Concluída**)
- **Entregas Fase 7:** `vercel.json` e `DEPLOY.md` para Vercel e subdomínio; estudo de caso em `/portfolio/startup-tecnologica` (página dinâmica `[slug]`, `CaseStudyClient`, conteúdo estático); card e sitemap no site.
- **Próximo passo:** Publicar na Vercel e configurar DNS conforme `DEPLOY.md`; opcional: cadastrar projeto no DB para outros slugs.

