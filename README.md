# jayesh-website

Personal portfolio site for Jayesh Adhikari — Next.js (App Router) + Tailwind CSS + Three.js
(via `@react-three/fiber` / `drei`) + Framer Motion. Deployed on Vercel.

## Editing content

All copy lives in **`src/content/profile.ts`**. Anything marked `TODO` is a placeholder.
To add a résumé, drop `resume.pdf` into `public/` and set `resumeUrl: "/resume.pdf"`.

## Structure

- `src/app/page.tsx` — page sections (hero, about, skills, experience, projects, contact)
- `src/components/three/HeroScene.tsx` — the 3D hero (distorted orb, wireframe shell, starfield, pointer parallax)
- `src/components/three/SceneLoader.tsx` — loads the scene client-side only (`ssr: false`)
- `src/components/Reveal.tsx` — scroll-reveal animation (honours `prefers-reduced-motion`)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deploy

Import this repo in Vercel (framework preset: Next.js, no env vars needed). Every push to the
production branch deploys automatically; other branches get preview URLs.
