# Ledger

A full-stack expense tracker for freelancers, styled after a paper accounting ledger book — dot-leader entry rows, tabular monospace figures, category and monthly breakdowns.

<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/dd4bb303-26e2-4862-b788-5c051754f069" />


**Stack:** React (Vite) + Tailwind v4 + Recharts on the frontend; Node.js + Express + MongoDB (Mongoose) + JWT auth on the backend.

## Structure

```
ledger/
  backend/    Express API — see backend/README.md
  frontend/   React app — see frontend/README.md
```

## Features

- Email/password auth with JWT
- Add, list, and delete expenses with category and date
- Dashboard with total spend, entry count, top category
- Category breakdown (bar chart) and monthly trend (line chart)
- Fully responsive

## Quick start (local)

```bash
# Terminal 1
cd backend && npm install && cp .env.example .env  # fill in MONGODB_URI, JWT_SECRET
npm run dev

# Terminal 2
cd frontend && npm install && cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## Deploying free

See `backend/README.md` (Render) and `frontend/README.md` (Vercel) for step-by-step instructions. Both have generous free tiers suitable for a portfolio project.
