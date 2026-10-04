"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { services } from "@/content/site";

export default function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {services.map((s, i) => {
        const isOpen = open === i;
        const id = `svc-${i}`;
        return (
          <div key={s.title} className={`acc-item${isOpen ? " is-open" : ""}`} data-reveal="row" style={{ "--i": i } as React.CSSProperties}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{s.title}</span>
                <span className="icon-btn">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
              </button>
            </h3>
            <div id={id} className="acc-panel" role="region" aria-label={s.title}>
              <div>
                <ul className="tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p>{s.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
