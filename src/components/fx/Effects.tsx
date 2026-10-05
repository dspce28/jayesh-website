"use client";

import { useEffect } from "react";

const SCRAMBLE = "0123456789:#/*+-";

function scramble(el: HTMLElement) {
  const final = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = final;
  let frame = 0;
  const total = 18;
  const tick = () => {
    frame++;
    const done = Math.floor((frame / total) * final.length);
    el.textContent = final
      .split("")
      .map((ch, i) => (i < done || ch === " " ? ch : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]))
      .join("");
    if (frame < total) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.from ?? 0);
  const suffix = el.dataset.suffix ?? "";
  const start = performance.now();
  const dur = 1400;
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - k, 4);
    el.textContent = `${Math.round(from + (to - from) * eased)}${suffix}`;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// One client island that wires attribute-driven effects across the server-rendered page:
//   data-reveal       fade/slide in on scroll (variants via value, stagger via --i)
//   data-scramble     timecode-style text decode when revealed
//   data-count        number count-up when revealed
//   data-magnetic     element leans toward the pointer
//   data-tilt         3D tilt with glare following the pointer
//   data-scrub        hover scrubbing: playhead + timecode follow the pointer (data-duration seconds)
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Intro: allow skipping, and stop delaying reveals once it is over.
    const intro = document.querySelector<HTMLElement>(".intro");
    const endIntro = () => root.classList.add("intro-done");
    if (root.classList.contains("intro-on") && intro) {
      const skip = () => {
        endIntro();
        root.classList.remove("intro-delay");
      };
      intro.addEventListener("click", skip);
      window.addEventListener("keydown", skip, { once: true });
      const t = setTimeout(() => root.classList.remove("intro-delay"), 4800);
      cleanups.push(() => {
        clearTimeout(t);
        intro.removeEventListener("click", skip);
        window.removeEventListener("keydown", skip);
      });
    }

    // Reveal on scroll.
    const onReveal = (el: HTMLElement) => {
      // An attribute, not a class: React rewrites className on re-render (e.g. accordion open)
      // and would wipe a class, hiding the element again.
      el.setAttribute("data-revealed", "");
      el.querySelectorAll<HTMLElement>("[data-scramble]").forEach((s) => !reduce && scramble(s));
      if (el.matches("[data-scramble]") && !reduce) scramble(el);
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => (reduce ? null : countUp(c)));
    };
    // Reduced motion: nothing animates in, so show everything now.
    if (reduce) document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(onReveal);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            onReveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    if (!reduce) document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Safety net: a fast fling can carry an element past the viewport between two frames,
    // so the observer never sees it. Reveal anything that is already above the fold.
    let sweep = 0;
    const onScroll = () => {
      if (sweep) return;
      sweep = requestAnimationFrame(() => {
        sweep = 0;
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
          if (el.getBoundingClientRect().top < innerHeight) {
            onReveal(el);
            io.unobserve(el);
          }
        });
      });
    };
    if (!reduce) {
      addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        removeEventListener("scroll", onScroll);
        cancelAnimationFrame(sweep);
      });
    }

    if (finePointer && !reduce) {
      // Magnetic buttons.
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 0.35;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
          el.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => (el.style.transform = "");
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // Tilt + glare (+ optional scrub).
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = Number(el.dataset.tilt) || 6;
        const tc = el.querySelector<HTMLElement>(".scrub-tc");
        const duration = Number(el.dataset.duration) || 0;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
          el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
          el.style.setProperty("--gx", `${px * 100}%`);
          el.style.setProperty("--gy", `${py * 100}%`);
          el.style.setProperty("--sx", `${px}`);
          if (tc && duration) tc.textContent = `${fmt(px * duration)} / ${fmt(duration)}`;
        };
        const enter = () => el.classList.add("is-hover");
        const leave = () => {
          el.classList.remove("is-hover");
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
