# React Project Template

This repository tracks the design and planning work for a reusable React project template.

## Superpowers Documents

- Design spec: `docs/superpowers/specs/2026-05-12-react-global-skills-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-12-react-global-skills-implementation.md`

## Current Status

The first milestone created a global Codex skill suite under `~/.codex/skills` for React architecture, review, testing, refactoring, performance, full-stack integration, auth, data/database integration, design-to-code, and documentation/devops.

## Current Template Milestone

The current implementation milestone is the monorepo foundation:

- pnpm workspaces
- Turborepo task orchestration
- shared TypeScript and ESLint packages
- shared config, types, utility, auth, state, testing, API client, design-system, and UI package foundations
- Vite React web and admin app shells
- Fastify API gateway foundation

See `docs/superpowers/plans/2026-05-13-monorepo-foundation-implementation.md` for the approved implementation plan.

## Versioned Skills

The same skill suite is mirrored in this repository under `skills/` so it can be reviewed, shared, and installed elsewhere.
