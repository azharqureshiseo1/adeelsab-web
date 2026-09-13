import type { Metadata } from 'next';
import { DropshippersContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { dropshippers } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: dropshippers.meta.title,
  description: dropshippers.meta.description,
  path: '/sell/dropshippers/',
});

export default function DropshippersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sell With Us', path: '/sell/' },
              { name: 'For Dropshippers', path: '/sell/dropshippers/' },
            ]),
          ),
        }}
      />
      <DropshippersContent />
    </>
  );
}
