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

---

#### 15/01/2026 - Conclusão da Fase 2 (Design System do Projeto)

**Contexto:**  
Aplicar identidade visual própria ao demo Startup Tech e criar componentes base reutilizáveis.

**Mudança:**  
- Configurado `tailwind.config.ts` com paleta `brand` específica (primary, secondary, accent, dark, etc.) e famílias tipográficas (`sans`, `display`).
- Atualizado `app/layout.tsx` para usar `Inter` e `Space Grotesk` via `next/font/google`, expondo as variáveis `--font-sans` e `--font-display`.
- Atualizado `app/globals.css` com:
  - Estilos globais baseados na nova identidade visual
  - Helpers como `.ds-heading-display` e `.ds-pill`.
- Criados componentes base em `src/components/ui/`:
  - `Button.tsx` com variantes (`primary`, `secondary`, `ghost`) e tamanhos (`sm`, `md`, `lg`)
  - `Card.tsx` com visual de card SaaS moderno (gradiente sutil, glow leve, borda customizada).
- Atualizada `app/page.tsx` para usar `Card` e `Button` de forma simples, apenas como “preview” do design system.

**Resultado:**  
Design system inicial concluído e aplicado na home, pronto para ser usado na construção das seções da landing nas próximas fases.

**Status:** ✅ Resolvido

---

#### 15/01/2026 - Conclusão da Fase 3 (Estrutura de Páginas)

**Contexto:**  
Com o design system base pronto, era necessário estruturar a landing page em seções claras, mantendo foco em UI/UX e na narrativa SaaS.

**Mudança:**  
- Criados componentes de layout: `Header` e `Footer` dedicados ao demo.  
- Criadas seções principais em `src/components/sections/`:  
  - `Hero` (destaque principal com CTA)  
  - `Features` (benefícios do produto)  
  - `SocialProof` (logos fictícios para prova social)  
  - `Pricing` (tabela de planos fictícia)  
  - `CallToAction` (CTA final).  
- Atualizada a `app/page.tsx` para orquestrar todas as seções e o layout.  
- Confirmada a existência de página 404 customizada via `app/not-found.tsx`.

**Resultado:**  
Landing page com estrutura completa de seções, já utilizando o design system do projeto e pronta para receber animações e interações na Fase 4.

**Status:** ✅ Resolvido

---

#### 15/01/2026 - Conclusão da Fase 4 (Animações e Interatividade)

**Contexto:**  
Com a estrutura da landing pronta, o próximo passo foi deixá-la mais viva e dinâmica, mantendo foco em UI/UX e na narrativa SaaS.

**Mudança:**  
- Adicionada a dependência `framer-motion` ao app `demo-startup-tech`.  
- Implementadas animações de entrada nas seções principais (`Hero`, `Features`, `SocialProof`, `Pricing`, `CallToAction`) usando Framer Motion.  
- Adicionadas microinterações em botões (`Button` como `motion.button`) e cards (`Card` como `motion.article`).  
- Criado background animado sutil na seção `Hero`, com glow em movimento.  
- Habilitado scroll suave via Tailwind (`scroll-smooth` no `html`).

**Resultado:**  
Landing page com movimento agradável, seções que entram de forma suave ao rolar, elementos interativos e sensação de produto SaaS vivo, sem comprometer simplicidade ou performance.

**Status:** ✅ Resolvido

