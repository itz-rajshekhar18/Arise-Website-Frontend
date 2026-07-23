export function SponsorsHero() {
  return (
    <section className="sponsor-hero" id="overview">
      <div className="sponsor-hero-grid" aria-hidden="true" />
      <div className="sponsor-eyebrow">01 // Strategic_Alliance</div>
      <h1>
        Back the next
        <br />
        generation
        <br />
        <em>of play.</em>
      </h1>
      <div className="sponsor-hero-lower">
        <div>
          <p>
            ARISE//FEST is the definitive nexus of collegiate competition and
            professional excellence. Connect your brand with 50,000+ digital
            natives across India’s most ambitious technology campuses.
          </p>
          <div className="sponsor-actions">
            <a className="button button--primary" href="#enroll">Become a sponsor <span>↗</span></a>
            <a className="button button--ghost" href="#tiers">Explore partnership tiers <span>↓</span></a>
          </div>
        </div>
        <aside className="sponsor-terminal">
          <span>Terminal_Status</span>
          <div><strong>Reach</strong><b>12.4M+ impressions</b></div>
          <div><strong>Engagement</strong><b>84% Gen Z</b></div>
          <div><strong>Network</strong><b>200+ colleges</b></div>
          <div><strong>Venue</strong><b>Polaris, Bengaluru</b></div>
        </aside>
      </div>
      <div className="sponsor-metrics">
        <div><strong>50,000+</strong><span>On-site attendees</span></div>
        <div><strong>200+</strong><span>Colleges represented</span></div>
        <div><strong>12.4M</strong><span>Digital reach</span></div>
      </div>
    </section>
  );
}
