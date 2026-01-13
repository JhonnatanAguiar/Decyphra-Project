#!/usr/bin/env node

/**
 * Script para limpar o diretório .next antes do build
 * Funciona em Windows, Linux e macOS
 * Resolve o problema EINVAL com links simbólicos no Windows/OneDrive
 */

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

function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  try {
    fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 3 });
    return true;
  } catch (error) {
    // Se falhar, tenta método alternativo
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
      log(`Aviso: Não foi possível remover ${dirPath}: ${err.message}`, 'yellow');
      return false;
    }
  }
}

function main() {
  log('=== Limpando diretório .next ===', 'cyan');
  
  const nextDir = path.join(process.cwd(), '.next');
  const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');

  // Remove .next
  if (removeDir(nextDir)) {
    log('Diretório .next removido!', 'green');
  } else {
    log('Diretório .next não encontrado.', 'yellow');
  }

  // Remove cache se existir
  if (fs.existsSync(cacheDir)) {
    if (removeDir(cacheDir)) {
      log('Cache do Next.js limpo!', 'green');
    }
  }

  log('Limpeza concluída!', 'green');
}

main();
