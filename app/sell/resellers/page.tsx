import type { Metadata } from 'next';
import { ResellersContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { resellers } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: resellers.meta.title,
  description: resellers.meta.description,
  path: '/sell/resellers/',
});

export default function ResellersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sell With Us', path: '/sell/' },
              { name: 'For Resellers', path: '/sell/resellers/' },
            ]),
          ),
        }}
      />
      <ResellersContent />
    </>
  );
}
