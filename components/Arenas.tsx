import Image from "next/image";

const arenas = [
  {
    number: "01",
    eyebrow: "Elite competition",
    title: "E-Sports Showdown",
    copy: "Global pro circuits and amateur qualifiers. The ultimate proving ground for tactical supremacy.",
    accent: "violet",
    image: "/arena.jpg",
    className: "arena-card arena-card--wide",
  },
  {
    number: "02",
    eyebrow: "Developer zone",
    title: "Indie Expo",
    copy: "First-play access to tomorrow’s hits. Meet the visionaries redefining digital entertainment.",
    accent: "lime",
    image: "/indie.jpg",
    className: "arena-card arena-card--portrait arena-card--image",
  },
  {
    number: "03",
    eyebrow: "Virtual worlds",
    title: "Block Architects",
    copy: "Massive live builds and survival challenges on our custom-provisioned ARISE servers.",
    accent: "violet",
    className: "arena-card arena-card--small arena-card--wire",
  },
  {
    number: "04",
    eyebrow: "Binary duels",
    title: "Algo_Strat",
    copy: "Competitive programming sprints. Solve complex logic puzzles under extreme time pressure.",
    accent: "lime",
    className: "arena-card arena-card--small arena-card--matrix",
  },
];

export function Arenas() {
  return (
    <section className="arenas section-pad" id="arenas">
      <div className="section-kicker">
        <span>01 // Arena_System</span>
        <span>Choose your path</span>
      </div>
      <div className="section-heading">
        <h2>One festival.<br />Four arenas.</h2>
        <p>
          A converged experience spanning four high-intensity disciplines.
          Every arena is a doorway. Which version of yourself shows up?
        </p>
      </div>

      <div className="arena-grid">
        {arenas.map((arena) => (
          <article className={arena.className} key={arena.number}>
            {arena.image && (
              <Image
                src={arena.image}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="arena-image"
              />
            )}
            <div className="arena-fx" aria-hidden="true" />
            <span className="arena-number">{arena.number}</span>
            <div className="arena-content">
              <span className={`chip chip--${arena.accent}`}>{arena.eyebrow}</span>
              <h3>{arena.title}</h3>
              <p>{arena.copy}</p>
              <span className="arena-enter">Enter arena ↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
