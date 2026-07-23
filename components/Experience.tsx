"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export function Experience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const handlePointer = (event: PointerEvent) => {
      node.style.setProperty("--pointer-x", `${event.clientX}px`);
      node.style.setProperty("--pointer-y", `${event.clientY}px`);
      node.style.setProperty(
        "--hero-x",
        `${(event.clientX / window.innerWidth - 0.5) * 14}px`,
      );
      node.style.setProperty(
        "--hero-y",
        `${(event.clientY / window.innerHeight - 0.5) * 14}px`,
      );
    };

    const updateCountdown = () => {
      const target = new Date("2026-09-12T09:00:00+05:30").getTime();
      const distance = Math.max(0, target - Date.now());
      const values = {
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance / 3600000) % 24),
        minutes: Math.floor((distance / 60000) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };

      Object.entries(values).forEach(([key, value]) => {
        const targetNode = node.querySelector(`[data-countdown="${key}"]`);
        if (targetNode) targetNode.textContent = String(value).padStart(2, "0");
      });
    };

    const menuButton = node.querySelector<HTMLButtonElement>(".menu-trigger");
    const menuLinks = node.querySelectorAll<HTMLAnchorElement>(".mobile-panel a");
    const toggleMenu = () => setMenuOpen((current) => !current);
    const closeMenu = () => setMenuOpen(false);

    window.addEventListener("pointermove", handlePointer, { passive: true });
    menuButton?.addEventListener("click", toggleMenu);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      menuButton?.removeEventListener("click", toggleMenu);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div ref={root} className={menuOpen ? "experience menu-open" : "experience"}>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      {children}
    </div>
  );
}
