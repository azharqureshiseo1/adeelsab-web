'use client';

import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { CommissionTable } from '@/components/blocks/CommissionTable';
import { CTABand } from '@/components/blocks/CTABand';
import { useT } from '@/components/layout/LanguageProvider';
import { config, pricing } from '@/content/site';

/** Every fee that exists, and an explicit list of the ones that do not. */
const NO_FEES = [
  'Listing fee',
  'Monthly or annual subscription',
  'Account setup fee',
  'Fee for us to build your listings',
  'Withdrawal or payout fee',
  'Category-change fee',
  'Fee for keeping stock listed but unsold',
];

const REAL_FEES = [
  {
    name: 'Category commission',
    detail: 'Charged on the product price of a completed sale. See the table above.',
  },
  {
    name: 'Shipping',
    detail: 'Only when you choose to absorb it. Rates are on the Delivery page.',
  },
  {
    name: 'RTO charge',
    detail: 'Only on parcels returned to you after a failed delivery.',
  },
  {
    name: 'Reseller margin',
    detail: 'Only on sales made by a reseller, at the rate you set yourself.',
  },
];

export function PricingContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(pricing.hero.eyebrow)}
        title={t(pricing.hero.title)}
        sub={t(pricing.hero.sub)}
      />

      <Section tone="white" id="commissions">
        <SectionHeading title={t(pricing.table.title)} align="start" />
        <div className="mt-8">
          <CommissionTable />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="t-h3">What you actually pay</h2>
            <ul className="mt-5 space-y-4">
              {REAL_FEES.map((fee) => (
                <li key={fee.name} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                    <Check aria-hidden strokeWidth={2.25} className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{fee.name}</p>
                    <p className="mt-0.5 text-[15px] text-ink-500">{fee.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card tone="tint">
            <h2 className="t-h3">{t(pricing.noOtherFees.title)}</h2>
            <p className="mt-3 text-ink-500">{t(pricing.noOtherFees.body)}</p>
            <ul className="mt-5 space-y-2.5">
              {NO_FEES.map((fee) => (
                <li key={fee} className="flex items-center gap-3 text-[15px]">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink-400">
                    <X aria-hidden strokeWidth={2.25} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink-500 line-through decoration-ink-200">{fee}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="white" size="narrow">
        <Card emphasis>
          <h2 className="t-h3">{t(pricing.founding.title)}</h2>
          <p className="mt-3 text-ink-500">{t(pricing.founding.body)}</p>
          <p className="mt-4 text-sm text-ink-400">
            Applies to the first {config.foundingSeller.cap} merchants who join before launch.
          </p>
          <Link
            href="/founding-seller"
            className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
          >
            Join the Founding Seller Program
            <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </Card>

        <div className="mt-8 flex flex-wrap gap-6">
          <Link href="/delivery#rates" className="font-semibold text-brand-600 hover:text-brand-500">
            Shipping rate card
          </Link>
          <Link href="/payouts" className="font-semibold text-brand-600 hover:text-brand-500">
            Payout schedule
          </Link>
          <Link href="/delivery#rto" className="font-semibold text-brand-600 hover:text-brand-500">
            RTO charges
          </Link>
        </div>
      </Section>

      <CTABand source="pricing" />
    </>
  );
}
