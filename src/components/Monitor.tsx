"use client";

import { timeline, type TransitionKind } from "@/content/site";

// Program monitor for the hero timeline: shows the edit at the playhead.
// Everything is a pure function of the timeline time `t`, so scrubbing scrubs the picture,
// transitions included.

type Shot = {
  src: string;
  // transform at the start and end of the clip: [scale, x%, y%, rotateDeg]
  from: [number, number, number, number];
  to: [number, number, number, number];
  pos?: string;
  grade?: string;
  sweep?: boolean;
  flare?: boolean;
};

// Keyed by the V1 clip labels in site.ts; each is real footage from his work.
const SHOTS: Record<string, Shot> = {
  "On location": { src: "/gallery/location-crew.jpg", from: [1.28, 0, 2, 0], to: [1.04, 0, 0, 0], pos: "center 35%", grade: "grayscale(0.2) contrast(1.05)" },
  "Haji · close-up": { src: "/monitor/haji.jpg", from: [1.02, 0, 0, 0], to: [1.22, -3, 2, 0], pos: "35% 40%" },
  Rukh: { src: "/monitor/rukh.jpg", from: [1.2, 7, 0, 0], to: [1.2, -7, 0, 0] },
  "Camera rig": { src: "/gallery/cinema-camera.jpg", from: [1.1, 0, 2, -2], to: [1.25, -2, -1, 1.5], pos: "center 40%", sweep: true, grade: "contrast(1.1) saturate(0.9)" },
  Restart: { src: "/monitor/restart.jpg", from: [1.05, 0, 0, 0], to: [1.45, 0, 4, 0], pos: "center 30%" },
  "Santram doc": { src: "/monitor/santram.jpg", from: [1.06, -3, 0, 0], to: [1.16, 3, -1, 0], grade: "sepia(0.45) saturate(1.5) hue-rotate(-12deg) brightness(1.08) contrast(1.05)", flare: true },
  Testimonial: { src: "/monitor/sakshi.jpg", from: [1.12, 0, 0, 0], to: [1.02, 0, 0, 0] },
};

// Width of each transition on the timeline, in timeline seconds (centred on the cut).
export const TRANSITION_SECONDS = 3.2;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (k: number) => 1 - Math.pow(1 - k, 2);
const inOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const v1 = timeline.tracks.find((t) => t.name === "V1")?.clips ?? [];
const v2 = timeline.tracks.find((t) => t.name === "V2")?.clips ?? [];
const transitions = timeline.transitions;

// Layer styles for the outgoing (A) and incoming (B) shot at transition progress q (0..1)
function transitionStyles(kind: TransitionKind, q: number): { a: React.CSSProperties; b: React.CSSProperties } {
  const e = inOut(q);
  switch (kind) {
    case "zoom":
      return {
        a: { opacity: 1 - e, transform: `scale(${1 + e * 0.25})`, filter: `blur(${e * 6}px)` },
        b: { opacity: e, transform: `scale(${1.3 - e * 0.3})`, filter: `blur(${(1 - e) * 6}px)` },
      };
    case "whip":
      return {
        a: { transform: `translateX(${-e * 100}%)`, filter: `blur(${Math.sin(q * Math.PI) * 14}px)` },
        b: { transform: `translateX(${(1 - e) * 100}%)`, filter: `blur(${Math.sin(q * Math.PI) * 14}px)` },
      };
    case "leak":
      return { a: { opacity: q < 0.5 ? 1 : 0, filter: `brightness(${1 + Math.sin(q * Math.PI) * 0.8})` }, b: { opacity: q < 0.5 ? 0 : 1, filter: `brightness(${1 + Math.sin(q * Math.PI) * 0.8})` } };
    case "glitch":
      return { a: { opacity: q < 0.5 ? 1 : 0 }, b: { opacity: q < 0.5 ? 0 : 1 } };
    case "dip":
      return { a: { opacity: q < 0.5 ? 1 - q * 2 : 0 }, b: { opacity: q < 0.5 ? 0 : (q - 0.5) * 2 } };
    case "blur":
    default:
      return {
        a: { opacity: 1 - e, filter: `blur(${e * 12}px)` },
        b: { opacity: e, filter: `blur(${(1 - e) * 12}px)` },
      };
  }
}

// One shot, with its own camera move driven by its clip progress k
function ShotLayer({ label, k, style }: { label: string; k: number; style?: React.CSSProperties }) {
  const shot = SHOTS[label];
  if (!shot) return null;
  const kk = ease(clamp01(k));
  const [sc, x, y, r] = shot.from.map((f, j) => lerp(f, shot.to[j], kk));
  return (
    <div className="mon-shot" style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt=""
        draggable={false}
        style={{ objectPosition: shot.pos ?? "center", filter: shot.grade, transform: `translate(${x}%, ${y}%) scale(${sc}) rotate(${r}deg)` }}
      />
      {shot.sweep && <span className="mon-sweep" style={{ left: `${lerp(-60, 140, clamp01(k))}%` }} />}
      {shot.flare && <span className="mon-flare" style={{ left: `${lerp(78, 62, clamp01(k))}%`, opacity: 0.55 + 0.25 * Math.sin(clamp01(k) * Math.PI) }} />}
    </div>
  );
}

