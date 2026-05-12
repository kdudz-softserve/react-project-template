# Template Documentation

Template docs should make the first successful run fast and make future changes predictable.

## README Structure

- Project purpose: what the template is for and what it intentionally does not include.
- Stack: framework, React version, styling system, routing, test tools, package manager, and deployment target if known.
- Prerequisites: Node version, package manager, browser dependencies, service requirements, and supported operating systems when relevant.
- Quickstart: clone, install, configure environment, run dev server, run checks, and build.
- Scripts: command table with purpose, when to run it, and whether it writes files.
- Environment variables: required and optional keys, local example file, secret handling, and CI behavior.
- Testing: unit, component, integration, browser, accessibility, visual, and manual smoke-test guidance.
- Architecture: folder map, route ownership, data flow, state management, styling, component system, and extension points.
- Troubleshooting: common install, port, browser, dependency, typecheck, and CI failures with concrete fixes.
- Contribution: branch flow, PR checklist, review expectations, verification evidence, dependency update policy, and release notes.

## Quality Bar

- Every command in the docs should be runnable from a clean checkout or explicitly marked as optional/contextual.
- Paths and filenames should match the repository.
- Avoid vague phrases like "run the tests" when there are multiple test layers; name the exact command.
- Keep generated-template instructions separate from template-maintainer instructions when both audiences exist.
- Update docs in the same change that alters scripts, CI, folder structure, environment variables, or release behavior.

## Verification

- Run or dry-check documented commands when practical.
- Check Markdown links, headings, command snippets, and environment variable names.
- Compare README commands against `package.json`, CI workflow files, and any contribution docs.
