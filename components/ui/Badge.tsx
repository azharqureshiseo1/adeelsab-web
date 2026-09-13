import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'active' | 'waitlist' | 'soon' | 'neutral' | 'todo' | 'dark';

const TONES: Record<Tone, string> = {
  active: 'bg-brand-50 text-brand-600 border-brand-100',
  waitlist: 'bg-ink-100 text-ink-700 border-ink-200',
  soon: 'bg-white text-ink-400 border-ink-200',
  neutral: 'bg-ink-050 text-ink-500 border-ink-200',
  // Deliberately conspicuous: an unconfirmed figure should be visible, not hidden.
  todo: 'bg-[#FFF6E5] text-[#8A5A00] border-[#F2D9A8]',
  dark: 'bg-ink-800 text-ink-200 border-ink-700',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Small leading dot, used on status badges. */
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            tone === 'active' ? 'bg-brand-500' : 'bg-ink-400',
          )}
        />
      ) : null}
      {children}
    </span>
  );
}

/**
 * Marks a figure that has not yet been confirmed by the business.
 * Every instance is mirrored in CONTENT-TODO.md.
 */
export function TodoBadge({ children = 'TODO: confirm' }: { children?: ReactNode }) {
  return (
    <Badge tone="todo" className="ms-2 align-middle">
      {children}
    </Badge>
  );
}
