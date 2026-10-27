# Integration boundaries

## Markets and candles

GeckoTerminal public API provides selected PumpSwap pool prices, volume, liquidity and OHLCV. `/api/markets` batches the reviewed pools in one upstream request and validates both pool address and base-token mint. It uses Next.js server caching (60 seconds). Candle endpoints allow only curated tokens and five intervals, with 30-second server caching. Clients refresh at 60-second intervals while visible. Provider outages render an error; old market snapshots are labeled stale.

Cache behavior depends on hosting. Multi-process/self-hosted deployments need shared cache and rate limits. Public API quotas, delays and availability are provider-controlled. Token selection is a reviewed seed registry, not an automatic ranking service.

Coinbase's public SOL/USD spot endpoint powers the illustrative calculator. It has a shared 60-second server cache and no fixed fallback price.

## Charts

TradingView Lightweight Charts renders the actual OHLCV from the selected pool, with candles, volume, crosshair, pan/zoom and interval controls. It is not the hosted TradingView Advanced Chart widget. Attribution links remain visible. Changing interval destroys the old chart and aborts the old request.

## Swaps and wallets

Solana Wallet Adapter discovers Wallet Standard wallets. Auto-connect is disabled. Jupiter Plugin uses wallet passthrough from the same provider and displays an integrated, editable quote/trade form. The selected token mint is locked, SOL is the initial input, and reversing the direction supports selling. Users can inspect price impact, slippage and fees before wallet approval. There is no custom backend signer or platform trading fee configured.

A token can lack a route or be unsupported by Jupiter. Route availability is not guaranteed by inclusion in the directory. Provider errors expose a retry and a Pump.fun link. The hosted plugin is a runtime third-party dependency; see SECURITY.md.

Official references:

- https://solana.com/developers/cookbook/wallets/connect-wallet-react
- https://developers.jup.ag/docs/tool-kits/plugin/react-app-example
- https://developers.jup.ag/docs/tool-kits/plugin/customization
- https://tradingview.github.io/lightweight-charts/
- https://apiguide.geckoterminal.com/

## X and Rugless launches

The app does not call the X API or send replies. Feed ingestion, moderation, nomination attribution and AI launch decisions need a separate authenticated service. No credentials from the local X experiment are included in this repository. Do not represent external Pump tokens as AI-selected Rugless launches.
