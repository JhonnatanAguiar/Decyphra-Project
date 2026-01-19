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

---

#### 20/01/2026 - Refinamentos de UI: brilho no hover do botão e limpeza de código

**Contexto:**  
Após a Fase 4, aprimorar microinterações (brilho central do botão primary apenas no hover) e eliminar código e dependências não utilizados.

**Mudança:**  
- **Button (primary):** brilho central (gradiente radial no topo) exibido somente no hover, via `::before` com `opacity-0` → `hover:opacity-100` e transição de 200ms; estado normal com gradiente mais neutro.
- **Limpeza:** removidos componentes não utilizados: `FluidGlass.tsx`, `FluidGlassBackground.tsx`, `GlassSurface.tsx`.
- **Dependências removidas:** `@react-three/drei`, `@react-three/fiber`, `maath`, `three`, `@types/three`, `class-variance-authority`.
- **Duplicatas:** `Button` e `Card` passaram a usar `cn` de `@/lib/utils` em vez de funções locais.

**Resultado:**  
Botão com feedback visual mais refinado no hover; projeto mais enxuto, sem código morto ou deps 3D desnecessárias; `cn` centralizado.

**Status:** ✅ Resolvido

---

#### 20/01/2026 - Revisão completa do projeto

**Contexto:**  
Revisão geral em busca de erros, bugs, duplicatas e código não usado antes do commit de todas as alterações.

**Mudança:**  
- Revisão documentada em `REVISOES.md` (Revisão Completa - Refinamentos UI e Limpeza).
- Verificações: build (`pnpm --filter demo-startup-tech build`) e type-check no build OK; sem `console.log` em `src`; documentações atualizadas.

**Resultado:**  
Projeto revisado, documentado e pronto para commit.

**Status:** ✅ Resolvido

---

#### 20/01/2026 - Conclusão da Fase 5 (Funcionalidades Mínimas)

**Contexto:**  
Implementar formulário "Request access" / "Solicitar acesso" com validação e backend mínimo, conforme roadmap do projeto.

**Mudança:**  
- **API:** `POST /api/request-access` em `app/api/request-access/route.ts`; validação com Zod (`requestAccessSchema`: nome 2–120 chars, e-mail); resposta 200 { ok } ou 400 { error }; em dev, log no servidor (mock, sem CRM).
- **Schema compartilhado:** `src/lib/request-access-schema.ts` com `requestAccessSchema` e tipo `RequestAccessInput`.
- **RequestAccessForm:** componente em `src/components/ui/RequestAccessForm.tsx`; campos nome e e-mail; validação no cliente com Zod; estados idle/loading/success/error; feedback de sucesso (mensagem + "Enviar outra") e de erro; layout responsivo (empilhado no mobile, inline no desktop).
- **CallToAction:** copy alterada para "Solicite acesso à plataforma" e "Acesso antecipado"; botões substituídos pelo `RequestAccessForm`.
- **Dependência:** `zod` adicionada ao `demo-startup-tech`.

**Resultado:**  
Fase 5 concluída: formulário funcional na CTA, validação cliente e servidor, feedback visual. Backend pronto para futura integração (Resend, webhook, CRM).

**Status:** ✅ Resolvido

---

#### 20/01/2026 - Conclusão da Fase 6 (Performance, SEO e Acessibilidade)

**Contexto:**  
Implementar itens da Fase 6 do roadmap: performance, SEO e acessibilidade.

**Mudança:**  
- **SEO:** metadata expandida (title template, description, keywords, authors, creator, openGraph, twitter, robots, metadataBase); viewport (width, initialScale, themeColor #020617).  
- **Acessibilidade:** link "Ir ao conteúdo" (skip link) fixo no topo, visível ao focar; `main#main`; `aria-label="Navegação principal"` no nav; `focus-visible:ring` em links do Header e no CTA; BackToTopFloating alterado de "mouse near" para exibição por scroll (>400px), com `tabIndex` e `focus-visible`, acessível por teclado; labels `sr-only` no RequestAccessForm; Header CTA ajustado para "Solicitar acesso".  
- **Performance:** viewport e themeColor; fontes já com `display: 'swap'`.

**Resultado:**  
Fase 6 concluída. Recomenda-se rodar Lighthouse em produção para checagem adicional.

**Status:** ✅ Resolvido

---

#### 20/01/2026 - Conclusão da Fase 7 (Deploy e Integração com o Site da Decyphra)

**Contexto:**  
Implementar itens da Fase 7: preparar deploy na Vercel, documentar subdomínio e criar estudo de caso no site principal.

**Mudança:**  
- **Vercel:** `apps/demo-startup-tech/vercel.json` com `buildCommand` e `installCommand`; `docs/portfolio/projects/startup-tech/DEPLOY.md` com passos (Root Directory, env, Domains, CNAME).  
- **Estudo de caso:** em `apps/site`: rota dinâmica `app/(routes)/portfolio/[slug]/page.tsx` (suporte a `startup-tecnologica` estático e a projetos do DB via `getProjectBySlug`); `CaseStudyClient.tsx` com hero, featured image, desafio, solução, galeria, resultados e CTA; conteúdo estático para `startup-tecnologica` (Desafio, Solução, Resultados, demoUrl via `NEXT_PUBLIC_DEMO_STARTUP_TECH_URL` ou fallback); `generateMetadata`; card "Startup Tech" no `PortfolioPageClient` e entrada no `sitemap.xml`.

**Resultado:**  
Fase 7 concluída. Deploy e DNS ficam a cargo do usuário conforme `DEPLOY.md`.

**Status:** ✅ Resolvido

