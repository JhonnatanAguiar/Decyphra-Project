# Linha do Tempo - Demo Startup Tech (SaaS)

> Registre aqui, em ordem cronológica, os principais eventos, decisões e ajustes relacionados a este projeto de portfólio.

---

#### 15/01/2026 - Definição da Estratégia e Início do Projeto

**Contexto:**  
Migração do workspace para monorepo concluída (Fase 5 do `WORKSPACE-MIGRACAO.md`). Início da fase de portfólio seguindo a Opção A (separação total) adaptada ao monorepo.

**Mudança:**  
Definição do primeiro projeto demo de portfólio: **Demo Startup Tech (SaaS)**.  
Criados os documentos dedicados ao projeto:
- `docs/portfolio/projects/startup-tech/PLANEJAMENTO-COMPLETO.md`  
- `docs/portfolio/projects/startup-tech/LINHA-DO-TEMPO.md`  
- `docs/portfolio/projects/startup-tech/REVISOES.md`

**Resultado:**  
Fase 0 (Planejamento) definida e documentada. Projeto pronto para iniciar a Fase 1 (Setup e Estrutura Base) em `apps/demo-startup-tech`.

**Status:** ✅ Resolvido

---

#### 15/01/2026 - Conclusão da Fase 1 (Setup e Estrutura Base)

**Contexto:**  
Início da implementação do projeto demo dentro do monorepo, criando um app independente em `apps/demo-startup-tech`.

**Mudança:**  
- Criado app `apps/demo-startup-tech` com:
  - `package.json`, `next.config.js`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts`
  - Estrutura base de App Router (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/not-found.tsx`)
  - `README.md` com scripts via `pnpm --filter demo-startup-tech ...`
- Rodado `pnpm install` (workspace atualizado) e `pnpm --filter demo-startup-tech dev` com sucesso (servidor local em `http://localhost:3000`).

**Resultado:**  
Fase 1 concluída: app mínimo funcional rodando dentro do monorepo, pronto para receber o Design System próprio na Fase 2.

**Status:** ✅ Resolvido

