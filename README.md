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

The site is prerendered for English and Traditional Chinese. The inquiry endpoint is deployed separately at `contact.mengche.dev` and does not persist submissions in a database.

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
pnpm test:e2e          # Playwright route, locale, theme, and critical interaction flows
```

## Content editing

Public display data is maintained in `packages/content`. UI labels and reusable short copy are in `apps/site/messages` and long case studies are in `packages/content/case-studies`.

See [Content maintenance](docs/content-maintenance.md) for exact file paths and edit examples.

## Design system

The rewrite uses new primitive, semantic, and component token layers. It does not reuse the previous site's theme. See [Design system](docs/design-system.md) and the [asset and trademark ledger](docs/asset-ledger.md).

## Deployment

- `www.mengche.dev`: `apps/site`, deployed through `.github/workflows/site.yml`
- `contact.mengche.dev`: `apps/inquiry-worker`, deployed through `.github/workflows/worker.yml`

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `TURNSTILE_SITE_KEY`
- `CF_WEB_ANALYTICS_TOKEN`
- `TURNSTILE_SECRET_KEY`
- `RATE_LIMIT_SECRET`

`TURNSTILE_SECRET_KEY` and `RATE_LIMIT_SECRET` are declared as required Worker secrets in `apps/inquiry-worker/wrangler.jsonc`. The Worker deployment workflow writes their GitHub Actions values to a temporary runner file and passes it to `wrangler deploy --secrets-file`, so a fresh Worker receives the secrets in the same deployment that creates its first version. The temporary file is deleted after the deployment step.

Automatic site and inquiry-Worker deployments run only after the `Validate` workflow succeeds for the pushed `main` commit. Manual `workflow_dispatch` deployments remain available for deliberate operator use.

## Licensing

Original source code is licensed under the MIT License. Personal copy, branding, certificates, project content, screenshots, and case-study media are excluded from that grant and remain all rights reserved. Third-party names, logos, and trademarks remain subject to their owners' terms. See [Content and trademark notice](CONTENT-LICENSE.md).
