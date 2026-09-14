# AdeelSab.com

The corporate and merchant-acquisition website for **AdeelSab**, a Pakistani multi-vendor marketplace that is built but **not yet launched**.

This is **not** the marketplace application. It has no catalogue, cart or checkout. It has two jobs:

1. Establish institutional credibility for a brand nobody has heard of.
2. Collect committed merchants onto a pre-launch waitlist before go-live.

The single metric it is instrumented against is **waitlist submissions**.

---

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

```bash
npm run build        # server build (the default) — what a host runs
npm start            # serves it, via server.js
npm run build:static # static export to out/ instead, for hosting without Node
npm run publish      # static build + push it to the `deploy` branch
npm run lint
```

**Two targets, one codebase.** Server is the default, because any panel that runs
`npm install && npm run build && npm start` must end up with something `npm
start` can serve. The static export is opt-in for hosting that cannot run Node.

The only thing that differs between them is the waitlist endpoint, and the
config picks it automatically:

| Target | Form posts to | Leads go to |
|---|---|---|
| Server | `/api/submit/` — a route handler | Email or webhook, via env vars |
| Static | `/api/submit.php` | A CSV outside the web root |

---

## Why it is built this way

### Static export

`next.config.mjs` sets `output: 'export'`. The build produces a plain folder of HTML, CSS and JS that runs on **any** Hostinger plan, including the cheapest shared hosting. There is no server process to keep alive.

The consequences are deliberate and must be respected:

- ❌ No API routes, Server Actions, middleware, ISR, or `next/image` optimisation
- ✅ All pages static; interactivity via React state only
- ✅ **The waitlist form posts to a small PHP endpoint** (`public/api/submit.php`) that ships alongside the static files. Hostinger runs PHP natively on every plan.

If the hosting ever moves to a VPS or Node plan, see [DEPLOY-NODE.md](./DEPLOY-NODE.md) — not used by default.

### Audience order: local sellers first

The catalogue is 100% third-party and the company holds **no inventory**. Resellers therefore cannot sell anything until local sellers have supplied stock. The site reflects that sequencing honestly:

| Priority | Audience | State |
|---|---|---|
| 1 | Local sellers & wholesalers | **Now onboarding** — deepest, most polished page |
| 2 | Resellers | **Waitlist** — the page says plainly that the catalogue is still being built |
| 3 | Dropshippers | **Phase 2** — stub page with email capture |

This ordering is load-bearing. Do not "fix" it. Sending resellers to an empty catalogue burns the channel permanently.

### No fabricated numbers

The platform is pre-launch: there are no users, orders, GMV or testimonials. The site never invents them. Instead of vanity metrics, the capability band shows what the business can actually do on day one — own fleet cities, courier partners, COD coverage, payout speed, Urdu support.

Where a real figure is not yet confirmed, the page shows a visible `TODO:` badge rather than a plausible-looking invented number. Every one is listed in [CONTENT-TODO.md](./CONTENT-TODO.md).

The Founding Seller counter is driven by a hand-updated constant, not a fake live counter.

### Nothing is buried

RTO charges, the full commission table, COD remittance and payout timelines are all stated openly, without signing up. In this market, silence on cost is read as concealment and costs more trust than the charge itself.

---

## Project structure

```
app/                    Routes. Each page.tsx is a server component that
                        exports metadata and renders a client `content.tsx`,
                        because the language toggle is client state.
components/
  layout/               Header, Footer, MobileNav, LangToggle, Container, Section
  ui/                   Button, Card, Badge, Input, Accordion, Table, Tabs
  blocks/               Page sections — Hero, ThreePaths, CapabilityBand,
                        CoverageMap, RateCard, WaitlistForm, CTABand, …
  Logo.tsx              Variant-switching logo (dark / orange PNG)
content/
  site.ts               ALL user-facing copy, EN + UR. Single source of truth.
  doc-meta.ts           Article metadata (kept apart so index pages stay light)
  pakistan-outline.ts   GENERATED map outline — see scripts/
  docs.ts               MDX body registry
  seller-hub/*.mdx      Seven guides
  blog/*.mdx            Three posts
lib/                    i18n, seo, analytics, geo (map projection), utils
public/brand/           Supplied logo artwork; source for every icon
public/api/submit.php   The waitlist endpoint
scripts/                Brand assets (favicon, icons, OG image, fleet lockup)
                        and the coverage-map outline generator
deploy/.htaccess        Uploaded to the server by hand, once
```

