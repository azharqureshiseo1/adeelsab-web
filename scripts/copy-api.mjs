// Copies the PHP form endpoint into the static export output after `next build`.
// Next.js does not copy `public/api/*.php` reliably into `out/` for static exports,
// so we do it explicitly to guarantee the endpoint ships with the site.
import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const src = 'public/api';
const dest = 'out/api';

if (!existsSync('out')) {
  console.log('[copy-api] no out/ directory — skipping (not a static export build).');
  process.exit(0);
}

await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log('[copy-api] copied public/api -> out/api');
