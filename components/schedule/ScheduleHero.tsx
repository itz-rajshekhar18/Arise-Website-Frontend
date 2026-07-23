import Image from "next/image";

export function ScheduleHero() {
  return (
    <section className="sched-hero" id="overview">
      <Image
        alt=""
        className="schedule-command-image"
        fill
        priority
        sizes="100vw"
        src="/arise-schedule-command.png"
      />
      <div className="schedule-command-shade" aria-hidden="true" />
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
      <aside className="schedule-command-hud" aria-hidden="true">
        <header><span>Mission control</span><strong>Live</strong></header>
        <div>
          <i /><span>Day 01</span><b>Opening protocol</b>
        </div>
        <div>
          <i /><span>Day 02</span><b>Peak operations</b>
        </div>
        <div>
          <i /><span>Day 03</span><b>Final transmission</b>
        </div>
        <footer><span>16 sessions synced</span><strong>100%</strong></footer>
      </aside>
    </section>
  );
}
