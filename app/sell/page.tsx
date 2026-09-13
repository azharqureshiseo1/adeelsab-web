import type { Metadata } from 'next';
import { SellHubContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { sellHub } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: sellHub.meta.title,
  description: sellHub.meta.description,
  path: '/sell/',
});

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sell With Us', path: '/sell/' },
            ]),
          ),
        }}
      />
      <SellHubContent />
    </>
  );
}
