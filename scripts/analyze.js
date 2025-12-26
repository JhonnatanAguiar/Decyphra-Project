#!/usr/bin/env node

/**
 * Script para análise de bundle usando webpack-bundle-analyzer
 * Funciona em Windows, Linux e macOS
 * Define ANALYZE=true e executa o build
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
  log('=== Iniciando análise de bundle ===', 'cyan');
  log('Isso pode levar alguns minutos...', 'yellow');

  // Define a variável de ambiente ANALYZE=true
  process.env.ANALYZE = 'true';

  try {
    // Executa o build com análise
    log('Executando build com análise de bundle...', 'yellow');
    execSync('npx next build', {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: {
        ...process.env,
        ANALYZE: 'true',
      },
    });

    log('\n=== Análise concluída! ===', 'green');
    log('Relatórios disponíveis em:', 'cyan');
    log('  - Client bundle: .next/analyze/client.html', 'cyan');
    log('  - Server bundle: .next/analyze/server.html', 'cyan');
    
    // Tenta abrir o relatório no navegador (apenas se estiver no Windows)
    if (process.platform === 'win32') {
      const clientReportPath = path.join(process.cwd(), '.next', 'analyze', 'client.html');
      if (fs.existsSync(clientReportPath)) {
        log('\nAbrindo relatório no navegador...', 'yellow');
        try {
          execSync(`start "" "${clientReportPath}"`, { stdio: 'ignore' });
        } catch (error) {
          // Ignora erro se não conseguir abrir
        }
      }
    }

    process.exit(0);
  } catch (error) {
    log('\n=== Análise falhou! ===', 'red');
    log('Verifique se webpack-bundle-analyzer está instalado:', 'yellow');
    log('  npm install --save-dev webpack-bundle-analyzer', 'yellow');
    process.exit(error.status || 1);
  }
}

main();
