"use client";

import { useEffect, useState } from "react";

const panelLinks = [
  { code: "01", label: "Overview", href: "#overview" },
  { code: "02", label: "Schedule", href: "#schedule-board" },
  { code: "03", label: "Venue map", href: "#venue" },
  { code: "04", label: "My sessions", href: "#my-sessions" },
  { code: "05", label: "Settings", href: "#profile" },
];

export function ScheduleSidebar() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash;
      setActiveHash(panelLinks.some((link) => link.href === hash) ? hash : "");
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);
    return () => window.removeEventListener("hashchange", syncActiveSection);
  }, []);

  return (
    <aside className="sched-sidebar" id="profile">
      <div className="sched-player">
        <div className="sched-avatar" aria-hidden="true"><i /><span /></div>
        <div>
          <strong>PLAYER_01</strong>
          <span>Verified participant</span>
        </div>
        <b />
      </div>

      <nav className="sched-panel-nav" aria-label="Schedule dashboard">
        {panelLinks.map((link) => (
          <a
            className={activeHash === link.href ? "is-active" : undefined}
            href={link.href}
            onClick={() => setActiveHash(link.href)}
            key={link.code}
          >
            <span>{link.code}</span>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="sched-pass">
        <div><span>Access tier</span><strong>Full transmission</strong></div>
        <div><span>Badge status</span><strong className="lime">Ready</strong></div>
        <a href="/#access">Upgrade access ↗</a>
      </div>
    </aside>
  );
}
