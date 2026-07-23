export function Hero() {
  return (
    <section className="hero section-pad">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />
        <div className="orbit-core">
          <span>ARISE</span>
          <b>26</b>
        </div>
        <span className="orbit-node orbit-node--one" />
        <span className="orbit-node orbit-node--two" />
        <span className="orbit-copy">
          SYSTEM_STATUS: <strong>NOMINAL</strong>
        </span>
      </div>

      <div className="hero-content">
        <p className="signal">
          <span /> The next signal is incoming
        </p>
        <h1 className="hero-title">
          <span>Play.</span>
          <span>Build.</span>
          <span className="outline-word">Become.</span>
        </h1>
        <p className="hero-copy">
          A three-day collision of competition, craft, code, and culture. Five
          worlds. One live system. The future is not something you wait for—it
          is something you enter.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#arenas">
            Explore the festival <span>↘</span>
          </a>
          <a className="button button--ghost" href="/registration">
            Register now
          </a>
        </div>
        <div className="event-meta">
          <div>
            <span>Date_Range</span>
            <strong>Sep 12—14, 2026</strong>
          </div>
          <div>
            <span>Location_Ref</span>
            <strong>Polaris School of Technology, Bengaluru, Karnataka</strong>
          </div>
        </div>
      </div>

      <div className="hero-side-data" aria-hidden="true">
        <span>LAT_12.9346°N</span>
        <span>LONG_77.5341°E</span>
      </div>
      <div className="scroll-cue">
        <span>Scroll to initialize</span>
        <i />
      </div>
    </section>
  );
}
