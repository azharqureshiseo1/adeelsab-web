'use client';

import { Table, TableWrap, Td, Th } from '@/components/ui/Table';
import { TodoBadge } from '@/components/ui/Badge';
import { useT } from '@/components/layout/LanguageProvider';
import { commissionHeads, commissions, pricing } from '@/content/site';

/**
 * The full commission table, visible without signing up or clicking through.
 * Suspicion of undisclosed fees is the most damaging perception in this market,
 * so this renders in full on both /pricing and /sell/local-sellers.
 */
export function CommissionTable({ showNote = true }: { showNote?: boolean }) {
  const t = useT();

  return (
    <div>
      <TableWrap>
        <Table caption="AdeelSab commission rates by product category">
          <thead>
            <tr>
              <Th>{t(commissionHeads.category)}</Th>
              <Th align="end">{t(commissionHeads.rate)}</Th>
              <Th>{t(commissionHeads.note)}</Th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((row) => (
              <tr key={row.category.en}>
                <Td strong>{t(row.category)}</Td>
                <Td align="end" numeric strong>
                  {row.rate}
                </Td>
                <Td>{t(row.note) || '—'}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      {showNote ? (
        <p className="mt-3 text-sm text-ink-400">
          {t(pricing.table.note)}
          {/* TODO: confirm every commission percentage before launch. */}
          <TodoBadge>TODO: confirm rates</TodoBadge>
        </p>
      ) : null}
    </div>
  );
}
