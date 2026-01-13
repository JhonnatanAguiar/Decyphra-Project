# Plano de Migração para Workspace (Monorepo) com pnpm

## Contexto Geral

Este documento descreve o plano de migração do projeto Decyphra para uma arquitetura de **workspace (monorepo)** utilizando **pnpm workspaces**, seguindo o princípio de migração segura, incremental e reversível.

**Status Atual:** Fase 2 concluída e validada | Pronta para Fase 3

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

### ⏳ Fase 3: Continuidade de Deploy do Site Principal
**Status:** Pendente

**Objetivo:** Garantir que o site principal continue sendo entregue normalmente.

**Ações:**
- [ ] Configurar `Root Directory: "apps/site"` na dashboard da Vercel (Settings → General → Root Directory)
- [ ] Validar deploy em produção
- [ ] Garantir que domínio principal continua funcionando

**Critério de Conclusão:**
- [ ] Deploy em produção funcionando
- [ ] Nenhuma regressão para o usuário final

---

### ⏳ Fase 4: Criação das Camadas Compartilhadas (`packages`)
**Status:** Pendente

**Objetivo:** Introduzir pacotes compartilhados sem criar dependências obrigatórias.

**Estrutura:**
- [ ] `packages/config`: ESLint, TypeScript, Tailwind configs
- [ ] `packages/tokens`: Design tokens e constantes visuais
- [ ] `packages/utils`: Funções utilitárias puras
- [ ] `packages/ui`: Componentes UI reutilizáveis

**Critério de Conclusão:**
- [ ] Workspace reconhece os pacotes
- [ ] Site principal continua funcionando sem dependências obrigatórias

---

### ⏳ Fase 5: Migração Gradual para Código Compartilhado
**Status:** Pendente

**Objetivo:** Reduzir duplicação e consolidar padrões.

**Ordem de Migração:**
- [ ] Tokens visuais e constantes
- [ ] Utilitários puros
- [ ] Configurações compartilhadas
- [ ] Componentes UI genéricos

**Critério de Conclusão:**
- [ ] Site principal utiliza packages de forma estável
- [ ] Sem regressões de comportamento
- [ ] Ganho estrutural perceptível

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

**Última atualização:** 2024-12-26