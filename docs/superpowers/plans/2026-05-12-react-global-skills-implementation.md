# React Global Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 10 reusable global Codex skills under `~/.codex/skills` for React architecture, review, testing, refactoring, performance, full-stack integration, auth, data/database integration, design-to-code, and template documentation/devops.

**Architecture:** Each skill is a small global skill folder with a concise `SKILL.md` and optional `references/` files for advanced narrow guidance. `SKILL.md` files contain the trigger, workflow, inspection checklist, mistakes, verification expectations, and reference navigation. Reference files contain deeper guidance for advanced React, Next.js, backend, auth, testing, design, and CI topics.

**Tech Stack:** Codex skills, Markdown, YAML frontmatter, Superpowers skill authoring guidance, Git.

---

## Source Spec

Use this approved spec as the authority for scope and naming:

- `docs/superpowers/specs/2026-05-12-react-global-skills-design.md`

## External Source Mapping

Use the requested external skills and guides as source material where they fit. Do not copy them verbatim; adapt their workflows into our concise global skills.

- `anthropics/frontend-design`: Base `design-to-react-implementation` visual-quality rules on this source.
- `google-labs-code/react-components`: Base component-boundary guidance in `react-frontend-architecture`, `react-refactoring`, and `design-to-react-implementation` on this source.
- `google-labs-code/shadcn-ui`: Base `design-to-react-implementation/references/shadcn-ui.md` on this source.
- `openai/frontend-skill`: Use as a general frontend implementation and review influence for `design-to-react-implementation`, `react-frontend-architecture`, and `react-code-review`.
- `vercel-react-best-practices`: Base React/Next performance categories in `react-performance`, `react-code-review`, and `react-frontend-architecture` on this source.
- `react-specialist`: Use as a senior React heuristics influence for architecture, review, refactoring, and testing.
- `anthropics/webapp-testing`: Base `react-testing-strategy/references/browser-testing.md` on this source.
- `openai/playwright-interactive`: Base browser debugging and visual QA guidance in `react-testing-strategy` and `design-to-react-implementation` on this source.
- `figma/figma-implement-design`: Base `design-to-react-implementation/references/figma-to-code.md` on this source.
- `better-auth/create-auth`: Base Better Auth setup flow in `react-auth-architecture/references/better-auth.md` on this source.
- `better-auth/best-practices`: Base auth security and production checks in `react-auth-architecture` on this source.
- `apollographql/apollo-client`: Base GraphQL and Apollo guidance in `react-fullstack-integration/references/graphql-contracts.md` and `react-data-database-integration` on this source.
- `cloudflare/web-perf`: Base measurement workflow and audit categories in `react-performance` on this source.

## File Structure

Create these global skill folders:

```text
/Users/kdudz/.codex/skills/react-frontend-architecture/
/Users/kdudz/.codex/skills/react-code-review/
/Users/kdudz/.codex/skills/react-testing-strategy/
/Users/kdudz/.codex/skills/react-refactoring/
/Users/kdudz/.codex/skills/react-performance/
/Users/kdudz/.codex/skills/react-fullstack-integration/
/Users/kdudz/.codex/skills/react-auth-architecture/
/Users/kdudz/.codex/skills/react-data-database-integration/
/Users/kdudz/.codex/skills/design-to-react-implementation/
/Users/kdudz/.codex/skills/react-template-documentation-devops/
```

Each folder must contain:

```text
SKILL.md
references/
```

Create only the reference files listed in each task. Do not add README files, changelogs, installation guides, or unrelated documentation.

## Shared Skill Standards

Every `SKILL.md` must use this structure:

```markdown
---
name: skill-name
description: Use when [triggering conditions only, no workflow summary]
---

# Skill Title

## Use When

- Trigger condition.
- Trigger condition.

## Core Workflow

1. Inspect the current project context first.
2. Identify the relevant constraints.
3. Make the smallest useful recommendation or change.
4. Verify the result with the most relevant checks.

## Inspect First

- File or project signal.
- File or project signal.

## Common Mistakes

- Mistake and correction.
- Mistake and correction.

## Verification

- Concrete verification command or review check.
- Concrete verification command or review check.

## Advanced References

- `references/file.md`: When to open it.
```

Descriptions must start with `Use when` and must describe triggering conditions only. Do not summarize the workflow in frontmatter.

## Task 1: Create Global Skill Directories

**Files:**
- Create directories under `/Users/kdudz/.codex/skills`

- [ ] **Step 1: Create the root skill folders**

