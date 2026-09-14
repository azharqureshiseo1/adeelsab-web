/**
 * Publishes the built site to the `deploy` branch.
 *
 * WHY THIS EXISTS
 * Hostinger's Git deployment on shared hosting clones a branch straight into
 * public_html. It does not run npm install or a build. So the branch it clones
 * has to already be the finished site, with index.html at its root — which the
 * `main` branch is not, because `main` holds source.
 *
 * This script takes the contents of out/ (plus the .htaccess that is deliberately
 * kept out of the build) and force-pushes them as the root of `deploy`.
 *
 * Usage:
 *   npm run publish
 *
 * The branch is rewritten each time rather than appended to — it is build
 * output, and its history is of no value.
 */

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BRANCH = 'deploy';
const OUT_DIR = 'out';
const HTACCESS = join('deploy', '.htaccess');

function git(args, opts = {}) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe', ...opts }).trim();
}

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

// --- Preconditions -----------------------------------------------------------

if (!existsSync(OUT_DIR) || readdirSync(OUT_DIR).length === 0) {
  fail(`${OUT_DIR}/ is empty or missing. Run "npm run build" first.`);
}

if (!existsSync(join(OUT_DIR, 'index.html'))) {
  fail(`${OUT_DIR}/index.html is missing — the build did not complete.`);
}

if (!existsSync(HTACCESS)) {
  fail(`${HTACCESS} is missing.`);
}

let remote;
try {
  remote = git(['remote', 'get-url', 'origin']);
} catch {
  fail('No "origin" remote configured.');
}

const sourceCommit = git(['rev-parse', '--short', 'HEAD']);
const sourceBranch = git(['rev-parse', '--abbrev-ref', 'HEAD']);

// --- Stage the site in a scratch clone ---------------------------------------
// A separate clone keeps the working tree untouched: no branch switching, no
// risk of build output landing on the source branch.

const work = mkdtempSync(join(tmpdir(), 'adeelsab-deploy-'));
console.log(`Staging in ${work}`);

try {
  git(['init', '--quiet', '--initial-branch', BRANCH, work]);
  git(['-C', work, 'remote', 'add', 'origin', remote]);

  cpSync(OUT_DIR, work, { recursive: true });
  cpSync(HTACCESS, join(work, '.htaccess'));

  const fileCount = execFileSync(
    'git',
    ['-C', work, 'status', '--porcelain', '--untracked-files=all'],
    { encoding: 'utf8' },
  )
    .split('\n')
    .filter(Boolean).length;

  git(['-C', work, 'add', '-A']);
  git([
    '-C',
    work,
    '-c',
    'user.name=AdeelSab',
    '-c',
    'user.email=azharseoofficial@gmail.com',
    'commit',
    '--quiet',
    '-m',
    `Build from ${sourceBranch}@${sourceCommit}`,
  ]);

  console.log(`Publishing ${fileCount} files to "${BRANCH}"…`);
  git(['-C', work, 'push', '--force', '--quiet', 'origin', BRANCH]);

  console.log(`\n✓ Pushed the built site to "${BRANCH}" (from ${sourceBranch}@${sourceCommit}).`);
  console.log('  Hostinger will pick it up on its next pull.\n');
} finally {
  rmSync(work, { recursive: true, force: true });
}
