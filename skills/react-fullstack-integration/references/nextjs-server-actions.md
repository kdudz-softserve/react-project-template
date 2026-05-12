# Next.js Server Actions

## Good Use Cases

- Form submissions that map to a single server-side mutation.
- Progressive enhancement where the form should still submit without client JavaScript.
- Small authenticated mutations close to the route that owns them.
- Operations that need server-only secrets, database access, or privileged SDKs.

## Boundaries

- Server Actions run on the server but are still public entry points from the app. Validate inputs, check authorization, and handle rate limits.
- Keep client components focused on interaction state. Pass only serializable inputs and outputs across the boundary.
- Do not pass class instances, database records with methods, request objects, secrets, or non-serializable values.

## Validation and Results

- Parse form data or action inputs with a schema such as Zod, Valibot, or a backend-owned validator.
- Return structured results for form errors, success state, conflicts, and unexpected failures.
- Avoid throwing for expected validation failures. Reserve thrown errors for exceptional failures and framework control flow.

## RSC Coordination

- Use Server Components for read-heavy data and client components for interactive islands.
- Place mutations where cache invalidation and revalidation are obvious.
- Revalidate paths, tags, or query caches after mutations based on the smallest affected scope.
- Keep optimistic UI on the client aligned with the server action's final result.

## Progressive Enhancement

- Use native form behavior when it improves resilience.
- Preserve focus, submitted values, and field errors after failed submissions.
- Provide pending states that do not block unrelated UI.
