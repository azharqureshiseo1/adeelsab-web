import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocArticle } from '@/components/blocks/DocArticle';
import { getSellerHubDoc } from '@/content/docs';
import { sellerHubMeta } from '@/content/doc-meta';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';

type Params = { slug: string };

/** Static export needs every slug enumerated at build time. */
export function generateStaticParams(): Params[] {
  return sellerHubMeta.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getSellerHubDoc(slug);
  if (!doc) return {};

  return pageMeta({
    title: doc.title,
    description: doc.description,
    path: `/seller-hub/${slug}/`,
  });
}

export default async function SellerHubDocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getSellerHubDoc(slug);
  if (!doc) notFound();

  // Component functions cannot cross the server/client boundary, so the
  // bodies are rendered here and only plain metadata is passed as a prop.
  const { Content, ContentUr, ...meta } = doc;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Seller Hub', path: '/seller-hub/' },
              { name: doc.title, path: `/seller-hub/${slug}/` },
            ]),
          ),
        }}
      />
      <DocArticle
        meta={meta}
        backHref="/seller-hub"
        backLabel="Seller Hub"
        urdu={ContentUr ? <ContentUr /> : undefined}
      >
        <Content />
      </DocArticle>
    </>
  );
}
