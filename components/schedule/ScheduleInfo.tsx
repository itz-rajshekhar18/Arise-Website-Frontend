const notes = [
  {
    title: "Can I bring my own gear?",
    copy: "Yes. Tournament players may bring approved mice, keyboards, controllers, and headsets. PCs are provided.",
  },
  {
    title: "What if a session moves?",
    copy: "Schedule changes appear live in this terminal. Saved sessions will be marked with the new time and stage.",
  },
  {
    title: "WiFi access code?",
    copy: "High-speed festival WiFi is available throughout the venue. Network access appears on your verified badge.",
  },
];

export function ScheduleInfo() {
  return (
    <>
      <section className="sched-notes">
        {notes.map((note, index) => (
          <article key={note.title}>
            <span>0{index + 1}</span>
            <h3>{note.title}</h3>
            <p>{note.copy}</p>
          </article>
        ))}
      </section>
      <section className="schedule-cta">
        <div className="schedule-cta-grid" aria-hidden="true" />
        <span>ACCESS_GATE // OPEN</span>
        <h2>Lock in your festival route.</h2>
        <p>Registration is live. Your schedule begins when your badge does.</p>
        <a className="button button--primary button--large" href="/#access">
          Register for the festival <span>↗</span>
        </a>
        <small>Current status: 1,422 participant slots remaining</small>
      </section>
    </>
  );
}
