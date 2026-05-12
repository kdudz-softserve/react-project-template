# Query Cache Patterns

## Query Keys

- Include resource identity, tenant or account scope, filters, sort order, pagination cursor, locale, and feature mode when they affect the result.
- Keep keys stable and serializable.
- Avoid keys that depend on non-deterministic object identity.

## Invalidation

- Invalidate the smallest set of queries affected by a mutation.
- Update the cache directly when the mutation returns complete replacement data.
- Refetch when server-side side effects, permissions, derived fields, or background processing make local updates unreliable.

## Stale Time and Freshness

- Use longer stale times for reference data and shorter stale times for collaborative, financial, operational, or security-sensitive data.
- Distinguish initial loading from background refresh.
- Show stale data carefully when decisions depend on freshness.

## Loading and Error States

- Represent initial loading, empty results, refreshing, pagination loading, mutation pending, retrying, and failed states separately.
- Keep previous data visible during refetch when it helps continuity.
- Do not replace a populated view with a blank spinner for small background updates.

## Mutations and Retries

- Retry safe reads and idempotent mutations only when the API contract supports it.
- Avoid retrying writes that may duplicate side effects unless idempotency keys exist.
- Surface conflicts and validation errors near the fields or actions that caused them.
