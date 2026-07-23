import type { CSSProperties } from "react";

const particles = Array.from({ length: 74 }, (_, index) => ({
  delay: -((index * 1.73) % 13),
  duration: 7 + (index % 8) * 1.15,
  left: (index * 37.17) % 100,
  size: 1 + (index % 4),
  top: (index * 61.23) % 100,
}));

type ParticleStyle = CSSProperties & {
  "--fx-delay": string;
  "--fx-duration": string;
  "--fx-left": string;
  "--fx-size": string;
  "--fx-top": string;
};

export function CyberAtmosphere() {
  return (
    <div className="cyber-atmosphere" aria-hidden="true">
      <div className="cyber-aurora cyber-aurora--one" />
      <div className="cyber-aurora cyber-aurora--two" />
      <div className="cyber-floor-grid" />
      <div className="cyber-beams">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="cyber-particles">
        {particles.map((particle, index) => (
          <i
            key={index}
            style={
              {
                "--fx-delay": `${particle.delay}s`,
                "--fx-duration": `${particle.duration}s`,
                "--fx-left": `${particle.left}%`,
                "--fx-size": `${particle.size}px`,
                "--fx-top": `${particle.top}%`,
              } as ParticleStyle
            }
          />
        ))}
      </div>
      <div className="cyber-reticle">
        <i />
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="cyber-sweep" />
    </div>
  );
}
