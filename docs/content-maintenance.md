# Content maintenance

> Audience: repository maintainers and contributors.

All public display data is edited manually. Page components should not be changed for routine content updates.

## Common edits

| Change                                            | File                                       |
| ------------------------------------------------- | ------------------------------------------ |
| Availability, response time, process, terms       | `packages/content/src/site.ts`             |
| Services, prices, timelines, deliverables         | `packages/content/src/services.ts`         |
| Project cards, links, screenshots, ordering       | `packages/content/src/projects.ts`         |
| Biography, education, qualification, social links | `packages/content/src/site.ts`             |
| English interface and marketing copy              | `apps/site/messages/en.json`               |
| Traditional Chinese interface and marketing copy  | `apps/site/messages/zh-TW.json`            |
| English case studies                              | `packages/content/case-studies/en/*.md`    |
| Traditional Chinese case studies                  | `packages/content/case-studies/zh-tw/*.md` |
| CDN project screenshot URLs                       | `packages/content/src/projects.ts`         |
| Open Graph and social banner URLs                 | `packages/content/src/seo.ts`              |

## Update availability

Edit `site.availability` in `packages/content/src/site.ts`:

```ts
availability: {
  status: 'accepting-projects',
  label: { en: 'Accepting commissions', 'zh-TW': '接受專案委託' },
  concurrentBuilds: 1,
  responseBusinessDays: 2
}
```

## Change prices

Edit numeric values in `packages/content/src/services.ts`:

```ts
startingPriceTwd: 15000,
approximatePriceUsd: 470
```

TWD is authoritative. USD is a manually maintained rounded approximation.

## Add or reorder a project

1. Add a validated record to `packages/content/src/projects.ts`.
2. Use a unique stable `slug`.
3. Set `featured` and `order` explicitly.
4. Add only actions that exist.
5. Add CDN screenshot URLs to `images` when available.
6. Run `pnpm content:validate`.

A non-featured project remains in the internal content data but is not listed publicly and has no case-study route.

## Add a featured case study

1. Add the project record with `featured: true`.
2. Add matching Markdown files:
   - `packages/content/case-studies/en/<slug>.md`
   - `packages/content/case-studies/zh-tw/<slug>.md`
3. Register both imports in `packages/content/src/case-studies.ts`.
4. Add the two localized project routes to `apps/site/svelte.config.js` prerender entries.
5. Run `pnpm content:validate && pnpm --filter @mengche/site check`.

## Add or update social banners

Edit `packages/content/src/seo.ts`. Page components do not need to change when banner files change.

- `socialImageOrigin` is the base URL used for relative banner filenames.
- Each indexable localized page has separate `en` and `zh-TW` entries.
- Each project has separate localized banner entries.
- `root` configures the unlocalized `/` language-selection page.
- Use a filename relative to `socialImageOrigin` or a full HTTPS URL.
- Keep an entry as `null` until its banner exists; no broken image metadata will be emitted.
- Project pages fall back to their first project screenshot until a dedicated banner is configured.

Example:

```ts
socialImageOrigin: 'https://cdn.mengche.dev/og',
socialImageFiles: {
  root: 'root.webp',
  pages: {
    home: { en: 'home-en.webp', 'zh-TW': 'home-zh-tw.webp' }
  }
}
```

## Add a social link or qualification

Edit `socialLinks` or `profile.qualifications` in `packages/content/src/site.ts`. Use HTTPS URLs and stable IDs.

## Update translations

Every reusable message key must exist in both:

- `apps/site/messages/en.json`
- `apps/site/messages/zh-TW.json`

Paraglide output under `apps/site/src/lib/paraglide` is generated. Do not edit it.

## Validate before committing

```bash
pnpm content:validate
pnpm check
pnpm lint
pnpm build
```

Validation errors identify the record and field, for example:

```text
projects.nrg-commerce.live-preview must be a valid HTTPS URL
services.marketing-site prices must be positive
case-studies/zh-tw/nrg-commerce.md is missing
```
