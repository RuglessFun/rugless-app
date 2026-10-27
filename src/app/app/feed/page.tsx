export default function Page() {
  return (
    <>
      <section className="workspace-page-title">
        <div>
          <h1>What’s happening on X</h1>
          <p>Catch new nominations and follow the conversation around launched memes.</p>
        </div>
        <span className="workspace-network">
          <i className="status-dot" />
          Solana
        </span>
      </section>
      <section className="discovery-board">
        <div className="app-section-title">
          <h2>The community feed</h2>
        </div>
        <p className="directory-count">Published nominations and discussion · no X API polling</p>
        <div className="x-feed-layout">
          <div className="x-stream">
            <div className="app-empty">
              <span>[ ∅ ]</span>
              <h3>No verified posts indexed.</h3>
              <p>
                Posts appear once the ingestion and moderation service is connected. This frontend
                does not query X or incur X API costs.
              </p>
            </div>
          </div>
          <aside className="feed-guide">
            <span className="feed-guide-ascii">@ → [ ? ] → [ ! ]</span>
            <h3>
              Don’t just tag it.
              <br />
              Make the case.
            </h3>
            <p>
              Reply beneath a post, tag <strong>@RuglessX</strong> and tell us why the meme deserves
              its own coin.
            </p>
            <ul>
              <li>Suggest a token name and ticker.</li>
              <li>Explain why the joke will travel.</li>
              <li>Suggest an image people will recognize.</li>
            </ul>
            <a
              className="button primary"
              href={`https://x.com/intent/post?text=${encodeURIComponent('@RuglessX\nName: \nTicker: \nImage idea: \nMy thesis: ')}`}
              target="_blank"
              rel="noreferrer"
            >
              Draft a nomination ↗
            </a>
            <p>
              Discussing an existing coin? Include its CA so your thesis lands on the right token.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
