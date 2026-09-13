import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static export requires these routes to be explicitly marked static.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The PHP endpoint is not a page and has nothing to index.
        disallow: ['/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
    host: SITE_URL,
  };
}