### Copy architecture

**Every user-facing string lives in `content/site.ts`** as `{ en, ur }`. There is no hardcoded copy in components. This makes an Urdu pass a data edit rather than a refactor, and means a figure like the payout timeline is corrected everywhere at once.

Language state is React context + `localStorage`, with no routing change — a routed locale would double every page in a static export. English is what gets prerendered and indexed.

Urdu sets `dir="rtl"` on `<html>`, applies **Noto Nastaliq Urdu**, and increases line-height to 2.0. Urdu is never rendered in a Latin sans face — that is the most visible failure on Pakistani sites.

---

## Design system

Tokens are defined in `@theme` in `app/globals.css`, sampled from the supplied logo.

| Token | Value | Use |
|---|---|---|
| `brand-500` | `#FB5301` | Primary — buttons, links, accents |
| `brand-600` | `#E63E00` | Hover, and body-size orange text on white |
| `ink-900` | `#101820` | Headings, dark section backgrounds |
| `ink-500` | `#566374` | Body text |

Rules that are enforced by convention, so please keep to them:

- **Orange is an accent, never a background.** No large flat-orange areas.
- The gradient is reserved for the logo mark, one decorative hero shape, stat numbers and primary button hover — **max three instances per page**.
- The header is always white with the dark logo. Dark bands use the orange logo.
- **No dark mode.** Out of scope.
- Animation is CSS only — transitions plus `IntersectionObserver` fade-in, disabled under `prefers-reduced-motion`. No animation library.

---

## Tech stack

Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 · lucide-react · `next/font/google` · MDX via `@next/mdx` · ESLint + Prettier · GA4 gated behind an env var.

No UI kit, no state manager, no animation library, no form library, no CMS SDK. Please ask before adding a dependency.

---

## Environment variables

Copy `.env.example` to `.env.local`. All are optional in development.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonical URLs, sitemap |
| `NEXT_PUBLIC_GA_ID` | Enables GA4. **Unset means no analytics code loads at all.** |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Defaults to `/api/submit.php` |

---

## Before launch

- [ ] [CONTENT-TODO.md](./CONTENT-TODO.md) — every placeholder figure, with the blocking ones marked
- [ ] [TODO-IMAGES.md](./TODO-IMAGES.md) — partner marks, regulator emblems and photography (brand artwork is done)
- [ ] Legal review of the three documents in `app/legal/`
- [ ] [DEPLOY.md](./DEPLOY.md) step 7 — in particular, confirm `leads.csv` is **not** downloadable

---

## Deployment

| Where | Guide | Update with |
|---|---|---|
| **Hostinger Web Apps** (Business+) | [DEPLOY-HOSTINGER-WEBAPP.md](./DEPLOY-HOSTINGER-WEBAPP.md) | `git push origin main` |
| Vercel or similar | [DEPLOY-HOSTINGER-WEBAPP.md](./DEPLOY-HOSTINGER-WEBAPP.md) — same settings, detected automatically | `git push origin main` |
| Shared hosting, no Node | [DEPLOY.md](./DEPLOY.md) | `npm run publish`, FTP, or a zip |
| A VPS you manage | [DEPLOY-NODE.md](./DEPLOY-NODE.md) | `git pull && npm run build && pm2 restart` |

For the static routes, the leads CSV must sit **outside** the web root — check
that after the first deploy, it is the one mistake that exposes every lead.
