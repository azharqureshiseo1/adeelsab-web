'use client';

import { Check } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { FoundingCounter } from './StatNumber';
import { useT } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { foundingBenefits, home } from '@/content/site';

export function ProgramTeaser() {
  const t = useT();

  return (
    <Section tone="white">
      <SectionHeading title={t(home.program.title)} sub={t(home.program.sub)} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <Card emphasis>
          <ul className="space-y-5">
            {foundingBenefits.map((benefit) => (
              <li key={benefit.title.en} className="flex gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                  <Check aria-hidden strokeWidth={2.25} className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{t(benefit.title)}</h3>
                  <p className="mt-1 text-[15px] text-ink-500">{t(benefit.body)}</p>
                </div>
              </li>
            ))}
          </ul>

          <ButtonLink
            href="/founding-seller"
            size="lg"
            className="mt-8"
            onClick={() => trackEvent('cta_click', { location: 'program_teaser' })}
          >
            {t(home.program.cta)}
          </ButtonLink>
        </Card>

        <FoundingCounter />
      </div>
    </Section>
  );
}
