'use client';

import { Banknote, Clock, Map, MessageCircle, Truck } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { useT } from '@/components/layout/LanguageProvider';
import { capabilities, home } from '@/content/site';

const ICONS = {
  truck: Truck,
  map: Map,
  banknote: Banknote,
  clock: Clock,
  messageCircle: MessageCircle,
} as const;

/**
 * Capability, not vanity metrics.
 *
 * The platform is pre-launch: there are no users, orders or GMV to report, and
 * inventing them would be discovered. These are things we can actually do on
 * day one, which is the only honest proof available before launch.
 */
export function CapabilityBand() {
  const t = useT();

  return (
    <Section tone="dark" spacing="tight" size="wide">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-brand-400">
        {t(home.capability.title)}
      </h2>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {capabilities.map((capability) => {
          const Icon = ICONS[capability.icon];

          return (
            <div key={capability.label.en} className="text-center">
              <Icon
                aria-hidden
                strokeWidth={1.75}
                className="mx-auto h-6 w-6 text-brand-500"
              />
              <dt className="sr-only">{t(capability.label)}</dt>
              <dd>
                <span className="text-brand-gradient tabular mt-3 block text-2xl font-extrabold md:text-3xl">
                  {t(capability.value)}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-400">
                  {t(capability.label)}
                </span>
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-400">
        {t(home.capability.note)}
      </p>
    </Section>
  );
}
