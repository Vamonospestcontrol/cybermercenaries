# CyberMercenaries — Build Blueprint

This is the build plan for the Next.js rebuild. Read the whole thing once
before starting Phase 0. Each phase below is a self-contained prompt you
paste into OpenCode inside this repo; OpenCode already has `AGENTS.md` for
stack/token rules, so phase prompts only state what's new.

## What's already decided for you (don't re-litigate mid-build)

- **Stack:** Next.js 16 (App Router, TS) + Tailwind v4 + `motion/react` +
  `lucide-react`, deployed on Vercel's free Hobby tier. Reasoning: Vercel
  and Next.js are made by the same team so zero-config deploy is
  guaranteed on the free tier; Tailwind v4 and Motion are both current
  (checked Sept 2026, not stale training-data defaults); this exact stack
  has by far the deepest training-data footprint of any current option,
  which matters a lot when the model doing the building is a free/weaker
  one.
- **Why not keep the vanilla HTML/CSS/JS site:** the old site's bugs were
  mostly a symptom of hand-rolled DOM state (scroll listeners, manual
  class toggling) — that's exactly what a component framework with real
  state removes, and it's a hard requirement for the pricing configurator
  below (that feature needs actual state, not more `querySelector` calls).
- **Design tokens** live in `src/app/globals.css` and are final for this
  build — see "Design plan" below for the reasoning, but don't re-derive
  them per phase.
- **Content contract:** `src/content/site.ts` (copy) and
  `src/content/pricing.ts` (the configurator's numbers) are the only place
  business facts live. Components read from them; they never get facts
  invented into them by a phase prompt.

## Two things to fix before this goes live (from the old site)

1. **The two testimonial quotes** attributed to WhyCrime's and Forensic
   Fusion's founders — if those are real quotes those clients actually
   gave you, get their sign-off in writing and put them back in via
   `testimonials` in `site.ts`. If they were placeholder copy, they need
   to stay out; a site with zero testimonials reads as more credible than
   one with quotes a client didn't actually say. `testimonials` is left
   empty on purpose — Phase 6 makes the section render nothing at all
   while it's empty, instead of showing a placeholder.
2. **The stats** ("4 projects delivered", "98% client satisfaction") —
   you have two real, well-documented projects (WhyCrime, Forensic
   Fusion). `site.stats` now shows only defensible numbers. Don't inflate
   them back before you have the volume to back them up.

## Design plan

**Concept:** a field studio run by people trained to investigate, not a
generic dev agency — the forensic-science background is a genuine
differentiator, lean into it in copy rather than writing typical "we
build amazing digital experiences" agency-speak.

**Color** (all in `globals.css`, generated as Tailwind utilities —
`bg-void`, `text-signal`, etc.):
| token | hex | use |
|---|---|---|
| `void` | `#0b0a08` | page background — warm near-black, not pure `#000` |
| `surface` / `surface-2` | `#151310` / `#1c1a15` | cards, panels, inputs |
| `line` / `line-strong` | `#2a2620` / `#3c362c` | hairlines only |
| `ink` / `ink-dim` / `ink-faint` | `#f5f2ea` / `#a8a196` / `#6b6459` | text |
| `signal` | `#ff6b1a` | the **one** accent — CTAs, active states, focus rings |
| `ok` | `#5eead4` | functional only (status dot) |
| `danger` | `#f8654f` | functional only (form errors) |

This deliberately isn't indigo-on-pure-black — that pairing is the most
common AI-generated SaaS default, and it's what the old site used. A
warm-graphite base with a single burnt-orange signal color is closer to a
tactical/hazard palette, which fits "mercenary" without borrowing anyone
else's brand color (it's not Riangle's red, not a generic Claude-orange).
**Don't add a second decorative accent color anywhere in the build.**

**Type:** Geist Sans for everything readable, Geist Mono for
labels/data/the hero clock — a genuine two-weight system, not an
afterthought monospace bolted on. No accenting single words in headlines,
no ALL-CAPS labels (use sentence case in the mono face instead — it still
reads as a technical label without shouting).

**Layout:** left-aligned throughout, hairline dividers between sections
instead of background-color blocking, generous vertical rhythm. Corner
"dossier" marks in the hero (top-left/top-right small mono labels) are
kept from the old design because they're doing real work here — one side
is a location label, the other is a live Agartala clock — not decoration.

**Principles:**
1. One orchestrated motion moment (the hero load) — not fade-up-on-scroll
   applied to every section.
2. Every number and every business fact comes from `src/content/`, never
   hardcoded in a component.
3. Nothing renders that isn't true yet (empty testimonials → no section,
   not a placeholder).
