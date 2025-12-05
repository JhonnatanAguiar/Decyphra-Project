# 📦 Instalação de Dependências - Passo a Passo

## 🔍 O Problema

O erro `'prisma' não é reconhecido como um comando` significa que:
1. As dependências não foram instaladas ainda, OU
2. O Prisma não está no `node_modules`

## ✅ Solução Passo a Passo

### Passo 1: Instalar Todas as Dependências

Execute no terminal (na raiz do projeto):

```bash
npm install
```

**Isso vai:**
- Instalar todas as dependências do `package.json`
- Criar a pasta `node_modules/`
- Instalar o Prisma e todas as outras bibliotecas
- Gerar Prisma Client automaticamente (via postinstall)

**Tempo estimado:** 2-5 minutos (dependendo da internet)

---

### Passo 2: Verificar se Instalou

Após o `npm install` terminar, teste:

```bash
npx prisma --version
```

**Deve mostrar:** `prisma 5.19.0` (ou similar)

---

### Passo 3: Configurar DATABASE_URL

**IMPORTANTE:** Antes de executar migrations, você precisa:

1. Abrir o arquivo `.env.local` (na raiz do projeto)
2. Adicionar a connection string do Neon:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

**Substitua** pela connection string real do seu projeto Neon.

**Veja:** [CONFIGURACAO-ENV.md](./CONFIGURACAO-ENV.md) para mais detalhes.

---

### Passo 4: Executar Migration

**Opção A - Migration (Recomendado):**
```bash
npm run db:migrate
```

**Opção B - db push (Mais Simples):**
```bash
npm run db:push
```

**Nota:** Os scripts agora usam `dotenv-cli` para ler automaticamente o `.env.local`.

---

## 🎯 Comandos Completos (Execute na Ordem)

```bash
# 1. Instalar dependências
npm install

# 2. Verificar Prisma
npx prisma --version

# 3. (IMPORTANTE) Configure DATABASE_URL no .env.local antes de continuar!

# 4. Executar migration
npm run db:push
```

---

## ❓ Se Ainda Der Erro

### Erro: "DATABASE_URL não encontrada"

**Solução:** Adicione `DATABASE_URL` no arquivo `.env.local`

### Erro: "Can't reach database server"

**Solução:** 
- Verifique se a connection string está correta
- Verifique se o projeto Neon está ativo
- Use a connection string "Pooled" do Neon (mais estável)

### Erro: "prisma não é reconhecido"

**Solução:**
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

**OU no Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📝 Checklist

Antes de executar migrations, certifique-se:

- [ ] `npm install` foi executado com sucesso
- [ ] Arquivo `.env.local` existe na raiz
- [ ] `DATABASE_URL` está configurada no `.env.local`
- [ ] Connection string do Neon está correta
- [ ] Projeto Neon está ativo

---

**Execute `npm install` primeiro e depois me avise o resultado!**
