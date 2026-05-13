# React Monorepo Template Design

Date: 2026-05-13

## Purpose

Create a production-grade React monorepo template that can become the foundation for frontend applications, fullstack products, modular frontend architectures, optional backend services, microservices, dashboards, admin panels, public apps, and APIs.

The template must feel like a practical enterprise starter kit: opinionated enough to prevent architectural drift, but not so large that new teams inherit unused ceremony.

## Approved Scope

Build a multi-profile starter architecture, with the first working profile implemented as:

- Vite React frontend applications.
- Optional Fastify TypeScript API service.
- pnpm workspaces.
- Turborepo orchestration.
- Material UI design system.
- Dashboard and users feature example.
- Shared package strategy for UI, contracts, API client, state, testing, config, types, and utilities.
- Documentation, CI, Docker, and extensibility guidance.

Do not create fake placeholder services such as billing, notifications, or user service in the first implementation. Document how to add them later.

## User-Approved Decisions

### Template Profile

Use a multi-profile starter, but implement the first profile only.

The first profile is a Vite SPA-oriented setup with an optional Fastify service. This keeps the first implementation runnable, testable, and realistic while leaving clear extension paths for Next.js, microfrontends, additional services, and external backends.

### Monorepo Tooling

Use pnpm workspaces with Turborepo.

This gives clear workspace boundaries, task orchestration, cacheable scripts, and approachable configuration without the extra ceremony of Nx.

### First Example Feature

Use an auth-ready dashboard shell with a users feature backed by a mock API.

The users feature must demonstrate routing, feature-first architecture, typed API access, validation, query caching, form handling, shared UI usage, feature-owned UI, and tests.

### Architecture Approach

Use a practical enterprise seed:

- Create real runnable apps and service.
- Create shared packages with useful examples.
- Include docs, CI, Docker, and conventions.
- Avoid broad empty folders that imply completed capabilities.

### Design System

Use Material UI, not TailwindCSS, shadcn/ui, or Radix UI as the default design-system base.

Material UI is a strong fit for enterprise dashboards and admin tools. The template should still support product-specific customization through theme tokens and package-owned components.

### Testing Stack

Use Vitest and React Testing Library for unit and component tests.

Use Cypress for integration and end-to-end browser tests.

This intentionally differs from the original Jest suggestion because the approved Vite stack fits Vitest better and reduces setup friction.

## Target Repository Structure

```text
apps/
  web/
  admin/

services/
  api-gateway/

packages/
  design-system/
  ui/
  api-client/
  auth/
  state/
  testing/
  config/
  eslint-config/
  tsconfig/
  types/
  utils/

infrastructure/
  docker/

configs/
  environments/
  ci/

docs/
  architecture/
  adr/
  guides/
  onboarding/
  superpowers/

.github/
  workflows/
```

## Monorepo Boundary Rules

- `apps/*` compose product experiences and own route-level behavior.
- `services/*` own backend runtime behavior, secrets, persistence boundaries, and service-specific validation.
- `packages/*` expose reusable contracts, UI, config, state helpers, test utilities, and low-policy primitives.
- Shared packages must not import apps or services.
- Sibling features must not import each other's internal files.
- Feature modules expose only intentional public entry points.
- Shared UI must stay free of product workflows, auth policy, analytics meaning, route assumptions, and API calls.
- Features stay inside apps until repeated stable reuse justifies a shared package.

## Frontend Architecture

Use Vite, React, TypeScript, React Router, TanStack Query, Zustand, React Hook Form, Zod, and Material UI.

Each app should use this shape:

```text
src/
  app/
    providers/
    routing/
    layouts/
    config/
    error-boundary/
  features/
    users/
      api/
      components/
      hooks/
      routes/
      schemas/
      state/
      tests/
      types/
      index.ts
  shared/
    hooks/
    lib/
    ui/
  main.tsx
```

### Feature-First Rules

