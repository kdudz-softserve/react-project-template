---
name: react-refactoring
description: Use when refactoring React code, splitting large components, extracting hooks, modularizing logic, reducing duplication, improving state boundaries, or preserving behavior while changing structure
---

# React Refactoring

Refactor React code in small, behavior-preserving steps. Start by understanding current behavior, then reshape ownership boundaries without unrelated rewrites.

## Use When

- Splitting large React components, extracting hooks, modularizing logic, or reducing duplication.
- Improving state boundaries, data flow, effects, or component APIs without changing behavior.
- Making React code easier to test, review, and evolve.

## Core Workflow

1. Identify the behavior, props, routes, data states, and accessibility contract that must remain unchanged.
2. Add or run characterization checks for risky areas: tests, browser verification, screenshots, or focused manual checks.
3. Read nearby components, hooks, providers, and tests to learn local patterns before introducing new ones.
4. Name the refactor goal: split rendering, isolate state, remove duplication, simplify effects, or clarify data flow.
5. Make one structural change at a time.
6. Preserve public props, route behavior, state shape, and user-visible output unless the task explicitly changes them.
7. Move code before rewriting it; rename only when it improves the new boundary.
8. Verify after each meaningful change and stop before polishing unrelated areas.

## Inspect First

- Current component responsibilities, props, state, effects, data access, route usage, and tests.
- Nearby hooks, providers, services, fixtures, and accessibility behavior.
- Existing patterns for component composition and shared primitives.

## Common Mistakes

- Rewriting behavior while claiming to refactor.
- Extracting hooks that hide feature policy or unstable dependencies.
- Splitting by technical layer while preserving tangled ownership.
- Expanding scope into unrelated cleanup.

## Verification

- Run characterization tests or focused browser/manual checks before and after risky changes.
- Run available typecheck, lint, relevant tests, and build.
- If a check cannot run, state what behavior remains unverified.

## Good Boundaries

These are common extraction targets:

1. Data loading and mutations.
2. State orchestration and derived state.
3. Presentational layout.
4. Form behavior and validation.
5. List rendering and item rows.
6. Dialogs, popovers, and transient UI state.
7. Reusable primitives with stable, boring APIs.

## Advanced References

- Component boundaries: `references/component-splitting.md`
- Hook extraction: `references/hook-extraction.md`
