# Repository Instructions

## Repository Overview

This repository is a pnpm monorepo for the MengChe Dev personal and commission website.

- `apps/site`: bilingual SvelteKit website deployed as a Cloudflare Worker with static assets
- `apps/inquiry-worker`: Cloudflare Worker that validates and delivers contact-form inquiries
- `packages/content`: manually maintained bilingual services, projects, profile data, and Markdown project content
- `packages/shared`: shared inquiry schemas and TypeScript utilities

## Technology

- Node.js 24
- pnpm 10
- TypeScript 6
- Svelte 5 and SvelteKit 2
- Vite 8
- Paraglide for English and Traditional Chinese localization
- mdsvex for long-form project content
- Custom CSS tokens and component styles under `apps/site/src/lib/styles`
- Iconify with locally bundled icon data
- Vitest and Playwright
- Cloudflare Workers and Wrangler

## Source of Truth

- Public structured content belongs in `packages/content/src`.
- Long-form project pages belong in `packages/content/case-studies`.
- Interface and marketing messages belong in `apps/site/messages/en.json` and `apps/site/messages/zh-TW.json`.
- Shared inquiry validation belongs in `packages/shared`.
- Generated Paraglide output under `apps/site/src/lib/paraglide` must not be edited directly.
- Generated Worker types under `apps/inquiry-worker/worker-configuration.d.ts` must not be edited directly.

Keep English and Traditional Chinese content aligned. Run `pnpm content:validate` after changing services, projects, or project Markdown.

## Website Conventions

- Preserve localized routes under `/en` and `/zh-tw`.
- Use `localizedPath` for internal localized links.
- Use Svelte 5 runes and current event syntax.
- Use semantic HTML and accessible names for icon-only controls.
- Reuse design tokens and shared styles instead of introducing isolated visual values.
- Use Iconify icons already available in the site package or bundle explicit icon data when a brand icon is required.
- Keep displayed project and service data easy to edit manually.
- Do not add unverified client outcomes, metrics, testimonials, or adoption claims.

## Development Commands

```bash
pnpm dev               # Start the website development server
pnpm dev:worker        # Start the inquiry Worker locally
pnpm content:validate  # Validate services, projects, and bilingual project content
pnpm lint              # Check Prettier formatting and ESLint
pnpm check             # Run TypeScript and Svelte checks across the workspace
pnpm test              # Run Vitest tests
pnpm test:e2e          # Run Playwright browser tests
pnpm build             # Build all deployable workspace packages
pnpm lighthouse        # Run Lighthouse CI locally
```

Run the relevant focused checks while editing. Before completing repository-wide changes, run:

```bash
pnpm content:validate
pnpm lint
pnpm check
pnpm test
pnpm build
```

Run `pnpm test:e2e` when changing navigation, localization, themes, forms, or important page layout behavior.

## Deployment

- `.github/workflows/main.yml` contains the complete CI pipeline: validation for pull requests and pushes to `main`, followed by production deployment jobs for `apps/site` and `apps/inquiry-worker` on successful `main` pushes.
- Manual `workflow_dispatch` runs can deploy the site, the inquiry Worker, or both after validation succeeds.
- Website deployment requires the Cloudflare API credentials and public site environment variables documented in `README.md`.
- Inquiry Worker secrets are managed by Wrangler and must never be committed.

## Documentation

Do not create new documentation files or documentation directories unless the user explicitly requests them. Update `README.md` only when a requested change affects setup, scripts, environment variables, deployment, or repository structure. Keep implementation guidance close to the relevant code when it cannot be expressed clearly through naming and structure.
