"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Member = {
  name: string;
  email: string;
  handle: string;
};

const emptyMember = (): Member => ({ name: "", email: "", handle: "" });

const languages = ["C++17/20", "Java 11+", "Python 3.10"];
const experienceLevels = ["Novice", "Competitive", "Legendary"];
const sectionLinks = [
  { code: "01", label: "Overview", href: "#code-overview" },
  { code: "02", label: "Tournament", href: "#code-team" },
  { code: "03", label: "Technical", href: "#code-technical" },
  { code: "04", label: "Verification", href: "#code-verification" },
];

export function ProgrammingRegistration() {
  const [activeSection, setActiveSection] = useState("");
  const [academicStatus, setAcademicStatus] = useState("Undergraduate student");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    emptyMember(),
    emptyMember(),
    emptyMember(),
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["C++17/20"]);
  const [experience, setExperience] = useState("Competitive");
  const [idFileName, setIdFileName] = useState("");
  const [consentFileName, setConsentFileName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash;
      setActiveSection(
        sectionLinks.some((link) => link.href === hash) ? hash : "",
      );
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);
    return () => window.removeEventListener("hashchange", syncActiveSection);
  }, []);

  function updateMember(index: number, field: keyof Member, value: string) {
    setMembers((current) =>
      current.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member,
      ),
    );
    setMessage("");
  }

  function addMember() {
    if (members.length < 4) {
      setMembers((current) => [...current, emptyMember()]);
      setMessage("");
    }
  }

  function removeFourthMember() {
    if (members.length === 4) {
      setMembers((current) => current.slice(0, 3));
      setMessage("");
    }
  }

  function toggleLanguage(language: string) {
    setSelectedLanguages((current) =>
      current.includes(language)
        ? current.filter((item) => item !== language)
        : [...current, language],
    );
    setMessage("");
  }

  function selectFile(
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
  ) {
    setter(event.target.files?.[0]?.name ?? "");
    setMessage("");
  }

  function validate() {
    if (!academicStatus || !ageConfirmed) {
      return "Confirm the team leader’s academic status and age eligibility.";
    }
    if (!teamName.trim()) return "Enter your team identity.";
    if (members.length < 3 || members.length > 4) {
      return "Competitive programming teams must contain exactly three or four members.";
    }
    if (
      members.some(
        (member) =>
          !member.name.trim() || !member.email.trim() || !member.handle.trim(),
      )
    ) {
      return `Complete the details for all ${members.length} team members.`;
    }
    if (selectedLanguages.length === 0) {
      return "Select at least one preferred programming language.";
    }
    if (!idFileName || !consentFileName) {
      return "Upload the student ID bundle and signed consent form.";
    }
    if (!termsAccepted) return "Accept the competition rules before registration.";
    return "";
  }

  function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }
    setSubmitted(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="code-reg-success">
        <span>Registration_initialized</span>
        <div>✓</div>
        <h1>Team compiled.</h1>
        <p>
          {teamName} has entered the Code_Wars qualifier queue with {members.length} members.
        </p>
        <dl>
          <div><dt>Team size</dt><dd>{members.length}</dd></div>
          <div><dt>Format</dt><dd>ICPC</dd></div>
          <div><dt>Level</dt><dd>{experience}</dd></div>
        </dl>
        <a href="/registration">Return to registration portal</a>
      </section>
    );
  }

  return (
    <div className="code-reg-shell">
      <aside className="code-reg-nav">
        <div className="code-reg-user">
          <div aria-hidden="true"><span>01</span><i /></div>
          <strong>PLAYER_01</strong>
          <small>Verified participant</small>
        </div>
        <nav aria-label="Programming registration sections">
          {sectionLinks.map((link) => (
            <a
              className={activeSection === link.href ? "is-active" : undefined}
              href={link.href}
              key={link.href}
              onClick={() => setActiveSection(link.href)}
            >
              <span>{link.code}</span> {link.label}
            </a>
          ))}
        </nav>
        <a
          className="code-reg-nav-cta"
          href="#code-team"
          onClick={() => setActiveSection("#code-team")}
        >
          Register now
        </a>
      </aside>

      <div className="code-reg-workspace">
        <header className="code-reg-hero" id="code-overview">
          <span>Category: Competitive programming</span>
          <h1>Code_Wars V2.0</h1>
          <p>
            Register your team for the premier ICPC-style programming challenge.
            High-precision algorithms, intense debugging, and one shared objective.
          </p>
        </header>

        <form className="code-reg-form" onSubmit={submitRegistration}>
          <div className="code-reg-main">
            <section className="code-reg-section">
              <div className="code-reg-section-title">
                <span>01</span><h2>Eligibility verification</h2>
              </div>
              <div className="code-reg-card code-reg-eligibility">
                <label>
                  <span>Academic status</span>
                  <select
                    onChange={(event) => {
                      setAcademicStatus(event.target.value);
                      setMessage("");
                    }}
                    value={academicStatus}
                  >
                    <option>Undergraduate student</option>
                    <option>Postgraduate student</option>
                    <option>Recent graduate</option>
                  </select>
                </label>
                <label className="code-reg-check">
                  <span>Age confirmation</span>
                  <div>
                    <input
                      checked={ageConfirmed}
                      onChange={(event) => {
                        setAgeConfirmed(event.target.checked);
                        setMessage("");
                      }}
                      type="checkbox"
                    />
                    <strong>I am 18 years or older</strong>
                  </div>
                </label>
                <i aria-hidden="true">✓</i>
              </div>
            </section>

            <section className="code-reg-section" id="code-team">
              <div className="code-reg-section-title">
                <span>02</span><h2>Team configuration</h2>
              </div>
              <div className="code-reg-card code-team-card">
                <label className="code-team-name">
                  <span>Team identity // Full name</span>
                  <input
                    onChange={(event) => {
                      setTeamName(event.target.value);
                      setMessage("");
                    }}
                    placeholder="e.g., SEGMENT_TREE_WIZARDS"
                    value={teamName}
                  />
                </label>

                <div className="code-member-grid">
                  {members.map((member, index) => (
                    <fieldset key={index}>
                      <legend>{index === 0 ? "// Team leader" : `// Member ${String(index + 1).padStart(2, "0")}`}</legend>
                      <input
                        aria-label={`Member ${index + 1} full legal name`}
                        onChange={(event) => updateMember(index, "name", event.target.value)}
                        placeholder="Full legal name"
                        value={member.name}
                      />
                      <input
                        aria-label={`Member ${index + 1} institutional email`}
                        onChange={(event) => updateMember(index, "email", event.target.value)}
                        placeholder="Institutional email"
                        type="email"
                        value={member.email}
                      />
                      <input
                        aria-label={`Member ${index + 1} coding handle`}
                        onChange={(event) => updateMember(index, "handle", event.target.value)}
                        placeholder="GitHub / Codeforces handle"
                        value={member.handle}
                      />
                      {index === 3 && (
                        <button onClick={removeFourthMember} type="button">
                          Remove fourth member
                        </button>
                      )}
                    </fieldset>
                  ))}
                </div>

                <div className="code-team-control">
                  <button
                    disabled={members.length === 4}
                    onClick={addMember}
                    type="button"
                  >
                    <i>+</i>
                    {members.length === 3
                      ? "Add fourth team member"
                      : "Maximum team size reached"}
                  </button>
                  <span>{members.length} / 4 slots configured</span>
                </div>
              </div>
            </section>

            <section className="code-reg-section" id="code-technical">
              <div className="code-reg-section-title">
                <span>03</span><h2>Technical profile</h2>
              </div>
              <div className="code-reg-card code-technical-card">
                <div>
                  <span>Preferred languages</span>
                  <div className="code-language-options">
                    {languages.map((language) => (
                      <button
                        className={selectedLanguages.includes(language) ? "is-selected" : ""}
                        key={language}
                        onClick={() => toggleLanguage(language)}
                        type="button"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span>Experience level</span>
                  <div className="code-experience-track">
                    {experienceLevels.map((level) => (
                      <button
                        className={experience === level ? "is-selected" : ""}
                        key={level}
                        onClick={() => setExperience(level)}
                        type="button"
                      >
                        <i />
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="code-reg-section" id="code-verification">
              <div className="code-reg-section-title">
                <span>04</span><h2>Legal & verification</h2>
              </div>
              <div className="code-verification-grid">
                <label className={idFileName ? "has-file" : ""}>
                  <input
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(event) => selectFile(event, setIdFileName)}
                    type="file"
                  />
                  <i>⇧</i>
                  <strong>ID_VERIFICATION.PDF</strong>
                  <small>{idFileName || "Upload college IDs for all members"}</small>
                </label>
                <label className={consentFileName ? "has-file" : ""}>
                  <input
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(event) => selectFile(event, setConsentFileName)}
                    type="file"
                  />
                  <i>▤</i>
                  <strong>TERMS_CONSENT.SIG</strong>
                  <small>{consentFileName || "Upload the signed participant waiver"}</small>
                </label>
              </div>

              <div className="code-submit-row">
                <label>
                  <input
                    checked={termsAccepted}
                    onChange={(event) => {
                      setTermsAccepted(event.target.checked);
                      setMessage("");
                    }}
                    type="checkbox"
                  />
                  <span>
                    I confirm that all team members meet the eligibility criteria
                    and agree to the competition rules and terms of engagement.
                  </span>
                </label>
                <button type="submit">Initialize registration</button>
              </div>
              {message && <p className="code-reg-message">{message}</p>}
            </section>
          </div>

          <aside className="code-reg-intel">
            <section>
              <span>// Tournament_intel</span>
              <dl>
                <div><dt>Team size</dt><dd>3–4</dd><small>Hard limit</small></div>
                <div><dt>Format</dt><dd>ICPC</dd><small>Strict protocol</small></div>
                <div><dt>Hardware</dt><dd>BYO</dd><small>LAN provided</small></div>
              </dl>
            </section>
            <section className="code-reg-checklist">
              <h3>Mandatory checklist</h3>
              <ol>
                <li>No external communication during live rounds.</li>
                <li>Documentation must be local or pre-approved.</li>
                <li>One workstation per team for implementation.</li>
                <li>Academic integrity is actively enforced.</li>
              </ol>
            </section>
            <section className="code-reg-visual" aria-label="Competitive programming system">
              <div className="code-screen">
                <span>RUN // QUALIFIER_01</span>
                <code>
                  {`while (time_left) {\n  solve(problem);\n  verify(result);\n  submit(team);\n}`}
                </code>
              </div>
              <strong>Stay_focused</strong>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}
