"use client";

import { ArrowUp, Briefcase, Camera, CircleHelp, Clapperboard, House, Layers, Send, UserRound, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: "top", label: "Home", Icon: House },
  { id: "about", label: "About", Icon: UserRound },
  { id: "journey", label: "Journey", Icon: Briefcase },
  { id: "work", label: "Work", Icon: Clapperboard },
  { id: "bts", label: "Behind the scenes", Icon: Camera },
  { id: "services", label: "Services", Icon: Layers },
  { id: "tools", label: "Tools", Icon: Wrench },
  { id: "faq", label: "Questions", Icon: CircleHelp },
  { id: "contact", label: "Contact", Icon: Send },
];

// Right-hand section rail with scrollspy, like a timeline's track list.
export default function RailNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Sections">
      <ul>
        {items.map(({ id, label, Icon }) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? "is-active" : undefined} aria-current={active === id ? "true" : undefined}>
              <Icon size={16} strokeWidth={1.8} aria-hidden />
              <span className="rail-tip">{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href="#top" className="rail-up" aria-label="Back to top">
        <ArrowUp size={16} strokeWidth={1.8} />
      </a>
    </nav>
  );
}
