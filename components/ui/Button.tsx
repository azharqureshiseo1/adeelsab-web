import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

/**
 * Orange is an accent. `primary` is the only orange-filled control, and the
 * gradient appears on hover only - one of the three permitted instances.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white shadow-[0_1px_2px_rgba(16,24,32,.1)] hover:bg-brand-600 hover:shadow-[0_4px_14px_rgba(251,83,1,.28)] active:bg-brand-600',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:border-ink-400 hover:bg-ink-050',
  ghost: 'bg-transparent text-ink-900 border border-transparent hover:bg-ink-100',
  dark: 'bg-white text-ink-900 hover:bg-ink-100',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB855]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-5 text-base gap-2',
  lg: 'h-14 px-7 text-base md:text-lg gap-2.5',
};

const BASE =
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Stretch to the container width - used inside forms and cards. */
  block?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  block,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], block && 'w-full', className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  block,
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  const external = typeof href === 'string' && /^https?:/.test(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(BASE, VARIANTS[variant], SIZES[size], block && 'w-full', className)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], block && 'w-full', className)}
      {...props}
    />
  );
}