Run:

```bash
mkdir -p /Users/kdudz/.codex/skills/react-frontend-architecture/references
mkdir -p /Users/kdudz/.codex/skills/react-code-review/references
mkdir -p /Users/kdudz/.codex/skills/react-testing-strategy/references
mkdir -p /Users/kdudz/.codex/skills/react-refactoring/references
mkdir -p /Users/kdudz/.codex/skills/react-performance/references
mkdir -p /Users/kdudz/.codex/skills/react-fullstack-integration/references
mkdir -p /Users/kdudz/.codex/skills/react-auth-architecture/references
mkdir -p /Users/kdudz/.codex/skills/react-data-database-integration/references
mkdir -p /Users/kdudz/.codex/skills/design-to-react-implementation/references
mkdir -p /Users/kdudz/.codex/skills/react-template-documentation-devops/references
```

Expected: All commands exit with code 0.

- [ ] **Step 2: Verify directory creation**

Run:

```bash
find /Users/kdudz/.codex/skills -maxdepth 2 -type d \( -name 'react-*' -o -name 'design-to-react-implementation' \) -print
```

Expected output includes all 10 skill directories and their `references` subdirectories.

- [ ] **Step 3: Commit repository plan checkpoint**

Run:

```bash
git add docs/superpowers/plans/2026-05-12-react-global-skills-implementation.md
git commit -m "Add React global skills implementation plan"
```

Expected: One commit containing only this plan file.

## Task 2: Create `react-frontend-architecture`

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-frontend-architecture/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-frontend-architecture/references/feature-architecture.md`
- Create: `/Users/kdudz/.codex/skills/react-frontend-architecture/references/nextjs-rsc.md`

- [ ] **Step 1: Write `SKILL.md`**

Content requirements:

```markdown
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

1. Inspect the existing app shape before proposing structure.
2. Identify the product domains, route boundaries, data ownership, and shared UI surfaces.
3. Choose feature boundaries before choosing folder names.
4. Keep shared code boring: reusable, dependency-light, and free of feature-specific policy.
5. Place state at the narrowest stable owner; promote it only when multiple consumers genuinely need it.
6. Define component APIs from the consumer's point of view.
7. Verify the architecture with import direction, testing surface, and change-isolation checks.

## Inspect First

- `package.json`, framework config, route files, `src/`, `app/`, `pages/`, `features/`, `components/`, `lib/`, `hooks/`, `services/`.
- Existing import aliases and path conventions.
- State libraries, query libraries, form libraries, routing libraries, and UI systems.
- Whether the app is SPA-only, framework-rendered, server-capable, or hybrid.

## Common Mistakes

- Starting with folder taxonomy before domain boundaries are known.
- Putting feature-specific behavior in shared components or shared hooks.
- Creating global state for local coordination problems.
- Letting hooks hide cross-feature dependencies.
- Mixing server-only, client-only, and universal code without explicit boundaries.

## Verification

- Check that feature modules can be understood without reading unrelated features.
- Check imports do not create circular dependencies or feature-to-feature coupling through shared code.
- Run available typecheck, lint, and tests after structural changes.
- For template work, document architecture rules in project docs or `AGENTS.md`.

## Advanced References

- `references/feature-architecture.md`: Use for scalable feature/module boundary decisions.
- `references/nextjs-rsc.md`: Use for Next.js, React Server Components, Server Actions, and server/client separation.
```

- [ ] **Step 2: Write `references/feature-architecture.md`**

Include these sections:

```markdown
# Feature Architecture

Use feature-first boundaries when the app has multiple product domains or workflows.

## Boundary Rules

- A feature owns its routes, feature components, hooks, local services, test fixtures, and domain-specific UI composition.
- Shared UI must not import from features.
- Shared hooks must not encode product policy.
- Cross-feature communication should happen through route state, explicit services, API/cache state, or deliberately named shared domain modules.

## Recommended Shape

```text
src/
  app/
  features/
    feature-name/
      components/
      hooks/
      services/
      tests/
      types.ts
      index.ts
  shared/
    ui/
    hooks/
    lib/
    config/
```

## Boundary Checks

- Can this feature be deleted without rewriting unrelated features?
- Can shared code be reused in a different product context?
- Can a test exercise the feature without rendering the whole app?
```

- [ ] **Step 3: Write `references/nextjs-rsc.md`**

Include these sections:

```markdown
# Next.js, RSC, and Server Boundaries

