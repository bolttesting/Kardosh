# Deploy Kardosh Realty (Landing) on Vercel

This folder is a **standalone** Vite app. Deploy it in a **separate Git repo** from the Welcome / coming-soon site.

## 1. Create a new repository

Push **only** the contents of this `Landing/` directory (not the parent `Hously_VueJs` folder).

```bash
cd Landing
git init
git add .
git commit -m "Initial Kardosh Realty landing"
git remote add origin https://github.com/YOUR_ORG/kardosh-realty-landing.git
git push -u origin main
```

## 2. Import on Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import the new repo.
2. **Root Directory:** leave as `.` (repo root = this app).
3. Framework should auto-detect **Vite** (`vercel.json` is already set).
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`

## 3. Environment variables

In Vercel → **Settings → Environment Variables**, add:

| Variable | Where | Required |
|----------|--------|----------|
| `REELLY_API_KEY` | Production, Preview | Yes — off-plan data |
| `VITE_SUPABASE_URL` | Production, Preview | Yes — contact form |
| `VITE_SUPABASE_ANON_KEY` | Production, Preview | Yes — contact form |
| `VITE_APP_NAME` | All | Optional |
| `VITE_CONTACT_EMAIL` | All | Optional |
| `VITE_CONTACT_PHONE` | All | Optional |
| `VITE_HERO_YOUTUBE_URL` | All | Optional |
| `VITE_SOCIAL_*` | All | Optional |

Copy values from your local `.env`. **Do not** commit `.env` to Git.

`REELLY_API_KEY` has **no** `VITE_` prefix — it stays on the server via `api/reelly/[...path].js`.

## 4. Custom domain

Example split (adjust to your DNS):

| Site | Vercel project | Domain |
|------|----------------|--------|
| Welcome / coming soon | `kardosh-welcome` | `www.kardoshrealty.ae` or `comingsoon.kardoshrealty.ae` |
| **This landing app** | `kardosh-realty-landing` | `app.kardoshrealty.ae` or `kardoshrealty.ae` |

On the Welcome project, set `VITE_MAIN_SITE_URL` to your **production Landing URL** so “Enter site” links correctly.

## 5. Verify after deploy

- Home, `/off-plan`, `/grid-map`, `/developers` load Reelly data (not 404 on `/api/reelly/...`).
- `/contact` form submits (Supabase `leads` table).
- Deep links work, e.g. `/property-detail/123`, `/communities/dubai-marina`.

## Local dev

```bash
npm install
cp .env.example .env   # fill in keys
npm run dev            # http://localhost:5173
```

Local Reelly traffic uses the Vite proxy in `vite.config.js`; production uses `api/reelly/[...path].js` on Vercel.
