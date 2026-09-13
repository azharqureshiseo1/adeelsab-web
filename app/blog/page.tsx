import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/blocks/Hero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABand } from '@/components/blocks/CTABand';
import { blogMeta } from '@/content/doc-meta';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Blog - AdeelSab',
  description:
    'Practical writing on selling online in Pakistan: getting started, reselling without capital, dropshipping economics and reducing returns.',
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

      <PageHero
        eyebrow="Blog"
        title="Writing about selling online in Pakistan"
        sub="Guides for people building a real business here, not a case study from somewhere else."
      />

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogMeta.map((post) => (
            <Card key={post.slug} interactive className="flex h-full flex-col">
              <Badge tone="neutral">{post.audience}</Badge>
              <h2 className="t-h4 mt-4 font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-[15px] text-ink-500">{post.description}</p>
              <p className="mt-5 text-sm text-ink-400">
                {post.minutes} min read · {post.updatedAt}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand source="blog_index" withForm={false} />
    </>
  );
}
