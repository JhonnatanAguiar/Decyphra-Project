# Documentação do Workspace / Monorepo - Decyphra

Esta pasta organiza as documentações relacionadas à **arquitetura de workspace (monorepo)** da Decyphra.

> Os arquivos originais continuam na raiz de `docs/` para manter compatibilidade; aqui centralizamos a visão do workspace.

---

## 📚 Documento Central

- `../WORKSPACE-MIGRACAO.md`  
  Plano completo de migração para **pnpm workspaces** / monorepo (`decyphra-monorepo/`), incluindo:
  - Estrutura de `apps/` e `packages/`
  - Fases de migração (0–8)
  - Regras estruturais rígidas (apps ↔ packages)
  - Comandos úteis (`pnpm --filter`, etc.)

---

## 🔗 Relação com o Site e Portfólio

- **Site principal**  
  - App principal em `apps/site` (ver `../PLANEJAMENTO-COMPLETO.md` e `./../site/README.md`).

- **Projetos de portfólio (demos)**  
  - Demos planejadas como apps independentes em `apps/demo-*`  
  - Estratégia detalhada em `../PORTFOLIO-ESTRATEGIA.md` e `../PORTFOLIO-GUIA-RAPIDO.md`.

---

## 🧭 Como Usar

1. Consulte `../WORKSPACE-MIGRACAO.md` para entender o estado atual do monorepo.
2. Sempre que criar um novo app (`apps/demo-*`), alinhe com as regras de `WORKSPACE-MIGRACAO.md`.
3. Use este README apenas como índice; o conteúdo detalhado permanece nos arquivos centrais.

