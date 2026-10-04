"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#work", label: "Work" },
  { href: "#bts", label: "Behind the scenes" },
  { href: "#services", label: "Services" },
  { href: "#tools", label: "Tools" },
  { href: "#faq", label: "Questions" },
  { href: "#contact", label: "Contact" },
];

// Phones and tablets have no side rail, so they get a floating menu button
// that opens a full-screen section list.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    first.current?.focus();
    const btn = button.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className={`menu-btn${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav id="mobile-menu" className={`menu-sheet${open ? " is-open" : ""}`} aria-label="Sections" aria-hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
              <a
                ref={i === 0 ? first : undefined}
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
