/**
 * Builds the site for a Node server instead of a static export.
 *
 *   npm run build:node
 *
 * A wrapper rather than an inline env var so the command works the same in
 * cmd.exe, PowerShell and bash — `BUILD_TARGET=node next build` only works in
 * the last one, and that difference costs more time than this file does.
 *
 * Output goes to .next/. Start it with `npm start`.
 */

import { execFileSync } from 'node:child_process';

console.log('Building for the Node server target…\n');

try {
  execFileSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, BUILD_TARGET: 'node' },
    shell: process.platform === 'win32',
  });
} catch {
  process.exit(1);
}

console.log('\n✓ Server build complete. Start it with: npm start');
