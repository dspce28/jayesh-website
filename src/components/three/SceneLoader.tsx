"use client";

import dynamic from "next/dynamic";

// WebGL can't render on the server; load the film-light layer client-side only.
const FilmLight = dynamic(() => import("./FilmLight"), {
  ssr: false,
  loading: () => null,
});

export default function SceneLoader() {
  return (
    <div className="film-light" aria-hidden>
      <FilmLight />
    </div>
  );
}
