#!/usr/bin/env node

/**
 * Script para testes automatizados de acessibilidade
 * 
 * Executa testes de acessibilidade usando pa11y (CLI)
 * Gera relatórios em diferentes formatos
 * 
 * Requer: npm install -g pa11y pa11y-ci
 * Ou: npx pa11y (sem instalação global)
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

// Páginas para testar
const pagesToTest = [
  { path: '', name: 'Home' },
  { path: '/servicos', name: 'Servicos' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/sobre', name: 'Sobre' },
  { path: '/depoimentos', name: 'Depoimentos' },
  { path: '/contato', name: 'Contato' },
  { path: '/servicos/desenvolvimento-web', name: 'DesenvolvimentoWeb' },
]

console.log('♿ Iniciando testes de acessibilidade...')
console.log(`📍 URL base: ${URL}`)
console.log('⏳ Isso pode levar alguns minutos...\n')

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const results = []

// Função para testar uma página
function testPage(page) {
  const fullUrl = `${URL}${page.path}`
  const reportPath = path.join(A11Y_DIR, `a11y-${page.name}-${timestamp}.json`)
  const htmlReportPath = path.join(A11Y_DIR, `a11y-${page.name}-${timestamp}.html`)

  console.log(`\n🔍 Testando: ${page.name} (${fullUrl})`)

  try {
    // Executar pa11y com padrão WCAG AA
    const command = `npx pa11y "${fullUrl}" --standard WCAG2AA --reporter json --reporter html`
    
    // Pa11y não suporta múltiplos reportes de uma vez, então fazemos JSON primeiro
    const jsonCommand = `npx pa11y "${fullUrl}" --standard WCAG2AA --reporter json > "${reportPath}" 2>&1`
    execSync(jsonCommand, { stdio: 'inherit' })

    // HTML report
    const htmlCommand = `npx pa11y "${fullUrl}" --standard WCAG2AA --reporter html > "${htmlReportPath}" 2>&1`
    execSync(htmlCommand, { stdio: 'inherit' })

    // Ler resultados JSON
    if (fs.existsSync(reportPath)) {
      const reportContent = fs.readFileSync(reportPath, 'utf8')
      try {
        const report = JSON.parse(reportContent)
        results.push({
          page: page.name,
          url: fullUrl,
          issues: report || [],
          count: Array.isArray(report) ? report.length : 0,
        })
        
        const issueCount = Array.isArray(report) ? report.length : 0
        if (issueCount === 0) {
          console.log(`  ✅ Nenhum problema encontrado`)
        } else {
          console.log(`  ⚠️  ${issueCount} problema(s) encontrado(s)`)
        }
      } catch (e) {
        console.log(`  ⚠️  Erro ao processar relatório JSON`)
      }
    }

  } catch (error) {
    console.error(`  ❌ Erro ao testar ${page.name}:`, error.message)
    results.push({
      page: page.name,
      url: fullUrl,
      error: error.message,
    })
  }
}

// Testar todas as páginas
pagesToTest.forEach(testPage)

// Gerar relatório resumido
const summaryPath = path.join(A11Y_DIR, `a11y-summary-${timestamp}.json`)
const summary = {
  timestamp: new Date().toISOString(),
  url: URL,
  pages: results,
  totalIssues: results.reduce((sum, r) => sum + (r.count || 0), 0),
  pagesWithIssues: results.filter(r => r.count > 0).length,
  pagesWithoutIssues: results.filter(r => r.count === 0).length,
}

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

console.log('\n' + '='.repeat(50))
console.log('📊 RESUMO DOS TESTES')
console.log('='.repeat(50))
console.log(`Total de páginas testadas: ${results.length}`)
console.log(`Páginas sem problemas: ${summary.pagesWithoutIssues}`)
console.log(`Páginas com problemas: ${summary.pagesWithIssues}`)
console.log(`Total de problemas encontrados: ${summary.totalIssues}`)
console.log(`\n📄 Relatórios salvos em: ${A11Y_DIR}`)
console.log(`📋 Resumo: ${summaryPath}`)

if (summary.totalIssues > 0) {
  console.log('\n⚠️  Alguns problemas foram encontrados. Revise os relatórios para detalhes.')
  console.log('💡 Dica: Execute os testes manualmente com screen readers para uma verificação completa.')
} else {
  console.log('\n✅ Nenhum problema encontrado nos testes automatizados!')
  console.log('💡 Dica: Execute testes manuais com screen readers para verificação completa.')
}
