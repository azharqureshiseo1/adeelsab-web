'use client';

import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { CommissionTable } from '@/components/blocks/CommissionTable';
import { CoverageMap } from '@/components/blocks/CoverageMap';
import { PartnerLogos } from '@/components/blocks/PartnerLogos';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { WaitlistForm } from '@/components/blocks/WaitlistForm';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import {
  bringItems,
  common,
  config,
  localSellerObjections,
  localSellers,
  onboardingSteps,
  pricing,
  waUrl,
} from '@/content/site';

export function LocalSellersContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(localSellers.hero.eyebrow)}
        title={t(localSellers.hero.title)}
        sub={t(localSellers.hero.sub)}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="#register"
            size="lg"
            onClick={() => trackEvent('cta_click', { location: 'local_sellers_hero' })}
          >
            Register your shop
            <ArrowRight aria-hidden strokeWidth={1.75} className="h-5 w-5 rtl:rotate-180" />
          </ButtonLink>
          <ButtonLink href={waUrl} variant="secondary" size="lg">
            {t(common.talkOnWhatsApp)}
          </ButtonLink>
        </div>
      </PageHero>

      {/* The six objections, in the order they actually get asked. */}
      <Section tone="white">
        <SectionHeading
          title={t(localSellers.objections.title)}
          sub={t(localSellers.objections.sub)}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {localSellerObjections.map((objection, index) => (
            <Reveal key={objection.q.en} delay={index * 60}>
              <Card className="h-full">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
                  &ldquo;{t(objection.q)}&rdquo;
                </p>
                <p className="mt-3 text-ink-500">{t(objection.a)}</p>
                {objection.link ? (
                  <Link
                    href={objection.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
                  >
                    {t(objection.link.label)}
                    <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Commissions in full, on the page, without a click. */}
      <Section tone="muted" id="commissions">
        <SectionHeading title={t(pricing.table.title)} sub={t(pricing.noOtherFees.body)} />
        <div className="mt-10">
          <CommissionTable />
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
          >
            Full pricing and fee detail
            <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </Section>

      {/* Coverage - the "will it reach my customers" question. */}
      <Section tone="white">
        <SectionHeading title="Where your orders can go" align="start" />
        <div className="mt-10">
          <CoverageMap />
        </div>
        <div className="mt-10 border-t border-ink-200 pt-10">
          <PartnerLogos />
        </div>
      </Section>

      <HowItWorks
        steps={onboardingSteps}
        title={t(localSellers.onboarding.title)}
        sub={t(localSellers.bring.sub)}
        tone="muted"
      />

      {/* What to bring */}
      <Section tone="white">
        <SectionHeading title={t(localSellers.bring.title)} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bringItems.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 60}>
              <Card className="h-full" tone="muted">
                <h3 className="t-h4 font-bold">{t(item.title)}</h3>
                <p className="mt-2 text-[15px] text-ink-500">{t(item.body)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The Urdu reassurance, then the form. */}
      <Section tone="muted" id="register">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="active" dot>
              {t(common.nowOnboarding)}
            </Badge>
            <h2 className="t-h2 mt-5">{t(localSellers.reassurance.title)}</h2>
            <p className="mt-4 text-lg text-ink-500">{t(localSellers.reassurance.body)}</p>

            <Card tone="tint" className="mt-8">
              <div className="flex gap-3.5">
                <PhoneCall aria-hidden strokeWidth={1.75} className="mt-0.5 h-6 w-6 shrink-0 text-brand-500" />
                <div>
                  <p className="font-semibold text-ink-900">
                    Prefer to talk before filling anything in?
                  </p>
                  <p className="mt-1 text-[15px] text-ink-500">
                    Message us on WhatsApp and we will call you back.
                    {/* TODO: real WhatsApp support number. */}
                  </p>
                  <ButtonLink
                    href={waUrl}
                    variant="whatsapp"
                    size="sm"
                    className="mt-4"
                    onClick={() => trackEvent('whatsapp_click', { location: 'local_sellers' })}
                  >
                    {t(common.whatsappUs)}
                  </ButtonLink>
                </div>
              </div>
            </Card>

            <p className="mt-6 text-sm text-ink-400">
              Office hours: {t(config.contact.hours)}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)] md:p-8">
            <WaitlistForm source="local_sellers" defaultBusinessType="Local seller / shop owner" />
          </div>
        </div>
      </Section>
    </>
  );
}