Use this reference only when a React app uses Next.js, React Server Components, Server Actions, or server-rendered routes.

## Rules

- Treat server components as data-loading and composition boundaries.
- Keep browser-only state, effects, and event handlers in client components.
- Keep secrets, database access, filesystem access, and privileged API calls on the server.
- Pass serialized data across the server/client boundary.
- Prefer small client islands over converting entire routes to client components.

## Server Actions

- Use server actions for mutations that naturally belong to the route or form.
- Validate inputs on the server.
- Return typed success/error states that the client can render.
- Avoid hiding complex business workflows inside anonymous inline actions.

## Verification

- Check for accidental secret exposure in client bundles.
- Check hydration warnings and client/server import violations.
- Run framework typecheck and build commands.
```

- [ ] **Step 4: Validate the skill**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-frontend-architecture
```

Expected: Validation exits successfully.

## Task 3: Create `react-code-review`

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-code-review/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-code-review/references/review-checklist.md`
- Create: `/Users/kdudz/.codex/skills/react-code-review/references/react-antipatterns.md`

- [ ] **Step 1: Write `SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-code-review
description: Use when reviewing React pull requests, diffs, components, hooks, TypeScript changes, rendering behavior, architecture drift, accessibility regressions, or test gaps
---
```

The body must require findings-first review, sorted by severity, with file/line references when reviewing local files. It must inspect rendering behavior, hook dependencies, TypeScript soundness, state ownership, async effects, accessibility semantics, tests, and architecture fit. It must say summaries are secondary and should be brief.

Also incorporate review concerns inspired by `vercel-react-best-practices`, `openai/frontend-skill`, and `react-specialist`: performance impact, maintainability, boundary drift, UI correctness, and scalable React patterns.

- [ ] **Step 2: Write `references/review-checklist.md`**

Include checklist sections for correctness, rendering, hooks, TypeScript, accessibility, tests, maintainability, and scalability.

- [ ] **Step 3: Write `references/react-antipatterns.md`**

Include concrete anti-patterns:

- Derived state stored unnecessarily.
- Effects used for pure computation.
- Missing dependencies hidden with lint disables.
- Unstable object/function props causing child rerenders.
- Giant components mixing data, layout, forms, and side effects.
- `any` or unsafe casts crossing API boundaries.
- Components that render buttons/links without accessible names.

- [ ] **Step 4: Validate the skill**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-code-review
```

Expected: Validation exits successfully.

## Task 4: Create `react-testing-strategy`

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-testing-strategy/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-testing-strategy/references/browser-testing.md`
- Create: `/Users/kdudz/.codex/skills/react-testing-strategy/references/accessibility-testing.md`
- Create: `/Users/kdudz/.codex/skills/react-testing-strategy/references/visual-validation.md`

- [ ] **Step 1: Write `SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-testing-strategy
description: Use when planning, writing, generating, or reviewing React tests including unit tests, integration tests, component tests, browser tests, end-to-end tests, visual validation, or accessibility checks
---
```

The body must choose the smallest useful test level, require behavior-focused tests, prefer user-visible assertions, and define when to use unit, integration, component, browser, e2e, visual, and accessibility tests.

Also incorporate browser workflow guidance inspired by `anthropics/webapp-testing` and `openai/playwright-interactive`: start or locate the dev server, inspect the live app, gather console/network evidence, use stable selectors, capture screenshots when visual behavior matters, and iterate from observed browser state.

- [ ] **Step 2: Write `references/browser-testing.md`**

Cover Playwright-style browser verification for routing, layout, forms, keyboard navigation, network states, and responsive behavior.

- [ ] **Step 3: Write `references/accessibility-testing.md`**

Cover semantic HTML, accessible names, focus management, keyboard operation, color contrast, reduced motion, axe-style scans, and manual screen-reader-minded checks.

- [ ] **Step 4: Write `references/visual-validation.md`**

Cover screenshots, viewport matrix, design comparison, layout stability, overflow checks, and avoiding reliance on snapshots alone.

- [ ] **Step 5: Validate the skill**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-testing-strategy
```

Expected: Validation exits successfully.

