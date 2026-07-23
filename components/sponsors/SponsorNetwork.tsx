const partners = [
  { mark: "SYNTH", suffix: "_SYS" },
  { mark: "NEURO", suffix: "_LINK" },
  { mark: "VOID", suffix: "_OS" },
  { mark: "GRID", suffix: "_CORE" },
  { mark: "HEX", suffix: "_LABS" },
  { mark: "QUANTUM", suffix: "_ARC" },
];

export function SponsorNetwork() {
  return (
    <section className="sponsor-network">
      <p>Reliance on global leaders</p>
      <div className="sponsor-network-grid">
        {partners.map((partner, index) => (
          <div key={partner.mark}>
            <span>0{index + 1}</span>
            <strong>{partner.mark}<i>{partner.suffix}</i></strong>
          </div>
        ))}
      </div>
    </section>
  );
}
