import type { Metadata } from 'next';
import { BlogContent } from './content';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { blog } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: blog.meta.title,
  description: blog.meta.description,
  path: '/blog/',
});

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog/' },
            ]),
          ),
        }}
      />
      <BlogContent />
    </>
  );
}
