---
name: react-data-database-integration
description: Use when designing React data flows, database-facing API contracts, schema-driven types, query caches, mutations, optimistic updates, pagination, forms, migrations awareness, or consistency behavior
---

# React Data Database Integration

## Use When

- Designing React data flows, database-facing API contracts, query caches, mutations, forms, pagination, or optimistic updates.
- Working with schema-driven types, migrations awareness, consistency behavior, or data contract drift.
- Keeping React code decoupled from database internals while respecting persistence constraints.

## Core Workflow

1. Keep React decoupled from database internals. Components should speak in product concepts and API contracts.
2. Use schema-driven types where practical: OpenAPI, GraphQL operation codegen, Zod schemas, shared packages, or typed RPC routers.
3. Define query and mutation ownership per route, screen, or feature.
4. Keep cache keys aligned with user-visible filters, pagination, identity, and tenant scope.
5. Plan invalidation before implementing mutations.
6. Model loading, empty, stale, refreshing, optimistic, conflict, validation, and offline states separately.
7. Coordinate UI changes with migrations, nullable fields, backfills, enum changes, and rollout order.

## Inspect First

- API contracts, generated types, query keys, mutations, invalidation logic, forms, pagination, optimistic paths, and migration notes.
- Consistency constraints: eventual consistency, read-after-write behavior, background jobs, replica lag, and transactional boundaries.
- Loading, empty, stale, refreshing, conflict, validation, and offline behavior.

## Common Mistakes

- Letting table structure leak into component props and route names.
- Invalidating either too broadly or not at all.
- Assuming writes are immediately visible in every read path.
- Treating generated TypeScript as proof the server accepts the payload.
- Ignoring migration states where old and new fields coexist.

## Verification

- Run available typecheck, lint, build, and relevant data/query/mutation tests.
- Verify schema or contract evidence: OpenAPI output, GraphQL codegen, Zod validation, shared package build, or typed RPC contract.
- Exercise loading, empty, stale, refreshing, optimistic, rollback, conflict, pagination, validation, and offline states where applicable.
- Check cache invalidation and consistency behavior after mutations.
- If database migrations, backend jobs, or real API checks cannot run locally, state what remains unverified.

## Advanced References

- Query caches: `references/query-cache-patterns.md`
- Schema-driven types: `references/schema-driven-types.md`
- Optimistic updates: `references/optimistic-updates.md`
