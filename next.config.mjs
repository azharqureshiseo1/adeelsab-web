import createMDX from '@next/mdx';

/**
 * The same codebase builds two ways:
 *
 *   npm run build        static export to out/  - runs on any shared hosting
 *   npm run build:node   Node server build      - needs a VPS or Node plan
 *
 * Static is the default because it runs anywhere and has no process to keep
 * alive. The Node target exists for hosting that can run one, and for when the
 * site eventually needs something a static file cannot do.
 */
const isNodeTarget = process.env.BUILD_TARGET === 'node';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isNodeTarget
    ? {
        // A plain server build. `standalone` would trim the upload further but
        // needs static/ and public/ copied by hand afterwards, and that step is
        // the one people get wrong. Hosting panels run `npm install` anyway.
      }
    : {
        output: 'export',
        // Static export cannot run the image optimiser - there is no server.
        images: { unoptimized: true },
      }),
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  eslint: { dirs: ['app', 'components', 'lib', 'content'] },
};

const withMDX = createMDX({ extension: /\.mdx?$/ });

export default withMDX(nextConfig);
