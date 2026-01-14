# Script para fazer commit das correções de warnings do ESLint
# Execute este script no diretório raiz do projeto

Write-Host "Verificando repositorio Git..." -ForegroundColor Cyan

# Verificar se estamos em um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "ERRO: Nao estamos em um repositorio Git!" -ForegroundColor Red
    Write-Host "   Certifique-se de executar este script no diretorio raiz do projeto." -ForegroundColor Yellow
    exit 1
}

Write-Host "OK: Repositorio Git encontrado" -ForegroundColor Green
Write-Host ""

# Mostrar status atual
Write-Host "Status atual:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Adicionar arquivos modificados
Write-Host "Adicionando arquivos modificados..." -ForegroundColor Cyan
git add apps/site/app/admin/contatos/ContactsManagementClient.tsx
git add apps/site/app/admin/leads/LeadsManagementClient.tsx
git add apps/site/app/admin/clientes/ClientsManagementClient.tsx
git add apps/site/app/admin/servicos/ServicesManagementClient.tsx
git add apps/site/app/api/v1/admin/auth/login/route.ts
git add apps/site/app/admin/login/page.tsx
git add apps/site/src/lib/utils/phone.ts

# Verificar o que foi adicionado
Write-Host ""
Write-Host "Arquivos adicionados ao stage:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Fazer commit
Write-Host "Criando commit..." -ForegroundColor Cyan
git commit -m "fix: remover imports e variaveis nao utilizadas conforme warnings do ESLint" -m "- Removidos imports nao utilizados (CardHeader, CardTitle, ícones) de componentes admin" -m "- Removido import prisma nao utilizado de login/route.ts" -m "- Removida variavel error nao utilizada de login/page.tsx" -m "- Removido tipo PhoneNumber nao utilizado de phone.ts"

if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: Commit criado com sucesso!" -ForegroundColor Green
    Write-Host ""
    
    # Perguntar se deseja fazer push
    $push = Read-Host "Deseja fazer push para o repositorio remoto? (S/N)"
    if ($push -eq "S" -or $push -eq "s" -or $push -eq "Y" -or $push -eq "y") {
        Write-Host "Fazendo push..." -ForegroundColor Cyan
        git push
        if ($LASTEXITCODE -eq 0) {
            Write-Host "OK: Push realizado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "AVISO: Push falhou. Verifique se ha upstream configurado." -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "ERRO: Erro ao criar commit!" -ForegroundColor Red
    exit 1
}
