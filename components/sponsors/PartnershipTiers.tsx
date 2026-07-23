const rows = [
  {
    label: "Branding",
    title: "Logo on main stage + livestream",
    arena: "Tournament naming rights",
    technology: "Product integration",
    community: "Digital program listing",
  },
  {
    label: "Activation",
    title: "12m × 12m custom experience",
    arena: "6m × 6m booth space",
    technology: "Tech showcase zone",
    community: "Social media spotlights",
  },
  {
    label: "Networking",
    title: "Unlimited VIP lounge access",
    arena: "10 VIP passes",
    technology: "Talent meet-and-greet",
    community: "5 festival passes",
  },
  {
    label: "Content",
    title: "Co-produced flagship film",
    arena: "Live bracket integrations",
    technology: "Product demo feature",
    community: "Partner profile",
  },
  {
    label: "Availability",
    title: "Exclusive // 01",
    arena: "Maximum // 04",
    technology: "Maximum // 08",
    community: "Open network",
  },
];

const tiers = [
  { key: "title", name: "Title", accent: "violet" },
  { key: "arena", name: "Arena", accent: "cyan" },
  { key: "technology", name: "Technology", accent: "lime" },
  { key: "community", name: "Community", accent: "white" },
] as const;

export function PartnershipTiers() {
  return (
    <section className="sponsor-tiers" id="tiers">
      <div className="sponsor-section-label">02 // Partnership_Tiers</div>
      <div className="sponsor-section-heading">
        <h2>Structured engagement.</h2>
        <p>Four ways to enter the ecosystem. Every tier is configurable around a clear campaign objective.</p>
      </div>

      <div className="tier-table" role="table" aria-label="Sponsorship tier comparison">
        <div className="tier-row tier-row--head" role="row">
          <span role="columnheader">Category</span>
          {tiers.map((tier) => (
            <strong className={`tier-${tier.accent}`} role="columnheader" key={tier.key}>
              {tier.name}
            </strong>
          ))}
        </div>
        {rows.map((row) => (
          <div className="tier-row" role="row" key={row.label}>
            <span role="rowheader">{row.label}</span>
            {tiers.map((tier) => (
              <p role="cell" data-tier={tier.name} key={tier.key}>
                {row[tier.key]}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
