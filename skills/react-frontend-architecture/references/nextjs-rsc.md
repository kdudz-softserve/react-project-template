# Next.js and React Server Components

## Server and Client Boundary Rules

- Treat Server Components as the default for data loading, route assembly, static content, and code that can run without browser APIs.
- Use Client Components for event handlers, browser APIs, local interactive state, refs, effects, imperative libraries, and context providers that rely on client state.
- Place `"use client"` at the narrowest stable boundary. Avoid marking route files or large feature roots as client code just to support one interactive child.
- Pass only serializable props from server to client boundaries. Do not pass functions, class instances, non-serializable stores, or request-scoped objects into Client Components.
- Keep server-only modules out of client import graphs. Watch for accidental imports of database clients, secrets, filesystem access, or server utilities through shared barrels.
- Keep browser-only modules out of Server Components. Dynamic import or isolate them behind a Client Component when needed.
- Prefer route-level composition that loads data on the server and hands minimal view models to interactive children.

## Server Actions Guidance

- Use Server Actions for mutations that benefit from colocated form handling or direct server execution in the App Router.
- Validate all action input on the server. Treat client-side validation as usability, not trust.
- Keep action return values serializable, small, and oriented to the caller's UI state.
- Pair mutations with explicit cache revalidation, redirects, optimistic UI strategy, or query invalidation so stale UI behavior is intentional.
- Keep authorization and tenant checks inside the action or the server-side domain function it calls.
- Do not hide broad product workflows inside generic shared actions. Let feature-owned actions call reusable server utilities.
- Prefer idempotent, named domain operations behind actions when the mutation is reused outside a single form.

## Verification

- Search for `"use client"` and confirm each boundary is necessary and narrow.
- Check client bundles for imports from server-only modules, secrets, database clients, or filesystem utilities.
- Confirm props crossing server-to-client boundaries are serializable.
- Verify mutations revalidate, redirect, or update affected UI intentionally.
- Confirm tests or integration coverage exercise server/client handoff for important routes.
- Run the project's typecheck, lint, and relevant Next.js build or route tests when available.
