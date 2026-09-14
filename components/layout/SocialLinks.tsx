'use client';

import { Facebook, Instagram } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { config } from '@/content/site';
import { cn } from '@/lib/utils';

type IconProps = SVGProps<SVGSVGElement>;

// lucide-react ships no TikTok or Threads glyph, so these two are inline.
function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.3-.2-3.5-.9v5.6c0 3.6-2.7 6.3-6.1 6.3-2.9 0-5.4-2.2-5.4-5.3 0-3.2 2.6-5.5 5.9-5.2v2.6c-.4-.1-.8-.2-1.2-.2-1.5 0-2.6 1.1-2.6 2.6s1.1 2.7 2.6 2.7c1.6 0 2.7-1.2 2.7-2.9V3h4.1Z" />
    </svg>
  );
}

function ThreadsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.2 21.5c-3 0-5.3-1-6.9-2.9C3.9 16.9 3.2 14.7 3.2 12s.7-4.9 2.1-6.6C6.9 3.5 9.2 2.5 12.2 2.5c2.3 0 4.2.6 5.6 1.7 1.3 1 2.2 2.4 2.7 4.2l-2 .6c-.8-2.8-2.8-4.3-6.3-4.3-2.3 0-4 .8-5.1 2.2-1 1.3-1.6 3-1.6 5.1s.6 3.8 1.6 5.1c1.1 1.4 2.8 2.2 5.1 2.2 2.1 0 3.6-.5 4.6-1.4.9-.8 1.3-1.7 1.3-2.7 0-1.2-.6-2.1-1.7-2.7-.3 1.4-.9 2.4-1.8 3.1-.9.7-2 1-3.3.9-1.2-.1-2.2-.5-2.9-1.2-.7-.7-1.1-1.6-1-2.6.1-1.1.6-1.9 1.5-2.5.9-.6 2-.8 3.4-.8.6 0 1.2 0 1.9.1 0-.7-.2-1.3-.6-1.7-.4-.4-1-.6-1.8-.6-1.1 0-1.9.4-2.4 1.3l-1.8-1c.9-1.5 2.3-2.2 4.2-2.2 1.4 0 2.5.4 3.3 1.2.8.8 1.2 1.9 1.2 3.3v.4c2 .9 3.1 2.5 3.1 4.6 0 1.7-.7 3.2-2.1 4.3-1.4 1.2-3.3 1.8-5.6 1.8Zm-.7-9.2c-1.7 0-2.6.5-2.7 1.5 0 .4.1.8.5 1.1.3.3.8.5 1.4.5 1.6.1 2.6-.8 2.9-2.8-.7-.2-1.4-.3-2.1-.3Z" />
    </svg>
  );
}

const CHANNELS: Array<{
  key: keyof typeof config.social;
  label: string;
  Icon: ComponentType<IconProps>;
}> = [
  { key: 'facebook', label: 'AdeelSab on Facebook', Icon: Facebook },
  { key: 'instagram', label: 'AdeelSab on Instagram', Icon: Instagram },
  { key: 'tiktok', label: 'AdeelSab on TikTok', Icon: TikTokIcon },
  { key: 'threads', label: 'AdeelSab on Threads', Icon: ThreadsIcon },
];

export function SocialLinks({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  // An unset handle is skipped rather than linking nowhere.
  const links = CHANNELS.filter(({ key }) => config.social[key]?.trim().length > 0);
  if (links.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={config.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors',
              tone === 'dark'
                ? 'border-ink-700 text-ink-400 hover:border-brand-500 hover:text-white'
                : 'border-ink-200 text-ink-500 hover:border-brand-500 hover:text-brand-600',
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
        </li>
      ))}
    </ul>
  );
}
