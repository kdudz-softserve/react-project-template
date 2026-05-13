# GitHub Workflows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add pull request summary and CI workflows, then make merge eligibility depend on successful workflow checks.

**Architecture:** Keep PR summarization separate from build validation so comments and verification have independent job names. Add one CI workflow with one required `CI` job that runs install, format, lint, typecheck, test, and build steps in sequence. Configure GitHub branch protection to require `PR summary` and `CI` before merge.

**Tech Stack:** GitHub Actions, pnpm 9.15.4, Node 22, Turborepo, OpenAI Codex Action, GitHub CLI.

---

### Task 1: Pull Request Summary Workflow

**Files:**
- Modify: `.github/workflows/summary.yaml`

- [ ] **Step 1: Update the Codex prompt**

Make the generated comment start with a short PR description and keep the existing summary sections:

```yaml
            Write a short pull request description first.
            Keep it concise: 2-3 sentences max before the sections.

            Include:
            ## Summary
            ## What changed
            ## Why it changed
            ## Testing notes
            ## Risk areas
```

- [ ] **Step 2: Run YAML parse check**

Run: `pnpm exec prettier --check .github/workflows/summary.yaml`

Expected: command exits 0 after formatting is valid.

### Task 2: CI Workflow

**Files:**
- Create: `.github/workflows/ci.yaml`

- [ ] **Step 1: Create CI jobs**

Create one `CI` job that checks out the repository, enables pnpm from `packageManager`, installs with `pnpm install --frozen-lockfile`, then runs `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` in sequence. Required check contexts use the GitHub check run names: `PR summary` and `CI`.

- [ ] **Step 2: Run workflow formatting**

Run: `pnpm exec prettier --check .github/workflows/ci.yaml`

Expected: command exits 0 after formatting is valid.

### Task 3: Required Checks

**Files:**
- Remote GitHub repository branch protection for `main`

- [ ] **Step 1: Configure required checks**

Run GitHub CLI/API to require the following status checks before merging to `main`:

```text
PR summary
CI
```

- [ ] **Step 2: Verify protection**

Run: `gh api repos/kdudz-softserve/react-project-template/branches/main/protection`

Expected: response includes each required context in `required_status_checks.contexts`.
