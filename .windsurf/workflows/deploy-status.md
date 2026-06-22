---
description: Check the current deploy status of all three environments
---

Shows commit, BUILD_ID, and HTTP status for all three environments at once, with a sync summary.

## Steps

// turbo
1. Run the status script
```powershell
.\scripts\pipeline-status.ps1
```

The output shows:
- LOCAL: current branch, commit, and last build ID
- STAGING: server commit, build ID, HTTP status
- PRODUCTION: server commit, build ID, HTTP status
- Sync summary: whether environments are in sync or which needs deploying
