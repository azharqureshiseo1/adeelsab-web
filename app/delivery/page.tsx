import type { Metadata } from 'next';
import { DeliveryContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { delivery } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: delivery.meta.title,
  description: delivery.meta.description,
  path: '/delivery/',
});

export default function DeliveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Delivery & Coverage', path: '/delivery/' },
            ]),
          ),
        }}
      />
      <DeliveryContent />
    </>
  );
}
