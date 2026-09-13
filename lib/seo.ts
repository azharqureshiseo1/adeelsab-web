import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adeelsab.com';
export const SITE_NAME = 'AdeelSab';
export const OG_IMAGE = '/og-image.svg'; // TODO: replace with a 1200x630 PNG — see TODO-IMAGES.md

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
    url: SITE_URL,
    logo: new URL('/brand/adeelsab-logo-dark.svg', SITE_URL).toString(),
    description:
      'AdeelSab is a Pakistani multi-vendor marketplace connecting local sellers, resellers and dropshippers with nationwide delivery.',
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
        telephone: '+92-300-0000000', // TODO: real WhatsApp support number
        areaServed: 'PK',
        availableLanguage: ['Urdu', 'English'],
      },
    ],
    sameAs: [], // TODO: social profile URLs
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
