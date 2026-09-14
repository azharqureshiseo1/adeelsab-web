'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, Clock, Languages } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { common, sellerHub } from '@/content/site';
import type { DocMeta } from '@/content/doc-meta';
import type { Copy } from '@/lib/i18n';

/**
 * Shared article shell for Seller Hub docs and blog posts.
 *
 * Both language bodies are passed in as already-rendered children rather than
 * as components: a server component cannot hand a function across the client
 * boundary, and the language toggle is client state. Both are in the HTML and
 * one is hidden, which also means the Urdu copy is present for search engines.
 *
 * Where no translation exists we show English and say so, rather than silently
 * serving English under an Urdu toggle. Missing translations are listed in
 * CONTENT-TODO.md.
 */
export function DocArticle({
  meta,
  backHref,
  backLabel,
  children,
  urdu,
}: {
  meta: DocMeta;
  backHref: string;
  /** Bilingual, so the back link is not the one English word left on the page. */
  backLabel: Copy;
  /** The English body. */
  children: ReactNode;
  /** The Urdu body, when a translation exists. */
  urdu?: ReactNode;
}) {
  const { t, isUrdu } = useLanguage();

  const hasUrdu = Boolean(urdu);
  const showUrdu = isUrdu && hasUrdu;

  return (
    <>
      <section className="border-b border-ink-200 bg-ink-050">
        <Container size="wide">
          <div className="py-10 md:py-14">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"
            >
              <ArrowLeft aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
              {t(backLabel)}
            </Link>

            <h1 className="t-h1 mt-5 max-w-3xl">{t(meta.title)}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-500">{t(meta.description)}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-400">
              <Badge tone="neutral">{t(meta.audience)}</Badge>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden strokeWidth={1.75} className="h-4 w-4" />
                {meta.minutes} {t(common.minRead)}
              </span>
              <span>
                {t(common.updated)} {meta.updatedAt}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white" size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
          <article>
            {isUrdu && !hasUrdu ? (
              <p className="mb-8 flex gap-3 rounded-[10px] border border-[#F2D9A8] bg-[#FFF6E5] p-4 text-sm text-[#8A5A00]">
                <Languages aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  اس مضمون کا اردو ترجمہ ابھی تیار نہیں۔ ذیل میں انگریزی متن دکھایا جا رہا ہے۔
                  <span className="latin"> (Urdu translation pending.)</span>
                </span>
              </p>
            ) : null}

            <div className="prose-as" lang="en" dir="ltr" hidden={showUrdu}>
              {children}
            </div>

            {hasUrdu ? (
              <div className="prose-as font-urdu" lang="ur" dir="rtl" hidden={!showUrdu}>
                {urdu}
              </div>
            ) : null}

            <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
              <h2 className="t-h3">{t(sellerHub.ctaTitle)}</h2>
              <p className="mt-3 text-ink-500">{t(sellerHub.ctaBody)}</p>
              <ButtonLink href="/founding-seller" size="lg" className="mt-6">
                {t(common.becomeFoundingSeller)}
              </ButtonLink>
            </div>
          </article>

          {/* Table of contents. Hidden on mobile, where it would push the article down. */}
          <aside className="hidden lg:block">
            <nav aria-label={t(common.onThisPage)} className="sticky top-28">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
                {t(common.onThisPage)}
              </p>
              <ul className="mt-4 space-y-2.5 border-s border-ink-200 ps-4">
                {meta.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[15px] text-ink-500 transition-colors hover:text-brand-600"
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Section>
    </>
  );
}
