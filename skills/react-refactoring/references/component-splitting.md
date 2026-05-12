# Component Splitting

Split components when a boundary reduces real complexity: a file has multiple reasons to change, combines data work with layout, repeats markup, hides important state transitions, or makes tests and reviews hard to follow.

## Useful Split Lines

- Data loading: fetches, mutations, cache reads, subscriptions, and refresh behavior.
- State orchestration: selected item, active tab, draft state, filters, permissions, and derived state.
- Presentational layout: headers, panels, grids, rows, empty states, loading states, and error states.
- Form behavior: field groups, validation messaging, submit controls, dirty state, and server errors.
- List rendering: collection container, item row or card, bulk actions, pagination, and virtualization.
- Dialogs and popovers: open state, focus return, confirm flows, menus, and transient content.
- Reusable primitives: buttons, inputs, badges, menu items, table cells, and layout primitives already common in the app.

## Container And Leaf Pattern

- Container components own data dependencies, route params, mutations, permissions, and orchestration.
- Leaf components receive plain props and render accessible, user-facing UI.
- Intermediate components are useful when they name a domain concept, not just because a file is long.

## Props Guidance

- Pass the data a child needs, not whole query objects or global state bags.
- Prefer event props named for domain intent, such as `onInviteUser`, over low-level leakage when the child does not own the policy.
- Keep prop counts readable, but do not create context only to avoid passing three props.
- Avoid boolean clusters that encode many modes. Prefer a clear variant or separate components when behavior diverges.

## Warning Signs

- Splitting creates tiny forwarding components with no semantic value.
- Shared components quietly absorb feature-specific business rules.
- A child component needs to know too much about routing, cache shape, or permissions.
- Refactoring changes loading, empty, error, focus, or accessibility behavior without an explicit requirement.