// Glitch: horizontal slices of the incoming/outgoing frame knocked sideways
function Glitch({ a, b, q, ka, kb }: { a: string; b: string; q: number; ka: number; kb: number }) {
  const strength = Math.sin(q * Math.PI);
  const label = q < 0.5 ? a : b;
  const k = q < 0.5 ? ka : kb;
  const slices = [0, 1, 2, 3, 4, 5];
  return (
    <>
      {slices.map((i) => {
        const off = Math.sin(i * 12.9898 + Math.floor(q * 18) * 3.1) * 9 * strength;
        return (
          <div key={i} className="mon-slice" style={{ clipPath: `inset(${(i * 100) / 6}% 0 ${100 - ((i + 1) * 100) / 6}% 0)`, transform: `translateX(${off}%)` }}>
            <ShotLayer label={label} k={k} />
          </div>
        );
      })}
      <span className="mon-rgb" style={{ opacity: strength * 0.6 }} />
    </>
  );
}

// Graphics for the V2 clips
function Graphic({ name, k }: { name: string; k: number }) {
  const o = clamp01(Math.min(k / 0.15, (1 - k) / 0.15));
  const style = { opacity: o, transform: `translateY(${(1 - o) * 10}px)` };
  if (name === "Title")
    return (
      <div className="mon-title" style={style}>
        <small>Jayesh Adhikari Films</small>
        <strong>presents</strong>
      </div>
    );
  if (name === "Lower third")
    return (
      <div className="mon-lower" style={{ ...style, transform: `translateX(${(1 - o) * -24}px)` }}>
        <span>A film by</span>
        <strong>Jayesh Adhikari</strong>
      </div>
    );
  if (name === "End card")
    return (
      <div className="mon-end" style={style}>
        <span className="mon-logo">JA</span>
        <strong>From idea to final cut.</strong>
        <small>jayesh.adhikari5@gmail.com</small>
      </div>
    );
  return null;
}

export default function Monitor({ t, visible, timecode, playing }: { t: number; visible: boolean; timecode: string; playing: boolean }) {
  const idx = Math.max(0, v1.findIndex(([s, e]) => t >= s && t < e));
  const [s, e, name] = v1[idx] ?? v1[v1.length - 1];
  const progress = (i: number) => {
    const [cs, ce] = v1[i];
    return (t - cs) / (ce - cs);
  };

  // Are we inside a transition window around a cut?
  const half = TRANSITION_SECONDS / 2;
  let tr: { i: number; q: number } | null = null;
  if (idx > 0 && t - s < half) tr = { i: idx - 1, q: (t - s + half) / TRANSITION_SECONDS };
  else if (idx < v1.length - 1 && e - t < half) tr = { i: idx, q: (t - (e - half)) / TRANSITION_SECONDS };

  let layers: React.ReactNode;
  let fx: React.ReactNode = null;
  let hudName = name;
  if (tr) {
    const a = v1[tr.i][2];
    const b = v1[tr.i + 1][2];
    const kind = transitions[tr.i]?.kind ?? "blur";
    const q = clamp01(tr.q);
    hudName = `${transitions[tr.i]?.name ?? "Transition"}`;
    if (kind === "glitch") {
      layers = <Glitch a={a} b={b} q={q} ka={progress(tr.i)} kb={progress(tr.i + 1)} />;
    } else {
      const st = transitionStyles(kind, q);
      layers = (
        <>
          <ShotLayer key={a} label={a} k={progress(tr.i)} style={st.a} />
          <ShotLayer key={b} label={b} k={progress(tr.i + 1)} style={st.b} />
        </>
      );
    }
    if (kind === "leak") fx = <span className="mon-leak" style={{ opacity: Math.sin(q * Math.PI), transform: `translateX(${lerp(-30, 30, q)}%)` }} />;
    if (kind === "whip") fx = <span className="mon-streak" style={{ opacity: Math.sin(q * Math.PI) * 0.7 }} />;
  } else {
    layers = <ShotLayer key={name} label={name} k={progress(idx)} />;
  }

  // the last clip fades out under the end card
  const outro = idx === v1.length - 1 ? clamp01((progress(idx) - 0.55) / 0.4) : 0;
  const graphic = v2.find(([gs, ge]) => t >= gs && t < ge);

  return (
    <div className={`monitor${visible ? " is-on" : ""}`} aria-hidden>
      <div className="mon-screen">
        {layers}
        {fx}
        {outro > 0 && <span className="mon-black" style={{ opacity: outro }} />}
        <span className="mon-bars" />
        {graphic && <Graphic name={graphic[2]} k={clamp01((t - graphic[0]) / (graphic[1] - graphic[0]))} />}
        <span className="mon-corner c-tl" />
        <span className="mon-corner c-tr" />
        <span className="mon-corner c-bl" />
        <span className="mon-corner c-br" />
      </div>
      <div className="mon-hud">
        <span className="mon-pgm">
          <i className={playing ? "is-live" : undefined} /> PGM
        </span>
        <span className={`mon-clip${tr ? " is-fx" : ""}`}>{tr ? `⟷ ${hudName}` : hudName}</span>
        <span className="mon-tc">{timecode}</span>
      </div>
    </div>
  );
}
