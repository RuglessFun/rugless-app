'use client';
import { useEffect, useState } from 'react';
export function RiskNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      setVisible(localStorage.getItem('rugless-risk-v1') !== 'acknowledged');
    } catch {
      setVisible(true);
    }
  }, []);
  return (
    <>
      <footer className="risk-footer">
        <strong>Understand the risks.</strong>
        <p>
          Cryptocurrencies and other virtual assets are subject to extreme volatility and may lose
          some or all of their value. You can lose all the money or other value you invest. You do
          not benefit from any form of financial protection.
        </p>
        <p>
          Meme coins are highly speculative. AI selection, buybacks and burns do not guarantee
          safety, liquidity or returns. External tokens are not Rugless launches, endorsements or
          investment recommendations. Transactions may be irreversible. This site is not financial
          advice and does not claim VARA licensing or approval.
        </p>
        <button onClick={() => setVisible(true)}>Show risk notice</button>
      </footer>
      {visible && (
        <aside className="risk-banner" aria-label="Cryptocurrency risk notice">
          <div>
            <strong>High-risk assets. You could lose everything you invest.</strong>
            <p>
              Virtual assets are volatile and may lose all their value. You do not benefit from
              financial protection. Review each token and transaction before you act.
            </p>
          </div>
          <button
            className="button"
            onClick={() => {
              try {
                localStorage.setItem('rugless-risk-v1', 'acknowledged');
              } catch {}
              setVisible(false);
            }}
          >
            I understand the risks
          </button>
        </aside>
      )}
    </>
  );
}
