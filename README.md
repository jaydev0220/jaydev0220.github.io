# MengChe Dev

Bilingual freelance portfolio and inquiry service for **MengChe Dev**.

## Architecture

```text
apps/
├── site/              SvelteKit static site deployed with Workers Static Assets
└── inquiry-worker/    Cloudflare Worker for validated inquiry email delivery
packages/
├── content/           Manually maintained public display data and case studies
└── shared/            Inquiry contracts and validation shared by both apps
```

The site is prerendered for English and Traditional Chinese. The production build also generates Markdown siblings for every successful public HTML page. The site Worker serves those files when a client sends `Accept: text/markdown`, while normal requests continue to receive HTML. Markdown responses send `X-Robots-Tag: noindex, follow`; canonical HTML remains indexable. The inquiry endpoint is deployed separately at `contact.mengche.dev` and does not persist submissions in a database.

## Requirements

- Node.js 24
- pnpm 10.17.1
- A Cloudflare account controlling `mengche.dev`

## Local setup

```bash
pnpm install --frozen-lockfile
cp apps/site/.env.example apps/site/.env
pnpm dev
```

For local inquiry-Worker development, create an ignored `.dev.vars` file from the checked-in example, fill in a Cloudflare Turnstile test secret and a local rate-limit secret, then start the Worker in another terminal:

```bash
cp apps/inquiry-worker/.dev.vars.example apps/inquiry-worker/.dev.vars
pnpm dev:worker
```

`apps/site/.env.example` uses Cloudflare's test Turnstile site key for local development. Project screenshot CDN URLs are maintained directly on each project in `packages/content/src/projects.ts`. Do not commit `.dev.vars`.

## Validation

```bash
pnpm content:validate  # validates IDs, URLs, relationships, prices, and locale parity
pnpm check             # TypeScript, Svelte, generated Worker types
pnpm test              # unit tests
pnpm lint              # formatting and ESLint
pnpm build             # production builds for both deployables
pnpm test:e2e:dev      # focused Vite-development hydration and navbar smoke test
pnpm test:e2e          # production Worker route, locale, theme, and critical interaction flows
```

## Content editing

Public display data is maintained in `packages/content`. UI labels and reusable short copy are in `apps/site/messages` and long case studies are in `packages/content/case-studies`.

## Design system

The rewrite uses primitive, semantic, and component token layers under `apps/site/src/lib/styles`. It does not reuse the previous site's theme.

## Deployment

- `www.mengche.dev`: `apps/site`, deployed through `.github/workflows/main.yml` as the site's Cloudflare Worker Custom Domain; the Worker performs HTML/Markdown content negotiation, applies the shared security-header policy, and returns `Content-Signal: ai-train=no, search=yes, ai-input=yes` on successful page responses
- `mengche.dev`: redirected to `https://www.mengche.dev` by Cloudflare before the site Worker
- `contact.mengche.dev`: `apps/inquiry-worker`, deployed through `.github/workflows/main.yml`

Required GitHub Actions `production` environment secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `TURNSTILE_SITE_KEY`
- `CF_WEB_ANALYTICS_TOKEN`
- `TURNSTILE_SECRET_KEY`
- `RATE_LIMIT_SECRET`

`TURNSTILE_SECRET_KEY` and `RATE_LIMIT_SECRET` are declared as required Worker secrets in `apps/inquiry-worker/wrangler.jsonc`. The Worker deployment workflow writes their GitHub Actions values to a temporary runner file and passes it to `wrangler deploy --secrets-file`, so a fresh Worker receives the secrets in the same deployment that creates its first version. The temporary file is deleted after the deployment step.

Automatic site and inquiry-Worker deployments run only after the `validate` job in the `CI` workflow succeeds for the pushed `main` commit. Manual `workflow_dispatch` runs can deploy the site, the inquiry Worker, or both after validation succeeds.

The production site job captures the previous live sitemap before deployment and submits the deduplicated old/new URL union to IndexNow after a successful deploy. The notification is non-blocking: a search-engine outage cannot invalidate a healthy deployment. IndexNow acceptance does not guarantee crawling or indexing.

## Licensing

Original source code is licensed under the MIT License. Personal copy, branding, certificates, project content, screenshots, and case-study media are excluded from that grant and remain all rights reserved. Third-party names, logos, and trademarks remain subject to their owners' terms. See [Content and trademark notice](CONTENT-LICENSE.md).