4. The pricing tool gives a range with a "final quote after a call"
   disclaimer, never a bare fixed number — protects your margin on scope
   you haven't actually seen yet.

## How to run the phases

1. One phase at a time, in order. Paste that phase's prompt into OpenCode
   in this repo — it already reads `AGENTS.md` for the rules that don't
   change per phase.
2. After OpenCode says it's done, run the phase's acceptance checklist
   yourself before committing — don't trust a "done" report you haven't
   verified with `npm run build`.
3. Commit with the given message, `git push`. Vercel (once connected in
   Phase 0) redeploys automatically on every push to `main`.
4. If a build/lint error comes back, open a fresh OpenCode prompt: *"Fix
   the failing error below, minimal change only, then re-run `npm run
   build`/`npm run lint`."* and paste the exact error. Don't layer more
   feature work on top of a broken build.
5. Bring phase reports back to me (screenshot or paste the report + any
   error output) for an audit — same as the Forensic Fusion workflow.
   Do this **every time** after Phase 4 (the pricing math) and Phase 9
   (the pre-launch content audit) even if nothing looked wrong; those two
   are the highest-cost phases to get wrong silently.

---

## Phase 0 — Bootstrap & first deploy (manual, no AI)

1. Unzip `cybermercenaries-base.zip` into `~/Documents/cybermercenaries`.
   Move the old `index.html` / `css/` / `js/` / `assets/` into an
   `_old-site/` subfolder first if you want them around for Phase 3 asset
   migration — don't delete them yet.
2. `cd cybermercenaries && npm install`
3. `npm run dev` → confirm `localhost:3000` shows the "build in progress"
   placeholder with no console errors.
4. `git init` (skip if this folder is already a repo), `git add -A`,
   `git commit -m "phase 0: bootstrap Next.js scaffold"`.
5. Push to a new GitHub repo:
   `git remote add origin <your-repo-url>`
   `git branch -M main`
   `git push -u origin main`
6. On vercel.com → **Add New Project** → import the repo → framework
   auto-detects Next.js → **Deploy**. No environment variables yet
   (Phase 7 adds one).
7. Confirm the `*.vercel.app` URL matches your local dev server.

---

## Phase 1 — Layout shell

**Prompt:**
> Build the site's layout shell.
> 1. `src/components/nav.tsx` — sticky header, `site.name` wordmark
>    linking to `/`, desktop links from `nav` in `src/content/site.ts`, a
>    mobile hamburger that opens a full-screen overlay with the same
>    links, and a subtle border/background change once scrolled past
>    ~40px. Client component.
> 2. `src/components/footer.tsx` — site name, the `mailto:` and WhatsApp
>    (`https://wa.me/${site.contact.whatsapp}`) links, and a geo line
>    built from `site.location` (city, state, lat/lng). One row desktop,
>    stacked mobile.
> 3. `src/components/section.tsx` — a `<Section id title>` wrapper that
>    renders the consistent `max-w-[var(--container-max)]` container +
>    padding + optional heading, so later sections don't repeat that
>    markup.
> 4. Update `src/app/page.tsx`: `<Nav />`, then one empty `<Section>` per
>    nav anchor (`services`, `pricing`, `work`, `about`, `contact` — just
>    the heading, no body yet), then `<Footer />`. Keep the Phase 0
>    placeholder hero text above the sections for now.
> 5. Stay inside `src/components/` and `page.tsx` only — don't touch
>    `globals.css`, `src/content/*`, or `src/lib/*`.

**Check before committing:** `npm run build` and `npm run lint` both
clean; every nav link scrolls to its section; mobile menu opens/closes;
footer shows real values from `site.ts`, not hardcoded strings.

**Commit:** `phase 1: layout shell (nav, footer, section wrapper)`

---

## Phase 2 — Hero

**Prompt:**
> Replace the placeholder hero in `page.tsx` with `src/components/hero.tsx`:
> 1. Two mono-font corner labels, sentence case (not caps): top-left
>    `"Field studio — {site.location.city}, {site.location.country}"`;
>    top-right a live Asia/Kolkata clock ticking every second — render a
>    static placeholder server-side and start the ticking `useEffect`
>    after mount so there's no hydration mismatch.
> 2. Headline = `site.tagline`, subline = `site.subline`.
> 3. Contact row (`mailto:` + WhatsApp from `site.contact`), an
>    "available for projects" status row with a `bg-ok` dot, and a
>    primary `bg-signal` button linking to `#contact` labeled "Start a
>    project".
> 4. A row of preview cards — map over `site.services`, one card each
>    (name + tagline only). Don't hardcode five separate JSX blocks.
> 5. Exactly one orchestrated entrance with `motion/react`: stagger
>    corner labels → headline → subline → contact row → preview cards.
>    Check `useReducedMotion` from `motion/react` and render everything
>    in its final state with no animation when it's true. No
>    scroll-triggered animation anywhere in this phase.

