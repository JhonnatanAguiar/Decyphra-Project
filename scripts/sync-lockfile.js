#!/usr/bin/env node

/**
 * Script para sincronizar pnpm-lock.yaml com package.json
 * 
 * Este script garante que o lockfile está atualizado antes de commits/deploy
 * Execute: node scripts/sync-lockfile.js
 * 
 * Pode ser executado automaticamente via:
 * - Hook pre-commit (Git)
 * - Script npm: npm run sync-lockfile
 */

const { execSync, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function main() {
  log('🔄 Sincronizando pnpm-lock.yaml com package.json...\n', 'cyan')

  try {
    // Verificar se pnpm está disponível
    let pnpmAvailable = false
    try {
      execSync('pnpm --version', { stdio: 'ignore' })
      pnpmAvailable = true
    } catch {
      // Tentar com npx
      try {
        execSync('npx pnpm --version', { stdio: 'ignore' })
        pnpmAvailable = true
      } catch {
        log('❌ pnpm não está instalado ou não está no PATH', 'red')
        log('💡 Instale o pnpm: npm install -g pnpm', 'yellow')
        log('   Ou use npx: npx pnpm install --lockfile-only', 'yellow')
        process.exit(1)
      }
    }

    // Verificar se pnpm-lock.yaml existe
    const lockfilePath = path.join(process.cwd(), 'pnpm-lock.yaml')
    if (!fs.existsSync(lockfilePath)) {
      log('⚠️  pnpm-lock.yaml não encontrado. Criando...', 'yellow')
    }

    // Atualizar lockfile
    log('📦 Executando pnpm install --lockfile-only...', 'yellow')
    
    // Tentar com pnpm direto primeiro, depois com npx
    let command = 'pnpm install --lockfile-only'
    let result = spawnSync('pnpm', ['install', '--lockfile-only'], {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: true,
    })

    if (result.error || result.status !== 0) {
      log('⚠️  Tentando com npx pnpm...', 'yellow')
      result = spawnSync('npx', ['pnpm', 'install', '--lockfile-only'], {
        stdio: 'inherit',
        cwd: process.cwd(),
        shell: true,
      })
    }

    if (result.status === 0) {
      log('\n✅ pnpm-lock.yaml sincronizado com sucesso!', 'green')
      process.exit(0)
    } else {
      log('\n❌ Erro ao sincronizar lockfile', 'red')
      if (result.error) {
        log(`   ${result.error.message}`, 'red')
      }
      process.exit(1)
    }
  } catch (error) {
    log('\n❌ Erro ao sincronizar lockfile:', 'red')
    log(`   ${error.message}`, 'red')
    process.exit(1)
  }
}

main()
