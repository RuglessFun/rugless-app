# Original design parity

Reference: [Rugless v32](https://rugless-the-end-of-the-rug.violet-rook-3700.chatgpt.site/).

The migration preserves the original JSX structure, fonts, assets, CSS, ASCII fire, fee-flow animation, rug-pull chart and buyback visualization. React components live in `src/components/original`; retained animation renderers live in `src/lib/original`. Their lifecycle adapter cleans up event listeners, observers, fetches and animation frames when a page unmounts. Styles are scoped to marketing or application roots to avoid Tailwind and shadcn resets changing the original design.

## Verified layouts

At 1440 × 900 and 390 × 844, the homepage header, hero, headline, subtitle, burn counter, manifesto, nomination example, rug chart, flywheel, projection, FAQ and closing section matched the hosted reference’s measured positions and dimensions. Neither mobile homepage overflowed horizontally.

The application restores the original sidebar, header, trending cards, discovery grid, token-page organization and roadmap feature-card design. Its content intentionally differs where the new integration provides real external-token data, wallet controls and Jupiter swaps. Roadmap states use repository evidence rather than the previous mock states. The original Buckle proof card links to the existing Devnet detail page.

The live quote form was checked without connecting a wallet or executing a trade. Market and swap availability still depend on upstream providers. Marketing sample counters and the illustrative rug chart are not live financial data.

## Maintenance

Preserve these reference layouts when changing behavior. Keep source-native renderers scoped and disposable; do not reintroduce global listeners or timers. Shared projection arithmetic lives in `src/lib/projection.ts`, with the original renderer responsible only for the visualization.
