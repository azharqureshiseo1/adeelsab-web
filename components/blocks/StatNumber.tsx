'use client';

import { useT } from '@/components/layout/LanguageProvider';
import { config, foundingSeller } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Registered-merchant counter.
 *
 * Driven by a hand-updated constant in content/site.ts. It is deliberately NOT
 * a live counter and deliberately not animated upward from zero: a fabricated
 * number here is the kind of thing merchants discover, and recovering from that
 * costs far more than the number was ever worth.
 */
export function FoundingCounter({ className }: { className?: string }) {
  const t = useT();
  const { registered, cap } = config.foundingSeller;
  const pct = cap > 0 ? Math.min(100, Math.round((registered / cap) * 100)) : 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_3px_rgba(16,24,32,.06),0_8px_24px_rgba(16,24,32,.06)]',
        className,
      )}
    >
      <p className="tabular text-4xl font-extrabold text-ink-900">
        <span className="text-brand-gradient">{registered}</span>
        <span className="text-ink-400"> {t(foundingSeller.counter.of)} </span>
        <span>{cap}</span>
      </p>
      <p className="mt-1 text-[15px] text-ink-500">{t(foundingSeller.counter.label)}</p>

      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink-100"
        role="progressbar"
        aria-valuenow={registered}
        aria-valuemin={0}
        aria-valuemax={cap}
        aria-label={t(foundingSeller.counter.label)}
      >
        <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Simple label-over-value stat used on light sections. */
export function StatNumber({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="tabular text-3xl font-extrabold text-ink-900 md:text-4xl">{value}</p>
      <p className="mt-1.5 text-[15px] text-ink-500">{label}</p>
    </div>
  );
}
