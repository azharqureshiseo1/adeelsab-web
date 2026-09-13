import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  /** `emphasis` adds the orange top border used on the Local Sellers card. */
  emphasis?: boolean;
  tone?: 'white' | 'muted' | 'tint' | 'dark';
  /** Lifts on hover - only for cards that are themselves links. */
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
  /** Anchor target, for cards deep-linked from other pages (e.g. /delivery#rto). */
  id?: string;
};

const TONES = {
  white: 'bg-white border-ink-200',
  muted: 'bg-ink-050 border-ink-200',
  tint: 'bg-brand-50 border-brand-100',
  dark: 'bg-ink-800 border-ink-700 text-ink-200',
} as const;

export function Card({
  children,
  className,
  emphasis = false,
  tone = 'white',
  interactive = false,
  as: Tag = 'div',
  id,
}: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative rounded-2xl border p-6 md:p-7',
        TONES[tone],
        emphasis
          ? 'shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)]'
          : 'shadow-[0_1px_3px_rgba(16,24,32,.06),0_8px_24px_rgba(16,24,32,.06)]',
        interactive && 'transition-shadow duration-200 hover:shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)]',
        emphasis && 'overflow-hidden',
        className,
      )}
    >
      {emphasis ? (
        <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
      ) : null}
      {children}
    </Tag>
  );
}
