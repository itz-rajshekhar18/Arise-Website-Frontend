import type { CSSProperties } from "react";

const columns = Array.from({ length: 56 }, (_, index) => {
  const left = (index / 55) * 100;
  const duration = 4.8 + (index % 9) * 0.47;
  const delay = -((index * 1.37) % 8.4);

  return { delay, duration, left };
});

type MatrixColumnStyle = CSSProperties & {
  "--matrix-delay": string;
  "--matrix-duration": string;
  "--matrix-left": string;
};

export function MatrixRain() {
  return (
    <div className="matrix-rain" aria-hidden="true">
      {columns.map((column, index) => (
        <i
          className="matrix-rain-column"
          key={index}
          style={
            {
              "--matrix-delay": `${column.delay}s`,
              "--matrix-duration": `${column.duration}s`,
              "--matrix-left": `${column.left}%`,
            } as MatrixColumnStyle
          }
        />
      ))}
    </div>
  );
}
