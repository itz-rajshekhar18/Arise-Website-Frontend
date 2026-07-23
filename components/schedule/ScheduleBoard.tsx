"use client";

import { useMemo, useState } from "react";

type Session = {
  id: string;
  day: "12" | "13" | "14";
  time: string;
  end: string;
  category: "esports" | "indie" | "blocks" | "algo" | "after";
  stage: string;
  type: string;
  title: string;
  copy: string;
  status: "upcoming" | "live" | "closed";
  accent: "violet" | "cyan" | "lime";
  detail: string;
};

const sessions: Session[] = [
  {
    id: "opening",
    day: "12",
    time: "09:00",
    end: "10:00",
    category: "esports",
    stage: "Main stage",
    type: "Opening",
    title: "Grand opening ceremony",
    copy: "Technical showcase, light performance, and the festival bracket reveal.",
    status: "upcoming",
    accent: "violet",
    detail: "Gates open at 08:15. Badge scan and seating begin 30 minutes before transmission.",
  },
  {
    id: "valorant",
    day: "12",
    time: "11:30",
    end: "14:00",
    category: "esports",
    stage: "Arena 01",
    type: "Qualifier",
    title: "Valorant pro-am series",
    copy: "Round one bracket play. Top four teams advance to Saturday semi-finals.",
    status: "live",
    accent: "cyan",
    detail: "Best-of-three format. Team check-in closes at 10:45 beside the competition desk.",
  },
  {
    id: "indie-first-look",
    day: "12",
    time: "14:30",
    end: "16:00",
    category: "indie",
    stage: "Expo floor",
    type: "Showcase",
    title: "Indie first-look: New worlds",
    copy: "Twelve unreleased titles. Ten minutes each. Zero filler.",
    status: "upcoming",
    accent: "lime",
    detail: "Audience choice voting opens at the end of the session through your festival badge.",
  },
  {
    id: "block-build",
    day: "12",
    time: "17:00",
    end: "20:00",
    category: "blocks",
    stage: "Arena 03",
    type: "Build sprint",
    title: "Block architects: City zero",
    copy: "Squads build a living city from a blank server in under three hours.",
    status: "upcoming",
    accent: "violet",
    detail: "Teams of up to four. The custom server seed is revealed when the countdown starts.",
  },
  {
    id: "algo-qualifier",
    day: "13",
    time: "08:30",
    end: "11:30",
    category: "algo",
    stage: "Code lab",
    type: "Qualifier",
    title: "Algo_Strat logic gauntlet",
    copy: "Six problems. Three hours. One route to the Sunday final.",
    status: "upcoming",
    accent: "lime",
    detail: "Bring a laptop and charger. Approved runtimes and language versions are listed in the rules.",
  },
  {
    id: "creator-lab",
    day: "13",
    time: "12:30",
    end: "14:00",
    category: "indie",
    stage: "Studio B",
    type: "Workshop",
    title: "From prototype to playable",
    copy: "A tactical teardown of iteration, player feedback, and getting to launch.",
    status: "upcoming",
    accent: "cyan",
    detail: "Limited to 120 participants. Entry is first-come after badge reservation.",
  },
  {
    id: "esports-semis",
    day: "13",
    time: "16:00",
    end: "20:30",
    category: "esports",
    stage: "Main stage",
    type: "Semi-finals",
    title: "E-sports showdown: Final four",
    copy: "Four teams remain. Two step into the global final.",
    status: "upcoming",
    accent: "violet",
    detail: "Doors open at 15:15. Live commentary and post-match analysis follow each series.",
  },
  {
    id: "midnight-signal",
    day: "13",
    time: "22:00",
    end: "00:30",
    category: "after",
    stage: "Signal hall",
    type: "After hours",
    title: "Midnight signal",
    copy: "Live audiovisual sets, creator meetups, and controlled system overload.",
    status: "upcoming",
    accent: "cyan",
    detail: "18+ entry after 22:00. Government photo ID is required at the signal hall gate.",
  },
  {
    id: "grand-finals",
    day: "14",
    time: "17:30",
    end: "21:00",
    category: "esports",
    stage: "Main stage",
    type: "Grand final",
    title: "The ascension protocol",
    copy: "Championship series, arena awards, and the final ARISE transmission.",
    status: "upcoming",
    accent: "lime",
    detail: "Priority seating begins at 16:30 for Prime Access holders. General doors open at 17:00.",
  },
];

