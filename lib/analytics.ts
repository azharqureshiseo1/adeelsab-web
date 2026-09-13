export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const analyticsEnabled = GA_ID.length > 0;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Fires a GA4 event. Safe no-op when analytics is disabled or on the server. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !analyticsEnabled) return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== 'function') return;
  w.gtag('event', name, params);
}
