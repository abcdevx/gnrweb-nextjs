$ErrorActionPreference = "SilentlyContinue"

Write-Host ""
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host "  PIPELINE STATUS" -ForegroundColor White
Write-Host "========================================" -ForegroundColor DarkGray

# Local
$localCommit = git log --oneline -1
$localBranch = git rev-parse --abbrev-ref HEAD
$localBuildId = if (Test-Path ".next/BUILD_ID") { Get-Content ".next/BUILD_ID" } else { "not built" }
Write-Host ""
Write-Host "  LOCAL (main)" -ForegroundColor Cyan
Write-Host "  Branch  : $localBranch"
Write-Host "  Commit  : $localCommit"
Write-Host "  Build   : $localBuildId"

# Staging
Write-Host ""
Write-Host "  STAGING (staging.goodnrowdy.com)" -ForegroundColor Yellow
$stagingInfo = ssh gnr-hosting "cd /home/goodsmux/staging.goodnrowdy.com && echo COMMIT:`$(git log --oneline -1) && echo BUILD:`$(cat .next/BUILD_ID) && echo HTTP:`$(curl -s -o /dev/null -w '%{http_code}' https://staging.goodnrowdy.com)"
$stagingInfo | ForEach-Object {
    if ($_ -match "^COMMIT:(.*)") { Write-Host "  Commit  : $($Matches[1])" }
    if ($_ -match "^BUILD:(.*)") {  Write-Host "  Build   : $($Matches[1])" }
    if ($_ -match "^HTTP:(.*)") {   Write-Host "  HTTP    : $($Matches[1])" }
}

# Production
Write-Host ""
Write-Host "  PRODUCTION (goodnrowdy.com)" -ForegroundColor Green
$prodInfo = ssh gnr-hosting "cd /home/goodsmux/public_html/node_app && echo COMMIT:`$(git log --oneline -1) && echo BUILD:`$(cat .next/BUILD_ID) && echo HTTP:`$(curl -s -o /dev/null -w '%{http_code}' https://goodnrowdy.com)"
$prodInfo | ForEach-Object {
    if ($_ -match "^COMMIT:(.*)") { Write-Host "  Commit  : $($Matches[1])" }
    if ($_ -match "^BUILD:(.*)") {  Write-Host "  Build   : $($Matches[1])" }
    if ($_ -match "^HTTP:(.*)") {   Write-Host "  HTTP    : $($Matches[1])" }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor DarkGray

# Sync check
$stagingBuild = ($stagingInfo | Where-Object { $_ -match "^BUILD:(.*)" } | ForEach-Object { $Matches[1] })
$prodBuild    = ($prodInfo    | Where-Object { $_ -match "^BUILD:(.*)" } | ForEach-Object { $Matches[1] })

if ($localBuildId -ne "not built" -and $localBuildId -eq $stagingBuild -and $stagingBuild -eq $prodBuild) {
    Write-Host "  All environments in sync" -ForegroundColor Green
} elseif ($stagingBuild -eq $prodBuild) {
    Write-Host "  Local has unpushed changes" -ForegroundColor Yellow
} elseif ($localBuildId -eq $stagingBuild) {
    Write-Host "  Staging ahead of production - run promote-prod.ps1 to promote" -ForegroundColor Yellow
} else {
    Write-Host "  Environments out of sync" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host ""
