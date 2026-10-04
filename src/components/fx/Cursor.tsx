"use client";

import { useEffect, useRef } from "react";

// Ring cursor that trails the pointer, grows over interactive elements and shows a
// label from the nearest [data-cursor] ("Play", "Drag", …). Fine pointers only.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current!;
    const d = dot.current!;
    const l = label.current!;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let visible = false;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        visible = true;
        root.classList.add("cursor-visible");
      }
      const t = e.target as Element | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, summary, select, label, [role='slider']");
      const text = labelled?.dataset.cursor ?? "";
      if (l.textContent !== text) l.textContent = text;
      r.classList.toggle("is-label", !!text);
      r.classList.toggle("is-hover", !text && !!interactive);
    };
    const leave = () => {
      visible = false;
      root.classList.remove("cursor-visible");
    };
    const down = () => r.classList.add("is-down");
    const up = () => r.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor", "cursor-visible");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden>
      <div ref={ring} className="cursor-ring">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
