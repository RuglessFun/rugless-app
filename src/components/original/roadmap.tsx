'use client';
import { useEffect, useRef } from 'react';
import { mountOriginalChrome } from '@/lib/original/chrome';
import { RoadmapFeatures } from './roadmap-features';
export function OriginalRoadmap() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? mountOriginalChrome(root.current) : undefined), []);
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
        <section className="wrap page-intro">
          <p className="kicker">{'A different ending takes real work.'}</p>
          <h1>
            {'Built in public.'}
            <br />
            {'Proved step by step.'}
          </h1>
          <p>
            {
              'See where your ideas can take Rugless. Follow each feature from public code review to staging, a 72-hour community review window and production.'
            }
          </p>
          <div className="page-notice">
            <span className="status-dot"></span>
            {' Development stage · Updated 26 October 2026 · Milestones, not promised dates.'}
          </div>
          <nav className="roadmap-jumps" aria-label="Roadmap sections">
            <a href="#product-phases">{'The roadmap'}</a>
            <a href="#release-policy">{'72-hour review'}</a>
            <a href="#open-source">{'Contribute'}</a>
          </nav>
        </section>
        <section className="wrap section roadmap-expansion" id="product-phases">
          <div className="section-heading">
            <div>
              <p className="kicker">{'Five phases. Work you can follow.'}</p>
              <h2>
                {'One roadmap.'}
                <br />
                {'Built together.'}
              </h2>
            </div>
            <p>
              {
                'Five phases take us from a verified Devnet burn to community nominations, social-first support, rewards, autonomous discovery and takeovers. Each feature keeps its own evidence and release status.'
              }
            </p>
          </div>
          <div className="roadmap-demo-note">
            <strong>{'Follow the work. Shape what comes next.'}</strong>
            <p>
              {
                'Explore the evidence behind each milestone, from code review through staging and production. Every status is tracked separately.'
              }
            </p>
          </div>
          <RoadmapFeatures />
        </section>
        <section className="wrap section open-source" id="open-source">
          <div>
            <p className="kicker">{'Open source. Open to you.'}</p>
            <h2>
              {'Help build the code.'}
              <br />
              {'Help shape the rules.'}
            </h2>
          </div>
          <div>
            <p>
              {
                'All Rugless code is intended to be open source and open to community contributions. You’ll be able to inspect how it works, propose changes, test releases and contribute code, docs or research.'
              }
            </p>
            <p className="repo-pending">
              <a href="https://github.com/RuglessFun/rugless-app">
                {'Explore the code and contribute on GitHub ↗'}
              </a>
            </p>
            <a className="text-link" href="#release-policy">
              {'See how your review shapes a release ↓'}
            </a>
          </div>
        </section>
        <section className="wrap section release-policy" id="release-policy">
          <div className="section-heading">
            <div>
              <p className="kicker">{'Your review comes before release.'}</p>
              <h2>
                {'72 hours to inspect.'}
                <br />
                {'No silent core upgrades.'}
              </h2>
            </div>
            <p>
              {'The 72-hour review clock is a minimum wait, never automatic permission to deploy.'}
            </p>
          </div>
          <ol className="release-stages">
            <li>
              <h3>{'Open the change.'}</h3>
              <p>
                {
                  'Every functionality PR links its roadmap feature, explains the impact and supplies tests, risks and rollback instructions. The community can discuss it while it is open.'
                }
              </p>
            </li>
            <li>
              <h3>{'Prove it on staging.'}</h3>
              <p>
                {
                  'After merge, freeze a release candidate and publish its exact commit, build artifact, staging URL and test evidence. Production stays unchanged.'
                }
              </p>
            </li>
            <li>
              <h3>{'Open a 72-hour review.'}</h3>
              <p>
                {
                  'Start the clock only when the candidate and evidence are publicly available. Token holders and the wider community can test, comment and raise blocking issues. Any candidate change restarts staging checks and the full window.'
                }
              </p>
            </li>
            <li>
              <h3>{'Resolve and approve.'}</h3>
              <p>
                {
                  'Address every blocking issue in a public review log. Require an accountable community reviewer and an independent release approver; authors cannot approve their own release. Reviewer selection and quorum still need agreement.'
                }
              </p>
            </li>
            <li>
              <h3>{'Release the reviewed build.'}</h3>
              <p>
                {
                  'Promote only the exact reviewed artifact after the timelock, approvals and checks pass. Publish the deployment receipt and monitor it. A merge alone never means “live”.'
                }
              </p>
            </li>
          </ol>
          <div className="policy-split">
            <article>
              <h3>{'Content can move faster.'}</h3>
              <p>
                {
                  'Copy, editorial roadmap text and imagery may be updated without the community review gate. Content-only changes must be isolated and cannot alter executable code, scripts, dependencies, signing, contracts, feature status evidence or permissions.'
                }
              </p>
            </article>
            <article>
              <h3>{'Functionality must be reviewed.'}</h3>
              <p>
                {
                  'Contracts, tokenomics, trading, rewards, scoring, custody, data collection, wallet flows and functional website changes all require review. A mixed PR follows the core process. No admin bypass for a new core build.'
                }
              </p>
            </article>
          </div>
          <details className="policy-detail">
            <summary>{'How this becomes an enforced release gate'}</summary>
            <p>
              {
                'Connect the public repository, protected branches and protected staging/production environments. Keep deployment credentials behind the production gate, record the reviewed commit and artifact digest, enforce the 72-hour minimum, and verify independent approvals plus resolved blockers. Contract upgrades and treasury authority need corresponding on-chain timelocks and control design; a website countdown is not enforcement.'
              }
            </p>
            <p>
              {
                'Pre-approved pause actions may stop harm without shipping new code. Fixes, unreviewed rollbacks and unpausing follow the published review policy. Select reviewer membership, dispute resolution and emergency operating rules with the community before enabling production.'
              }
            </p>
            <p>
              {
                'Track code completion separately from deployment. Every milestone should link its PR, merge commit, community review and staging or production receipt. Missing, failed or rolled-back evidence must remain visible.'
              }
            </p>
          </details>
        </section>
        <section className="wrap section">
          <h2>{'Bring the next good idea.'}</h2>
          <p className="section-copy">
            {
              'You can help shape what comes next. Reply beneath the original meme, tag @RuglessX on X, suggest a token name, ticker and image, and include your thesis: why this post should become a coin, why now and who would rally around it. A detailed case increases its chances of selection.'
            }
          </p>
          <a
            className="button primary"
            href="https://x.com/RuglessX"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Find @RuglessX on X ↗'}
          </a>
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
          <a href="/app">{'Discover'}</a>
          <a href="/roadmap/">{'Roadmap'}</a>
          <a href="https://x.com/RuglessX" target="_blank" rel="noopener noreferrer">
            {'@RuglessX ↗'}
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
