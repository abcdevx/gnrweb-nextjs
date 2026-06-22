param(
    [switch]$Force
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "*** PRODUCTION DEPLOY ***" -ForegroundColor Red
Write-Host "This will push the current build to goodnrowdy.com." -ForegroundColor Yellow
if ($Force) {
    Write-Host "Auto-confirmed via -Force flag." -ForegroundColor Yellow
} else {
    $confirm = Read-Host "Have you tested staging.goodnrowdy.com and confirmed it is ready? (yes/no)"
    if ($confirm -ne "yes") {
        Write-Host "Aborted." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Force-updating prod branch to match main..." -ForegroundColor Cyan
git branch -f prod main
git push origin prod --force

Write-Host "Pulling to production server..." -ForegroundColor Cyan
ssh gnr-hosting "cd /home/goodsmux/public_html/node_app && git fetch origin && git reset --hard origin/prod && rm -rf /home/goodsmux/public_html/node_app/.next/cache && rm -rf /home/goodsmux/lscache/* && ln -sfn /home/goodsmux/public_html/node_app/.next /home/goodsmux/public_html/_next && touch /home/goodsmux/public_html/tmp/restart.txt && sleep 5 && curl -s -o /dev/null -w 'HTTP %{http_code}' https://goodnrowdy.com"

Write-Host ""
Write-Host "Done! goodnrowdy.com is live." -ForegroundColor Green

git checkout main
Write-Host "Returned to main branch." -ForegroundColor Cyan
