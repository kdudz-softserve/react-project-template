# Backend Interop

## Language-Neutral Contracts

React should integrate through stable contracts, not through assumptions about backend frameworks. Node.js, Python, .NET, Java, Go, and other services can all expose REST, GraphQL, RPC, SSE, WebSocket, or event-backed APIs.

## Node.js

- Watch for shared package drift between frontend and backend workspaces.
- Keep server-only code out of browser bundles.
- Use framework route handlers or API routes for secret-bearing calls and auth handoff.

## Python

- Generate clients from OpenAPI when using FastAPI, Django REST Framework, Flask extensions, or similar tooling.
- Normalize snake_case and camelCase at one boundary instead of scattering conversions across components.
- Treat background jobs, celery tasks, and async processing as explicit pending states in the UI.

## .NET

- Prefer OpenAPI or typed generated clients from ASP.NET endpoints.
- Align enum casing, nullable fields, date serialization, and problem-details responses.
- Confirm cookie, CORS, and CSRF defaults when React is served from a different origin.

## Cross-Cutting Concerns

- Configure CORS with explicit origins, methods, headers, and credentials settings.
- Decide whether auth handoff uses cookies, bearer tokens, backend-for-frontend sessions, or framework middleware.
- Keep environment config split by build-time public values and runtime server secrets.
- Include API versioning and deprecation policy for shared clients.
- Log request IDs and expose safe correlation IDs to the UI for support.
