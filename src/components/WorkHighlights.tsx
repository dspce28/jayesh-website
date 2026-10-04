"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/site";
import { PROJECT_EVENT } from "./ProfileCard";

// "8:29" -> 509
function seconds(length: string) {
  return length.split(":").reduce((acc, n) => acc * 60 + Number(n), 0);
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export default function WorkHighlights() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

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

  const open = (i: number) => {
    setPlaying(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const current = playing === null ? null : projects[playing];

  return (
    <>
      <div className="works">
        {projects.map((p, i) => (
          <article key={p.title} ref={(el) => void (refs.current[i] = el)} data-index={i} className="work" data-reveal="zoom">
            <a
              href={watch(p.youtube)}
              target="_blank"
              rel="noopener"
              aria-label={`Play ${p.title} (${p.length})`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                open(i);
              }}
            >
              <div
                className="work-media has-thumb"
                style={{ backgroundImage: `url('${thumb(p.youtube)}')` }}
                data-tilt="5"
                data-duration={seconds(p.length)}
                data-cursor="Play"
              >
                <span className="work-shade" aria-hidden />
                <span className="work-glare" aria-hidden />
                <span className="work-index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="work-title-overlay" aria-hidden>
                  {p.title}
                  <small>{p.tags[0]}</small>
                </span>
                <span className="work-play" aria-hidden>
                  <Play size={22} fill="currentColor" />
                </span>
                <span className="scrub" aria-hidden>
                  <span className="scrub-line" />
                  <span className="scrub-tc">00:00 / {p.length}</span>
                </span>
                <span className="work-len">{p.length}</span>
              </div>
              <div className="work-meta">
                <h3>{p.title}</h3>
                <span>{p.tags[0]}</span>
              </div>
            </a>
          </article>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="player"
        aria-label={current ? `${current.title} video` : "Video"}
        onClose={() => setPlaying(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="player-inner">
            <div className="player-head">
              <div>
                <strong>{current.title}</strong>
                <span>
                  {current.tags.join(" · ")} · {current.length}
                </span>
              </div>
              <button type="button" className="icon-btn" onClick={close} aria-label="Close video" autoFocus>
                <X size={18} />
              </button>
            </div>
            <div className="player-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${current.youtube}?autoplay=1&rel=0&modestbranding=1`}
                title={current.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
