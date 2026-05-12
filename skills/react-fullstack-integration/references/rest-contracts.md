# REST Contracts

## Contract Shape

- Define request and response schemas for every endpoint, including path params, query params, headers, body, and status codes.
- Prefer OpenAPI or equivalent machine-readable specs when the API is shared across teams or apps.
- Generate TypeScript clients or types when practical, but keep runtime validation on the server and at external boundaries.
- Version breaking changes explicitly. Additive fields should be safe for older clients.

## Validation

- Validate all incoming data on the server before business logic.
- Return field-level validation errors for forms and machine-readable codes for programmatic handling.
- Keep client validation aligned with server schemas, but never treat client validation as trusted.

## Error Envelopes

Use a stable error envelope:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Some fields need attention.",
    "fields": {
      "email": "Enter a valid email address."
    },
    "requestId": "req_123"
  }
}
```

Recommended categories:

- `validation_failed`
- `unauthenticated`
- `forbidden`
- `not_found`
- `conflict`
- `rate_limited`
- `server_error`

## Pagination and Filtering

- Prefer cursor pagination for mutable lists and offset pagination only for stable or small collections.
- Include `nextCursor`, `hasMore`, and total counts only when totals are cheap and meaningful.
- Keep filters and sort order explicit in query keys or cache keys.

## Retries and Idempotency

- Retry idempotent reads for transient network or 5xx failures with bounded backoff.
- Do not blindly retry non-idempotent writes.
- Use idempotency keys for payment, create, import, email, webhook, and job-start endpoints.
- Surface retry exhaustion distinctly from validation or permission failures.
