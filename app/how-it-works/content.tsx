'use client';

import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { FAQ } from '@/components/blocks/FAQ';
import { PartnerLogos } from '@/components/blocks/PartnerLogos';
import { CTABand } from '@/components/blocks/CTABand';
import { useT } from '@/components/layout/LanguageProvider';
import { homeFaqs, howItWorks, howItWorksSteps, resellerHowSteps } from '@/content/site';

export function HowItWorksContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(howItWorks.hero.eyebrow)}
        title={t(howItWorks.hero.title)}
        sub={t(howItWorks.hero.sub)}
      />

      <HowItWorks steps={howItWorksSteps} title={t(howItWorks.forSellers.title)} sub="" tone="white" />

      <HowItWorks
        steps={resellerHowSteps}
        title={t(howItWorks.forResellers.title)}
        sub=""
        tone="muted"
      />

      <Section tone="white" size="narrow">
        <SectionHeading title={t(howItWorks.money.title)} align="start" />
        <Card className="mt-8">
          <p className="text-ink-500">{t(howItWorks.money.body)}</p>

          <div className="mt-6 border-t border-ink-200 pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
              {t(howItWorks.money.checkoutLabel)}
            </p>
            {/* Checkout methods, not payout rails — this is how the buyer pays,
                not how the seller is paid. */}
            <PartnerLogos variant="checkout" className="mt-4 justify-start" />
          </div>
        </Card>
      </Section>

      <FAQ items={homeFaqs} tone="muted" />

      <CTABand source="how_it_works" />
    </>
  );
}
