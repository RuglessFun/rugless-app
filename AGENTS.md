<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Rugless project conventions

- Read README.md, CONTRIBUTING.md and SECURITY.md before changing trading or release behavior.
- Keep external market examples separate from verified Rugless launches. Never fabricate market values, launch theses, nominators, receipts or deployment status.
- No secrets, X credentials, wallet private keys or seed phrases belong in this repository.
- Never execute a funded-wallet trade as part of automated verification.
- Run format:check, typecheck, test and build for core changes.
- Changes to core functionality require community review; do not weaken the release gate to make a check pass.
