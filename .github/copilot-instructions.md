# GitHub Copilot Instructions — React Project Template

## Superpowers Check — Do This First

Before starting any work, check whether the Superpowers plugin is installed.

Superpowers is installed if you have access to skills such as `using-superpowers`,
`brainstorming`, `writing-plans`, or `systematic-debugging`.

If Superpowers is NOT installed, ask the user:

> "Superpowers is not installed. It provides structured workflows for brainstorming,
> planning, TDD, debugging, and code review. Would you like to install it?"

If the user says yes, for GitHub Copilot CLI run:
```
copilot plugin install superpowers@superpowers-marketplace
```

After installation, use Superpowers workflows throughout this project:

- `brainstorming` — shape unclear feature ideas before implementation.
- `writing-plans` — turn approved designs into implementation plans.
- `test-driven-development` — for code changes where tests are practical.
- `systematic-debugging` — investigate bugs or failing tests.
- `requesting-code-review` and `receiving-code-review` — for review loops.
- `verification-before-completion` — before claiming work is done.

Project plans go in `docs/superpowers/plans/`. Design specs go in `docs/superpowers/specs/`.

---

## React Skills

This project includes a React skill suite under `skills/`. Consult the relevant skill
before generating or suggesting code.

- `skills/react-frontend-architecture/` — app structure, feature boundaries, component
  ownership, state placement, hooks patterns, server/client separation.
- `skills/react-code-review/` — reviewing diffs, components, hooks, rendering risks,
  TypeScript quality, accessibility regressions, and test gaps.
- `skills/react-testing-strategy/` — unit, integration, component, browser, e2e,
  visual validation, and accessibility testing decisions.
- `skills/react-refactoring/` — splitting large components, extracting hooks,
  modularizing logic, reducing duplication, and preserving behavior.
- `skills/react-performance/` — rendering performance, bundle size, lazy loading,
  memoization, data waterfalls, Core Web Vitals, and performance budgets.
- `skills/react-fullstack-integration/` — REST, GraphQL, RPC, Next.js APIs, Server
  Actions, RSC, backend interop, validation, caching, and error contracts.
- `skills/react-auth-architecture/` — authentication, authorization, sessions, route
  guards, token handling, RBAC/ABAC, OAuth/OIDC, and Better Auth patterns.
- `skills/react-data-database-integration/` — data flows, API contracts, schema-driven
  types, query caches, mutations, optimistic updates, and pagination.
- `skills/design-to-react-implementation/` — converting Figma files, design tokens,
  shadcn/ui patterns, responsive layouts, and accessibility semantics into React.
- `skills/react-template-documentation-devops/` — template documentation, ADRs,
  GitHub Actions, CI checks, contribution guidance, and release hygiene.

## General Guidance

- Follow existing conventions in `package.json`, framework config, and `src/` or `app/`
  before introducing new patterns.
- Place state as narrowly as practical: local first, feature-level next, global store only
  for genuinely cross-feature needs.
- Keep shared components policy-free; move business rules into the owning feature.
- Run available typecheck, lint, and tests before marking work done.
