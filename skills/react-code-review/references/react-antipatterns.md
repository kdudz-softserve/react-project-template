# React Antipatterns

## Derived State Stored Unnecessarily

Storing values that can be computed from props, server data, or existing state can create stale UI and extra synchronization code. Prefer direct derivation during render or memoization only when computation cost or referential stability matters.

## Effects for Pure Computation

Effects should synchronize with external systems. Using `useEffect` to calculate local display values often causes double renders, flicker, dependency mistakes, and harder tests.

## Missing Dependencies Hidden With Lint Disables

Disabling hook dependency lint rules can hide stale closures and missed updates. Prefer restructuring the effect, moving pure work into render, using functional state updates, or stabilizing inputs intentionally.

## Unstable Object or Function Props Causing Rerenders

Creating new objects, arrays, or callbacks in hot parent renders can defeat memoized children and expensive lists. Stabilize only where measurement, component contracts, or visible performance risk justify it.

## Giant Components Mixing Responsibilities

Components that combine data fetching, layout, form state, validation, side effects, and product branching are hard to test and change. Split by ownership: route assembly, data access, form behavior, presentation, and reusable controls.

## Unsafe Types at API Boundaries

`any`, unchecked casts, broad `unknown` narrowing, and non-null assertions near API boundaries let bad data enter the UI as trusted state. Validate external data and expose narrow types to components.

## Inaccessible Buttons or Links

Buttons and links without accessible names, incorrect roles, missing labels, or icon-only controls without labels break keyboard and assistive technology use. Prefer semantic elements and visible or programmatic names.
