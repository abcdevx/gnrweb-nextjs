---
description: Check the current deploy status of all three environments
---

Shows what commit/build is live on localhost, staging, and production.

## Steps

// turbo
1. Check local branch and latest commit
```powershell
git log --oneline -1; git branch --show-current
```

// turbo
2. Check staging server commit and HTTP status
```powershell
ssh gnr-hosting "cd /home/goodsmux/staging.goodnrowdy.com && git log --oneline -1 && cat .next/BUILD_ID"
```

// turbo
3. Check production server commit and HTTP status
```powershell
ssh gnr-hosting "cd /home/goodsmux/public_html/node_app && git log --oneline -1 && cat .next/BUILD_ID"
```

// turbo
4. Check both sites are responding
```powershell
ssh gnr-hosting "curl -s -o /dev/null -w 'staging: %{http_code}' https://staging.goodnrowdy.com; echo ''; curl -s -o /dev/null -w 'production: %{http_code}' https://goodnrowdy.com"
```
