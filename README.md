# Library Management System 2.0

A web app for running a library: a catalogue of books, authors, categories and publishers, plus member accounts, borrowing and returns, reservations, reviews, notifications and reports. It has two areas: an **admin** console for staff and a **user** portal for members.

Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript, Tailwind CSS, and [Supabase](https://supabase.com) (Postgres, Auth and SSR helpers). Prisma is set up for the database schema.

## Status

> 🚧 **Work in progress.**
>
> - **Admin console (`/admin`):** mostly done.
> - **Member portal (`/user`):** still in progress. Some pages may not be finished or may still use mock data.
> - **Before deploying:** remove the debug-session route and check that every page reads live data.

## Features

**Member portal (`/user`)**
- Dashboard and overview
- Browse and search books, view book details, and manage a wish list
- My borrows, borrow history and reading history
- Reservations, notifications and achievements
- Analytics, help and profile/settings pages

**Admin console (`/admin`)**
- Dashboard and analytics
- Manage books, inventory, authors, categories and publishers
- Book details with loans and inventory per copy
- Manage members and view member details
- Track borrows and reservations, and review reviews
- Send notifications, reports and settings

**Public and auth**
- Landing page
- Sign in and sign up pages, with a login, logout and session API

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS and shadcn/ui components
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- Prisma (`prisma/schema.prisma`) with a Postgres datasource
- Recharts for charts

## Project structure

```
src/
├── app/
│   ├── (auth)/       # Sign in and sign up
│   ├── (landing)/    # Public landing page
│   ├── admin/        # Admin console
│   ├── user/         # Member portal
│   └── api/          # Route handlers: auth, books, loans, users
├── components/       # Features, layout and shared UI components
├── context/          # React contexts (auth, theme, admin, user)
├── lib/              # Supabase clients and session middleware
├── mock/             # Mock data used by pages
└── utils/            # Auth and database helpers
prisma/schema.prisma  # Prisma schema
supabase/
├── migrations/       # SQL migrations, 001 to 017
└── seed*.sql         # Seed data
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

# Used by Prisma
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

Keep `.env.local` out of Git.

### 3. Set up the database

Run the SQL files in `supabase/migrations/` in order (001 to 017), then optionally load `supabase/seed.sql` and `supabase/seed_authors.sql`.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

## Notes

- `src/middleware.ts` refreshes the Supabase session on each request through `src/lib/middleware.ts`.
- Some pages still use mock data from `src/mock/`, so not every screen reads from the database yet.
- `src/app/api/debug-session/route.ts` exposes session information for debugging. Remove it before deploying to production.
- `AGENTS.md` and `CLAUDE.md` include notes for AI coding tools. The project uses a newer Next.js version, so check its docs in `node_modules/next/dist/docs/` before changing code.
