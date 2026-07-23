"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Game = {
  id: string;
  name: string;
  code: string;
  platform: string;
  teamSize: number;
  accent: string;
};

type Captain = {
  legalName: string;
  email: string;
  phone: string;
  discord: string;
};

type Academic = {
  institution: string;
  course: string;
  year: string;
  studentId: string;
};

type Teammate = {
  name: string;
  email: string;
  gamerTag: string;
};

type Draft = {
  currentStage: number;
  gameId: string;
  captain: Captain;
  academic: Academic;
  teamName: string;
  teammates: Teammate[];
  studentIdFileName: string;
  rosterFileName: string;
  confirmed: boolean;
  savedAt: string;
};

const STORAGE_KEY = "arise-student-registration-draft-v1";

const games: Game[] = [
  { id: "bgmi", name: "BGMI", code: "BG", platform: "Mobile", teamSize: 4, accent: "lime" },
  { id: "free-fire", name: "Free Fire", code: "FF", platform: "Mobile", teamSize: 4, accent: "coral" },
  { id: "valorant", name: "Valorant", code: "VL", platform: "PC", teamSize: 5, accent: "violet" },
  { id: "cod-mobile", name: "COD: Mobile", code: "CM", platform: "Mobile", teamSize: 5, accent: "cyan" },
  { id: "csgo", name: "CSGO", code: "CS", platform: "PC", teamSize: 10, accent: "white" },
];

const stages = [
  { eyebrow: "Stage 01", title: "Select your game", nav: "Game selection" },
  { eyebrow: "Stage 02", title: "Identify the captain", nav: "Captain details" },
  { eyebrow: "Stage 03", title: "Verify academic status", nav: "Academic status" },
  { eyebrow: "Stage 04", title: "Configure your squad", nav: "Squad config" },
  { eyebrow: "Stage 05", title: "Upload credentials", nav: "Asset upload" },
  { eyebrow: "Stage 06", title: "Review and deploy", nav: "Review & finalize" },
];

const emptyCaptain: Captain = {
  legalName: "",
  email: "",
  phone: "",
  discord: "",
};

const emptyAcademic: Academic = {
  institution: "",
  course: "",
  year: "",
  studentId: "",
};

const emptyTeammates = (): Teammate[] =>
  Array.from({ length: 9 }, () => ({ name: "", email: "", gamerTag: "" }));

