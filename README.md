# CyberAttack Visualizer

An educational, **animated** web application that visually demonstrates how
common cyberattacks actually unfold — built entirely with free and open-source
tools.

The goal is to teach defensive concepts through visual storytelling: every
attack has a step-by-step animated simulation on the left, a synced
explanation, real-world impact, and prevention guidance on the right, plus
a quick check quiz and a downloadable PDF summary.

## Attacks covered

| Attack | Category | What you'll see |
| --- | --- | --- |
| **Phishing** | Social engineering | Lure crafting → email delivery → victim click → credential exfiltration |
| **DDoS** | Availability | Botnet idle → C2 command → traffic flood → service crash |
| **SQL Injection** | Web application | Probe → payload injected → tampered query → mass row exfiltration |
| **Man-in-the-Middle** | Network | Direct channel → attacker on path → silent observation → active tampering |
| **Malware / Ransomware** | Endpoint | Payload delivered → execution & persistence → mass encryption → ransom note |

Adding a new attack is a single-file change — see [Extending](#extending) below.

## Features

- **Attack gallery** with live animated previews and hover effects
- **Split-view simulator**: animation (left) ↔ synced explanation (right)
- **Step timeline** with click-to-jump, animated progress fill
- **Playback controls**: play / pause / restart / step forward / step back
- **Speed control** (0.5x → 2x)
- **Learn Mode vs Simulation Mode** — Learn overlays the active step description on the simulation
- **Sound effects** (synthesised, opt-in — no audio files shipped)
- **Quiz** per attack with instant feedback
- **Downloadable PDF summary** generated client-side via jsPDF
- **Dark cybersecurity theme**: glassmorphism, neon accents, animated grid backdrop, scanline overlay
- **Hash-based deep links** (`/#attack/phishing`, …)
- **Responsive** layout — single-column on mobile, split-view on desktop
- **Reusable animation contract** (`AnimationProps { step, isPlaying, speed }`) so every attack follows the same shape

## Tech stack (all free / open-source)

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server & build
- [Tailwind CSS](https://tailwindcss.com/) for styling (custom cyber theme)
- [Framer Motion](https://www.framer.com/motion/) for SVG / DOM animation
- [Lucide React](https://lucide.dev/) for icons
- [jsPDF](https://github.com/parallax/jsPDF) for client-side PDF generation
- WebAudio API for sound (no audio assets — synthesised tones)

No paid APIs, no telemetry, no backend.

## Getting started

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev      # http://localhost:5173
```

### Other scripts

```bash
npm run build      # production build into ./dist
npm run preview    # preview the production build locally
npm run lint       # eslint
npm run typecheck  # tsc -b --noEmit
```

## Project structure

```
src/
├── App.tsx                 # hash-based router + page transitions
├── main.tsx                # React entrypoint
├── index.css               # Tailwind + global theme (grid, scanline, glass)
├── types.ts                # Attack / AttackStep / AnimationProps / QuizQuestion
├── data/
│   └── attacks.ts          # Single source of truth for every attack
├── animations/
│   ├── PhishingAnimation.tsx
│   ├── DDoSAnimation.tsx
│   ├── SQLiAnimation.tsx
│   ├── MITMAnimation.tsx
│   ├── RansomwareAnimation.tsx
│   └── Previews.tsx        # Mini animations used by gallery cards
├── components/
│   ├── Header.tsx
│   ├── AttackGallery.tsx
│   ├── AttackCard.tsx
│   ├── AttackSimulator.tsx # split-view orchestrator
│   ├── Timeline.tsx        # step indicator
│   ├── PlaybackControls.tsx
│   ├── ExplanationPanel.tsx
│   └── Quiz.tsx
└── lib/
    ├── pdf.ts              # jsPDF summary generator
    └── sound.ts            # WebAudio sound effects (synthesised)
```

## Extending

To add a new attack:

1. Build a full-size animation component in `src/animations/` that accepts
   `AnimationProps` (`{ step, isPlaying, speed }`).
2. Build a small ambient preview component (used inside the gallery card).
3. Append a new entry to the `attacks` array in `src/data/attacks.ts` with
   `name`, `tagline`, `category`, `accent`, `icon`, `shortDescription`,
   `howItWorks`, `impact[]`, `prevention[]`, `steps[]`, `Animation`,
   `Preview`, and `quiz[]`.

The gallery, simulator, timeline, PDF export, and switcher will all pick it
up automatically.

## Deployment

The app is a static Vite SPA — `npm run build` outputs `./dist`. Deploy that
directory anywhere static hosting works. Two free options:

### Vercel

```bash
npm i -g vercel
vercel deploy --prod
```

The defaults are correct (`npm run build`, output `dist`).

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

Or use the Netlify dashboard with build command `npm run build` and publish
directory `dist`.

### GitHub Pages, Cloudflare Pages, S3 / static host

Run `npm run build` and serve the contents of `./dist`.

## Disclaimer

This project is for **education only**. Every simulation is intentionally
simplified to make defensive concepts tangible. Don't run any of these
techniques against systems you don't own — use the prevention guidance to
make the systems you *do* own harder targets.
