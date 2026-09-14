# Running AdeelSab as a Node.js app

The same codebase builds two ways. This file covers the second one.

| | `npm run build` | `npm run build:node` |
|---|---|---|
| Output | `out/` — plain HTML/CSS/JS | `.next/` — a server build |
| Needs | Any web hosting | A host that can run Node |
| Started by | Nothing; files are served | `npm start` (`server.js`) |
| Image optimisation | No | **Yes** |
| Process to keep alive | None | One, forever |
| Works on Hostinger **shared** hosting | **Yes** | **No** |

**Read that last row before going further.** Hostinger's shared plans (Premium,
Business, and the Web Hosting tiers) cannot run a Node process at all. There is
no setting to enable it. If that is your plan, the Node route is not available
and [DEPLOY.md](./DEPLOY.md) is the file you want — the site it produces is the
same Next.js site, just prerendered.

Node needs **Hostinger VPS**, or another host that offers Node hosting.

---

## What you gain, honestly

Very little today.

The site has no API routes, no server actions, no per-request rendering and no
logged-in state. Every page is the same for everyone, so there is nothing for a
server to decide. The one real benefit is automatic image optimisation.

The reason to move later is a feature, not performance: a real seller login,
server-side integration with the marketplace application, or personalised pages.
Until one of those exists, a Node process is a thing that can crash, run out of
memory and need restarting, in exchange for image resizing.

---

## Build and run locally

```bash
npm ci
npm run build:node     # NOT `npm run build`, which makes a static export
npm start              # serves on http://localhost:3000
```

`npm start` runs `server.js`. Set `PORT` to change the port:

```bash
PORT=8080 npm start
```

`server.js` sets `BUILD_TARGET=node` itself, so you never have to remember an
environment variable — `next.config.mjs` reads it at boot as well as at build.

---

## Hostinger VPS

### 1. Install Node

SSH in and install Node 20 or newer:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
node -v
```

### 2. Get the code and build

```bash
cd /var/www
git clone https://github.com/azharqureshiseo1/adeelsab-web.git
cd adeelsab-web
npm ci
npm run build:node
```

### 3. Keep it alive with PM2

A bare `npm start` dies when you close the terminal, and does not come back
after a reboot.

```bash
sudo npm install -g pm2
pm2 start npm --name adeelsab -- start
pm2 save
pm2 startup          # run the command it prints
```

Useful afterwards: `pm2 logs adeelsab`, `pm2 restart adeelsab`, `pm2 status`.

### 4. Put Nginx in front

Node should not face the internet directly. Nginx terminates TLS and forwards:

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

Pass `X-Forwarded-For` through. Without it the waitlist rate limiter sees every
request as coming from the proxy and throttles everyone together.

Then:

```bash
sudo certbot --nginx -d adeelsab.com -d www.adeelsab.com
sudo nginx -t && sudo systemctl reload nginx
```

### 5. The waitlist form

The form still posts to `public/api/submit.php`, which **PHP** executes — Node
does not. On a VPS you have two choices:

**Keep PHP.** Install PHP-FPM and add a location block for `/api/`. Fine, and no
code changes.

**Port it to a route handler.** Move the logic from `public/api/submit.php` into
`app/api/submit/route.ts` and set `NEXT_PUBLIC_FORM_ENDPOINT=/api/submit`. Carry
over all of it: honeypot rejection, server-side validation, IP rate limiting,
append-only storage and the notification email. Dropping any of those loses
leads or opens the endpoint to abuse.

Either way, the storage directory must stay outside the web root.

### 6. Updating

```bash
cd /var/www/adeelsab-web
git pull
npm ci
npm run build:node
pm2 restart adeelsab
```

---

## Hostinger's "Node.js app" panel entry

Some plans expose **Advanced → Node.js** in hPanel. If yours does:

| Field | Value |
|---|---|
| Application root | the folder you uploaded or cloned into |
| Application startup file | `server.js` |
| Node version | 20 or newer |
| Application mode | Production |

Then use the panel's **Run npm install**, and run `npm run build:node` from its
terminal before starting. The panel assigns `PORT` itself; `server.js` reads it.

If there is no **Node.js** entry under Advanced, the plan cannot run Node. That
is the whole answer — not a setting that needs finding.

---

## Going back to static

Nothing to undo. `npm run build` still produces `out/` exactly as before; the
two targets live side by side in `next.config.mjs`.
