# Accessibility Semantics

Accessible implementation starts with native semantics, then adds ARIA only where native HTML cannot express the interaction.

## Structure

- Use landmarks for page regions: `header`, `nav`, `main`, `aside`, `footer`, and named sections when multiple similar regions exist.
- Keep headings hierarchical and descriptive. Do not skip levels for visual sizing; style headings separately from their semantic level.
- Use lists for repeated navigation or grouped options, tables for tabular data, and buttons only for actions.
- Use links for navigation and buttons for state changes, submissions, disclosure, menus, and dialogs.

## Names and Labels

- Every interactive control needs an accessible name from visible text, `aria-label`, `aria-labelledby`, or an associated form label.
- Keep visible labels and accessible names aligned unless there is a clear reason to provide extra context.
- Associate descriptions, help text, errors, and validation messages with controls through native relationships or `aria-describedby`.
- Avoid icon-only controls without a name and tooltip-only labels.

## Keyboard and Focus

- Preserve logical focus order that follows visual and task order.
- Provide visible focus indicators with enough contrast and avoid removing outlines without an equivalent replacement.
- Support expected keys: Tab and Shift+Tab for traversal, Enter and Space for activation, Escape for dismissible overlays, arrows for menus/tabs/radio groups where the primitive supports them.
- Move focus intentionally after opening dialogs, closing overlays, adding errors, or completing destructive actions.

## Dialogs, Menus, and Forms

- Dialogs need a labelled title, focus containment, Escape and close behavior, background inertness, and focus return to the trigger.
- Menus are for command lists; use disclosure or navigation patterns when content is not menu-like.
- Forms need labels, validation states, useful errors, disabled and pending states, and submission feedback.
- Avoid putting important interactive controls inside disabled containers where they become unreachable.

## Verification

- Inspect roles, names, and focus order with browser accessibility tools or Testing Library queries.
- Test keyboard-only operation for all new flows.
- Run available automated checks such as axe, Playwright accessibility checks, component tests, lint rules, and browser smoke tests.
