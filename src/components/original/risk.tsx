'use client';
import { useEffect, useRef } from 'react';
import { mountOriginalChrome } from '@/lib/original/chrome';
export function OriginalRisk() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? mountOriginalChrome(root.current) : undefined), []);
  return (
    <div className="original-marketing risk-only" ref={root}>
      <footer className="wrap footer">
        <section className="risk-footer" id="risk-disclosure" aria-labelledby="risk-footer-title">
          <div className="risk-inner">
            <h2 id="risk-footer-title">{'Understand the risks.'}</h2>
            <p>
              <strong>
                {
                  'Cryptocurrencies and other virtual assets are subject to extreme volatility and may lose some or all of their value. You can lose all the money or other value you invest. You do not benefit from any form of financial protection.'
                }
              </strong>
            </p>
            <p>
              {
                'Meme coins are highly speculative. Rugless, AI selection, buybacks and token burns do not guarantee safety, liquidity or returns. This site is not financial advice.'
              }
            </p>
            <details>
              <summary>{'Read the full risk notice'}</summary>
              <p>
                {
                  'You may be unable to sell or transfer tokens when you want to. Transactions can be irreversible. Fraud, manipulation, hacks, smart-contract failures and loss of wallet keys can cause permanent losses. Activity on public blockchains may be visible to others.'
                }
              </p>
              <p>
                {
                  'AI-generated launch theses and community posts can be wrong, incomplete or manipulated. They are not investment recommendations. Illustrative statistics and projections are not actual results or promises of future performance. Planned features may change or never launch. External platforms operate independently and have their own risks and terms.'
                }
              </p>
              <p>
                {
                  'The Rugless name and “The end of the rug” express the project’s ambition, not a promise that losses or rug pulls are impossible. No statement on this site should be read as evidence of VARA licensing, regulatory approval or endorsement.'
                }
              </p>
              <p>
                {
                  'Acknowledging this notice only records that you have seen it on this browser. It is not a waiver of your rights, a suitability assessment or consent to any transaction. Seek independent professional advice appropriate to your circumstances.'
                }
              </p>
            </details>
            <div className="risk-footer-links">
              <button type="button" data-risk-reopen="" hidden={true}>
                {'Show risk warning again'}
              </button>
            </div>
          </div>
        </section>
      </footer>
      <aside className="risk-banner" id="risk-banner" aria-labelledby="risk-banner-title">
        <div className="risk-inner risk-banner-layout">
          <div>
            <h2 id="risk-banner-title">
              <span aria-hidden="true">{'!'}</span>
              {' High-risk assets. You could lose everything you invest.'}
            </h2>
            <p>
              {
                'Cryptocurrencies and other virtual assets are subject to extreme volatility and may lose some or all of their value. You can lose all the money or other value you invest. You do not benefit from any form of financial protection.'
              }
            </p>
            <p className="risk-banner-extra">
              {
                'Meme coins are highly speculative. Rugless, AI selection, buybacks and token burns do not guarantee safety, liquidity or returns. This site is not financial advice.'
              }
            </p>
          </div>
          <div className="risk-controls">
            <button type="button" id="risk-acknowledge" hidden={true}>
              {'I understand the risks'}
            </button>
            <a href="#risk-disclosure" id="risk-read">
              {'Read full risk notice ↓'}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
