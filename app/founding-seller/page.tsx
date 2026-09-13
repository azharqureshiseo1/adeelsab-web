import type { Metadata } from 'next';
import { FoundingSellerContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { foundingSeller } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: foundingSeller.meta.title,
  description: foundingSeller.meta.description,
  path: '/founding-seller/',
});

export default function FoundingSellerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Founding Seller Program', path: '/founding-seller/' },
            ]),
          ),
        }}
      />
      <FoundingSellerContent />
    </>
  );
}
