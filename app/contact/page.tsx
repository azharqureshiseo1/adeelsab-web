import type { Metadata } from 'next';
import { ContactContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { contact } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: contact.meta.title,
  description: contact.meta.description,
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Contact & Support', path: '/contact/' },
            ]),
          ),
        }}
      />
      <ContactContent />
    </>
  );
}
