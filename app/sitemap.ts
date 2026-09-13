import type { MetadataRoute } from 'next';
import { blogMeta, sellerHubMeta } from '@/content/doc-meta';
import { SITE_URL } from '@/lib/seo';

// Static export requires these routes to be explicitly marked static.
export const dynamic = 'force-static';

/**
 * Priorities reflect the acquisition funnel rather than a guess at importance:
 * the Founding Seller page and the local-seller page are what Phase 0 marketing
 * drives traffic to, so they rank above the corporate pages.
 */
const ROUTES: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/founding-seller/', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/sell/local-sellers/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/sell/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sell/resellers/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/delivery/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/reseller-listings/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/payouts/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/how-it-works/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/seller-hub/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog/', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/sell/dropshippers/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/careers/', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/legal/privacy/', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/legal/terms/', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/legal/seller-agreement/', priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ROUTES.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const docRoutes = sellerHubMeta.map((doc) => ({
    url: new URL(`/seller-hub/${doc.slug}/`, SITE_URL).toString(),
    lastModified: new Date(doc.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogMeta.map((post) => ({
    url: new URL(`/blog/${post.slug}/`, SITE_URL).toString(),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes, ...blogRoutes];
}
