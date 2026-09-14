'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Delivery and payment marks.
 *
 * These are the strongest credibility element on the site: a merchant has no
 * basis on which to judge AdeelSab, but recognises TCS instantly. Hence the
 * room they are given, and hence the separation below — our own fleet is ours,
 * and presenting it inside a row of third-party couriers would blur the line.
 *
 * TODO-IMAGES: confirm written permission to display each courier's mark.
 */
type Mark = {
  name: string;
  src: string;
  width: number;
  height: number;
  /**
   * Optical size class. Locking every mark to one pixel height makes the
   * wordmark-heavy ones (PostEx) read as far larger than the compact ones
   * (M&P), so each is nudged to sit at the same apparent weight.
   */
  size: string;
};

const COURIERS: Mark[] = [
  { name: 'TCS', src: '/partners/tcs.png', width: 408, height: 160, size: 'h-8 md:h-10' },
  {
    name: 'Leopards Courier',
    src: '/partners/leopards.png',
    width: 398,
    height: 160,
    size: 'h-9 md:h-11',
  },
  { name: 'PostEx', src: '/partners/postex.png', width: 718, height: 160, size: 'h-5 md:h-6' },
  { name: 'Muller & Phipps', src: '/partners/mp.png', width: 313, height: 160, size: 'h-9 md:h-11' },
];

const PAYMENT_RAILS: Mark[] = [
  {
    name: 'JazzCash',
    src: '/partners/jazzcash.svg',
    width: 200,
    height: 56,
    size: 'h-9 md:h-11',
  },
  {
    name: 'Easypaisa',
    src: '/partners/easypaisa.svg',
    width: 200,
    height: 56,
    size: 'h-9 md:h-11',
  },
];

export function PartnerLogos({
  variant = 'couriers',
  className,
  tone = 'light',
}: {
  variant?: 'couriers' | 'payments';
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const items = variant === 'couriers' ? COURIERS : PAYMENT_RAILS;

  return (
    <ul className={cn('flex flex-wrap items-center justify-center gap-x-8 gap-y-6', className)}>
      {items.map((partner) => (
        <li key={partner.name}>
          <Image
            src={partner.src}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            className={cn(
              'w-auto object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0',
              partner.size,
              tone === 'dark' && 'opacity-80 brightness-0 invert hover:brightness-100 hover:invert-0',
            )}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The owned delivery fleet, presented as its own named brand.
 *
 * Naming the fleet turns a feature into a capability in the reader's mind —
 * the same move Daraz made with Daraz Express.
 */
export function OwnFleetLogo({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <Image
      src={`/partners/adeelsab-couriers-${tone === 'dark' ? 'orange' : 'dark'}.png`}
      alt="AdeelSab Couriers — our own delivery fleet"
      width={897}
      height={349}
      className={cn('h-14 w-auto object-contain md:h-16', className)}
    />
  );
}
