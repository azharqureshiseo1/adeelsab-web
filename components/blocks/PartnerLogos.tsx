'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * TODO-IMAGES: these are neutral placeholder marks. Replace with the couriers'
 * official logos once written permission to display them is confirmed.
 *
 * These marks are the strongest credibility element on the site: a merchant has
 * no basis on which to judge AdeelSab, but every one of them already knows TCS.
 */
const PARTNERS = [
  { name: 'TCS', src: '/partners/tcs.svg' },
  { name: 'Leopards Courier', src: '/partners/leopards.svg' },
  { name: 'PostEx', src: '/partners/postex.svg' },
] as const;

const PAYMENT_RAILS = [
  { name: 'JazzCash', src: '/partners/jazzcash.svg' },
  { name: 'Easypaisa', src: '/partners/easypaisa.svg' },
] as const;

export function PartnerLogos({
  variant = 'couriers',
  className,
  tone = 'light',
}: {
  variant?: 'couriers' | 'payments';
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const items = variant === 'couriers' ? PARTNERS : PAYMENT_RAILS;

  return (
    <ul className={cn('flex flex-wrap items-center justify-center gap-4 md:gap-6', className)}>
      {items.map((partner) => (
        <li key={partner.name}>
          <Image
            src={partner.src}
            alt={partner.name}
            width={200}
            height={56}
            className={cn(
              'h-14 w-auto rounded-lg opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0',
              tone === 'dark' && 'brightness-110',
            )}
          />
        </li>
      ))}
    </ul>
  );
}
