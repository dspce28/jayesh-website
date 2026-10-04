"use client";

import dynamic from "next/dynamic";

// WebGL can't render on the server; load the scene client-side only.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function SceneLoader() {
  return <HeroScene />;
}
