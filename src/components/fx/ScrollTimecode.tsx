"use client";

import { useEffect, useRef } from "react";

const FPS = 24;
const RUNTIME = 180; // the page "plays" as a 3-minute reel
const two = (n: number) => String(n).padStart(2, "0");

// Scroll progress as an edit playhead: a red bar across the top and a running timecode.
export default function ScrollTimecode() {
  const bar = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      bar.current!.style.transform = `scaleX(${p})`;
      const t = p * RUNTIME;
      const s = Math.floor(t);
      const f = Math.floor((t - s) * FPS);
      tc.current!.textContent = `00:${two(Math.floor(s / 60))}:${two(s % 60)}:${two(f)}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-bar" aria-hidden>
        <div ref={bar} />
      </div>
      <div className="scroll-tc" aria-hidden>
        <span className="rec" />
        <span ref={tc}>00:00:00:00</span>
      </div>
    </>
  );
}
