# Script para limpar o diretório .next antes do build
# Resolve o problema EINVAL com links simbólicos no Windows/OneDrive

$ErrorActionPreference = 'SilentlyContinue'

Write-Host "Limpando diretório .next..." -ForegroundColor Yellow

# Remove o diretório .next completamente
if (Test-Path ".next") {
    Get-ChildItem -Path ".next" -Recurse -Force | Remove-Item -Force -Recurse
    Remove-Item -Path ".next" -Force -Recurse
    Write-Host "Diretório .next removido com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Diretório .next não encontrado." -ForegroundColor Gray
}

# Limpa também o cache do Next.js se existir
if (Test-Path "node_modules\.cache") {
    Get-ChildItem -Path "node_modules\.cache" -Recurse -Force | Remove-Item -Force -Recurse
    Write-Host "Cache do Next.js limpo!" -ForegroundColor Green
}

Write-Host "Limpeza concluída!" -ForegroundColor Green

