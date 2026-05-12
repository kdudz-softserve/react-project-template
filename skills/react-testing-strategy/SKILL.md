---
name: react-testing-strategy
description: Use when planning, writing, generating, or reviewing React tests including unit tests, integration tests, component tests, browser tests, end-to-end tests, visual validation, or accessibility checks
---

# React Testing Strategy

Choose the smallest test level that can prove the behavior users depend on. Prefer behavior-focused tests with user-visible assertions over implementation details, mocks of React internals, or brittle snapshots.

## Use When

- Planning, writing, generating, or reviewing React tests.
- Choosing between unit, component, integration, browser, end-to-end, visual, or accessibility checks.
- Verifying UI behavior, forms, routing, network states, responsive layout, or accessibility.

## Core Workflow

1. Start from the user behavior or risk being protected.
2. Pick the narrowest level that observes that behavior without faking the thing under test.
3. Assert on what the user can see, hear, navigate, submit, or recover from.
4. Use stable selectors: roles, labels, names, headings, test ids only when user-facing selectors are not enough.
5. For browser work, start or locate the dev server, inspect the live app, and gather evidence from console logs, network activity, screenshots, and observed DOM state.
6. Cover unhappy paths: empty, loading, error, disabled, validation, denied, slow network, and retry states.
7. Keep tests independent, deterministic, and easy to diagnose.

## Inspect First

- Existing test framework, test helpers, setup files, mocks, fixtures, and CI commands.
- Component API, user-visible behavior, providers, routing, data fetching, and accessibility semantics.
- Whether the risk is logic-only, component behavior, multi-component flow, browser behavior, visual, or accessibility.

## Common Mistakes

- Testing implementation details instead of user-observable behavior.
- Using brittle snapshots as the only proof of UI correctness.
- Mocking the thing the test is supposed to prove.
- Skipping keyboard, focus, loading, error, and responsive states.

## Verification

- Run the smallest relevant test command, then broader checks when the change crosses boundaries.
- For browser and visual work, capture console/network evidence or screenshots when behavior depends on them.
- If a check cannot run, state what behavior remains unverified.

## Test Levels

- Unit: pure functions, reducers, formatters, validators, and small hook logic with clear inputs and outputs.
- Component: a component's rendered behavior, props, events, loading and error states, and accessibility contract.
- Integration: several components, providers, routing, data fetching boundaries, or state coordination working together.
- Browser: real routing, layout, forms, focus, keyboard navigation, network states, responsive behavior, and console errors.
- End-to-end: critical user journeys that cross pages, auth, persistence, payments, or service boundaries.
- Visual: layout, responsive composition, overflow, regressions against a design, and interaction-driven visual states.
- Accessibility: semantics, accessible names, keyboard operation, focus management, contrast, and reduced motion.

## Advanced References

- Browser verification: `references/browser-testing.md`
- Accessibility checks: `references/accessibility-testing.md`
- Visual validation: `references/visual-validation.md`
