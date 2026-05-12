# GitHub Actions

CI should prove the template can be installed, checked, tested, and built from a clean checkout. Keep each job's purpose clear and make local equivalents visible in docs.

## Core Jobs

- Install: check out the repo, set up Node, enable the expected package manager, restore cache, and install with the lockfile-enforcing command.
- Typecheck: run the exact project script for TypeScript or framework type validation.
- Lint and format: run lint and formatting checks without auto-writing changes.
- Unit/component tests: run deterministic tests with coverage only when the project uses coverage thresholds or artifacts.
- Build: run the production build and fail on warnings only if the project has made that policy explicit.
- Playwright/browser tests: install browsers when needed, start the app or preview server, run tests, and upload reports, traces, screenshots, or videos on failure.

## Caching

- Cache package-manager stores, not `node_modules`, unless the project has a documented reason.
- Key caches from OS, Node version, package manager, and lockfile hash.
- Keep browser caches separate from dependency caches when Playwright or similar tools are used.

## Artifacts and Diagnostics

- Upload test reports, coverage, build logs, Playwright reports, traces, screenshots, and videos when they help diagnose failures.
- Keep artifact retention short for routine checks and longer only for release evidence.
- Print versions for Node, package manager, browser tooling, and framework when failures are hard to reproduce.

## Required Checks

- Mark the smallest set of checks as required: usually typecheck, lint, tests, build, and browser tests for templates that ship browser flows.
- Keep branch protection aligned with documented contribution flow.
- Prefer one reusable workflow or shared action only after repeated jobs prove the duplication is real.

## Review Points

- CI commands must match README commands.
- Workflow triggers should cover pull requests and the protected default branch.
- Secrets must not be required for ordinary pull-request validation unless the template documents that limitation.
- Pin actions to stable major versions or commit SHAs according to project policy.
