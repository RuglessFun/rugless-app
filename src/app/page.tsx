import Link from 'next/link';
import { MarketingNav, MarketingFooter } from '@/components/marketing-nav';
import { AsciiFire } from '@/components/ascii-fire';
import { Flywheel } from '@/components/flywheel';
import { RugChart } from '@/components/rug-chart';
import { BuybackModel } from '@/components/buyback-model';
export default function Home() {
  return (
    <>
      <MarketingNav />
      <main id="main">
        <section className="hero">
          <AsciiFire />
          <div>
            <p className="eyebrow">For everyone who’s had enough.</p>
            <h1>
              The end
              <br />
              of the rug.
            </h1>
            <p>
              Find a meme. Tag <strong>@RuglessX</strong> on X beneath the original post. Pitch a
              name, ticker and image idea. Tell us why it deserves to exist.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#participate">
                Hunt down new memes ↗
              </a>
              <Link className="quiet-button" href="/app">
                Explore the app
              </Link>
            </div>
          </div>
          <div className="burn-count">
            <strong>—</strong>RUGLESS burned · verified on-chain receipts
          </div>
          <span className="hero-ca">RUGLESS CA · not assigned</span>
        </section>
        <section className="manifesto">
          <p>
            The meme coin meta in 2026 is an absolute mess. We’re sick of rugs, scams and watching
            our money disappear.
          </p>
          <p>
            <strong>
              This is the end of the line. This is the last honest meme coin.
              <br />
              This is the final chance to restore trust.
            </strong>
          </p>
          <p>
            This is all we’ve got. We’re all in. Meme culture is poison.
            <br />
            This is the antidote. Spread the cure.
          </p>
          <h2>It’s Rugless or nothing.</h2>
        </section>
        <section id="participate" className="marketing-section nomination-section">
          <div>
            <p className="eyebrow">You don’t need to build a token.</p>
            <h2>
              Just know a good
              <br />
              meme when
              <br />
              you see one.
            </h2>
            <p>
              Your timeline is full of moments worth sharing. Help the community find the ones worth
              rallying around.
            </p>
            <ol>
              <li>Find the original post.</li>
              <li>Reply with @RuglessX.</li>
              <li>Suggest a name, ticker and image.</li>
              <li>Tell us why this meme, and why now.</li>
            </ol>
            <p>
              A thoughtful, detailed thesis helps your nomination stand out. Give the community a
              reason to believe in it.
            </p>
            <a className="primary-button" href="https://x.com/RuglessX">
              Hunt down new memes ↗
            </a>
          </div>
          <div className="tweet">
            <div className="tweet-author">
              <img src="/images/elon-avatar.jpg" alt="" />
              <div>
                <strong>Elon Musk</strong>
                <small>@elonmusk · Sep 12, 2021</small>
              </div>
            </div>
            <p>Floki has arrived</p>
            <img
              className="tweet-photo"
              src="/images/floki-original.jpg"
              alt="Elon Musk’s original photo of his Shiba Inu puppy Floki resting on a blanket"
            />
            <a
              className="tweet-source"
              href="https://x.com/elonmusk/status/1437179881260032016"
              target="_blank"
              rel="noreferrer"
            >
              View the original post on X ↗
            </a>
            <div className="reply">
              <div className="tweet-author">
                <span className="badge">Y</span>
                <div>
                  <b>You</b>
                  <small>@you · Replying to @elonmusk</small>
                </div>
              </div>
              <p>
                <strong>@RuglessX</strong> Floki, $FLOKI. Use this puppy photo. A new dog with a
                name everyone can remember, a huge audience and a community ready to make it their
                own. This has legs beyond one post.
              </p>
              <small>Illustrative reply to a real post. No affiliation or endorsement.</small>
            </div>
          </div>
        </section>
        <section id="why" className="marketing-section split-section">
          <div>
            <p className="eyebrow">You deserve better than “Trust me bro”.</p>
            <h2>
              You know this chart.
              <br />
              Let’s change
              <br />
              the ending.
            </h2>
            <p>
              You spot the momentum. You buy. Then someone dumps a hidden stash and your position
              collapses. You deserve to see the rules, the allocation and the receipts before you
              decide.
            </p>
            <p>
              Burning the initial launch allocation removes that particular stash. It does not
              remove market risk. Verify the code and make your own call.
            </p>
          </div>
          <RugChart />
        </section>
        <section id="flywheel" className="marketing-section">
          <div className="flow-intro">
            <div>
              <p className="eyebrow">Follow every step.</p>
              <h2>
                Your memes
                <br />
                feed the fire.
              </h2>
            </div>
            <p>
              Give new ideas a start. Keep active communities moving. Follow the creator fees all
              the way to a RUGLESS buyback and burn.
            </p>
          </div>
          <Flywheel />
          <BuybackModel />
        </section>
        <section className="marketing-section split-section">
          <div>
            <p className="eyebrow">Open source. Open to you.</p>
            <h2>
              Don’t just trust the code.
              <br />
              Help make it better.
            </h2>
            <p>
              Read it. Question it. Improve it. The Rugless application is open source, and
              community contributions are welcome.
            </p>
          </div>
          <div className="opensource-box">
            <h2>Your eyes make the code stronger.</h2>
            <p>
              Core changes get a 72-hour community review before production. Follow each milestone,
              inspect pull requests and help shape what ships.
            </p>
            <a className="primary-button" href="https://github.com/RuglessFun/rugless-app">
              Explore the code ↗
            </a>
            <p>
              <Link href="/roadmap">Follow the roadmap →</Link>
            </p>
          </div>
        </section>
        <section id="questions" className="marketing-section faq">
          <p className="eyebrow">Fair questions.</p>
          <h2>
            Trust is earned.
            <br />
            Question everything.
          </h2>
          {[
            [
              'Can I still lose money?',
              'Yes. Meme tokens are highly volatile. Burns and buybacks do not guarantee a price floor, liquidity or returns. You can lose your entire investment.',
            ],
            [
              'Where do the fees go?',
              '75% of RUGLESS creator fees fund the community pool, split equally between new launches and support for existing tokens. The remaining 25% funds operations. Net meme creator fees buy and burn RUGLESS. These percentages apply to captured creator fees, not trading volume.',
            ],
            [
              'Are all the tokens in the app Rugless launches?',
              'No. The current market directory includes external Pump tokens selected for recent activity. Each is clearly labeled. External tokens have not been launched, vetted or endorsed by Rugless.',
            ],
            [
              'How can I help?',
              'Nominate a post with a detailed thesis, discuss a pull request, report a bug or contribute code. Core releases require a 72-hour review window after the latest code change, with blocking feedback resolved before production.',
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
