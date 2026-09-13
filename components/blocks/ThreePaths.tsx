'use client';

import Link from 'next/link';
import { ArrowRight, Check, Repeat, Store, Truck } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal } from './Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { home, paths } from '@/content/site';
import type { PathCard } from '@/content/site';
import { cn } from '@/lib/utils';

const ICONS = { store: Store, repeat: Repeat, truck: Truck } as const;

/**
 * Ordered by launch-phase priority, not long-term priority. Local sellers are
 * first and visually emphasised because the catalogue is entirely third-party:
 * without supply, the reseller channel has nothing to sell.
 */
export function ThreePaths({ items = paths }: { items?: PathCard[] }) {
  const t = useT();

  return (
    <Section id="paths" tone="white">
      <SectionHeading title={t(home.threePaths.title)} sub={t(home.threePaths.sub)} />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((path, index) => {
          const Icon = ICONS[path.icon];

          return (
            <Reveal key={path.id} delay={index * 80}>
              <Card emphasis={path.emphasis} interactive className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl',
                      path.emphasis ? 'bg-brand-50 text-brand-500' : 'bg-ink-100 text-ink-700',
                    )}
                  >
                    <Icon aria-hidden strokeWidth={1.75} className="h-6 w-6" />
                  </span>
                  <Badge tone={path.badgeTone} dot={path.badgeTone === 'active'}>
                    {t(path.badge)}
                  </Badge>
                </div>

                <h3 className="t-h3 mt-5">{t(path.title)}</h3>
                <p className="mt-2 text-ink-500">{t(path.promise)}</p>

                <ul className="mt-5 space-y-2.5">
                  {path.bullets.map((bullet) => (
                    <li key={bullet.en} className="flex items-start gap-2.5 text-[15px]">
                      <Check
                        aria-hidden
                        strokeWidth={2}
                        className="mt-1 h-4 w-4 shrink-0 text-brand-500"
                      />
                      <span>{t(bullet)}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={path.href}
                  className="mt-6 inline-flex items-center gap-1.5 pt-1 font-semibold text-brand-600 hover:text-brand-500"
                >
                  {t(path.title)}
                  <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
