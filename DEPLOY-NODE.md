# Node.js deployment — NOT USED BY DEFAULT

> **Read this first.** The site currently deploys as a **static export** to Hostinger shared hosting, documented in [DEPLOY.md](./DEPLOY.md). That is the supported path and the one the GitHub Action implements.
>
> This document exists only for the case where the hosting is moved to a Hostinger **VPS** or a **Node.js Web App** plan. Do not follow it otherwise.

---

## What changes

Running a Node server rather than exporting static files buys you: API routes, Server Actions, middleware, ISR, and `next/image` optimisation. It costs you a process that has to stay alive, and a hosting plan that supports one.

Nothing on this site currently needs any of those. The waitlist form is handled by a PHP file precisely so that it does not.

---

## Steps

### 1. Remove the static export configuration

In `next.config.mjs`:

```js
const nextConfig = {
  // output: 'export',          <- remove
  trailingSlash: true,
  // images: { unoptimized: true },  <- remove to enable image optimisation
};
```

### 2. Replace the PHP endpoint with a route handler

With a server available, `public/api/submit.php` should be replaced by `app/api/submit/route.ts`, and `NEXT_PUBLIC_FORM_ENDPOINT` changed to `/api/submit`.

Port the logic from the PHP file as-is — it already implements honeypot rejection, server-side validation, IP rate limiting, append-only storage and email notification. Do not drop any of those in the rewrite.

Also delete the `postbuild` copy step from `package.json` and the "Verify the PHP endpoint shipped" step from the workflow, both of which exist only for the static path.

### 3. Build and run

```bash
npm ci
npm run build
npx next start -p 3000
```

### 4. Keep it alive

On a VPS, use a process manager rather than a bare `next start`:

```bash
npm install -g pm2
pm2 start "npx next start -p 3000" --name adeelsab
pm2 save
pm2 startup
```

On a Hostinger Node.js Web App plan, set the start command in hPanel instead — the platform supervises the process itself.

### 5. Reverse proxy

Point Nginx at the Node process:

```nginx
server {
    listen 443 ssl http2;
    server_name www.adeelsab.com;

    ssl_certificate     /etc/letsencrypt/live/www.adeelsab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.adeelsab.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name adeelsab.com www.adeelsab.com;
    return 301 https://www.adeelsab.com$request_uri;
}
```

Note that `X-Forwarded-For` must be passed through, otherwise the rate limiter sees every request as coming from the proxy.

### 6. Change the deployment method

FTP upload no longer makes sense — there is no `out/` folder. Replace the FTP step in `.github/workflows/deploy.yml` with an SSH deploy that pulls, builds and restarts:

```bash
ssh user@host 'cd /var/www/adeelsab && git pull && npm ci && npm run build && pm2 reload adeelsab'
```

---

## Before switching

Be clear about why. The static path has no server to patch, no process to crash, no memory limit to exhaust, and runs on the cheapest plan available. Move only when a feature genuinely requires a server — most likely a real seller login, or server-side integration with the marketplace application.
