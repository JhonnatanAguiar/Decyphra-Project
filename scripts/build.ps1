# Script de build que limpa o .next antes de construir
# Resolve o problema EINVAL com links simbólicos no Windows/OneDrive

$ErrorActionPreference = 'SilentlyContinue'

Write-Host "=== Iniciando build do projeto ===" -ForegroundColor Cyan

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

# Executa o build diretamente com next build para evitar loop
Write-Host "Executando build..." -ForegroundColor Yellow
npx next build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Build concluído com sucesso! ===" -ForegroundColor Green
} else {
    Write-Host "`n=== Build falhou! ===" -ForegroundColor Red
    exit $LASTEXITCODE
}

