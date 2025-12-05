# 🔧 Troubleshooting - Erro Prisma Migration

## 📋 Problemas Comuns e Soluções

### 1. ❌ Erro: "Can't reach database server"

**Causa:** DATABASE_URL não configurada ou incorreta

**Solução:**
1. Verifique se o arquivo `.env.local` existe na raiz do projeto
2. Verifique se tem a linha `DATABASE_URL=...`
3. A connection string do Neon deve ter este formato:
   ```
   postgresql://user:password@host/database?sslmode=require
   ```

**Como obter a connection string do Neon:**
1. Acesse [console.neon.tech](https://console.neon.tech)
2. Selecione seu projeto
3. Vá em "Connection Details"
4. Copie a connection string completa
5. Adicione `?sslmode=require` no final (se não tiver)

---

### 2. ❌ Erro: "Environment variable not found: DATABASE_URL"

**Causa:** Arquivo `.env.local` não está sendo lido

**Solução:**
1. Certifique-se que o arquivo se chama exatamente `.env.local` (com o ponto no início)
2. Certifique-se que está na raiz do projeto (mesmo nível do `package.json`)
3. Use os scripts do package.json (`npm run db:push`) - eles usam dotenv-cli para ler .env.local

---

### 3. ❌ Erro: "P1001: Can't reach database server"

**Causa:** Problema de conexão com o Neon

**Solução:**
1. Verifique se o projeto Neon está ativo
2. Verifique se a connection string está correta
3. Tente usar a connection string "Pooled" do Neon (mais estável)
4. Verifique sua conexão com internet

---

### 4. ❌ Erro: "P1003: Database does not exist"

**Causa:** Nome do banco está incorreto na connection string

**Solução:**
1. Use a connection string exata do dashboard do Neon
2. Não altere o nome do banco manualmente
3. O Neon cria o banco automaticamente

---

### 5. ❌ Erro: "Migration failed to apply"

**Causa:** Pode haver conflitos ou problemas no schema

**Solução:**
1. Verifique se o Prisma está atualizado: `npm list prisma`
2. Tente resetar: `npx prisma migrate reset` (CUIDADO: apaga dados!)
3. Ou tente criar migration manualmente

---

## 🔍 Como Diagnosticar

### Passo 1: Verificar se DATABASE_URL está configurada

Execute no terminal:
```bash
# Windows PowerShell
$env:DATABASE_URL

# Ou use o script de teste
node scripts/test-connection.js
```

### Passo 2: Testar conexão com o banco

```bash
npm run db:push
```

Se funcionar, a conexão está OK.

### Passo 3: Verificar Prisma

```bash
npx prisma@5.19.0 --version
npm run db:generate
```

---

## ✅ Solução Passo a Passo

### Opção 1: Usar Scripts (Recomendado)

```bash
# 1. Certifique-se que DATABASE_URL está no .env.local
# 2. Gere o Prisma Client
npm run db:generate

# 3. Execute db push (lê .env.local automaticamente)
npm run db:push
```

### Opção 2: Se a Opção 1 falhar

```bash
# 1. Gere o Prisma Client
npx prisma@5.19.0 generate

# 2. Crie o schema diretamente no banco (sem migration)
npx prisma@5.19.0 db push
```

**Nota:** `db push` é mais simples mas não cria histórico de migrations.

---

## 📝 Formato Correto da Connection String

### Neon Connection String (Exemplo)

```
postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Partes importantes:**
- `postgresql://` - protocolo
- `user:password@` - credenciais
- `ep-xxx-xxx.region.aws.neon.tech` - host do Neon
- `/neondb` - nome do banco
- `?sslmode=require` - obrigatório para Neon

---

## 🆘 Se Nada Funcionar

1. **Compartilhe o erro completo** - copie e cole a mensagem de erro
2. **Verifique a connection string** - mas não compartilhe aqui (tem senha!)
3. **Tente `db push`** em vez de `migrate dev`
4. **Use os scripts do package.json** - eles já estão configurados corretamente

---

**Me envie a mensagem de erro completa para eu ajudar melhor!**
