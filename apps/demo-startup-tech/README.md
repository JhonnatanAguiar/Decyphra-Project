# Demo Startup Tech (SaaS) - Portfólio Decyphra

> App de portfólio focado em UI/UX, criado como demo de uma startup SaaS.  
> Local: `apps/demo-startup-tech`

---

## 🔧 Scripts

Executar a partir da raiz do monorepo:

```bash
pnpm --filter demo-startup-tech dev      # Desenvolvimento
pnpm --filter demo-startup-tech build    # Build de produção
pnpm --filter demo-startup-tech start    # Servir build de produção
pnpm --filter demo-startup-tech lint     # ESLint
```

---

## 📁 Estrutura Inicial

```text
apps/demo-startup-tech/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

Esta é apenas a base da **Fase 1 (Setup e Estrutura Base)**.  
As próximas fases vão introduzir:

- Design system próprio (cores, tipografia, componentes)
- Seções da landing (Hero, Features, Pricing, etc.)
- Animações e microinterações
- Funcionalidades mínimas (formulário, etc.)

---

## 📚 Planejamento do Projeto

Toda a estratégia detalhada está em:

- `docs/portfolio/projects/startup-tech/PLANEJAMENTO-COMPLETO.md`
- `docs/portfolio/projects/startup-tech/LINHA-DO-TEMPO.md`
- `docs/portfolio/projects/startup-tech/REVISOES.md`

