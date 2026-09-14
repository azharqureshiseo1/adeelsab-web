'use client';

import { Building2, FileCheck2, MapPin, MessageCircle } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { TodoBadge } from '@/components/ui/Badge';
import { RegistrationMarks } from './RegistrationMarks';
import { useT } from '@/components/layout/LanguageProvider';
import { config, home, waUrl } from '@/content/site';

/**
 * Closes the credibility gap. An anonymous platform does not convert merchants,
 * so the registration details, the address and a named human all appear here.
 *
 * Every value on this block is a TODO until the business confirms it - marked
 * visibly rather than quietly invented. See CONTENT-TODO.md.
 */
export function TrustBar() {
  const t = useT();

  return (
    <Section tone="muted" id="trust">
      <SectionHeading title={t(home.trust.title)} sub={t(home.trust.sub)} />

      <div className="mt-12">
        <Card>
          <ul className="grid gap-6 sm:grid-cols-2">
            <li className="flex gap-3">
              <FileCheck2 aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <div>
                <h3 className="font-semibold text-ink-900">Registered company</h3>
                <p className="mt-1 text-[15px] text-ink-500">{config.legal.entityFormal}</p>
              </div>
            </li>

            <li className="flex gap-3">
              <Building2 aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <div>
                <h3 className="font-semibold text-ink-900">
                  SECP{config.legal.ntn ? ' & NTN' : ' registration'}
                </h3>
                <p className="mt-1 text-[15px] text-ink-500">
                  <span className="tabular">{config.legal.secp}</span>
                  {config.legal.ntn ? (
                    <>
                      {' · '}
                      <span className="tabular">{config.legal.ntn}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <div>
                <h3 className="font-semibold text-ink-900">Our office</h3>
                <p className="mt-1 text-[15px] text-ink-500">
                  {config.contact.addressLines.join(', ')}
                  <TodoBadge />
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <MessageCircle aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <div>
                <h3 className="font-semibold text-ink-900">Support in Urdu</h3>
                <p className="mt-1 text-[15px] text-ink-500">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-600 underline underline-offset-2"
                  >
                    WhatsApp
                  </a>{' '}
                  {t(config.contact.hours)}
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-6 border-t border-ink-200 pt-6">
            <RegistrationMarks tone="light" />
          </div>
        </Card>
      </div>
    </Section>
  );
}
