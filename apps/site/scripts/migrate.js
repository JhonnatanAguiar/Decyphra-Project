#!/usr/bin/env node
/**
 * Script wrapper para executar migrations do Prisma com .env.local
 * 
 * Uso:
 *   node scripts/migrate.js dev --name nome_da_migration
 *   node scripts/migrate.js deploy
 *   node scripts/migrate.js reset
 */

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

// Carregar .env.local manualmente
const envLocalPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
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
  console.log('✅ Variáveis de ambiente carregadas de .env.local\n')
} else {
  console.warn('⚠️  Arquivo .env.local não encontrado!')
  console.log('   Certifique-se de que o arquivo existe na raiz do projeto.\n')
}

// Verificar se DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  console.error('❌ ERRO: DATABASE_URL não encontrada!')
  console.log('\n📝 Verifique:')
  console.log('1. Arquivo .env.local existe na raiz do projeto')
  console.log('2. Contém a linha: DATABASE_URL="postgresql://..."')
  console.log('3. A connection string está entre aspas\n')
  process.exit(1)
}

// Pegar argumentos do comando (dev, deploy, reset, etc)
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('📝 Uso: node scripts/migrate.js <comando> [opções]')
  console.log('\nExemplos:')
  console.log('  node scripts/migrate.js dev --name add_analytics_models')
  console.log('  node scripts/migrate.js deploy')
  console.log('  node scripts/migrate.js reset\n')
  process.exit(1)
}

// Executar prisma migrate com os argumentos fornecidos
const prismaArgs = ['migrate', ...args]
console.log(`🚀 Executando: npx prisma ${prismaArgs.join(' ')}\n`)

const prismaProcess = spawn('npx', ['prisma', ...prismaArgs], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
})

prismaProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Migration falhou com código ${code}`)
    process.exit(code)
  } else {
    console.log('\n✅ Migration executada com sucesso!')
  }
})

prismaProcess.on('error', (err) => {
  console.error('❌ Erro ao executar migration:', err)
  process.exit(1)
})
