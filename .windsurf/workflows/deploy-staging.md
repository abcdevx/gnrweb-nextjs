---
description: Deploy to staging.goodnrowdy.com
---

Build the app locally and push to the staging branch, triggering cPanel auto-deploy to staging.goodnrowdy.com.

## Rules
- Always develop on `main`, never commit directly to `staging` or `prod`
- Never run `next build` on the server — build must happen locally
- The `.next/` build output is committed to the `staging` branch and synced to the server via rsync
- `.htaccess`, `node_modules`, and `.next/cache/` are never touched by this pipeline

## Steps

1. Ensure you are on the `main` branch and all changes are committed
```powershell
git status
```

// turbo
2. Run the staging deploy script from the project root
```powershell
.\scripts\build-deploy.ps1
```

3. Wait for the push to complete. cPanel will automatically pull and deploy via Git Version Control.

4. Verify the deploy succeeded at https://staging.goodnrowdy.com

## What the script does
- Switches to `staging` branch (creates it if needed)
- Merges latest `main` into `staging`
- ALWAYS runs `npm run build` locally — never skip this step
- Commits `.next/` output + any changed files
- Pushes `staging` to GitHub → triggers cPanel deploy

## IMPORTANT
The `.next/` build output MUST be freshly built and committed before every push.
Never push to staging or prod without running the build first.
The build-deploy.ps1 script handles this automatically — never bypass it with a raw `git push`.
