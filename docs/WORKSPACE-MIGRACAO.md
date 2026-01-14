# Plano de Migração para Workspace (Monorepo) com pnpm

## Contexto Geral

Este documento descreve o plano de migração do projeto Decyphra para uma arquitetura de **workspace (monorepo)** utilizando **pnpm workspaces**, seguindo o princípio de migração segura, incremental e reversível.

**Status Atual:** Fase 5 concluída e validada | Fase 6 pendente

---

## Estrutura do Workspace

```
decyphra-monorepo/
├── apps/
│   └── site/              # Site principal da Decyphra (Fase 2)
│   └── demo-*/            # Projetos demonstrativos (Fase 6+)
├── packages/
│   ├── config/            # Configurações compartilhadas (Fase 4)
│   ├── tokens/            # Design tokens (Fase 4)
│   ├── utils/             # Utilitários compartilhados (Fase 4)
│   └── ui/                # Componentes UI compartilhados (Fase 4)
├── pnpm-workspace.yaml    # Configuração do workspace
├── package.json           # Package.json raiz (workspace root)
└── pnpm-lock.yaml         # Lockfile único do workspace
```

---

## Fases da Migração

### ✅ Fase 0: Preparação e Linha de Base
**Status:** Concluída

- [x] Projeto estável e funcional
- [x] Deploy em produção funcionando
- [x] Linha de base estabelecida

---

### 🔄 Fase 1: Introdução do Workspace (Sem Mover Código)
**Status:** Em andamento

**Objetivo:** Adicionar infraestrutura de workspace sem alterar localização do código.

**Ações:**
- [x] Criar `pnpm-workspace.yaml`
- [x] Criar diretórios `apps/` e `packages/`
- [x] Configurar workspace para reconhecer `apps/*` e `packages/*`
- [ ] Validar que instalação de dependências funciona
- [ ] Validar que build e dev continuam funcionando

**Critério de Conclusão:**
- [ ] Instalação de dependências funciona normalmente
- [ ] Projeto continua buildando e rodando como antes
- [x] Nenhum código foi movido

---

### ✅ Fase 2: Migração do Site Principal para `apps/site`
**Status:** Concluída

**Objetivo:** Transformar o site institucional em um app explícito dentro do monorepo.

**Ações Realizadas:**
- [x] Criado diretório `apps/site`
- [x] Código copiado para `apps/site` (app/, src/, public/, prisma/, tests/, scripts/)
- [x] Criado `package.json` para apps/site
- [x] Ajustado `package.json` raiz para usar pnpm workspaces
- [x] Ajustado `vercel.json` para usar comandos do pnpm workspace (`pnpm --filter site`)
- [x] Configurações ajustadas (tsconfig.json, next.config.js, etc já usam caminhos relativos)
- [x] **IMPORTANTE:** `rootDirectory: "apps/site"` deve ser configurado na dashboard da Vercel (não no `vercel.json`)

**Critério de Conclusão:**
- [x] Site roda localmente a partir de `apps/site` (✅ Validado)
- [x] Build funciona sem erros (✅ Validado)
- [x] Nenhuma refatoração funcional (apenas mudança estrutural)
- [x] Arquivo `.env.local` configurado em `apps/site/.env.local` (✅ Validado)

---

### ✅ Fase 3: Continuidade de Deploy do Site Principal
**Status:** Concluída

**Objetivo:** Garantir que o site principal continue sendo entregue normalmente.

**Ações:**
- [x] Configurar `Root Directory: "apps/site"` na dashboard da Vercel (Settings → General → Root Directory)
- [x] Validar deploy em produção
- [x] Garantir que domínio principal continua funcionando

**Critério de Conclusão:**
- [x] Deploy em produção funcionando
- [x] Nenhuma regressão para o usuário final

---

### ✅ Fase 4: Criação das Camadas Compartilhadas (`packages`)
**Status:** Concluída

**Objetivo:** Introduzir pacotes compartilhados sem criar dependências obrigatórias.

**Estrutura:**
- [x] `packages/config`: ESLint, TypeScript, Tailwind configs (scaffold criado)
- [x] `packages/tokens`: Design tokens e constantes visuais (scaffold criado)
- [x] `packages/utils`: Funções utilitárias puras (scaffold criado)
- [x] `packages/ui`: Componentes UI reutilizáveis (scaffold criado)

