# Ledger — Frontend

React (Vite) + Tailwind v4 + Recharts. A freelance expense tracker styled after a paper accounting ledger.

## Local setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend URL
npm run dev
```

## Deploying free on Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), import the repo, set the root directory to `frontend`.
3. Framework preset: Vite. Build command `npm run build`, output directory `dist` (Vercel usually detects these automatically).
4. Add an environment variable: `VITE_API_URL` = your deployed backend URL (e.g. `https://ledger-api.onrender.com`).
5. Deploy.

Once both are live, update the backend's `CLIENT_ORIGIN` env var on Render to match your Vercel URL, and redeploy the backend so CORS allows requests from it.
