# Community-reviewed releases

## Required path for core changes

1. Open a focused PR with acceptance criteria and risk/rollback notes.
2. Publish a staging preview of the exact commit. Staging must not contain production secrets.
3. Give the community at least 72 hours from the GitHub-recorded review check for the latest head commit. A push creates a new clock.
4. Resolve blocking feedback. Obtain a fresh non-author approval and passing CI.
5. Merge through branch protection. Record the merged PR and code status.
6. Verify the merged commit on staging. Record the URL, commit SHA, checks and reviewer.
7. Promote that same commit to production through the hosting provider's protected/manual promotion process. Record the deployment URL and release SHA.
8. Update production milestone status only after deployment succeeds.

Content-only changes can bypass the 72-hour wait if all files match `scripts/review-policy.mjs`. CI and normal review still apply. Application source, runtime data, dependencies, SVG and workflow files do not qualify.

## Bootstrap and hosting

The initial commit bootstraps the repository; it is not a completed community-review cycle and does not deploy. Hosting is not configured by these workflows. Do not enable automatic production deploys on every PR push or merge. Configure a protected production environment or equivalent provider gate before shipping.

GitHub branch protection must require `validate` and `Community review (72h)`, one approving review, stale-review dismissal and resolved conversations. Force pushes and deletions should be disabled. Administrators remain a governance trust boundary.

## Rollback

Promote the previous known-good, already-reviewed deployment. Record the incident and exact SHA. A new code fix still follows the core review policy; this repository does not grant an undocumented emergency bypass.
