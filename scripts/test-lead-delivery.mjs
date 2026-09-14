/**
 * Checks that waitlist leads can actually be delivered.
 *
 *   npm run test:leads
 *
 * Reads the same environment variables the live endpoint uses, sends one test
 * lead, and reports exactly what the provider said. Run it after setting the
 * keys and before trusting the form — a silent misconfiguration here loses the
 * merchants the whole site exists to collect.
 *
 * Locally it reads .env.local. On a host, run it from the panel's terminal so it
 * picks up the real environment.
 */

import { readFileSync } from 'node:fs';

// Minimal .env.local reader — no dependency needed for six lines of parsing.
try {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
  console.log('Loaded .env.local\n');
} catch {
  console.log('No .env.local found — using the ambient environment.\n');
}

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.LEAD_NOTIFY_EMAIL;
const from = process.env.LEAD_FROM_EMAIL ?? 'AdeelSab <onboarding@resend.dev>';
const webhook = process.env.LEAD_WEBHOOK_URL;

console.log('Configuration');
console.log(`  RESEND_API_KEY     ${apiKey ? `set (${apiKey.slice(0, 6)}…)` : 'NOT SET'}`);
console.log(`  LEAD_NOTIFY_EMAIL  ${to ?? 'NOT SET'}`);
console.log(`  LEAD_FROM_EMAIL    ${from}`);
console.log(`  LEAD_WEBHOOK_URL   ${webhook ?? 'not set'}\n`);

if (!apiKey && !webhook) {
  console.error('✗ Nothing is configured, so every submission will fail.');
  console.error('  Set RESEND_API_KEY + LEAD_NOTIFY_EMAIL, or LEAD_WEBHOOK_URL.\n');
  process.exit(1);
}

if (apiKey && !to) {
  console.error('✗ RESEND_API_KEY is set but LEAD_NOTIFY_EMAIL is not — nowhere to send to.\n');
  process.exit(1);
}

const testLead = [
  'Name:           TEST — delivery check',
  'WhatsApp:       03001234567',
  'City:           Lahore',
  'Business type:  Local seller / shop owner',
  'Category:       Fashion & apparel',
  'Monthly volume: Under Rs. 50,000 per month',
  'Source page:    scripts/test-lead-delivery.mjs',
  '',
  'If you are reading this, waitlist delivery works.',
  '',
  `Sent: ${new Date().toISOString()}`,
].join('\n');

let ok = false;

if (apiKey && to) {
  process.stdout.write('Sending a test email through Resend… ');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: 'AdeelSab — waitlist delivery test',
        text: testLead,
      }),
    });

    if (response.ok) {
      const { id } = await response.json().catch(() => ({}));
      console.log(`OK${id ? ` (id ${id})` : ''}`);
      console.log(`  Check ${to} — it should arrive within a minute.\n`);
      ok = true;
    } else {
      const detail = await response.text().catch(() => '');
      console.log(`FAILED (HTTP ${response.status})`);
      console.error(`  ${detail}\n`);

      if (response.status === 401) {
        console.error('  → The API key is wrong or has been revoked.\n');
      } else if (detail.includes('domain')) {
        console.error(
          '  → LEAD_FROM_EMAIL uses a domain that is not verified in Resend.\n' +
            '    Either verify the domain, or unset LEAD_FROM_EMAIL to use\n' +
            '    onboarding@resend.dev while testing.\n',
        );
      } else if (detail.includes('testing emails')) {
        console.error(
          '  → An unverified Resend account can only send to the address you\n' +
            '    signed up with. Set LEAD_NOTIFY_EMAIL to that address, or\n' +
            '    verify a domain.\n',
        );
      }
    }
  } catch (error) {
    console.log('FAILED');
    console.error(`  Could not reach Resend: ${error}\n`);
  }
}

if (webhook) {
  process.stdout.write('POSTing a test lead to the webhook… ');
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true, receivedAt: new Date().toISOString() }),
    });
    console.log(response.ok ? 'OK' : `FAILED (HTTP ${response.status})`);
    if (response.ok) ok = true;
  } catch (error) {
    console.log('FAILED');
    console.error(`  ${error}\n`);
  }
}

if (ok) {
  console.log('✓ Waitlist delivery works. The form will not lose submissions.\n');
  process.exit(0);
}

console.error('✗ No channel delivered. The form will show its WhatsApp fallback.\n');
process.exit(1);
