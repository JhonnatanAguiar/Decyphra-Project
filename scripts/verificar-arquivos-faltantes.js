/**
 * Script para verificar quais arquivos de configuração estão faltando
 * Execute: node scripts/verificar-arquivos-faltantes.js
 */

const fs = require('fs')
const path = require('path')

const rootDir = process.cwd()

// Lista de arquivos que DEVERIAM existir na raiz do projeto
const arquivosEsperados = [
  // Configuração Next.js
  'next.config.js',
  'next-env.d.ts',
  
  // TypeScript
  'tsconfig.json',
  
  // Tailwind CSS
  'tailwind.config.ts',
  
  // PostCSS
  'postcss.config.js',
  
  // ESLint
  '.eslintrc.json',
  
  // Prettier
  '.prettierrc',
  
  // Package
  'package.json',
  'package-lock.json',
  
  // Git
  '.gitignore',
  
  // Environment
  '.env.example',
  '.env.local', // Pode não existir, mas é esperado
  
  // Vitest
  'vitest.config.ts',
  
  // README
  'README.md',
]

console.log('🔍 Verificando arquivos de configuração...\n')

const arquivosFaltantes = []
const arquivosExistentes = []

arquivosEsperados.forEach(arquivo => {
  const caminhoCompleto = path.join(rootDir, arquivo)
  const existe = fs.existsSync(caminhoCompleto)
  
  if (existe) {
    arquivosExistentes.push(arquivo)
    console.log(`✅ ${arquivo}`)
  } else {
    arquivosFaltantes.push(arquivo)
    console.log(`❌ ${arquivo} - FALTANDO`)
  }
})

console.log('\n' + '='.repeat(50))
console.log(`\n📊 Resumo:`)
console.log(`✅ Arquivos encontrados: ${arquivosExistentes.length}`)
console.log(`❌ Arquivos faltando: ${arquivosFaltantes.length}`)

if (arquivosFaltantes.length > 0) {
  console.log(`\n⚠️  Arquivos que precisam ser criados/sincronizados:`)
  arquivosFaltantes.forEach(arquivo => {
    console.log(`   - ${arquivo}`)
  })
  
  console.log(`\n💡 Solução:`)
  console.log(`   1. Execute: git pull origin main`)
  console.log(`   2. Ou crie os arquivos manualmente`)
  console.log(`   3. Verifique se estão no .gitignore`)
} else {
  console.log(`\n🎉 Todos os arquivos de configuração estão presentes!`)
}

// Verificar também arquivos que podem estar no .gitignore mas são importantes
const arquivosOpcionais = ['.env.local']
console.log(`\n📝 Arquivos opcionais (podem não estar no Git):`)
arquivosOpcionais.forEach(arquivo => {
  const caminhoCompleto = path.join(rootDir, arquivo)
  const existe = fs.existsSync(caminhoCompleto)
  console.log(`   ${existe ? '✅' : '⚠️ '} ${arquivo} ${existe ? '(existe)' : '(não existe - crie se necessário)'}`)
})

