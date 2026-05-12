# Feature Architecture

## Boundary Rules

- Organize by product capability or route-owned domain before organizing by technical type.
- A feature may import shared UI, shared utilities, framework adapters, and its own internal modules.
- Shared modules must not import feature modules.
- Sibling features should communicate through route composition, explicit service contracts, shared domain primitives, or API boundaries, not direct internal imports.
- Keep policy decisions close to the owning feature: permissions, product defaults, copy variants, analytics meaning, and workflow-specific branching.
- Keep reusable UI policy-free: visual primitives, layout helpers, form controls, and simple interaction components should not know product workflows.
- Let route boundaries own page assembly, URL params, loaders, metadata, and cross-feature composition.
- Let data ownership follow the source of truth: fetching, mutations, cache invalidation, and optimistic updates belong near the feature or route that owns the workflow.

## Recommended Shape

Use the existing project conventions first. When a project lacks a clear pattern, prefer a shape like:

```text
src/
  app/ or routes/
    account/
      page.tsx
      layout.tsx
  features/
    billing/
      components/
      hooks/
      api/
      model/
      tests/
      index.ts
  shared/
    ui/
    lib/
    hooks/
    types/
```

Feature folders should expose a small public surface through an index or named entry points. Internal components, hooks, schemas, and helpers should remain internal unless another feature has a repeated, stable need for them.

Choose names that describe product concepts, not implementation details. Prefer `billing`, `projects`, `documents`, or `onboarding` over `forms`, `tables`, or `modals` for feature roots.

## Boundary Checks

- Can the feature be moved, deleted, or rewritten without editing unrelated features?
- Are imports pointing inward to the owner or outward to stable shared contracts?
- Does shared code remain free of route, tenant, permission, analytics, or workflow assumptions?
- Are data fetching and mutations owned near the route or feature that invalidates and renders them?
- Is state scoped to the smallest tree that needs it?
- Are component props phrased for consumers instead of mirroring internal implementation state?
- Do tests live near the behavior they protect, with shared utilities tested separately?
- Would a new adjacent feature copy a clear pattern instead of importing internals from this one?
