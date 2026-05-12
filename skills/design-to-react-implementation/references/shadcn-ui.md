# shadcn/ui

Use shadcn/ui as a set of accessible, themeable primitives. Compose behavior and product meaning around the primitives instead of copying decorative markup from examples.

## Primitive Selection

- Start with the closest primitive: Button, Input, Select, Checkbox, RadioGroup, Tabs, Dialog, Popover, DropdownMenu, Tooltip, Table, Card, Badge, Sheet, Toast, Form, or Command.
- Prefer existing local wrappers if the app already standardizes validation, analytics, icons, density, or copy behavior.
- Avoid unnecessary wrapper components that only rename props or hide simple composition.

## Composition

- Keep component ownership clear: primitives handle accessibility mechanics; product components handle domain content, data, and workflow rules.
- Use `asChild` only when the child element preserves semantics, focusability, and expected keyboard behavior.
- Keep slots explicit for icons, labels, descriptions, actions, and error text.
- Do not nest cards inside cards unless the design system already uses that pattern for repeated items.

## Theming

- Use project theme tokens and CSS variables for color, radius, shadow, border, spacing, and typography.
- Keep dark mode, high contrast, reduced motion, and density variants aligned with existing conventions.
- Extend variants where repeated usage proves a real system need; keep one-off styling near the component that owns it.

## Accessibility

- Preserve Radix/shadcn accessibility contracts: trigger/content relationships, focus traps, roving tabindex, escape behavior, aria attributes, and controlled or uncontrolled state.
- Ensure buttons are buttons, navigation is links, form controls have labels, and menu items perform menu-like actions.
- Test keyboard operation after composition, especially for dialogs, sheets, dropdowns, popovers, tabs, command menus, and forms.

## Implementation Checks

- Verify generated or copied components match the project's installed shadcn/ui version and styling conventions.
- Run typecheck and lint after adding variants or changing primitive APIs.
- Inspect rendered DOM when composition changes semantics or focus behavior.
