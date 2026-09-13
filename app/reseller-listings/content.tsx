'use client';

import { Check, Store, Users } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { CTABand } from '@/components/blocks/CTABand';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { home, resellerFlow, resellerListings } from '@/content/site';

const SELLER_POINTS = [
  'You decide, product by product, whether resellers may sell it',
  'You set the margin yourself - nobody negotiates it with you',
  'No upfront cost and no marketing spend',
  'You only pay the margin on a completed, delivered sale',
];

const RESELLER_POINTS = [
  'Every margin is published before you list anything',
  'No inventory, no capital, no minimum order',
  'No relationship to manage with the seller',
  'Your margin settles on the standard payout cycle',
];

export function ResellerListingsContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(resellerListings.hero.eyebrow)}
        title={t(resellerListings.hero.title)}
        sub={t(resellerListings.hero.sub)}
      />

      {/* The three-step flow, as a simple diagram. */}
      <Section tone="white">
        <SectionHeading title={t(resellerListings.flow.title)} />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {resellerFlow.map((step, index) => (
            <Reveal key={step.title.en} delay={index * 80}>
              <li className="relative h-full">
                <Card className="h-full" emphasis={index === 0}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-lg font-extrabold text-brand-600">
                    {index + 1}
                  </span>
                  <h3 className="t-h4 mt-4 font-bold">{t(step.title)}</h3>
                  <p className="mt-2 text-[15px] text-ink-500">{t(step.body)}</p>
                </Card>

                {/* Connector between steps on desktop. */}
                {index < resellerFlow.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -end-3 top-1/2 hidden h-px w-6 bg-ink-200 md:block"
                  />
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>

        {/* The listing question itself, shown as the seller sees it. */}
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-ink-200 bg-ink-050 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
            What the seller sees when creating a listing
          </p>
          <p className="mt-3 font-semibold text-ink-900">
            Permit resellers to sell this product?
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white">
              Yes
            </span>
            <span className="rounded-full border border-ink-200 bg-white px-4 py-1.5 text-sm font-semibold text-ink-500">
              No
            </span>
          </div>
          <p className="mt-4 font-semibold text-ink-900">Reseller margin</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-[10px] border border-ink-200 bg-white px-4 py-2">
            <span className="tabular text-lg font-bold text-brand-600">12</span>
            <span className="text-ink-400">%</span>
          </div>
        </div>
      </Section>

      {/* Both sides, side by side. */}
      <Section tone="muted">
        <SectionHeading title={t(resellerListings.sides.title)} />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card tone="white">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <Store aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h3 className="t-h3 mt-5">{t(home.resellerBlock.sellerTitle)}</h3>
            <p className="mt-3 text-ink-500">{t(home.resellerBlock.sellerBody)}</p>
            <ul className="mt-5 space-y-2.5">
              {SELLER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px]">
                  <Check aria-hidden strokeWidth={2} className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card tone="white">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <Users aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h3 className="t-h3 mt-5">{t(home.resellerBlock.resellerTitle)}</h3>
            <p className="mt-3 text-ink-500">{t(home.resellerBlock.resellerBody)}</p>
            <ul className="mt-5 space-y-2.5">
              {RESELLER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px]">
                  <Check aria-hidden strokeWidth={2} className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="white" size="narrow">
        <Card tone="tint">
          <h2 className="t-h3">{t(resellerListings.fairness.title)}</h2>
          <p className="mt-3 text-ink-500">{t(resellerListings.fairness.body)}</p>
        </Card>
      </Section>

      <CTABand source="reseller_listings" />
    </>
  );
}
