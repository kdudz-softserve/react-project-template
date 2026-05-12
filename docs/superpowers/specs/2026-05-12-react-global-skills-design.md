# React Global Skills Design

Date: 2026-05-12

## Purpose

Create a reusable global Codex skill suite for designing, building, reviewing, testing, refactoring, documenting, and operating high-quality React application templates.

The skills will live under `~/.codex/skills` so they can be reused across projects. This repository will later use those global skills to create a React app template after the template requirements are defined.

## Scope

The suite is React-general by default. It must support common React application shapes such as Vite SPA, framework-based React apps, and frontend applications that communicate with external backends.

The suite must not assume Next.js as the default. Next.js, React Server Components, Server Actions, Node.js APIs, Python APIs, .NET APIs, GraphQL, REST, and similar technologies are optional advanced paths that can be added as references inside the relevant skills.

## Personas Covered

- Senior frontend engineer / frontend architect
- QA engineer
- UI / UX designer
- Code reviewer
- Business analyst / requirements reviewer
- Full-stack React integration engineer
- DevOps / GitHub Actions engineer

## Design Approach

Use a focused pack of broad workflow skills, with advanced narrow references available inside each skill. This gives a practical default set while preserving room for deeper architect-level guidance later.

Avoid a single mega skill because it would load too much unrelated context and mix different work modes. Avoid an overly large initial set because too many narrow skills would create overlap and maintenance overhead before real usage patterns are known.

## Global Skill Folders

```text
~/.codex/skills/
  react-frontend-architecture/
    SKILL.md
    references/
      nextjs-rsc.md
      feature-architecture.md

  react-code-review/
    SKILL.md
    references/
      review-checklist.md
      react-antipatterns.md

  react-testing-strategy/
    SKILL.md
    references/
      browser-testing.md
      accessibility-testing.md
      visual-validation.md

  react-refactoring/
    SKILL.md
    references/
      component-splitting.md
      hook-extraction.md

  react-performance/
    SKILL.md
    references/
      profiling.md
      core-web-vitals.md
      bundle-optimization.md

  react-fullstack-integration/
    SKILL.md
    references/
      rest-contracts.md
      graphql-contracts.md
      nextjs-server-actions.md
      backend-interop.md

  react-auth-architecture/
    SKILL.md
    references/
      oauth-oidc.md
      better-auth.md
      authorization-patterns.md

  react-data-database-integration/
    SKILL.md
    references/
      query-cache-patterns.md
      schema-driven-types.md
      optimistic-updates.md

  design-to-react-implementation/
    SKILL.md
    references/
      figma-to-code.md
      shadcn-ui.md
      accessibility-semantics.md

  react-template-documentation-devops/
    SKILL.md
    references/
      github-actions.md
      template-documentation.md
      adr-guidance.md
```

## Skill Responsibilities

### `react-frontend-architecture`

Use when designing or changing app structure, feature boundaries, routing boundaries, component ownership, state placement, hooks patterns, client/server separation, and scalability conventions.

The skill should help agents inspect existing structure first, define feature and shared boundaries, choose state placement deliberately, protect component APIs, and document architectural decisions.

### `react-code-review`

Use when reviewing React PRs or code changes for anti-patterns, rendering risks, TypeScript quality, maintainability, architecture drift, accessibility regressions, and test gaps.

The skill should make findings-first review the default: bugs and risks before summaries. It should include React-specific checks for rendering behavior, hook misuse, stale closures, unstable dependencies, accidental global state, weak types, and missing tests.

### `react-testing-strategy`

Use when planning or writing tests for React apps: unit, integration, component, browser, end-to-end, visual/UI validation, accessibility checks, and test data strategy.

The skill should guide the agent to choose the smallest useful test level, cover behavior instead of implementation details, use browser testing when layout or interaction matters, include accessibility verification, and keep tests deterministic.

### `react-refactoring`

Use when improving existing React code: splitting large components, extracting hooks, moving logic into services, reducing duplication, improving state boundaries, and making code easier to test.

The skill should require characterization or safety checks before refactors, preserve behavior, split responsibilities gradually, and verify each meaningful change.

### `react-performance`

