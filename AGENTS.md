<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CyberMercenaries — project context

Read this whole file before starting any phase. Follow the phase prompt in
`BLUEPRINT.md` exactly — don't restructure files it doesn't mention, and
don't jump ahead to a later phase's work.

## Stack (do not swap any of these)

- Next.js 16, App Router, TypeScript, `src/` directory
- Tailwind CSS v4 — config lives in `src/app/globals.css` under `@theme
  inline`. There is no `tailwind.config.js`. Never create one; add new
  design tokens as CSS custom properties in `globals.css` instead.
- `motion/react` for animation (this is the current package — if your
  training data says `framer-motion`, that name still works but `motion`
  is correct going forward; don't downgrade or swap it).
- `lucide-react` for icons.
- `cn()` from `src/lib/utils.ts` for conditional/merged classNames.

## Design tokens — the only colors that exist

Use Tailwind utilities generated from these tokens (`bg-void`, `text-ink`,
`text-signal`, `border-line`, etc.) — never hardcode a hex value in a
component, and never introduce a new color. One accent only:

- `void` / `surface` / `surface-2` — backgrounds, darkest to lightest
- `line` / `line-strong` — hairline borders
- `ink` / `ink-dim` / `ink-faint` — text, primary to faintest
- `signal` — the one accent color (CTAs, active/selected states, focus rings)
- `ok` — status-dot green, functional use only (e.g. "available" indicator)
- `danger` — form/validation errors only

## Content rules

- All copy and data come from `src/content/site.ts` and
  `src/content/pricing.ts`. Components import from there — never hardcode
  business copy, prices, or contact details inline in a `.tsx` file.
- Anything already marked `PLACEHOLDER` in those files stays a visible
  placeholder (or gets omitted from the rendered page) until a phase
  prompt explicitly says real content has been supplied. Never invent a
  testimonial, a client quote, or a stat and mark it as real.
- `testimonials` is intentionally empty. If a phase's design calls for a
  testimonials section and the array is still empty, skip rendering that
  section rather than filling it with invented quotes.

## Motion rules

- One deliberate hero-load sequence, built with `motion/react`. Do not add
  a generic fade-and-slide-up to every section — that's the default that
  makes AI-built sites look the same. Scroll-triggered reveals, if used,
  should be reserved for 1–2 moments that matter, not applied uniformly.
- Respect `prefers-reduced-motion` — `globals.css` already disables
  animation duration globally when it's set; don't fight that in
  component code with inline animation overrides.

## Every phase, before you report done

1. `npm run build` must succeed with zero errors.
2. `npm run lint` must succeed with zero errors.
3. The page must still render if `testimonials` is empty or a
   `content/*.ts` field is missing — no crashes on placeholder data.
4. Don't leave an in-progress section that would make `next build` fail;
   every commit should be deployable to Vercel as-is.
