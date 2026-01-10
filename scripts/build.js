#!/usr/bin/env node

/**
 * Script de build multiplataforma que limpa o .next antes de construir
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
  log('=== Iniciando build do projeto ===', 'cyan');

  // Sincronizar lockfile antes do build (apenas em ambiente local, não na Vercel)
  // Na Vercel, o installCommand já faz isso com --no-frozen-lockfile
  if (!process.env.VERCEL && !process.env.CI) {
    try {
      log('Verificando sincronização do lockfile...', 'yellow');
      // Verificar se pnpm está disponível antes de tentar sincronizar
      try {
        execSync('pnpm --version', { stdio: 'ignore' });
        log('Sincronizando pnpm-lock.yaml...', 'yellow');
        execSync('pnpm install --lockfile-only', { stdio: 'inherit', cwd: process.cwd() });
        log('Lockfile sincronizado!', 'green');
      } catch (pnpmError) {
        log('Aviso: pnpm não disponível, pulando sincronização de lockfile', 'yellow');
      }
    } catch (error) {
      log(`Aviso: Erro ao sincronizar lockfile: ${error.message}`, 'yellow');
      // Não falha o build por causa disso
    }
  }

  const nextDir = path.join(process.cwd(), '.next');
  const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');

  // Limpa o diretório .next
  log('Limpando diretório .next...', 'yellow');
  if (removeDir(nextDir)) {
    log('Diretório .next removido!', 'green');
  } else {
    log('Diretório .next não encontrado.', 'yellow');
  }

  // Limpa o cache se existir
  if (fs.existsSync(cacheDir)) {
    if (removeDir(cacheDir)) {
      log('Cache do Next.js limpo!', 'green');
    }
  }

  // Executa o build
  log('Executando build...', 'yellow');
  try {
    execSync('npx next build', { stdio: 'inherit', cwd: process.cwd() });
    log('\n=== Build concluído com sucesso! ===', 'green');
    process.exit(0);
  } catch (error) {
    log('\n=== Build falhou! ===', 'red');
    process.exit(error.status || 1);
  }
}

main();
