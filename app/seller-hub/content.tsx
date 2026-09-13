'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABand } from '@/components/blocks/CTABand';
import { Reveal } from '@/components/blocks/Reveal';
import { useT } from '@/components/layout/LanguageProvider';
import { sellerHubMeta } from '@/content/doc-meta';
import { common, sellerHub } from '@/content/site';

export function SellerHubContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(sellerHub.hero.eyebrow)}
        title={t(sellerHub.hero.title)}
        sub={t(sellerHub.hero.sub)}
      />

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sellerHubMeta.map((doc, index) => (
            <Reveal key={doc.slug} delay={index * 60}>
              <Card interactive className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">{doc.audience}</Badge>
                  {doc.locales.includes('ur') ? (
                    <Badge tone="active">
                      <span className="font-urdu">اردو</span>
                    </Badge>
                  ) : null}
                </div>

                <h2 className="t-h4 mt-4 font-bold">
                  <Link href={`/seller-hub/${doc.slug}`} className="hover:text-brand-600">
                    {doc.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-[15px] text-ink-500">{doc.description}</p>

                <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-ink-400">
                    <Clock aria-hidden strokeWidth={1.75} className="h-4 w-4" />
                    {doc.minutes} {t(common.minRead)}
                  </span>
                  <Link
                    href={`/seller-hub/${doc.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
                  >
                    {t(common.readMore)}
                    <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand source="seller_hub" withForm={false} />
    </>
  );
}
