import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocArticle } from '@/components/blocks/DocArticle';
import { getBlogPost } from '@/content/docs';
import { blogMeta } from '@/content/doc-meta';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { blog } from '@/content/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogMeta.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return pageMeta({
    // Search engines index the English; the Urdu is what the reader sees.
    title: post.title.en,
    description: post.description.en,
    path: `/blog/${slug}/`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Component functions cannot cross the server/client boundary, so the
  // bodies are rendered here and only plain metadata is passed as a prop.
  const { Content, ContentUr, ...meta } = post;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog/' },
              { name: post.title.en, path: `/blog/${slug}/` },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title.en,
              description: post.description.en,
              datePublished: post.updatedAt,
              dateModified: post.updatedAt,
              author: { '@type': 'Organization', name: 'AdeelSab' },
              publisher: { '@type': 'Organization', name: 'AdeelSab' },
            },
          ]),
        }}
      />
      <DocArticle
        meta={meta}
        backHref="/blog"
        backLabel={blog.eyebrow}
        urdu={ContentUr ? <ContentUr /> : undefined}
      >
        <Content />
      </DocArticle>
    </>
  );
}
