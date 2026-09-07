# CyberMercenaries

Marketing site for CyberMercenaries — web design, full-stack development,
cybersecurity consultancy, penetration testing, and VPS/migration services.

This is a **Phase 0 scaffold**, not the finished site. It's set up so it
builds and deploys cleanly from the first commit; every section gets built
out phase by phase per `BLUEPRINT.md`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config, tokens live in `src/app/globals.css`
- [Motion](https://motion.dev) (`motion/react`) for animation
- [Lucide](https://lucide.dev) for UI icons
- Deployed on [Vercel](https://vercel.com) (free/Hobby tier)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/            route segments — app/page.tsx is the homepage
  components/     UI components, built up phase by phase
  content/        site copy and pricing data — edit numbers/text here,
                  never inline in a component
  lib/            pricing logic, utilities
```

- `src/content/site.ts` — business info, nav, founders, services, work,
  testimonials, stats. Anything marked `PLACEHOLDER` needs real content
  before launch.
- `src/content/pricing.ts` — the numbers behind the interactive pricing
  configurator. `src/lib/pricing.ts` holds the type contract and the
  math; it should not need to change when you're just adjusting a price.

## Scripts

| Command         | What it does                          |
| ---------------- | -------------------------------------- |
| `npm run dev`     | local dev server with hot reload       |
| `npm run build`   | production build (run before deploying) |
| `npm run start`   | serve the production build locally     |
| `npm run lint`    | ESLint                                 |

## Deployment (Vercel free tier)

1. Push this repo to GitHub.
2. In Vercel, "Add New Project" → import the repo → framework preset
   auto-detects Next.js → Deploy. No config needed.
3. Every push to `main` redeploys automatically; pull requests get their
   own preview URL.
4. If you buy a custom domain, add it under Project → Settings → Domains.

See `BLUEPRINT.md` for the full build plan and the exact OpenCode prompt
for each phase.
