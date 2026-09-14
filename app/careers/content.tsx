'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { careers, config, culturePoints, openRoles } from '@/content/site';

/**
 * A single page, not a subdomain: Daraz separates careers because its hiring
 * volume justifies it, and copying that at this scale produces an empty shell.
 * An empty careers page reduces credibility - if there are no roles, we say so
 * and invite speculative applications rather than showing a hollow listing.
 */
export function CareersContent() {
  const t = useT();
  const hasRoles = openRoles.length > 0;

  return (
    <>
      <PageHero
        eyebrow={t(careers.hero.eyebrow)}
        title={t(careers.hero.title)}
        sub={t(careers.hero.sub)}
      />

      <Section tone="white">
        <SectionHeading title={t(careers.culture.title)} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {culturePoints.map((point, index) => (
            <Reveal key={point.title.en} delay={index * 60}>
              <Card className="h-full" tone="muted">
                <h3 className="t-h4 font-bold">{t(point.title)}</h3>
                <p className="mt-2 text-[15px] text-ink-500">{t(point.body)}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Image
          src="/images/team-office.webp"
          alt="The AdeelSab office in Lahore"
          width={1672}
          height={941}
          className="mt-12 h-auto w-full rounded-2xl border border-ink-200"
        />
      </Section>

      <Section tone="muted" id="roles">
        <SectionHeading
          title={hasRoles ? t(careers.openRoles.title) : t(careers.noRoles.title)}
          sub={hasRoles ? undefined : t(careers.noRoles.body)}
        />

        {hasRoles ? (
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {/* TODO: confirm the live vacancy list before publishing. */}
            {openRoles.map((role) => (
              <Card key={role.title.en} className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="t-h4 font-bold">{t(role.title)}</h3>
                    <Badge tone="neutral">{t(role.type)}</Badge>
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-400">
                    <MapPin aria-hidden strokeWidth={1.75} className="h-4 w-4" />
                    {t(role.location)}
                  </p>
                  <p className="mt-3 text-[15px] text-ink-500">{t(role.body)}</p>
                </div>

                <ButtonLink
                  href={`mailto:${config.contact.businessEmail}?subject=${encodeURIComponent(
                    `Application: ${role.title.en}`,
                  )}`}
                  variant="secondary"
                  className="shrink-0"
                >
                  {t(careers.apply)}
                </ButtonLink>
              </Card>
            ))}
          </div>
        ) : null}
      </Section>

      <Section tone="white" size="narrow">
        <Card tone="tint" className="text-center">
          <h2 className="t-h3">{t(careers.general.title)}</h2>
          <p className="mt-3 text-ink-500">{t(careers.general.body)}</p>
          <ButtonLink
            href={`mailto:${config.contact.businessEmail}?subject=${encodeURIComponent(
              'Speculative application',
            )}`}
            size="lg"
            className="mt-6"
          >
            Send your CV
          </ButtonLink>
          {/* TODO: confirm the careers email address. */}
        </Card>
      </Section>
    </>
  );
}
