"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { RegistrationComparison } from "./RegistrationComparison";

type Entry = {
  id: string;
  code: string;
  system: string;
  title: string;
  copy: string;
  format: string;
  time: string;
  docs: string;
  status: string;
  accent: "violet" | "cyan" | "white" | "lime" | "coral";
  icon: string;
};

const entries: Entry[] = [
  {
    id: "student",
    code: "01",
    system: "Academic",
    title: "Student Participant",
    copy: "For current students ready to showcase their skills, enter challenges, and connect with the professional ecosystem.",
    format: "Squad entry (4–10)",
    time: "~12 minutes",
    docs: "Student ID / status",
    status: "Available",
    accent: "violet",
    icon: "◇",
  },
  {
    id: "programmer",
    code: "02",
    system: "Core_Dev",
    title: "Competitive Programmer",
    copy: "The elite technical track for algorithms, optimization, security, and high-performance computing.",
    format: "Team (3–4)",
    time: "~20 minutes",
    docs: "GitHub / portfolio",
    status: "Active",
    accent: "cyan",
    icon: "⌘",
  },
  {
    id: "visitor",
    code: "03",
    system: "Observer",
    title: "General Visitor",
    copy: "Access the expo floor, keynotes, live stages, workshops, and spectator areas across all four arenas.",
    format: "Individual pass",
    time: "~5 minutes",
    docs: "Government ID",
    status: "Available",
    accent: "white",
    icon: "◉",
  },
  {
    id: "indie",
    code: "04",
    system: "Creative",
    title: "Indie Game Developer",
    copy: "Apply for showcase space in the Indie Discovery Zone, with launch slots and networking access.",
    format: "Studio / small team",
    time: "~25 minutes",
    docs: "Playable build / video",
    status: "Review only",
    accent: "lime",
    icon: "♢",
  },
  {
    id: "builder",
    code: "05",
    system: "Build_Athon",
    title: "Minecraft Builder",
    copy: "Enter the 48-hour massive build-a-thon. Theme: Post-Human Nexus. High prizes for geometry and detail.",
    format: "Team (max 8)",
    time: "~10 minutes",
    docs: "Portfolio / screenshots",
    status: "Limited slots",
    accent: "coral",
    icon: "⬡",
  },
];

const focusOptions = [
  { id: "technical", label: "Technical", copy: "Building, coding, hacking" },
  { id: "creative", label: "Creative", copy: "Designing, gaming, making" },
  { id: "observer", label: "Observer", copy: "Watching, networking, learning" },
];

const experienceOptions = [
  { id: "student", label: "Student", copy: "Currently enrolled" },
  { id: "professional", label: "Professional", copy: "Working or independent" },
  { id: "team", label: "Team", copy: "Studio or competitive squad" },
];

const goalOptions = [
  { id: "compete", label: "Compete", copy: "Test my skills" },
  { id: "showcase", label: "Showcase", copy: "Present my work" },
  { id: "explore", label: "Explore", copy: "Experience the festival" },
];

export function RegistrationEntryPortal() {
  const [selected, setSelected] = useState<string | null>(null);
  const [focus, setFocus] = useState("");
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const selectionRef = useRef<HTMLDivElement>(null);

  const selectedEntry = entries.find((entry) => entry.id === selected);

  const recommendation = useMemo(() => {
    if (!focus || !experience || !goal) return null;
    if (goal === "explore" || focus === "observer") return entries[2];
    if (goal === "showcase" && focus === "creative") return entries[3];
    if (goal === "compete" && focus === "technical") {
      return experience === "team" ? entries[4] : entries[1];
    }
    if (experience === "student") return entries[0];
    return entries[2];
  }, [focus, experience, goal]);

  function selectEntry(id: string) {
    setSelected(id);
    window.setTimeout(
      () => selectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      50,
    );
  }

  return (
    <>
      <section className="entry-grid" aria-label="Registration types">
        {entries.map((entry) => (
          <article
            className={`entry-card entry-card--${entry.accent}${selected === entry.id ? " is-selected" : ""}`}
            key={entry.id}
          >
            <div className="entry-card-top">
              <span>{entry.code} // {entry.system}</span>
              <i>{entry.icon}</i>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.copy}</p>
            <dl>
              <div><dt>Format</dt><dd>{entry.format}</dd></div>
              <div><dt>Completion time</dt><dd>{entry.time}</dd></div>
              <div><dt>Required docs</dt><dd>{entry.docs}</dd></div>
              <div><dt>Status</dt><dd>{entry.status}</dd></div>
            </dl>
            <button type="button" onClick={() => selectEntry(entry.id)}>
              {selected === entry.id ? "Entry point selected" : "Select registration"}
            </button>
          </article>
        ))}

        <article className="entry-help-card">
          <div>?</div>
          <h2>Not sure?</h2>
          <p>Use the guided selector to find your best entry point based on your skills and objective.</p>
          <a href="#guided-selector">Open selector ↓</a>
        </article>
      </section>

      <div className={selectedEntry ? "entry-selection is-visible" : "entry-selection"} ref={selectionRef}>
        {selectedEntry && (
          <>
            <div>
              <span>Selected entry point</span>
              <strong>{selectedEntry.title}</strong>
              <p>{selectedEntry.format} // {selectedEntry.time}</p>
            </div>
            {selectedEntry.id === "student" || selectedEntry.id === "programmer" ? (
              <Link href={selectedEntry.id === "student" ? "/registration/student" : "/registration/programming"}>
                Continue to {selectedEntry.system} registration <span>↗</span>
              </Link>
            ) : (
              <button type="button" disabled>
                {selectedEntry.system} registration coming next
              </button>
            )}
          </>
        )}
      </div>

      <RegistrationComparison />

      <section className="guided-selector" id="guided-selector">
        <div className="guided-heading">
          <span>Pathfinder_Protocol</span>
          <h2>Guided selector</h2>
          <p>Answer three quick questions to reveal your optimal registration path.</p>
        </div>

        <div className="guided-question">
          <span>01. What is your primary focus?</span>
          <div>
            {focusOptions.map((option) => (
              <button
                className={focus === option.id ? "is-active" : ""}
                type="button"
                onClick={() => setFocus(option.id)}
                key={option.id}
              >
                <strong>{option.label}</strong><small>{option.copy}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="guided-question">
          <span>02. What best describes you?</span>
          <div>
            {experienceOptions.map((option) => (
              <button
                className={experience === option.id ? "is-active" : ""}
                type="button"
                onClick={() => setExperience(option.id)}
                key={option.id}
              >
                <strong>{option.label}</strong><small>{option.copy}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="guided-question">
          <span>03. What do you want from ARISE//FEST?</span>
          <div>
            {goalOptions.map((option) => (
              <button
                className={goal === option.id ? "is-active" : ""}
                type="button"
                onClick={() => setGoal(option.id)}
                key={option.id}
              >
                <strong>{option.label}</strong><small>{option.copy}</small>
              </button>
            ))}
          </div>
        </div>

        <div className={recommendation ? "guided-result is-ready" : "guided-result"}>
          {recommendation ? (
            <>
              <div><span>Optimal path detected</span><strong>{recommendation.title}</strong></div>
              <p>{recommendation.copy}</p>
              <button type="button" onClick={() => selectEntry(recommendation.id)}>
                Select this entry point ↗
              </button>
            </>
          ) : (
            <p>Complete all three signals to generate a recommendation.</p>
          )}
        </div>
      </section>
    </>
  );
}
