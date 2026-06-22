$ErrorActionPreference = "Stop"

$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Host "Switching to main branch..." -ForegroundColor Cyan
    git checkout main
}

Write-Host "Building Next.js app..." -ForegroundColor Cyan
npm run build

Write-Host "Committing build output to main..." -ForegroundColor Cyan
git add .next/
git add -A

$status = git status --porcelain
if ($status) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -m "chore(staging): build deploy $timestamp"
}

Write-Host "Force-updating staging to match main..." -ForegroundColor Cyan
git branch -f staging main
git push origin main
git push origin staging --force

Write-Host ""
Write-Host "Done! cPanel will now auto-deploy to staging.goodnrowdy.com." -ForegroundColor Green
Write-Host "Check staging.goodnrowdy.com to verify, then run: .\scripts\promote-prod.ps1" -ForegroundColor Yellow
