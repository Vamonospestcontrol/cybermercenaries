# CyberMercenaries — conventions

## Stack (do not swap any of these)
- Next.js 16, App Router, TypeScript, `src/` directory
- Tailwind CSS v4 — config lives in `src/app/globals.css` under `@theme
  inline`. There is no `tailwind.config.js`. Never create one; add new
  design tokens as CSS custom properties in `globals.css` instead.
- `motion/react` for animation (current package name — if training data
  says `framer-motion`, that name still works but `motion` is correct
  going forward, don't downgrade or swap it).
- `lucide-react` for icons.
- `cn()` from `src/lib/utils.ts` for conditional/merged classNames.

## Design tokens — the only colors that exist
Use Tailwind utilities generated from these tokens (`bg-void`,
`text-ink`, `text-signal`, `border-line`, etc.) — never hardcode a hex
value in a component, never introduce a new color:
- `void` / `surface` / `surface-2` — backgrounds, darkest to lightest
- `line` / `line-strong` — hairline borders
- `ink` / `ink-dim` / `ink-faint` — text, primary to faintest
- `signal` — the one accent color (CTAs, active/selected states, focus rings)
- `ok` — status-dot green, functional use only
- `danger` — form/validation errors only

## Content rules
- All copy and data come from `src/content/site.ts` and
  `src/content/pricing.ts`. Never hardcode business copy, prices, or
  contact details inline in a component.
- `PLACEHOLDER`-marked content stays a visible placeholder (or gets
  omitted from render) until told otherwise. Never invent a testimonial,
  client quote, or stat and present it as real.
- `testimonials` is intentionally empty — if a section's design calls
  for it and the array is still empty, skip rendering that section
  entirely rather than filling it with invented quotes.

## Motion rules
- Respect `prefers-reduced-motion` on every animation added — check
  `useReducedMotion()` from `motion/react` and provide a real
  no-animation fallback, not just a shortened duration.
- Don't apply an identical scroll-reveal to literally everything —
  reveals should look like a deliberate system (see the reveal-system
  phase), not a default slapped on every div.

## Before reporting a phase done
1. `npm run build` — zero errors.
2. `npm run lint` — zero errors.
3. Page still renders with `testimonials` empty or any `content/*.ts`
   field missing — no crashes on placeholder data.
4. Every commit stays deployable to Vercel as-is.

## Pricing data rules
- Prices live only in `src/content/pricing.ts` as whole-number integers (INR rupees; USD dollars for hourly rates). Never store or hardcode formatted strings like "₹1,50,000".
- A source figure with a trailing "+" is `openEnded: true` on its range and renders with a "+".
- Price formatting and estimate math lives in `src/lib/pricing.ts`. `formatINR` and `computeEstimate` exist today; `formatUSD`, `formatRange`, `applyPremium`, `estimateRange` are added by the 2026 rate-card work. Components call these and never do price arithmetic themselves. INR uses en-IN grouping (₹1,50,000).
- The 2026 rate-card numbers are transcribed from the pricing guide as-is. Never round, merge, or "tidy" them.
- Once `RATE_SERVICE_MAP` exists, services without an entry in it keep their existing pricing path untouched.
