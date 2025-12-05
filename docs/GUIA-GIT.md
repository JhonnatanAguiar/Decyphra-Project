# 🔄 Guia de Git - Decyphra Website

## 🎯 Objetivo

Este guia explica como configurar Git e fazer versionamento do projeto.

---

## 📋 Passo a Passo - Configuração Inicial

### 1. Verificar se Git está Instalado

```bash
git --version
```

Se não estiver instalado, baixe em: [git-scm.com](https://git-scm.com/)

---

### 2. Configurar Git (Primeira Vez)

```bash
# Configurar nome
git config --global user.name "Seu Nome"

# Configurar email
git config --global user.email "seu-email@exemplo.com"
```

---

### 3. Inicializar Repositório no Projeto

```bash
# Na raiz do projeto
cd "C:\Users\Computador\OneDrive\Documentos\Programação\Projetos\Cursor\Decyphra Project"

# Inicializar Git
git init
```

---

### 4. Criar Arquivo .gitignore (Já Existe)

O arquivo `.gitignore` já está configurado e inclui:
- `node_modules/`
- `.env.local` e `.env`
- `.next/`
- Arquivos de build
- Logs

**✅ Não precisa fazer nada - já está pronto!**

---

### 5. Fazer Primeiro Commit

```bash
# Adicionar todos os arquivos (exceto os ignorados)
git add .

# Verificar o que será commitado (opcional)
git status

# Fazer o primeiro commit
git commit -m "feat: setup inicial do projeto - Fase 1"
```

---

### 6. Criar Repositório no GitHub (Opcional)

1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `decyphra-website` (ou o nome que preferir)
4. **NÃO** inicialize com README, .gitignore ou license (já temos)
5. Clique em "Create repository"

---

### 7. Conectar Repositório Local ao GitHub

```bash
# Adicionar remote (substitua USERNAME pelo seu usuário)
git remote add origin https://github.com/USERNAME/decyphra-website.git

# Verificar se foi adicionado
git remote -v

# Enviar código para GitHub
git branch -M main
git push -u origin main
```

---

## 📝 Convenções de Commits

### Formato Padrão

```
tipo: descrição curta

Descrição mais detalhada (opcional)
```

### Tipos de Commit

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, espaços, etc (não afeta código)
- `refactor:` - Refatoração de código
- `test:` - Adicionar testes
- `chore:` - Tarefas de manutenção (deps, config, etc)

### Exemplos

```bash
# Nova funcionalidade
git commit -m "feat: adicionar componente Button"

# Correção
git commit -m "fix: corrigir erro de validação no formulário"

# Documentação
git commit -m "docs: atualizar roadmap da Fase 1"

# Setup/Config
git commit -m "chore: configurar Prisma com dotenv-cli"
```

---

## 🔄 Fluxo de Trabalho Diário

### 1. Verificar Status

```bash
git status
```

Mostra arquivos modificados, adicionados ou não rastreados.

---

### 2. Adicionar Mudanças

```bash
# Adicionar arquivo específico
git add arquivo.ts

# Adicionar todos os arquivos modificados
git add .

# Adicionar apenas arquivos rastreados (ignora novos)
git add -u
```

---

### 3. Fazer Commit

```bash
git commit -m "tipo: descrição do que foi feito"
```

---

### 4. Enviar para GitHub

```bash
# Enviar commits
git push

# Se for a primeira vez em uma branch
git push -u origin main
```

---

## 🌿 Branches (Futuro)

### Estrutura de Branches Recomendada

- `main` - Código de produção
- `develop` - Desenvolvimento (opcional)
- `feature/nome-da-feature` - Novas funcionalidades

### Criar e Usar Branch

```bash
# Criar nova branch
git checkout -b feature/design-system

# Trabalhar na branch...
# Fazer commits...

# Voltar para main
git checkout main

# Mesclar branch (quando terminar)
git merge feature/design-system
```

**Por enquanto:** Trabalhe direto na `main` até termos mais experiência.

---

## 📦 Comandos Úteis

### Ver Histórico

```bash
# Ver commits
git log

# Ver commits de forma compacta
git log --oneline

# Ver mudanças em um arquivo
git diff arquivo.ts
```

### Desfazer Mudanças

```bash
# Desfazer mudanças não commitadas em um arquivo
git checkout -- arquivo.ts

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (remove mudanças)
git reset --hard HEAD~1
```

### Atualizar do GitHub

```bash
# Baixar mudanças do GitHub
git pull
```

---

## ⚠️ Boas Práticas

1. **Commits Frequentes:** Faça commits pequenos e frequentes
2. **Mensagens Claras:** Descreva o que foi feito de forma clara
3. **Não Commitar:** `.env.local`, `node_modules`, arquivos gerados
4. **Testar Antes:** Teste antes de fazer commit
5. **Revisar:** Use `git status` e `git diff` antes de commitar

---

## 🎯 Checklist Inicial

- [x] Git instalado (`git --version`)
- [x] Git configurado (nome e email)
- [x] Repositório inicializado (`git init`)
- [x] Primeiro commit feito
- [x] (Opcional) Repositório criado no GitHub
- [x] (Opcional) Código enviado para GitHub

---

## 📝 Exemplo Completo - Primeira Vez

```bash
# 1. Verificar Git
git --version

# 2. Configurar (se necessário)
git config --global user.name "Jhonnatan Aguiar"
git config --global user.email "jhonnatanaguiar@decyphra.com.br"

# 3. Inicializar
git init

# 4. Verificar status
git status

# 5. Adicionar tudo
git add .

# 6. Primeiro commit
git commit -m "feat: setup inicial - Next.js, TypeScript, Tailwind, Prisma"

# 7. (Opcional) Conectar ao GitHub
git remote add origin https://github.com/USERNAME/decyphra-website.git
git branch -M main
git push -u origin main
```

---

**Pronto para versionar! Execute os comandos acima na ordem.**
