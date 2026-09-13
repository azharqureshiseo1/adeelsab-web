'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Container } from './Container';
import { useT } from './LanguageProvider';
import { config, footerNav } from '@/content/site';

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

export function Footer() {
  const t = useT();

  const socials = (Object.keys(SOCIAL_ICONS) as Array<keyof typeof SOCIAL_ICONS>)
    .map((key) => ({ key, href: config.social[key], Icon: SOCIAL_ICONS[key] }))
    // TODO: social handles are unconfirmed — empty entries are simply not rendered
    // rather than linking to a dead profile.
    .filter((item) => item.href.length > 0);

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
                <MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-ink-400">{config.contact.addressLines.join(', ')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-brand-500" />
                <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="text-ink-400 hover:text-white">
                  {config.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-brand-500" />
                <a href={`mailto:${config.contact.supportEmail}`} className="text-ink-400 hover:text-white">
                  {config.contact.supportEmail}
                </a>
              </li>
            </ul>

            {socials.length > 0 ? (
              <div className="mt-6 flex gap-2">
                {socials.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-ink-400 transition-colors hover:border-brand-500 hover:text-white"
                  >
                    <Icon aria-hidden strokeWidth={1.75} className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            ) : null}
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

        <div className="border-t border-ink-800 py-7">
          <div className="flex flex-col gap-4 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {/* TODO: registered entity, SECP number and NTN all need real values. */}
              <p>{config.legal.entity}</p>
              <p>
                SECP: {config.legal.secp} · NTN: {config.legal.ntn}
              </p>
            </div>
            <div className="flex flex-col gap-1 md:items-end">
              <p>
                &copy; {new Date().getFullYear()} {config.brand}. All rights reserved.
              </p>
              <p>Made in Pakistan 🇵🇰</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
