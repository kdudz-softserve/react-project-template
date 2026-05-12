# Visual Validation

Use visual validation for behavior that cannot be trusted from DOM assertions alone: responsive layout, overflow, visual states, design fidelity, spacing regressions, sticky or fixed elements, charts, canvas, maps, and animation end states.

## Screenshot Strategy

- Capture screenshots at the viewport sizes the product supports.
- Include the meaningful states: empty, loading, populated, error, focused, hovered, expanded, selected, disabled, and scrolled.
- Prefer stable fixture data and deterministic clocks so screenshots show intentional differences.
- Mask volatile regions such as timestamps, random avatars, ads, live prices, and cursor positions.
- Keep visual baselines scoped to components or flows with real regression value.

## Viewport Matrix

Use a small matrix that reflects the app, for example:

- Mobile narrow: 360 x 640.
- Mobile large: 390 x 844.
- Tablet: 768 x 1024.
- Desktop: 1280 x 800.
- Wide desktop: 1440 x 900 or larger when the layout has wide behavior.

Adjust the matrix for products with dashboards, embedded widgets, kiosk views, or mobile-first traffic.

## Manual Visual Checks

- Compare against the design or expected production behavior.
- Check that text fits inside buttons, tabs, cards, dialogs, tables, and navigation.
- Look for horizontal overflow, clipped shadows, hidden focus rings, misaligned icons, and overlapping sticky elements.
- Verify layout stability during loading, image decode, font swap, route transition, and validation errors.
- Inspect responsive menus, sidebars, dialogs, and dense tables at every breakpoint.

## Snapshot Limits

Visual snapshots are evidence, not a substitute for intent. Pair screenshots with behavior assertions so failures explain what mattered. Avoid broad full-page snapshots when a smaller screenshot would make the regression clearer.
