# Good n' Rowdy — Website

Next.js frontend for goodnrowdy.com. Fetches live show and member data from the SoundCheck app. All static content (bio, hero text, nav, social links) is configured in `config/site.ts`.

## Stack

- **Framework**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Data**: SoundCheck API (shows + members)
- **Deployment**: Namecheap cPanel Node.js (standalone build)

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
SOUNDCHECK_API_URL=https://your-soundcheck-app.vercel.app
SOUNDCHECK_API_KEY=your_api_key_here
```

### 3. Run the dev server

```bash
npm run dev
```

---

## Deploying to Namecheap (staging.goodnrowdy.com)

### Prerequisites

- cPanel access to your Namecheap hosting account
- Namecheap Advanced DNS access for goodnrowdy.com
- Server IP: `66.29.137.46`

---

### Step 1 — Add DNS record

1. Log into [Namecheap](https://namecheap.com) → Manage `goodnrowdy.com` → **Advanced DNS**
2. Add a new **A Record**:
   - **Host:** `staging`
   - **Value:** `66.29.137.46`
   - **TTL:** Automatic
3. Save. DNS propagation takes 5–30 minutes.

---

### Step 2 — Create subdomain in cPanel

1. Log into cPanel → **Domains** → **Subdomains**
2. Create subdomain: `staging` under `goodnrowdy.com`
3. Note the **Document Root** path (e.g. `staging.goodnrowdy.com`)

---

### Step 3 — Build and package locally

```powershell
.\scripts\build-deploy.ps1
```

This creates a `deploy/` folder with everything needed.

---

### Step 4 — Upload to server

1. In cPanel → **File Manager**, navigate to the subdomain's document root
2. Upload all contents of your local `deploy/` folder there
   - Or use FTP with credentials from cPanel → **FTP Accounts**

---

### Step 5 — Set up Node.js App in cPanel

1. cPanel → **Software** → **Setup Node.js App**
2. Click **Create Application**
3. Fill in:
   - **Node.js version**: 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: your subdomain folder path (from Step 2)
   - **Application URL**: `staging.goodnrowdy.com`
   - **Application startup file**: `server.js`
4. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `SOUNDCHECK_API_URL` = `https://your-soundcheck-app.vercel.app`
   - `SOUNDCHECK_API_KEY` = `your_api_key_here`
5. Click **Create** then **Run NPM Install** if prompted
6. Click **Start App**

---

### Step 6 — Verify

Visit `https://staging.goodnrowdy.com` — the site should be live.

---

## Going Live (swapping goodnrowdy.com to this site)

When ready to replace WordPress:

1. In Namecheap Advanced DNS, update the root `@` A record to point to `66.29.137.46` (already does for WordPress, so IP won't change — you'll just update the cPanel Node.js app to handle the root domain instead)
2. In cPanel → Setup Node.js App, update the **Application URL** to `goodnrowdy.com`
3. In cPanel → Domains, point `goodnrowdy.com` to this app's directory instead of the WordPress `public_html`

---

## Content Configuration

All static content lives in `config/site.ts`. Edit that file to update:

- Band name, tagline, hero text
- Bio (short and full)
- Genre tags, location, formed year
- Social media links
- Nav items
- SEO metadata

Dynamic content (shows, band members) is managed inside SoundCheck and fetched automatically.
