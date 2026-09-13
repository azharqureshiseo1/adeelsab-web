'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, STORAGE_KEY, dirFor, isLocale, resolve } from '@/lib/i18n';
import type { Copy, Locale } from '@/lib/i18n';

type LanguageContextValue = {
  locale: Locale;
  /** Resolves a copy entry for the active locale, falling back to English. */
  t: (entry: Copy) => string;
  setLocale: (next: Locale) => void;
  toggle: () => void;
  isUrdu: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Language state lives in React context and localStorage rather than the URL.
 * The site is a static export, so a routed locale would double every page; a
 * client-side toggle keeps the build flat and the deploy a plain folder of HTML.
 * English is what gets prerendered, which is also what search engines index.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Restore the stored preference after hydration. Reading during render would
  // mismatch the prerendered English HTML.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored) && stored !== DEFAULT_LOCALE) setLocaleState(stored);
    } catch {
      // Private browsing or blocked storage - English is a fine default.
    }
  }, []);

  // Keep the document element in step: screen readers and the Nastaliq face both
  // depend on lang/dir being correct, not just the visual direction.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dirFor(locale);
    root.classList.toggle('font-urdu', locale === 'ur');
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference simply will not persist.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      isUrdu: locale === 'ur',
      t: (entry: Copy) => resolve(entry, locale),
      setLocale,
      toggle: () => setLocale(locale === 'en' ? 'ur' : 'en'),
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useLanguage().t;
}
