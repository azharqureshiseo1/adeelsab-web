'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useT } from '@/components/layout/LanguageProvider';
import { common, notFound, paths } from '@/content/site';

export default function NotFound() {
  const t = useT();

  return (
    <section className="bg-ink-050">
      <Container size="wide">
        <div className="py-20 md:py-28">
          <p className="text-brand-gradient text-7xl font-extrabold md:text-8xl">404</p>
          <h1 className="t-h1 mt-4">{t(notFound.title)}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-500">{t(notFound.sub)}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              {t(common.backHome)}
            </ButtonLink>
            <ButtonLink href="/founding-seller" variant="secondary" size="lg">
              {t(common.becomeFoundingSeller)}
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {paths.map((path) => (
              <Card key={path.id} interactive>
                <h2 className="t-h4 font-bold">
                  <Link href={path.href} className="hover:text-brand-600">
                    {t(path.title)}
                  </Link>
                </h2>
                <p className="mt-2 text-[15px] text-ink-500">{t(path.promise)}</p>
                <Link
                  href={path.href}
                  className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-500"
                >
                  {t(common.learnMore)}
                  <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
