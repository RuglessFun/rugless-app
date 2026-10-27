export const REVIEW_HOURS = 72;
// This intentionally excludes source, token lists, SVG, executable config and workflows.
export function isContentOnly(paths) {
  return (
    paths.length > 0 &&
    paths.every(
      (path) =>
        /^(README|CONTRIBUTING|SECURITY|CODE_OF_CONDUCT|CHANGELOG)\.md$/.test(path) ||
        /^docs\/[a-zA-Z0-9_/-]+\.md$/.test(path) ||
        /^public\/(brand|images)\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)$/.test(path),
    )
  );
}
export function reviewWindow(createdAt, now = Date.now()) {
  const deadline = Date.parse(createdAt) + REVIEW_HOURS * 60 * 60 * 1000;
  return { elapsed: Number.isFinite(deadline) && now >= deadline, deadline };
}
export function blockingReviewers(reviews) {
  const latest = new Map();
  for (const review of reviews) {
    if (['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(review.state)) {
      latest.set(review.user.login, review.state);
    }
  }
  return [...latest].filter(([, state]) => state === 'CHANGES_REQUESTED').map(([login]) => login);
}
