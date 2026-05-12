---
name: react-template-documentation-devops
description: Use when creating or maintaining documentation, ADRs, GitHub Actions, CI checks, contribution guidance, or release hygiene for a React app or template
---

# React Template Documentation DevOps

Create documentation and automation that help a new contributor install, understand, verify, and safely change a React template. Keep docs close to the commands and decisions they support.

## Use When

- Creating or maintaining documentation, ADRs, GitHub Actions, CI checks, contribution guidance, or release hygiene for a React app or template.
- Updating README, onboarding docs, setup instructions, architecture notes, or verification commands.
- Designing CI jobs or documenting Git/GitHub workflow for React template maintainers.

## Core Workflow

1. Inspect the template first: package manager, scripts, framework, routing, environment variables, test stack, build output, deployment assumptions, and existing CI.
2. Write setup docs that get a new contributor from clone to running app with exact commands, prerequisites, supported Node/package-manager versions, and environment variable guidance.
3. Document architecture at the level a maintainer needs: folder ownership, routing, data flow, styling system, state boundaries, testing layers, and extension points.
4. List verification commands and when to run them: install, typecheck, lint, format, unit tests, component tests, Playwright or browser tests, build, preview, and release checks.
5. Define CI expectations with GitHub Actions jobs, caches, artifacts, required checks, matrix policy, failure triage, and local equivalents.
6. Describe contribution flow: branching, commits, PR checklist, review expectations, test evidence, dependency updates, changelog or release hygiene, and issue linkage.
7. Add ADRs when decisions need durable context: architecture choices, tooling commitments, API contracts, deployment constraints, or tradeoffs future maintainers may question.
8. Verify docs and automation by running referenced commands when practical, checking links and paths, validating YAML, and ensuring local docs match CI behavior. State any check that could not run.

## Inspect First

- `package.json`, lockfile, package manager, scripts, framework config, test stack, build output, environment variables, and deployment assumptions.
- Existing README/docs, ADRs, contribution guidance, GitHub Actions, branch rules, and release notes.
- Local command equivalents for every CI job or documented verification step.

## Common Mistakes

- Documenting commands that do not exist or do not match CI.
- Omitting environment variable setup, supported package manager, or Node version.
- Writing architecture docs too vague to guide a new maintainer.
- Adding ADRs for trivial choices or skipping them for durable tradeoffs.

## Verification

- Run referenced commands when practical.
- Check links, paths, examples, environment variable names, and CI YAML validity.
- Compare local verification docs with GitHub Actions jobs.
- If a command or hosted check cannot run, state what remains unverified.

## Advanced References

- Read `references/github-actions.md` for GitHub Actions CI jobs, caching, artifacts, and required checks.
- Read `references/template-documentation.md` for README, quickstart, scripts, environment, testing, architecture, and troubleshooting structure.
- Read `references/adr-guidance.md` when deciding whether to write or update an architecture decision record.
