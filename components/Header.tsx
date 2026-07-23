"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Registration", href: "/registration" },
  { label: "Profile", href: "/schedule#profile" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="ARISE Festival home">
        ARISE<span>//</span>FEST
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link
            className={
              link.href.startsWith("/") &&
              !link.href.includes("#") &&
              (pathname === link.href || pathname.startsWith(`${link.href}/`))
                ? "nav-active"
                : undefined
            }
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="ticket-link" href="/registration">
        Register now <span>↗</span>
      </Link>
      <button className="menu-trigger" type="button" aria-label="Open menu">
        <i />
        <i />
      </button>
      <div className="mobile-panel">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
