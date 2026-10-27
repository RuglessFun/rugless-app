# Build Rugless with us

Contributions are welcome: code, design, tests, documentation, research and thoughtful review.

Start with an issue describing the user problem. Reference a roadmap milestone where applicable. Keep PRs focused enough for the community to understand their behavior and risks.

## Development

Use Node 24, `npm ci`, and `npm run dev`. Before opening a PR:

```sh
npm run format
npm run typecheck
npm test
npm run build
```

Use strict TypeScript, small components and explicit data boundaries. Keep provider access server-side where possible. Never label an external token as a Rugless launch. Preserve null values and show data failures honestly. Do not introduce fake financial figures or fake on-chain receipts.

Never commit secrets, private keys, wallet seed phrases, X credentials or `.env.local`. Never use a funded wallet in an automated test. Report vulnerabilities privately under [SECURITY.md](SECURITY.md).

## Community review

Core functionality must remain open for **72 hours after its latest code push** before merge. The `Community review (72h)` check records a trusted GitHub check timestamp against the exact head commit. Each new commit starts a new clock. It rechecks open PRs hourly (GitHub schedules may be delayed); a maintainer can also run the workflow manually.

The check bypasses the time requirement only when **every changed file** is an allowlisted Markdown document or raster image. Workflow/config changes, SVG, token registries, data models and application source always require review. Editing copy inside a source file follows the core path until copy is extracted into a separately reviewed content system. Labels cannot bypass the check.

Required before merge:

- Passing CI and community-review check.
- At least one approval from someone other than the author.
- Stale approvals dismissed when code changes.
- Blocking reviews and conversations resolved.
- Relevant staging and rollback evidence in the PR.

The check is a repository release control, **not an on-chain timelock**. Repository administrators can change GitHub settings; that trust boundary must remain visible. Contributors cannot bypass review by backdating a Git commit.

## Progress tracking

One feature corresponds to one issue or small group of PRs. Record its acceptance criteria, source links and evidence in `src/data/roadmap.json`. Mark code complete only when the implementation PR is merged. Mark staging and production independently, with a deployment URL and exact commit in the associated issue/release record. Do not automatically infer deployed status from a merge.

The bootstrap imports existing planned milestones without invented PR numbers. Automated roadmap synchronization is a future contribution; until then maintainers update the data with evidence.

## Releases

See [docs/RELEASES.md](docs/RELEASES.md). No workflow in this repository deploys to production. Core changes must pass community review and staging verification before a maintainer promotes the exact approved commit.
