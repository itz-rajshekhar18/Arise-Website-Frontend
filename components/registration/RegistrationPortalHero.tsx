import Image from "next/image";

export function RegistrationPortalHero() {
  return (
    <section className="portal-hero">
      <Image
        alt=""
        className="portal-lobby-image"
        fill
        priority
        sizes="100vw"
        src="/arise-registration-lobby.png"
      />
      <div className="portal-lobby-shade" aria-hidden="true" />
      <div className="portal-grid" aria-hidden="true" />
      <div className="portal-hero-copy">
        <span><i /> Registration_Portal_v4.0 // Live</span>
        <h1>
          Choose your
          <br />
          <em>entry point.</em>
        </h1>
        <p>
          Five competitive paths. One live festival system. Build your squad,
          lock your role, and enter the arena.
        </p>
        <div className="portal-hero-actions">
          <a href="#registration-types">Enter matchmaking <span>↘</span></a>
          <strong>50,000+ players detected</strong>
        </div>
      </div>

      <aside className="portal-status">
        <div><i /> Deadline: Aug 30, 2026 // 23:59 IST</div>
        <div><span>Current availability</span><strong>84% remaining</strong></div>
        <section className="portal-squad-status">
          <header><span>Squad uplink</span><b>Online</b></header>
          <div>
            {["01", "02", "03", "04", "05"].map((slot) => (
              <i key={slot}><span>{slot}</span></i>
            ))}
          </div>
          <footer><span>Role scan</span><strong>5 paths available</strong></footer>
        </section>
      </aside>

      <div className="portal-rank-orbit" aria-hidden="true">
        <i /><i /><i />
        <strong>AR</strong>
        <span>Season_01</span>
      </div>

      <div className="portal-queue-bar">
        <span>Matchmaking protocol</span>
        <div><i /><strong>Registration queue open</strong></div>
        <span>Latency: 12ms</span>
        <span>Region: IND_SOUTH</span>
      </div>
      <div className="portal-scanline" aria-hidden="true" />
    </section>
  );
}
