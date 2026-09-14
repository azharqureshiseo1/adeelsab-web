# Image TODO — every shot needed

The brand artwork is real and in place. Everything else — photography, courier marks and regulator emblems — is still a labelled placeholder that renders cleanly, so nothing appears broken, but none of it should survive to launch.

**Rule: never ship generic Western stock photography.** The audience is a shop owner in Faisalabad. A stock photo of a smiling model in an American warehouse is worse than no photograph at all, because it signals that the site was assembled rather than built. Real merchants, real packaging, real riders, real streets.

---

## 1. Brand artwork — ✅ done

The supplied artwork is in place and wired up:

| File | Role |
|---|---|
| `public/brand/adeelsab-logo-dark.png` | 2170×725 RGBA — header and light sections |
| `public/brand/adeelsab-logo-orange.png` | 2170×725 RGBA — footer and dark bands |
| `public/brand/mark.png` | The square "A" bag mark — source for every icon |

Generated from `mark.png` and the orange wordmark by `scripts/generate-brand-assets.py`:

`favicon.ico` (16/32/48/64) · `icon-192.png` · `icon-512.png` · `apple-touch-icon.png` (180) · `og-image.png` (1200×630)

**If the brand artwork ever changes**, replace the files in `public/brand/` and re-run:

```bash
python scripts/generate-brand-assets.py
```

---

## 1b. Regulator marks — ✅ official artwork in place

| File | Source |
|---|---|
| `public/trust/secp.png` | Official SECP crest, trimmed and resized to 160px tall |
| `public/trust/fbr.png` | Official FBR lockup, trimmed and resized to 160px tall |

Both are transparent PNGs rendered on a white tile, since the artwork is dark
and sits on the ink-900 footer. They appear in the footer, the home-page trust
section and on `/about`.

> ⚠️ **Worth a sanity check with a lawyer or the regulators.** SECP and FBR
> emblems are government marks, not free-use logos. Displaying them as a
> registered entity is common practice in Pakistan, but confirm it is
> acceptable — the registration *number* alone carries most of the trust and
> carries no such question.

---

## 2. Courier and payment marks

### Couriers — ✅ official artwork in place

| File | Mark |
|---|---|
| `public/partners/tcs.png` | TCS |
| `public/partners/leopards.png` | Leopards Courier |
| `public/partners/postex.png` | PostEx |
| `public/partners/mp.png` | Muller & Phipps |

All four are trimmed transparent PNGs, 160px tall, shown greyscale with colour
on hover. Each carries an optical size class in `PartnerLogos.tsx` — locking
them all to one pixel height makes the wordmark-heavy ones read far larger than
the compact ones, so they are nudged to match apparent weight.

> ⚠️ **Get written permission before launch.** These are the single strongest
> credibility element on the site, which is exactly why displaying them without
> agreement is a real commercial risk. Ask when the courier terms are signed.

### Own fleet — ✅ generated

`public/partners/adeelsab-couriers-dark.png` and `-orange.png` are the
**AdeelSab Couriers** lockup, composed from the real wordmark by
`scripts/generate-brand-assets.py`. Naming the fleet turns a feature into a
capability in the reader's mind. Re-run the script if the brand artwork changes.

### Payment rails — still placeholders

| File | Needed | Currently |
|---|---|---|
| `public/partners/jazzcash.svg` | Official JazzCash logo | Neutral text placeholder |
| `public/partners/easypaisa.svg` | Official Easypaisa logo | Neutral text placeholder |

Shown on `/delivery` (COD section) and `/payouts`.

---

## 3. Photography

### Priority 1 — the hero

| File | Shot | Notes |
|---|---|---|
| `public/images/placeholder-hero.*` | **A real shop owner packing an order** | Portrait or 4:5, shot in a real shop or godown. Natural light. The person should be doing something, not posing at the camera. This is the first thing every visitor sees. |

### Priority 2 — trust and credibility

| File | Shot |
|---|---|
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
