"use client";

import dynamic from "next/dynamic";

// WebGL can't render on the server; load the background client-side only.
const Caustics = dynamic(() => import("./Caustics"), {
  ssr: false,
  loading: () => null,
});

export default function SceneLoader() {
  return (
    <div className="bg-water" aria-hidden>
      <Caustics />
    </div>
  );
}
