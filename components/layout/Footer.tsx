'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { RegistrationMarks } from '@/components/blocks/RegistrationMarks';
import { Container } from './Container';
import { SocialLinks } from './SocialLinks';
import { useT } from './LanguageProvider';
import { config, footerNav } from '@/content/site';

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-ink-900 text-ink-200">
      <Container size="wide">
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Logo variant="orange" height={34} />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-400">
              A Pakistani marketplace built for shop owners, resellers and dropshippers. Own fleet
              in-city, nationwide delivery, and payouts on a fixed schedule.
            </p>

            <ul className="mt-6 space-y-2.5 text-[15px]">
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden
                  strokeWidth={1.75}
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                />
                {/* TODO: confirm office address. */}
                <span className="text-ink-400">{config.contact.addressLines.join(', ')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-brand-500" />
                <a
                  href={`mailto:${config.contact.supportEmail}`}
                  className="text-ink-400 hover:text-white"
                >
                  {config.contact.supportEmail}
                </a>
              </li>
            </ul>

            <SocialLinks className="mt-6" />
          </div>

          {footerNav.map((column) => (
            <div key={column.title.en}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
                {t(column.title)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink-400 transition-colors hover:text-white"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registered-company band. A merchant can verify every line of this. */}
        <div className="border-t border-ink-800 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{config.legal.entityFormal}</p>
              <p className="mt-1 text-sm text-ink-400">
                SECP Registration Number:{' '}
                <span className="tabular text-ink-200">{config.legal.secp}</span>
                {config.legal.ntn ? (
                  <>
                    {' · '}NTN: <span className="tabular text-ink-200">{config.legal.ntn}</span>
                  </>
                ) : null}
              </p>
            </div>

            <RegistrationMarks />
          </div>
        </div>

        <div className="border-t border-ink-800 py-7">
          <div className="flex flex-col gap-2 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 {config.brand}. All rights reserved.</p>
            <p>
              Developed by{' '}
              <a
                href={config.developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink-200 underline decoration-ink-700 underline-offset-4 transition-colors hover:text-white hover:decoration-brand-500"
              >
                {config.developer.name}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
