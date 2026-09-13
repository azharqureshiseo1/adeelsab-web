import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = {
  children: ReactNode;
  /** Background treatment. `dark` is the ink-900 band, used sparingly. */
  tone?: 'white' | 'muted' | 'tint' | 'dark';
  className?: string;
  containerClassName?: string;
  size?: 'default' | 'narrow' | 'wide';
  id?: string;
  /** Vertical rhythm. `tight` for stacked bands, `loose` for feature sections. */
  spacing?: 'tight' | 'default' | 'loose';
  as?: 'section' | 'div' | 'footer' | 'article';
};

const TONES = {
  white: 'bg-white',
  muted: 'bg-ink-050',
  tint: 'bg-brand-50',
  dark: 'bg-ink-900 text-ink-200',
} as const;

const SPACING = {
  tight: 'py-12 md:py-16',
  default: 'py-16 md:py-24',
  loose: 'py-20 md:py-32',
} as const;

export function Section({
  children,
  tone = 'white',
  className,
  containerClassName,
  size = 'default',
  id,
  spacing = 'default',
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={cn(TONES[tone], SPACING[spacing], className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}

/** Standard section heading block - eyebrow, title, optional sub. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: 'center' | 'start';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const dark = tone === 'dark';

  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-start')}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-sm font-semibold uppercase tracking-wide',
            dark ? 'text-brand-400' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag className={cn(Tag === 'h1' ? 't-h1' : 't-h2', dark && 'text-white')}>{title}</Tag>
      {sub ? (
        <p className={cn('mt-4 text-lg', dark ? 'text-ink-200' : 'text-ink-500')}>{sub}</p>
      ) : null}
    </div>
  );
}
