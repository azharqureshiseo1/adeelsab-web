import type { Metadata } from 'next';
import { CareersContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { careers } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: careers.meta.title,
  description: careers.meta.description,
  path: '/careers/',
});

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Careers', path: '/careers/' },
            ]),
          ),
        }}
      />
      <CareersContent />
    </>
  );
}
