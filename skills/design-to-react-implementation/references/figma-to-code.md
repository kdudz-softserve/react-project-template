# Figma to Code

Use the design file as structured evidence, not as a static picture. Inspect the hierarchy, constraints, variants, and tokens before writing JSX or CSS.

## Design Inspection

- Identify the target frame, breakpoint, component set, and state being implemented.
- Read layer names, grouping, auto layout direction, gaps, padding, alignment, min/max sizes, clipping, and overflow rules.
- Check whether repeated elements are component instances, variants, or one-off layout copies.
- Capture the intended states: default, hover, active, focus, disabled, selected, loading, empty, error, and responsive variants.
- Note any annotations for behavior, motion, validation, accessibility, or content rules.

## Tokens and Components

- Map Figma styles to existing implementation tokens: colors, text styles, radius, spacing, shadows, borders, opacity, motion, and breakpoints.
- Prefer existing CSS variables, Tailwind theme values, design-system tokens, or component variants over hard-coded values.
- If the design uses new values, check whether they are intentional additions or near-matches to existing tokens.
- Match component semantics to the app's primitives: buttons, links, inputs, tabs, dialogs, menus, tables, cards, badges, and navigation.

## Responsive Behavior

- Translate Figma constraints and auto layout into CSS grid, flex, container constraints, aspect-ratio, min/max widths, and wrapping rules.
- Preserve hierarchy at each breakpoint. Do not let labels, buttons, or metric tiles resize the layout unpredictably.
- Test realistic content lengths, empty states, and narrow screens before treating the implementation as visually complete.

## Assets

- Export real assets only when they cannot be represented by existing icons, CSS, or code-native primitives.
- Prefer SVG for icons and logos when already part of the system; use raster images for photos, textures, product imagery, and artwork.
- Keep asset names stable and descriptive, and avoid embedding Figma-specific layer names into user-facing code.

## Visual QA

- Run the app in a browser and compare screenshots to the design at the requested viewport sizes.
- Check alignment, spacing, type scale, color contrast, focus outlines, scroll behavior, and state transitions.
- Iterate until differences are intentional, documented, or constrained by existing product conventions.