## Task 5: Create `react-refactoring`

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-refactoring/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-refactoring/references/component-splitting.md`
- Create: `/Users/kdudz/.codex/skills/react-refactoring/references/hook-extraction.md`

- [ ] **Step 1: Write `SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-refactoring
description: Use when refactoring React code, splitting large components, extracting hooks, modularizing logic, reducing duplication, improving state boundaries, or preserving behavior while changing structure
---
```

The body must require characterization checks before risky refactors, small behavior-preserving steps, no unrelated rewrites, and verification after each meaningful change.

- [ ] **Step 2: Write `references/component-splitting.md`**

Cover splitting by responsibility: data loading, state orchestration, presentational layout, form behavior, list rendering, dialogs, and reusable primitives.

- [ ] **Step 3: Write `references/hook-extraction.md`**

Cover extraction rules: hooks own reusable stateful behavior, must not hide feature policy accidentally, must expose stable APIs, and must be tested through behavior.

- [ ] **Step 4: Validate the skill**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-refactoring
```

Expected: Validation exits successfully.

## Task 6: Create `react-performance`

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-performance/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-performance/references/profiling.md`
- Create: `/Users/kdudz/.codex/skills/react-performance/references/core-web-vitals.md`
- Create: `/Users/kdudz/.codex/skills/react-performance/references/bundle-optimization.md`

- [ ] **Step 1: Write `SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-performance
description: Use when improving React rendering performance, bundle size, lazy loading, memoization, data-fetching waterfalls, Core Web Vitals, profiling results, or performance budgets
---
```

The body must require measuring first, identifying bottleneck class, avoiding premature memoization, fixing data waterfalls and excessive rendering deliberately, and verifying with relevant tools.

Also incorporate performance categories inspired by `vercel-react-best-practices` and `cloudflare/web-perf`: impact severity, render-blocking resources, network dependency chains, image and font loading, cache behavior, hydration costs, layout shifts, and Core Web Vitals.

- [ ] **Step 2: Write `references/profiling.md`**

Cover React DevTools Profiler, browser performance traces, render counts, long tasks, network waterfalls, and before/after evidence.

- [ ] **Step 3: Write `references/core-web-vitals.md`**

Cover LCP, CLS, INP, asset loading, critical rendering path, hydration costs, and browser verification.

- [ ] **Step 4: Write `references/bundle-optimization.md`**

Cover dependency review, code splitting, lazy routes, tree-shaking, dynamic imports, and bundle analyzer checks.

- [ ] **Step 5: Validate the skill**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-performance
```

Expected: Validation exits successfully.

## Task 7: Create Full-Stack, Auth, and Data Skills

**Files:**
- Create: `/Users/kdudz/.codex/skills/react-fullstack-integration/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-fullstack-integration/references/rest-contracts.md`
- Create: `/Users/kdudz/.codex/skills/react-fullstack-integration/references/graphql-contracts.md`
- Create: `/Users/kdudz/.codex/skills/react-fullstack-integration/references/nextjs-server-actions.md`
- Create: `/Users/kdudz/.codex/skills/react-fullstack-integration/references/backend-interop.md`
- Create: `/Users/kdudz/.codex/skills/react-auth-architecture/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-auth-architecture/references/oauth-oidc.md`
- Create: `/Users/kdudz/.codex/skills/react-auth-architecture/references/better-auth.md`
- Create: `/Users/kdudz/.codex/skills/react-auth-architecture/references/authorization-patterns.md`
- Create: `/Users/kdudz/.codex/skills/react-data-database-integration/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-data-database-integration/references/query-cache-patterns.md`
- Create: `/Users/kdudz/.codex/skills/react-data-database-integration/references/schema-driven-types.md`
- Create: `/Users/kdudz/.codex/skills/react-data-database-integration/references/optimistic-updates.md`

- [ ] **Step 1: Write `react-fullstack-integration/SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-fullstack-integration
description: Use when connecting React to backend systems, REST APIs, GraphQL APIs, RPC APIs, Next.js APIs, Server Actions, React Server Components, Node.js, Python, .NET, validation, caching, or error contracts
---
```

The body must keep frontend/backend responsibilities explicit, define contract ownership, normalize error/loading states, keep secrets server-side, and avoid locking React templates to one backend language.

Also incorporate GraphQL/Apollo guidance inspired by `apollographql/apollo-client`: generated operation types, cache policies, query/mutation ownership, local state, error handling, Suspense where appropriate, and React Server Components compatibility when the framework supports it.

- [ ] **Step 2: Write full-stack references**

Create:

- `rest-contracts.md`: request/response schemas, validation, error envelopes, pagination, retries, idempotency.
- `graphql-contracts.md`: query/mutation ownership, generated types, cache policy, partial errors, fragment boundaries.
- `nextjs-server-actions.md`: server action use cases, validation, serialization, progressive enhancement, RSC boundaries.
- `backend-interop.md`: Node.js, Python, and .NET API integration concerns, CORS, auth handoff, versioning, and environment config.

