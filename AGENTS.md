# Agent Instructions

## Tech Stack

- **Framework:** Svelte v5, SvelteKit v2
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5.9
- **Linting:** ESLint, Prettier
- **Icons:** Iconify (`@iconify/svelte`)
- **Deployment:** GitHub Pages (via `@sveltejs/adapter-static`)
- **Package Manager:** pnpm 10

## Directory Structure

```
project-root/
|-- src/
|   |-- lib/
|   |   |-- components/ # Reusable UI components
|   |   |-- data/       # Page data files
|   |   `-- utils.ts    # Utility functions
|   `-- routes/
|       |-- [...404]/   # Custom 404 page
|       `-- layout.css  # Global CSS styles
|-- static/             # Static assets
`-- svelte.config.js    # Svelte and SvelteKit configuration
```

## Action Rules

- **Documentation Updates:** Modify README.md immediately when altering setup instructions, dependencies, or core features.
- **Git Commits:** Commit after every discrete unit of work. Never batch unrelated changes. Use `git-commit` skill for format and examples.

## Available Scripts

```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm check     # Run type check
pnpm lint      # Check formatting & lint
pnpm format    # Auto-format code
```
