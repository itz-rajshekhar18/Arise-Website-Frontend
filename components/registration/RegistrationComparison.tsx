const features = [
  { label: "Main expo access", student: "yes", programmer: "yes", indie: "yes", visitor: "yes", builder: "yes" },
  { label: "Competition entry", student: "yes", programmer: "yes", indie: "no", visitor: "no", builder: "yes" },
  { label: "Networking hub", student: "info", programmer: "yes", indie: "yes", visitor: "no", builder: "yes" },
  { label: "Workshop priority", student: "yes", programmer: "yes", indie: "info", visitor: "no", builder: "yes" },
  { label: "Project showcase", student: "info", programmer: "info", indie: "yes", visitor: "no", builder: "yes" },
];

const columns = [
  { key: "student", label: "Student", accent: "violet" },
  { key: "programmer", label: "Programmer", accent: "cyan" },
  { key: "indie", label: "Indie dev", accent: "lime" },
  { key: "visitor", label: "Visitor", accent: "white" },
  { key: "builder", label: "Builder", accent: "coral" },
] as const;

function Mark({ value }: { value: string }) {
  return <span className={`compare-mark compare-mark--${value}`}>{value === "yes" ? "✓" : value === "no" ? "×" : "i"}</span>;
}

export function RegistrationComparison() {
  return (
    <section className="registration-comparison">
      <span>Transparency_Protocols</span>
      <h2>Entry comparison</h2>
      <div className="compare-table" role="table" aria-label="Registration type comparison">
        <div className="compare-row compare-row--head" role="row">
          <strong role="columnheader">Feature</strong>
          {columns.map((column) => (
            <strong className={`compare-${column.accent}`} role="columnheader" key={column.key}>
              {column.label}
            </strong>
          ))}
        </div>
        {features.map((feature) => (
          <div className="compare-row" role="row" key={feature.label}>
            <strong role="rowheader">{feature.label}</strong>
            {columns.map((column) => (
              <div role="cell" data-label={column.label} key={column.key}>
                <Mark value={feature[column.key]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
