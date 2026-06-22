---
description: Start local dev server to preview the site at localhost:3000
---

Run the Next.js dev server locally on `main` for previewing changes before deploying to staging.

## Rules
- Always preview on localhost before pushing to staging
- Stay on the `main` branch for local development
- Local dev uses hot reload — no build step needed

## Steps

// turbo
1. Start the dev server
```powershell
npm run dev
```

2. Open http://localhost:3000 in your browser to preview

3. When satisfied, stop the server (Ctrl+C) and deploy to staging:
```powershell
.\scripts\build-deploy.ps1
```
