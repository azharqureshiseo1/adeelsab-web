'use client';

import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section } from '@/components/layout/Section';
import { useT } from '@/components/layout/LanguageProvider';
import { legal } from '@/content/site';

/**
 * Shared shell for the three legal documents.
 *
 * The review notice is not decoration: these are working drafts written for the
 * pre-launch site and have not been through a Pakistani lawyer. Publishing them
 * without saying so would be worse than not publishing them.
 */
export function LegalPage({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  const t = useT();

  return (
    <>
      <PageHero eyebrow="Legal" title={title} sub={sub} />

      <Section tone="white" size="narrow">
        <div className="mb-10 flex gap-3 rounded-[10px] border border-[#F2D9A8] bg-[#FFF6E5] p-4 text-sm text-[#8A5A00]">
          <AlertTriangle aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{t(legal.reviewNotice)}</p>
        </div>

        <p className="text-sm text-ink-400">{t(legal.lastUpdated)}</p>

        <div className="prose-as mt-8">{children}</div>
      </Section>
    </>
  );
}
