import Link from 'next/link';
export default function Page() {
  return (
    <>
      <section className="workspace-page-title">
        <div>
          <h1>Follow the funds</h1>
          <p>See which burns and buys have a receipt you can verify.</p>
        </div>
        <span className="workspace-network">
          <i className="status-dot" />
          Solana
        </span>
      </section>
      <section className="discovery-board">
        <div className="app-section-title">
          <h2>Buybacks &amp; burns</h2>
        </div>
        <p className="directory-count">
          Published on-chain receipts · network shown on every record
        </p>
        <div className="support-explainer">
          <span>[ + → ∞ ]</span>
          <div>
            <h3>Keep good communities alive.</h3>
            <p>
              Half the Community Pool launches new memes. Half supports existing ones through
              buybacks, prioritizing social activity over volume. Each half is 37.5% of $RUGLESS
              creator fees.
            </p>
          </div>
          <Link href="/#flywheel">Follow the funds ↗</Link>
        </div>
        <div className="app-empty">
          <span>[ ∅ ]</span>
          <h3>No mainnet receipts indexed.</h3>
          <p>Only recorded burns and spends appear here.</p>
        </div>
      </section>
    </>
  );
}
