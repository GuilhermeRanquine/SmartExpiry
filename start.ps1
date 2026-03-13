Write-Host ""
Write-Host "===============================" -ForegroundColor DarkGray
Write-Host "   SmartExpiry - Dev Mode" -ForegroundColor Violet
Write-Host "===============================" -ForegroundColor DarkGray
Write-Host ""

# --- 1. Docker ---
Write-Host "Subindo banco de dados (Docker)..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\backend"
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker não iniciou. Verifique o Docker e tente novamente." -ForegroundColor Red
    exit 1
}

Write-Host "Banco de dados iniciado com sucesso!" -ForegroundColor Green
Write-Host ""

# --- 2. Backend ---
Write-Host "[2/3] Iniciando backend | FastAPI" -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PSScriptRoot\backend'; .\.venv\Scripts\Activate.ps1; uvicorn app.main:app --reload"
)
Write-Host "backend rodando em http://localhost:8000" -ForegroundColor Green
Write-Host ""

# --- 3. Frontend ---
Write-Host "[3/3] Iniciando frontend | React" -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PSScriptRoot\frontend'; npm run dev"
)
Write-Host "frontend rodando em http://localhost:5173" -ForegroundColor Green
Write-Host ""

# --- Resumo ---
Write-Host "Tudo no Ar! Acesse:"
Write-Host " Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host " Backend:  http://localhost:8000" -ForegroundColor Green
Write-Host ""