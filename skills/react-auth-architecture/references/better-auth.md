# Better Auth

## Integration Checkpoints

- Scan the existing stack before adding files: framework, route handlers, server runtime, database, ORM, cookies, domains, and client routing.
- Create the server auth instance in server-only code.
- Expose the required auth route handler for the framework.
- Create the client helper only for browser-safe session reads and auth actions.
- Keep provider secrets, database credentials, and trusted callbacks server-side.

## Server and Client Boundaries

- Server code owns auth configuration, providers, adapters, database access, trusted hooks, and session verification.
- Client code can start sign-in, sign-out, read safe session data, and render loading or unauthenticated states.
- Do not import server auth configuration into client bundles.
- Protect server loaders, route handlers, API endpoints, and Server Actions with server-side session checks.

## Adapters and Migrations

- Confirm the adapter matches the database and ORM in the app.
- Generate and run migrations before relying on auth tables.
- Review generated schema changes for user, account, session, verification, organization, or plugin tables.
- Plan migrations for existing users and account linking before enabling production sign-in.

## Sessions and Cookies

- Verify session expiry, refresh/update behavior, revocation, and multi-device expectations.
- Use secure cookie settings appropriate for the deployment: `HttpOnly`, `Secure`, `SameSite`, path, domain, and max age.
- Confirm cross-subdomain and cross-origin behavior before deploying.

## Environment and Security

- Define required env vars for auth secret, base URL, trusted origins, provider credentials, and database access.
- Configure trusted origins and callback URLs for each environment.
- Review CSRF protections, origin checks, and rate limits for auth endpoints.
- Enable only needed plugins and review their hooks, schema additions, and permission implications.
- Normalize auth failures without leaking provider or database internals.