- Features are organized by product capability, not file type.
- Route modules own URL composition, page assembly, navigation metadata, and route-level error states.
- Feature API modules own feature repositories and query key factories.
- Feature hooks coordinate feature behavior but must stay focused on one concern.
- Feature components render feature-specific UI and may use shared UI primitives.
- Feature schemas validate forms and DTO boundaries.
- Feature tests live near the behavior they protect.

### State Rules

- Use React state for local UI state.
- Use TanStack Query for server cache, loading, retries, and invalidation.
- Use Zustand only for cross-feature client state such as theme mode, app shell state, or session shell state.
- Use React Hook Form for form state.
- Avoid Redux in the initial template.
- Avoid global state for data that belongs to one route or one feature.

## Design System Architecture

Use Material UI with Emotion.

Core dependencies:

- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

Package shape:

```text
packages/design-system/
  src/
    tokens/
    themes/
      lightTheme.ts
      darkTheme.ts
      createAppTheme.ts
    foundations/
    atoms/
    molecules/
    organisms/
    templates/
    utilities/
    index.ts

packages/ui/
  src/
    primitives/
    feedback/
    forms/
    layout/
    data-display/
    navigation/
    index.ts
```

### Design System Rules

- `design-system` owns tokens, theme creation, MUI theme augmentation, brand decisions, typography scale, spacing, color, radii, shadows, breakpoints, z-index, and motion values.
- `ui` owns reusable React components built on MUI when a wrapper adds real project value.
- Direct MUI usage is allowed inside apps for simple one-off composition.
- Shared components must be accessible by default.
- Shared components must expose small, clear APIs.
- Styling must flow through theme tokens and MUI theme conventions.
- Business logic stays inside feature folders.
- Storybook documents shared UI and design-system usage.

### Initial Shared UI Examples

- `AppButton`
- `AppTextField`
- `FormField`
- `StatusBadge`
- `AppShell`
- `PageHeader`
- `UsersTable`
- `ThemeModeProvider`

## Backend and API Architecture

Create `services/api-gateway` with Fastify and TypeScript.

The first service exists to prove the backend boundary, validation strategy, error envelope, typed contracts, environment config, Docker flow, and CI behavior.

Endpoints:

```text
GET /health
GET /api/users
GET /api/users/:id
POST /api/users
PATCH /api/users/:id
DELETE /api/users/:id
```

### Contracts

Use Zod schemas for request, response, and DTO validation. Shared contract types should live in a package that can be consumed by apps and services without creating runtime coupling.

Use a stable error envelope:

```ts
type ApiErrorEnvelope = {
  error: {
    code: "validation_failed" | "not_found" | "server_error";
    message: string;
    fields?: Record<string, string>;
    requestId: string;
  };
};
```

### API Client

`packages/api-client` owns:

- fetch transport
- base URL configuration
- abort/cancellation support
- typed errors
- response parsing
- DTO mapping
- repository helpers used by features

Features must not call raw `fetch` from leaf components.

## Testing Strategy

Use the smallest test level that proves the behavior.

### Test Layers

- Unit tests: pure utilities, schemas, reducers, query key factories, DTO mappers.
- Component tests: shared UI components and feature components using React Testing Library.
- Integration tests: feature flows with providers, routing, query client, and mocked API boundaries.
- Service tests: Fastify route behavior through `inject`.
- End-to-end tests: Cypress for key browser flows.

### Shared Testing Package

`packages/testing` should provide:

- React test render helpers.
- Query client test provider.
- Router test helpers.
- API fixture builders.
- Accessibility-oriented query guidance.

## CI/CD Design

GitHub Actions must prove a clean checkout can install, lint, typecheck, test, build, and run browser checks.

Required commands:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

CI jobs:

- install with pnpm lockfile enforcement
- lint
- typecheck
- unit/component/service tests
- production build
- Cypress tests
- artifact upload for Cypress failures

