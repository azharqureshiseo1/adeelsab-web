'use client';

import { Info } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { ThreePaths } from '@/components/blocks/ThreePaths';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { CTABand } from '@/components/blocks/CTABand';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { useT } from '@/components/layout/LanguageProvider';
import { sellHub } from '@/content/site';

export function SellHubContent() {
  const t = useT();

  return (
    <>
      <PageHero title={t(sellHub.title)} sub={t(sellHub.sub)} />

      <ThreePaths />

      {/* Stating the sequencing honestly. A reseller who arrives expecting a full
          catalogue and finds an empty one does not come back. */}
      <Section tone="muted" size="narrow" spacing="tight">
        <Card tone="tint">
          <div className="flex gap-4">
            <Info aria-hidden strokeWidth={1.75} className="mt-0.5 h-6 w-6 shrink-0 text-brand-500" />
            <div>
              <h2 className="t-h4 font-bold">{t(sellHub.sequencingNote.title)}</h2>
              <p className="mt-2 text-ink-500">{t(sellHub.sequencingNote.body)}</p>
            </div>
          </div>
        </Card>
      </Section>

      <HowItWorks tone="white" />

      <CTABand source="sell_hub" />
    </>
  );
}
