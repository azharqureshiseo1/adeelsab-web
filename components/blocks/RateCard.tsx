'use client';

import { Table, TableWrap, Td, Th } from '@/components/ui/Table';
import { TodoBadge } from '@/components/ui/Badge';
import { useT } from '@/components/layout/LanguageProvider';
import { rateCard, rateCardHeads } from '@/content/site';

/** Weight-banded shipping rates, driven entirely from content/site.ts. */
export function RateCard() {
  const t = useT();

  return (
    <div>
      <TableWrap>
        <Table caption="Shipping rates by weight band and destination">
          <thead>
            <tr>
              <Th>{t(rateCardHeads.band)}</Th>
              <Th align="end">{t(rateCardHeads.inCity)}</Th>
              <Th align="end">{t(rateCardHeads.major)}</Th>
              <Th align="end">{t(rateCardHeads.rest)}</Th>
            </tr>
          </thead>
          <tbody>
            {rateCard.map((row) => (
              <tr key={row.band}>
                <Td strong>{row.band}</Td>
                <Td align="end" numeric>
                  {row.inCity}
                </Td>
                <Td align="end" numeric>
                  {row.major}
                </Td>
                <Td align="end" numeric>
                  {row.rest}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      {/* TODO: every rate above is a placeholder pending commercial terms. */}
      <p className="mt-3 text-sm text-ink-400">
        Rates are inclusive. There is no fuel surcharge, peak-season adjustment or handling fee.
        <TodoBadge>TODO: confirm rate card</TodoBadge>
      </p>
    </div>
  );
}
