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

