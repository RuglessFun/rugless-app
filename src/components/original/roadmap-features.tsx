'use client';
import { useState } from 'react';
import roadmap from '@/data/roadmap.json';
const filters = [
  ['all', 'All features'],
  ['evidence', 'With real evidence'],
  ['merged', 'Merged'],
  ['review', 'In review'],
  ['planned', 'Planned'],
] as const;
export function RoadmapFeatures() {
  const [filter, setFilter] = useState<string>('all');
  let count = 0;
  const phases = roadmap.phases
    .map((phase) => ({
      ...phase,
      features: phase.features.filter(
        (f) =>
          filter === 'all' ||
          (filter === 'evidence' && 'evidenceKind' in f) ||
          (filter === 'merged' && f.code === 'merged') ||
          (filter === 'review' && f.review === 'open') ||
          (filter === 'planned' && f.code === 'planned'),
      ),
    }))
    .filter((p) => p.features.length);
  phases.forEach((p) => (count += p.features.length));
  return (
    <>
      <div className="roadmap-tools">
        <div className="directory-tabs" role="group" aria-label="Filter roadmap features">
          {filters.map(([value, label]) => (
            <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
              {label}
            </button>
          ))}
        </div>
        <p id="roadmap-count" role="status">
          {count} features shown · code, staging and production tracked separately
        </p>
      </div>
      <div id="product-roadmap">
        {phases.map((phase) => (
          <section className="product-phase" key={phase.id} aria-labelledby={phase.id}>
            <div className="product-phase-heading">
              <p className="phase-number">Phase {phase.number}</p>
              <h3 id={phase.id}>{phase.name}</h3>
              <h4>{phase.title}</h4>
              <p>{phase.description.replaceAll('@rugless', '@RuglessX')}</p>
            </div>
            <div className="feature-list">
              {phase.features.map((f) => {
                const proved = f.code === 'devnet_proved';
                return (
                  <article className="roadmap-feature" id={f.id} key={f.id}>
                    <div className="feature-title">
                      <span
                        className={`feature-check ${proved ? 'checked' : ''}`}
                        aria-label={proved ? 'Devnet proof recorded' : 'Code not complete'}
                      >
                        {proved ? '◆' : '○'}
                      </span>
                      <div>
                        <span className="feature-id">
                          {f.id}
                          {proved ? ' · Devnet proof' : ''}
                        </span>
                        <h4>{f.name}</h4>
                        <p>{f.benefit}</p>
                      </div>
                    </div>
                    <div className="feature-statuses">
                      <span>
                        <small>Code</small>
                        {proved ? 'Devnet proof' : 'Planned'}
                      </span>
                      <span>
                        <small>Staging</small>Not deployed
                      </span>
                      <span>
                        <small>Production</small>Not deployed
                      </span>
                    </div>
                    <details className="feature-evidence">
                      <summary>Acceptance criteria &amp; code evidence</summary>
                      <p>{f.acceptance}</p>
                      <dl>
                        <div>
                          <dt>Pull request</dt>
                          <dd>{f.pullRequest ? `PR #${f.pullRequest}` : 'Not linked yet'}</dd>
                        </div>
                        <div>
                          <dt>Source code</dt>
                          <dd>
                            <a href={roadmap.repository}>RuglessFun/rugless-app ↗</a>
                          </dd>
                        </div>
                        <div>
                          <dt>Deployment receipt</dt>
                          <dd>No staging or production receipt linked</dd>
                        </div>
                      </dl>
                      <p className="evidence-note">
                        A checkmark records code completion, not production availability.
                      </p>
                      <p>
                        <a
                          href={`${roadmap.repository}/issues/new?title=${encodeURIComponent(`${f.id}: ${f.name}`)}`}
                        >
                          Discuss or contribute to this milestone ↗
                        </a>
                      </p>
                    </details>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {count === 0 && <p className="directory-empty">No features match this status.</p>}
      </div>
    </>
  );
}
