# Script de dev que limpa o .next antes de iniciar o servidor
# Resolve o problema EINVAL com links simbólicos no Windows/OneDrive

$ErrorActionPreference = 'SilentlyContinue'

Write-Host "=== Iniciando servidor de desenvolvimento ===" -ForegroundColor Cyan

# Limpa o diretório .next
Write-Host "Limpando diretório .next..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Get-ChildItem -Path ".next" -Recurse -Force | Remove-Item -Force -Recurse
    Remove-Item -Path ".next" -Force -Recurse
    Write-Host "Diretório .next removido!" -ForegroundColor Green
}

# Limpa o cache se existir
if (Test-Path "node_modules\.cache") {
    Get-ChildItem -Path "node_modules\.cache" -Recurse -Force | Remove-Item -Force -Recurse
}

# Executa o servidor de desenvolvimento
Write-Host "Iniciando servidor Next.js..." -ForegroundColor Yellow
npx next dev

