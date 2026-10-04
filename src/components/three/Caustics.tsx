"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, type ShaderMaterial } from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Tileable water caustics (after the classic iterative caustic shader). The water
// drifts with the pointer, lights up in a warm pool around it, and stirs faster
// while the page scrolls. Rendered on black and faded with CSS.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec2 uPoint;
  uniform float uGlow;
  uniform vec3 uAccent;

  #define TAU 6.28318530718
  #define MAX_ITER 5

  void main() {
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;
    uv *= 0.9;
    uv += uMouse * 0.03;

    // Ripple: push the water outward around the pointer.
    vec2 toP = (vUv - uPoint) * vec2(uRes.x / uRes.y, 1.0);
    float d = length(toP);
    uv += normalize(toP + 1e-5) * 0.012 * sin(d * 40.0 - uTime * 3.0) * exp(-d * 6.0) * uGlow;

    float time = uTime + 23.0;
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = 0.005;

    for (int n = 0; n < MAX_ITER; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, 1.4);
    float v = pow(abs(c), 8.0);

    // Soft vignette so the edges sink into the page.
    vec2 q = vUv - 0.5;
    v *= smoothstep(0.85, 0.2, length(q));

    // Warm pool of light under the pointer.
    float pool = exp(-d * d / 0.035) * uGlow;
    vec3 col = vec3(v) * (1.0 + pool * 2.2) + uAccent * pool * (0.35 + v * 1.6);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

function Water({ animate }: { animate: boolean }) {
  const mat = useRef<ShaderMaterial>(null);
  const target = useRef({ x: 0, y: 0, u: 0.5, v: 0.5, active: 0 });
  const scroll = useRef({ last: 0, boost: 0 });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: [1, 1] },
      uMouse: { value: [0, 0] },
      uPoint: { value: [0.5, 0.5] },
      uGlow: { value: 0 },
      uAccent: { value: new Color("#ff4d2e") },
    }),
    [],
  );

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      const t = target.current;
      t.x = (e.clientX / window.innerWidth) * 2 - 1;
      t.y = -((e.clientY / window.innerHeight) * 2 - 1);
      t.u = e.clientX / window.innerWidth;
      t.v = 1 - e.clientY / window.innerHeight;
      t.active = e.pointerType === "mouse" ? 1 : 0;
    };
    const onLeave = () => (target.current.active = 0);
    scroll.current.last = window.scrollY;
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [animate]);

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uRes.value = [state.size.width, state.size.height];
    if (!animate) return;
    const dt = Math.min(delta, 0.1);
    const t = target.current;

    // Scrolling stirs the water: speed decays back to the resting drift.
    const sc = scroll.current;
    const dy = Math.abs(window.scrollY - sc.last);
    sc.last = window.scrollY;
    sc.boost = Math.min(4, sc.boost * 0.92 + dy * 0.012);
    m.uniforms.uTime.value += dt * (0.35 + sc.boost * 0.5);

    const mouse = m.uniforms.uMouse.value as number[];
    mouse[0] += (t.x - mouse[0]) * 0.02;
    mouse[1] += (t.y - mouse[1]) * 0.02;
    const point = m.uniforms.uPoint.value as number[];
    point[0] += (t.u - point[0]) * 0.12;
    point[1] += (t.v - point[1]) * 0.12;
    m.uniforms.uGlow.value += (t.active - m.uniforms.uGlow.value) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export default function Caustics() {
  const animate = useMemo(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  return (
    <Canvas
      dpr={0.75}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
    >
      <Water animate={animate} />
    </Canvas>
  );
}
