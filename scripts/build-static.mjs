/**
 * Builds the static export instead of the default server build.
 *
 *   npm run build:static     ->  out/
 *
 * A wrapper rather than an inline env var so the command behaves the same in
 * cmd.exe, PowerShell and bash. Also copies the PHP endpoint into out/, which
 * only the static target needs.
 */

import { execFileSync } from 'node:child_process';

function run(command, args, extraEnv = {}) {
  execFileSync(command, args, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
    shell: process.platform === 'win32',
  });
}

console.log('Building the static export…\n');

try {
  run('npx', ['next', 'build'], { BUILD_TARGET: 'static' });
  run('node', ['scripts/copy-api.mjs']);
} catch {
  process.exit(1);
}

console.log('\n✓ Static export in out/. Serve it with any web server.');
