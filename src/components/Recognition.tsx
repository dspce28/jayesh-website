"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import { recognition } from "@/content/site";

// Awards, selections and press. Each card opens the original document or photo.
export default function Recognition() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : recognition[index];

  return (
    <>
      <ul className="awards">
        {recognition.map((r, i) => (
          <li key={r.src} data-reveal="zoom" style={{ "--i": i } as React.CSSProperties}>
            <button
              type="button"
              className="award"
              data-tilt="4"
              data-cursor="View"
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
              aria-label={`${r.kind}: ${r.title}. Open the document`}
            >
              <span className="work-glare" aria-hidden />
              <span className="award-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.src} alt="" width={r.w} height={r.h} loading="lazy" />
              </span>
              <span className="award-text">
                <small>{r.kind}</small>
                <strong>{r.title}</strong>
                <span>{r.detail}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="player lightbox"
        aria-label={current ? current.title : "Document"}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {current && (
          <div className="player-inner">
            <div className="player-head">
              <div>
                <strong>
                  {current.kind}: {current.title}
                </strong>
                <span>{current.detail}</span>
              </div>
              <button type="button" className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus>
                <X size={18} />
              </button>
            </div>
            <div className="lightbox-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={`${current.title}, ${current.detail}`} width={current.w} height={current.h} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
