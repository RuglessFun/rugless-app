import { describe, it, expect } from 'vitest';
import { project } from './projection';
describe('buyback scenario', () => {
  it('matches the requested volume bounds', () => {
    expect(project(1, 5, 150).initialUsd).toBeCloseTo(10000, 5);
    expect(project(1, 95, 150).initialUsd).toBeCloseTo(10000000, 3);
  });
  it('converts USD fees into SOL using the fetched quote', () => {
    const a = project(5, 50, 100),
      b = project(5, 50, 200);
    expect(a.total).toBeCloseTo(b.total * 2);
    expect(a.total).toBe(a.cumulative[89]);
  });
  it('does not silently assume a SOL price', () => {
    expect(() => project(1, 50, 0)).toThrow();
    expect(() => project(1, 50, NaN)).toThrow();
  });
});
