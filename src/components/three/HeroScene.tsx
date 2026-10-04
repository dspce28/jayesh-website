"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points as ThreePoints } from "three";

function Orb() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    // Ease toward the pointer for a subtle parallax tilt.
    mesh.current.rotation.x += (state.pointer.y * 0.4 - mesh.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#6d5dfc"
          emissive="#1b1046"
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={1.8}
        />
      </mesh>
      <mesh scale={2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

// Seeded PRNG keeps the starfield deterministic (and render-pure).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Starfield({ count = 2500 }: { count?: number }) {
  const ref = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform points in a spherical shell.
      const r = 4 + rand() * 8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.02;
    ref.current.rotation.x -= delta * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a5b4fc" size={0.025} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const viewport = useThree((s) => s.viewport);
  // Wide screens: park the orb right of the copy. Narrow: shrink it and drop it low.
  const wide = viewport.aspect > 1.1;
  const baseX = wide ? viewport.width * 0.24 : 0;
  const baseY = wide ? 0 : -viewport.height * 0.3;
  const scale = wide ? 1 : 0.55;
  useFrame((state) => {
    if (!group.current) return;
    const g = group.current.position;
    g.x += (baseX + state.pointer.x * 0.3 - g.x) * 0.05;
    g.y += (baseY + state.pointer.y * 0.2 - g.y) * 0.05;
  });
  return (
    <group ref={group} scale={scale}>
      {children}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={25} color="#22d3ee" distance={12} />
      <Rig>
        <Orb />
      </Rig>
      <Starfield />
    </Canvas>
  );
}
