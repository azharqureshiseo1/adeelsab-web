import type { Metadata } from 'next';
import { Hero } from '@/components/blocks/Hero';
import { ThreePaths } from '@/components/blocks/ThreePaths';
import { CapabilityBand } from '@/components/blocks/CapabilityBand';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { ResellerExplainer } from '@/components/blocks/ResellerExplainer';
import { DeliveryTeaser } from '@/components/blocks/DeliveryTeaser';
import { ProgramTeaser } from '@/components/blocks/ProgramTeaser';
import { TrustBar } from '@/components/blocks/TrustBar';
import { FAQ } from '@/components/blocks/FAQ';
import { CTABand } from '@/components/blocks/CTABand';
import { home, homeFaqs } from '@/content/site';
import { faqJsonLd, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(homeFaqs.map((item) => ({ q: item.q.en, a: item.a.en }))),
          ),
        }}
      />

      <Hero />
      <ThreePaths />
      <CapabilityBand />
      <HowItWorks />
      <ResellerExplainer />
      <DeliveryTeaser />
      <ProgramTeaser />
      <TrustBar />
      <FAQ items={homeFaqs} />
      <CTABand source="home_footer" />
    </>
  );
}
