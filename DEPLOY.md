# Deploying AdeelSab.com to Hostinger

The site is a **static export**. `npm run build` produces an `out/` folder of plain HTML, CSS and JS, plus one PHP file that receives the waitlist form. It runs on any Hostinger plan, including the cheapest shared hosting. There is no Node server to keep alive.

---

## 1. Create FTP credentials in Hostinger

1. Sign in to **hPanel**.
2. Go to **Files → FTP Accounts**.
3. Either use the existing account or **Create a new FTP account** scoped to `public_html`.
4. Note down three things:

| What | Where to find it | Example |
|---|---|---|
| FTP host | FTP Accounts page | `ftp.adeelsab.com` or an IP |
| FTP username | FTP Accounts page | `u123456789.deploy` |
| FTP password | The one you set | — |

Test them once with any FTP client before going further. A wrong credential shows up in GitHub Actions as an unhelpful timeout.

---

## 2. Add the credentials to GitHub

In the repository, go to **Settings → Secrets and variables → Actions**.

Under the **Secrets** tab, add:

| Secret name | Value |
|---|---|
| `FTP_HOST` | the FTP host from step 1 |
| `FTP_USERNAME` | the FTP username |
| `FTP_PASSWORD` | the FTP password |

Under the **Variables** tab, optionally add:

| Variable name | Value | Effect |
|---|---|---|
| `SITE_URL` | `https://www.adeelsab.com` | Sets `metadataBase`, canonical URLs and the sitemap |
| `GA_ID` | `G-XXXXXXXXXX` | Enables Google Analytics. **Leave unset and no analytics code is loaded at all.** |

Secrets are never printed in logs. Do not put any of these in the repository.

---

## 3. Point the domain at the hosting and enable SSL

1. In hPanel, go to **Domains** and add `adeelsab.com` if it is not already there.
2. Set the domain's nameservers at your registrar to Hostinger's, or point the A record at the hosting IP shown in hPanel. DNS changes can take a few hours.
3. Once the domain resolves, go to **Security → SSL** and install the free **Let's Encrypt** certificate.
4. Wait until the padlock appears on `https://www.adeelsab.com` before doing step 5 — forcing HTTPS before the certificate exists produces a redirect loop into a broken page.

---

## 4. Create the storage directory for leads

The waitlist endpoint writes `leads.csv`. **It must live outside `public_html`**, otherwise anyone who guesses the URL can download every lead you have collected.

Using hPanel's **File Manager** (or SSH, if your plan has it):

1. Navigate to your home directory — the folder that *contains* `public_html`, not `public_html` itself.
2. Create a folder named `storage`, so the layout is:

```
/home/u123456789/
├── public_html/      <- the website, where out/ is deployed
│   └── api/submit.php
└── storage/          <- NOT web accessible
    └── leads.csv     <- created automatically on the first submission
```

3. Set the permissions on `storage` to **750** (Right click → Permissions in File Manager).

The path is resolved in `public/api/submit.php` as `__DIR__ . '/../../storage'`. Since `submit.php` sits at `public_html/api/`, that resolves to a sibling of `public_html`. **If your Hostinger layout differs, edit the `STORAGE_DIR` constant at the top of that file.**

### Configure the endpoint

Open `public/api/submit.php` and set the three constants at the top before your first deploy:

```php
const NOTIFY_EMAIL   = 'leads@adeelsab.com';        // who gets notified
const ALLOWED_ORIGIN = 'https://www.adeelsab.com';  // must match the canonical host exactly
const STORAGE_DIR    = __DIR__ . '/../../storage';  // must be outside public_html
```

---

## 5. Upload the `.htaccess`

Take `deploy/.htaccess` from this repository and upload it into `public_html` **by hand, once**.

It is deliberately not part of `out/`, so a deploy can never overwrite or delete it. It:

- forces HTTPS
- redirects `adeelsab.com` → `www.adeelsab.com` (**www is canonical** — see below)
- sets a one-year immutable cache on `/_next/static/*` and revalidation on HTML
- serves `/404.html` as the error page
- adds security headers and blocks dot-files and source files

### If you prefer non-www

Three things must agree, or the form will be blocked by CORS and the canonical URLs will be wrong:

1. The redirect block in `.htaccess` (invert it)
2. `ALLOWED_ORIGIN` in `public/api/submit.php`
3. The `SITE_URL` GitHub variable

---

## 6. Deploy

Push to `main`:

```bash
git push origin main
```

The **Deploy to Hostinger** workflow then:

1. installs dependencies with `npm ci`
2. runs `npm run build`, which exports to `out/` and copies `public/api` into `out/api`
3. fails the deploy if `out/api/submit.php` is missing, rather than shipping a broken form
4. uploads `out/` to `/public_html/` over FTP

You can also run it by hand from the **Actions** tab via **Run workflow**.

---

## 7. Verify the deploy

Work through this list after the first deploy and after any significant change:

- [ ] `https://www.adeelsab.com` loads with a padlock
- [ ] `http://adeelsab.com` redirects to `https://www.adeelsab.com`
- [ ] The header logo and footer logo both render
- [ ] The language toggle switches to Urdu, the page flips to RTL and the Urdu renders in Nastaliq rather than a plain sans face
- [ ] **Submit the waitlist form with real details.** You should see the success state, receive the notification email, and find a new row in `storage/leads.csv`
- [ ] Confirm `https://www.adeelsab.com/storage/leads.csv` returns **404**, not a download. If it downloads, the storage directory is in the wrong place — stop and fix it before collecting any more leads
- [ ] `https://www.adeelsab.com/nonexistent-page` shows the branded 404
- [ ] `/sitemap.xml` and `/robots.txt` both load and reference the right host
- [ ] The WhatsApp button opens a chat with the right number

---

## 8. Rolling back

The deploy is a plain file upload, so a rollback is simply deploying an older build.

**Preferred:** in the **Actions** tab, open the last known-good workflow run and press **Re-run all jobs**. That rebuilds from that commit and re-uploads.

**Alternative:** revert the commit and push, which triggers a normal deploy:

```bash
git revert <bad-commit-sha>
git push origin main
```

Do not edit files directly on the server through File Manager. The next deploy overwrites them, and the change is then lost with no record of it. The two exceptions are `.htaccess` and the `storage` directory, neither of which the deploy touches.

---

## 9. Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`. Note that the PHP endpoint does **not** run under `next dev` — form submissions will fail locally and fall through to the WhatsApp fallback, which is the correct behaviour. To test the form end to end, deploy to a staging subdomain on Hostinger.

To check the production build locally:

```bash
npm run build
npx serve out
```

---

## 10. The Node.js alternative

If the hosting is later moved to a Hostinger **VPS** or a **Node.js Web App** plan, the static export can be replaced with a running server. That path is documented in [DEPLOY-NODE.md](./DEPLOY-NODE.md) and is **not used by default** — do not follow it unless the hosting has actually changed.
