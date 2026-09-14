"""
Generates the favicon, app icons and OG image from the supplied brand artwork.

Run after replacing anything in public/brand/:
    python scripts/generate-brand-assets.py

Sources (committed):
    public/brand/adeelsab-logo-dark.png    2170x725 RGBA  - wordmark, dark "Adeel"
    public/brand/adeelsab-logo-orange.png  2170x725 RGBA  - wordmark, all orange
    public/brand/mark.png                  square         - the "A" bag mark alone
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path

PUBLIC = Path("public")
BRAND = PUBLIC / "brand"
INK = (16, 24, 32)
ORANGE = (251, 83, 1)
WHITE = (255, 255, 255)


def trim_to_content(im: Image.Image, bg_tolerance: int = 12) -> Image.Image:
    """Crops away a flat background, whether it is transparent or near-white."""
    im = im.convert("RGBA")
    alpha = im.getchannel("A")
    if alpha.getextrema()[0] < 255:
        box = im.getbbox()
    else:
        # Flat opaque background: treat pixels close to the corner colour as bg.
        r, g, b, _ = im.getpixel((0, 0))
        mask = Image.new("L", im.size, 0)
        px_src, px_dst = im.load(), mask.load()
        for y in range(im.height):
            for x in range(im.width):
                pr, pg, pb, _ = px_src[x, y]
                if abs(pr - r) + abs(pg - g) + abs(pb - b) > bg_tolerance:
                    px_dst[x, y] = 255
        box = mask.getbbox()
    return im.crop(box) if box else im


def drop_flat_background(im: Image.Image, tolerance: int = 20) -> Image.Image:
    """Makes a near-white background transparent, for use on dark surfaces."""
    im = im.convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r > 255 - tolerance and g > 255 - tolerance and b > 255 - tolerance:
                px[x, y] = (r, g, b, 0)
    return im


def square_icon(mark: Image.Image, size: int, pad_ratio: float = 0.12,
                bg=WHITE, radius_ratio: float = 0.0) -> Image.Image:
    """Centres the mark on a square canvas with even padding."""
    canvas = Image.new("RGBA", (size, size), bg + (255,) if len(bg) == 3 else bg)

    pad = int(size * pad_ratio)
    inner = size - pad * 2
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)

    if radius_ratio:
        r = int(size * radius_ratio)
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=255)
        canvas.putalpha(mask)
    return canvas


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for name in ("segoeuib.ttf", "arialbd.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main() -> None:
    dark = Image.open(BRAND / "adeelsab-logo-dark.png").convert("RGBA")
    orange = Image.open(BRAND / "adeelsab-logo-orange.png").convert("RGBA")
    mark = trim_to_content(drop_flat_background(Image.open(BRAND / "mark.png")))

    # --- favicon: the bag mark only, never the wordmark -----------------------
    ico = square_icon(mark, 256, pad_ratio=0.06)
    ico.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    # --- PWA / Android icons --------------------------------------------------
    square_icon(mark, 192, pad_ratio=0.12).save(PUBLIC / "icon-192.png")
    square_icon(mark, 512, pad_ratio=0.12).save(PUBLIC / "icon-512.png")

    # Apple adds its own rounding, so ship a full-bleed white square.
    square_icon(mark, 180, pad_ratio=0.14).save(PUBLIC / "apple-touch-icon.png")

    # --- Open Graph card ------------------------------------------------------
    og = Image.new("RGBA", (1200, 630), INK + (255,))

    # Soft brand glow. Blurred, or the disc reads as a hard brown circle.
    glow = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([880, -180, 1400, 340], fill=ORANGE + (70,))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    og = Image.alpha_composite(og, glow)

    wordmark = orange.copy()
    wordmark.thumbnail((620, 620), Image.LANCZOS)
    og.paste(wordmark, (80, 150), wordmark)

    draw = ImageDraw.Draw(og)
    draw.text((84, 330), "Sell across Pakistan.", font=load_font(46), fill=WHITE)
    draw.text((84, 392), "We handle the rest.", font=load_font(46), fill=WHITE)
    draw.text((84, 486), "Founding Seller Program - now onboarding",
              font=load_font(26), fill=(124, 135, 151))
    draw.rounded_rectangle([84, 546, 444, 553], radius=4, fill=ORANGE)

    og.convert("RGB").save(PUBLIC / "og-image.png", quality=92)

    for f in ("favicon.ico", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "og-image.png"):
        p = PUBLIC / f
        print(f"  {f:<24} {p.stat().st_size // 1024:>4} KB")


if __name__ == "__main__":
    main()
