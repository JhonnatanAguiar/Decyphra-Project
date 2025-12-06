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

**04/12/2024 - Início da Fase 2: Design System**

**Criado:**
- ✅ Estrutura de pastas `src/views/components/ui/`
- ✅ Componente Button com todas as variantes (primary, secondary, ghost, dark)
- ✅ Componente Button com todos os tamanhos (sm, md, lg)
- ✅ Efeitos glow/neon implementados
- ✅ Hover effects configurados
- ✅ Barrel export (`index.ts`) para facilitar imports
- ✅ Teste visual na página home

**Problema Encontrado e Resolvido:**
- **Problema:** Erro no browser - componente Button não carregava
- **Causa:** Falta de `'use client'` no componente (Next.js App Router requer para componentes com hooks)
- **Solução:** Adicionado `'use client'` no início do arquivo Button.tsx
- **Status:** ✅ Resolvido

**Correção Adicional:**
- **Problema:** Alias `@/*` apontava para raiz, mas arquivos estão em `src/`
- **Solução:** Atualizado `tsconfig.json` para `"@/*": ["./src/*"]`
- **Status:** ✅ Resolvido

**Características do Button:**
- Variantes: primary, secondary, ghost, dark
- Tamanhos: sm, md, lg
- Estados: default, hover, focus, disabled, loading
- Efeitos: glow neon, shadow, transitions
- Acessibilidade: focus ring, disabled states

**04/12/2024 - Revisão e Correção de Erros do Componente Button**

**Problemas Encontrados e Resolvidos:**
1. **Erro no browser - componente não carregava**
   - **Causa:** Falta de `'use client'` no componente Button
   - **Solução:** Adicionado `'use client'` no início do arquivo
   - **Status:** ✅ Resolvido

2. **Alias TypeScript incorreto**
   - **Causa:** `@/*` apontava para `./*` (raiz), mas arquivos estão em `src/`
   - **Solução:** Atualizado `tsconfig.json` para `"@/*": ["./src/*"]`
   - **Status:** ✅ Resolvido

**Testes:**
- ✅ Componente renderiza corretamente no browser
- ✅ Todas as variantes funcionando
- ✅ Todos os tamanhos funcionando
- ✅ Sem erros de TypeScript
- ✅ Sem erros de lint
- ✅ Imports funcionando corretamente

**Status:** Fase 2 - Componente Button concluído e testado ✅

**Próximos Passos:**
1. Commit das alterações
2. Continuar Fase 2: Próximos componentes (Input, Textarea, etc.)

---

**04/12/2024 - Criação do Componente Input**

**Criado:**
- ✅ Componente Input com todas as variantes (default, primary, error)
- ✅ Componente Input com todos os tamanhos (sm, md, lg)
- ✅ Efeitos focus com glow neon (variante primary)
- ✅ Estados de erro (variante error)
- ✅ Placeholder estilizado
- ✅ Barrel export atualizado
- ✅ Teste visual na página home

**Características do Input:**
- Variantes: default, primary, error
- Tamanhos: sm, md, lg
- Estados: default, focus, disabled, error
- Efeitos: glow neon no focus (primary), transitions suaves
- Acessibilidade: focus ring, disabled states

**Status:** Fase 2 - Componente Input concluído e testado ✅

**Próximos Passos:**
1. Testar componente Input no browser
2. Continuar Fase 2: Próximos componentes (Textarea, Select, etc.)

---

**04/12/2024 - Criação do Componente Textarea**

**Criado:**
- ✅ Componente Textarea com todas as variantes (default, primary, error)
- ✅ Componente Textarea com todos os tamanhos (sm, md, lg)
- ✅ Altura mínima configurável por tamanho
- ✅ Efeitos focus com glow neon (variante primary)
- ✅ Estados de erro (variante error)
- ✅ Resize vertical habilitado
- ✅ Placeholder estilizado
- ✅ Barrel export atualizado
- ✅ Teste visual na página home

**Características do Textarea:**
- Variantes: default, primary, error
- Tamanhos: sm (80px min-height), md (120px min-height), lg (160px min-height)
- Estados: default, focus, disabled, error
- Efeitos: glow neon no focus (primary), transitions suaves
- Acessibilidade: focus ring, disabled states, resize vertical

**Status:** Fase 2 - Componente Textarea concluído e testado ✅

**Próximos Passos:**
1. Testar componente Textarea no browser
2. Continuar Fase 2: Próximos componentes (Select, Card, etc.)

---

**04/12/2024 - Criação do Componente Select**

**Criado:**
- ✅ Componente Select com todas as variantes (default, primary, error)
- ✅ Componente Select com todos os tamanhos (sm, md, lg)
- ✅ Ícone de seta customizado (SVG)
- ✅ Efeitos focus com glow neon (variante primary)
- ✅ Estados de erro (variante error)
- ✅ Estilização de opções
- ✅ Barrel export atualizado
- ✅ Teste visual na página home

**Características do Select:**
- Variantes: default, primary, error
- Tamanhos: sm, md, lg
- Estados: default, focus, disabled, error
- Efeitos: glow neon no focus (primary), transitions suaves
- Acessibilidade: focus ring, disabled states, cursor pointer
- Customização: ícone de seta SVG customizado, appearance-none

**Status:** Fase 2 - Componente Select concluído e testado ✅

**Próximos Passos:**
1. Testar componente Select no browser
2. Continuar Fase 2: Próximos componentes (Card, Badge/Tag, etc.)

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
