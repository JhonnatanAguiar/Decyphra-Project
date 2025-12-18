/**
 * Script para criar .env.example se não existir
 * Execute: node scripts/create-env-example.js
 */

const fs = require('fs')
const path = require('path')

const envExamplePath = path.join(process.cwd(), '.env.example')
const envExampleContent = `# ============================================
# CONFIGURAÇÃO DO BANCO DE DADOS
# ============================================
# URL de conexão com PostgreSQL (Neon)
# Formato: postgresql://user:password@host/database?sslmode=require
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"

# ============================================
# CONFIGURAÇÃO DO RESEND (E-MAIL)
# ============================================
# Chave da API Resend para envio de e-mails
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"

# Secret do webhook do Resend (opcional, para validação de webhooks)
RESEND_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxx"

# E-mail remetente (deve ser um domínio verificado no Resend)
EMAIL_FROM="noreply@decyphra.com.br"

# E-mail destinatário (onde receberá os formulários de contato)
EMAIL_TO="jhonnatanaguiar@decyphra.com.br"

# ============================================
# CONFIGURAÇÃO DO NEXT.JS (Públicas)
# ============================================
# URL do site (usado em links e metadados)
NEXT_PUBLIC_SITE_URL="https://decyphra.com.br"

# Nome do site
NEXT_PUBLIC_SITE_NAME="Decyphra"

# Versão da API
NEXT_PUBLIC_API_VERSION="v1"
`

if (fs.existsSync(envExamplePath)) {
  console.log('✅ .env.example já existe!')
} else {
  fs.writeFileSync(envExamplePath, envExampleContent, 'utf8')
  console.log('✅ .env.example criado com sucesso!')
}

// Verificar se .env.local existe
const envLocalPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local existe!')
} else {
  console.log('⚠️  .env.local NÃO existe!')
  console.log('   Para criar, copie o .env.example:')
  console.log('   Copy-Item ".env.example" ".env.local"')
}

