import { describe, it, expect } from 'vitest';
import { isContentOnly, reviewWindow, blockingReviewers } from './review-policy.mjs';
describe('community review policy', () => {
  it('allows narrow content changes but not executable assets or token changes', () => {
    expect(isContentOnly(['README.md', 'public/brand/cover.png'])).toBe(true);
    for (const path of [
      'src/data/tokens.json',
      'public/brand/logo.svg',
      '.github/workflows/ci.yml',
      'docs/script.js',
      'src/app/page.tsx',
    ])
      expect(isContentOnly(['README.md', path])).toBe(false);
    expect(isContentOnly([])).toBe(false);
  });
  it('requires the entire 72 hours from a trusted timestamp', () => {
    const start = '2026-10-27T12:00:00Z',
      at = Date.parse(start);
    expect(reviewWindow(start, at + 72 * 3600000 - 1).elapsed).toBe(false);
    expect(reviewWindow(start, at + 72 * 3600000).elapsed).toBe(true);
    expect(reviewWindow('bad', at).elapsed).toBe(false);
  });
  it('comments do not clear a blocking review', () => {
    expect(
      blockingReviewers([
        { user: { login: 'reviewer' }, state: 'CHANGES_REQUESTED' },
        { user: { login: 'reviewer' }, state: 'COMMENTED' },
      ]),
    ).toEqual(['reviewer']);
    expect(
      blockingReviewers([
        { user: { login: 'reviewer' }, state: 'CHANGES_REQUESTED' },
        { user: { login: 'reviewer' }, state: 'APPROVED' },
      ]),
    ).toEqual([]);
  });
});
