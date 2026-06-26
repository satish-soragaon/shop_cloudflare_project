# BookStore — Full-Stack MVP on Cloudflare

An online bookstore built with **React + Cloudflare Workers + Cloudflare D1**, covering a complete user journey from registration to order confirmation.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Cloudflare Workers (TypeScript) |
| Database | Cloudflare D1 (SQLite) |
| Routing | React Router v7 |
| Forms | React Hook Form |

## Features

- User registration and email/password login
- Book catalog with search by title
- Shopping cart with session persistence
- Checkout form (name, address, phone)
- Order confirmation flow

## Project Structure

```
shop_cloudflare_project/
├── frontend/          # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
├── worker/            # Cloudflare Worker API
│   ├── src/index.ts
│   └── migrations/    # D1 SQL schema & seed
├── architecture.md
├── design.md
└── prd.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

```bash
npm install -g wrangler
wrangler login
```

### Run Locally

```bash
# Backend (Cloudflare Worker)
cd worker
npm install
npm run db:init    # initialise D1 schema
npm run db:seed    # seed sample books
npm run dev        # starts on localhost:8787

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev        # starts on localhost:5173
```

### Deploy to Cloudflare

```bash
# Deploy worker
cd worker
npm run db:init:remote
npm run db:seed:remote
npm run deploy

# Deploy frontend (static site)
cd frontend
npm run build
# Upload dist/ to Cloudflare Pages
```

## Data Model

| Table | Purpose |
|---|---|
| `users` | Auth and profile |
| `books` | Catalog |
| `orders` | Orders per user |
| `order_items` | Line items per order |

## License

MIT
