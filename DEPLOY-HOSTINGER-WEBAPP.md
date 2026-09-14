# Deploying to Hostinger Web Apps

For **Business hosting and above**, where hPanel offers **Deploy Your Web App**.
This runs the site as a real Next.js app: route handlers work, images are
optimised, and the waitlist form is handled by Next rather than PHP.

---

## 1. Import the repository

On the **Deploy Your Web App** screen there are two ways in. Use the second.

**Do not use "Connect with GitHub"** unless you need it. That flow asks GitHub
for account access and, if the grant does not complete, drops you back on the
repository-selection screen over and over.

Use **Public repository URL** instead and paste:

```
https://github.com/azharqureshiseo1/adeelsab-web
```

The repository is public, so no authorisation step is involved at all.

> If you make the repository private again, this box stops working and you are
> back to the GitHub connection flow — or a deploy key, depending on what the
> panel offers.

---

## 2. Settings

| Setting | Value |
|---|---|
| Branch | `main` |
| Framework | Next.js (detected) |
| Node version | **20 or newer** |
| Install command | `npm install` |
| Build command | `npm run build` |
| Start command | `npm start` |
| Application startup file | `server.js` — only if the panel asks for a file rather than a command |

`npm run build` produces the **server** build by default, which is what
`npm start` serves. There is nothing to set to make that happen.

`server.js` reads `PORT` from the environment, so whatever port the panel
assigns is the one it listens on.

---

## 3. Environment variables

None are required — the site builds and runs without any. Set these when you
have them:

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.adeelsab.com` — canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX`. **Leave unset and no analytics code loads at all.** |
| `RESEND_API_KEY` | Sends waitlist leads by email — see below |
| `LEAD_NOTIFY_EMAIL` | Where those emails go |
| `LEAD_WEBHOOK_URL` | Alternative: POST each lead as JSON to your own endpoint |

---

## 4. Where the waitlist leads go — read this

The PHP version wrote leads to a CSV outside the web root. A managed app
platform gives you no such directory, so delivery is configured instead.

**Until you set `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`, or `LEAD_WEBHOOK_URL`,
the endpoint returns an error and the form shows its WhatsApp fallback.** That
is deliberate. A form that answers "thank you" and quietly bins the submission
is worse than one that admits it failed — the merchant at least still reaches
you on WhatsApp, and the lead is written to the application log either way.

The quickest setup:

1. Sign up at [resend.com](https://resend.com) — the free tier is generous.
2. Create an API key.
3. Add `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` in the panel.
4. Redeploy, submit the form once, confirm the email arrives.

To send from your own domain rather than Resend's sandbox address, verify the
domain in Resend and set `LEAD_FROM_EMAIL` (for example
`AdeelSab <leads@adeelsab.com>`).

---

## 5. Domain and SSL

Point `adeelsab.com` at the web app in hPanel and enable the free SSL
certificate. Then set `NEXT_PUBLIC_SITE_URL` to the canonical host — including
`www` if that is the one you keep — and redeploy, so the sitemap and Open Graph
tags carry the right URLs.

---

## 6. Check it worked

- [ ] Home page loads over HTTPS
- [ ] An inner page loads directly, e.g. `/delivery/`
- [ ] A Seller Hub article loads, e.g. `/seller-hub/packaging-guide/`
- [ ] The Urdu toggle flips to RTL and renders in Nastaliq, not a plain sans
- [ ] `/nope/` shows the branded 404
- [ ] `/sitemap.xml` and `/robots.txt` load and name the right host
- [ ] **Submit the waitlist form with real details and confirm it arrives**
- [ ] The WhatsApp button opens a chat — it is still the demo number until you
      replace it, see `CONTENT-TODO.md`

---

## 7. Updating the site

Push to `main`. If the panel enabled auto-deploy on import, that is the whole
process. Otherwise press **Deploy** in hPanel after pushing.

---

## The other routes

Still available, unchanged:

- [DEPLOY.md](./DEPLOY.md) — static export to shared hosting, via Git, FTP or a zip
- [DEPLOY-NODE.md](./DEPLOY-NODE.md) — a VPS you manage yourself

`npm run build:static` produces the static export whenever you want it. The two
targets share one codebase; only the waitlist endpoint differs, and the config
picks the right one automatically.
