export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="ARISE Festival home">
        ARISE<span>//</span>FEST
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#arenas">Arenas</a>
        <a href="#schedule">Schedule</a>
        <a href="#protocols">Protocols</a>
        <a href="#access">Access</a>
      </nav>
      <a className="ticket-link" href="#access">
        Get tickets <span>↗</span>
      </a>
      <button className="menu-trigger" type="button" aria-label="Open menu">
        <i />
        <i />
      </button>
      <div className="mobile-panel">
        <a href="#arenas">Arenas</a>
        <a href="#schedule">Schedule</a>
        <a href="#protocols">Protocols</a>
        <a href="#access">Get tickets</a>
      </div>
    </header>
  );
}
