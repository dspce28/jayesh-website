"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { timeline } from "@/content/site";

const { duration: DURATION, fps: FPS, tracks: TRACKS } = timeline;
const REST = 0.4;
const SPEED = 4; // playback runs the 2:00 sequence in 30 seconds

// Deterministic pseudo-noise so the waveforms are stable across renders.
const noise = (i: number, s: number) => Math.abs(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1;
const pct = (v: number) => `${(v / DURATION) * 100}%`;
const two = (n: number) => String(n).padStart(2, "0");

function timecode(p: number) {
  const total = p * DURATION;
  const sec = Math.floor(total);
  const fr = Math.min(FPS - 1, Math.floor((total - sec) * FPS));
  return `00:${two(Math.floor(sec / 60))}:${two(sec % 60)}:${two(fr)}`;
}

const v1 = TRACKS.find((t) => t.name === "V1")?.clips ?? [];
function activeLabel(p: number) {
  const t = p * DURATION;
  const hit = v1.find(([s, e]) => (t >= s && t < e) || (p === 1 && e === DURATION));
  return hit?.[2] ?? "";
}

const ticks = Array.from({ length: DURATION / 10 + 1 }, (_, i) => i * 10);

function Wave({ kind, ci, ti }: { kind: "speech" | "music"; ci: number; ti: number }) {
  return (
    <div className="wave">
      {Array.from({ length: 90 }, (_, i) => {
        const n = noise(i + ci * 7, ti + 1);
        const h =
          kind === "speech"
            ? noise(Math.floor(i / 4), ci + 5) > 0.35
              ? 18 + n * 70
              : 8
            : 30 + Math.abs(Math.sin(i * 0.35)) * 40 * (0.5 + n * 0.5);
        return <i key={i} style={{ height: `${h}%` }} />;
      })}
    </div>
  );
}

export default function Timeline() {
  const [p, setPState] = useState(0);
  const [cut, setCut] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const dragging = useRef(false);

  const setP = useCallback((v: number) => setPState(Math.max(0, Math.min(1, v))), []);
  const stopAuto = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    setPlaying(false);
  }, []);

  // Real-time playback that loops; the "On screen" caption follows along.
  const play = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setPlaying(true);
    let last = performance.now();
    const frame = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setPState((v) => {
        const next = v + (dt * SPEED) / DURATION;
        return next >= 1 ? 0 : next;
      });
      raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
  }, []);

  // One opening moment: clips snap into place, then the playhead plays in and rests.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setCut(true);
        setP(REST);
      });
      return () => cancelAnimationFrame(id);
    }
    // Wait for the countdown intro if it is playing.
    const root = document.documentElement;
    const wait = root.classList.contains("intro-on") && !root.classList.contains("intro-done") ? 4300 : 0;
    const t1 = setTimeout(() => setCut(true), 250 + wait);
    const t2 = setTimeout(() => {
      const start = performance.now();
      const frame = (now: number) => {
        const k = Math.min(1, (now - start) / 2200);
        setP(REST * (1 - Math.pow(1 - k, 3)));
        raf.current = k < 1 ? requestAnimationFrame(frame) : null;
      };
      raf.current = requestAnimationFrame(frame);
    }, 1100 + wait);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      stopAuto();
    };
  }, [setP, stopAuto]);

  const fromPointer = (e: React.PointerEvent) => {
    const r = laneRef.current?.getBoundingClientRect();
    if (r) setP((e.clientX - r.left) / r.width);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    const next: Record<string, number> = { ArrowRight: p + step, ArrowLeft: p - step, Home: 0, End: 1 };
    if (e.key === " " || e.key === "k") {
      if (playing) stopAuto();
      else play();
      e.preventDefault();
      return;
    }
    if (e.key in next) {
      stopAuto();
      setP(next[e.key]);
      e.preventDefault();
    }
  };

  const code = timecode(p);
  const label = activeLabel(p);
  const t = p * DURATION;

  return (
    <div className="tl-wrap">
      <div
        ref={rootRef}
        className={`tl${cut ? " is-cut" : ""}`}
        style={{ "--p": p } as React.CSSProperties}
        role="slider"
        tabIndex={0}
        aria-label="Sample edit timeline playhead. Drag, use arrow keys, or press space to play."
        data-cursor="Drag"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(p * 100)}
        aria-valuetext={`${code}, ${label}`}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          stopAuto();
          dragging.current = true;
          rootRef.current?.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="tl-ruler">
          <span />
          <div className="ticks">
            {ticks.map((s) => (
              <div key={s} className={`tick${s % 30 === 0 ? " major" : ""}`} style={{ left: pct(s) }}>
                {s % 30 === 0 && <span>{`${Math.floor(s / 60)}:${two(s % 60)}`}</span>}
              </div>
            ))}
          </div>
        </div>

        {TRACKS.map((track, ti) => (
          <div className="track" key={track.name}>
            <div className="track-name">{track.name}</div>
            <div className={`lane${track.kind === "a" ? " audio" : ""}`} ref={ti === 0 ? laneRef : undefined}>
              {track.clips.map(([s, e, name], ci) => {
                const active = track.name === "V1" && ((t >= s && t < e) || (p === 1 && e === DURATION));
                return (
                  <div
                    key={`${s}-${name}`}
                    className={`clip ${track.kind}${active ? " is-active" : ""}`}
                    style={
                      {
                        left: pct(s),
                        width: `calc(${pct(e - s)} - 2px)`,
                        "--dx": `${Math.round((noise(ci + 1, ti + 3) * 2 - 1) * 240)}px`,
                        "--d": `${(ci * 0.06 + ti * 0.05).toFixed(2)}s`,
                      } as React.CSSProperties
                    }
                  >
                    {track.kind === "a" ? (
                      <>
                        <span>{name}</span>
                        <Wave kind={track.wave ?? "music"} ci={ci} ti={ti} />
                      </>
                    ) : (
                      name
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="playhead" aria-hidden>
          <span className="playhead-head">{code}</span>
        </div>
      </div>
      <div className="tl-caption">
        <span className="tl-controls">
          <button
            type="button"
            className={`tl-play${playing ? " is-playing" : ""}`}
            onClick={() => (playing ? stopAuto() : play())}
            aria-label={playing ? "Pause timeline" : "Play timeline"}
            data-magnetic="0.25"
          >
            {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          <span>
            On screen: <strong>{label}</strong>
          </span>
        </span>
        <span className="muted">Drag the playhead. This is how your project will sit on my timeline.</span>
      </div>
    </div>
  );
}
