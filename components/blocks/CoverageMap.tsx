'use client';

import { useT } from '@/components/layout/LanguageProvider';
import { MAP_VIEWBOX, PAKISTAN_OUTLINE } from '@/content/pakistan-outline';
import { cities, delivery } from '@/content/site';
import { projectToMap } from '@/lib/geo';
import { cn } from '@/lib/utils';

/**
 * Map of Pakistan with delivery coverage.
 *
 * The outline is real boundary data (Natural Earth, public domain), projected
 * to spherical Mercator by scripts/generate-coverage-map.py. City pins are
 * projected at render time from their actual latitude and longitude, so adding
 * a city — or promoting one to own-fleet — is a data edit in content/site.ts
 * and never a change to this file.
 */
export function CoverageMap({ className }: { className?: string }) {
  const t = useT();

  const ownFleet = cities.filter((city) => city.ownFleet);
  const partnerCities = cities.filter((city) => !city.ownFleet);

  return (
    <div className={cn('grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12', className)}>
      <div className="rounded-2xl border border-ink-200 bg-white p-4 md:p-6">
        <svg
          viewBox={`-4 -4 ${MAP_VIEWBOX.width + 8} ${MAP_VIEWBOX.height + 8}`}
          role="img"
          aria-labelledby="coverage-map-title coverage-map-desc"
          className="h-auto w-full"
        >
          <title id="coverage-map-title">AdeelSab delivery coverage across Pakistan</title>
          <desc id="coverage-map-desc">
            {`AdeelSab Couriers operates its own fleet in ${ownFleet
              .map((c) => c.name)
              .join(', ')}. Every other city shown, and the rest of Pakistan, is served by our courier partners.`}
          </desc>

          <path
            d={PAKISTAN_OUTLINE}
            fill="#F1F4F7"
            stroke="#D7DDE4"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />

          {partnerCities.map((city) => {
            const { x, y } = projectToMap(city.lat, city.lon);
            return (
              <circle key={city.name} cx={x} cy={y} r="1.1" fill="#7C8797">
                <title>{`${city.name} — courier partner network`}</title>
              </circle>
            );
          })}

          {ownFleet.map((city) => {
            const { x, y } = projectToMap(city.lat, city.lon);
            return (
              <g key={city.name}>
                {/* The halo reads as a service area, not a precise radius. */}
                <circle cx={x} cy={y} r="4.5" fill="#FB5301" opacity="0.15" />
                <circle cx={x} cy={y} r="2.2" fill="#FB5301" stroke="#FFFFFF" strokeWidth="0.6" />
                <title>{`${city.name} — AdeelSab Couriers own fleet`}</title>
              </g>
            );
          })}
        </svg>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 rounded-full bg-brand-500" />
            {t(delivery.map.ownFleet)}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-400" />
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
