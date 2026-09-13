'use client';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { WaitlistForm } from './WaitlistForm';
import { useT } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { common, home, waUrl } from '@/content/site';

/**
 * Every page ends here. There is no page on this site whose purpose is merely
 * to inform - the site has to acquire merchants, not only reassure them.
 */
export function CTABand({
  title,
  sub,
  source,
  withForm = true,
}: {
  title?: string;
  sub?: string;
  source: string;
  /** When false, shows buttons instead of the inline form. */
  withForm?: boolean;
}) {
  const t = useT();

  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Logo variant="orange" height={34} />
            <h2 className="t-h2 mt-6 text-white">{title ?? t(home.finalCta.title)}</h2>
            <p className="mt-4 max-w-lg text-lg text-ink-200">{sub ?? t(home.finalCta.sub)}</p>

            {!withForm ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/founding-seller"
                  size="lg"
                  onClick={() => trackEvent('cta_click', { location: source })}
                >
                  {t(common.becomeFoundingSeller)}
                </ButtonLink>
                <ButtonLink href={waUrl} variant="dark" size="lg">
                  {t(common.whatsappUs)}
                </ButtonLink>
              </div>
            ) : null}
          </div>

          {withForm ? (
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_6px_rgba(16,24,32,.08),0_16px_40px_rgba(16,24,32,.1)] md:p-8">
              <WaitlistForm source={source} compact />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
