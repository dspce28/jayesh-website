# jayesh-website

Website for Jayesh Adhikari, filmmaker and film editor in Ahmedabad.
Next.js (App Router) + Three.js (`@react-three/fiber`). Deployed on Vercel.

## Editing content

Everything editable is in **`src/content/site.ts`**:

- `contact` — WhatsApp number, email, Instagram handle (**WhatsApp must be set before the brief form works**)
- `work` — portfolio rows. Set `href` to a YouTube/Vimeo/Drive link and `thumb` to an image in `public/`
- `about` — bio and stage/screen credits (taken from Jayesh's public blog; confirm before launch)
- `services`, `whatToSend`, `steps`, `faq`, `projectTypes`, `timeline`

## Structure

- `src/app/page.tsx` — all sections
- `src/components/Timeline.tsx` — draggable edit-timeline hero (pointer + keyboard accessible)
- `src/components/BriefForm.tsx` — brief form that opens a pre-filled WhatsApp message
- `src/components/three/FilmLight.tsx` — WebGL light-leak + film-grain shader behind the hero, follows the pointer; static under `prefers-reduced-motion`
- `src/app/globals.css` — design tokens and styles

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Deploy

Import the repo in Vercel (preset: Next.js, no env vars). Pushes to the production branch deploy automatically.
