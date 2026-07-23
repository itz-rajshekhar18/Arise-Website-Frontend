"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { CyberAtmosphere } from "./CyberAtmosphere";
import { MatrixRain } from "./MatrixRain";

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
    const revealNodes = node.querySelectorAll<HTMLElement>(
      "main > section, main article, main .code-reg-card, main .student-reg-panel, main .venue-map-card, main .equipment-card, main .sponsor-form",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    revealNodes.forEach((revealNode, index) => {
      revealNode.classList.add("fx-reveal");
      revealNode.style.setProperty("--fx-reveal-delay", `${(index % 6) * 45}ms`);
    });

    const revealObserver = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
        );

    revealNodes.forEach((revealNode) => {
      if (reducedMotion) revealNode.classList.add("is-visible");
      else revealObserver?.observe(revealNode);
    });

    const handleScroll = () => {
      const scrollRange = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      node.style.setProperty("--scroll-progress", String(window.scrollY / scrollRange));
      node.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    menuButton?.addEventListener("click", toggleMenu);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    updateCountdown();
    handleScroll();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      menuButton?.removeEventListener("click", toggleMenu);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      revealObserver?.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div ref={root} className={menuOpen ? "experience menu-open" : "experience"}>
      <div className="cursor-glow" aria-hidden="true" />
      <CyberAtmosphere />
      <MatrixRain />
      <div className="scanlines" aria-hidden="true" />
      {children}
    </div>
  );
}
