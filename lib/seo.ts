import type { Metadata } from 'next';

const FALLBACK_SITE_URL = 'https://www.adeelsab.com';

/**
 * Resolves the canonical origin, tolerantly.
 *
 * Every URL on the site is built from this, so an unusable value fails the
 * whole build with `TypeError: Invalid URL` on `/_not-found`, which says
 * nothing about the cause. The two ways it goes wrong are both easy to do in a
 * hosting panel:
 *
 *   - The variable exists but is **empty**. `??` does not catch that, because
 *     an empty string is not nullish.
 *   - The protocol is missing — `www.adeelsab.com` rather than `https://…`.
 *
 * Both are repaired here rather than thrown. On Vercel the deployment URL is
 * used when nothing is set, so preview builds get correct absolute URLs without
 * anything being configured.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel sets these itself. Server-side only, which is all metadata needs.
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
      return new URL(withProtocol).origin;
    } catch {
      console.warn(`[seo] Ignoring unusable site URL: ${JSON.stringify(candidate)}`);
    }
  }

  return FALLBACK_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = 'AdeelSab';
export const OG_IMAGE = '/og-image.png'; // 1200x630, built by scripts/generate-brand-assets.py

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

/** Builds a consistent metadata object for a page. */
export function pageMeta({
  title,
  description,
  path,
  image = OG_IMAGE,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_PK',
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE_NAME} — ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** Organization JSON-LD. Placeholder identifiers are tracked in CONTENT-TODO.md. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'AdeelSab (Private) Limited',
    url: SITE_URL,
    logo: new URL('/brand/adeelsab-logo-dark.png', SITE_URL).toString(),
    description:
      'AdeelSab is a Pakistani multi-vendor marketplace connecting local sellers, resellers and dropshippers with nationwide delivery.',
    // SECP incorporation number, issued by the Securities and Exchange
    // Commission of Pakistan.
    identifier: {
      '@type': 'PropertyValue',
      name: 'SECP Registration Number',
      value: '0353167',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'TODO: office address',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'merchant support',
        email: 'support@adeelsab.com', // TODO: confirm
        areaServed: 'PK',
        availableLanguage: ['Urdu', 'English'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/adeelsab.pk',
      'https://www.instagram.com/adeelsab.pk',
      'https://www.tiktok.com/@adeelsab.pk',
      'https://www.threads.com/@adeelsab.pk',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['en-PK', 'ur-PK'],
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
