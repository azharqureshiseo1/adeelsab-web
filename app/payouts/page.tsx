import type { Metadata } from 'next';
import { PayoutsContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { payouts } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: payouts.meta.title,
  description: payouts.meta.description,
  path: '/payouts/',
});

export default function PayoutsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Payouts & Settlement', path: '/payouts/' },
            ]),
          ),
        }}
      />
      <PayoutsContent />
    </>
  );
}
