'use client';

import Link from 'next/link';
import { PageHero } from '@/components/blocks/Hero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABand } from '@/components/blocks/CTABand';
import { useT } from '@/components/layout/LanguageProvider';
import { blogMeta } from '@/content/doc-meta';
import { blog, common } from '@/content/site';

export function BlogContent() {
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t(blog.eyebrow)} title={t(blog.title)} sub={t(blog.sub)} />

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogMeta.map((post) => (
            <Card key={post.slug} interactive className="flex h-full flex-col">
              <Badge tone="neutral">{t(post.audience)}</Badge>
              <h2 className="t-h4 mt-4 font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
                  {t(post.title)}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-[15px] text-ink-500">{t(post.description)}</p>
              <p className="mt-5 text-sm text-ink-400">
                {post.minutes} {t(common.minRead)} · {post.updatedAt}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand source="blog_index" withForm={false} />
    </>
  );
}
