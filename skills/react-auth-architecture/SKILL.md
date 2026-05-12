---
name: react-auth-architecture
description: Use when implementing or reviewing React authentication, authorization, sessions, route guards, token handling, refresh flows, RBAC, ABAC, OAuth, OIDC, better-auth, or protected API access
---

# React Auth Architecture

## Use When

- Implementing or reviewing React authentication, authorization, sessions, route guards, token handling, or refresh flows.
- Designing RBAC, ABAC, OAuth, OIDC, Better Auth, or protected API access.
- Checking auth behavior across frontend routes, server routes, APIs, cookies, sessions, and providers.

## Core Workflow

1. Scan the stack first: router, framework, rendering model, API layer, backend auth library, deployment domains, and existing session storage.
2. Separate authentication from authorization. Authentication identifies the actor; authorization decides what that actor may do.
3. Keep protected API and server-rendered data enforcement on the backend.
4. Never assume browser token storage is safe by default; review XSS, CSRF, origin rules, cookie flags, refresh handling, and session expiry.
5. Define loading, unauthenticated, expired, refresh-failed, forbidden, and network-failed states.
6. Verify protected routes and protected APIs independently. A route guard is not API protection.
7. For Better Auth, confirm server/client setup, route handlers, adapters, migrations, sessions, cookies, env vars, plugins, hooks, origin, CSRF, and rate-limit settings.

## Inspect First

- Router, framework, rendering model, API layer, backend auth library, session storage, cookies, environment variables, and deployment domains.
- Route guards, server middleware, API protection, provider callbacks, refresh/logout flows, and permission checks.
- Existing tests for unauthenticated, forbidden, expired, and failure states.

## Common Mistakes

- Mixing login state, feature permissions, and billing eligibility in one boolean.
- Trusting decoded JWT claims in React for privileged decisions.
- Hiding navigation but leaving the API callable.
- Missing expiry, refresh failure, logout, and multi-tab session behavior.
- Assuming a library default matches the app's deployment origin and cookie model.

## Verification

- Run available typecheck, lint, build, and auth-related tests.
- Verify protected UI routes and protected API/server paths separately.
- Exercise unauthenticated, authenticated, expired, refresh-failed, forbidden, logout, and multi-tab/session-change states where relevant.
- Check server-side enforcement, cookie/session settings, origin/CSRF handling, and rate-limit behavior for the selected auth stack.
- If a provider, deployment origin, or backend check cannot run locally, state what remains unverified.

## Advanced References

- OAuth and OIDC: `references/oauth-oidc.md`
- Better Auth: `references/better-auth.md`
- Authorization patterns: `references/authorization-patterns.md`
