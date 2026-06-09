# build-deploy.ps1
# Builds the Next.js app and assembles the deployment package.
#
# Usage: .\scripts\build-deploy.ps1
#
# Output: deploy/ folder ready to upload to cPanel via FTP or File Manager.

$ErrorActionPreference = "Stop"

Write-Host "Building Next.js app..." -ForegroundColor Cyan
npm run build

Write-Host "Assembling deploy package..." -ForegroundColor Cyan

# Clean old deploy folder
if (Test-Path "deploy") { Remove-Item -Recurse -Force "deploy" }
New-Item -ItemType Directory -Path "deploy" | Out-Null

# Copy built output
Copy-Item -Recurse -Force ".next" "deploy/.next"

# Copy source files needed by next start
Copy-Item -Recurse -Force "app" "deploy/app"
Copy-Item -Recurse -Force "config" "deploy/config"
Copy-Item -Recurse -Force "lib" "deploy/lib"
Copy-Item -Recurse -Force "types" "deploy/types"
Copy-Item -Recurse -Force "components" "deploy/components"
if (Test-Path "public") { Copy-Item -Recurse -Force "public" "deploy/public" }

# Copy config files
Copy-Item -Force "package.json" "deploy/package.json"
Copy-Item -Force "next.config.ts" "deploy/next.config.ts"
Copy-Item -Force "tsconfig.json" "deploy/tsconfig.json"
Copy-Item -Force "postcss.config.mjs" "deploy/postcss.config.mjs"
Copy-Item -Force ".env.local.example" "deploy/.env.local.example"
Copy-Item -Force "start.js" "deploy/start.js"

# node_modules is intentionally excluded — CloudLinux creates it via npm install in venv

Write-Host ""
Write-Host "Done! Upload the contents of the 'deploy/' folder to your cPanel subdomain directory." -ForegroundColor Green
Write-Host ""
Write-Host "Then in cPanel > Setup Node.js App:" -ForegroundColor Yellow
Write-Host "  - Node version: 20.x"
Write-Host "  - Application mode: Production"
Write-Host "  - Application root: staging.goodnrowdy.com"
Write-Host "  - Application startup file: start.js"
Write-Host "  - Environment variables: SOUNDCHECK_API_URL, SOUNDCHECK_API_KEY, NODE_ENV=production"
Write-Host "  - Click Run NPM Install, then Start App"
