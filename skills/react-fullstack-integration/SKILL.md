---
name: react-fullstack-integration
description: Use when connecting React to backend systems, REST APIs, GraphQL APIs, RPC APIs, Next.js APIs, Server Actions, React Server Components, Node.js, Python, .NET, validation, caching, or error contracts
---

# React Fullstack Integration

## Use When

- Connecting React to REST, GraphQL, RPC, Next.js APIs, Server Actions, RSC, Node.js, Python, .NET, or other backend systems.
- Designing API contracts, validation boundaries, caching, loading states, error states, or environment boundaries.
- Keeping a React template backend-agnostic while still supporting typed integration.

## Core Workflow

1. Inspect the frontend and backend boundary before choosing a client pattern.
2. Keep React responsible for presentation, interaction state, cache orchestration, and user-facing loading/error states.
3. Keep backend services responsible for persistence, secrets, authorization, validation, side effects, and canonical business rules.
4. Identify the contract owner: OpenAPI, GraphQL schema, RPC router, Server Action signature, or backend DTOs.
5. Generate or infer client types from that source where practical, then verify runtime validation still exists at the trust boundary.
6. Normalize loading, empty, partial, validation, auth, conflict, rate-limit, and unexpected failure states.
7. Avoid locking React templates to one backend language.

## Inspect First

- API schema, route handlers, backend DTOs, GraphQL operations, RPC routers, generated clients, and environment config.
- Query/mutation ownership, cache invalidation, retries, validation, auth handoff, CORS, and error envelopes.
- Whether server rendering, RSC, Server Actions, or client-only fetching are in play.

## Common Mistakes

- Hiding backend failures behind one generic toast.
- Fetching directly from many leaf components without clear query ownership.
- Duplicating backend validation only in React forms.
- Passing raw server exceptions, stack traces, or provider errors to the UI.
- Coupling UI state names to database table or ORM internals.

## Verification

- Run available typecheck, lint, build, and relevant unit or integration tests.
- Verify contract evidence: generated client types, schema/codegen output, API mock, contract test, or backend endpoint behavior.
- Exercise success, loading, empty, validation, auth, retry, conflict, and unexpected error states when the UI depends on them.
- If a backend, network, or framework check cannot run locally, state what remains unverified.

## Advanced References

- REST contracts: `references/rest-contracts.md`
- GraphQL and Apollo Client contracts: `references/graphql-contracts.md`
- Next.js Server Actions and RSC: `references/nextjs-server-actions.md`
- Backend interop: `references/backend-interop.md`