**Check:** build/lint clean; clock ticks with no hydration warning in the
console; reduced-motion (toggle it in devtools) shows the finished state
instantly; preview cards come from `site.services`.

**Commit:** `phase 2: hero with live clock and entrance animation`

---

## Phase 3 — Services

**Prompt:**
> Build `src/components/services.tsx`, rendered inside the `#services`
> `<Section>`.
> 1. One card per `site.services` entry: name, tagline, icon. Map each
>    service to a `lucide-react` icon in one `Record<ServiceKey,
>    LucideIcon>` object in the same file (suggested: `PenTool` web
>    design, `Code2` full-stack, `ServerCog` migration/VPS, `ShieldCheck`
>    cybersecurity consultancy, `Bug` penetration testing).
> 2. Responsive grid, 1/2/3 columns mobile/tablet/desktop. `border-line`
>    hairline, `bg-surface` background — flat, no drop-shadow SaaS-card
>    treatment.
> 3. A hover state (border shift to `border-line-strong`, or a slight
>    lift) is fine since it answers a user action. No scroll-reveal on
>    this grid.
>
> If real hand-drawn icons get migrated later from the old site's
> `assets/icons/*.svg`, swapping them in for the lucide placeholders is a
> fine follow-up — keep the same one-icon-per-service structure either way.

**Check:** 5 cards from `site.services`; icons render; responsive at
375/768/1440px.

**Commit:** `phase 3: services grid`

---

## Phase 4 — Pricing configurator (flagship feature)

The data and math already exist — `src/content/pricing.ts` (numbers) and
`src/lib/pricing.ts` (`ServicePricing` type, `computeEstimate()`,
`formatINR()`). This phase is UI only.

**Prompt:**
> Build `src/components/pricing-configurator.tsx` inside the `#pricing`
> `<Section>`.
> 1. A service picker — one control per entry in the `pricing` array
>    from `src/content/pricing.ts`, showing `service.name`. Selecting one
>    sets active service in `useState<ServiceKey>` (default: first
>    entry).
> 2. For the active service: `service.summary`, a checklist of
>    `service.baseIncludes`, then a toggle per `service.features`
>    (`feature.label` + `feature.description`). Track selected ids in
>    state; reset selection to empty whenever the active service changes.
> 3. Call `computeEstimate(activeService, selectedIds)` every render and
>    show `${formatINR(rangeLow)} – ${formatINR(rangeHigh)}`, plus — only
>    if `recurringTotal > 0` — a second line `+ ${formatINR(recurringTotal)}/month`.
>    Always show: "Starting estimate — final quote after a short scoping
>    call." Never present a single fixed number.
> 4. A CTA below the estimate: "Get an exact quote" scrolling to
>    `#contact`. Stretch goal only (skip if it's not falling into place
>    quickly): prefill a `wa.me` link with a text summary of the
>    selection instead of a plain scroll.
> 5. Animate the number and each toggle with `motion/react` on state
>    change — this is motion answering a user action, it's welcome here.
>
> Don't modify `src/content/pricing.ts` or `src/lib/pricing.ts`. If a
> number looks wrong, say so in the phase report instead of changing the
> source of truth yourself.

**Check:** switching service resets toggles; total updates live; spot-
check one combination by hand and note the check in the phase report;
recurring line only shows when > 0; disclaimer always visible; every
toggle reachable and operable by keyboard alone.

**Commit:** `phase 4: interactive pricing configurator`

