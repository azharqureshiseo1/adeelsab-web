'use client';

import { Briefcase, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/blocks/Hero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { TodoBadge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { useT } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { common, config, contact, waUrl } from '@/content/site';

export function ContactContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(contact.hero.eyebrow)}
        title={t(contact.hero.title)}
        sub={t(contact.hero.sub)}
      >
        <ButtonLink
          href={waUrl}
          variant="whatsapp"
          size="lg"
          onClick={() => trackEvent('whatsapp_click', { location: 'contact_hero' })}
        >
          <MessageCircle aria-hidden strokeWidth={1.75} className="h-5 w-5" />
          {t(common.talkOnWhatsApp)}
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          <Card emphasis>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <MessageCircle aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h2 className="t-h3 mt-5">{t(contact.merchantSupport.title)}</h2>
            <p className="mt-3 text-ink-500">{t(contact.merchantSupport.body)}</p>

            <ul className="mt-5 space-y-3 text-[15px]">
              <li className="flex items-center gap-2.5">
                <MessageCircle aria-hidden strokeWidth={1.75} className="h-4 w-4 text-brand-500" />
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact_support' })}
                  className="font-semibold text-brand-600 underline underline-offset-2"
                >
                  WhatsApp support
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden strokeWidth={1.75} className="h-4 w-4 text-brand-500" />
                <a href={`mailto:${config.contact.supportEmail}`} className="hover:text-ink-900">
                  {config.contact.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden strokeWidth={1.75} className="h-4 w-4 text-brand-500" />
                <a
                  href={`tel:${config.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-ink-900"
                >
                  {config.contact.phone}
                </a>
              </li>
            </ul>
            {/* TODO: confirm the WhatsApp number, support email and phone line. */}
            <TodoBadge>TODO: confirm contact details</TodoBadge>
          </Card>

          <Card>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <Briefcase aria-hidden strokeWidth={1.75} className="h-6 w-6" />
            </span>
            <h2 className="t-h3 mt-5">{t(contact.business.title)}</h2>
            <p className="mt-3 text-ink-500">{t(contact.business.body)}</p>

            <ul className="mt-5 space-y-3 text-[15px]">
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden strokeWidth={1.75} className="h-4 w-4 text-ink-400" />
                <a href={`mailto:${config.contact.businessEmail}`} className="hover:text-ink-900">
                  {config.contact.businessEmail}
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="t-h2">{t(contact.office.title)}</h2>

            <ul className="mt-6 space-y-4 text-[15px]">
              <li className="flex gap-3">
                <MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <address className="not-italic">
                  {config.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <span>{t(config.contact.hours)}</span>
              </li>
            </ul>

            <TodoBadge>TODO: confirm office address</TodoBadge>
          </div>

          {/* Map embed is deliberately deferred: embedding a map for an
              unconfirmed address would put the wrong pin on the page. */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center">
            <p className="max-w-xs text-[15px] text-ink-400">{t(contact.mapPlaceholder)}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
