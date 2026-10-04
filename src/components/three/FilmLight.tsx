"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, type ShaderMaterial } from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Output is white tinted by two drifting light leaks plus film grain.
// The canvas is composited with mix-blend-mode: multiply, so white = no change.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uWarm;
  uniform vec3 uCool;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float blob(vec2 uv, vec2 c, float r) {
    vec2 d = uv - c;
    d.x *= uRes.x / uRes.y;
    return exp(-dot(d, d) / (r * r));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;

    vec2 warmC = vec2(0.82 + 0.10 * sin(t * 1.3), 0.78 + 0.12 * cos(t)) + uMouse * 0.06;
    vec2 coolC = vec2(0.12 + 0.08 * cos(t * 0.9), 0.20 + 0.10 * sin(t * 1.1)) - uMouse * 0.04;

    float warm = blob(uv, warmC, 0.42) * 0.55;
    float cool = blob(uv, coolC, 0.36) * 0.35;

    vec3 col = vec3(1.0);
    col = mix(col, uWarm, warm);
    col = mix(col, uCool, cool);

    // Animated grain, darkening only, at ~24fps cadence like real film.
    float frame = floor(uTime * 24.0);
    float g = hash(uv * uRes + frame);
    col -= (g - 0.5) * 0.07 + 0.015;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Leak({ animate }: { animate: boolean }) {
  const mat = useRef<ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const target = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 8 },
      uRes: { value: [1, 1] },
      uMouse: { value: [0, 0] },
      uWarm: { value: new Color("#F2C6B4") },
      uCool: { value: new Color("#BFDCE0") },
    }),
    [],
  );

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uRes.value = [size.width, size.height];
    if (!animate) return;
    m.uniforms.uTime.value += delta;
    const mouse = m.uniforms.uMouse.value as number[];
    mouse[0] += (target.current.x - mouse[0]) * 0.03;
    mouse[1] += (target.current.y - mouse[1]) * 0.03;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function FilmLight() {
  const animate = useMemo(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
    >
      <Leak animate={animate} />
    </Canvas>
  );
}
