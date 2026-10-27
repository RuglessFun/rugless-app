export default function Page() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE COMMUNITY SIGNAL</p>
          <h1>Good memes start with a good case.</h1>
          <p>Nominations, tagged posts and the conversations behind the culture.</p>
        </div>
      </div>
      <section className="panel empty-state">
        <span className="empty-symbol">@</span>
        <h2>No verified posts indexed.</h2>
        <p>
          Reply to an original post with @RuglessX. Include a token name, ticker, image idea and a
          detailed thesis.
        </p>
        <p>
          This app does not poll the X API. Posts appear once the ingestion and moderation service
          is connected.
        </p>
        <a
          className="primary-button"
          href="https://x.com/RuglessX"
          target="_blank"
          rel="noreferrer"
        >
          Find Rugless on X ↗
        </a>
      </section>
    </>
  );
}
