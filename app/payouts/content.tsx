'use client';

import { Building2, Smartphone } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { TodoBadge } from '@/components/ui/Badge';
import { Table, TableWrap, Td, Th } from '@/components/ui/Table';
import { PartnerLogos } from '@/components/blocks/PartnerLogos';
import { StatNumber } from '@/components/blocks/StatNumber';
import { CTABand } from '@/components/blocks/CTABand';
import { useT } from '@/components/layout/LanguageProvider';
import { config, payoutDeductions, payouts } from '@/content/site';
import { formatPkr } from '@/lib/utils';

const CYCLE = [
  {
    day: 'Day 0',
    event: 'Parcel delivered and payment collected',
    detail: 'Cash on delivery is collected by our rider or the courier.',
  },
  {
    day: 'Day 1',
    event: 'Delivery confirmed',
    detail: 'The order is marked complete once the courier confirms handover.',
  },
  {
    day: `Day ${config.payout.days}`,
    event: 'Settlement released',
    detail: 'Commission, shipping and any RTO charges are deducted and the balance is sent.',
  },
  {
    day: `Day ${config.payout.days + 1}`,
    event: 'Money in your account',
    detail: 'Bank transfers can take one extra working day; wallets are usually instant.',
  },
];

export function PayoutsContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(payouts.hero.eyebrow)}
        title={t(payouts.hero.title)}
        sub={t(payouts.hero.sub)}
      />

      <Section tone="white">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* TODO: confirm payout timeline and minimum threshold. */}
          <StatNumber value={`${config.payout.days} days`} label="From confirmed delivery to settlement" />
          <StatNumber value={formatPkr(config.payout.minimumPkr)} label="Minimum payout amount" />
          <StatNumber value="3" label="Ways to receive your money" />
        </div>
        <p className="mt-6 text-sm text-ink-400">
          These figures are not yet final.
          <TodoBadge>TODO: confirm payout terms</TodoBadge>
        </p>
      </Section>

      <Section tone="muted" id="schedule">
        <SectionHeading title={t(payouts.schedule.title)} align="start" />
        <div className="mt-8">
          <TableWrap>
            <Table caption="The AdeelSab settlement cycle, day by day">
              <thead>
                <tr>
                  <Th>When</Th>
                  <Th>What happens</Th>
                  <Th>Detail</Th>
                </tr>
              </thead>
              <tbody>
                {CYCLE.map((row) => (
                  <tr key={row.day}>
                    <Td strong>{row.day}</Td>
                    <Td strong>{row.event}</Td>
                    <Td>{row.detail}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </div>
      </Section>

      <Section tone="white" id="rails">
        <SectionHeading title={t(payouts.rails.title)} sub={t(payouts.rails.sub)} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <Building2 aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h3 className="t-h4 mt-5 font-bold">Bank transfer</h3>
            <p className="mt-2 text-[15px] text-ink-500">
              Any Pakistani bank account in your own name, by IBAN. The account title must match
              your CNIC.
            </p>
          </Card>

          <Card>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <Smartphone aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h3 className="t-h4 mt-5 font-bold">Mobile wallet</h3>
            <p className="mt-2 text-[15px] text-ink-500">
              JazzCash or Easypaisa, registered on your own CNIC. Usually the fastest option.
            </p>
            <PartnerLogos variant="payments" className="mt-5 justify-start" />
          </Card>
        </div>
      </Section>

      <Section tone="muted" id="deductions">
        <SectionHeading title={t(payouts.deductions.title)} align="start" />
        <div className="mt-8">
          <TableWrap>
            <Table caption="Deductions applied to a seller settlement">
              <thead>
                <tr>
                  <Th>Deduction</Th>
                  <Th>When it applies</Th>
                </tr>
              </thead>
              <tbody>
                {payoutDeductions.map((row) => (
                  <tr key={row.item.en}>
                    <Td strong>{t(row.item)}</Td>
                    <Td>{t(row.detail)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
          <p className="mt-3 text-sm text-ink-400">
            Every deduction appears as its own line against the order number. There is no combined
            figure you cannot break down.
          </p>
        </div>
      </Section>

      <Section tone="white" size="narrow" id="holds">
        <Card>
          <h2 className="t-h3">{t(payouts.holds.title)}</h2>
          <p className="mt-3 text-ink-500">{t(payouts.holds.body)}</p>
        </Card>
      </Section>

      <CTABand source="payouts" />
    </>
  );
}
