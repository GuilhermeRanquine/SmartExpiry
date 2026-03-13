# dev.ps1 — Ativa o ambiente de desenvolvimento rapidamente e faz eu não perder tempo com configurações e comandos repetitivos.

Write-Host ""
Write-Host "Iniciando ambiente de desenvolvimento..." -ForegroundColor Cyan

& "$PSScriptRoot\backend\.venv\Scripts\Activate.ps1"

Write-Host "Ambiente de desenvolvimento ativado!" -ForegroundColor Green
Write-Host "Para sair do ambiente, use o comando 'deactivate'." -ForegroundColor DarkGray
Write-Host ""