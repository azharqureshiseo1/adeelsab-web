'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout/Section';
import { PartnerLogos } from './PartnerLogos';
import { useT } from '@/components/layout/LanguageProvider';
import { config, home } from '@/content/site';

/**
 * Partner marks get room to breathe: they are the single strongest credibility
 * element available to a brand nobody has heard of yet.
 */
export function DeliveryTeaser() {
  const t = useT();

  return (
    <Section tone="muted">
      <SectionHeading title={t(home.delivery.title)} sub={t(home.delivery.sub)} />

      <div className="mt-12 rounded-2xl border border-ink-200 bg-white p-8 md:p-12">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink-400">
          Nationwide delivery partners
        </p>
        <PartnerLogos className="mt-8" />

        <div className="mt-10 grid gap-6 border-t border-ink-200 pt-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-semibold text-ink-900">Own fleet</p>
            {/* TODO: confirm own-fleet cities at launch. */}
            <p className="mt-1 text-[15px] text-ink-500">{config.ownFleetCities.join(', ')}</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">Cash on delivery</p>
            <p className="mt-1 text-[15px] text-ink-500">Across Pakistan</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">Remote areas</p>
            <p className="mt-1 text-[15px] text-ink-500">Gilgit, Turbat, Chitral included</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/delivery"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
        >
          {t(home.delivery.cta)}
          <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </Section>
  );
}
