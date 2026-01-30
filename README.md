# Block Mapper
Block association lookup and communication tool built by the Crown Heights Care Collective to help neighbors in NYC (and beyond) find and stay in touch with their local block associations.

<https://blockmapper.org>

## What it does
- Interactive Leaflet map of verified block associations with boundaries and contact details.
- Address search to jump to your block.
- Public submission form for adding or updating a block association.
- Admin workflow (/admin) to review submissions, draw/edit block polygons, and publish updates.
- Supabase-backed authentication and data storage; deployed on Vercel with Supabase DB/Edge Functions.

## Tech stack
- Next.js (App Router) + React + TypeScript
- Supabase (auth, database, edge functions)
- Leaflet + react-leaflet (+ draw + geosearch)
- Tailwind CSS + shadcn/ui primitives

## Running locally
1) Clone the repo and install deps  
   `npm install` (or `pnpm install` / `yarn install`)
2) Copy `.env.example` to `.env.local` and fill the required variables (see below). Values come from the Block Mapper dev team.
3) Start dev server  
   `npm run dev`
4) Visit `http://localhost:3000` for the map; `http://localhost:3000/admin` is protected.

## Required environment variables (names only)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- Optional/infra: `VERCEL_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` (if your setup uses it)

> Need values or additional keys? Reach out to the Block Mapper devs.

## Admin access
- The admin UI lives at `/admin` and requires Supabase-authenticated access.  
- Account creation/role assignment is handled manually; contact the Block Mapper devs for credentials and setup steps.

## Scripts
- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` — production build
- `npm start` — run the compiled app
- `npm run lint` — lint the codebase

## Contributing
Community help is welcome—issues and PRs for accuracy, usability, accessibility, and mapping features are appreciated. Please coordinate with the Block Mapper devs before making data model changes.

## License
Licensed under the MIT License. See `LICENSE` for details.
