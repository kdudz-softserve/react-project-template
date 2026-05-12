# Core Web Vitals

Core Web Vitals connect performance work to user-visible loading, stability, and responsiveness. Treat them as field metrics first when production data exists, then use lab tooling to reproduce and debug.

## LCP

Largest Contentful Paint is usually affected by the critical rendering path.

- Identify the LCP element for the route and viewport.
- Reduce render-blocking CSS and scripts.
- Avoid late-loading the hero image, primary text, or critical data.
- Use correct image dimensions, modern formats, responsive sources, and priority loading only for truly critical images.
- Ensure server response, streaming, caching, and data dependencies do not delay the first meaningful content.

## CLS

Cumulative Layout Shift is caused by unexpected movement.

- Reserve space for images, embeds, ads, banners, skeletons, and late content.
- Avoid injecting content above existing content after load unless user initiated it.
- Keep font swaps controlled with sensible font-display and metric-compatible fallbacks when possible.
- Verify loading, error, validation, and route transition states at real viewports.

## INP

Interaction to Next Paint reflects responsiveness across interactions.

- Profile slow clicks, typing, menu open, filtering, drag, route change, and submit flows.
- Reduce long tasks and heavy synchronous work.
- Split expensive calculations, defer non-critical updates, and use React transitions for interruptible UI updates where appropriate.
- Avoid rerendering large subtrees for localized interactions.

## Browser Verification

- Test cold and warm loads.
- Use realistic network and CPU throttling for the target audience.
- Inspect hydration warnings and hydration duration.
- Capture screenshots or traces for layout shifts and delayed visual completion.
- Compare lab findings with field Web Vitals when available.
