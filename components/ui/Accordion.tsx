'use client';

import { ChevronDown } from 'lucide-react';
import { useT } from '@/components/layout/LanguageProvider';
import type { Faq } from '@/content/site';

/**
 * Built on native <details>, so it works before hydration and is keyboard and
 * screen-reader correct without any JavaScript of our own.
 */
export function Accordion({ items }: { items: Faq[] }) {
  const t = useT();

  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white">
      {items.map((item) => (
        <details key={item.q.en} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-start font-semibold text-ink-900 hover:bg-ink-050 md:p-6 [&::-webkit-details-marker]:hidden">
            <span>{t(item.q)}</span>
            <ChevronDown
              aria-hidden
              strokeWidth={1.75}
              className="h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 text-ink-500 md:px-6 md:pb-6">{t(item.a)}</div>
        </details>
      ))}
    </div>
  );
}
