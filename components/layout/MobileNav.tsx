'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoLink } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { LangToggle } from './LangToggle';
import { useT } from './LanguageProvider';
import { common, nav, waUrl } from '@/content/site';
import { cn } from '@/lib/utils';

/** Full-screen drawer. Opens below `lg`, where the desktop nav is hidden. */
export function MobileNav() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation - the drawer would otherwise persist across route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock the body while open, and close on Escape.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t(common.menu)}
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900 transition-colors hover:bg-ink-050 lg:hidden"
      >
        <Menu aria-hidden strokeWidth={1.75} className="h-5 w-5" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(common.menu)}
        hidden={!open}
        className="fixed inset-0 z-[60] bg-white lg:hidden"
      >
        <div className="flex h-[72px] items-center justify-between border-b border-ink-200 px-5">
          <LogoLink height={30} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t(common.close)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900"
          >
            <X aria-hidden strokeWidth={1.75} className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-5 py-6"
        >
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-xl px-3 py-3 text-lg font-semibold',
                    pathname === item.href ? 'text-brand-600' : 'text-ink-900',
                  )}
                >
                  {t(item.label)}
                </Link>

                {item.children ? (
                  <ul className="mb-2 ms-3 space-y-0.5 border-s border-ink-200 ps-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            'block rounded-lg px-3 py-2.5',
                            pathname === child.href ? 'text-brand-600' : 'text-ink-500',
                          )}
                        >
                          {t(child.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 border-t border-ink-200 pt-6">
            <ButtonLink href="/founding-seller" size="lg" block>
              {t(common.becomeFoundingSeller)}
            </ButtonLink>
            <ButtonLink href={waUrl} variant="secondary" size="lg" block>
              {t(common.whatsappUs)}
            </ButtonLink>
            <div className="pt-2">
              <LangToggle />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
