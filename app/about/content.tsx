'use client';

import Image from 'next/image';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { TodoBadge } from '@/components/ui/Badge';
import { CTABand } from '@/components/blocks/CTABand';
import { RegistrationMarks } from '@/components/blocks/RegistrationMarks';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { about, aboutBuilt, config } from '@/content/site';

/** Deliberately short. A thin About page beats a padded one. */
export function AboutContent() {
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t(about.hero.eyebrow)} title={t(about.hero.title)} sub={t(about.hero.sub)} />

      <Section tone="white" size="narrow">
        <h2 className="t-h2">{t(about.story.title)}</h2>
        <p className="mt-5 text-lg text-ink-500">{t(about.story.body)}</p>

        <h2 className="t-h2 mt-14">{t(about.mission.title)}</h2>
        <p className="mt-5 text-lg text-ink-500">{t(about.mission.body)}</p>
      </Section>

      <Section tone="muted">
        <SectionHeading title={t(about.building.title)} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {aboutBuilt.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 60}>
              <Card className="h-full">
                <h3 className="t-h4 font-bold">{t(item.title)}</h3>
                <p className="mt-2 text-[15px] text-ink-500">{t(item.body)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading title={t(about.team.title)} sub={t(about.team.body)} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Image
            src="/images/team-office.webp"
            alt="The AdeelSab team at work in the Lahore office"
            width={1672}
            height={941}
            className="h-auto w-full rounded-2xl border border-ink-200"
          />

          <div>
            <div className="rounded-2xl border border-ink-200 bg-ink-050 p-6">
              <h3 className="font-semibold text-ink-900">Registered details</h3>
              <dl className="mt-3 space-y-2 text-[15px]">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-ink-400">Entity:</dt>
                  <dd className="font-medium text-ink-900">{config.legal.entityFormal}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-ink-400">SECP registration:</dt>
                  <dd className="tabular">{config.legal.secp}</dd>
                </div>
                {config.legal.ntn ? (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-ink-400">NTN:</dt>
                    <dd className="tabular">{config.legal.ntn}</dd>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-ink-400">Office:</dt>
                  <dd>
                    {config.contact.addressLines.join(', ')}
                    <TodoBadge>TODO: confirm address</TodoBadge>
                  </dd>
                </div>
              </dl>

              <RegistrationMarks tone="light" className="mt-5" />
            </div>
          </div>
        </div>
      </Section>

      <CTABand source="about" withForm={false} />
    </>
  );
}
