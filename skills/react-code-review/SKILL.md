---
name: react-code-review
description: Use when reviewing React pull requests, diffs, components, hooks, TypeScript changes, rendering behavior, architecture drift, accessibility regressions, or test gaps
---

# React Code Review

## Use When

- Reviewing React pull requests, local diffs, components, hooks, routes, or TypeScript changes.
- Looking for React rendering risks, hook misuse, architecture drift, accessibility regressions, or test gaps.
- Checking whether a change scales cleanly with existing app conventions.

## Core Workflow

1. Inspect the diff in context: changed files, callers, tests, route ownership, data flow, and existing project conventions.
2. Lead with findings, sorted by severity. Include file and line references when available, describe the user-visible or maintenance impact, and avoid burying issues in a summary.
3. Review rendering behavior, hook dependencies, TypeScript soundness, state ownership, async effects, accessibility semantics, tests, architecture fit, performance impact, maintainability, boundary drift, UI correctness, and scalable patterns.
4. Distinguish must-fix defects from preferences. Do not report style-only concerns unless they create real risk or violate an explicit project standard.
5. If no issues are found, say so clearly and mention any residual risk or unrun verification.

## Inspect First

- Changed files, nearby callers, route ownership, providers, tests, and existing conventions.
- Hook dependencies, memoization, state owners, async effects, and rendering hot paths.
- Type boundaries, API/data contracts, accessibility semantics, and test coverage.

## Common Mistakes

- Reporting style preferences as defects.
- Missing stale closures, unstable props, hidden global state, and unsafe casts.
- Reviewing only the changed component without checking callers or user flows.
- Burying important findings under a long summary.

## Verification

- Reference file and line numbers when reviewing local files.
- Check whether relevant typecheck, lint, tests, build, or browser verification ran.
- If no issues are found, state remaining test gaps or residual risk.

## Advanced References

- Read `references/review-checklist.md` for a structured React review pass.
- Read `references/react-antipatterns.md` when looking for common React defects and concrete review findings.
