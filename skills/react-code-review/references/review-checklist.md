# Review Checklist

## Correctness

- Does the change preserve existing route behavior, data contracts, form submission, error handling, and loading states?
- Are async operations cancelled, sequenced, or guarded against stale updates where needed?
- Are mutation side effects, cache invalidation, redirects, and optimistic updates intentional?
- Are edge cases covered: empty data, partial data, permission failures, slow network, retries, and invalid input?

## Rendering

- Does the component render the correct UI for loading, error, empty, disabled, and success states?
- Are keys stable and based on identity rather than array position when order can change?
- Are expensive computations memoized only when useful, and are memoization dependencies correct?
- Do object, array, and function props cause avoidable child rerenders in hot paths?

## Hooks

- Are hook dependencies complete and free of lint-disable workarounds?
- Are effects used for synchronization with external systems, not pure computation?
- Are subscriptions, timers, observers, and requests cleaned up?
- Do custom hooks have one clear concern and a stable contract?

## TypeScript

- Are API boundaries typed with trustworthy schemas or narrow interfaces?
- Are `any`, unsafe assertions, non-null assertions, and broad generics justified?
- Do component props model valid states and prevent impossible combinations?
- Are errors, nullable data, and discriminated unions handled exhaustively where practical?

## Accessibility

- Do controls have accessible names and correct roles?
- Are links used for navigation and buttons used for actions?
- Is keyboard interaction preserved for menus, dialogs, forms, tabs, and custom controls?
- Are focus management, labels, validation messages, and disabled states understandable to assistive technology?

## Tests

- Do tests cover the behavior changed, including failure and boundary states?
- Are hook and component tests written at the right level instead of overfitting implementation details?
- Are accessibility-relevant interactions covered with user-level events?
- Are existing tests updated for intentional behavior changes without weakening assertions?

## Maintainability

- Does the code follow nearby naming, composition, and file organization conventions?
- Is the component small enough to understand its data, layout, form, and side-effect responsibilities?
- Are abstractions introduced only after repeated need or clear complexity reduction?
- Is shared code free of feature policy and route assumptions?

## Scalability

- Does the change keep feature boundaries and import direction intact?
- Is state placed at the smallest useful scope?
- Will adding a sibling route, feature, or data source avoid editing unrelated domains?
- Does the design work with server/client boundaries, code splitting, caching, and future tests?
