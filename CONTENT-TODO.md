# Content TODO — every placeholder awaiting a real value

Nothing on this site fabricates a statistic. Where a real figure is not yet confirmed, the site shows a visible `TODO:` marker rather than a plausible-looking invented number. This file is the complete list of what has to be replaced before launch.

**Almost everything below lives in one file: [`content/site.ts`](./content/site.ts).** Search for `TODO:` across the repository to find the rest.

---

## Blocking — the site should not launch with these unresolved

These are the figures Pakistani merchants judge a platform on. A vague answer to any of them costs more trust than an unfavourable one.

| # | Item | Where | Currently |
|---|---|---|---|
| 1 | **Commission percentages by category** | `content/site.ts` → `commissions` | Ten placeholder rates (5–12%) |
| 2 | **RTO charge structure** | `app/delivery/content.tsx` → RTO card | `Rs. 120 per returned parcel` |
| 3 | **Weight-banded shipping rate card** | `content/site.ts` → `rateCard` | Six placeholder bands |
| 4 | **Payout timeline** | `content/site.ts` → `config.payout.days` | `7` days |
| 5 | **Minimum payout threshold** | `content/site.ts` → `config.payout.minimumPkr` | `Rs. 1,000` |
| 6 | **COD remittance schedule** | `content/site.ts` → `delivery.cod` | Follows the payout cycle |
| 7 | ~~SECP registration number~~ | `content/site.ts` → `config.legal.secp` | ✅ **0353167** |
| 8 | **NTN** | `content/site.ts` → `config.legal.ntn` | Empty. **The FBR mark and the NTN line stay hidden until this is filled in** — see below |
| 9 | ~~Registered legal entity name~~ | `content/site.ts` → `config.legal.entity` | ✅ **AdeelSab (Private) Limited** |
| 10 | **Physical office address** | `content/site.ts` → `config.contact.addressLines` | Three `TODO:` lines |
| 11 | **WhatsApp support number** | `content/site.ts` → `config.contact.whatsapp` | `923000000000` |

> ⚠️ Item 11 appears on **every page** via the floating WhatsApp button. Until it is real, that button opens a chat with a non-existent number. It is now the only contact number on the site — the placeholder landline was removed.

### Why the FBR mark is not showing yet

`RegistrationMarks` renders the FBR badge **only when `config.legal.ntn` is non-empty**. Showing a tax authority's emblem without a number behind it implies a registration a merchant can check and fail to verify, which costs more trust than the missing badge does. Put the NTN into `config.legal.ntn` and the FBR mark, the footer NTN line and the About-page NTN row all appear automatically — no code change.

---

## Important — needed before marketing spend starts

| # | Item | Where | Currently |
|---|---|---|---|
| 12 | Target launch date | `config.launchWindow` | `Launching Q1 2027` |
| 13 | Own-fleet cities at launch | `config.ownFleetCities` | Lahore, Karachi, Faisalabad |
| 14 | Founding Seller cap | `config.foundingSeller.cap` | `500` |
| 15 | Commission holiday length | `config.foundingSeller.commissionHolidayMonths` | `3` months |
| 16 | Registered merchant count | `config.foundingSeller.registered` | `0` — **hand-updated, never a live counter** |
| 17 | Support & business email addresses | `config.contact.supportEmail`, `businessEmail` | `support@` / `business@adeelsab.com` |
| 19 | Office hours | `config.contact.hours` | Mon–Sat, 10:00–19:00 PKT |
| 20 | Founder name, photo and one-line bio | `TrustBar.tsx`, `app/about/content.tsx` | `TODO: founder name` |
| 21 | ~~Social media handles~~ | `config.social` | ✅ Facebook, Instagram, TikTok, Threads (`adeelsab.pk`) |
| 22 | Delivery timelines | `content/site.ts` → `deliveryTimelines` | Placeholder, needs checking against courier SLAs |
| 23 | Open roles | `content/site.ts` → `openRoles` | Three plausible roles — confirm or empty the array |
| 24 | Mobile app at launch? | `config.mobileAppAtLaunch` | `false`. If true, footer and CTAs need app-store links |
| 25 | Notification email for leads | `public/api/submit.php` → `NOTIFY_EMAIL` | `leads@adeelsab.com` |
| 26 | Accelerated COD settlement? | — | **Not claimed anywhere on the site.** If PostEx or another partner permits faster payout than competitors, that belongs in the homepage headline — it is weighted more heavily than commission rate by most Pakistani merchants |

---

## Legal review

The three legal documents are **working drafts written for the pre-launch site** and have not been reviewed by a lawyer qualified in Pakistan. Each carries a visible notice saying so.

- `app/legal/privacy/page.tsx`
- `app/legal/terms/page.tsx`
- `app/legal/seller-agreement/page.tsx`

The Seller Agreement in particular states commercial terms (commission, RTO, holds, termination) that must match the final figures above and must be reviewed before any merchant signs it. **Remove the review notice only once that review has actually happened.**

---

## Urdu translations outstanding

Core interface copy, navigation, forms, errors and all page headings **are translated**. What remains is long-form article bodies.

| Article | Status |
|---|---|
| `seller-hub/getting-started` | ✅ Urdu complete |
| `seller-hub/product-photography-with-a-phone` | ✅ Urdu complete |
| `seller-hub/reducing-rto-in-cod` | ✅ Urdu complete |
| `seller-hub/how-to-list-products` | ❌ English only |
| `seller-hub/packaging-guide` | ❌ English only |
| `seller-hub/returns-and-disputes` | ❌ English only |
| `seller-hub/ntn-and-tax-basics` | ❌ English only |
| `blog/how-to-start-selling-online-in-pakistan` | ❌ English only |
| `blog/reselling-without-capital` | ❌ English only |
| `blog/dropshipping-in-pakistan` | ❌ English only |

Untranslated articles are **not silently served in English under an Urdu toggle** — the reader sees a notice in Urdu saying the translation is pending, then the English text.

To add one: create `<slug>.ur.mdx` alongside the English file, register it in `content/docs.ts`, and add `'ur'` to that article's `locales` array in `content/doc-meta.ts`.

A handful of short `note` fields in the commission table are also empty in both languages — search `content/site.ts` for `t('', '')`.

---

## Server configuration

| Item | Where | Note |
|---|---|---|
| `NOTIFY_EMAIL` | `public/api/submit.php` | Who receives lead notifications |
| `ALLOWED_ORIGIN` | `public/api/submit.php` | Must match the canonical host exactly, or the form is blocked by CORS |
| `STORAGE_DIR` | `public/api/submit.php` | **Must resolve outside `public_html`** |

> ⚠️ **The storage directory must be created manually outside `public_html` and chmod'd to 750** before the first submission. If `leads.csv` ends up inside the web root, every lead you have collected is downloadable by anyone who guesses the URL. Verify this after deploying — [DEPLOY.md](./DEPLOY.md) step 7 includes the check.

---

## How to update a figure

1. Change the value in `content/site.ts`.
2. Delete the `TODO:` comment above it.
3. Remove the corresponding `<TodoBadge />` from the component if the page renders one.
4. Tick the row off in this file.
5. `npm run build` and check the page.

Because every number flows from `content/site.ts`, updating one value corrects it everywhere it appears — the payout timeline alone renders on the home page, the capability band, the FAQ, `/payouts`, `/sell/local-sellers` and `/sell/resellers`.
