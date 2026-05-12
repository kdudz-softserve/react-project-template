# Optimistic Updates

## Mutation Lifecycle

- Capture the previous cache state before applying an optimistic change.
- Apply the smallest local change that matches the user's intent.
- Mark pending items or fields so the UI does not imply confirmed persistence.
- Replace optimistic data with the server response on success.
- Roll back or reconcile on failure.

## Rollback

- Roll back validation failures and permission failures to the last confirmed state.
- For transport failures, offer retry when the operation may still be safe.
- Use idempotency keys for create or side-effect-heavy operations.

## Conflict Handling

- Detect version conflicts, stale edits, and server-side rule changes.
- Prefer merge UI or explicit overwrite actions for user-authored content.
- Avoid silently discarding server data after a failed optimistic write.

## Pending UI

- Disable only controls that would create duplicate or contradictory operations.
- Keep navigation possible when safe.
- Show pending, syncing, failed, and retry states close to the affected item.

## Offline Caveats

- Offline queues need durable storage, replay ordering, idempotency, auth expiry handling, and conflict resolution.
- Avoid promising offline behavior unless those constraints are designed and tested.
