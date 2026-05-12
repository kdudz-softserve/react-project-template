# Authorization Patterns

## Separation

Authentication says who the actor is. Authorization says whether the actor can perform an action on a resource. Keep both decisions explicit in code and tests.

## RBAC

- Use roles for broad job functions such as admin, manager, member, or viewer.
- Keep role checks server-side for protected data and mutations.
- Avoid role explosion by using permissions or attributes for exceptions.

## ABAC

- Use attributes when access depends on tenant, ownership, resource status, region, plan, relationship, or risk level.
- Keep policies deterministic and observable.
- Include resource attributes in server-side checks rather than trusting values from React.

## Permissions

- Model permissions around actions and resources, such as `invoice.read` or `project.invite`.
- Send safe permission summaries to the UI for affordances.
- Recheck permissions on every protected server operation.

## Feature Flags

- Treat feature flags as rollout controls, not security controls.
- Combine flags with authorization when a feature exposes protected data or privileged actions.

## UI Affordances

- Hide, disable, or annotate unavailable actions based on safe permission data.
- Provide clear forbidden states when a deep link or stale UI reaches a protected route.
- Avoid implying success before the backend authorizes the operation.
