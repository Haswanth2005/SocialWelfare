import React from 'react'

export default function Home({ openProducts }) {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-left">
          <h2 className="hero-eyebrow">Trusted by citizens</h2>
          <h1 className="hero-title">Find the right social welfare schemes, fast.</h1>
          <p className="hero-sub">Veda helps you check eligibility, compare benefits, and guide you through applications — all in one trustworthy tool.</p>
          <div className="hero-ctas">
            <button className="btn primary" onClick={() => openProducts()}>Browse Programs</button>
            <button className="btn ghost">Learn more</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card dark">
            <h3>How it works</h3>
            <ol>
              <li>Tell us about your situation.</li>
              <li>We scan relevant portals for eligibility.</li>
              <li>Receive tailored guidance and next steps.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h4>Accurate</h4>
          <p>We synthesize official rules and provide clear eligibility summaries.</p>
        </div>
        <div className="feature">
          <h4>Private</h4>
          <p>Your data stays local unless you choose to share it with an agency.</p>
        </div>
        <div className="feature">
          <h4>Accessible</h4>
          <p>Large text, high contrast, and keyboard navigation support.</p>
        </div>
      </section>
    </div>
  )
}
