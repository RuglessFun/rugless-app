import Link from 'next/link';
export default function Page() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">VERIFY THE MOVEMENT</p>
          <h1>Follow every buy. Verify every burn.</h1>
          <p>On-chain receipts belong here, not promises or invented counters.</p>
        </div>
      </div>
      <section className="panel empty-state">
        <span className="empty-symbol">↳</span>
        <h2>No mainnet receipts indexed.</h2>
        <p>
          Rugless creator fees allocate 75% to the community pool and 25% to operations. Half the
          pool creates new memes; half supports existing tokens. Net meme creator fees buy and burn
          RUGLESS.
        </p>
        <Link className="primary-button" href="/#flywheel">
          Follow the funds →
        </Link>
      </section>
    </>
  );
}