Use when optimizing React runtime behavior, rendering, bundle size, lazy loading, memoization, data-fetching waterfalls, Core Web Vitals, profiling, and performance budgets.

The skill should require measuring or reproducing the problem first, identifying the bottleneck class, applying the smallest effective optimization, and verifying the result with appropriate tooling.

### `react-fullstack-integration`

Use when connecting React to backend systems: REST, GraphQL, RPC, Next.js APIs, Server Actions, React Server Components, Node.js, Python, .NET, error contracts, validation, caching, and environment boundaries.

The skill should keep frontend/backend responsibilities explicit, prefer typed contracts where practical, define error and loading states, handle validation on the correct side of the boundary, and avoid locking the template to one backend language.

### `react-auth-architecture`

Use when implementing authentication and authorization in React apps: session handling, route guards, token storage, refresh flows, RBAC/ABAC, OAuth/OIDC, better-auth, and secure frontend/backend responsibility splits.

The skill should emphasize security boundaries, avoid unsafe token handling, separate authentication from authorization, define route and API protection patterns, and account for loading, expiry, and failure states.

### `react-data-database-integration`

Use when designing frontend data models and database-facing flows: API contracts, schema-driven types, optimistic updates, query keys, mutations, pagination, caching, forms, migrations awareness, and data consistency.

The skill should keep React code decoupled from database implementation details while still respecting persistence constraints, consistency needs, schema evolution, and backend contracts.

### `design-to-react-implementation`

Use when converting designs into React UI: Figma/design tokens, responsive layouts, component anatomy, accessibility semantics, shadcn/ui, visual QA, interaction states, and design-system fit.

The skill should guide agents to inspect the design system, map design tokens, build accessible components, handle responsive behavior and interaction states, and verify the result visually in browser when practical.

### `react-template-documentation-devops`

Use when creating or maintaining template documentation, onboarding docs, ADRs, README structure, Git/GitHub workflow, GitHub Actions, CI checks, release hygiene, and contribution guidance.

The skill should make the template understandable and operable: clear setup docs, architecture notes, testing commands, CI expectations, contribution flow, and decision records where useful.

## Skill Authoring Guidelines

Each `SKILL.md` should stay concise and procedural:

- Clear frontmatter with `name` and a trigger-focused `description`.
- A short overview of the skill's purpose.
- A core workflow the agent should follow.
- Inspection checklist for relevant files and project signals.
- Common mistakes and anti-patterns.
- Verification expectations.
- Links to advanced reference files, loaded only when relevant.

Reference files should contain deeper or narrower knowledge, such as framework-specific guidance, checklist details, examples, and technology-specific integration patterns.

## Trigger Strategy

The skills should trigger on real work modes:

- "Design React architecture" -> `react-frontend-architecture`
- "Review this PR/component" -> `react-code-review`
- "Add tests / test this UI" -> `react-testing-strategy`
- "Clean up this component" -> `react-refactoring`
- "Improve speed / bundle / rendering" -> `react-performance`
- "Connect to backend/API" -> `react-fullstack-integration`
- "Add login/auth/RBAC" -> `react-auth-architecture`
- "Add database/data flows" -> `react-data-database-integration`
- "Implement Figma/design" -> `design-to-react-implementation`
- "Set up docs/CI/GitHub Actions" -> `react-template-documentation-devops`

## Future React Template Creation Flow

When the React app template requirements are defined, use the skills in this likely order:

1. `react-frontend-architecture`
2. `design-to-react-implementation`
3. `react-testing-strategy`
4. `react-fullstack-integration` if backend communication is included
5. `react-auth-architecture` if authentication or authorization is included
6. `react-data-database-integration` if persistence or database-facing data flows are included
7. `react-performance`
8. `react-template-documentation-devops`
9. `react-code-review`
10. `verification-before-completion`

## Acceptance Criteria

- The skill pack is global and reusable across projects.
- The initial suite contains 10 focused skills.
- React is the default scope; Next.js and backend-specific guidance are optional advanced references.
- The suite supports future narrow, architect-level knowledge without requiring a redesign.
- Each skill has a distinct responsibility and a clear trigger surface.
- The design supports the listed personas without creating a separate skill for every persona.
