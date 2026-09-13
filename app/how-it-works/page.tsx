import type { Metadata } from 'next';
import { HowItWorksContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { howItWorks } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: howItWorks.meta.title,
  description: howItWorks.meta.description,
  path: '/how-it-works/',
});

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'How It Works', path: '/how-it-works/' },
            ]),
          ),
        }}
      />
      <HowItWorksContent />
    </>
  );
}
