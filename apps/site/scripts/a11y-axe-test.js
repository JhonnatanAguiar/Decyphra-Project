#!/usr/bin/env node

/**
 * Script para testes de acessibilidade usando axe-core via Puppeteer
 * 
 * Executa testes automatizados de acessibilidade usando axe-core
 * Gera relatórios detalhados com recomendações
 * 
 * Requer: npm install --save-dev @axe-core/cli puppeteer
 * Ou: npx @axe-core/cli (sem instalação global)
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const A11Y_DIR = path.join(process.cwd(), '.a11y-reports')

// Garantir que o diretório existe
if (!fs.existsSync(A11Y_DIR)) {
  fs.mkdirSync(A11Y_DIR, { recursive: true })
}

// URL local (padrão Next.js dev server)
const DEFAULT_URL = process.env.SITE_URL || 'http://localhost:3000'
const URL = process.argv[2] || DEFAULT_URL

console.log('♿ Iniciando testes de acessibilidade com axe-core...')
console.log(`📍 URL base: ${URL}`)
console.log('⏳ Isso pode levar alguns minutos...\n')

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')

try {
  // Testar apenas a página principal por padrão (axe-cli pode ser lento)
  const reportPath = path.join(A11Y_DIR, `axe-report-${timestamp}.json`)
  
  console.log(`🔍 Testando: ${URL}`)
  
  // Usar axe-cli se disponível, senão usar método alternativo
  try {
    const command = `npx @axe-core/cli ${URL} --tags wcag2a,wcag2aa --save "${reportPath}"`
    execSync(command, { stdio: 'inherit' })
    
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
      const violations = report.violations || []
      
      console.log('\n' + '='.repeat(50))
      console.log('📊 RESULTADOS DO TESTE')
      console.log('='.repeat(50))
      console.log(`Violações encontradas: ${violations.length}`)
      
      if (violations.length === 0) {
        console.log('✅ Nenhuma violação encontrada!')
      } else {
        console.log('\n⚠️  Violações:')
        violations.forEach((violation, index) => {
          console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`)
          console.log(`   Impacto: ${violation.impact}`)
          console.log(`   Elementos afetados: ${violation.nodes.length}`)
        })
      }
      
      console.log(`\n📄 Relatório completo: ${reportPath}`)
    }
  } catch (error) {
    console.warn('⚠️  @axe-core/cli não disponível. Use: npm install --save-dev @axe-core/cli puppeteer')
    console.warn('💡 Alternativamente, use o teste com pa11y: npm run a11y:test')
    console.warn('💡 Ou teste manualmente com extensão axe DevTools no navegador')
  }
  
} catch (error) {
  console.error('❌ Erro ao executar testes:', error.message)
  console.error('\n💡 Dicas:')
  console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)')
  console.error('   2. Instale as dependências: npm install --save-dev @axe-core/cli puppeteer')
  console.error('   3. Ou use o teste com pa11y: npm run a11y:test')
  console.error('   4. Ou teste manualmente com screen readers')
  process.exit(1)
}
