'use client';

import { Section, SectionHeading } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { useT } from '@/components/layout/LanguageProvider';
import { home } from '@/content/site';
import type { Faq } from '@/content/site';

export function FAQ({
  items,
  title,
  sub,
  tone = 'white',
}: {
  items: Faq[];
  title?: string;
  sub?: string;
  tone?: 'white' | 'muted';
}) {
  const t = useT();

  return (
    <Section tone={tone} size="narrow" id="faq">
      <SectionHeading title={title ?? t(home.faq.title)} sub={sub ?? t(home.faq.sub)} />
      <div className="mt-10">
        <Accordion items={items} />
      </div>
    </Section>
  );
}
