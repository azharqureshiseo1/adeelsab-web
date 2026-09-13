'use client';

import { Code2, Package, Plug, RefreshCw } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WaitlistForm } from '@/components/blocks/WaitlistForm';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { common, dropshipperFeatures, dropshippers } from '@/content/site';

const ICONS: Record<string, typeof RefreshCw> = {
  refresh: RefreshCw,
  package: Package,
  code: Code2,
  plug: Plug,
};

/**
 * Deliberately a stub. Building API documentation for an integration that does
 * not exist yet would be the same mistake as opening the reseller channel
 * before there is a catalogue.
 */
export function DropshippersContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(dropshippers.hero.eyebrow)}
        title={t(dropshippers.hero.title)}
        sub={t(dropshippers.hero.sub)}
      >
        <Badge tone="soon">{t(common.comingSoon)}</Badge>
      </PageHero>

      <Section tone="white">
        <SectionHeading title={t(dropshippers.whatsComing.title)} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {dropshipperFeatures.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Plug;

            return (
              <Reveal key={feature.title.en} delay={index * 70}>
                <Card className="h-full" tone="muted">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-500">
                    <Icon aria-hidden strokeWidth={1.75} className="h-6 w-6" />
                  </span>
                  <h3 className="t-h4 mt-5 font-bold">{t(feature.title)}</h3>
                  <p className="mt-2 text-[15px] text-ink-500">{t(feature.body)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="muted" size="narrow">
        <SectionHeading title={t(dropshippers.capture.title)} sub={t(dropshippers.capture.sub)} />
        <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)] md:p-8">
          <WaitlistForm source="dropshippers" defaultBusinessType="Dropshipper" compact />
        </div>
      </Section>
    </>
  );
}
