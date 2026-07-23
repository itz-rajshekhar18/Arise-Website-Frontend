export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            <span>E-Sports Championships</span><b>✦</b>
            <span>Algorithm Arena</span><b>✦</b>
            <span>Indie Dev Showcase</span><b>✦</b>
            <span>Creator Labs</span><b>✦</b>
          </div>
        ))}
      </div>
    </div>
  );
}
