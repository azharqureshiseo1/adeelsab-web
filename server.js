/**
 * Node entry point for the Next.js server build.
 *
 * Hosting panels (Hostinger's Node.js app, cPanel, Plesk) ask for a single
 * "application startup file" rather than a command, so this exists to be that
 * file. It is also what `npm start` runs.
 *
 * Before this will work:
 *   npm ci
 *   npm run build:node     <- NOT `npm run build`, which makes a static export
 *
 * The port comes from the environment, because the panel assigns one.
 */

// next.config.mjs is read again at runtime, not just at build time. This file
// only ever runs the server target, so it declares that itself rather than
// relying on an env var being set the same way at build and at boot.
process.env.BUILD_TARGET = 'node';

const { createServer } = require('node:http');
const next = require('next');

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const hostname = process.env.HOSTNAME || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        // A failed request must not take the whole server down.
        console.error('Request failed:', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }).listen(port, hostname, () => {
      console.log(`AdeelSab ready on http://${hostname}:${port} (${dev ? 'dev' : 'production'})`);
    });
  })
  .catch((err) => {
    console.error('Failed to start:', err);
    process.exit(1);
  });
