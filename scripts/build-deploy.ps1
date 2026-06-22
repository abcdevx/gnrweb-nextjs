$ErrorActionPreference = "Stop"

$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    git checkout main
}

Write-Host "Building Next.js app..." -ForegroundColor Cyan
npm run build

Write-Host "Committing build output..." -ForegroundColor Cyan
git add .next/
git add -A

$status = git status --porcelain
if ($status) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -m "chore(staging): build deploy $timestamp"
}

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git branch -f staging main
git push origin main
git push origin staging --force

Write-Host "Pulling to staging server..." -ForegroundColor Cyan
ssh gnr-hosting "cd /home/goodsmux/staging.goodnrowdy.com && git fetch origin && git reset --hard origin/staging && rm -rf .next/cache && pkill -f 'staging.goodnrowdy.com' ; sleep 15 && curl -s -o /dev/null -w 'HTTP %{http_code}' https://staging.goodnrowdy.com"

Write-Host ""
Write-Host "Done! staging.goodnrowdy.com is live." -ForegroundColor Green
Write-Host "Check https://staging.goodnrowdy.com, then run: .\scripts\promote-prod.ps1" -ForegroundColor Yellow
