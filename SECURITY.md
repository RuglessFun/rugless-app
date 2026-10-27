# Security policy

Do not post exploitable vulnerabilities or secrets in public issues. Use GitHub's private vulnerability reporting for this repository when enabled. If unavailable, contact a maintainer privately via the organization before disclosing details.

Provide the affected commit, impact, reproduction steps and a safe proof. Do not exploit a live wallet, disclose user data or transact with real funds to demonstrate a report.

## Trust boundaries

- Wallets retain private keys. Connecting is explicit; swaps require the user's wallet approval.
- Jupiter Plugin is loaded from `https://plugin.jup.ag/plugin-v1.js`. It is third-party executable code that can change independently of Rugless PRs. This app does not claim its updates are covered by our 72-hour review. A self-hosted, reproducible, reviewed trading bundle is needed if governance must cover every runtime dependency update.
- Market data and token metadata are untrusted external information. API endpoints allow only reviewed pool addresses and intervals. A registry entry is not a security audit or endorsement.
- Public RPC endpoints may rate-limit. Production RPC credentials exposed to the browser must be origin-restricted and have no privileged server permissions.
- This frontend implements no treasury custody, token creation, reward claiming or X automation. Do not add those behaviors without threat modeling and community review.
- The GitHub community-review workflow runs trusted base-branch code only. Never check out or execute a PR head under `pull_request_target` permissions.

The current build has not received an independent security audit. Do not represent the Rugless name as a guarantee against scams or losses.

## Dependency audit record

The bootstrap production-dependency audit (October 27, 2026) reported no high or critical findings, and moderate advisories in transitive `jayson` dependencies (`stream-json` and `uuid`) brought in by Solana web3.js and wallet adapters. Compatible upstream fixes were not available in the installed dependency chain. Do not force incompatible major overrides just to silence the audit; review reachability and track upstream patches before production. Dependabot checks dependencies weekly. Re-run `npm audit --omit=dev` because this snapshot will age.
