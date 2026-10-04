"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gallery } from "@/content/site";

// Behind-the-scenes photos as a draggable film strip; tap one for a lightbox.
export default function Gallery() {
  const strip = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  // Mouse drag-to-scroll (touch already scrolls natively).
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 4) {
        // Only now is it a drag: stop snapping and stop the photo under the pointer from taking the click.
        d.moved = true;
        el.classList.add("is-dragging");
      }
      if (d.moved) el.scrollLeft = d.left - dx;
    };
    const up = () => {
      drag.current.down = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const open = (i: number) => {
    if (drag.current.moved) return; // a drag, not a click
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));
  const current = index === null ? null : gallery[index];

  return (
    <>
      <div className="strip-wrap">
        <div ref={strip} className="strip" tabIndex={0} aria-label="Behind the scenes photos, scroll sideways" data-cursor="Drag">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              className="frame"
              style={{ aspectRatio: `${g.w} / ${g.h}` } as React.CSSProperties}
              onClick={() => open(i)}
              aria-label={`Open photo: ${g.caption}`}
              data-cursor="View"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.caption} width={g.w} height={g.h} loading="lazy" draggable={false} />
              <span className="frame-cap">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {g.caption}
              </span>
            </button>
          ))}
        </div>
        <div className="strip-controls">
          <button type="button" className="icon-btn" aria-label="Scroll back" onClick={() => strip.current?.scrollBy({ left: -strip.current.clientWidth * 0.8, behavior: "smooth" })}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="icon-btn" aria-label="Scroll forward" onClick={() => strip.current?.scrollBy({ left: strip.current.clientWidth * 0.8, behavior: "smooth" })}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="player lightbox"
        aria-label={current ? current.caption : "Photo"}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <div className="player-inner">
            <div className="player-head">
              <div>
                <strong>{current.caption}</strong>
                <span>
                  {(index ?? 0) + 1} / {gallery.length}
                </span>
              </div>
              <div className="lightbox-nav">
                <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous photo">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next photo">
                  <ChevronRight size={18} />
                </button>
                <button type="button" className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close photo" autoFocus>
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="lightbox-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.src} src={current.src} alt={current.caption} width={current.w} height={current.h} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
