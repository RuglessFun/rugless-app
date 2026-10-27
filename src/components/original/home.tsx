'use client';
import { useEffect, useRef } from 'react';
import { mountOriginalHome } from '@/lib/original/home';
/** Approved v32 markup, retained to avoid a visual redesign during the Next.js migration. */
export function OriginalHome() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? mountOriginalHome(root.current) : undefined), []);
  return (
    <div className="original-marketing" ref={root}>
      <a className="skip" href="#main">
        {'Skip to content'}
      </a>
      <header className="header">
        <div className="wrap navrow">
          <a className="brand" href="/" aria-label="Rugless home">
            <img className="brand-logo" src="/brand/logo.svg" alt="" width="42" height="34" />
            {'rugless'}
            <span>{'$RUGLESS'}</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/roadmap/">{'Roadmap'}</a>
            <a href="/#flywheel">{'The flywheel'}</a>
          </nav>
          <a className="button small secondary" href="/app">
            {'Launch App '}
            <span aria-hidden="true">{'↗'}</span>
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <p className="eyebrow">
              <span className="status-dot"></span>
              {' For everyone who’s had enough.'}
            </p>
            <h1 id="hero-title">
              {'The end'}
              <br />
              {'of the rug.'}
            </h1>
            <p className="hero-copy">
              {'Find a meme. Tag '}
              <a
                className="hero-handle"
                href="https://x.com/RuglessX"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'@RuglessX on X'}
              </a>
              {' beneath the original post.'}
              <br className="desktop" />
              {' Pitch a name, ticker and image idea. Tell us why it should become a coin.'}
            </p>
            <div className="actions">
              <a
                className="button primary"
                href="https://x.com/intent/post?text=%40RuglessX%0AOriginal%20post%3A%20%5Blink%5D%0ASuggested%20token%20name%3A%0ASuggested%20ticker%3A%20%24%0AImage%20idea%20or%20reference%3A%0AThesis%3A%0AWhy%20this%20meme%2C%20why%20now%3A%0AWho%20would%20rally%20around%20it%3A%0AEvidence%3A"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'Tag @RuglessX on X '}
                <span aria-hidden="true">{'↗'}</span>
              </a>
              <a className="text-link" href="#flywheel">
                {'See where the money goes '}
                <span aria-hidden="true">{'↓'}</span>
              </a>
            </div>
            <div className="hero-burn" id="burns">
              <div className="burn-number" data-stat="burned">
                {'24,861,209'}
              </div>
              <p>
                {'$RUGLESS bought back. Burned. Gone. '}
                <span className="sample-tag">{'Sample data'}</span>
              </p>
              <a href="#flywheel">
                {'Community activity fuels the buybacks. Follow the fire. '}
                <span aria-hidden="true">{'↓'}</span>
              </a>
            </div>
          </div>
          <div className="hero-ca" title="Placeholder contract address">
            <span id="hero-ca-label">{'CA'}</span>
            <code id="rugless-ca">{'RUGLESS_CONTRACT_ADDRESS'}</code>
            <button
              type="button"
              id="copy-rugless-ca"
              aria-label="Copy placeholder contract address"
              title="Copy CA"
            >
              {'⧉'}
            </button>
            <span
              id="rugless-ca-status"
              className="ca-status"
              role="status"
              aria-live="polite"
            ></span>
          </div>
          <canvas id="fire" aria-hidden="true"></canvas>
          <button
            id="fire-toggle"
            className="motion"
            aria-pressed="false"
            aria-label="Pause fire animation"
          >
            {'Ⅱ Pause fire'}
          </button>
        </section>
        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="wrap manifesto-layout">
            <div className="manifesto-statement">
              <p className="kicker">{'[ THE END OF THE LINE ]'}</p>
              <h2 id="manifesto-title">
                {'It’s Rugless '}
                <br />
                {'or nothing.'}
              </h2>
              <span className="manifesto-mark" aria-hidden="true">
                {'////////////////////'}
              </span>
            </div>
            <div className="manifesto-copy">
              <p>
                {
                  'The meme coin meta in 2026 is an absolute mess. 99% of the coins are a rug or a scam and we’re sick of it and we will never get rugged again.'
                }
              </p>
              <p>
                {
                  'This is the end of the line. This is the last honest meme coin. This is the final chance to restore trust.'
                }
              </p>
              <p>
                {
                  'This is all we’ve got. We’re all in. Meme culture is poison. This is the antidote. '
                }
                <strong>{'Spread the cure.'}</strong>
              </p>
            </div>
          </div>
        </section>
        <section className="participate section" id="participate">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="kicker">{'You don’t need to build a token.'}</p>
                <h2>
                  {'Just know a good'}
                  <br />
                  {'meme when you see one.'}
                </h2>
              </div>
              <p>
                {
                  'Your timeline is full of moments worth sharing. Help the community find the ones worth bringing to life.'
                }
              </p>
            </div>
            <div className="nomination-layout">
              <div className="steps">
                <article>
                  <span className="step-number">{'01'}</span>
                  <h3>{'Hunt down new memes.'}</h3>
                  <p>
                    {
                      'Find an original post that makes you stop scrolling. A joke, a character, a moment with a life of its own.'
                    }
                  </p>
                </article>
                <article>
                  <span className="step-number">{'02'}</span>
                  <h3>{'Make the case.'}</h3>
                  <p>
                    {'Reply to that post and tag '}
                    <a href="https://x.com/RuglessX" target="_blank" rel="noopener noreferrer">
                      {'@RuglessX on X'}
                    </a>
                    {
                      '. Suggest a token name, ticker and image, then make your case: why this post, why now, and who would rally around it. Explain what makes it memorable and back it with evidence. A detailed, thoughtful pitch increases the odds of selection. Use a reply thread if you need more room.'
                    }
                  </p>
                </article>
                <article>
                  <span className="step-number">{'03'}</span>
                  <h3>{'Follow what happens.'}</h3>
                  <p>
                    {
                      'If it qualifies and launches, follow the reply to its public page. See the source, the spend and the burn before making your own decision.'
                    }
                  </p>
                </article>
              </div>
              <figure className="x-example" aria-labelledby="x-example-caption">
                <div className="x-example-heading">
                  <span aria-hidden="true">{'𝕏'}</span>
                  <span>{'One post. Your thesis.'}</span>
                  <span className="sample-tag">{'Real post · example reply'}</span>
                </div>
                <div className="x-thread">
                  <article
                    className="x-original"
                    aria-label="Elon Musk’s original post from September 12, 2021"
                  >
                    <img
                      className="x-avatar x-photo-avatar"
                      src="/images/elon-avatar.jpg"
                      alt=""
                      width="36"
                      height="36"
                      loading="lazy"
                    />
                    <div className="x-post-body">
                      <div className="x-byline">
                        <a
                          href="https://x.com/elonmusk/status/1437179881260032016"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <strong>{'Elon Musk'}</strong>
                        </a>
                        <span>{'@elonmusk'}</span>
                        <span aria-hidden="true">{'···'}</span>
                      </div>
                      <p>{'Floki has arrived'}</p>
                      <a
                        className="x-real-photo"
                        href="https://x.com/elonmusk/status/1437179881260032016/photo/1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/images/floki-original.jpg"
                          alt="Elon Musk’s original photo of his Shiba Inu puppy Floki resting on a blanket"
                          width="2048"
                          height="1154"
                          loading="lazy"
                        />
                      </a>
                      <a
                        className="x-post-date"
                        href="https://x.com/elonmusk/status/1437179881260032016"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {'10:22 PM · Sep 12, 2021 · View original ↗'}
                      </a>
                      <div className="x-post-actions" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="m2 7 4-4 4 4M6 3v14h9m7 0-4 4-4-4m4 4V7H9"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 21 3 12C-3 4 8-2 12 6c4-8 15-2 9 6Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M5 21V13m7 8V3m7 18V8"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 16V2m-5 5 5-5 5 5M4 14v7h16v-7"></path>
                        </svg>
                      </div>
                    </div>
                  </article>
                  <article
                    className="x-reply x-plain-reply"
                    aria-label="One illustrative nomination reply, not a real X post"
                  >
                    <div className="x-avatar x-you" aria-hidden="true">
                      {'y'}
                    </div>
                    <div className="x-post-body">
                      <div className="x-byline">
                        <strong>{'You'}</strong>
                        <span>{'@you'}</span>
                        <span aria-hidden="true">{'···'}</span>
                      </div>
                      <p className="x-reply-context">
                        {'Replying to '}
                        <span>{'@elonmusk'}</span>
                      </p>
                      <p className="x-tweet-text">
                        <span className="x-mention">{'@RuglessX'}</span>
                        {' Floki ('}
                        <span className="x-cashtag">{'$FLOKI'}</span>
                        {
                          '). Use this puppy’s face as the token image. A memorable name, an instantly recognizable Shiba and a story people already follow. The community can remix his adventures into memes long after this post leaves the timeline.'
                        }
                      </p>
                      <div className="x-post-actions" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="m2 7 4-4 4 4M6 3v14h9m7 0-4 4-4-4m4 4V7H9"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 21 3 12C-3 4 8-2 12 6c4-8 15-2 9 6Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M5 21V13m7 8V3m7 18V8"></path>
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 16V2m-5 5 5-5 5 5M4 14v7h16v-7"></path>
                        </svg>
                      </div>
                    </div>
                  </article>
                </div>
                <figcaption id="x-example-caption">
                  {'A real moment. An example of the case you could make.'}
                  <br />
                  <span className="x-example-source">
                    {'FLOKI began after Elon’s '}
                    <a
                      href="https://x.com/elonmusk/status/1408380216653844480"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {'June 2021 naming post'}
                    </a>
                    {'; this is his later puppy photo. '}
                    <a href="https://floki.com/timeline" target="_blank" rel="noopener noreferrer">
                      {'Read FLOKI’s story ↗'}
                    </a>
                    <br />
                    {
                      'The reply is illustrative. FLOKI was not launched by Rugless; no affiliation or endorsement is implied.'
                    }
                  </span>
                </figcaption>
              </figure>
            </div>
            <div className="participate-note">
              <span className="status-dot"></span>
              <p>
                {
                  'Tag @RuglessX on X with your suggested name, ticker, image idea and thesis to nominate a meme. Make the case for why your community would rally around it.'
                }
              </p>
              <a
                href="https://rugless-vision-plan.violet-rook-3700.chatgpt.site/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'Read what’s being built ↗'}
              </a>
            </div>
          </div>
        </section>
        <section className="wrap section impact" id="impact">
          <div className="section-heading">
            <div>
              <p className="kicker">{'A community that moves things.'}</p>
              <h2>
                {'Your finds.'}
                <br />
                {'Our collective firepower.'}
              </h2>
            </div>
            <p>
              {
                'See what we’re building together, from the memes you nominate to the activity that fuels buybacks.'
              }
            </p>
          </div>
          <div className="stats-toolbar">
            <span className="sample-tag">{'Sample data'}</span>
            <div className="segmented" role="group" aria-label="Statistics time period">
              <button type="button" data-period="day" aria-pressed="false">
                {'24 hours'}
              </button>
              <button type="button" data-period="all" aria-pressed="true">
                {'All time'}
              </button>
            </div>
          </div>
          <div className="stats-grid" aria-live="polite">
            <article>
              <p>{'Memes brought to life'}</p>
              <strong data-stat="launches">{'128'}</strong>
              <span>{'Community-nominated tokens launched'}</span>
            </article>
            <article>
              <p>{'Activity you helped create'}</p>
              <strong data-stat="volume">
                {'48,620 '}
                <small>{'SOL'}</small>
              </strong>
              <span>{'Total trading volume across launches'}</span>
            </article>
            <article>
              <p>{'Momentum per meme'}</p>
              <strong data-stat="average">
                {'379.84 '}
                <small>{'SOL'}</small>
              </strong>
              <span>{'Average volume per launched token'}</span>
            </article>
            <article>
              <p>{'Your voice in the mix'}</p>
              <strong data-stat="mentions">{'3,842'}</strong>
              <span>{'Distinct posts tagging the official account'}</span>
            </article>
          </div>
          <details className="data-note">
            <summary>{'What will these numbers count?'}</summary>
            <p>
              {
                'The live version will count finalized mainnet launches and confirmed buyback burns. Volume will count eligible trades once, across Rugless-launched tokens; the average divides that volume by the launch count for the same window. X activity will count distinct posts tagging the verified official account, deduplicated by post ID. These sample figures are invented for layout review and are not Rugless performance.'
              }
            </p>
          </details>
        </section>
        <section className="wrap section home-discover">
          <div className="section-heading">
            <div>
              <p className="kicker">{'From your timeline to something real.'}</p>
              <h2>
                {'See what the'}
                <br />
                {'community creates.'}
              </h2>
            </div>
            <div>
              <p>
                {
                  'Find the newest Rugless launches, read the AI’s launch thesis, follow the original idea and check the burn.'
                }
              </p>
              <a className="button primary" href="/app">
                {'Discover the memes '}
                <span aria-hidden="true">{'↗'}</span>
              </a>
            </div>
          </div>
          <a
            className="launch-feature"
            href="https://rugless-the-end-of-the-rug.violet-rook-3700.chatgpt.site/memes/buckle/"
          >
            <img
              src="/assets/buckle.png"
              alt="Buckle, the rolled-up Rugless rug mascot"
              width="100"
              height="100"
            />
            <div>
              <span className="network-badge">{'Devnet proof'}</span>
              <h3>{'Meet Buckle. The first proof.'}</h3>
              <p>{'A real create, buy and full-burn test. Explore the receipt.'}</p>
            </div>
            <span aria-hidden="true">{'↗'}</span>
          </a>
          <p className="plain-note">
            {'No mainnet launches are published yet. Devnet tokens have no monetary value.'}
          </p>
        </section>
        <section className="section why" id="why">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="kicker">{'You deserve better than “Trust me bro”.'}</p>
                <h2>
                  {'You know this chart.'}
                  <br />
                  {'Let’s change the ending.'}
                </h2>
              </div>
              <p>
                {
                  'You spot the momentum. You buy. Then someone dumps a hidden stash and your balance disappears. You shouldn’t have to go through that again. Start with a launch whose initial allocation is burned—and proof you can check.'
                }
              </p>
            </div>
            <figure className="rug-chart" id="rug-chart" aria-labelledby="rug-chart-title">
              <div className="rug-chart-head">
                <div>
                  <span className="kicker" id="rug-chart-title">
                    {'The exit you didn’t see coming.'}
                  </span>
                  <p>{'Same tokens. Almost nothing left.'}</p>
                </div>
                <button type="button" id="rug-chart-toggle" aria-pressed="false">
                  {'Ⅱ Pause animation'}
                </button>
              </div>
              <div className="rug-position position-unfilled" aria-hidden="true">
                <div>
                  <span>{'Position value'}</span>
                  <strong id="rug-position-value">
                    {'$3'}
                    <span>{'.00'}</span>
                  </strong>
                </div>
                <span className="rug-loss" id="rug-loss">
                  {'−99.7%'}
                </span>
              </div>
              <svg viewBox="0 0 720 455" role="img" aria-labelledby="rug-svg-title rug-svg-desc">
                <title id="rug-svg-title">{'Buying the peak before a rug pull'}</title>
                <desc id="rug-svg-desc">
                  {
                    'An illustrative price chart pumps upward. A green plus marks your purchase at the peak. One huge red candle collapses almost to zero, leaving an example $1,000 position worth $3.'
                  }
                </desc>
                <g className="rug-grid" stroke="#273027" strokeDasharray="3 7">
                  <path d="M30 95H690M30 165H690M30 235H690M30 305H690"></path>
                </g>
                <text x="33" y="336" className="rug-axis">
                  {'THE HYPE'}
                </text>
                <text x="582" y="336" className="rug-axis">
                  {'THE EXIT'}
                </text>
                <g className="pump-candle" data-step="0" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M52 262V294" strokeWidth="2"></path>
                  <rect x="43" y="271" width="18" height="13" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="1" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M89 250V281" strokeWidth="2"></path>
                  <rect x="80" y="259" width="18" height="12" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="2" stroke="#e78474" fill="#e78474">
                  <path d="M126 250V274" strokeWidth="2"></path>
                  <rect x="117" y="259" width="18" height="5" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="3" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M163 228V274" strokeWidth="2"></path>
                  <rect x="154" y="237" width="18" height="27" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="4" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M200 208V247" strokeWidth="2"></path>
                  <rect x="191" y="217" width="18" height="20" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="5" stroke="#e78474" fill="#e78474">
                  <path d="M237 208V234" strokeWidth="2"></path>
                  <rect x="228" y="217" width="18" height="7" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="6" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M274 182V234" strokeWidth="2"></path>
                  <rect x="265" y="191" width="18" height="33" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="7" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M311 146V201" strokeWidth="2"></path>
                  <rect x="302" y="155" width="18" height="36" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="8" stroke="#e78474" fill="#e78474">
                  <path d="M348 146V173" strokeWidth="2"></path>
                  <rect x="339" y="155" width="18" height="8" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="9" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M385 115V173" strokeWidth="2"></path>
                  <rect x="376" y="124" width="18" height="39" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="10" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M422 78V134" strokeWidth="2"></path>
                  <rect x="413" y="87" width="18" height="37" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="11" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M459 56V97" strokeWidth="2"></path>
                  <rect x="450" y="65" width="18" height="22" rx="1" stroke="none"></rect>
                </g>
                <g className="pump-candle" data-step="12" stroke="#b9ff66" fill="#b9ff66">
                  <path d="M496 44V75" strokeWidth="2"></path>
                  <rect x="487" y="53" width="18" height="12" rx="1" stroke="none"></rect>
                </g>
                <g id="rug-buy-marker">
                  <path d="M496 37V48" stroke="#b9ff66" strokeDasharray="2 3"></path>
                  <rect x="420" y="3" width="148" height="33" rx="5" fill="#b9ff66"></rect>
                  <text
                    x="494"
                    y="26"
                    textAnchor="middle"
                    fill="#14200e"
                    fontSize="18"
                    fontWeight="700"
                  >
                    {'+ You bought'}
                  </text>
                </g>
                <g id="rug-collapse" fill="#ff665e" stroke="#ff665e">
                  <path id="rug-red-wick" d="M548 43V307" strokeWidth="2"></path>
                  <rect
                    id="rug-red-body"
                    x="533"
                    y="53"
                    width="30"
                    height="249"
                    rx="1"
                    stroke="none"
                  ></rect>
                </g>
                <g id="rug-aftermath" fill="#ff665e" stroke="#ff665e">
                  <path d="M592 297V309M629 299V310M666 300V309" strokeWidth="2"></path>
                  <rect x="583" y="301" width="18" height="4"></rect>
                  <rect x="620" y="303" width="18" height="3"></rect>
                  <rect x="657" y="304" width="18" height="2"></rect>
                  <path d="M566 305H690" strokeDasharray="3 5" opacity=".5"></path>
                </g>
              </svg>
              <figcaption>
                <span id="rug-stage" aria-live="off">
                  {'The stash is sold. You’re left holding the loss.'}
                </span>
                <span>{'Illustrative scenario'}</span>
              </figcaption>
            </figure>
            <div className="benefits">
              <article>
                <div className="ascii-mark" aria-hidden="true">
                  {'[ ∅ ]'}
                </div>
                <h3>
                  {'One less wallet'}
                  <br />
                  {'to worry about.'}
                </h3>
                <p>
                  {
                    'The entire initial allocation Rugless buys in a community launch is burned. That takes that stash off the table before a launch earns its verified status.'
                  }
                </p>
              </article>
              <article>
                <div className="ascii-mark" aria-hidden="true">
                  {'[ ↻ ]'}
                </div>
                <h3>
                  {'Your community’s activity'}
                  <br />
                  {'works for the ecosystem.'}
                </h3>
                <p>
                  {
                    'Net creator fees from launched memes go toward buying $RUGLESS and burning it. The community creates the momentum. You can see where it goes.'
                  }
                </p>
              </article>
              <article>
                <div className="ascii-mark" aria-hidden="true">
                  {'[ ↗ ]'}
                </div>
                <h3>
                  {'Check the story.'}
                  <br />
                  {'Then check the receipts.'}
                </h3>
                <p>
                  {
                    'See the original post, what was spent, what was burned and which permissions were checked. Make your own call with evidence in front of you.'
                  }
                </p>
              </article>
            </div>
            <p className="plain-note">
              {
                'Burning the initial allocation removes one creator-side risk; prices can still fall and other holders can sell.'
              }
            </p>
          </div>
        </section>
        <section className="wrap section" id="flywheel">
          <div className="section-heading">
            <div>
              <p className="kicker">{'Follow every step.'}</p>
              <h2>
                {'Your memes feed'}
                <br />
                {'the fire.'}
              </h2>
            </div>
            <p>
              {
                'A good idea can become more than a moment on your timeline. Here’s how community launches are designed to feed $RUGLESS buybacks.'
              }
            </p>
          </div>
          <div className="complete-flywheel" role="group" aria-label="Full planned flow of funds">
            <div className="complete-flow-head">
              <div>
                <h3>{'Follow the fees.'}</h3>
                <p>
                  {
                    '$RUGLESS creator fees help new memes launch and existing communities keep going. Net meme creator fees separately buy back and burn $RUGLESS.'
                  }
                </p>
              </div>
              <button id="flow-toggle" type="button" aria-pressed="false">
                {'Ⅱ Pause animation'}
              </button>
            </div>
            <div className="flow-key">
              <span>
                <b aria-hidden="true">{'[+]'}</b>
                {' SOL moving through the ecosystem'}
              </span>
              <span>
                <b aria-hidden="true">{'[#]'}</b>
                {' Purchased tokens moving to burn'}
              </span>
            </div>
            <svg
              className="fee-svg fee-svg-desktop"
              viewBox="0 0 960 650"
              role="img"
              aria-labelledby="ff-d-title ff-d-desc"
            >
              <title id="ff-d-title">
                {'New launches. Existing communities. One shared pool.'}
              </title>
              <desc id="ff-d-desc">
                {
                  'RUGLESS creator fees split 75 percent to the Community Pool and 25 percent to team and operations. Half of the pool funds new launches and half buys back existing tokens with top community activity or a need for chart support. Each half is 37.5 percent of total RUGLESS creator fees. Net meme creator fees separately buy back and burn RUGLESS.'
                }
              </desc>
              <defs>
                <marker
                  id="ff-d-arrow"
                  markerWidth="9"
                  markerHeight="9"
                  refX="7"
                  refY="4"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M0 0L8 4L0 8" fill="none" stroke="#6c9256" strokeWidth="2"></path>
                </marker>
              </defs>
              <path className="ff-pipe" d="M292 105H373" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="319" y="85">
                {'75%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M292 105H373"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M292 105H373"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M160 172V258" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="174" y="220">
                {'25%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M160 172V258"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M160 172V258"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M608 105H689" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="628" y="85">
                {'50%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M608 105H689"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M608 105H689"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M493 172V258" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="506" y="220">
                {'50% of pool'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M493 172V258"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M493 172V258"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M813 172V258" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="825" y="220">
                {'Trading fees'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M813 172V258"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M813 172V258"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M608 335H689" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="628" y="315">
                {'Fees'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M608 335H689"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M608 335H689"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M813 410V550H613" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="718" y="525">
                {'100% net'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M813 410V550H613"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M813 410V550H613"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M378 550H298" markerEnd="url(#ff-d-arrow)"></path>
              <text className="ff-label" x="319" y="530">
                {'Burn'}
              </text>
              <g className="ff-packet ff-burn-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'#'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M378 550H298"
                ></animateMotion>
              </g>
              <g className="ff-packet ff-burn-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'#'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M378 550H298"
                ></animateMotion>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="28"
                  y="32"
                  width="264"
                  height="140"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="44" y="59">
                  {'[$]'}
                </text>
                <text className="ff-title" x="44" y="84">
                  {'$RUGLESS trading'}
                </text>
                <text className="ff-sub" x="44" y="154">
                  {'Creator fees received in SOL'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-pool"
                  x="378"
                  y="32"
                  width="230"
                  height="140"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="394" y="59">
                  {'[+]'}
                </text>
                <text className="ff-title" x="394" y="84">
                  {'Community Pool'}
                </text>
                <text className="ff-sub" x="394" y="154">
                  {'75% of $RUGLESS creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="694"
                  y="32"
                  width="238"
                  height="140"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="710" y="59">
                  {'[:)]'}
                </text>
                <text className="ff-title" x="710" y="84">
                  {'Launch new memes'}
                </text>
                <text className="ff-sub" x="710" y="139">
                  {'50% of pool · 37.5% of fees'}
                </text>
                <text className="ff-sub" x="710" y="154">
                  {'Initial purchased tokens burned'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-team"
                  x="28"
                  y="264"
                  width="264"
                  height="146"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="44" y="291">
                  {'[: ]'}
                </text>
                <text className="ff-title" x="44" y="316">
                  {'Team & operations'}
                </text>
                <text className="ff-sub" x="44" y="392">
                  {'25% of $RUGLESS creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-pool"
                  x="378"
                  y="264"
                  width="230"
                  height="146"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="394" y="291">
                  {'[↗]'}
                </text>
                <text className="ff-title" x="394" y="316">
                  {'Buy back existing memes'}
                </text>
                <text className="ff-sub" x="394" y="377">
                  {'50% of pool · 37.5% of fees'}
                </text>
                <text className="ff-sub" x="394" y="392">
                  {'Top activity or chart support'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="694"
                  y="264"
                  width="238"
                  height="146"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="710" y="291">
                  {'[=]'}
                </text>
                <text className="ff-title" x="710" y="316">
                  {'Meme creator fees'}
                </text>
                <text className="ff-sub" x="710" y="377">
                  {'From trading in launched memes'}
                </text>
                <text className="ff-sub" x="710" y="392">
                  {'Less direct execution costs'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="378"
                  y="490"
                  width="230"
                  height="124"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="394" y="517">
                  {'[$]'}
                </text>
                <text className="ff-title" x="394" y="542">
                  {'Buy $RUGLESS'}
                </text>
                <text className="ff-sub" x="394" y="596">
                  {'100% of net meme creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-burn"
                  x="28"
                  y="490"
                  width="264"
                  height="124"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="44" y="517">
                  {'[#]'}
                </text>
                <text className="ff-title" x="44" y="542">
                  {'$RUGLESS burned'}
                </text>
                <text className="ff-sub" x="44" y="596">
                  {'Every token bought is burned'}
                </text>
              </g>
            </svg>
            <svg
              className="fee-svg fee-svg-mobile"
              viewBox="0 0 360 1225"
              role="img"
              aria-labelledby="ff-m-title ff-m-desc"
            >
              <title id="ff-m-title">
                {'New launches. Existing communities. One shared pool.'}
              </title>
              <desc id="ff-m-desc">
                {
                  'RUGLESS creator fees split 75 percent to the Community Pool and 25 percent to team and operations. Half of the pool funds new launches and half buys back existing tokens with top community activity or a need for chart support. Each half is 37.5 percent of total RUGLESS creator fees. Net meme creator fees separately buy back and burn RUGLESS.'
                }
              </desc>
              <defs>
                <marker
                  id="ff-m-arrow"
                  markerWidth="9"
                  markerHeight="9"
                  refX="7"
                  refY="4"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M0 0L8 4L0 8" fill="none" stroke="#6c9256" strokeWidth="2"></path>
                </marker>
              </defs>
              <path className="ff-pipe" d="M180 140V168H92V196" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="48" y="178">
                {'75%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M180 140V168H92V196"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M180 140V168H92V196"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M180 168H270V196" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="278" y="178">
                {'25%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M180 168H270V196"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M180 168H270V196"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M92 350V416" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="44" y="391">
                {'50%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M92 350V416"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M92 350V416"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M92 383H270V416" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="278" y="402">
                {'50%'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M92 383H270V416"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M92 383H270V416"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M92 600V655H180V696" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="0" y="0"></text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M92 600V655H180V696"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M92 600V655H180V696"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M270 600V655H180" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="112" y="635">
                {'Trading fees'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M270 600V655H180"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M270 600V655H180"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M180 828V886" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="195" y="863">
                {'100% net'}
              </text>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M180 828V886"
                ></animateMotion>
              </g>
              <g className="ff-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'+'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M180 828V886"
                ></animateMotion>
              </g>
              <path className="ff-pipe" d="M180 1018V1076" markerEnd="url(#ff-m-arrow)"></path>
              <text className="ff-label" x="195" y="1055">
                {'Burn'}
              </text>
              <g className="ff-packet ff-burn-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'#'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-0.0s"
                  repeatCount="indefinite"
                  path="M180 1018V1076"
                ></animateMotion>
              </g>
              <g className="ff-packet ff-burn-packet" aria-hidden="true">
                <rect x="-8" y="-8" width="16" height="16" rx="2"></rect>
                <text textAnchor="middle" y="4">
                  {'#'}
                </text>
                <animateMotion
                  dur="5s"
                  begin="-2.5s"
                  repeatCount="indefinite"
                  path="M180 1018V1076"
                ></animateMotion>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="25"
                  y="20"
                  width="310"
                  height="120"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="41" y="47">
                  {'[$]'}
                </text>
                <text className="ff-title" x="41" y="72">
                  {'$RUGLESS trading'}
                </text>
                <text className="ff-sub" x="41" y="122">
                  {'Creator fees received in SOL'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-pool"
                  x="10"
                  y="200"
                  width="164"
                  height="150"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="26" y="227">
                  {'[+]'}
                </text>
                <text className="ff-title" x="26" y="252">
                  {'Community Pool'}
                </text>
                <text className="ff-sub" x="26" y="317">
                  {'75% of total'}
                </text>
                <text className="ff-sub" x="26" y="332">
                  {'creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-team"
                  x="190"
                  y="200"
                  width="160"
                  height="150"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="206" y="227">
                  {'[: ]'}
                </text>
                <text className="ff-title" x="206" y="252">
                  {'Team &'}
                </text>
                <text className="ff-title" x="206" y="270">
                  {'operations'}
                </text>
                <text className="ff-sub" x="206" y="317">
                  {'25% of total'}
                </text>
                <text className="ff-sub" x="206" y="332">
                  {'creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="10"
                  y="420"
                  width="164"
                  height="180"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="26" y="447">
                  {'[:)]'}
                </text>
                <text className="ff-title" x="26" y="472">
                  {'Launch new'}
                </text>
                <text className="ff-title" x="26" y="490">
                  {'memes'}
                </text>
                <text className="ff-sub" x="26" y="552">
                  {'50% of pool'}
                </text>
                <text className="ff-sub" x="26" y="567">
                  {'37.5% of total fees'}
                </text>
                <text className="ff-sub" x="26" y="582">
                  {'Initial buy burned'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-pool"
                  x="190"
                  y="420"
                  width="160"
                  height="180"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="206" y="447">
                  {'[↗]'}
                </text>
                <text className="ff-title" x="206" y="472">
                  {'Buy back'}
                </text>
                <text className="ff-title" x="206" y="490">
                  {'existing memes'}
                </text>
                <text className="ff-sub" x="206" y="552">
                  {'50% of pool'}
                </text>
                <text className="ff-sub" x="206" y="567">
                  {'37.5% of total fees'}
                </text>
                <text className="ff-sub" x="206" y="582">
                  {'Activity / support'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="25"
                  y="700"
                  width="310"
                  height="128"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="41" y="727">
                  {'[=]'}
                </text>
                <text className="ff-title" x="41" y="752">
                  {'Meme creator fees'}
                </text>
                <text className="ff-sub" x="41" y="795">
                  {'From trading in launched memes'}
                </text>
                <text className="ff-sub" x="41" y="810">
                  {'Less direct execution costs'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-"
                  x="25"
                  y="890"
                  width="310"
                  height="128"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="41" y="917">
                  {'[$]'}
                </text>
                <text className="ff-title" x="41" y="942">
                  {'Buy $RUGLESS'}
                </text>
                <text className="ff-sub" x="41" y="1000">
                  {'100% of net meme creator fees'}
                </text>
              </g>
              <g>
                <rect
                  className="ff-node ff-node-burn"
                  x="25"
                  y="1080"
                  width="310"
                  height="128"
                  rx="14"
                ></rect>
                <text className="ff-ascii-icon" x="41" y="1107">
                  {'[#]'}
                </text>
                <text className="ff-title" x="41" y="1132">
                  {'$RUGLESS burned'}
                </text>
                <text className="ff-sub" x="41" y="1190">
                  {'Every token bought is burned'}
                </text>
              </g>
            </svg>
            <div className="complete-flow-foot">
              <p>
                <strong>{'75% of $RUGLESS creator fees goes to the Community Pool.'}</strong>
                {
                  ' Half funds new launches; half buys back existing tokens. Each half is 37.5% of total creator fees, not trading volume. The team’s 25% comes only from $RUGLESS fees. There’s no second team cut from meme fees and no direct SOL payout to holders.'
                }
              </p>
              <p>
                <strong>{'Support follows the community.'}</strong>
                {
                  ' Existing-token buybacks target top community activity or tokens in need of chart support. Social activity carries more weight than trading volume, so active communities with quieter charts can receive support.'
                }
              </p>
              <p>
                {
                  'Net fees deduct direct collection, swap and burn costs. Initial meme-allocation burns and $RUGLESS buyback burns are separate. Animation explains the flow of funds; packet sizes do not represent amounts.'
                }
              </p>
            </div>
          </div>
          <div className="projection" id="projection">
            <div className="projection-intro">
              <div>
                <p className="kicker">{'Small fees. A growing collective.'}</p>
                <h3>
                  {'See how the buybacks'}
                  <br />
                  {'could build.'}
                </h3>
              </div>
              <span className="sample-tag">{'Interactive scenario · not a forecast'}</span>
            </div>
            <p>
              {
                'Each new launch adds another potential fee stream. Earlier launches can keep contributing as their trading fades. Explore what that adds up to over 90 days.'
              }
            </p>
            <div className="controls">
              <div>
                <label htmlFor="model-tokens">
                  {'Community launches per day '}
                  <output id="model-tokens-out">{'5'}</output>
                </label>
                <input id="model-tokens" type="range" min="0" max="50" step="1" defaultValue="5" />
                <small>{'Constant daily launches, starting from zero.'}</small>
              </div>
              <div>
                <label htmlFor="model-percentile">
                  {'Trading activity '}
                  <output id="model-percentile-out">{'P50'}</output>
                </label>
                <input
                  id="model-percentile"
                  type="range"
                  min="5"
                  max="95"
                  step="1"
                  defaultValue="50"
                />
                <small id="volume-assumption">
                  {'$316,228 first-day volume per active token.'}
                </small>
              </div>
            </div>
            <div className="conversion">
              <div>
                <span>{'Current SOL price'}</span>
                <strong id="sol-price">{'Loading…'}</strong>
                <button id="refresh-price" type="button">
                  {'Refresh ↻'}
                </button>
                <p id="price-status" role="status">
                  {'Fetching SOL/USD from Coinbase.'}
                </p>
              </div>
              <p>
                {'Low-volume tokens start at $10k/day; active-token P5 is $10k and P95 is $10m.'}
              </p>
            </div>
            <div className="chart-heading">
              <div>
                <h4 id="chart-heading">{'Daily buyback spending'}</h4>
                <p>{'Each layer adds fees from another month of launches.'}</p>
              </div>
              <div className="segmented" role="group" aria-label="Chart view">
                <button data-chart="daily" aria-pressed="true">
                  {'Daily'}
                </button>
                <button data-chart="cumulative" aria-pressed="false">
                  {'Cumulative'}
                </button>
              </div>
            </div>
            <div className="chart-legend">
              <span>
                <i style={{ '--key': '#b9ff66' } as React.CSSProperties}></i>
                {'Days 1–30 launches'}
              </span>
              <span>
                <i style={{ '--key': '#6caa55' } as React.CSSProperties}></i>
                {'Days 31–60'}
              </span>
              <span>
                <i style={{ '--key': '#365c42' } as React.CSSProperties}></i>
                {'Days 61–90'}
              </span>
            </div>
            <svg
              id="model-chart"
              viewBox="0 0 1000 310"
              role="img"
              aria-labelledby="model-chart-title model-chart-desc"
            ></svg>
            <p id="model-readout" className="chart-readout" aria-live="polite"></p>
            <div className="results" aria-live="polite">
              <div>
                <span>{'Day 90 buyback spending'}</span>
                <strong id="model-end">
                  {'— '}
                  <small>{'SOL/day'}</small>
                </strong>
                <span className="usd-equivalent" id="model-end-usd"></span>
              </div>
              <div>
                <span>{'Total buyback spending'}</span>
                <strong id="model-total">
                  {'— '}
                  <small>{'SOL'}</small>
                </strong>
                <span className="usd-equivalent" id="model-total-usd"></span>
              </div>
              <div>
                <span>{'Community launches'}</span>
                <strong id="model-launches">{'450'}</strong>
              </div>
            </div>
            <details className="assumptions">
              <summary>{'Open the assumptions. Make up your own mind.'}</summary>
              <p>
                {
                  'This uses the internal plan’s cohort structure with owner-supplied USD volume assumptions: 2.69% active tokens, with graduation used as a proxy rather than a measured survival rate. The remaining 97.31% start at $10,000 of daily volume, halving every 0.25 days. Active-token first-day volume ranges from P5 = $10,000 to P95 = $10,000,000 on an assumed lognormal curve; P50 (the median, not the mean) is approximately $316,228. Volume is converted to SOL using the latest fetched Coinbase SOL/USD spot quote, refreshed every minute while the page is visible. The scenario applies that one quote across all 90 days; it does not predict future exchange rates. SOL totals change with the quote; dollar buyback budgets stay the same. If a refresh fails, the last successful quote is explicitly marked.'
                }
              </p>
              <p>
                {
                  'For active tokens, 80% of initial volume halves every 3 days and 20% every 30 days. The model holds creator-fee rates at 0.95% for active tokens and 0.30% for flops, with a 1% execution allowance. These are modeling inputs carried over from the plan, not a promise of current or future fees. Launch funding is assumed available. Receipts are assumed collected and spent on the same day.'
                }
              </p>
              <p>
                {
                  'Daily buyback budget = 99% × the sum of each launch cohort’s modeled creator fees at its current age. Cumulative spending adds those daily budgets. Fractional active-token counts describe an expected-value scenario. There is no assumption that selection improves the base rate.'
                }
              </p>
              <p>
                {
                  'This does not predict price gains or tokens burned. It omits changing fee tiers, funding limits, liquidity, fee collection delays and migration costs. Every month uses the same selected activity percentile; this is a scenario, not a simulated portfolio or a confidence interval.'
                }
              </p>
              <p>
                <a
                  href="https://rugless-vision-plan.violet-rook-3700.chatgpt.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {'Read the original model structure ↗'}
                </a>
                {' · '}
                <a href="https://pump.fun/docs/fees" target="_blank" rel="noopener noreferrer">
                  {'Check the venue’s fee schedule ↗'}
                </a>
              </p>
            </details>
          </div>
        </section>
        <section className="wrap section faq" id="questions">
          <div>
            <p className="kicker">{'Fair questions.'}</p>
            <h2>
              {'Trust is earned.'}
              <br />
              {'Question everything.'}
            </h2>
          </div>
          <div>
            <details>
              <summary>{'Can I still lose money?'}</summary>
              <p>
                {
                  'Yes. Meme tokens are volatile. Burning Rugless’s initial allocation removes that particular sellable stash; it does not stop other holders selling, guarantee demand or protect the price. Check the evidence and decide what risk you can take.'
                }
              </p>
            </details>
            <details>
              <summary>{'What do I get from holding $RUGLESS?'}</summary>
              <p>
                {
                  'Ecosystem activity funds market purchases and permanent burns of $RUGLESS. There are no direct SOL payouts. Buybacks depend on actual captured fees, and neither income nor price increases are guaranteed.'
                }
              </p>
            </details>
            <details>
              <summary>{'How will I know a burn actually happened?'}</summary>
              <p>
                {
                  'The production experience is designed to link every confirmed burn to its on-chain transaction, amount and resulting balance. Buybacks and completed burns will be reported separately, so a purchase is never presented as a finished burn.'
                }
              </p>
            </details>
            <details>
              <summary>{'Does tagging a meme guarantee a launch?'}</summary>
              <p>
                {
                  'No. A detailed thesis increases the odds of selection by explaining why the post deserves to become a coin. Suggest a token name, ticker and image, then explain what makes it memorable, why it matters now and who will keep the meme alive. These are suggestions for review, not reservations or guaranteed launch details. Evidence, duplicate narratives, available funds and execution checks still matter. A nomination does not guarantee a launch. Nominator rewards are a future roadmap proposal, not currently available.'
                }
              </p>
            </details>
          </div>
        </section>
        <section className="wrap section open-source" id="open-source">
          <div>
            <p className="kicker">{'Open source. Open to you.'}</p>
            <h2>
              {'Don’t just trust the code.'}
              <br />
              {'Help make it better.'}
            </h2>
          </div>
          <div>
            <p>
              {
                'All Rugless code is intended to be open source, with contributions welcome from the community. Inspect the logic, challenge the decisions, test what’s next and help build the project you want to use.'
              }
            </p>
            <p>
              {
                'Core changes will go through staging and a minimum 72-hour community review before production. Only site content can skip that review.'
              }
            </p>
            <a className="button secondary" href="/roadmap/#product-phases">
              {'Explore the roadmap ↗'}
            </a>
            <a className="text-link" href="/roadmap/#release-policy">
              {'Read the release policy ↗'}
            </a>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <p>{'We’ve had enough of rugs. You have too.'}</p>
            <h2>
              {'It’s Rugless'}
              <br />
              {'or nothing.'}
            </h2>
            <a className="button primary" href="#participate">
              {'Be part of a different ending '}
              <span aria-hidden="true">{'↗'}</span>
            </a>
            <span className="closing-caption">
              {'Your memes. Your community. Proof you can follow.'}
            </span>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <div>
          <a className="brand" href="/">
            <img className="brand-logo" src="/brand/logo.svg" alt="" width="42" height="34" />
            {'rugless'}
          </a>
          <span>{'The end of the rug.'}</span>
        </div>
        <div>
          <a href="#flywheel">{'The economics'}</a>
          <a href="#questions">{'Your questions'}</a>
          <a
            href="https://rugless-vision-plan.violet-rook-3700.chatgpt.site/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'The plan ↗'}
          </a>
        </div>
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
