'use client';

import { useT } from '@/components/layout/LanguageProvider';
import { cities, delivery } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Stylised map of Pakistan on a 0-100 grid.
 *
 * The city markers are driven by the `cities` array in content/site.ts, so a
 * launch city can be added or promoted to own-fleet without touching this SVG.
 * The outline is deliberately simplified - it is an orientation device, not a
 * cartographic claim, and no border here should be read as authoritative.
 */
const OUTLINE =
  'M58 6 L66 11 L69 18 L64 23 L67 29 L62 33 L58 30 L52 33 L48 30 L44 33 L41 31 L38 36 L33 38 L30 44 L24 47 L20 54 L23 60 L21 66 L26 70 L31 72 L33 78 L29 84 L25 92 L33 93 L38 88 L44 84 L47 76 L52 70 L57 64 L62 58 L66 52 L70 47 L74 43 L72 37 L75 31 L72 25 L68 20 L64 12 Z';

export function CoverageMap({ className }: { className?: string }) {
  const t = useT();

  const ownFleet = cities.filter((city) => city.ownFleet);
  const partnerCities = cities.filter((city) => !city.ownFleet);

  return (
    <div className={cn('grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center', className)}>
      <div className="rounded-2xl border border-ink-200 bg-white p-4 md:p-6">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label="Map of Pakistan showing AdeelSab own-fleet cities and nationwide courier coverage"
          className="h-auto w-full"
        >
          <title>AdeelSab delivery coverage across Pakistan</title>

          <path d={OUTLINE} fill="#F1F4F7" stroke="#E2E6EB" strokeWidth="0.6" strokeLinejoin="round" />

          {partnerCities.map((city) => (
            <g key={city.name}>
              <circle cx={city.x} cy={city.y} r="1.1" fill="#7C8797" />
              <title>{`${city.name} - courier partner network`}</title>
            </g>
          ))}

          {ownFleet.map((city) => (
            <g key={city.name}>
              {/* Halo reads as service radius, not a data claim. */}
              <circle cx={city.x} cy={city.y} r="4" fill="#FB5301" opacity="0.14" />
              <circle cx={city.x} cy={city.y} r="1.9" fill="#FB5301" />
              <title>{`${city.name} - AdeelSab own fleet`}</title>
            </g>
          ))}
        </svg>

        <ul className="mt-4 flex flex-wrap justify-center gap-5 text-sm">
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 rounded-full bg-brand-500" />
            {t(delivery.map.ownFleet)}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 rounded-full bg-ink-400" />
            {t(delivery.map.partnerNetwork)}
          </li>
        </ul>
      </div>

      <div>
        <h3 className="t-h3">{t(delivery.map.title)}</h3>
        <p className="mt-3 text-ink-500">{t(delivery.map.note)}</p>

        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t(delivery.map.ownFleet)}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ownFleet.map((city) => (
              <li
                key={city.name}
                className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-600"
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
            {t(delivery.map.partnerNetwork)}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {partnerCities.map((city) => (
              <li
                key={city.name}
                className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-500"
              >
                {city.name}
              </li>
            ))}
            <li className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-400">
              + every other serviceable address in Pakistan
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
