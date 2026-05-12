---
name: design-to-react-implementation
description: Use when converting UI designs, Figma files, design tokens, component specs, shadcn/ui patterns, responsive layouts, accessibility semantics, interaction states, or visual QA into React implementation
---

# Design to React Implementation

Turn design intent into working React by preserving structure, tokens, accessibility, responsive behavior, and interaction states. Prefer the app's existing design system and UI primitives before adding new component shapes.

## Orientation

This workflow emphasizes production visual quality, reusable React boundaries, shadcn/ui composition, Figma token mapping, and browser-based QA. It is informed by `anthropics/frontend-design`, `google-labs-code/react-components`, `google-labs-code/shadcn-ui`, `openai/frontend-skill`, `openai/playwright-interactive`, and `figma/figma-implement-design`.

## Use When

- Converting UI designs, Figma files, design tokens, component specs, or screenshots into React implementation.
- Implementing shadcn/ui patterns, responsive layouts, accessibility semantics, interaction states, or visual QA.
- Checking whether rendered UI matches design intent in a browser.

## Core Workflow

1. Inspect the design context first: Figma frames, screenshots, product domain, component hierarchy, variants, constraints, annotations, assets, and target viewports.
2. Inspect the codebase UI system: routes, layout shells, tokens, CSS variables, typography, spacing, icons, shadcn/ui components, form patterns, and existing state conventions.
3. Map design tokens to implementation tokens before styling: color, type, radius, spacing, elevation, borders, motion, breakpoints, and density.
4. Build with existing primitives and composition. Use shadcn/ui or local components as accessible foundations; add wrappers only when they encode reusable product behavior.
5. Implement semantic React components with clear props, accessible names, keyboard operation, focus states, loading/empty/error states, and disabled behavior.
6. Make responsive behavior explicit with stable layout constraints, not viewport-scaled type. Verify content wrapping, overflow, and target sizes across mobile and desktop.
7. Include interaction states from the design: hover, active, focus-visible, selected, expanded, validation, drag, modal, menu, toast, and reduced-motion behavior.
8. Verify in a real browser when practical. Compare screenshots against the design, inspect computed styles and accessibility tree, refine until the rendered result matches the intent.
9. Run available project checks such as typecheck, lint, unit/component tests, build, and browser or Playwright visual checks. State any check that could not run.

## Inspect First

- Figma frames, screenshots, product domain, component hierarchy, variants, constraints, annotations, assets, and target viewports.
- Routes, layout shells, tokens, CSS variables, typography, spacing, icons, shadcn/ui components, form patterns, and existing state conventions.
- Accessibility semantics, focus order, keyboard behavior, responsive constraints, and interaction states.

## Common Mistakes

- Building new primitives when existing UI components fit.
- Copying pixels without preserving semantics, keyboard behavior, or responsive intent.
- Using viewport-scaled type or unstable layout constraints.
- Skipping browser comparison for layout, overflow, and interaction states.

## Verification

- Compare browser screenshots against the design when practical.
- Inspect computed styles, accessibility tree, focus order, and responsive behavior across target viewports.
- Run available typecheck, lint, unit/component tests, build, and browser or Playwright visual checks.
- If a check cannot run, state what remains unverified.

## Advanced References

- Read `references/figma-to-code.md` for Figma inspection, frame hierarchy, tokens, variants, constraints, responsiveness, and assets.
- Read `references/shadcn-ui.md` when using shadcn/ui, Radix-style composition, theming, or component primitives.
- Read `references/accessibility-semantics.md` for semantic HTML, labels, landmarks, dialogs, menus, forms, keyboard operation, and focus order.