- [ ] **Step 3: Write `react-auth-architecture/SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-auth-architecture
description: Use when implementing or reviewing React authentication, authorization, sessions, route guards, token handling, refresh flows, RBAC, ABAC, OAuth, OIDC, better-auth, or protected API access
---
```

The body must separate authentication from authorization, prohibit unsafe token storage assumptions, identify which checks belong on the backend, cover loading/expiry/failure states, and require route/API protection verification.

Also incorporate Better Auth guidance inspired by `better-auth/create-auth` and `better-auth/best-practices`: scan the stack before recommending setup, configure server/client boundaries, choose adapter/session/cookie settings deliberately, run migrations when required, use environment variables safely, and verify origin/CSRF/rate-limit concerns.

- [ ] **Step 4: Write auth references**

Create:

- `oauth-oidc.md`: OAuth/OIDC roles, PKCE, redirect flows, token exchange, logout, and callback handling.
- `better-auth.md`: better-auth integration checkpoints, client/server boundaries, session reads, route protection.
- `authorization-patterns.md`: RBAC, ABAC, feature flags, permissions, backend enforcement, UI affordances.

- [ ] **Step 5: Write `react-data-database-integration/SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-data-database-integration
description: Use when designing React data flows, database-facing API contracts, schema-driven types, query caches, mutations, optimistic updates, pagination, forms, migrations awareness, or consistency behavior
---
```

The body must keep React decoupled from database internals, prefer schema-driven types where practical, define query/mutation ownership, account for cache invalidation, and respect consistency and migration constraints.

- [ ] **Step 6: Write data/database references**

Create:

- `query-cache-patterns.md`: query keys, invalidation, stale time, loading states, mutations, retries.
- `schema-driven-types.md`: OpenAPI, GraphQL codegen, Zod, shared packages, versioning, and type drift checks.
- `optimistic-updates.md`: optimistic mutation lifecycle, rollback, conflict handling, pending UI, offline-aware caveats.

- [ ] **Step 7: Validate the three skills**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-fullstack-integration
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-auth-architecture
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-data-database-integration
```

Expected: All validations exit successfully.

## Task 8: Create Design-to-Code and Documentation/DevOps Skills

**Files:**
- Create: `/Users/kdudz/.codex/skills/design-to-react-implementation/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/design-to-react-implementation/references/figma-to-code.md`
- Create: `/Users/kdudz/.codex/skills/design-to-react-implementation/references/shadcn-ui.md`
- Create: `/Users/kdudz/.codex/skills/design-to-react-implementation/references/accessibility-semantics.md`
- Create: `/Users/kdudz/.codex/skills/react-template-documentation-devops/SKILL.md`
- Create: `/Users/kdudz/.codex/skills/react-template-documentation-devops/references/github-actions.md`
- Create: `/Users/kdudz/.codex/skills/react-template-documentation-devops/references/template-documentation.md`
- Create: `/Users/kdudz/.codex/skills/react-template-documentation-devops/references/adr-guidance.md`

- [ ] **Step 1: Write `design-to-react-implementation/SKILL.md`**

Use this frontmatter:

```yaml
---
name: design-to-react-implementation
description: Use when converting UI designs, Figma files, design tokens, component specs, shadcn/ui patterns, responsive layouts, accessibility semantics, interaction states, or visual QA into React implementation
---
```

The body must inspect the design system first, map tokens, build accessible components, cover responsive behavior, include interaction states, and verify visually in browser when practical.

Also incorporate design-to-code guidance inspired by `anthropics/frontend-design`, `google-labs-code/react-components`, `google-labs-code/shadcn-ui`, `openai/frontend-skill`, `openai/playwright-interactive`, and `figma/figma-implement-design`: inspect design context, map tokens and components, prefer existing UI primitives, implement responsive states, compare screenshots, and refine until browser output matches intent.

- [ ] **Step 2: Write design references**

Create:

- `figma-to-code.md`: design inspection, frame hierarchy, tokens, component variants, constraints, responsive behavior, asset export.
- `shadcn-ui.md`: using shadcn/ui as primitives, composition, theming, accessibility, avoiding unnecessary wrappers.
- `accessibility-semantics.md`: semantic elements, labels, focus order, landmarks, dialogs, menus, forms, keyboard operation.

- [ ] **Step 3: Write `react-template-documentation-devops/SKILL.md`**

Use this frontmatter:

```yaml
---
name: react-template-documentation-devops
description: Use when creating or maintaining React template documentation, onboarding docs, ADRs, README files, Git workflow, GitHub Actions, CI checks, release hygiene, or contribution guidance
---
```

The body must produce useful setup docs, architecture notes, testing commands, CI expectations, contribution flow, and ADRs when decisions need durable context.

- [ ] **Step 4: Write documentation/devops references**

Create:

- `github-actions.md`: CI jobs for install, typecheck, lint, unit tests, build, Playwright tests, caching, artifacts.
- `template-documentation.md`: README structure, quickstart, scripts, environment variables, testing, architecture, troubleshooting.
- `adr-guidance.md`: when to write ADRs, decision format, status, context, options, consequences.

- [ ] **Step 5: Validate the two skills**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/design-to-react-implementation
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-template-documentation-devops
```

