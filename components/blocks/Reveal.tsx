'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** How long to wait for the observer before checking position ourselves. */
const FAILSAFE_MS = 2500;

/**
 * CSS-only scroll reveal driven by IntersectionObserver. No animation library.
 *
 * Two deliberate safeguards, because a decorative animation must never be able
 * to hide real content:
 *
 * 1. **Visible until proven otherwise.** Nothing is hidden until the observer
 *    has fired once and reported the element as sitting *below* the viewport.
 *    So no JS, a hydration failure, or a missing observer all leave the page
 *    fully readable, and a reader who jumps past an element (anchor link,
 *    restored scroll position) never lands on a blank section.
 *
 * 2. **A failsafe re-check.** Observer callbacks are not delivered while a tab
 *    is unpainted — backgrounded, occluded, or in some embedded viewers — so an
 *    element can be hidden and then never told it came into view. A timer and a
 *    visibilitychange listener re-check position directly and reveal anything
 *    that is on screen regardless.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, for grids of cards. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  /** Reveals if any part of the element is on screen. Used by the failsafe. */
  const revealIfOnScreen = useCallback(() => {
    const node = ref.current;
    if (!node) return false;
    const rect = node.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (onScreen) setHidden(false);
    return onScreen;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let settled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          settled = true;
          setHidden(false);
          observer.disconnect();
          return;
        }

        // Out of view. Hide only while it is still below the viewport; above
        // means the reader has already gone past it.
        const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight;
        if (entry.boundingClientRect.top >= rootBottom) {
          setHidden(true);
        } else {
          settled = true;
          setHidden(false);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    observer.observe(node);

    const failsafe = window.setInterval(() => {
      if (settled) {
        window.clearInterval(failsafe);
        return;
      }
      if (revealIfOnScreen()) {
        settled = true;
        observer.disconnect();
        window.clearInterval(failsafe);
      }
    }, FAILSAFE_MS);

    const onVisible = () => {
      if (!settled && document.visibilityState === 'visible') revealIfOnScreen();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      observer.disconnect();
      window.clearInterval(failsafe);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [revealIfOnScreen]);

  return (
    <div
      ref={ref}
      className={cn('reveal', hidden && 'reveal-hidden', className)}
      style={delay && hidden ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
