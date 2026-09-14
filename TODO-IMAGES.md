# Image TODO — every shot needed

Every image on the site is currently a placeholder. They are SVG stand-ins that render cleanly and are labelled as placeholders, so nothing appears broken — but none of them should survive to launch.

**Rule: never ship generic Western stock photography.** The audience is a shop owner in Faisalabad. A stock photo of a smiling model in an American warehouse is worse than no photograph at all, because it signals that the site was assembled rather than built. Real merchants, real packaging, real riders, real streets.

---

## 1. Brand artwork — do this first

Two logo files were supplied but are not in the repository. The site currently uses **authored SVG stand-ins** that match the brand colours and the 2.99:1 aspect ratio but **do not reproduce the real wordmark**.

| File to add | Source | Used for |
|---|---|---|
| `public/brand/adeelsab-logo-dark.png` | The black wordmark + orange "Sab" version | Default. Header, light sections |
| `public/brand/adeelsab-logo-orange.png` | The all-orange version | Footer, dark CTA bands |

Both are 2170 × 725 px, RGBA with transparency.

**To swap them in:** drop the two PNGs into `public/brand/`, then change the two paths in the `SOURCES` map at the top of [`components/Logo.tsx`](./components/Logo.tsx) from `.svg` to `.png`. Nothing else needs touching — the aspect ratio is already identical, so no layout shifts.

### Also generate from the dark logo

| File | Spec | Currently |
|---|---|---|
| `public/favicon.ico` | 32×32, **crop to the "A" bag mark only**, not the wordmark | `icon.svg` stand-in |
| `public/icon-192.png` | 192×192, square, orange mark on white | `icon.svg` stand-in |
| `public/icon-512.png` | 512×512, square, orange mark on white | `icon.svg` stand-in |
| `public/apple-touch-icon.png` | 180×180 | `apple-touch-icon.svg` stand-in |
| `public/og-image.png` | 1200×630, `#101820` background + orange logo + tagline | `og-image.svg` stand-in |

> The OG image matters: **several social platforms do not render SVG previews**, so links shared on Facebook and WhatsApp will currently show no image. Replace `og-image.svg` with a real PNG and update `OG_IMAGE` in [`lib/seo.ts`](./lib/seo.ts).

After adding the PNGs, update the `icons` block in [`app/layout.tsx`](./app/layout.tsx).

---

## 2. Courier and payment partner marks

| File | Needed | Currently |
|---|---|---|
| `public/partners/tcs.svg` | Official TCS logo | Neutral text placeholder |
| `public/partners/leopards.svg` | Official Leopards Courier logo | Neutral text placeholder |
| `public/partners/postex.svg` | Official PostEx logo | Neutral text placeholder |
| `public/partners/jazzcash.svg` | Official JazzCash logo | Neutral text placeholder |
| `public/partners/easypaisa.svg` | Official Easypaisa logo | Neutral text placeholder |

> ⚠️ **Get written permission before displaying these.** They are the single strongest credibility element on the site — a merchant has no basis to judge AdeelSab but knows TCS instantly — which is exactly why using them without agreement is a real commercial risk. Ask when the commercial terms are being signed.

They appear on the home page and on `/delivery`, rendered in greyscale with colour on hover.

---

## 3. Photography

### Priority 1 — the hero

| File | Shot | Notes |
|---|---|---|
| `public/images/placeholder-hero.*` | **A real shop owner packing an order** | Portrait or 4:5, shot in a real shop or godown. Natural light. The person should be doing something, not posing at the camera. This is the first thing every visitor sees. |

### Priority 2 — trust and credibility

| File | Shot |
|---|---|
| `placeholder-founder.*` | Founder portrait. Plain background, natural light, approachable rather than corporate. Used on the home page trust bar and `/about`. |
| `placeholder-team.*` | The team in the actual Lahore office. Used on `/about` and `/careers`. Candid beats lined-up. |
| `placeholder-rider.*` | An AdeelSab rider with a branded box, on a real street. Used on `/delivery`. |

### Priority 3 — supporting

| File | Shot |
|---|---|
| `placeholder-merchant.*` | A merchant at their counter, ideally in a recognisable wholesale market |
| `placeholder-packaging.*` | Branded AdeelSab packaging, sealed and labelled. Doubles as reference for the packaging guide. |
| `placeholder-warehouse.*` | Sorting and dispatch, parcels being scanned or loaded |

### Article images

The Seller Hub articles are currently text-only. Two would benefit materially from illustration:

- **`product-photography-with-a-phone`** — a side-by-side of a bad photograph (yellow light, patterned bedsheet) and a good one (daylight, plain background) of the *same* product. This single image would teach more than the article does.
- **`packaging-guide`** — a sequence showing the three layers, and one of a correctly attached airway bill.

---

## Specifications

- **Format:** WebP with a JPEG fallback, or well-compressed JPEG. Images are served unoptimised (static export), so compress before committing.
- **Size:** hero under 200 KB, supporting images under 120 KB. The mobile LCP target is under 2.5 seconds on variable connectivity.
- **Dimensions:** supply at 2× the rendered size — hero at ~1760×1400, cards at ~1600×1200.
- **Aspect ratios:** keep the existing ones, or update `width`/`height` on the `<Image>` in the same commit. Mismatched dimensions cause layout shift, which the CLS budget (< 0.05) does not tolerate.
- **Alt text:** every image already has descriptive alt text in the component. Update it if the new photograph shows something different — alt text describing a photo you replaced is worse than none.

---

## Releases and consent

Get a written release from anybody identifiable in a photograph, particularly merchants and riders. It is a two-line form and it prevents a genuine problem later. Note where each photograph was taken and who is in it while you still remember.
