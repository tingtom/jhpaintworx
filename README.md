# JH Paintworx – static site + Sveltia CMS + GitHub Pages

Free hosting: Astro static build → GitHub Actions → GitHub Pages.
Testing URL: https://tingtom.github.io/jhpaintworx/

## How Sveltia works (do I need to host it?)

No – you do **not** host Sveltia separately.

- Sveltia is 2 static files in this repo: `public/admin/index.html` (loads `@sveltia/cms` from CDN) + `public/admin/config.yml` (content model). They deploy with the site to `…/admin/`.
- It runs 100% in the browser. No server, no database, no fees.
- Login uses GitHub OAuth via a tiny free proxy (static sites can't keep an OAuth secret). Flow: `Admin → Log in with GitHub → GitHub → proxy exchanges code → token back to browser → CMS commits markdown/images straight to this repo via GitHub API`.
- Push to `main` triggers `.github/workflows/deploy.yml` → `astro build` → Pages. That's the "update then generate" loop.
- Images: yes – drag/drop in editor, stored at `public/images/uploads/`, committed to git, served statically. Good to a few hundred photos. Compress to <2MB WebP/JPG before upload to stay under Pages ~1GB soft limit. For 1000s of photos later, move to Cloudinary/Sanity CDN.
- No-proxy fallback: edit `src/content/jobs/*.md` directly in GitHub web UI – same rebuild, zero setup.

One-time OAuth setup (5 min, free):
1. GitHub → Settings → Developer settings → OAuth Apps → New: callback `https://tingtom.github.io/jhpaintworx/admin/`.
2. Deploy `sveltia/oauth-proxy` (or `decap/oauth-proxy`) to Cloudflare Workers free.
3. Put Worker URL in `public/admin/config.yml` → `backend.base_url`, commit.

## Content model

All site content lives in `src/content/*` and is edited via `/admin/`:

| Collection | File(s) | Feeds |
| --- | --- | --- |
| `slides` | `src/content/slides/*.md` | Homepage hero slides |
| `services` | `src/content/services/*.md` | Services page cards |
| `categories` | `src/content/categories/*.md` | Workshop categories — each one creates a pill on the homepage and a `/workshop/<slug>/` page (defaults: cars, classics-historic, commercial, motorcycles, motorsport) |
| `jobs` | `src/content/jobs/*.md` | Workshop grid + homepage "Recent jobs" |
| `about` | `src/content/about/about.md` | "Meet the team" page (copy, bullet points, photo, team members) |
| `contact` | `src/content/contact/contact.md` | Contact page copy |
| `settings` | `src/content/settings/settings.md` | Phone number, opening hours, address, form email |

When you add a category in the CMS, also add its slug to the `options` list of the
`jobs` → Category field in `public/admin/config.yml` so it appears in the dropdown.
Jobs with a category that has no matching file still show on "All work", labelled by slug.

## Dev

    npm install
    npm run dev      # http://localhost:4321/jhpaintworx/ – Admin needs deployed URL for OAuth, use GitHub edit locally
    npm run build

## Contact form email variable

No backend – form posts via FormSubmit AJAX to `PUBLIC_CONTACT_EMAIL`:

- Local: copy `.env.example` → `.env`, set `PUBLIC_CONTACT_EMAIL=you@jhpaintworx.co.uk`
- GitHub: Repo → Settings → Secrets and variables → Actions → Variables → New `PUBLIC_CONTACT_EMAIL`.

## Custom domain cutover (later)

1. `astro.config.mjs`: `base:'/'`, `site:'https://jhpaintworx.co.uk'`.
2. `public/admin/config.yml`: `site_url` + `public_folder:/images/uploads`, `logo_url:/logo.svg`.
3. Add `public/CNAME` containing `jhpaintworx.co.uk`, push, then DNS: apex A → GitHub IPs + `www` CNAME → `tingtom.github.io`, enforce HTTPS in Pages settings.
