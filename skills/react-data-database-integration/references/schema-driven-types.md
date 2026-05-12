# Schema-Driven Types

## Sources

- OpenAPI for REST request and response contracts.
- GraphQL operation codegen for selected data, variables, fragments, and nullability.
- Zod, Valibot, or similar schemas for runtime validation and inferred TypeScript.
- Typed RPC routers when frontend and backend share a language boundary.
- Shared packages for domain primitives, enums, and safe DTOs.

## Drift Control

- Generate types in CI or fail builds when generated files are stale.
- Add compatibility checks for breaking schema changes.
- Validate runtime inputs even when compile-time types match.
- Track versioned contracts for mobile apps, external consumers, and independently deployed frontends.

## Boundary Rules

- Share API DTOs, not database entities or ORM models.
- Keep internal-only fields, secrets, audit values, and permission internals out of client types.
- Normalize date, decimal, enum, and nullable semantics.
- Document whether absent, null, and empty values mean different things.

## Migration Awareness

- Support old and new fields during rolling deploys.
- Treat nullable additions, enum expansions, and renamed fields as compatibility events.
- Coordinate generated type updates with backend deployment order.