function formatTime(value: string) {
  if (!value) return "Not saved yet";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

export function StudentRegistrationWizard() {
  const [hydrated, setHydrated] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [gameId, setGameId] = useState("");
  const [captain, setCaptain] = useState<Captain>(emptyCaptain);
  const [academic, setAcademic] = useState<Academic>(emptyAcademic);
  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState<Teammate[]>(emptyTeammates);
  const [studentIdFileName, setStudentIdFileName] = useState("");
  const [rosterFileName, setRosterFileName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedGame = games.find((game) => game.id === gameId);
  const requiredTeammates = selectedGame ? selectedGame.teamSize - 1 : 0;
  const visibleTeammates = useMemo(
    () => teammates.slice(0, requiredTeammates),
    [requiredTeammates, teammates],
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const draft = JSON.parse(stored) as Partial<Draft>;
        setCurrentStage(Math.min(Math.max(draft.currentStage ?? 0, 0), stages.length - 1));
        setGameId(draft.gameId ?? "");
        setCaptain({ ...emptyCaptain, ...draft.captain });
        setAcademic({ ...emptyAcademic, ...draft.academic });
        setTeamName(draft.teamName ?? "");
        setTeammates(
          emptyTeammates().map((empty, index) => ({
            ...empty,
            ...(draft.teammates?.[index] ?? {}),
          })),
        );
        setStudentIdFileName(draft.studentIdFileName ?? "");
        setRosterFileName(draft.rosterFileName ?? "");
        setConfirmed(Boolean(draft.confirmed));
        setSavedAt(draft.savedAt ?? "");
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const saveTimer = window.setTimeout(() => {
      const nextSavedAt = new Date().toISOString();
      const draft: Draft = {
        currentStage,
        gameId,
        captain,
        academic,
        teamName,
        teammates,
        studentIdFileName,
        rosterFileName,
        confirmed,
        savedAt: nextSavedAt,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setSavedAt(nextSavedAt);
    }, 650);

    return () => window.clearTimeout(saveTimer);
  }, [
    academic,
    captain,
    confirmed,
    currentStage,
    gameId,
    hydrated,
    rosterFileName,
    studentIdFileName,
    submitted,
    teamName,
    teammates,
  ]);

  function updateCaptain(field: keyof Captain, value: string) {
    setCaptain((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function updateAcademic(field: keyof Academic, value: string) {
    setAcademic((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function updateTeammate(index: number, field: keyof Teammate, value: string) {
    setTeammates((current) =>
      current.map((teammate, teammateIndex) =>
        teammateIndex === index ? { ...teammate, [field]: value } : teammate,
      ),
    );
    setMessage("");
  }

  function chooseFile(
    event: ChangeEvent<HTMLInputElement>,
    setter: (fileName: string) => void,
  ) {
    setter(event.target.files?.[0]?.name ?? "");
    setMessage("");
  }

  function validateStage(stage: number) {
    if (stage === 0 && !selectedGame) return "Select the game your squad will compete in.";
    if (
      stage === 1 &&
      (!captain.legalName.trim() ||
        !captain.email.trim() ||
        !captain.phone.trim() ||
        !captain.discord.trim())
    ) {
      return "Complete all captain contact fields before continuing.";
    }
    if (
      stage === 2 &&
      (!academic.institution.trim() ||
        !academic.course.trim() ||
        !academic.year ||
        !academic.studentId.trim())
    ) {
      return "Complete every academic verification field.";
    }
    if (stage === 3) {
      if (!teamName.trim()) return "Give your squad a team name.";
      const missingMember = visibleTeammates.some(
        (member) =>
          !member.name.trim() || !member.email.trim() || !member.gamerTag.trim(),
      );
      if (missingMember) {
        return `Add the details for all ${requiredTeammates} remaining squad members.`;
      }
    }
    if (stage === 4 && (!studentIdFileName || !rosterFileName)) {
      return "Upload both the captain’s student ID and the squad roster.";
    }
    if (stage === 5 && !confirmed) {
      return "Confirm that the squad details are correct before submission.";
    }
    return "";
  }

  function nextStage() {
    const error = validateStage(currentStage);
    if (error) {
      setMessage(error);
      return;
    }
    setMessage("");
    setCurrentStage((stage) => Math.min(stage + 1, stages.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousStage() {
    setMessage("");
    setCurrentStage((stage) => Math.max(stage - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveDraft() {
    const nextSavedAt = new Date().toISOString();
    const draft: Draft = {
      currentStage,
      gameId,
      captain,
      academic,
      teamName,
      teammates,
      studentIdFileName,
      rosterFileName,
      confirmed,
      savedAt: nextSavedAt,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setSavedAt(nextSavedAt);
    setMessage("Draft secured on this device.");
  }

  function submitRegistration() {
    const error = validateStage(5);
    if (error) {
      setMessage(error);
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted && selectedGame) {
    const registrationCode = `AR-${selectedGame.code}-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 9000) + 1000,
    )}`;

    return (
      <section className="student-reg-success">
        <span className="student-reg-kicker">Transmission_complete</span>
        <div className="student-reg-success-mark">✓</div>
        <h1>Squad locked in.</h1>
        <p>
          {teamName} is queued for {selectedGame.name}. A confirmation protocol
          will be sent to {captain.email}.
        </p>
        <div className="student-reg-code">
          <span>Registration code</span>
          <strong>{registrationCode}</strong>
        </div>
        <dl>
          <div><dt>Game</dt><dd>{selectedGame.name}</dd></div>
          <div><dt>Squad size</dt><dd>{selectedGame.teamSize} players</dd></div>
          <div><dt>Captain</dt><dd>{captain.legalName}</dd></div>
        </dl>
        <a href="/registration">Return to registration portal</a>
      </section>
    );
  }

  return (
    <div className="student-reg-layout">
      <aside className="student-reg-sidebar">
        <div className="student-reg-sidebar-heading">
          <span>Registration</span>
          <strong>Student_Squad_V.26</strong>
        </div>

        <nav aria-label="Registration stages">
          {stages.map((stage, index) => (
            <button
              className={
                index === currentStage
                  ? "is-active"
                  : index < currentStage
                    ? "is-complete"
                    : ""
              }
              disabled={index > currentStage}
              key={stage.nav}
              onClick={() => {
                if (index <= currentStage) {
                  setCurrentStage(index);
                  setMessage("");
                }
              }}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.nav}</strong>
              <i>{index < currentStage ? "✓" : index === currentStage ? "•" : ""}</i>
            </button>
          ))}
        </nav>

        <div className="student-reg-draft">
          <span><i>▣</i> Draft saved: {formatTime(savedAt)}</span>
          <p>Your progress is automatically cached on this device.</p>
        </div>
      </aside>

      <section className="student-reg-panel">
        <header className="student-reg-stage-header">
          <span>{stages[currentStage].eyebrow}</span>
          <h1>{stages[currentStage].title}</h1>
          <i />
        </header>

        <div className="student-reg-stage">
          {currentStage === 0 && (
            <div className="student-game-stage">
              <div className="student-reg-intro">
                <p>Select one tournament title. Your choice automatically sets the required roster size.</p>
                <span>Captain is included in the squad total.</span>
              </div>
              <div className="student-game-grid">
                {games.map((game) => (
                  <button
                    className={`student-game-card student-game-card--${game.accent}${gameId === game.id ? " is-selected" : ""}`}
                    key={game.id}
                    onClick={() => {
                      setGameId(game.id);
                      setMessage("");
                    }}
                    type="button"
                  >
                    <span>{game.code} // {game.platform}</span>
                    <strong>{game.name}</strong>
                    <div>
                      <b>{game.teamSize}</b>
                      <small>Player squad</small>
                    </div>
                    <i>{gameId === game.id ? "Selected ✓" : "Select title ↗"}</i>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStage === 1 && (
            <div className="student-reg-form-grid">
              <label>
                <span>Full legal name</span>
                <input
                  autoComplete="name"
                  onChange={(event) => updateCaptain("legalName", event.target.value)}
                  placeholder="Captain's legal name"
                  value={captain.legalName}
                />
              </label>
              <label>
                <span>Primary contact email</span>
                <input
                  autoComplete="email"
                  onChange={(event) => updateCaptain("email", event.target.value)}
                  placeholder="captain@university.edu"
                  type="email"
                  value={captain.email}
                />
              </label>
              <label>
                <span>Discord ID (required)</span>
                <input
                  onChange={(event) => updateCaptain("discord", event.target.value)}
                  placeholder="discord_user"
                  value={captain.discord}
                />
              </label>
              <label>
                <span>Emergency contact</span>
                <input
                  autoComplete="tel"
                  onChange={(event) => updateCaptain("phone", event.target.value)}
                  placeholder="+91 00000 00000"
                  type="tel"
                  value={captain.phone}
                />
              </label>
            </div>
          )}

          {currentStage === 2 && (
            <div className="student-reg-form-grid">
              <label>
                <span>Institution</span>
                <input
                  onChange={(event) => updateAcademic("institution", event.target.value)}
                  placeholder="College or university"
                  value={academic.institution}
                />
              </label>
              <label>
                <span>Course / programme</span>
                <input
                  onChange={(event) => updateAcademic("course", event.target.value)}
                  placeholder="B.Tech Computer Science"
                  value={academic.course}
                />
              </label>
              <label>
                <span>Current year</span>
                <select
                  onChange={(event) => updateAcademic("year", event.target.value)}
                  value={academic.year}
                >
                  <option value="">Select academic year</option>
                  <option value="1">First year</option>
                  <option value="2">Second year</option>
                  <option value="3">Third year</option>
                  <option value="4">Fourth year</option>
                  <option value="5+">Fifth year or above</option>
                </select>
              </label>
              <label>
                <span>Student ID number</span>
                <input
                  onChange={(event) => updateAcademic("studentId", event.target.value)}
                  placeholder="University-issued ID"
                  value={academic.studentId}
                />
              </label>
            </div>
          )}

          {currentStage === 3 && selectedGame && (
            <div className="student-squad-stage">
              <div className="student-squad-summary">
                <div>
                  <span>Active game</span>
                  <strong>{selectedGame.name}</strong>
                </div>
                <div>
                  <span>Required roster</span>
                  <strong>{selectedGame.teamSize} players</strong>
                </div>
                <p>
                  1 captain + {requiredTeammates} teammates = {selectedGame.teamSize} total
                </p>
              </div>

              <label className="student-team-name">
                <span>Squad / team name</span>
                <input
                  onChange={(event) => {
                    setTeamName(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter your competitive identity"
                  value={teamName}
                />
              </label>

              <div className="student-roster">
                <div className="student-roster-captain">
                  <span>01</span>
                  <div><small>Captain</small><strong>{captain.legalName}</strong></div>
                  <b>{captain.discord}</b>
                  <i>Locked</i>
                </div>
                {visibleTeammates.map((member, index) => (
                  <div className="student-roster-member" key={index}>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <label>
                      <small>Legal name</small>
                      <input
                        onChange={(event) => updateTeammate(index, "name", event.target.value)}
                        placeholder={`Player ${index + 2}`}
                        value={member.name}
                      />
                    </label>
                    <label>
                      <small>Email</small>
                      <input
                        onChange={(event) => updateTeammate(index, "email", event.target.value)}
                        placeholder="student@email.com"
                        type="email"
                        value={member.email}
                      />
                    </label>
                    <label>
                      <small>In-game ID</small>
                      <input
                        onChange={(event) => updateTeammate(index, "gamerTag", event.target.value)}
                        placeholder="Player tag"
                        value={member.gamerTag}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStage === 4 && (
            <div className="student-upload-grid">
              <label className={studentIdFileName ? "has-file" : ""}>
                <input
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(event) => chooseFile(event, setStudentIdFileName)}
                  type="file"
                />
                <i>01</i>
                <strong>Captain student ID</strong>
                <p>Upload a clear front image or PDF. Maximum 10 MB.</p>
                <span>{studentIdFileName || "Choose file ↗"}</span>
              </label>
              <label className={rosterFileName ? "has-file" : ""}>
                <input
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(event) => chooseFile(event, setRosterFileName)}
                  type="file"
                />
                <i>02</i>
                <strong>Official squad roster</strong>
                <p>Upload one document listing every registered squad member.</p>
                <span>{rosterFileName || "Choose file ↗"}</span>
              </label>
              <div className="student-upload-note">
                <span>Security protocol</span>
                <p>
                  Files remain attached only for this session. Draft storage remembers
                  filenames but never stores the documents on this device.
                </p>
              </div>
            </div>
          )}

          {currentStage === 5 && selectedGame && (
            <div className="student-review">
              <div className="student-review-hero">
                <span>Final system check</span>
                <strong>{teamName}</strong>
                <p>{selectedGame.name} // {selectedGame.teamSize}-player squad</p>
              </div>
              <dl>
                <div><dt>Captain</dt><dd>{captain.legalName}</dd></div>
                <div><dt>Captain email</dt><dd>{captain.email}</dd></div>
                <div><dt>Institution</dt><dd>{academic.institution}</dd></div>
                <div><dt>Course / year</dt><dd>{academic.course} / Year {academic.year}</dd></div>
                <div>
                  <dt>Roster</dt>
                  <dd>{captain.legalName}, {visibleTeammates.map((member) => member.name).join(", ")}</dd>
                </div>
                <div><dt>Documents</dt><dd>{studentIdFileName} / {rosterFileName}</dd></div>
              </dl>
              <label className="student-review-confirm">
                <input
                  checked={confirmed}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    setMessage("");
                  }}
                  type="checkbox"
                />
                <span>
                  I confirm that every squad member is a current student and all
                  submitted details are accurate.
                </span>
              </label>
            </div>
          )}
        </div>

        {message && (
          <p className={message.includes("secured") ? "student-reg-message is-success" : "student-reg-message"}>
            {message}
          </p>
        )}

        <footer className="student-reg-actions">
          <button
            className="student-reg-previous"
            disabled={currentStage === 0}
            onClick={previousStage}
            type="button"
          >
            ← Previous stage
          </button>
          <div>
            <button className="student-reg-save" onClick={saveDraft} type="button">
              Save draft
            </button>
            {currentStage < stages.length - 1 ? (
              <button className="student-reg-next" onClick={nextStage} type="button">
                Next: {stages[currentStage + 1].nav} <span>↗</span>
              </button>
            ) : (
              <button className="student-reg-next" onClick={submitRegistration} type="button">
                Submit squad <span>↗</span>
              </button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}
