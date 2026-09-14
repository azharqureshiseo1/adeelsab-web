'use client';

import Image from 'next/image';
import { config } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Official regulator marks, shown as a trust signal beside the registration
 * details. A merchant has no way to judge AdeelSab itself, but recognises these
 * immediately — which is also why the registration number sits next to each one
 * rather than the logo standing alone.
 *
 * Both marks are dark artwork on transparency, so each sits on a white tile to
 * stay legible on the dark footer. Their aspect ratios differ sharply (SECP is
 * a tall crest, FBR a wide lockup), so height is fixed and width is left free.
 */
type Mark = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  /** Omitted entirely rather than shown as a placeholder when not yet on file. */
  value?: string;
};

export function RegistrationMarks({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const marks: Mark[] = [];

  if (config.legal.secp.trim()) {
    marks.push({
      src: '/trust/secp.png',
      width: 144,
      height: 160,
      alt: 'Securities and Exchange Commission of Pakistan',
      label: 'SECP Registered',
      value: config.legal.secp,
    });
  }

  marks.push({
    src: '/trust/fbr.png',
    width: 432,
    height: 160,
    alt: 'Federal Board of Revenue, Government of Pakistan',
    label: 'FBR Registered',
    // TODO: NTN. The label stands alone until the number is supplied — better
    // an absent number than an invented one a merchant could check and fail.
    value: config.legal.ntn.trim() || undefined,
  });

  if (marks.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap items-stretch gap-3', className)}>
      {marks.map((mark) => (
        <li
          key={mark.label}
          className={cn(
            'flex items-center gap-3 rounded-xl border px-3 py-2.5',
            tone === 'dark' ? 'border-ink-700 bg-ink-800' : 'border-ink-200 bg-white',
          )}
        >
          {/* White tile: both emblems are dark artwork and would disappear
              against the ink footer. */}
          <span className="flex h-12 shrink-0 items-center justify-center rounded-lg bg-white px-2.5">
            <Image
              src={mark.src}
              alt={mark.alt}
              width={mark.width}
              height={mark.height}
              className="h-9 w-auto object-contain"
            />
          </span>

          <div className="leading-tight">
            <p
              className={cn(
                'text-xs font-semibold',
                tone === 'dark' ? 'text-white' : 'text-ink-900',
              )}
            >
              {mark.label}
            </p>
            {mark.value ? (
              <p
                className={cn('tabular text-xs', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}
              >
                {mark.value}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
