"use client";

import { timeline } from "@/content/site";

// Program monitor for the hero timeline: shows the "edit" at the playhead.
// Everything is a pure function of the timeline time `t`, so scrubbing scrubs the picture.

type Shot = {
  src: string;
  // transform at the start and end of the clip: [scale, x%, y%, rotateDeg]
  from: [number, number, number, number];
  to: [number, number, number, number];
  pos?: string;
  grade?: string;
  sweep?: boolean;
  flare?: boolean;
  fadeOut?: boolean;
};

// Keyed by the V1 clip labels in site.ts
const SHOTS: Record<string, Shot> = {
  "Opening wide": { src: "/gallery/location-crew.jpg", from: [1.28, 0, 2, 0], to: [1.04, 0, 0, 0], pos: "center 35%", grade: "grayscale(0.2) contrast(1.05)" },
  "Close-up": { src: "/monitor/haji.jpg", from: [1.02, 0, 0, 0], to: [1.22, -3, 2, 0], pos: "35% 40%" },
  "Walk and talk": { src: "/monitor/rukh.jpg", from: [1.2, 7, 0, 0], to: [1.2, -7, 0, 0] },
  "Product hero": { src: "/gallery/cinema-camera.jpg", from: [1.1, 0, 2, -2], to: [1.25, -2, -1, 1.5], pos: "center 40%", sweep: true, grade: "contrast(1.1) saturate(0.9)" },
  Reaction: { src: "/monitor/restart.jpg", from: [1.05, 0, 0, 0], to: [1.45, 0, 4, 0], pos: "center 30%" },
  "Rooftop, golden hour": { src: "/monitor/santram.jpg", from: [1.06, -3, 0, 0], to: [1.16, 3, -1, 0], grade: "sepia(0.45) saturate(1.5) hue-rotate(-12deg) brightness(1.08) contrast(1.05)", flare: true },
  "Final frame": { src: "/monitor/sakshi.jpg", from: [1.12, 0, 0, 0], to: [1.02, 0, 0, 0], fadeOut: true },
};

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (k: number) => 1 - Math.pow(1 - k, 2);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const v1 = timeline.tracks.find((t) => t.name === "V1")?.clips ?? [];
const v2 = timeline.tracks.find((t) => t.name === "V2")?.clips ?? [];

// Graphics for the V2 clips
function Graphic({ name, k }: { name: string; k: number }) {
  // fade in over the first 15% of the clip, out over the last 15%
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
        <strong>Jayesh Adhikari</strong>
        <span>Creative director · Editor</span>
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
  const k = clamp01((t - s) / (e - s));
  const sinceCut = t - s;
  const flash = sinceCut < 0.5 ? (1 - sinceCut / 0.5) * 0.28 : 0;
  const graphic = v2.find(([gs, ge]) => t >= gs && t < ge);

  return (
    <div className={`monitor${visible ? " is-on" : ""}`} aria-hidden>
      <div className="mon-screen">
        {v1.map(([cs, , label], i) => {
          const shot = SHOTS[label];
          if (!shot) return null;
          const active = i === idx;
          const kk = active ? ease(k) : cs < s ? 1 : 0;
          const [sc, x, y, r] = shot.from.map((f, j) => lerp(f, shot.to[j], kk));
          const fade = shot.fadeOut && active ? clamp01((k - 0.55) / 0.4) : 0;
          return (
            <div key={label} className="mon-shot" style={{ opacity: active ? 1 : 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt=""
                draggable={false}
                style={{
                  objectPosition: shot.pos ?? "center",
                  filter: shot.grade,
                  transform: `translate(${x}%, ${y}%) scale(${sc}) rotate(${r}deg)`,
                }}
              />
              {shot.sweep && active && <span className="mon-sweep" style={{ left: `${lerp(-60, 140, k)}%` }} />}
              {shot.flare && active && <span className="mon-flare" style={{ left: `${lerp(78, 62, k)}%`, opacity: 0.55 + 0.25 * Math.sin(k * Math.PI) }} />}
              {fade > 0 && <span className="mon-black" style={{ opacity: fade }} />}
            </div>
          );
        })}
        <span className="mon-flash" style={{ opacity: flash }} />
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
        <span className="mon-clip">{name}</span>
        <span className="mon-tc">{timecode}</span>
      </div>
    </div>
  );
}
