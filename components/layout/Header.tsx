'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LogoLink } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { LangToggle } from './LangToggle';
import { MobileNav } from './MobileNav';
import { useT } from './LanguageProvider';
import { Container } from './Container';
import { common, nav } from '@/content/site';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The header is white and borderless at rest; the shadow appears only once the
  // page has moved, so the hero reads as one uninterrupted surface.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-200',
        scrolled
          ? 'border-b border-ink-200 shadow-[0_1px_3px_rgba(16,24,32,.06)]'
          : 'border-b border-ink-200',
      )}
    >
      <Container size="wide">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <LogoLink height={36} priority />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                      active ? 'text-brand-600' : 'text-ink-700 hover:text-ink-900',
                    )}
                  >
                    {t(item.label)}
                  </Link>
                );
              }

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                      active ? 'text-brand-600' : 'text-ink-700 hover:text-ink-900',
                    )}
                  >
                    {t(item.label)}
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.75}
                      className="h-4 w-4 transition-transform duration-150 group-hover:rotate-180"
                    />
                  </Link>

                  {/* Hover-and-focus dropdown. `focus-within` keeps it reachable by keyboard. */}
                  <div className="invisible absolute start-0 top-full w-72 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="rounded-2xl border border-ink-200 bg-white p-2 shadow-[0_1px_3px_rgba(16,24,32,.06),0_8px_24px_rgba(16,24,32,.06)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block rounded-xl px-3 py-2.5 text-[15px] transition-colors',
                              pathname === child.href
                                ? 'bg-brand-50 text-brand-600'
                                : 'text-ink-700 hover:bg-ink-050 hover:text-ink-900',
                            )}
                          >
                            {t(child.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangToggle />
            </div>
            <ButtonLink href="/founding-seller" size="sm" className="hidden md:inline-flex">
              {t(common.becomeFoundingSeller)}
            </ButtonLink>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
