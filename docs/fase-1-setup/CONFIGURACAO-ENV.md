# ⚙️ Configuração de Variáveis de Ambiente

## 📋 Arquivos de Ambiente

### `.env.local` (Você cria)
- **Localização:** Raiz do projeto
- **Uso:** Variáveis locais de desenvolvimento
- **Git:** ❌ NÃO commitado (está no .gitignore)
- **Conteúdo:** Suas credenciais e configurações locais

### `.env.example` (Template)
- **Localização:** Raiz do projeto
- **Uso:** Template de exemplo
- **Git:** ✅ Commitado
- **Conteúdo:** Estrutura sem valores sensíveis

---

## 🔧 Configuração do Prisma com .env.local

O Prisma por padrão lê o arquivo `.env`, mas o Next.js usa `.env.local`.

**Solução:** Usamos `dotenv-cli` nos scripts do Prisma para ler o `.env.local`.

### Scripts Configurados

```json
{
  "db:migrate": "dotenv -e .env.local -- prisma migrate dev",
  "db:push": "dotenv -e .env.local -- prisma db push",
  "db:studio": "dotenv -e .env.local -- prisma studio"
}
```

Isso garante que o Prisma leia o `.env.local` corretamente.

---

## 📝 Como Configurar

### Passo 1: Criar .env.local

Na raiz do projeto, crie o arquivo `.env.local`:

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Next.js
NEXT_PUBLIC_SITE_URL="https://decyphra.com.br"
NEXT_PUBLIC_SITE_NAME="Decyphra"
NEXT_PUBLIC_API_VERSION="v1"
```

### Passo 2: Adicionar Connection String do Neon

1. Acesse [console.neon.tech](https://console.neon.tech)
2. Selecione seu projeto
3. Vá em "Connection Details"
4. Copie a connection string
5. Cole no `.env.local` como `DATABASE_URL`

**Formato:**
```
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

---

## ✅ Verificar Configuração

### Testar se está funcionando:

```bash
# Gerar Prisma Client
npm run db:generate

# Testar conexão (deve funcionar agora)
npm run db:push
```

---

## 🔒 Segurança

- ✅ `.env.local` está no `.gitignore` (não será commitado)
- ✅ Nunca compartilhe o `.env.local`
- ✅ Use `.env.example` como template para outros desenvolvedores
- ✅ Em produção, configure variáveis no painel da Vercel

---

## 📚 Referências

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Prisma Environment Variables](https://www.prisma.io/docs/guides/environment-variables)
