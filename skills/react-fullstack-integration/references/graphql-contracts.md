# GraphQL Contracts

## Operation Ownership

- Assign each screen, route, or feature clear ownership of its queries, mutations, subscriptions, and fragments.
- Keep fragments near the component that consumes the fields, but avoid fragment webs that hide data requirements.
- Mutations should document affected entities and expected cache invalidation or update behavior.

## Generated Operation Types

- Generate TypeScript types from GraphQL operations, not only from the schema. Operation types reflect aliases, nullable selections, fragments, and variables the UI actually uses.
- Treat generated types as compile-time guarantees for selected data only. Runtime auth, validation, and nullability still matter.
- Make codegen part of CI or pre-commit when schema drift is common.

## Apollo Client Concerns

- Define cache identity with `typePolicies` and stable key fields.
- Use field policies for pagination, merges, local derivations, and non-default argument handling.
- Prefer explicit mutation cache updates, optimistic responses, or targeted refetches over broad cache resets.
- Keep Apollo local state for client-only UI or small derived state, not server-owned business state.
- Model `loading`, `error`, `data`, `previousData`, partial data, and refetch states separately in user-facing flows.

## Errors and Partial Data

- Decide how the UI handles GraphQL partial results before rendering.
- Distinguish transport errors, GraphQL errors, auth errors, validation errors, and domain conflicts.
- Use stable `extensions.code` values for client branching.
- Avoid showing raw resolver errors.

## Suspense and RSC

- Use Suspense where the framework, Apollo integration, and UX boundaries support it.
- Do not suspend a broad route when only a small panel is pending.
- In React Server Components, keep server-only GraphQL clients and credentials on the server; pass serializable data into client components.
- Verify Apollo Client usage is compatible with the framework's SSR, streaming, and RSC model before standardizing on it.
