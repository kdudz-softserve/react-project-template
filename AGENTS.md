# POC-RA Agent Instructions

## Superpowers Check — Do This First

Before starting any work, check whether the Superpowers plugin is installed in your
current agent environment.

Superpowers is installed if you have access to skills such as `using-superpowers`,
`brainstorming`, `writing-plans`, or `systematic-debugging`.

If Superpowers is NOT installed, ask the user:

> "Superpowers is not installed. It provides structured workflows for brainstorming,
> planning, TDD, debugging, and code review. Would you like to install it?"

If the user says yes, provide the install command for their agent:

| Agent | Install command |
|---|---|
| Claude Code | `/plugin install superpowers@claude-plugins-official` |
| Codex CLI | Run `/plugins`, search "superpowers", select Install |
| GitHub Copilot CLI | `copilot plugin install superpowers@superpowers-marketplace` |
| Cursor | `/add-plugin superpowers` in Agent chat |
| Gemini CLI | `gemini extensions install https://github.com/obra/superpowers` |
| Factory Droid | `droid plugin marketplace add https://github.com/obra/superpowers` then `droid plugin install superpowers@superpowers` |

After installation, use Superpowers workflows throughout this project:

- `brainstorming` — shape unclear feature ideas before implementation.
- `writing-plans` — turn approved designs into implementation plans.
- `test-driven-development` — for code changes where tests are practical.
- `systematic-debugging` — investigate bugs or failing tests.
- `requesting-code-review` and `receiving-code-review` — for review loops.
- `verification-before-completion` — before claiming work is done.

Project plans go in `docs/superpowers/plans/`. Design specs go in `docs/superpowers/specs/`.

---

## Git and PR Workflow

Do not create implementation, planning, or documentation commits directly on `main`.

Before making a commit:

1. Create or switch to a focused feature branch.
2. Keep each branch scoped to one small reviewable unit of work.
3. Make small commits that match the current approved step.
4. Leave `main` as the integration branch for PRs.

When work is ready, describe the branch and commits so the user can create a PR.

---

## React Skills

This project includes a React skill suite under `skills/`. Read `skills/<name>/SKILL.md`
before starting any matching task. Check `skills/<name>/references/` for deeper guidance.

- `react-frontend-architecture` — app structure, feature boundaries, component ownership,
  state placement, hooks patterns, server/client separation, and scalability conventions.
- `react-code-review` — reviewing diffs, PRs, components, hooks, rendering risks,
  TypeScript quality, accessibility regressions, and test gaps.
- `react-testing-strategy` — unit, integration, component, browser, e2e,
  visual validation, and accessibility testing decisions.
- `react-refactoring` — splitting large components, extracting hooks, modularizing logic,
  reducing duplication, and preserving behavior.
- `react-performance` — rendering performance, bundle size, lazy loading, memoization,
  data waterfalls, Core Web Vitals, and performance budgets.
- `react-fullstack-integration` — REST, GraphQL, RPC, Next.js APIs, Server Actions, RSC,
  backend interop, validation, caching, and error contracts.
- `react-auth-architecture` — authentication, authorization, sessions, route guards,
  token handling, RBAC/ABAC, OAuth/OIDC, Better Auth, and protected API access.
- `react-data-database-integration` — data flows, database-facing API contracts,
  schema-driven types, query caches, mutations, optimistic updates, and pagination.
- `design-to-react-implementation` — converting Figma files, design tokens, shadcn/ui
  patterns, responsive layouts, accessibility semantics, and interaction states into React.
- `react-template-documentation-devops` — template documentation, ADRs, GitHub Actions,
  CI checks, contribution guidance, and release hygiene.
