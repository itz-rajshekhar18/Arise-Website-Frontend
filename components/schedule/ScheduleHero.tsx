export function ScheduleHero() {
  return (
    <section className="sched-hero" id="overview">
      <div className="sched-hero-grid" aria-hidden="true" />
      <div className="sched-date-chip">September 12—14 // 2026</div>
      <p className="signal"><span /> Schedule transmission online</p>
      <h1>
        One festival.
        <br />
        <em>Every way to play.</em>
      </h1>
      <p className="sched-hero-copy">
        Three relentless days of brackets, builds, showcases, workshops, and
        after-hours signals. Build your route before the gates open.
      </p>

      <div className="sched-meta">
        <div><span>Venue</span><strong>Polaris School of Technology, Bengaluru, Karnataka</strong></div>
        <div><span>Registration</span><strong className="lime">Open // 84% full</strong></div>
        <div><span>Duration</span><strong>72H non-stop</strong></div>
      </div>

      <div className="sched-hero-actions">
        <a className="button button--primary" href="/#access">Register now <span>↗</span></a>
        <a className="button button--ghost" href="#schedule-board">View event lineup <span>↓</span></a>
      </div>

      <div className="sched-signal-art" aria-hidden="true">
        <i /><i /><i />
        <b>72</b>
        <span>HOURS_LIVE</span>
      </div>
    </section>
  );
}
