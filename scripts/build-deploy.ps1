# deploy-staging.ps1
# Builds the Next.js app locally, commits the build output, and pushes to the
# 'staging' branch — which triggers cPanel's Git Version Control auto-deploy
# to staging.goodnrowdy.com.
#
# Usage: .\scripts\build-deploy.ps1
#
# Prerequisites:
#   - A 'staging' branch exists on origin (created by this script on first run)
#   - cPanel Git Version Control is set to track the 'staging' branch for
#     the staging.goodnrowdy.com Node.js app

$ErrorActionPreference = "Stop"

# ── 1. Ensure we are on the staging branch ───────────────────────────────────
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "staging") {
    Write-Host "Switching to staging branch..." -ForegroundColor Cyan
    $stagingExists = git branch --list "staging"
    if ($stagingExists) {
        git checkout staging
    } else {
        git checkout -b staging
    }
}

# ── 2. Merge latest from main so staging is up to date ───────────────────────
Write-Host "Merging latest main into staging..." -ForegroundColor Cyan
git merge main --no-edit

# ── 3. Build ──────────────────────────────────────────────────────────────────
Write-Host "Building Next.js app..." -ForegroundColor Cyan
npm run build

# ── 4. Stage build output and push ───────────────────────────────────────────
Write-Host "Staging build output for commit..." -ForegroundColor Cyan
git add .next/
git add -A

$status = git status --porcelain
if ($status) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -m "chore(staging): build deploy $timestamp"
    Write-Host "Pushing staging branch to origin..." -ForegroundColor Cyan
    git push origin staging
    Write-Host ""
    Write-Host "Done! cPanel will now auto-deploy to staging.goodnrowdy.com." -ForegroundColor Green
    Write-Host "Check cPanel > Git Version Control > Manage > Deploy to confirm." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "No changes to deploy — staging is already up to date." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "When staging looks good, run: .\scripts\promote-prod.ps1" -ForegroundColor Cyan
