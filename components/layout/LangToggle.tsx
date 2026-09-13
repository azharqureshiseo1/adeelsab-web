'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { common } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * The toggle reads the same in both directions: it always shows the language
 * you are switching TO, which is how bilingual users expect it to behave.
 */
export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      lang={locale === 'en' ? 'ur' : 'en'}
      aria-label={t(common.langToggleAria)}
      className={cn(
        'inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors',
        tone === 'dark'
          ? 'border-ink-700 text-ink-200 hover:border-ink-400 hover:text-white'
          : 'border-ink-200 text-ink-700 hover:border-ink-400 hover:text-ink-900',
      )}
    >
      <Languages aria-hidden strokeWidth={1.75} className="h-4 w-4" />
      <span className={locale === 'en' ? 'font-urdu' : undefined}>{t(common.langToggle)}</span>
    </button>
  );
}
