# ADR Guidance

Write an architecture decision record when future maintainers need the reasoning, not just the result.

## When to Write an ADR

- Choosing a framework, router, data-fetching approach, styling system, test strategy, package manager, or deployment model.
- Introducing a durable constraint such as browser support, accessibility bar, CI gate, API boundary, or repository structure.
- Reversing or replacing a previous decision.
- Accepting a meaningful tradeoff in performance, complexity, security, maintainability, cost, or team workflow.
- Deciding something likely to be questioned during review or onboarding.

## When Not to Write One

- Routine implementation details that are obvious from code.
- Temporary experiments that are not committed as the template direction.
- Decisions already captured clearly in an existing ADR that still applies.

## Format

- Title: short decision phrase.
- Status: Proposed, Accepted, Superseded, Deprecated, or Rejected.
- Date: ISO date.
- Context: problem, constraints, stakeholders, and forces that made the decision necessary.
- Options: realistic alternatives considered, including the status quo.
- Decision: the selected option and the boundary of what it covers.
- Consequences: positive outcomes, costs, risks, follow-up work, and what would trigger reconsideration.

## Maintenance

- Number ADRs or use stable filenames so they can be referenced from docs and PRs.
- Do not edit history to hide old decisions; supersede them with a new ADR.
- Link ADRs from README or architecture docs when they explain important template behavior.
- Keep ADR language factual, concise, and tied to repository reality.
