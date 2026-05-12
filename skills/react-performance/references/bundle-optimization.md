# Bundle Optimization

Bundle work should start with a report, not a guess. Use the app's analyzer or build output to identify the route, chunk, dependency, and duplicate package that matter.

## Dependency Review

- Find large direct dependencies and transitive packages in critical chunks.
- Check whether imports pull an entire library for one helper, icon, locale, chart, or editor.
- Prefer framework-native utilities, smaller focused packages, or existing local code when they meet the need.
- Remove unused dependencies and duplicate versions when safe.
- Confirm tree shaking is working for ESM packages and that side effects are declared correctly.

## Code Splitting

- Lazy-load routes, admin surfaces, editors, charts, maps, modals, and rarely used flows.
- Keep the initial route's critical UI available without waiting on secondary features.
- Use dynamic imports at boundaries that match user journeys.
- Avoid splitting so aggressively that the browser must fetch many serial chunks before useful UI appears.
- Preload or prefetch only when the next action is likely enough to justify the network cost.

## Build Checks

- Run the production build and bundle analyzer when available.
- Compare parsed, minified, gzip, and brotli sizes if the tooling reports them.
- Inspect shared chunks for accidental client-only libraries on all routes.
- Check source maps or analyzer treemaps for duplicate packages and large locale/data payloads.
- Verify that lazy chunks do not break SSR, hydration, route transitions, or error boundaries.

## Runtime Follow-Through

- Recheck the network waterfall after bundle changes.
- Confirm caching headers and immutable asset names for built JS and CSS.
- Watch for shifted cost: smaller initial JS can still be slow if it creates extra round trips or hydration work.
