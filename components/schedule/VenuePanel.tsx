export function VenuePanel() {
  return (
    <section className="venue-panel" id="venue">
      <div className="venue-map-card">
        <div className="venue-heading">
          <div><span>Venue_Map // Level_01</span><h2>Navigate the grid.</h2></div>
          <a href="#schedule-board">Back to schedule ↑</a>
        </div>
        <div className="venue-map" aria-label="Stylized venue map of ARISE Festival">
          <div className="map-orbit map-orbit--one" />
          <div className="map-orbit map-orbit--two" />
          <div className="map-stage map-stage--main"><span>Main</span><strong>Stage</strong></div>
          <div className="map-stage map-stage--expo"><span>Indie</span><strong>Expo</strong></div>
          <div className="map-stage map-stage--code"><span>Code</span><strong>Lab</strong></div>
          <div className="map-stage map-stage--arena"><span>Pro</span><strong>Arena</strong></div>
          <i className="map-route map-route--a" />
          <i className="map-route map-route--b" />
          <div className="map-pin"><b>●</b><span>You are here</span></div>
          <small>POLARIS_SCHOOL_OF_TECHNOLOGY // BENGALURU_KARNATAKA</small>
        </div>
      </div>

      <aside className="equipment-card">
        <span>Participant checklist</span>
        <h3>Ready your loadout.</h3>
        <ul>
          <li><span>Tournament badge</span><b>✓</b></li>
          <li><span>Government / university ID</span><b>✓</b></li>
          <li><span>Personal peripherals</span><b>○</b></li>
          <li><span>Registration access code</span><b>✓</b></li>
        </ul>
        <a href="/#protocols">View full protocols ↗</a>
      </aside>
    </section>
  );
}
