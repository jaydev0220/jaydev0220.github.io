# Design system

> Audience: repository maintainers and contributors.

The rewrite uses a new token system. Previous theme values and component styles are not inputs to this system.

## Files

```text
apps/site/src/lib/styles/
├── reset.css
├── tokens.css
├── typography.css
├── utilities.css
└── components.css
```

## Token layers

1. **Primitive tokens** define raw color, spacing, radius, timing, shadow, and width values.
2. **Semantic tokens** describe purpose: page surface, primary text, subtle border, focus ring, status colors.
3. **Component aliases** exist only when a component requires a stable contract, such as button background or form-control surface.

Components must use semantic or justified component tokens. Do not add raw color values to Svelte components.

## Theme rules

- Light and dark themes have separately evaluated semantic mappings.
- A dark theme is not produced by mechanically inverting light colors.
- Both themes must maintain readable contrast for text and controls.
- Use shadows only to communicate layering.
- Use the small radius scale intentionally; do not round every container.
- New tokens require a reusable purpose. One-off values stay local only when they are not visual-theme values.

## Visual direction

The interface is typography-led and editorial. Avoid:

- generic gradient backgrounds and glowing blobs
- glass panels
- repetitive card grids
- decorative statistics
- bento layouts without an information reason
- oversized vague sales copy
- excessive badges, pills, and animated reveals

Section structure should follow content meaning. Project lists, service comparisons, process steps, forms, and long-form case studies should not be forced into the same visual component.

## Extending tokens

1. Check whether an existing semantic token already expresses the purpose.
2. Add a primitive only when the value belongs to a reusable scale.
3. Add a semantic alias based on purpose, not appearance.
4. Add a component alias only when multiple component states depend on it.
5. Check both themes and reduced-motion behavior when the affected styles or interactions change.
6. Run the relevant Playwright interaction/layout tests and Lighthouse before release.
