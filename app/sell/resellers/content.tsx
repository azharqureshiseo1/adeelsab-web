'use client';

import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MarginCalculator } from '@/components/blocks/MarginCalculator';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { WaitlistForm } from '@/components/blocks/WaitlistForm';
import { useT } from '@/components/layout/LanguageProvider';
import { commissions, common, config, resellerHowSteps, resellers } from '@/content/site';

export function ResellersContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(resellers.hero.eyebrow)}
        title={t(resellers.hero.title)}
        sub={t(resellers.hero.sub)}
      >
        <Badge tone="waitlist">{t(common.waitlistOpen)}</Badge>
      </PageHero>

      {/* The honesty block sits first, above everything persuasive. Overselling
          here produces a first visit that ends in an empty catalogue, and no
          second visit. */}
      <Section tone="white" size="narrow" spacing="tight">
        <Card tone="tint">
          <div className="flex gap-4">
            <AlertCircle aria-hidden strokeWidth={1.75} className="mt-0.5 h-6 w-6 shrink-0 text-brand-500" />
            <div>
              <h2 className="t-h4 font-bold">{t(resellers.honesty.title)}</h2>
              <p className="mt-2 text-ink-500">{t(resellers.honesty.body)}</p>
            </div>
          </div>
        </Card>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="t-h3">{t(resellers.zeroInvestment.title)}</h2>
            <p className="mt-4 text-ink-500">{t(resellers.zeroInvestment.body)}</p>
          </div>
          <div>
            <h2 className="t-h3">{t(resellers.margins.title)}</h2>
            <p className="mt-4 text-ink-500">{t(resellers.margins.body)}</p>
            <Link
              href="/reseller-listings"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
            >
              How reseller-enabled listings work
              <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </Section>

      <HowItWorks steps={resellerHowSteps} title="How reselling works" sub="" tone="muted" />

      <Section tone="white">
        <SectionHeading title={t(resellers.calculator.title)} sub={t(resellers.calculator.sub)} />
        <div className="mt-10">
          <MarginCalculator />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title={t(resellers.categories.title)} sub={t(resellers.categories.sub)} />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {commissions.slice(0, 8).map((item) => (
            <li
              key={item.category.en}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
            >
              {t(item.category)}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" size="narrow" id="waitlist">
        <SectionHeading
          title={t(common.joinWaitlist)}
          sub={`We will message you the day the catalogue opens. Payouts run on the same ${config.payout.days}-day cycle as every other seller.`}
        />
        <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)] md:p-8">
          <WaitlistForm source="resellers" defaultBusinessType="Reseller" />
        </div>
      </Section>
    </>
  );
}
