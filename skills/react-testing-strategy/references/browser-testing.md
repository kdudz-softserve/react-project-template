# Browser Testing

Use browser tests when correctness depends on the running app rather than isolated React output. This includes routing, responsive layout, real form behavior, keyboard navigation, focus changes, network states, storage, cross-page flows, and console or runtime failures.

## Workflow

1. Start or locate the dev server.
   - Prefer the repo's documented command.
   - If a server may already be running, inspect common ports or project output before starting another.
   - Record the exact URL under test.
2. Open the live app and observe current state.
   - Confirm the route, viewport, loaded content, and expected initial state.
   - Check whether auth, fixture data, feature flags, or environment variables affect the scenario.
3. Drive the app like a user.
   - Navigate by links and buttons.
   - Fill forms by label or role.
   - Use keyboard actions for menus, dialogs, tabs, comboboxes, and submit flows.
4. Gather evidence.
   - Console errors and warnings.
   - Failed or slow network requests.
   - Request payloads and response status when relevant.
   - Screenshots for layout, responsive behavior, visual states, and failure diagnosis.
5. Iterate from observed state.
   - If the app differs from assumptions, update the test to match the real behavior or fix the app.
   - Avoid writing tests against imagined DOM structure.

## Selector Priority

- Prefer `getByRole` with accessible name.
- Use `getByLabel`, `getByPlaceholder`, `getByText`, and headings when they reflect user intent.
- Use stable app-specific test ids for repeated controls, virtualized content, canvas-heavy UI, or ambiguous duplicate labels.
- Avoid selectors tied to generated classes, styling libraries, DOM depth, or incidental text.

## Scenarios To Cover

- Routing: direct URL entry, link navigation, redirects, 404 or empty routes, protected routes.
- Layout: desktop, tablet, and mobile viewports; scroll behavior; sticky headers; modals; sidebars.
- Forms: validation, required fields, disabled submit, success, server errors, retry, unsaved changes.
- Keyboard: tab order, enter and escape behavior, arrow-key widgets, focus return after dialogs.
- Network: loading, empty, success, error, slow response, cancellation, optimistic updates.
- Responsive: content reflow, touch-sized controls, horizontal overflow, hidden navigation, breakpoint behavior.
- Runtime health: no unexpected console errors, hydration warnings, unhandled promise rejections, or failed assets.

## Playwright-Style Practices

- Wait for user-observable conditions instead of fixed sleeps.
- Keep setup explicit: route, viewport, storage state, mocked network, and test data.
- Capture screenshots on important visual assertions and failures.
- Keep browser traces or videos for difficult failures when the test runner supports them.
- Prefer one clear user journey per test over broad tours with many unrelated assertions.
