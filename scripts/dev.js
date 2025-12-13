#!/usr/bin/env node

/**
 * Script de dev multiplataforma que limpa o .next antes de iniciar o servidor
 * Funciona em Windows, Linux e macOS
 * Resolve o problema EINVAL com links simbólicos no Windows/OneDrive
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  try {
    fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 3 });
    return true;
  } catch (error) {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          removeDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(dirPath);
      return true;
    } catch (err) {
      return false;
    }
  }
}

function main() {
  log('=== Iniciando servidor de desenvolvimento ===', 'cyan');

  const nextDir = path.join(process.cwd(), '.next');
  const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');

  // Limpa o diretório .next
  log('Limpando diretório .next...', 'yellow');
  if (removeDir(nextDir)) {
    log('Diretório .next removido!', 'green');
  }

  // Limpa o cache se existir
  if (fs.existsSync(cacheDir)) {
    removeDir(cacheDir);
  }

  // Executa o servidor de desenvolvimento
  log('Iniciando servidor Next.js...', 'yellow');
  execSync('npx next dev', { stdio: 'inherit', cwd: process.cwd() });
}

main();
