# Hook Extraction

Extract hooks when reusable stateful behavior needs a name and a stable API. Hooks are best for effects, subscriptions, data coordination, derived state, browser APIs, and interaction state used by more than one component or complex enough to test through behavior.

## Good Hook Candidates

- Stateful browser behavior: media queries, resize observers, keyboard shortcuts, outside clicks, focus restoration.
- Data coordination: query params, polling, optimistic updates, retries, cache invalidation, and pagination state.
- Interaction logic: selection, disclosure, tabs, drag state, validation state, and undo stacks.
- Derived values that combine multiple inputs and state transitions.
- Integration with shared services or providers.

## Keep Policy Visible

- Do not extract a hook just to hide messy feature policy.
- Keep domain decisions near the feature unless multiple features share the same rule.
- A shared hook should expose capability, not a surprising product decision.
- If a hook requires many feature-specific options, it may belong inside the feature folder.

## API Shape

- Return stable, named values rather than positional tuples when there are more than two items.
- Expose event handlers or commands with domain names.
- Accept explicit inputs instead of reading unrelated globals.
- Keep effects inside the hook only when the hook owns the side effect.
- Memoize returned callbacks or objects only when consumers need stable identity.

## Testing

- Prefer testing hooks through components that exercise user behavior.
- Add direct hook tests for complex state machines, timers, subscriptions, or browser API adapters.
- Cover cleanup for effects, event listeners, observers, intervals, and async cancellation.
- Verify that extraction did not change loading, focus, validation, or error behavior.
