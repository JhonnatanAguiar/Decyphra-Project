# Revisões - Demo Startup Tech (SaaS)

> Use este arquivo para registrar revisões importantes, checagens de qualidade e ajustes estruturais do projeto.

---

## 🔍 Revisão Inicial - Planejamento do Projeto

**Data:** 15/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Decisões

- Necessidade de alinhar estratégia de portfólio (documentos antigos falavam em múltiplos repositórios) com a nova abordagem em **monorepo pnpm**.
- Definição clara de que o **site principal** vive em `apps/site` e que cada demo de portfólio será um app independente em `apps/demo-*`.
- Necessidade de ter planejamento dedicado por projeto para manter o mesmo nível de organização do site principal.

### Ações Realizadas

- Atualização de `PORTFOLIO-ESTRATEGIA.md` e `PORTFOLIO-GUIA-RAPIDO.md` para refletir a abordagem em monorepo.
- Criação dos documentos específicos para o projeto **Demo Startup Tech**:
  - `PLANEJAMENTO-COMPLETO.md`
  - `LINHA-DO-TEMPO.md`
  - `REVISOES.md`
- Definição de Fase 0 (Planejamento) com foco em:
  - Objetivo do projeto
  - Tipo de site (landing + SaaS preview)
  - Stack base e arquitetura de pastas
  - Roadmap de fases (1–7)

### Verificações Realizadas

- ✔ Coerência com `WORKSPACE-MIGRACAO.md` (apps demo em `apps/demo-*`).
- ✔ Coerência com a metodologia do `PLANEJAMENTO-COMPLETO.md` do site principal.
- ✔ Foco em UI/UX e independência visual de cada demo mantido.

---

## 🔍 Revisão Fase 1 - Setup e Estrutura Base

**Data:** 15/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Decisões

- Necessidade de garantir que o novo app demo funcione **isolado** mas integrado ao workspace (pnpm workspaces).
- Garantir que a estrutura inicial do app siga o padrão Next 14 / App Router já adotado no site principal.

### Ações Realizadas

- Criado app `apps/demo-startup-tech` com:
  - `package.json`, `next.config.js`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts`
  - Estrutura base de `app/` (`layout.tsx`, `page.tsx`, `globals.css`, `not-found.tsx`)
  - `README.md` com scripts via `pnpm --filter demo-startup-tech ...`
- Executado `pnpm install` para atualizar o workspace.
- Executado `pnpm --filter demo-startup-tech dev` e validado servidor em `http://localhost:3000`.

### Verificações Realizadas

- ✔ App reconhecido pelo workspace (`pnpm-workspace.yaml` com `apps/*`).
- ✔ Servidor dev funcionando sem erros críticos.
- ✔ Estrutura mínima pronta para receber Design System na Fase 2.

---

## 🔍 Revisão Fase 2 - Design System do Projeto

**Data:** 15/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Decisões

- Necessidade de definir uma identidade visual forte para o demo Startup Tech sem herdar o tema da Decyphra.
- Garantir que o design system seja simples o suficiente para não complexificar o projeto, mas consistente para ser reutilizado nas próximas fases (seções, animações).

### Ações Realizadas

- Definição de paleta de cores própria no `tailwind.config.ts` (namespace `brand`).
- Definição de tipografia com `Inter` (texto) e `Space Grotesk` (display) via `next/font/google`.
- Atualização de `app/globals.css` com estilos globais e utilitários (`ds-heading-display`, `ds-pill`).
- Criação de componentes base em `src/components/ui/`:
  - `Button.tsx` (variantes e tamanhos)
  - `Card.tsx` (card SaaS com glow e borda customizados)
- Aplicação inicial do design system na `app/page.tsx` para validar aparência e composição.

### Verificações Realizadas

- ✔ Identidade visual distinta do site principal da Decyphra.
- ✔ Componentes base reutilizáveis e simples (sem abstrações excessivas).
- ✔ Página inicial renderizando corretamente com o novo design system.

