'use client';

import Image from 'next/image';
import { config } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Regulator marks shown as a trust signal alongside the registration details.
 *
 * The FBR mark is rendered only when an NTN is actually on file. Showing a tax
 * authority's emblem without a number behind it implies a registration the
 * company may not hold, which is exactly the kind of claim a merchant can check
 * — so it appears automatically the moment `config.legal.ntn` is filled in.
 *
 * TODO-IMAGES: both files are placeholder marks. Replace with official artwork
 * once permission to display each emblem is confirmed.
 */
export function RegistrationMarks({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const hasNtn = config.legal.ntn.trim().length > 0;

  const marks = [
    {
      src: '/trust/secp.svg',
      alt: 'Registered with the Securities and Exchange Commission of Pakistan',
      label: 'SECP Registered',
      value: config.legal.secp,
      show: config.legal.secp.trim().length > 0,
    },
    {
      src: '/trust/fbr.svg',
      alt: 'Registered with the Federal Board of Revenue',
      label: 'FBR Registered',
      value: config.legal.ntn,
      show: hasNtn,
    },
  ].filter((mark) => mark.show);

  if (marks.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {marks.map((mark) => (
        <li
          key={mark.label}
          className={cn(
            'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
            tone === 'dark' ? 'border-ink-700 bg-ink-800' : 'border-ink-200 bg-white',
          )}
        >
          <Image
            src={mark.src}
            alt={mark.alt}
            width={120}
            height={120}
            className="h-9 w-9 shrink-0 rounded"
          />
          <div className="leading-tight">
            <p
              className={cn(
                'text-xs font-semibold',
                tone === 'dark' ? 'text-white' : 'text-ink-900',
              )}
            >
              {mark.label}
            </p>
            <p className={cn('tabular text-xs', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
              {mark.value}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
