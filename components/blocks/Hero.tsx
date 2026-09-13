'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { useT } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { common, home } from '@/content/site';

/**
 * Light hero on purpose. A dark hero with floating cards reads as a template,
 * and the audience here is a shop owner, not a SaaS buyer.
 */
export function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-ink-050">
      <Container size="wide">
        <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Badge tone="active" dot>
              {t(home.hero.eyebrow)}
            </Badge>

            <h1 className="t-h1 mt-5">{t(home.hero.title)}</h1>

            <p className="mt-5 max-w-xl text-lg text-ink-500">{t(home.hero.sub)}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/founding-seller"
                size="lg"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'founding-seller' })}
              >
                {t(common.becomeFoundingSeller)}
                <ArrowRight aria-hidden strokeWidth={1.75} className="h-5 w-5 rtl:rotate-180" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary" size="lg">
                {t(common.howItWorks)}
              </ButtonLink>
            </div>

            <p className="mt-5 text-sm text-ink-400">{t(home.capability.note)}</p>
          </div>

          <div className="relative">
            {/* The single decorative gradient shape permitted on this page. */}
            <div
              aria-hidden
              className="bg-brand-gradient absolute -end-4 -top-6 h-48 w-48 rounded-[40%] opacity-20 blur-[2px] md:h-64 md:w-64"
            />
            <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)]">
              {/* TODO-IMAGES: replace with a real photograph of a Pakistani merchant. */}
              <Image
                src="/images/placeholder-hero.svg"
                alt={t(home.hero.imageAlt)}
                width={880}
                height={700}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Compact hero used by every page other than the home page. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  tone = 'muted',
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
  tone?: 'muted' | 'white';
}) {
  return (
    <section className={tone === 'muted' ? 'bg-ink-050' : 'bg-white'}>
      <Container size="wide">
        <div className="max-w-3xl py-12 md:py-20">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-600">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="t-h1">{title}</h1>
          {sub ? <p className="mt-5 text-lg text-ink-500">{sub}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
