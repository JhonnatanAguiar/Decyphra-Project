#!/usr/bin/env node

/**
 * Script para executar Lighthouse audit
 * 
 * Executa auditoria de performance, acessibilidade, best practices e SEO
 * Gera relatório HTML e salva em .lighthouse/ directory
 * 
 * Requer: npm install -g lighthouse @lhci/cli
 * Ou: npx lighthouse (sem instalação global)
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const LIGHTHOUSE_DIR = path.join(process.cwd(), '.lighthouse')

// Garantir que o diretório existe
if (!fs.existsSync(LIGHTHOUSE_DIR)) {
  fs.mkdirSync(LIGHTHOUSE_DIR, { recursive: true })
}

// URL local (padrão Next.js dev server)
const DEFAULT_URL = process.env.SITE_URL || 'http://localhost:3000'
const URL = process.argv[2] || DEFAULT_URL

console.log('🔍 Iniciando Lighthouse audit...')
console.log(`📍 URL: ${URL}`)
console.log('⏳ Isso pode levar alguns minutos...\n')

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const outputPath = path.join(LIGHTHOUSE_DIR, `lighthouse-report-${timestamp}.html`)

try {
  // Executar Lighthouse
  const command = `npx lighthouse "${URL}" --output html --output-path "${outputPath}" --view --chrome-flags="--headless"`
  
  console.log(`Executando: ${command}\n`)
  execSync(command, { 
    stdio: 'inherit',
    env: { ...process.env }
  })

  console.log(`\n✅ Lighthouse audit concluído!`)
  console.log(`📄 Relatório salvo em: ${outputPath}`)
  
  // Tentar abrir o relatório automaticamente (opcional)
  if (process.platform === 'win32') {
    execSync(`start "" "${outputPath}"`, { stdio: 'ignore' })
  } else if (process.platform === 'darwin') {
    execSync(`open "${outputPath}"`, { stdio: 'ignore' })
  } else {
    execSync(`xdg-open "${outputPath}"`, { stdio: 'ignore' })
  }
  
} catch (error) {
  console.error('❌ Erro ao executar Lighthouse:', error.message)
  console.error('\n💡 Dicas:')
  console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)')
  console.error('   2. Instale o Lighthouse: npm install -g lighthouse')
  console.error('   3. Ou use: npx lighthouse (sem instalação)')
  process.exit(1)
}
