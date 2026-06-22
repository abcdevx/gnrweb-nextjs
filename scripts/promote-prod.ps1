# promote-prod.ps1
# Promotes the current staging build to production by merging the 'staging'
# branch into 'prod' and pushing — which triggers cPanel's Git Version Control
# auto-deploy to goodnrowdy.com.
#
# Usage: .\scripts\promote-prod.ps1
#
# Prerequisites:
#   - staging branch has been deployed and tested (run deploy-staging.ps1 first)
#   - cPanel Git Version Control is set to track the 'prod' branch for
#     the goodnrowdy.com Node.js app

$ErrorActionPreference = "Stop"

# ── 1. Confirm the user tested staging ───────────────────────────────────────
Write-Host ""
Write-Host "*** PRODUCTION DEPLOY ***" -ForegroundColor Red
Write-Host "This will push the current staging build to goodnrowdy.com." -ForegroundColor Yellow
$confirm = Read-Host "Have you tested staging.goodnrowdy.com and confirmed it is ready? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Aborted. Deploy to staging first and test before promoting." -ForegroundColor Red
    exit 1
}

# ── 2. Switch to prod branch ──────────────────────────────────────────────────
Write-Host "Switching to prod branch..." -ForegroundColor Cyan
$prodExists = git branch --list "prod"
if ($prodExists) {
    git checkout prod
} else {
    git checkout -b prod
}

# ── 3. Merge staging into prod ────────────────────────────────────────────────
Write-Host "Merging staging into prod..." -ForegroundColor Cyan
git merge staging --no-edit

# ── 4. Overwrite .cpanel.yml to target production app root ───────────────────
Write-Host "Writing production .cpanel.yml..." -ForegroundColor Cyan
$cpanelProd = @"
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/goodsmux/goodnrowdy.com
    - /usr/bin/rsync -aq --delete --exclude='.git/' --exclude='node_modules/' --exclude='.next/cache/' . `$DEPLOYPATH
    - find `$DEPLOYPATH/.next -type d -exec chmod 755 {} \;
    - find `$DEPLOYPATH/.next -type f -exec chmod 644 {} \;
    - chmod 755 `$DEPLOYPATH
    - export HOME=/home/goodsmux
    - cd `$DEPLOYPATH && /home/goodsmux/nodevenv/goodnrowdy.com/20/bin/npm install --omit=dev
    - touch `$DEPLOYPATH/tmp/restart.txt
"@
Set-Content -Path ".cpanel.yml" -Value $cpanelProd -NoNewline

git add .cpanel.yml
git commit -m "chore(prod): set production deploy target"

# ── 5. Push prod to origin ────────────────────────────────────────────────────
Write-Host "Pushing prod branch to origin..." -ForegroundColor Cyan
git push origin prod

Write-Host ""
Write-Host "Done! cPanel will now auto-deploy to goodnrowdy.com." -ForegroundColor Green
Write-Host "Check cPanel > Git Version Control > Manage > Deploy to confirm." -ForegroundColor Yellow

# ── 6. Return to main for continued development ───────────────────────────────
git checkout main
Write-Host "Returned to main branch." -ForegroundColor Cyan
