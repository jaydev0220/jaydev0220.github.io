## Context and goals

NRG Commerce is a product project that explores the structure needed for a maintainable commerce system, rather than a single storefront page.

## Role and responsibilities

I designed the repository boundaries, built the full-stack applications and shared packages, and maintained the development and deployment flow. It is not presented as commissioned client work.

## Planning and implementation

The repository separates the public site, product catalog, admin area, API, contact handling, database, and shared settings. Responsibilities and change boundaries stay clear instead of being placed in one application.

## Technical architecture

- pnpm workspace for deployable applications and shared packages
- Separate public site, catalog, admin area, API, and contact service
- Shared database, schema, components, SEO, and settings packages
- Typed contracts between application boundaries
- Repository structure built around CI checks and deployment

## Key decisions

The monorepo uses clear package responsibilities instead of splitting into microservices too early. Shared code is added only when several applications need the same contract or implementation.

## Verified result

The public repository and live project show the implemented structure and workflows. Portfolio screens and examples must use synthetic or redacted data. No outside adoption or revenue result is claimed.
