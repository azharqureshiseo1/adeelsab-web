import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google';
import { LanguageProvider } from '@/components/layout/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/blocks/WhatsAppFab';
import { GA_ID, analyticsEnabled } from '@/lib/analytics';
import { OG_IMAGE, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

// Nastaliq is the only acceptable face for Urdu. Rendering Urdu in a Latin sans
// is the most visible failure mode on Pakistani sites, so this is not optional.
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-nastaliq',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AdeelSab - Sell across Pakistan. We handle the rest.',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'AdeelSab is a Pakistani marketplace for local sellers, resellers and dropshippers. Own fleet in-city, nationwide delivery via TCS, Leopards and PostEx, and payouts on a fixed schedule.',
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: true, address: false, email: false },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.svg' }],
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_PK',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
};

export const viewport: Viewport = {
  themeColor: '#FB5301',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang/dir start as English and are updated on the client by LanguageProvider.
    <html lang="en" dir="ltr" className={`${inter.variable} ${nastaliq.variable}`}>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled JSON-LD. No user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        <LanguageProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </LanguageProvider>

        {analyticsEnabled ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
