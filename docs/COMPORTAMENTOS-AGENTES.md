# 🤖 Comportamentos Padronizados para Agentes - Decyphra Project

> **Documento de Referência para Padronização de Fluxo de Trabalho**  
> Este arquivo define comportamentos que todos os agentes devem seguir para manter consistência e qualidade, mesmo após perder contextos.  
> Última atualização: Dezembro 2024

---

## 📋 Índice

1. [Revisão de Documentação](#revisão-de-documentação)
2. [Atualização de Documentações](#atualização-de-documentações)
3. [Centralização de Documentos](#centralização-de-documentos)
4. [Implementação Passo a Passo](#implementação-passo-a-passo)
5. [Testes e Debug](#testes-e-debug)
6. [Comunicação e Explicações](#comunicação-e-explicações)
7. [Versionamento Git](#versionamento-git)
8. [Sugestões de Melhorias](#sugestões-de-melhorias)
9. [Organização do Projeto](#organização-do-projeto)
10. [Qualidade de Código](#qualidade-de-código)

---

## 📚 Revisão de Documentação

### ✅ Sempre Revisar o Planejamento

**Antes de iniciar qualquer tarefa, o agente DEVE:**

1. **Ler o Planejamento Completo** (`docs/PLANEJAMENTO-COMPLETO.md`)
   - Entender o objetivo e visão geral do projeto
   - Verificar o roadmap e status das fases
   - Consultar a arquitetura MVC definida
   - Verificar rotas e endpoints planejados
   - Revisar design system e padrões visuais

2. **Verificar a Linha do Tempo** (`docs/LINHA-DO-TEMPO.md`)
   - Entender o histórico de decisões
   - Verificar problemas já resolvidos
   - Identificar padrões estabelecidos
   - Evitar repetir erros anteriores

3. **Consultar Revisões** (`docs/REVISOES.md`)
   - Verificar problemas encontrados em revisões anteriores
   - Entender padrões de qualidade estabelecidos
   - Verificar checkpoints e aprovações

**Por quê?**
- Garante alinhamento com o planejamento original
- Evita retrabalho e inconsistências
- Mantém a qualidade e padrões do projeto
- Preserva a identidade visual e arquitetura definidas

---

## 📝 Atualização de Documentações

### ✅ Sempre Atualizar os 3 Documentos Centrais

**Após qualquer mudança significativa, o agente DEVE atualizar:**

#### 1. **LINHA-DO-TEMPO.md** (`docs/LINHA-DO-TEMPO.md`)
- **Quando atualizar:**
  - Problemas encontrados e resolvidos
  - Decisões importantes de arquitetura
  - Mudanças de configuração
  - Progresso de fases (conclusão de tarefas)
  - Refatorações significativas

- **Formato de entrada:**
  ```markdown
  #### DD/MM/YYYY - Título da Mudança
  
  **Contexto:** O que estava acontecendo
  
  **Mudança:** O que foi alterado
  
  **Resultado:** O que aconteceu após a mudança
  
  **Status:** ✅ Resolvido / ⏳ Em Progresso / ❌ Problema
  ```

#### 2. **PLANEJAMENTO-COMPLETO.md** (`docs/PLANEJAMENTO-COMPLETO.md`)
- **Quando atualizar:**
  - Conclusão de tarefas do roadmap (marcar checkboxes)
  - Mudanças no progresso das fases
  - Adição de novas funcionalidades ao planejamento
  - Mudanças na stack tecnológica
  - Atualização de rotas ou endpoints

- **O que atualizar:**
  - Checklists do roadmap (marcar como concluído)
  - Progresso percentual das fases
  - Seção de progresso geral
  - Adicionar novas seções se necessário

#### 3. **REVISOES.md** (`docs/REVISOES.md`)
- **Quando atualizar:**
  - Após revisões completas de fases
  - Quando problemas são encontrados e corrigidos
  - Após verificações de qualidade (TypeScript, ESLint, Build)
  - Checkpoints importantes do projeto

- **Formato de entrada:**
  ```markdown
  ## 🔍 Revisão [Tipo] - [Título]
  
  **Data:** DD/MM/YYYY
  **Status:** ✅ Concluído
  
  ### Problemas Encontrados e Corrigidos
  - [Descrição do problema e solução]
  
  ### Verificações Realizadas
  - [Lista de verificações]
  ```

**Por quê?**
- Mantém a documentação sempre atualizada
- Facilita o trabalho de agentes futuros
- Preserva o histórico de decisões
- Permite rastreabilidade completa do projeto

---

## 📂 Centralização de Documentos

### ✅ Sempre Centralizar nos 3 Documentos Principais

**O agente DEVE evitar criar novos arquivos de documentação e, ao invés disso:**

1. **Usar os 3 documentos centrais:**
   - `PLANEJAMENTO-COMPLETO.md` - Para planejamento, roadmap, arquitetura
   - `LINHA-DO-TEMPO.md` - Para histórico cronológico e mudanças
   - `REVISOES.md` - Para revisões e verificações de qualidade

2. **Quando criar novos arquivos:**
   - Apenas para documentação técnica específica (ex: troubleshooting)
   - Apenas para guias de uso (ex: GUIA-GIT.md)
   - Apenas para documentação de fase específica (ex: fase-1-setup/)

3. **Nunca criar:**
   - Múltiplos arquivos de planejamento
   - Arquivos de status duplicados
   - Documentos de revisão separados
   - Arquivos de progresso fragmentados

**Por quê?**
- Evita fragmentação da informação
- Facilita a manutenção
- Reduz confusão sobre onde encontrar informações
- Mantém a documentação organizada e acessível

---

## 🔨 Implementação Passo a Passo

### ✅ Sempre Implementar Uma Coisa de Cada Vez

**O agente DEVE seguir este padrão:**

1. **Uma implementação por vez:**
   - Não fazer múltiplas implementações simultâneas
   - Completar uma tarefa antes de iniciar outra
   - Testar cada implementação antes de avançar

2. **Ordem recomendada:**
   - Implementar funcionalidade
   - Testar funcionalidade
   - Debugar se necessário
   - Documentar mudanças
   - Atualizar documentações centrais
   - Sugerir commit

3. **Evitar:**
   - Implementar múltiplas features ao mesmo tempo
   - Fazer mudanças em vários arquivos sem testar
   - Avançar sem verificar se a implementação anterior funciona

**Por quê?**
- Facilita o monitoramento do progresso
- Reduz a complexidade de debug
- Permite identificar problemas rapidamente
- Mantém o código estável e funcional
- Facilita a manutenção futura

---

## 🧪 Testes e Debug

### ✅ Sempre Testar e Debugar ao Final de uma Implementação

**O agente DEVE:**

1. **Testar a implementação:**
   - Executar o código localmente (`npm run dev`)
   - Verificar se não há erros no console
   - Testar funcionalidades implementadas
   - Verificar responsividade (se aplicável)

2. **Verificar qualidade do código:**
   - Executar `npm run type-check` (TypeScript)
   - Executar `npm run lint` (ESLint)
   - Verificar se o build compila (`npm run build`)

3. **Debugar problemas:**
   - Identificar erros ou warnings
   - Corrigir problemas encontrados
   - Verificar se correções não quebraram outras partes
   - Re-testar após correções

4. **Verificar integrações:**
   - Se implementou API, testar endpoints
   - Se modificou banco, verificar migrations
   - Se alterou componentes, verificar renderização

**Por quê?**
- Garante que o código funciona corretamente
- Evita bugs em produção
- Mantém a qualidade do projeto
- Facilita a manutenção futura

---

## 💬 Comunicação e Explicações

### ✅ Sempre Explicar com Clareza e Sugerir Próximos Passos

**O agente DEVE:**

1. **Explicar o que foi feito:**
   - Descrever claramente a implementação
   - Mencionar arquivos modificados/criados
   - Explicar decisões técnicas importantes
   - Destacar funcionalidades implementadas

2. **Sugerir próximos passos:**
   - Identificar o que fazer em seguida
   - Sugerir melhorias ou otimizações
   - Indicar próximas tarefas do roadmap
   - Mencionar dependências ou pré-requisitos

3. **Comunicar problemas:**
   - Se encontrar problemas, explicar claramente
   - Sugerir soluções ou alternativas
   - Indicar se precisa de intervenção manual

**Por quê?**
- Facilita o entendimento do que foi feito
- Mantém o fluxo de trabalho contínuo
- Evita confusão sobre próximos passos
- Melhora a colaboração e produtividade

---

## 🔄 Versionamento Git

### ✅ Sempre Sugerir Mensagem de Commit ao Final de Qualquer Atividade

**O agente DEVE:**

1. **Sugerir mensagem de commit:**
   - Seguir convenções (feat, fix, docs, refactor, test, chore)
   - Descrever claramente o que foi feito
   - Usar formato: `tipo: descrição curta`

2. **Tipos de commit:**
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Documentação
   - `style:` - Formatação (não afeta código)
   - `refactor:` - Refatoração
   - `test:` - Testes
   - `chore:` - Manutenção (deps, config, etc)

3. **Exemplos de mensagens:**
   - `feat: adicionar componente Card3D com efeitos 3D`
   - `fix: corrigir validação de email no formulário de contato`
   - `docs: atualizar progresso da Fase 4 no planejamento`
   - `refactor: otimizar animações de scroll`
   - `chore: atualizar dependências do projeto`

**Por quê?**
- Mantém histórico claro e organizado
- Facilita rastreamento de mudanças
- Segue boas práticas de versionamento
- Melhora a colaboração em equipe

---

## 💡 Sugestões de Melhorias

### ✅ Sempre Sugerir Implementações que Melhoram o Projeto

**O agente DEVE:**

1. **Identificar oportunidades de melhoria:**
   - Analisar código implementado
   - Verificar padrões e consistência
   - Identificar funcionalidades faltantes
   - Sugerir otimizações de performance

2. **Sugerir melhorias relevantes:**
   - Alinhadas com o planejamento
   - Que agregam valor ao projeto
   - Que melhoram a experiência do usuário
   - Que facilitam a manutenção

3. **Priorizar sugestões:**
   - Indicar importância (alta, média, baixa)
   - Mencionar se é crítica ou opcional
   - Sugerir ordem de implementação

**Por quê?**
- Melhora continuamente a qualidade do projeto
- Identifica gaps no planejamento
- Sugere otimizações e melhorias
- Contribui para a evolução do projeto

---

## 🗂️ Organização do Projeto

### ✅ Sempre Manter o Projeto Organizado

**O agente DEVE:**

1. **Evitar arquivos e pastas fantasmas:**
   - Remover arquivos não utilizados
   - Limpar pastas vazias desnecessárias
   - Não criar arquivos temporários que ficam no projeto
   - Remover código comentado desnecessário

2. **Manter estrutura organizada:**
   - Seguir a arquitetura MVC definida
   - Manter padrões de nomenclatura
   - Organizar arquivos em pastas apropriadas
   - Manter imports organizados

3. **Limpar após implementações:**
   - Remover console.logs de debug
   - Remover comentários temporários
   - Limpar código não utilizado
   - Verificar se não há arquivos órfãos

**Por quê?**
- Mantém o projeto limpo e profissional
- Facilita navegação e manutenção
- Reduz confusão sobre arquivos importantes
- Melhora a performance (menos arquivos para processar)

---

## ✨ Qualidade de Código

### ✅ Sempre Prezar por Código Limpo, Legível e Bem Comentado

**O agente DEVE:**

1. **Manter código limpo:**
   - Seguir padrões de formatação (Prettier)
   - Usar nomes descritivos para variáveis e funções
   - Evitar código duplicado
   - Manter funções pequenas e focadas

2. **Garantir legibilidade:**
   - Usar indentação consistente
   - Organizar imports logicamente
   - Agrupar código relacionado
   - Usar espaçamento adequado

3. **Comentar estrategicamente:**
   - Comentar lógica complexa ou não óbvia
   - Explicar decisões técnicas importantes
   - Documentar funções públicas
   - Evitar comentários óbvios ou redundantes

4. **Eliminar inconsistências:**
   - Seguir padrões estabelecidos no projeto
   - Usar componentes e utilitários existentes
   - Manter consistência de estilo
   - Seguir convenções de nomenclatura

5. **Remover redundâncias:**
   - Evitar código duplicado
   - Extrair lógica comum em funções/componentes
   - Reutilizar componentes existentes
   - Usar constantes para valores repetidos

**Por quê?**
- Facilita manutenção e evolução
- Melhora a experiência de desenvolvimento
- Reduz bugs e erros
- Mantém qualidade profissional
- Facilita onboarding de novos desenvolvedores

---

## 📋 Checklist de Verificação

**Antes de finalizar qualquer tarefa, o agente DEVE verificar:**

- [ ] Planejamento foi revisado
- [ ] Implementação foi feita passo a passo
- [ ] Código foi testado e debugado
- [ ] TypeScript sem erros (`npm run type-check`)
- [ ] ESLint sem erros (`npm run lint`)
- [ ] Build compila com sucesso (`npm run build`)
- [ ] Documentações centrais foram atualizadas:
  - [ ] LINHA-DO-TEMPO.md
  - [ ] PLANEJAMENTO-COMPLETO.md
  - [ ] REVISOES.md (se aplicável)
- [ ] Explicação clara do que foi feito
- [ ] Próximos passos sugeridos
- [ ] Mensagem de commit sugerida
- [ ] Sugestões de melhorias (se identificadas)
- [ ] Projeto organizado (sem arquivos fantasmas)
- [ ] Código limpo, legível e comentado

---

## 🎯 Resumo dos Comportamentos Essenciais

1. ✅ **Sempre revisar o planejamento** antes de iniciar
2. ✅ **Sempre atualizar** LINHA-DO-TEMPO.md, PLANEJAMENTO-COMPLETO.md e REVISOES.md
3. ✅ **Sempre centralizar** documentação nos 3 documentos principais
4. ✅ **Sempre implementar** uma coisa de cada vez, passo a passo
5. ✅ **Sempre testar e debugar** ao final de uma implementação
6. ✅ **Sempre explicar** com clareza e sugerir próximos passos
7. ✅ **Sempre sugerir** mensagem de commit ao final
8. ✅ **Sempre sugerir** melhorias identificadas
9. ✅ **Sempre manter** o projeto organizado
10. ✅ **Sempre prezar** por código limpo, legível e bem comentado

---

## 📚 Referências

- **Planejamento:** `docs/PLANEJAMENTO-COMPLETO.md`
- **Linha do Tempo:** `docs/LINHA-DO-TEMPO.md`
- **Revisões:** `docs/REVISOES.md`
- **Guia Git:** `docs/GUIA-GIT.md`
- **README:** `docs/README.md`

---

**Última atualização:** Dezembro 2024  
**Versão:** 1.0  
**Status:** Ativo
