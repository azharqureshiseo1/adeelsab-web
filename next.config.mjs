import createMDX from '@next/mdx';

/**
 * One codebase, two build targets.
 *
 *   Server — the default
 *     npm run build   ·  npm start
 *     What Hostinger Web Apps, Vercel and any Node host run. Route handlers
 *     work, images are optimised, and the waitlist form posts to /api/submit.
 *
 *   Static export — opt in
 *     npm run build:static   ->  out/
 *     For hosting that cannot run Node. No route handlers, so the form posts to
 *     the PHP endpoint in public/api instead.
 *
 * Server is the default because a host that runs `npm install && npm run build
 * && npm start` — which is what every panel does — must get something `npm
 * start` can actually serve. Defaulting to the export produced a build that
 * refused to boot, which is a miserable thing to debug on someone else's server.
 */
const isStatic = process.env.BUILD_TARGET === 'static';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStatic
    ? {
        output: 'export',
        // There is no server to resize images in a static export.
        images: { unoptimized: true },
      }
    : {}),

  trailingSlash: true,

  // `route.node.ts` is only a route when the `node.ts` extension is registered,
  // so the static build ignores the API handler entirely rather than failing on
  // it. Route handlers and `output: export` cannot coexist.
  pageExtensions: isStatic ? ['ts', 'tsx', 'mdx'] : ['node.ts', 'ts', 'tsx', 'mdx'],

  eslint: { dirs: ['app', 'components', 'lib', 'content'] },

  env: {
    // The browser cannot know which target it was built for, so bake it in.
    // The trailing slash matters: `trailingSlash: true` would otherwise answer
    // the POST with a 308 to the canonical URL, adding a round trip to every
    // submission for no reason.
    NEXT_PUBLIC_FORM_ENDPOINT:
      process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? (isStatic ? '/api/submit.php' : '/api/submit/'),
  },
};

const withMDX = createMDX({ extension: /\.mdx?$/ });

export default withMDX(nextConfig);
