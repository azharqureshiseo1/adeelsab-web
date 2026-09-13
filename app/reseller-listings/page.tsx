import type { Metadata } from 'next';
import { ResellerListingsContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { resellerListings } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: resellerListings.meta.title,
  description: resellerListings.meta.description,
  path: '/reseller-listings/',
});

export default function ResellerListingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Reseller-Enabled Listings', path: '/reseller-listings/' },
            ]),
          ),
        }}
      />
      <ResellerListingsContent />
    </>
  );
}
