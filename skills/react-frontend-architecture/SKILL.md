---
name: react-frontend-architecture
description: Use when designing or changing React app structure, feature boundaries, routing boundaries, component ownership, state placement, hooks patterns, client/server separation, or scalability conventions
---

# React Frontend Architecture

## Use When

- Designing a new React app, template, feature area, route tree, or module boundary.
- Changing feature architecture, shared component ownership, state placement, hooks patterns, or client/server boundaries.
- Evaluating whether React code will scale across teams, domains, or product areas.

## Core Workflow

1. Inspect the app shape before designing changes: routes, feature folders, data-fetching entry points, shared UI, state stores, hooks, tests, and framework boundaries.
2. Identify the domain, route, data ownership, and consumer for each change. Prefer feature and ownership boundaries before choosing folder names.
3. Keep shared code reusable and policy-free. Move business rules, route assumptions, authorization decisions, and product-specific defaults back into the owning feature.
4. Place state as narrowly as practical: local component state first, then feature-level state, then app-level stores only for genuinely cross-feature needs.
5. Design component APIs around consumers: clear props, stable event contracts, accessible defaults, and escape hatches only where repeated use proves they are needed.
6. Keep hooks focused on one concern. Separate data access, subscriptions, DOM effects, and pure derivation when mixing them obscures behavior.
7. For client/server frameworks, define which code runs on the server, which code runs in the browser, and where serialization or mutation boundaries live.
8. Verify the architecture by checking import direction, test placement, change isolation, route ownership, and whether a new feature can be added without editing unrelated domains.
9. Run available project verification such as typecheck, lint, relevant tests, and build. If a check cannot run, state the residual risk.

## Inspect First

- `package.json`, framework config, route files, `src/`, `app/`, `pages/`, `features/`, `components/`, `lib/`, `hooks/`, and `services/`.
- Existing import aliases, state/query/form libraries, UI systems, and test placement.
- Whether the app is SPA-only, framework-rendered, server-capable, or hybrid.

## Common Mistakes

- Starting with folder names before domain and ownership boundaries are clear.
- Putting feature-specific behavior in shared components or shared hooks.
- Creating global state for local coordination problems.
- Mixing server-only, client-only, and universal code without explicit boundaries.

## Verification

- Check import direction, test placement, change isolation, and route ownership.
- Run available typecheck, lint, relevant tests, and build.
- If a check cannot run, state the residual risk.

## Advanced References

- Read `references/feature-architecture.md` when defining feature folders, shared modules, import rules, or ownership boundaries.
- Read `references/nextjs-rsc.md` when the app uses Next.js App Router, React Server Components, Server Actions, or mixed server/client rendering.