Cache the pnpm store, not `node_modules`.

## Docker and Infrastructure

Include practical local Docker support:

- multi-stage Dockerfile for `apps/web`
- multi-stage Dockerfile for `services/api-gateway`
- Docker Compose for local app + API service
- `.env.example` files for apps and service
- docs for environment variable handling

Kubernetes and Terraform should be documented as extension paths, not created as large placeholder trees in the first implementation.

## Security Guidance

The template must document and demonstrate:

- typed environment variables
- secret handling rules
- no secrets committed to source
- frontend/backend auth responsibility split
- RBAC-ready feature and route patterns
- XSS prevention basics
- CSRF considerations for cookie-based auth
- CSP guidance
- API error handling that avoids leaking stack traces
- dependency update and audit guidance

`packages/auth` should provide architecture-ready client-side helpers and types, but not a complete production auth provider in the first iteration.

## Documentation Deliverables

Create or update:

```text
README.md
docs/architecture/overview.md
docs/architecture/folder-structure.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/design-system.md
docs/architecture/state-management.md
docs/architecture/testing.md
docs/architecture/security.md
docs/guides/create-feature.md
docs/guides/create-service.md
docs/onboarding/getting-started.md
docs/adr/0001-monorepo-tooling.md
docs/adr/0002-frontend-stack.md
docs/adr/0003-design-system-material-ui.md
```

Docs must distinguish template-user guidance from template-maintainer guidance.

## Developer Experience

Include:

- ESLint shared config.
- Prettier.
- Husky.
- lint-staged.
- Commitlint.
- Conventional commits.
- VSCode settings.
- path aliases.
- typed environment variables.
- hot reload.
- generator or scaffolding scripts for features and services.

Generators should be simple scripts in the first implementation. They should create predictable folders and files without inventing a custom framework.

## First Working User Flow

The first working browser flow should:

1. Start web app and API service.
2. Render dashboard shell.
3. Navigate to users feature.
4. Fetch users from Fastify service through `packages/api-client`.
5. Render users in a table.
6. Open create/edit form.
7. Validate with Zod and React Hook Form.
8. Mutate through API client.
9. Invalidate TanStack Query cache.
10. Show loading, empty, validation, success, and error states.

## Acceptance Criteria

- Template installs from a clean checkout with pnpm.
- `apps/web`, `apps/admin`, and `services/api-gateway` run locally.
- Shared package imports work through workspace aliases.
- Users feature demonstrates feature-first structure and clean public API.
- Material UI theme supports light and dark mode.
- API client handles typed success and error responses.
- Fastify service validates input and returns stable error envelopes.
- Unit/component/service tests pass.
- Cypress covers the users flow.
- CI runs lint, typecheck, tests, build, and Cypress.
- Docker Compose can run app and API locally.
- Documentation explains architecture, setup, feature creation, service creation, state management, testing, security, CI, Docker, and extension paths.
- Each implementation step should be small enough for a focused commit.

## Out of Scope for First Implementation

- Production authentication provider.
- Real database persistence.
- Billing, notification, and user microservices.
- Kubernetes manifests.
- Terraform modules.
- Mobile app.
- Next.js app.
- Microfrontend runtime federation.
- Full OpenAPI generation pipeline.

These can be added through future approved specs and plans.

## Pause and Resume Notes

- Approved profile: multi-profile starter, first profile only.
- Approved tooling: pnpm workspaces and Turborepo.
- Approved approach: practical enterprise seed.
- Approved first feature: dashboard shell and users mock API.
- Approved frontend: Vite React, TypeScript, React Router, TanStack Query, Zustand, React Hook Form, Zod.
- Approved design system: Material UI with Emotion.
- Approved backend: Fastify TypeScript API gateway.
- Approved tests: Vitest, React Testing Library, Cypress.
- Next step after this spec is approved: write implementation plan in `docs/superpowers/plans/`.
