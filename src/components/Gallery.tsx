"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { gallery, galleryChapters, type GalleryChapter } from "@/content/site";

// Edge-print frame numbers, like a contact sheet: 12, 12A, 13, 13A…
const frameNo = (i: number) => `${12 + Math.floor(i / 2)}${i % 2 ? "A" : ""}`;

// Behind-the-scenes photos laid out as a photographer's contact sheet.
// Hover draws a grease-pencil circle; click opens a viewer with thumbnails and swipe.
export default function Gallery() {
  const [chapter, setChapter] = useState<GalleryChapter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipe = useRef<number | null>(null);

  let k = 0;
  const items = gallery
    .map((g) => ({ ...g, label: g.frame ?? frameNo(k++) }))
    .filter((g) => chapter === "all" || g.chapter === chapter);
  const heroSrc = gallery.find((g) => g.chapter === "set")?.src;
  const current = index === null ? null : items[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

  return (
    <>
      <div className="sheet-tabs" role="tablist" aria-label="Photo chapters">
        {galleryChapters.map((c) => {
          const count = c.id === "all" ? gallery.length : gallery.filter((g) => g.chapter === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={chapter === c.id}
              className={chapter === c.id ? "is-active" : undefined}
              onClick={() => setChapter(c.id)}
            >
              {c.label}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="sheet">
        <p className="sheet-edge" aria-hidden>
          JAYESH ADHIKARI FILMS · ROLL 01 · {items.length} FRAMES
        </p>
        {/* key remounts the grid so the frames cut in again on every chapter change */}
        <ul key={chapter} className="sheet-grid">
          {items.map((g, i) => (
            <li
              key={g.src}
              className={g.src === heroSrc && (chapter === "all" || chapter === "set") ? "is-hero" : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <button type="button" className="shot" onClick={() => open(i)} aria-label={`Open photo: ${g.caption}`}>
                <span className="shot-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.caption} width={g.w} height={g.h} loading="lazy" draggable={false} />
                  <svg className="pick" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                    <path d="M50 6 C78 5 95 22 94 48 C93 76 74 95 48 94 C21 93 5 74 6 49 C7 25 24 9 53 8 C62 8 70 10 76 14" />
                  </svg>
                </span>
                <span className="shot-cap">
                  <span>{g.label}</span>
                  {g.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="sheet-edge bottom" aria-hidden>
          ▸ {items[0]?.label} — {items[items.length - 1]?.label}
        </p>
      </div>

      <dialog
        ref={dialog}
        className="player lightbox viewer"
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
                  Frame {current.label} · {(index ?? 0) + 1} / {items.length}
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
            <div
              className="lightbox-img"
              onPointerDown={(e) => (swipe.current = e.clientX)}
              onPointerUp={(e) => {
                if (swipe.current === null) return;
                const dx = e.clientX - swipe.current;
                swipe.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.src} src={current.src} alt={current.caption} width={current.w} height={current.h} draggable={false} />
            </div>
            <div className="thumbs" role="list" aria-label="All photos in this chapter">
              {items.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  role="listitem"
                  className={i === index ? "is-active" : undefined}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${g.caption}`}
                  aria-current={i === index}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
