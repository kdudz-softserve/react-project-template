# Accessibility Testing

Accessibility checks should combine automated scans with manual, screen-reader-minded interaction. Automated tools catch many structural issues, but they do not prove a workflow is understandable or operable.

## Core Checks

- Use semantic HTML before ARIA. Prefer native buttons, links, inputs, fieldsets, headings, tables, lists, and dialogs.
- Every interactive control needs an accessible name that matches visible intent.
- Headings, landmarks, labels, helper text, validation messages, and error summaries should describe the page structure.
- Focus must move predictably, remain visible, and return to the invoking control when dialogs or popovers close.
- All functionality must work by keyboard without pointer-only actions.
- Disabled, loading, selected, expanded, invalid, and busy states should be exposed semantically when users need them.
- Color contrast must meet the app's target standard, and information must not rely on color alone.
- Respect reduced motion preferences for large, looping, or vestibular animations.

## Test Inputs

- Role and name queries in component or browser tests.
- Keyboard-only flows for menus, tabs, dialogs, comboboxes, forms, routing, and destructive actions.
- Axe-style automated scans for missing names, invalid ARIA, landmark issues, contrast warnings, and document structure.
- Manual checks for focus order, visible focus, announcements, context changes, validation feedback, and recoverability.

## What To Verify

- Page has a useful title, main landmark, and meaningful heading order.
- Form controls have labels, constraints, error text, and successful submission feedback.
- Dialogs trap focus while open, close with escape when appropriate, and restore focus after close.
- Dynamic updates announce important changes through visible status text or live regions when needed.
- Custom widgets follow expected keyboard patterns for their role.
- Text remains readable at zoom and in narrow viewports without clipped controls or hidden content.

## Common Mistakes

- Passing an automated scan while keyboard flow is broken.
- Adding ARIA roles to non-semantic elements instead of using native controls.
- Using icon-only buttons without accessible names.
- Moving focus on every render or route change without user benefit.
- Hiding focus outlines without an equivalent visible focus style.