---

## 🔍 Revisão Fase 3 - Estrutura de Páginas

**Data:** 15/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Decisões

- Necessidade de transformar o preview do design system em uma landing page completa, sem ainda adicionar backend ou animações complexas.
- Garantir que a página tivesse uma narrativa SaaS padrão (Hero → Features → Prova social → Pricing → CTA) usando apenas os componentes e tokens já criados.

### Ações Realizadas

- Criação de `Header` e `Footer` próprios do demo em `src/components/layout/`.
- Criação das seções principais em `src/components/sections/`:
  - `Hero`, `Features`, `SocialProof`, `Pricing`, `CallToAction`.
- Atualização da `app/page.tsx` para compor a página com essas seções, mantendo a identidade visual definida na Fase 2.
- Validação de que a página 404 customizada (`app/not-found.tsx`) está presente e coerente com o projeto.

### Verificações Realizadas

- ✔ Estrutura da landing completa e organizada em seções reutilizáveis.
- ✔ Layout consistente com o design system (cores, tipografia, componentes).
- ✔ Pronta para receber animações e interatividade na Fase 4 sem refatorações grandes.

---

## 🔍 Revisão Fase 4 - Animações e Interatividade

**Data:** 15/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Decisões

- Necessidade de trazer vida à landing sem torná-la pesada ou excessivamente complexa.
- Decisão de usar Framer Motion para manter consistência com a stack de frontend moderna e facilitar animações declarativas.

### Ações Realizadas

- Adicionada a dependência `framer-motion` ao projeto `demo-startup-tech`.
- Atualização dos componentes de UI:
  - `Button` passou a usar `motion.button` com microinterações de hover/tap.
  - `Card` passou a usar `motion.article` com leve elevação ao hover.
- Atualização das seções:
  - `Hero`: background animado sutil + entrada animada de título, texto e CTAs.
  - `Features`, `SocialProof`, `Pricing`, `CallToAction`: animações de entrada ao entrar no viewport, com pequenos delays em grids/listas.
- Ajuste de usabilidade:
  - Habilitado `scroll-smooth` no `html` para transições suaves entre anchors do header.

### Verificações Realizadas

- ✔ Build (`pnpm --filter demo-startup-tech build`) executando sem erros.
- ✔ ESLint e TypeScript sem apontar problemas nos arquivos alterados.
- ✔ Animações suaves, sem "travadas" perceptíveis e mantendo boa legibilidade.

---

## 🔍 Revisão Completa - Refinamentos UI e Limpeza de Código

**Data:** 20/01/2026  
**Status:** ✅ Concluído

### Problemas Encontrados e Corrigidos

1. **Brilho do botão primary sempre visível**  
   - Ajuste: brilho central (gradiente radial) exibido apenas no hover, via pseudo-elemento `::before` com `opacity-0` → `hover:opacity-100` e transição de 200ms; estado normal com gradiente mais neutro.

2. **Componentes e dependências não utilizados**  
   - Removidos: `FluidGlass.tsx`, `FluidGlassBackground.tsx`, `GlassSurface.tsx` (abandonados em iterações anteriores).  
   - Removidas deps: `@react-three/drei`, `@react-three/fiber`, `maath`, `three`, `@types/three`, `class-variance-authority`.

3. **Duplicação da função `cn`**  
   - `Button` e `Card` definiam `cn` local; passaram a importar `cn` de `@/lib/utils`, eliminando duplicata e aproveitando `twMerge`+`clsx`.

### Verificações Realizadas

- ✔ Build (`pnpm --filter demo-startup-tech build`) concluído com sucesso.
- ✔ TypeScript e validação de tipos OK no build.
- ✔ Nenhum `console.log` em `src/`.
- ✔ Documentações (`LINHA-DO-TEMPO.md`, `PLANEJAMENTO-COMPLETO.md`, `REVISOES.md`) atualizadas.