const filters = [
  { id: "all", label: "All sessions" },
  { id: "esports", label: "E-sports" },
  { id: "indie", label: "Indie expo" },
  { id: "blocks", label: "Block architects" },
  { id: "algo", label: "Algo_Strat" },
  { id: "after", label: "After hours" },
];

const days = [
  { id: "12", month: "Sep", label: "D1", weekday: "Fri" },
  { id: "13", month: "Sep", label: "D2", weekday: "Sat" },
  { id: "14", month: "Sep", label: "D3", weekday: "Sun" },
];

export function ScheduleBoard() {
  const [activeDay, setActiveDay] = useState<"12" | "13" | "14">("12");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>(["opening"]);

  const visibleSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.day === activeDay &&
          (activeFilter === "all" || session.category === activeFilter),
      ),
    [activeDay, activeFilter],
  );

  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <section className="sched-board" id="schedule-board">
      <div className="sched-filter-bar">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter.id ? "is-active" : ""}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            key={filter.id}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="sched-board-body">
        <div className="sched-days" role="tablist" aria-label="Festival days">
          {days.map((day) => (
            <button
              className={activeDay === day.id ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={activeDay === day.id}
              onClick={() => setActiveDay(day.id as "12" | "13" | "14")}
              key={day.id}
            >
              <span>{day.month} {day.id}</span>
              <strong>{day.label}</strong>
              <small>{day.weekday}</small>
            </button>
          ))}
        </div>

        <div className="sched-session-list" aria-live="polite">
          <div className="sched-list-head">
            <span>{visibleSessions.length.toString().padStart(2, "0")} transmissions found</span>
            <strong>Day_{activeDay === "12" ? "01" : activeDay === "13" ? "02" : "03"}</strong>
          </div>

          {visibleSessions.length === 0 ? (
            <div className="sched-empty">
              <span>NO_SIGNAL</span>
              <p>No sessions in this arena on the selected day.</p>
              <button type="button" onClick={() => setActiveFilter("all")}>Reset filter</button>
            </div>
          ) : (
            visibleSessions.map((session) => {
              const isSaved = saved.includes(session.id);
              const isExpanded = expanded === session.id;
              return (
                <article className={`session-card session-card--${session.accent}`} key={session.id}>
                  <div className="session-time">
                    <strong>{session.time}</strong>
                    <span>{session.status === "live" ? "Live now" : session.status}</span>
                    <small>{session.end}</small>
                  </div>
                  <div className="session-main">
                    <div className="session-tags">
                      <span>{session.stage}</span>
                      <i>{session.type}</i>
                    </div>
                    <h3>{session.title}</h3>
                    <p>{session.copy}</p>
                    {isExpanded && <p className="session-detail">{session.detail}</p>}
                  </div>
                  <div className="session-actions">
                    <button
                      className={isSaved ? "is-saved" : ""}
                      type="button"
                      onClick={() => toggleSaved(session.id)}
                      aria-label={isSaved ? `Remove ${session.title} from my schedule` : `Add ${session.title} to my schedule`}
                    >
                      {isSaved ? "✓ Saved" : "+ My schedule"}
                    </button>
                    <button type="button" onClick={() => setExpanded(isExpanded ? null : session.id)}>
                      {isExpanded ? "Close" : "Details"}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      <div className="my-sessions-strip" id="my-sessions">
        <div><span>My_schedule</span><strong>{saved.length.toString().padStart(2, "0")} sessions locked</strong></div>
        <p>Your saved signals stay on this device until the system goes live.</p>
      </div>
    </section>
  );
}
