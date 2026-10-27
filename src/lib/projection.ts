/** An illustrative cohort model, not a return forecast. All volumes are USD. */
export function normalQuantile(p: number) {
  const a = [
      -39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472,
      2.50662827745924,
    ],
    b = [
      -54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857,
    ],
    q = p - 0.5,
    r = q * q;
  return (
    ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}
export function project(launches: number, percentile: number, usdPerSol: number) {
  if (!Number.isFinite(usdPerSol) || usdPerSol <= 0) throw Error('A valid SOL quote is required');
  const initialUsd = Math.exp(
    Math.log(Math.sqrt(10000 * 10000000)) +
      ((Math.log(10000000) - Math.log(10000)) / (2 * normalQuantile(0.95))) *
        normalQuantile(percentile / 100),
  );
  const fees = Array.from(
    { length: 90 },
    (_, age) =>
      0.99 *
      (0.9731 * 0.003 * (10000 / usdPerSol) * 2 ** (-age / 0.25) +
        0.0269 *
          0.0095 *
          (initialUsd / usdPerSol) *
          (0.8 * 2 ** (-age / 3) + 0.2 * 2 ** (-age / 30))),
  );
  const cohorts = Array.from({ length: 3 }, () => Array<number>(90).fill(0));
  for (let day = 0; day < 90; day++)
    for (let launchDay = 0; launchDay <= day; launchDay++)
      cohorts[Math.floor(launchDay / 30)][day] += launches * fees[day - launchDay];
  const daily = Array.from({ length: 90 }, (_, day) =>
    cohorts.reduce((sum, cohort) => sum + cohort[day], 0),
  );
  let total = 0;
  const cumulative = daily.map((v) => (total += v));
  return {
    initialUsd,
    initial: initialUsd / usdPerSol,
    usdPerSol,
    cohorts,
    daily,
    cumulative,
    total,
    tokens: launches,
  };
}
