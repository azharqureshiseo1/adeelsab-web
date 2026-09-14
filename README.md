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
npm run build      # static export to out/, then copies the PHP endpoint in
npm run build:node # server build instead, for hosting that can run Node
npm start          # runs the server build (server.js)
npm run publish    # build + push the built site to the `deploy` branch
npm run lint
```

Two build targets, one codebase. Static is the default and runs on any shared
hosting. The Node target exists for a VPS and is documented in
[DEPLOY-NODE.md](./DEPLOY-NODE.md) — it is not needed today, since no page
renders per request.

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

Three routes, all landing the same static site in `public_html` — pick one in [DEPLOY.md](./DEPLOY.md):

| Route | Update with |
|---|---|
| **Hostinger Git deploy** | `npm run publish` — pushes the built site to the `deploy` branch, which Hostinger clones |
| **GitHub Actions over FTP** | `git push origin main` |
| **Manual zip upload** | Re-upload `out/` |

`main` holds source and is **not** servable on its own. Hostinger's shared hosting
clones a branch straight into the web root without building, which is why the
`deploy` branch exists: it is the finished site, `index.html` at its root.

The storage directory for leads must sit **outside** `public_html` — see
[DEPLOY.md](./DEPLOY.md), and verify it after the first deploy.