Expected: Both validations exit successfully.

## Task 9: Validate Global Skill Discovery

**Files:**
- Read: `/Users/kdudz/.codex/skills/*/SKILL.md`

- [ ] **Step 1: List new skills**

Run:

```bash
find /Users/kdudz/.codex/skills -maxdepth 2 -name SKILL.md -print | sort
```

Expected: Output includes the 10 new `SKILL.md` files.

- [ ] **Step 2: Check frontmatter names**

Run:

```bash
rg -n "^name: (react-frontend-architecture|react-code-review|react-testing-strategy|react-refactoring|react-performance|react-fullstack-integration|react-auth-architecture|react-data-database-integration|design-to-react-implementation|react-template-documentation-devops)$" /Users/kdudz/.codex/skills/*/SKILL.md
```

Expected: 10 matching lines.

- [ ] **Step 3: Check trigger descriptions**

Run:

```bash
rg -n "^description: Use when" /Users/kdudz/.codex/skills/*/SKILL.md
```

Expected: Each of the 10 new skills has one matching description line.

- [ ] **Step 4: Check reference links**

Run:

```bash
find /Users/kdudz/.codex/skills -path '*/references/*.md' -print | sort
```

Expected: Output includes every reference file listed in Tasks 2 through 8.

## Task 10: Update Repository Documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update `README.md`**

Replace its current one-line contents with:

```markdown
# React Project Template

This repository tracks the design and planning work for a reusable React project template.

## Superpowers Documents

- Design spec: `docs/superpowers/specs/2026-05-12-react-global-skills-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-12-react-global-skills-implementation.md`

## Current Status

The first milestone is creating a global Codex skill suite under `~/.codex/skills` for React architecture, review, testing, refactoring, performance, full-stack integration, auth, data/database integration, design-to-code, and documentation/devops.
```

- [ ] **Step 2: Verify docs**

Run:

```bash
git diff -- README.md docs/superpowers/plans/2026-05-12-react-global-skills-implementation.md
```

Expected: Diff shows the README update and this implementation plan.

- [ ] **Step 3: Commit docs**

Run:

```bash
git add README.md docs/superpowers/plans/2026-05-12-react-global-skills-implementation.md
git commit -m "Document React global skills implementation plan"
```

Expected: One commit containing the README update and plan if Task 1 did not already commit the plan. If Task 1 already committed the plan, this commit should contain only README changes.

## Task 11: Final Verification and Push

**Files:**
- Read: Git status and validation output

- [ ] **Step 1: Run all skill validations**

Run:

```bash
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-frontend-architecture
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-code-review
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-testing-strategy
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-refactoring
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-performance
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-fullstack-integration
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-auth-architecture
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-data-database-integration
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/design-to-react-implementation
python /Users/kdudz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kdudz/.codex/skills/react-template-documentation-devops
```

Expected: All validations exit successfully.

- [ ] **Step 2: Run repository checks**

Run:

```bash
git diff --check
git status --short --branch
```

Expected: No whitespace errors. Branch is clean except for intentionally untracked user files such as `AGENTS.md`.

- [ ] **Step 3: Push repository documentation commits**

Run:

```bash
git push origin main
```

Expected: GitHub `main` receives the plan/documentation commits.

## Self-Review Notes

- Spec coverage: All 10 approved global skills are represented by creation and validation tasks.
- Scope: The plan keeps skills global and keeps React-general guidance as the default.
- Advanced knowledge: Each broad skill has reference files for narrower architect-level guidance.
- No implementation of the React project template is included here; that will happen after the global skill suite exists.
