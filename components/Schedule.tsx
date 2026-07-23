export function Schedule() {
  return (
    <section className="schedule section-pad" id="schedule">
      <div className="section-kicker">
        <span>02 // Live_Feed</span>
        <span>All times in IST</span>
      </div>
      <div className="schedule-heading">
        <div>
          <p>72 hours online</p>
          <h2>No dead air.</h2>
        </div>
        <div className="countdown" aria-label="Countdown to ARISE Festival">
          <div><b data-countdown="days">--</b><span>Days</span></div>
          <i>:</i>
          <div><b data-countdown="hours">--</b><span>Hrs</span></div>
          <i>:</i>
          <div><b data-countdown="minutes">--</b><span>Min</span></div>
          <i>:</i>
          <div><b data-countdown="seconds">--</b><span>Sec</span></div>
        </div>
      </div>
      <div className="schedule-rows">
        <article>
          <span className="day">Day_01</span>
          <strong>Ignition</strong>
          <p>Opening transmission · Bracket zero · Indie first-look</p>
          <span className="time">09:00 — 23:30</span>
        </article>
        <article>
          <span className="day">Day_02</span>
          <strong>Overclock</strong>
          <p>Creator labs · Builder finals · Midnight code sprint</p>
          <span className="time">08:00 — 00:30</span>
        </article>
        <article>
          <span className="day">Day_03</span>
          <strong>Ascension</strong>
          <p>World finals · Awards protocol · Closing signal</p>
          <span className="time">09:00 — 22:00</span>
        </article>
      </div>
    </section>
  );
}
