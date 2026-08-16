# Ledger — Backend

REST API for Ledger, a freelance expense tracker. Node.js, Express, MongoDB (Mongoose), JWT auth.

## Endpoints

- `POST /api/auth/register` — create account, returns token
- `POST /api/auth/login` — returns token
- `GET /api/expenses` — list current user's expenses (`?category=`, `?from=`, `?to=`)
- `GET /api/expenses/summary` — totals by category, by month, and overall
- `POST /api/expenses` — create an expense
- `PUT /api/expenses/:id` — update an expense
- `DELETE /api/expenses/:id` — delete an expense

All `/api/expenses` routes require `Authorization: Bearer <token>`.

## Local setup

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run dev
```

## Deploying free on Render

1. Push this repo to GitHub.
2. Create a free MongoDB Atlas cluster (atlas.mongodb.com) — free M0 tier. Create a database user, allow access from anywhere (0.0.0.0/0) for simplicity, and copy the connection string.
3. On [render.com](https://render.com), create a new **Web Service**, connect your GitHub repo, set the root directory to `backend`.
4. Build command: `npm install`. Start command: `npm start`.
5. Add environment variables in Render's dashboard: `MONGODB_URI`, `JWT_SECRET` (any long random string), `CLIENT_ORIGIN` (your deployed frontend URL, e.g. `https://your-app.vercel.app`).
6. Deploy. Note: Render's free tier spins down after 15 minutes of inactivity, so the first request after idle time takes ~30-50s to wake up.
