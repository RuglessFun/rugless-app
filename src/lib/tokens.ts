import rawTokens from '@/data/tokens.json';
import type { Token } from './types';
export const tokens = rawTokens as Token[];
export function findToken(mint: string) {
  return tokens.find((token) => token.mint === mint);
}
export function tokenHref(token: Pick<Token, 'mint'>) {
  return `/app/tokens/${token.mint}`;
}
export function isMint(value: string) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}
