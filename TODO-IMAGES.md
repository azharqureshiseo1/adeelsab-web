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

### Payment marks — ✅ official artwork in place

| File | Mark | Shown as |
|---|---|---|
| `public/partners/jazzcash.png` | JazzCash | Payout rail **and** checkout method |
| `public/partners/easypaisa.png` | Easypaisa | Payout rail **and** checkout method |
| `public/partners/stripe.png` | Stripe | Checkout only — see below |

`PartnerLogos` has two payment variants, kept apart deliberately:

- **`payouts`** (JazzCash, Easypaisa) — how a *seller receives* money. Used on
  `/payouts` and in the COD card on `/delivery`.
- **`checkout`** (Stripe + the wallets) — how a *buyer pays*. Used on
  `/how-it-works`.

Stripe never appears beside the payout rails, because it is not one — showing it
there would suggest sellers can be paid through it.

> ⚠️ **Confirm Stripe actually applies before launch.** Stripe does not onboard
> Pakistan-registered businesses, so unless card acceptance runs through a local
> gateway or an overseas entity, this mark should come out. See
> `CONTENT-TODO.md` item 27.

---

## 2b. Coverage map — ✅ real boundary data

`content/pakistan-outline.ts` is **generated**, not hand-drawn. The outline comes
from Natural Earth via world-atlas (public domain), projected to spherical
Mercator by `scripts/generate-coverage-map.py`. City pins are projected from
real latitude and longitude at render time, so adding a city or promoting one to
own-fleet is a data edit in `content/site.ts` and never a change to the SVG.

To regenerate:

```bash
curl -s -o countries-50m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json
python scripts/generate-coverage-map.py countries-50m.json
```

> ⚠️ **Have someone check the borders before launch.** The polygon includes
> Gilgit-Baltistan and Azad Kashmir, which is the depiction a Pakistani company
> would expect — but border rendering is sensitive here and is worth one pair of
> human eyes on the live page.

---

## 3. Photography — ✅ in place

| File | Used on |
|---|---|
| `seller-packing-order.webp` | Home hero |
| `merchant-wholesale-market.webp` | `/sell/local-sellers` hero |
| `adeelsab-rider.webp` | `/delivery` hero |
| `branded-packaging.webp` | `/founding-seller`, beside "what we need from you" |
| `team-office.webp` | `/about` and `/careers` |

All five are 1672×941 WebP, around 80–105 KB each, and every one is branded and
shot in a recognisably Pakistani setting — which is the point. The home hero is
the site's largest contentful paint, so it loads eagerly with an explicit
`sizes` hint.

> **One thing worth deciding.** These are rendered images, not photographs of
> the actual shop, riders, office or staff. On a site whose whole argument is
> "we publish the real number, including the ones you won't like", a rendered
> office is the visual equivalent of a claim that cannot be checked. It is a
> reasonable stand-in before launch; replacing the team and rider shots with
> real ones once the office and fleet exist would cost little and remove the
> gap. Your call.

### Still missing

- **Founder portrait** — the founder block was removed from the trust bar and
  `/about` rather than left as a placeholder. Add it back with a real name,
  face and one-line quote; merchants convert better when a named person stands
  behind a new platform.
- **Article images** — the Seller Hub pieces are still text only. Two would earn
  their place: a bad-vs-good photograph pair in
  `product-photography-with-a-phone`, and a packing sequence in
  `packaging-guide`.

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
