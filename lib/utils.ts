export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Formats a number as Pakistani Rupees, e.g. 12500 -> "Rs. 12,500". */
export function formatPkr(value: number, opts: { decimals?: number } = {}): string {
  const { decimals = 0 } = opts;
  if (!Number.isFinite(value)) return 'Rs. 0';
  return `Rs. ${value.toLocaleString('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Validates a Pakistani mobile number.
 * Accepts 03XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX and spaced/dashed variants.
 */
export function normalisePkPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, '').replace(/^\+/, '00');
  let local: string | null = null;

  if (/^03\d{9}$/.test(digits)) local = digits;
  else if (/^0092(3\d{9})$/.test(digits)) local = `0${digits.slice(4)}`;
  else if (/^92(3\d{9})$/.test(digits)) local = `0${digits.slice(2)}`;
  else if (/^3\d{9}$/.test(digits)) local = `0${digits}`;

  return local;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Rough reading time in minutes for a body of prose. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
