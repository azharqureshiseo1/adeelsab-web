'use client';

import Image from 'next/image';
import { Award, Camera, Check, Headset, Percent, Star } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/blocks/Reveal';
import { FoundingCounter } from '@/components/blocks/StatNumber';
import { WaitlistForm } from '@/components/blocks/WaitlistForm';
import { useT } from '@/components/layout/LanguageProvider';
import {
  config,
  foundingBenefits,
  foundingRequirements,
  foundingSeller,
  foundingTimeline,
  homeFaqs,
} from '@/content/site';

const BENEFIT_ICONS: Record<string, typeof Percent> = {
  percent: Percent,
  camera: Camera,
  headset: Headset,
  star: Star,
  badge: Award,
};

export function FoundingSellerContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(foundingSeller.hero.eyebrow)}
        title={t(foundingSeller.hero.title)}
        sub={t(foundingSeller.hero.sub)}
      >
        <div className="flex flex-wrap gap-3">
          <Badge tone="active" dot>
            {t(config.launchWindow)}
          </Badge>
          <Badge tone="waitlist">
            First {config.foundingSeller.cap} merchants
          </Badge>
        </div>
      </PageHero>

      {/* What the programme is */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h2 className="t-h2">{t(foundingSeller.what.title)}</h2>
            <p className="mt-5 text-lg text-ink-500">{t(foundingSeller.what.body)}</p>

            <h3 className="t-h3 mt-10">{t(foundingSeller.who.title)}</h3>
            <p className="mt-3 text-ink-500">{t(foundingSeller.who.body)}</p>
          </div>

          <FoundingCounter />
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="muted">
        <SectionHeading title={t(foundingSeller.benefits.title)} />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foundingBenefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[benefit.icon] ?? Check;

            return (
              <Reveal key={benefit.title.en} delay={index * 70}>
                <Card className="h-full">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <Icon aria-hidden strokeWidth={1.75} className="h-6 w-6" />
                  </span>
                  <h3 className="t-h4 mt-5 font-bold">{t(benefit.title)}</h3>
                  <p className="mt-2 text-[15px] text-ink-500">{t(benefit.body)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* What we need + timeline */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">{t(foundingSeller.need.title)}</h2>
            <Image
              src="/images/branded-packaging.webp"
              alt="An AdeelSab parcel sealed and labelled, ready for dispatch"
              width={1672}
              height={941}
              className="mt-6 h-auto w-full rounded-2xl border border-ink-200"
            />
            <ul className="mt-6 space-y-4">
              {foundingRequirements.map((item) => (
                <li key={item.en} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                    <Check aria-hidden strokeWidth={2.25} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink-500">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-h2">{t(foundingSeller.timeline.title)}</h2>
            <ol className="mt-6 space-y-6">
              {foundingTimeline.map((entry, index) => (
                <li key={entry.when.en} className="relative flex gap-4">
                  {index < foundingTimeline.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute start-[15px] top-9 h-[calc(100%+0.5rem)] w-px bg-ink-200"
                    />
                  ) : null}
                  <span className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-sm font-bold text-brand-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{t(entry.when)}</p>
                    <p className="mt-1 text-[15px] text-ink-500">{t(entry.what)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* The form - the point of the page */}
      <Section tone="muted" size="narrow" id="apply">
        <SectionHeading title={t(foundingSeller.form.title)} sub={t(foundingSeller.form.sub)} />
        <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)] md:p-8">
          <WaitlistForm source="founding_seller" />
        </div>
      </Section>

      <Section tone="white" size="narrow">
        <SectionHeading title="Questions before you apply" />
        <div className="mt-10">
          <Accordion items={homeFaqs} />
        </div>
      </Section>
    </>
  );
}
