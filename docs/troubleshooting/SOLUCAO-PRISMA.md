# ✅ Solução - Problema Prisma 7 vs Prisma 5

## 🔍 O Problema

O `npx prisma migrate dev` estava instalando automaticamente o **Prisma 7**, que tem breaking changes:
- No Prisma 7, a `url` não pode mais estar no `datasource` do `schema.prisma`
- Precisa usar `prisma.config.ts` (mais complexo)

## ✅ A Solução

**Usar Prisma 5.19.0** (versão estável e compatível)

### O que foi feito:

1. ✅ **Schema atualizado** - Voltou para formato Prisma 5 (com `url` no datasource)
2. ✅ **Prisma 5 instalado** - Versão 5.19.0 no package.json
3. ✅ **Scripts atualizados** - Agora usam dotenv-cli para ler .env.local

## 🚀 Como Usar Agora

### Opção 1: Usar Scripts (Recomendado)

**Os scripts agora leem `.env.local` automaticamente:**

```bash
npm run db:migrate
```

**OU:**

```bash
npm run db:push
```

### Opção 2: Forçar Versão Específica

Se precisar usar `npx` diretamente:

```bash
npx prisma@5.19.0 migrate dev --name init
```

**OU:**

```bash
npx prisma@5.19.0 db push
```

**Nota:** `db push` é mais simples e cria o schema diretamente no banco, sem criar arquivos de migration.

---

## 📝 Verificações

### 1. Verificar se DATABASE_URL está configurada

Certifique-se que o arquivo `.env.local` tem:
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

### 2. Testar conexão

```bash
npm run db:push
```

Se funcionar, a conexão está OK!

### 3. Gerar Prisma Client

```bash
npm run db:generate
```

---

## 🎯 Próximos Passos

1. **Certifique-se que DATABASE_URL está no .env.local**
2. **Execute a migration:**
   ```bash
   npm run db:push
   ```
   
   (Agora lê .env.local automaticamente)

3. **Teste o projeto:**
   ```bash
   npm run dev
   ```

---

## ⚠️ Importante

- **Use os scripts do package.json** (`npm run db:push`) - eles já estão configurados
- **Não use `npx prisma@latest`** - pode instalar versão 7
- **Prisma 5.19.0 está fixado** no package.json
- **Scripts usam dotenv-cli** para ler .env.local automaticamente

---

**Use `npm run db:push` - está tudo configurado!**
