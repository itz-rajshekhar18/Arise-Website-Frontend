const faqs = [
  {
    question: "Can I enter multiple arenas?",
    answer:
      "Yes. One festival pass unlocks every public arena. Competition entries are registered separately so the brackets stay fair.",
  },
  {
    question: "Is the event fully digital or hybrid?",
    answer:
      "ARISE//FEST is a physical-first experience at Polaris School of Technology, Bengaluru, Karnataka, with selected matches and showcases broadcast globally.",
  },
  {
    question: "Are team registrations open?",
    answer:
      "They are. Early access registration is live for squads, solo competitors, creators, exhibitors, and spectators.",
  },
];

export function Protocols() {
  return (
    <section className="protocols section-pad" id="protocols">
      <div className="protocol-intro">
        <span>03 // Knowledge_Base</span>
        <h2>Frequently asked protocols</h2>
        <p>
          Everything you need to know before connecting to the 2026 terminal.
        </p>
        <a href="#access">Still need a human? ↗</a>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.question}>
            <summary>
              <span>0{index + 1}</span>
              {faq.question}
              <i>+</i>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
