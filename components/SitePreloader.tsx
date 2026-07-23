"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const slices = Array.from({ length: 10 }, (_, index) => ({
  delay: index * 48,
  position: `${index * (100 / 9)}%`,
}));

type SliceStyle = CSSProperties & {
  "--preloader-delay": string;
  "--preloader-position": string;
};

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "complete">(
    "loading",
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion ? 500 : 2800;
    const start = performance.now();
    const previousOverflow = document.body.style.overflow;
    let animationFrame = 0;
    let exitTimer = 0;
    let completeTimer = 0;

    document.body.style.overflow = "hidden";

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.15);
      setProgress(Math.min(100, Math.round(easedProgress * 100)));

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(updateProgress);
        return;
      }

      setProgress(100);
      exitTimer = window.setTimeout(
        () => setPhase("exiting"),
        reducedMotion ? 60 : 220,
      );
      completeTimer = window.setTimeout(
        () => {
          setPhase("complete");
          document.body.style.overflow = previousOverflow;
        },
        reducedMotion ? 360 : 1320,
      );
    };

    animationFrame = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "complete") return null;

  return (
    <section
      className={`arise-preloader${phase === "exiting" ? " is-exiting" : ""}`}
      aria-label={`Loading ARISE 2026. ${progress} percent complete.`}
      aria-live="polite"
      role="status"
    >
      <div className="arise-preloader-slices" aria-hidden="true">
        {slices.map((slice, index) => (
          <i
            key={index}
            style={
              {
                "--preloader-delay": `${slice.delay}ms`,
                "--preloader-position": slice.position,
              } as SliceStyle
            }
          />
        ))}
      </div>
      <div className="arise-preloader-shade" aria-hidden="true" />
      <div className="arise-preloader-grid" aria-hidden="true" />

      <header className="arise-preloader-top">
        <strong>ARISE<span>//</span>FEST</strong>
        <p>Global gaming protocol</p>
        <span>SYS_LOAD // S1</span>
      </header>

      <div className="arise-preloader-copy">
        <span className="arise-preloader-kicker">The next signal is incoming</span>
        <div className="arise-preloader-title">
          <h1>ARISE <em>2026</em></h1>
          <strong>Season 1</strong>
        </div>
        <p>Enter the signal. Own the arena.</p>
      </div>

      <div className="arise-preloader-progress">
        <div className="arise-preloader-count">
          <span>Initializing experience</span>
          <strong>{String(progress).padStart(3, "0")}<small>%</small></strong>
        </div>
        <div className="arise-preloader-track">
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>

      <footer className="arise-preloader-bottom">
        <span>Polaris School of Technology // Bengaluru</span>
        <span>Play. Build. Become.</span>
        <span>Terminal_ready</span>
      </footer>
    </section>
  );
}
