# LOOP-OUT

LOOP-OUT is a mobile-first guided web app designed to help users interrupt mental loops (rumination/worry) and recover focus through short, structured interventions.

The app walks users through a sequence of steps:
- detect and name what is happening,
- estimate loop intensity,
- identify emotional context,
- run a selected intervention with timer support,
- re-evaluate intensity,
- review feedback and continue or finish.

Session progress is persisted locally in the browser and can be resumed. A lightweight local history of completed attempts is also stored on-device.

Official site: https://loop-out.com

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- localStorage-based persistence
- Cloudflare Pages-ready deployment

## Key Features

- Guided multi-step flow with route guards
- Intervention selection with optional contextual scientific notes
- Timed intervention execution
- Local attempt history
- Spanish-first content via centralized i18n content files

## Available Scripts

- `npm run dev`: start development server
- `npm run build`: type-check and build production bundle
- `npm run preview`: preview production build locally
- `npm run lint`: run ESLint
- `npm run pages:build`: Cloudflare Pages build alias
- `npm run pages:deploy`: deploy `dist` with Wrangler
- `npm run pages:dev`: serve `dist` with Cloudflare Pages locally

## Local Development

1. Install dependencies:
   `npm install`
2. Start the app:
   `npm run dev`
3. Open the local URL shown by Vite.

## Deployment (Cloudflare Pages)

Use:
- Build command: `npm run pages:build`
- Output directory: `dist`

The SPA fallback is configured via `public/_redirects`.
