"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { ShaderMaterial } from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Tileable water caustics (after the classic iterative caustic shader), drifting
// slowly and nudged by the pointer. Rendered grey-on-black and faded with CSS.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;

  #define TAU 6.28318530718
  #define MAX_ITER 5

  void main() {
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;
    uv *= 0.9;
    uv += uMouse * 0.03;

    float time = uTime * 0.35 + 23.0;
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

    gl_FragColor = vec4(vec3(clamp(v, 0.0, 1.0)), 1.0);
  }
`;

function Water({ animate }: { animate: boolean }) {
  const mat = useRef<ShaderMaterial>(null);
  const target = useRef({ x: 0, y: 0 });
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0, 0] } }),
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

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uRes.value = [state.size.width, state.size.height];
    if (!animate) return;
    m.uniforms.uTime.value += Math.min(delta, 0.1);
    const mouse = m.uniforms.uMouse.value as number[];
    mouse[0] += (target.current.x - mouse[0]) * 0.02;
    mouse[1] += (target.current.y - mouse[1]) * 0.02;
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
