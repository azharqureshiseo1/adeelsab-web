'use client';

import Link from 'next/link';
import { ArrowRight, Store, Users } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { useT } from '@/components/layout/LanguageProvider';
import { home } from '@/content/site';

/**
 * The substantive differentiator of the business model, so it gets a homepage
 * section rather than being buried in a sub-page.
 */
export function ResellerExplainer() {
  const t = useT();

  return (
    <Section tone="white">
      <SectionHeading title={t(home.resellerBlock.title)} sub={t(home.resellerBlock.sub)} />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card tone="tint">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-500">
            <Store aria-hidden strokeWidth={1.75} className="h-6 w-6" />
          </span>
          <h3 className="t-h3 mt-5">{t(home.resellerBlock.sellerTitle)}</h3>
          <p className="mt-3 text-ink-500">{t(home.resellerBlock.sellerBody)}</p>
        </Card>

        <Card tone="muted">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-ink-700">
            <Users aria-hidden strokeWidth={1.75} className="h-6 w-6" />
          </span>
          <h3 className="t-h3 mt-5">{t(home.resellerBlock.resellerTitle)}</h3>
          <p className="mt-3 text-ink-500">{t(home.resellerBlock.resellerBody)}</p>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/reseller-listings"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
        >
          How reseller-enabled listings work
          <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </Section>
  );
}
