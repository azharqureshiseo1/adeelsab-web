import Image from 'next/image';
import Link from 'next/link';

/**
 * Brand artwork paths.
 *
 * TODO-IMAGES: these currently point at authored SVG stand-ins. When the
 * supplied 2170x725 PNG files are dropped into /public/brand/, change the two
 * values below to the .png filenames - nothing else in the codebase needs
 * touching. The aspect ratio (2.99:1) is already identical.
 */
const SOURCES = {
  dark: '/brand/adeelsab-logo-dark.svg',
  orange: '/brand/adeelsab-logo-orange.svg',
} as const;

const ASPECT = 2170 / 725;

type LogoProps = {
  /** `dark` (default) for light backgrounds; `orange` for dark ones. */
  variant?: 'dark' | 'orange';
  /** Rendered height in px. Width is derived to preserve the aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = 'dark', height = 36, className, priority = false }: LogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    <Image
      src={SOURCES[variant]}
      alt="AdeelSab"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: 'auto' }}
    />
  );
}

/** The logo as a link home - the form used in the header and footer. */
export function LogoLink({
  variant = 'dark',
  height = 36,
  priority = false,
}: Omit<LogoProps, 'className'>) {
  return (
    <Link href="/" aria-label="AdeelSab - home" className="inline-flex shrink-0 items-center">
      <Logo variant={variant} height={height} priority={priority} />
    </Link>
  );
}
