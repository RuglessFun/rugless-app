export function money(value: number | null | undefined, compact = true) {
  if (value == null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: value < 0.01 ? 8 : 2,
  }).format(value);
}
export function change(value: number | null | undefined) {
  return value == null ? '—' : `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}
export function shortAddress(value: string) {
  return `${value.slice(0, 6)}…${value.slice(-5)}`;
}
