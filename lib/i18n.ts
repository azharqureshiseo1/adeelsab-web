export type Locale = 'en' | 'ur';

/** Every user-facing string in content/site.ts has this shape. */
export type Copy = { en: string; ur: string };

export const LOCALES: Locale[] = ['en', 'ur'];
export const DEFAULT_LOCALE: Locale = 'en';
export const STORAGE_KEY = 'adeelsab.locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ur';
}

/**
 * Resolves a copy entry for a locale.
 *
 * Urdu strings that are still awaiting translation are written as an empty
 * string in content/site.ts. We fall back to English rather than rendering a
 * blank — and CONTENT-TODO.md tracks every one of them.
 */
export function resolve(entry: Copy, locale: Locale): string {
  if (locale === 'ur') {
    return entry.ur.trim().length > 0 ? entry.ur : entry.en;
  }
  return entry.en;
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ur' ? 'rtl' : 'ltr';
}