*(Bring this phase's report to me before moving on — this is the feature
the whole site's value prop leans on.)*

---

## Phase 5 — Stats and Work

**Prompt:**
> 1. `src/components/stats.tsx` — three numbers from `site.stats`, big
>    figure + small label. Animated count-up with `motion/react` is a
>    nice-to-have, skip it if it adds real complexity.
> 2. `src/components/work.tsx` inside `#work` — one card per `site.work`
>    entry. There are only two real projects, so use a simple two-column
>    grid (stacked mobile) — **not** a horizontal scroll/carousel; that
>    pattern implies more items than exist. Each card: title, tags,
>    description. No screenshots exist yet — leave a plain `bg-surface-2`
>    block where an image would go rather than fabricating one.

**Check:** stats from `site.stats`, exactly 2 work cards, no carousel.

**Commit:** `phase 5: stats and work sections`

---

## Phase 6 — About + conditional testimonials

**Prompt:**
> 1. `src/components/about.tsx` for `#about`: two short paragraphs of
>    studio-positioning copy (you can write these — they're about the
>    studio, not a client claim), plus a two-up list from `site.founders`
>    (name, role, bio).
> 2. `src/components/testimonials.tsx`: if `testimonials` from
>    `src/content/site.ts` is empty, render nothing — don't mount the
>    component in `page.tsx` at all in that case, no "coming soon"
>    placeholder. Build the real card/list UI for when it has entries,
>    since it's empty on purpose right now.

**Check:** both founders render from real data; confirm in the browser's
DOM inspector (not just visually) that no testimonials markup exists
while the array is empty.

**Commit:** `phase 6: about section, conditional testimonials`

---

## Phase 7 — Contact

**Before running this phase:** sign up for a free form at
[formspree.io](https://formspree.io), get the form ID, add it to a local
`.env.local` (already gitignored) as `NEXT_PUBLIC_FORMSPREE_ID=...`.

**Prompt:**
> Build `src/components/contact.tsx` for `#contact`:
> 1. Form: name, email, phone (optional), message. Submit via `fetch`
>    POST (JSON) to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
>    with inline pending/success/error states — no page navigation on
>    submit. If the env var is unset, still render the form but show a
>    small inline note that submissions won't send yet; don't crash.
> 2. Alongside the form: `site.contact.email`, the WhatsApp link, and the
>    geo line (same data as the footer).
> 3. Client-side validation (required fields, email format) with
>    accessible inline errors (`aria-live="polite"`), as real React state.

**Check:** form works with no console errors when the env var is unset;
with it set, a real test submission lands in the Formspree dashboard.

**Commit:** `phase 7: contact form`

---

## Phase 8 — Motion & responsive polish pass

**Prompt:**
> Polish pass, not a rebuild:
> 1. Confirm only the hero has an orchestrated entrance — remove any
>    fade-up-on-scroll that crept into another section rather than tuning it.
> 2. Hover/focus states only where they answer an action (nav, buttons,
>    cards, toggles). Every interactive element needs a visible focus
>    ring — don't add `outline-none` anywhere without an equivalent
>    visible replacement.
> 3. Walk the page at 375px / 768px / 1440px; fix overflow, cramped touch
>    targets (<~40px), or overlapping text. Note fixes in the report.
> 4. Re-check with `prefers-reduced-motion` enabled: hero should render
>    instantly in its final state, nothing else should animate.

**Check:** report lists what was checked/fixed at each breakpoint.

**Commit:** `phase 8: motion and responsive polish pass`

---

## Phase 9 — Content & launch audit

**Prompt:**
> Don't write new creative copy this phase. Instead:
> 1. Grep `src/content/site.ts` and `src/content/pricing.ts` for every
>    `PLACEHOLDER`/`EDIT ME` marker; list each with file + line in the report.
> 2. Add `src/app/sitemap.ts` and `src/app/robots.ts` using Next.js's
>    built-in metadata file conventions.
> 3. Add `src/app/opengraph-image.tsx` using Next.js's `ImageResponse`,
>    built from the site name/tagline and existing color tokens only —
>    no fabricated photography.
> 4. Leave `favicon.ico` as-is unless a real logo file has been supplied;
>    note that in the report either way.
> 5. Confirm `metadata` in `src/app/layout.tsx` still matches real
>    content, and update `SITE_URL` if a domain has been bought.

**Check:** report lists every remaining placeholder; sitemap/robots/OG
image build correctly.

**Commit:** `phase 9: launch audit scaffolding (sitemap, robots, OG image)`

*(Bring this report to me too — it's the last checkpoint before real
business content goes live.)*

---

## Phase 10 — Final QA + production launch

Mostly manual:
1. Click through the Vercel preview end to end: every nav link, mobile
   menu, the pricing configurator through 2+ different services, the
   contact form, both founder bios, and confirm testimonials is still
   absent.
2. `npm run build` one final time locally, paste the full output into
   the report.
3. Push to `main` (Vercel promotes to production), tag the commit
   `v1.0.0`.

**Commit/tag:** `git commit -m "phase 10: v1.0.0 — production launch"`
then `git tag v1.0.0 && git push --tags`

---

## Appendix — asset migration (old vanilla site → this project)

The old site's `assets/icons/*.svg` and `assets/images/*.svg` weren't
part of what you uploaded to me (only `index.html`, `main.js`,
`style.css`, and a file-tree screenshot), so they're not in the new
scaffold. To bring them over: copy the old `assets/` folder into
`public/assets/` in the new project, then reference paths like
`/assets/icons/web-design.svg` from `<Image>`/`<img>` — Phase 3 already
gives you a lucide-icon fallback if you'd rather not migrate them.
