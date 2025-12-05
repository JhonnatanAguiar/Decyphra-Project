# ⏱️ Linha do Tempo do Projeto - Decyphra Website

> **Histórico Cronológico de Alterações**  
> Este arquivo registra todas as mudanças, decisões e problemas resolvidos durante o desenvolvimento.  
> Atualize este arquivo sempre que houver mudanças significativas.

---

## 📅 Dezembro 2024

### 🎯 Início do Projeto

**Data:** 04/12/2024

#### Fase 0: Planejamento Completo
- ✅ Análise do site atual (decyphra.com.br)
- ✅ Exploração visual e estrutura
- ✅ Definição de objetivos e escopo
- ✅ Criação de documentação completa:
  - Planejamento geral
  - Arquitetura MVC
  - Rotas do projeto
  - Design system
  - Schema do banco de dados
  - Roadmap de desenvolvimento
  - Versionamento de API
  - Guia de responsabilidades

**Decisões:**
- Stack: Next.js 14+, TypeScript, Tailwind, Prisma, Neon
- Arquitetura: MVC (Model - View - Controller)
- API: Versionamento via URL (`/api/v1/...`)
- Banco: PostgreSQL via Neon (serverless, gratuito)

---

### 🚀 Fase 1: Setup e Estrutura Base

#### 04/12/2024 - Início da Fase 1

**Criado:**
- ✅ Projeto Next.js 14+ com TypeScript
- ✅ Configuração ESLint e Prettier
- ✅ Configuração Tailwind CSS com design tokens
- ✅ Estrutura completa de pastas MVC
- ✅ Prisma schema completo
- ✅ Arquivos base (layout, page, globals.css, etc.)
- ✅ Utilitários base (cn, constants, routes)
- ✅ Prisma Client singleton

**Configurações:**
- ✅ `package.json` com todas as dependências
- ✅ `tsconfig.json` com tipos Node
- ✅ `tailwind.config.ts` com cores da Decyphra
- ✅ `.gitignore` configurado
- ✅ Scripts do package.json

**Problemas Encontrados e Resolvidos:**

1. **Prisma 7 vs Prisma 5**
   - **Problema:** `npx prisma` instalava automaticamente Prisma 7 (breaking changes)
   - **Solução:** Fixar Prisma 5.19.0 no package.json
   - **Status:** ✅ Resolvido

2. **Prisma não reconhecido como comando**
   - **Problema:** Dependências não instaladas
   - **Solução:** Executar `npm install`
   - **Status:** ✅ Resolvido

3. **Prisma lendo .env em vez de .env.local**
   - **Problema:** Prisma por padrão lê `.env`, mas Next.js usa `.env.local`
   - **Solução:** Usar `dotenv-cli` nos scripts do Prisma
   - **Mudança:** Scripts atualizados para `npx dotenv-cli -e .env.local -- prisma ...`
   - **Status:** ✅ Resolvido

4. **dotenv-cli não encontrado**
   - **Problema:** Scripts não encontravam dotenv-cli
   - **Solução:** Usar `npx dotenv-cli` explicitamente
   - **Status:** ✅ Resolvido

**Organização:**
- ✅ Documentação organizada em `docs/` por fase/tópico
- ✅ Arquivos `.md` movidos da raiz para `docs/`
- ✅ Scripts movidos para `scripts/`
- ✅ Raiz do projeto limpa

**Consolidação de Documentação:**
- ✅ Todos os documentos (00-08) consolidados em `PLANEJAMENTO-COMPLETO.md`
- ✅ Arquivo `LINHA-DO-TEMPO.md` criado para histórico
- ✅ Arquivo `GUIA-GIT.md` criado para versionamento
- ✅ Arquivos antigos removidos (consolidados)

**Correções:**
- ✅ Erro no `globals.css` corrigido (`border-border` → `border-dark-800`)
- ✅ Scripts atualizados para usar `npx dotenv-cli` explicitamente

**Status Atual da Fase 1:** 85% completo

**04/12/2024 - Criação e Execução do Seed de Dados**

**Criado:**
- ✅ Arquivo `prisma/seed.ts` com 8 serviços da Decyphra
- ✅ Configuração do Prisma seed no `package.json`
- ✅ Script `npm run db:seed` configurado para usar `.env.local`

**Executado:**
- ✅ Seed executado com sucesso
- ✅ 8 serviços criados no banco de dados:
  1. Desenvolvimento Web
  2. Sistemas e APIs
  3. SEO & Otimização
  4. Google Ads
  5. Marketing de Conteúdo
  6. Inteligência Artificial
  7. E-commerce
  8. Consultoria Digital
- ✅ Commit e push realizados

**04/12/2024 - Revisão Rotineira**

**Verificações:**
- ✅ Sem erros de lint
- ✅ Todas as configurações corretas
- ✅ Fontes Inter já configuradas (verificado)
- ✅ Banco de dados populado
- ✅ Estrutura MVC completa
- ✅ Git funcionando

**04/12/2024 - Consolidação de Arquivos de Revisão**

**Mudança:**
- ✅ Arquivos `REVISAO-COMPLETA.md` e `REVISAO-ROTINEIRA.md` consolidados em `REVISOES.md`
- ✅ Estrutura similar à `LINHA-DO-TEMPO.md` (histórico cronológico)
- ✅ Documentação atualizada (README.md e docs/README.md)

**Resultado:**
- ✅ Menos poluição de diretórios
- ✅ Todas as revisões em um único arquivo
- ✅ Fácil de atualizar e consultar

**Status:** Fase 1 - 95% completo

**Próximos Passos:**
1. Finalizar Fase 1
2. Iniciar Fase 2: Design System e Componentes Base

---

## 📝 Como Atualizar Este Arquivo

### Quando Adicionar Entrada

1. **Problemas Resolvidos:** Sempre que resolver um bug ou problema
2. **Decisões Importantes:** Mudanças de arquitetura, stack, ou abordagem
3. **Mudanças de Configuração:** Alterações em arquivos de config
4. **Progresso de Fases:** Quando completar tarefas significativas
5. **Refatorações:** Mudanças estruturais no código

### Formato de Entrada

```markdown
#### DD/MM/YYYY - Título da Mudança

**Contexto:** O que estava acontecendo

**Mudança:** O que foi alterado

**Resultado:** O que aconteceu após a mudança

**Status:** ✅ Resolvido / ⏳ Em Progresso / ❌ Problema
```

---

**Última atualização:** 04/12/2024
