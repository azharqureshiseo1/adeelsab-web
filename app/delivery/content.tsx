'use client';

import Link from 'next/link';
import { ArrowRight, Banknote, RotateCcw } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { TodoBadge } from '@/components/ui/Badge';
import { Table, TableWrap, Td, Th } from '@/components/ui/Table';
import { CoverageMap } from '@/components/blocks/CoverageMap';
import { OwnFleetLogo, PartnerLogos } from '@/components/blocks/PartnerLogos';
import { RateCard } from '@/components/blocks/RateCard';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { CTABand } from '@/components/blocks/CTABand';
import { useT } from '@/components/layout/LanguageProvider';
import { config, delivery, deliveryTimelines, returnSteps, whoPaysOptions } from '@/content/site';

const COURIER_NOTES = [
  { name: 'TCS', note: 'The widest recognised network in Pakistan, including remote districts.' },
  { name: 'Leopards', note: 'Strong secondary-city coverage and reliable COD remittance.' },
  { name: 'PostEx', note: 'Built for e-commerce, with fast COD settlement back to the platform.' },
  {
    name: 'Muller & Phipps',
    note: 'Long-established distribution reach, particularly for bulk and business addresses.',
  },
];

export function DeliveryContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(delivery.hero.eyebrow)}
        title={t(delivery.hero.title)}
        sub={t(delivery.hero.sub)}
      />

      <Section tone="white" id="coverage">
        <CoverageMap />
      </Section>

      {/* Timelines */}
      <Section tone="muted" id="timelines">
        <SectionHeading title={t(delivery.timelines.title)} align="start" />
        <div className="mt-8">
          <TableWrap>
            <Table caption="Delivery timelines by destination zone">
              <thead>
                <tr>
                  <Th>Destination</Th>
                  <Th>Typical time</Th>
                  <Th>Carried by</Th>
                </tr>
              </thead>
              <tbody>
                {deliveryTimelines.map((row) => (
                  <tr key={row.zone.en}>
                    <Td strong>{t(row.zone)}</Td>
                    <Td>{t(row.time)}</Td>
                    <Td>{t(row.by)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
          {/* TODO: confirm all delivery timelines against courier SLAs. */}
          <p className="mt-3 text-sm text-ink-400">
            Working days exclude Sundays and public holidays.
            <TodoBadge>TODO: confirm timelines</TodoBadge>
          </p>
        </div>
      </Section>

      {/* Own fleet, then the partner network. Kept apart on purpose: one is ours
          and under our control, the other is not. */}
      <Section tone="white" id="partners">
        <SectionHeading title={t(delivery.partners.title)} sub={t(delivery.partners.sub)} />

        <Card emphasis className="mt-10">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10">
            <OwnFleetLogo className="mx-auto md:mx-0" />
            <div>
              <h3 className="t-h4 font-bold">Our own riders, in our launch cities</h3>
              <p className="mt-2 text-[15px] text-ink-500">
                Inside {config.ownFleetCities.join(', ')} your parcels are carried by our own fleet.
                We set the pickup times, we answer for the delivery, and nothing is subcontracted.
              </p>
            </div>
          </div>
        </Card>

        <p className="mt-12 text-center text-sm font-semibold uppercase tracking-wide text-ink-400">
          Nationwide, through established couriers
        </p>
        <div className="mt-8">
          <PartnerLogos />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COURIER_NOTES.map((courier) => (
            <Card key={courier.name} tone="muted">
              <h3 className="t-h4 font-bold">{courier.name}</h3>
              <p className="mt-2 text-[15px] text-ink-500">{courier.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Rates */}
      <Section tone="muted" id="rates">
        <SectionHeading title={t(delivery.rates.title)} sub={t(delivery.rates.sub)} align="start" />
        <div className="mt-8">
          <RateCard />
        </div>
      </Section>

      {/* Who pays */}
      <Section tone="white" id="who-pays">
        <SectionHeading title={t(delivery.whoPays.title)} sub={t(delivery.whoPays.sub)} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whoPaysOptions.map((option) => (
            <Card key={option.title.en} className="h-full">
              <h3 className="t-h4 font-bold">{t(option.title)}</h3>
              <p className="mt-2 text-[15px] text-ink-500">{t(option.body)}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* COD and RTO. Neither is softened: silence here is read as concealment,
          and costs more trust than the charge itself. */}
      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card id="cod" className="h-full">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <Banknote aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h2 className="t-h3 mt-5">{t(delivery.cod.title)}</h2>
            <p className="mt-3 text-ink-500">{t(delivery.cod.body)}</p>
            <PartnerLogos variant="payments" className="mt-6 justify-start" />
          </Card>

          <Card id="rto" className="h-full" emphasis>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <RotateCcw aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h2 className="t-h3 mt-5">{t(delivery.rto.title)}</h2>
            <p className="mt-3 text-ink-500">{t(delivery.rto.body)}</p>

            <div className="mt-5 rounded-[10px] border border-ink-200 bg-ink-050 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
                RTO charge
              </p>
              {/* TODO: confirm the RTO charge structure. This must be a real
                  number before launch - a vague answer here destroys trust. */}
              <p className="tabular mt-1 text-2xl font-extrabold text-ink-900">
                Rs. 120 per returned parcel
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Charged once, on the return leg only. No charge on the outbound leg of a failed
                delivery.
                <TodoBadge>TODO: confirm RTO charge</TodoBadge>
              </p>
            </div>

            <p className="mt-5 text-[15px] text-ink-500">{t(delivery.rto.reduce)}</p>
            <Link
              href="/seller-hub/reducing-rto-in-cod"
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
            >
              Read the guide to reducing RTO
              <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Card>
        </div>
      </Section>

      <HowItWorks steps={returnSteps} title={t(delivery.returnPickup.title)} sub="" tone="white" />

      <CTABand source="delivery" />
    </>
  );
}
