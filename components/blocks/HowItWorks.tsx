'use client';

import { Section, SectionHeading } from '@/components/layout/Section';
import { Reveal } from './Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { home, howItWorksSteps } from '@/content/site';
import type { Step } from '@/content/site';

/**
 * Horizontal on desktop, a vertical timeline on mobile. The connecting rule is
 * drawn behind the numbers rather than between them, so it survives RTL.
 */
export function HowItWorks({
  steps = howItWorksSteps,
  title,
  sub,
  tone = 'muted',
}: {
  steps?: Step[];
  title?: string;
  sub?: string;
  tone?: 'muted' | 'white';
}) {
  const t = useT();

  return (
    <Section tone={tone}>
      <SectionHeading title={title ?? t(home.howItWorks.title)} sub={sub ?? t(home.howItWorks.sub)} />

      <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {/* Desktop connector */}
        <div
          aria-hidden
          className="absolute inset-x-[12%] top-6 hidden h-px bg-ink-200 md:block"
        />

        {steps.map((step, index) => (
          <Reveal key={step.title.en} delay={index * 80}>
            <li className="relative flex gap-4 md:block">
              {/* Mobile connector */}
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute start-6 top-12 h-[calc(100%+2rem)] w-px bg-ink-200 md:hidden"
                />
              ) : null}

              <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-lg font-extrabold text-brand-600 md:h-12 md:w-12">
                {index + 1}
              </span>

              <div className="md:mt-5">
                <h3 className="t-h4 font-bold">{t(step.title)}</h3>
                <p className="mt-2 text-[15px] text-ink-500">{t(step.body)}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
