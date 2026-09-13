import type { Metadata } from 'next';
import { LocalSellersContent } from './content';
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from '@/lib/seo';
import { localSellerObjections, localSellers } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: localSellers.meta.title,
  description: localSellers.meta.description,
  path: '/sell/local-sellers/',
});

export default function LocalSellersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sell With Us', path: '/sell/' },
              { name: 'For Local Sellers', path: '/sell/local-sellers/' },
            ]),
            faqJsonLd(localSellerObjections.map((item) => ({ q: item.q.en, a: item.a.en }))),
          ]),
        }}
      />
      <LocalSellersContent />
    </>
  );
}
