import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wide tables scroll inside their own container so the page body never scrolls
 * horizontally on a 360px handset.
 */
export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-2xl border border-ink-200 bg-white',
        '[scrollbar-width:thin]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Table({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <table className="w-full min-w-[560px] border-collapse text-start text-[15px]">
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      {children}
    </table>
  );
}

export function Th({
  children,
  align = 'start',
  scope = 'col',
}: {
  children: ReactNode;
  align?: 'start' | 'end';
  scope?: 'col' | 'row';
}) {
  return (
    <th
      scope={scope}
      className={cn(
        'border-b border-ink-200 bg-ink-050 px-4 py-3 font-semibold text-ink-900',
        align === 'end' ? 'text-end' : 'text-start',
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  align = 'start',
  strong = false,
  numeric = false,
}: {
  children: ReactNode;
  align?: 'start' | 'end';
  strong?: boolean;
  numeric?: boolean;
}) {
  return (
    <td
      className={cn(
        'border-b border-ink-200 px-4 py-3',
        align === 'end' ? 'text-end' : 'text-start',
        strong ? 'font-semibold text-ink-900' : 'text-ink-500',
        numeric && 'tabular',
      )}
    >
      {children}
    </td>
  );
}
