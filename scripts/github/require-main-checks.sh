#!/usr/bin/env bash
set -euo pipefail

OWNER="kdudz-softserve"
REPO="react-project-template"
BRANCH="main"

gh api \
  --method PUT \
  "repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" \
  --field required_status_checks[strict]=true \
  --field enforce_admins=true \
  --field required_pull_request_reviews=null \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true \
  --raw-field required_status_checks[contexts][]="PR summary" \
  --raw-field required_status_checks[contexts][]="Format" \
  --raw-field required_status_checks[contexts][]="Lint" \
  --raw-field required_status_checks[contexts][]="Typecheck" \
  --raw-field required_status_checks[contexts][]="Unit Tests" \
  --raw-field required_status_checks[contexts][]="Build"
