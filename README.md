# jayesh-website

Website for Jayesh Adhikari, filmmaker and film editor in Ahmedabad.
Next.js (App Router) + Three.js (`@react-three/fiber`). Deployed on Vercel.

## Editing content

Everything editable is in **`src/content/site.ts`**:

- `contact` — WhatsApp/phone, Instagram, YouTube, hire form, Drive portfolio; `email` is hidden while empty
- `portrait` — path to Jayesh's photo in `public/` (empty = black-and-white reel of the `reel` on-set photos)
- `gallery` — behind-the-scenes photos in `public/gallery/` (from his Carrd page), shown as a draggable film strip with a lightbox
- `projects` — work highlights from YouTube (`youtube` = video id → thumbnail + in-page player). The sticky profile card shows each project's details as it scrolls past
- `stats`, `workedWith` — from the Jayesh Adhikari Films channel bio
- `about`, `journey` — bio, credits and training (taken from Jayesh's public blog; confirm before launch)
- `tools` — editing suite and proficiency bars (placeholders; confirm)
- `typingWords`, `stats`, `formats`, `services`, `whatToSend`, `steps`, `faq`, `projectTypes`, `timeline`, `quote`

## Structure

Layout follows a two-column portfolio template: sticky profile card on the left, scrolling content
on the right, section rail with scrollspy on the far right.

- `src/app/page.tsx` — all sections
- `src/components/ProfileCard.tsx` — sticky card: typing intro, socials, availability; turns into project details over the work section
- `src/components/Timeline.tsx` — draggable edit-timeline hero visual (pointer + keyboard accessible)
- `src/components/RailNav.tsx` — right-hand section rail with scrollspy
- `src/components/WorkHighlights.tsx`, `ServicesAccordion.tsx`, `BriefForm.tsx` (opens a pre-filled WhatsApp message), `Clock.tsx` (Ahmedabad time)
- `src/components/three/Caustics.tsx` — full-page WebGL water-caustics background (follows the pointer; static under `prefers-reduced-motion`)
- `src/components/fx/` — motion layer: `Intro` (film-leader countdown, once per session), `Effects` (attribute-driven reveals, magnetic buttons, tilt/glare, hover scrubbing, count-up, text scramble), `Cursor`, `ScrollTimecode`
- `src/app/globals.css` — design tokens (`--accent` retheme in one line) and styles; everything honours `prefers-reduced-motion`

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Deploy

Import the repo in Vercel (preset: Next.js, no env vars). Pushes to the production branch deploy automatically.
