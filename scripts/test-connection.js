/**
 * Script de teste para verificar conexão com o banco
 * Execute: node scripts/test-connection.js
 */

// Carregar .env.local manualmente (dotenv pode não estar instalado)
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
        process.env[key.trim()] = value
      }
    }
  })
}

const DATABASE_URL = process.env.DATABASE_URL

console.log('🔍 Diagnóstico de Conexão\n')

if (!DATABASE_URL) {
  console.error('❌ ERRO: DATABASE_URL não encontrada!')
  console.log('\n📝 Verifique:')
  console.log('1. Arquivo .env.local existe na raiz do projeto')
  console.log('2. Contém a linha: DATABASE_URL="postgresql://..."')
  console.log('3. A connection string está entre aspas')
  process.exit(1)
}

console.log('✅ DATABASE_URL encontrada')
console.log('📋 Formato:', DATABASE_URL.substring(0, 20) + '...')

// Verificar formato básico
if (!DATABASE_URL.startsWith('postgresql://')) {
  console.error('❌ ERRO: Connection string deve começar com postgresql://')
  process.exit(1)
}

if (!DATABASE_URL.includes('sslmode=require')) {
  console.warn('⚠️  AVISO: Connection string deve ter ?sslmode=require no final')
  console.log('   Adicione: ?sslmode=require no final da URL')
}

console.log('\n✅ Formato básico está correto!')
console.log('\n📝 Próximo passo:')
console.log('   Execute: npm run db:push')
