---
description: Promote staging to production (goodnrowdy.com)
---

Merge the current staging build into the `prod` branch and push, triggering cPanel auto-deploy to goodnrowdy.com.

## Rules
- Only run this AFTER deploying to staging and verifying staging.goodnrowdy.com looks correct
- Never push directly to `prod` — always promote from `staging`
- The `prod` branch gets a different `.cpanel.yml` (targets /home/goodsmux/public_html/node_app)
- After promotion the script returns you to `main`

## Steps

1. Confirm staging has been tested at https://staging.goodnrowdy.com

2. Run the promote script from the project root
```powershell
.\scripts\promote-prod.ps1
```

3. Type `yes` when prompted to confirm production deploy

4. Wait for push to complete. cPanel auto-deploys to goodnrowdy.com.

5. Verify production at https://goodnrowdy.com

## What the script does
- Asks for confirmation
- Switches to `prod` branch (creates it if needed)
- Merges `staging` into `prod`
- Overwrites `.cpanel.yml` to target `/home/goodsmux/public_html/node_app`
- Commits and pushes `prod` to GitHub → triggers cPanel deploy
- Returns to `main`
