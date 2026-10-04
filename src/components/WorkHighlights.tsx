"use client";

import { Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { projects } from "@/content/site";
import { PROJECT_EVENT } from "./ProfileCard";

export default function WorkHighlights() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  // Tell the profile card which project is centred on screen (null when none is).
  useEffect(() => {
    const visible = new Set<number>();
    let current: number | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting) visible.add(i);
          else visible.delete(i);
        });
        const next = visible.size ? Math.min(...visible) : null;
        if (next !== current) {
          current = next;
          window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: next }));
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => {
      io.disconnect();
      window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: null }));
    };
  }, []);

  return (
    <div className="works">
      {projects.map((p, i) => {
        const media = (
          <>
            <div
              className={`work-media${p.thumb ? "" : ` grad-${i % 4}`}`}
              style={p.thumb ? { backgroundImage: `url('${p.thumb}')` } : undefined}
            >
              <span className="work-play" aria-hidden>
                <Play size={22} fill="currentColor" />
              </span>
              <span className="work-len">{p.length}</span>
            </div>
            <div className="work-meta">
              <h3>{p.title}</h3>
              <span>{p.tags[0]}</span>
            </div>
          </>
        );
        return (
          <article key={p.title} ref={(el) => void (refs.current[i] = el)} data-index={i} className="work">
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener" aria-label={`Watch ${p.title}`}>
                {media}
              </a>
            ) : (
              media
            )}
          </article>
        );
      })}
    </div>
  );
}
