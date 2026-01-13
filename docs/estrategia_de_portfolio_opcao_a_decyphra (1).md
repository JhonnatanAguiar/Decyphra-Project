# Plano de Migração para Workspace (Monorepo) com npm

## Contexto Geral

Este documento descreve um **plano robusto e progressivo** para migrar um projeto já consolidado da Decyphra para uma arquitetura de **workspace (monorepo)** utilizando **npm workspaces**, sem quebrar o site principal nem interromper o funcionamento em produção.

O plano assume que:
- o projeto atual já está estável;
- o deploy em produção existe e funciona;
- a migração deve ser **segura, reversível e incremental**;
- o site principal não pode ficar indisponível em nenhum momento.

A proposta é transformar o repositório atual em um **monorepo organizado por camadas**, preservando o comportamento do sistema enquanto a estrutura evolui.

---

## Objetivo da Migração

- Introduzir uma arquitetura de **monorepo com npm workspaces**;
- Separar responsabilidades em camadas claras:
  - **apps/**: aplicações finais e deployáveis;
  - **packages/**: código compartilhado e reutilizável;
- Manter o site institucional da Decyphra funcionando durante todo o processo;
- Preparar o ambiente para múltiplos projetos (demos) com deploy e subdomínio independentes.

---

## Princípios de Segurança do Plano

O plano segue quatro princípios fundamentais:

1. **Mover antes de refatorar**  
   Nenhuma mudança estrutural profunda acontece enquanto o código ainda está sendo realocado.

2. **Mudanças incrementais**  
   Cada fase deve resultar em um sistema funcional por si só.

3. **Checkpoints constantes**  
   Ao final de cada fase, o projeto precisa rodar localmente e compilar corretamente.

4. **Rollback simples**  
   Cada etapa é isolada o suficiente para permitir reversão sem impacto sistêmico.

---

## Fase 0 — Preparação e Linha de Base

### Objetivo
Garantir que existe um ponto estável e recuperável antes de iniciar qualquer modificação estrutural.

### Diretrizes
- Criar uma branch exclusiva de migração.
- Confirmar que o projeto atual:
  - instala dependências corretamente;
  - executa em ambiente de desenvolvimento;
  - gera build com sucesso;
  - possui deploy funcional em produção.
- Evitar inclusão de novas funcionalidades durante a migração.

### Critério de Conclusão
Existe uma linha de base clara e validada, sem alterações estruturais realizadas.

---

## Fase 1 — Introdução do Workspace (Sem Mover Código)

### Objetivo
Adicionar a infraestrutura de **npm workspaces** sem alterar a localização atual do projeto.

### Diretrizes
- Criar a estrutura inicial do monorepo:
  - diretório `apps/`;
  - diretório `packages/`.
- Configurar o `package.json` raiz para declarar workspaces:
  - `apps/*`
  - `packages/*`
- Manter o código do projeto exatamente onde está.

### Critério de Conclusão
- Instalação de dependências funciona normalmente;
- O projeto continua buildando e rodando como antes.

---

## Fase 2 — Migração do Site Principal para `apps/site`

### Objetivo
Transformar o site institucional em um **app explícito** dentro do monorepo.

### Diretrizes
- Criar o diretório `apps/site`.
- Mover integralmente o código do projeto atual para dentro desse diretório.
- Preservar estrutura, arquivos e comportamento.
- Ajustar apenas o necessário para:
  - resolução de dependências;
  - execução de scripts;
  - caminhos de assets e configurações.

### Pontos de Atenção
- Imports relativos baseados na raiz antiga;
- Configurações que dependem do diretório raiz;
- Pastas públicas e caminhos estáticos.

### Critério de Conclusão
- O site roda localmente a partir do monorepo;
- O build funciona sem erros;
- Não houve refatoração funcional.

---

## Fase 3 — Continuidade de Deploy do Site Principal

### Objetivo
Garantir que o site principal continue sendo entregue normalmente após a mudança estrutural.

### Diretrizes
- Ajustar a configuração de deploy para considerar `apps/site` como diretório raiz da aplicação.
- Validar que o domínio principal continua apontando para o site institucional.

### Critério de Conclusão
- Deploy em produção funcionando corretamente;
- Nenhuma regressão perceptível para o usuário final.

---

## Fase 4 — Criação das Camadas Compartilhadas (`packages`)

### Objetivo
Introduzir os pacotes compartilhados sem criar dependências obrigatórias imediatas.

### Estrutura Conceitual Inicial
- `packages/config`: configurações base (eslint, tsconfig, tailwind);
- `packages/tokens`: design tokens e constantes visuais;
- `packages/utils`: funções utilitárias puras;
- `packages/ui`: componentes reutilizáveis.

### Diretrizes
- Inicialmente, os pacotes podem estar vazios ou conter apenas estruturas mínimas.
- O site principal **não precisa** consumir esses pacotes ainda.

### Critério de Conclusão
- Workspace reconhece os pacotes;
- O site principal continua funcionando sem dependências obrigatórias.

---

## Fase 5 — Migração Gradual para Código Compartilhado

### Objetivo
Reduzir duplicação e consolidar padrões sem introduzir riscos desnecessários.

### Ordem Recomendada de Migração
1. Tokens visuais e constantes;
2. Utilitários puros;
3. Configurações compartilhadas;
4. Componentes de UI genéricos e estáveis.

### Regras Estruturais Rígidas
- Aplicações em `apps/` **nunca** dependem de outros apps;
- Pacotes em `packages/` **nunca** importam código de apps;
- Não criar dependências circulares;
- Componentes específicos de página permanecem no app.

### Critério de Conclusão
- O site principal utiliza packages de forma estável;
- Não há regressões de comportamento;
- O ganho estrutural é perceptível.

---

## Fase 6 — Introdução do Primeiro Projeto Demo

### Objetivo
Validar a arquitetura criando um segundo app real dentro do monorepo.

### Diretrizes
- Criar um novo app em `apps/demo-*`;
- Esse app deve ser totalmente independente do site principal;
- Pode reutilizar `packages/ui`, `packages/tokens` e `packages/utils`.

### Critério de Conclusão
- O demo roda localmente;
- O demo é buildável e deployável de forma independente.

---

## Fase 7 — Padronização e Governança do Monorepo

### Objetivo
Manter consistência e previsibilidade sem travar produtividade.

### Diretrizes
- Scripts raiz para executar:
  - desenvolvimento de apps individuais;
  - build de todos os apps;
- Convenções claras para:
  - nomenclatura de apps;
  - estrutura de rotas;
  - uso de packages compartilhados.

### Critério de Conclusão
- O monorepo é fácil de entender;
- Criar novos apps não gera caos estrutural.

---

## Fase 8 — Ativação de Subdomínios (Integração com a Opção A)

### Objetivo
Conectar cada app demo a um subdomínio próprio dentro do domínio da Decyphra.

### Diretrizes
- Cada app demo possui deploy independente;
- Cada deploy recebe um subdomínio (`*.decyphra.com.br`);
- O site principal atua como hub de navegação para demos e estudos de caso.

### Critério de Conclusão
- Subdomínios ativos com HTTPS;
- Portfólio funcionando como vitrine central.

---

## Restrições Absolutas (Não Negociáveis)

- O site principal não pode ficar fora do ar;
- Apps não dependem de outros apps;
- Packages não dependem de apps;
- Nenhuma refatoração em massa sem checkpoints;
- Se uma fase quebrar o sistema, ela deve ser revertida antes de prosseguir.

---

## Síntese Final

Este plano transforma um projeto isolado em um **ecossistema escalável**, baseado em npm workspaces, com risco controlado e crescimento sustentável.

A migração é pensada como **evolução estrutural**, não como reescrita. O resultado final é um monorepo maduro, capaz de sustentar múltiplos produtos digitais independentes, mantendo o site institucional da Decyphra como núcleo de marca, autoridade e conversão.

