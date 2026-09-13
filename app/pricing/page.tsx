import type { Metadata } from 'next';
import { PricingContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { pricing } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: pricing.meta.title,
  description: pricing.meta.description,
  path: '/pricing/',
});

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Pricing & Commissions', path: '/pricing/' },
            ]),
          ),
        }}
      />
      <PricingContent />
    </>
  );
}