**Ações Realizadas:**
- [x] Criados `package.json` base para cada package
- [x] Criados `src/index.ts` base para cada package
- [x] Adicionado export inicial de tokens (`BRAND_COLORS`)
- [x] Primeiro consumo no app (`themeColor` em `metadata`)
- [x] Módulo mínimo de tipografia criado (`FONT_FAMILY`)
- [x] Uso de tipografia aplicado no layout (`fontFamily` no body)
- [x] `themeColor` movido para `viewport` (compatibilidade Next.js)
- [x] Tokens de tamanho de fonte adicionados (`FONT_SIZE`)
- [x] Consumo de token de tipografia em gráficos (Recharts)
- [x] Token de espaçamento aplicado em tooltip de gráficos (`SPACE`)

**Critério de Conclusão:**
- [x] Workspace reconhece os pacotes (validado)
- [x] Site principal continua funcionando sem dependências obrigatórias (validado)

---

### ✅ Fase 5: Migração Gradual para Código Compartilhado
**Status:** Concluída

**Objetivo:** Reduzir duplicação e consolidar padrões.

**Ordem de Migração:**
- [x] Tokens visuais e constantes (concluído: tokens básicos criados e funcionando)
- [x] Utilitários puros (concluído: utilitários de documentos migrados)
- [x] Configurações compartilhadas (estrutura pronta: scaffold criado)
- [x] Componentes UI genéricos (estrutura pronta: scaffold criado)

**Ações Realizadas:**
- [x] Tokens básicos migrados (`BRAND_COLORS`, `FONT_FAMILY`, `FONT_SIZE`, `SPACE`)
- [x] Utilitários de documentos migrados (`@decyphra/utils`)
- [x] Estrutura de packages criada (`@decyphra/tokens`, `@decyphra/utils`, `@decyphra/ui`, `@decyphra/config`)
- [x] Packages configurados e funcionando no site principal

**Critério de Conclusão:**
- [x] Site principal utiliza packages de forma estável (validado: `@decyphra/tokens` e `@decyphra/utils` em uso)
- [x] Sem regressões de comportamento (validado: site funcionando normalmente)
- [x] Ganho estrutural perceptível (validado: estrutura de monorepo estabelecida)

---

### ⏳ Fase 6: Introdução do Primeiro Projeto Demo
**Status:** Pendente

**Objetivo:** Validar arquitetura criando segundo app real.

**Ações:**
- [ ] Criar `apps/demo-*` (ex: `apps/demo-startup-tech`)
- [ ] App totalmente independente
- [ ] Pode reutilizar packages compartilhados
- [ ] Deploy independente

**Critério de Conclusão:**
- [ ] Demo roda localmente
- [ ] Demo é buildável e deployável de forma independente

---

### ⏳ Fase 7: Padronização e Governança
**Status:** Pendente

**Objetivo:** Manter consistência e previsibilidade.

**Ações:**
- [ ] Scripts raiz para execução de apps
- [ ] Convenções claras de nomenclatura
- [ ] Documentação de processos

---

### ⏳ Fase 8: Ativação de Subdomínios
**Status:** Pendente

**Objetivo:** Conectar cada app demo a subdomínio próprio.

**Ações:**
- [ ] Configurar subdomínios no Vercel
- [ ] Cada app demo em subdomínio (`*.decyphra.com.br`)
- [ ] Site principal como hub central

---

## Regras Estruturais Rígidas

✅ **Permitido:**
- Apps em `apps/` podem usar packages de `packages/`
- Packages podem depender de outros packages

❌ **Proibido:**
- Apps em `apps/` NUNCA dependem de outros apps
- Packages em `packages/` NUNCA importam código de apps
- Dependências circulares
- Componentes específicos de página em packages

---

## Comandos Úteis

### Instalar dependências
```bash
pnpm install
```

### Rodar app específico
```bash
pnpm --filter site dev      # Após Fase 2
pnpm --filter demo-* dev    # Após Fase 6
```

### Build de todos os apps
```bash
pnpm -r --filter './apps/*' build
```

### Adicionar dependência a app específico
```bash
pnpm --filter site add <package>
```

### Adicionar dependência a package específico
```bash
pnpm --filter @decyphra/config add <package>
```

---

## Notas Importantes

1. **Migração Incremental**: Cada fase deve resultar em sistema funcional
2. **Checkpoints**: Validar funcionamento após cada fase
3. **Rollback**: Cada fase pode ser revertida se necessário
4. **Site Principal**: Não pode ficar fora do ar em nenhum momento
5. **Testes**: Validar build e dev após cada mudança estrutural

---

## Referências

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
- Estratégia de Portfólio: `docs/PORTFOLIO-ESTRATEGIA.md`

---

**Última atualização:** 2026-01-14