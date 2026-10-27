import type { Metadata } from 'next';
import { MarketingNav, MarketingFooter } from '@/components/marketing-nav';
import roadmap from '@/data/roadmap.json';
export const metadata: Metadata = { title: 'Roadmap' };
export default function Roadmap() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="marketing-section roadmap-page">
        <div className="roadmap-intro">
          <p className="eyebrow">BUILD IT IN THE OPEN</p>
          <h1>
            One roadmap.
            <br />A community behind every step.
          </h1>
          <p>
            From the posts you nominate to the communities you help revive. Follow the work, inspect
            the code and contribute to what comes next.
          </p>
          <a className="primary-button" href={roadmap.repository}>
            Contribute on GitHub ↗
          </a>
        </div>
        <section className="panel review-policy">
          <h2>72 hours to review. Every core change.</h2>
          <p>
            Core changes stay open for at least 72 hours after the latest code push. Blocking
            feedback must be resolved before merge. Content-only changes can follow a shorter review
            path.
          </p>
          <p>
            Code merged, staging verified and production deployed are separate milestones. A merge
            alone never marks a feature live. No fabricated PRs or deployment badges.
          </p>
          <a className="text-link" href={`${roadmap.repository}/blob/main/CONTRIBUTING.md`}>
            Read the contribution and release policy ↗
          </a>
        </section>
        {roadmap.phases.map((phase) => (
          <section className="phase" key={phase.id}>
            <p className="eyebrow">
              PHASE {phase.number} · {phase.name}
            </p>
            <h2>{phase.title}</h2>
            <p>{phase.description.replaceAll('@rugless', '@RuglessX')}</p>
            {phase.features.map((feature) => (
              <details className="milestone" key={feature.id}>
                <summary>
                  ○ {feature.name}
                  <span>
                    {feature.code === 'devnet_proved' ? 'Devnet proof recorded' : 'Planned'}
                  </span>
                </summary>
                <p>{feature.benefit}</p>
                <p>
                  <strong>Acceptance:</strong> {feature.acceptance}
                </p>
                <div className="statuses">
                  <span>Code: {feature.code.replaceAll('_', ' ')}</span>
                  <span>Staging: {feature.staging}</span>
                  <span>Production: {feature.production.replaceAll('_', ' ')}</span>
                </div>
                <p>
                  <a
                    className="text-link"
                    href={`${roadmap.repository}/issues/new?title=${encodeURIComponent(`${feature.id}: ${feature.name}`)}`}
                  >
                    Discuss or contribute to this milestone ↗
                  </a>
                </p>
              </details>
            ))}
          </section>
        ))}
        <section className="opensource-box">
          <h2>
            The codebase is open source.
            <br />
            The invitation is open, too.
          </h2>
          <p>
            Review a change, propose a better approach or pick a milestone to build. Progress
            belongs to everyone who helps make it happen.
          </p>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
