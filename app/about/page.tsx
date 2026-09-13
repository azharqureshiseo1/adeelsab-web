import type { Metadata } from 'next';
import { AboutContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { about } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: about.meta.title,
  description: about.meta.description,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about/' },
            ]),
          ),
        }}
      />
      <AboutContent />
    </>
  );
}
