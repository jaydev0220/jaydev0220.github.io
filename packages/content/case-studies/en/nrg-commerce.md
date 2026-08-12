## Context and goals

NRG Commerce is a product project that explores the structure needed for a maintainable commerce system, rather than a single storefront page.

## Role and responsibilities

I designed the repository boundaries, built the full-stack applications and shared packages, and maintained the development and deployment flow. It is not presented as commissioned client work.

## Planning and implementation

The repository separates the public site, product catalog, admin area, API, contact handling, database, and shared settings. Responsibilities and change boundaries stay clear instead of being placed in one application.

The visible storefront uses a laboratory-glass presentation and browsable product categories, while the wider repository accounts for work that is not visible in a screenshot: catalog records, administrative operations, API contracts, database changes, shared settings, contact delivery, validation, and deployment. This separation makes it possible to reason about a public browsing path without treating it as the whole commerce system.

## Fit, deliverables, and exclusions

This is the closest case for a business site or small full-stack application that needs several coordinated surfaces and persistent data. Relevant deliverables include repository and package boundaries, typed application contracts, public catalog behavior, administration interfaces, API and data layers, testable shared modules, and deployment configuration.

It is an independent product project, not evidence of a commissioned implementation, customer adoption, transaction volume, revenue, or production service-level guarantees. The public screens and repository also do not remove the need for project-specific discovery around payments, inventory authority, tax, fulfillment, privacy, security, accessibility, migration, and operational support.

## Technical architecture

- pnpm workspace for deployable applications and shared packages
- Separate public site, catalog, admin area, API, and contact service
- Shared database, schema, components, SEO, and settings packages
- Typed contracts between application boundaries
- Repository structure built around CI checks and deployment

## Key decisions

The monorepo uses clear package responsibilities instead of splitting into microservices too early. Shared code is added only when several applications need the same contract or implementation.

A monorepo adds coordination cost, so it is justified here by multiple deployable applications and shared domain contracts. It keeps related changes reviewable together while allowing each application to retain an explicit responsibility. This is different from placing every route, background task, and data operation in one undifferentiated package.

## Risks and review questions

Commerce work carries risks that a portfolio image cannot answer: data correctness, access control, third-party failures, destructive administrative actions, migration quality, and the ownership of ongoing operations. A comparable commission would need to identify authoritative data, user roles, integration contracts, recovery behavior, and acceptance checks before scope is fixed.

The public implementation is useful evidence for architecture and workflow decisions. It should not be treated as a certification for an unknown regulated, high-volume, or legacy environment.

## Verified result

The public repository and live project show the implemented structure and workflows. Portfolio screens and examples must use synthetic or redacted data. No outside adoption or revenue result is claimed.
