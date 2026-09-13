import type { Metadata } from 'next';
import { SellerHubContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { sellerHub } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: sellerHub.meta.title,
  description: sellerHub.meta.description,
  path: '/seller-hub/',
});

export default function SellerHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Seller Hub', path: '/seller-hub/' },
            ]),
          ),
        }}
      />
      <SellerHubContent />
    </>
  );
}
