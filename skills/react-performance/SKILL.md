---
name: react-performance
description: Use when improving React rendering performance, bundle size, lazy loading, memoization, data-fetching waterfalls, Core Web Vitals, profiling results, or performance budgets
---

# React Performance

Measure first, then fix the bottleneck class you actually found. Avoid premature memoization, broad rewrites, or optimizing code that is not on a user-critical path.

## Use When

- Improving React rendering performance, bundle size, lazy loading, memoization, or data-fetching waterfalls.
- Investigating Core Web Vitals, profiling output, slow routes, jank, layout shifts, or performance budgets.
- Reviewing performance impact of React architecture, data loading, assets, or client/server boundaries.

## Core Workflow

1. Define the user-visible problem: slow load, delayed input, jank, layout shift, heavy route, large bundle, or expensive render.
2. Measure before changing: React Profiler, browser performance trace, network waterfall, bundle analyzer, Lighthouse, Web Vitals, or production telemetry.
3. Record device, viewport, network, route, data size, and interaction used for the measurement.
4. Classify the bottleneck before choosing a fix.
5. Remove unnecessary work before adding memoization.
6. Narrow state and context updates so changes affect fewer components.
7. Break data waterfalls, defer non-critical work, and optimize assets only when evidence points there.
8. Verify after changing with the same tool or metric used for the baseline.

## Inspect First

- React Profiler output, browser traces, network waterfalls, bundle reports, Lighthouse/Web Vitals, or production telemetry.
- Route/component ownership, data fetching paths, context providers, memoization, assets, fonts, and lazy boundaries.
- Device, viewport, network, route, data size, and interaction used to reproduce the issue.

## Common Mistakes

- Adding memoization before removing unnecessary work.
- Optimizing code that is not on a user-critical path.
- Ignoring network chains, images, fonts, hydration, or layout shifts.
- Claiming improvement without before/after evidence.

## Verification

- Compare before/after measurements with the same tool, route, device, network, and interaction when practical.
- Run relevant typecheck, lint, tests, build, bundle analysis, browser trace, Lighthouse, or Web Vitals checks.
- If a check cannot run, state what remains unverified.

## Bottleneck Classes

- Rendering: excessive renders, expensive components, unstable props, slow context updates, large lists.
- Data: waterfalls, duplicate requests, cache misses, blocking mutations, late preloads.
- Network: render-blocking CSS or scripts, dependency chains, slow APIs, poor caching, large images or fonts.
- Bundle: heavy dependencies, missed tree shaking, eager routes, duplicated packages, client-only code on initial load.
- Hydration: too much initial client work, mismatches, large client islands, blocking effects.
- Layout: CLS, forced reflow, image sizing, font swap, dynamic content insertion.
- Impact: prioritize changes by user-visible severity, affected routes, traffic, regression risk, and whether the issue blocks Core Web Vitals goals.

## Advanced References

- Profiling and evidence: `references/profiling.md`
- Core Web Vitals: `references/core-web-vitals.md`
- Bundle optimization: `references/bundle-optimization.md`
