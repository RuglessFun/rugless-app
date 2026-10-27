import { isContentOnly, reviewWindow, blockingReviewers } from './review-policy.mjs';

// Runs trusted default/base-branch code only; never checks out or executes PR code.
export async function checkCommunityReview({ github, context }) {
  const { owner, repo } = context.repo;
  const pullNumbers = context.payload.pull_request
    ? [context.payload.pull_request.number]
    : (
        await github.paginate(github.rest.pulls.list, { owner, repo, state: 'open', per_page: 100 })
      ).map((p) => p.number);
  for (const pull_number of pullNumbers) {
    const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number });
    const files = await github.paginate(github.rest.pulls.listFiles, {
      owner,
      repo,
      pull_number,
      per_page: 100,
    });
    const contentOnly =
      files.length === pr.changed_files &&
      isContentOnly(
        files.flatMap((f) =>
          f.previous_filename ? [f.previous_filename, f.filename] : [f.filename],
        ),
      );
    const name = 'Community review (72h)';
    const checks = await github.paginate(github.rest.checks.listForRef, {
      owner,
      repo,
      ref: pr.head.sha,
      check_name: name,
      per_page: 100,
    });
    let check = checks
      .filter((c) => c.app?.slug === 'github-actions')
      .sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at))[0];
    if (!check) {
      ({ data: check } = await github.rest.checks.create({
        owner,
        repo,
        name,
        head_sha: pr.head.sha,
        status: 'in_progress',
        output: {
          title: 'Community review started',
          summary: 'The review clock begins when GitHub records this check for this exact commit.',
        },
      }));
    }
    // GitHub's server timestamp cannot be backdated by a commit author.
    const window = reviewWindow(check.started_at);
    const reviews = await github.paginate(github.rest.pulls.listReviews, {
      owner,
      repo,
      pull_number,
      per_page: 100,
    });
    const blocking = blockingReviewers(reviews);
    const passed = (contentOnly || window.elapsed) && blocking.length === 0 && !pr.draft;
    const summary = [
      contentOnly
        ? 'Only allowlisted documentation/raster-content files changed; no core timelock required.'
        : `Core change: earliest eligibility ${new Date(window.deadline).toISOString()}. New code commits start a new review clock.`,
      blocking.length
        ? `Blocking reviewers: ${blocking.join(', ')}.`
        : 'No outstanding changes-requested reviews.',
      pr.draft ? 'Draft PRs cannot pass.' : '',
      'Passing this check does not deploy. CI, approval, resolved conversations and staging verification remain required.',
    ]
      .filter(Boolean)
      .join('\n\n');
    await github.rest.checks.update({
      owner,
      repo,
      check_run_id: check.id,
      status: passed ? 'completed' : 'in_progress',
      ...(passed ? { conclusion: 'success', completed_at: new Date().toISOString() } : {}),
      output: { title: passed ? 'Community review complete' : 'Community review pending', summary },
    });
  }
}
