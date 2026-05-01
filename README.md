# LinkX

A hand-built personal link hub in React — a single-screen "constellation" with a WebGL aurora, a hidden terminal, and a live "Now" feed fed from the GitHub API.

[![Deploy](https://github.com/coleyrockin/linkx/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/coleyrockin/linkx/actions/workflows/deploy-pages.yml)
[![Audit](https://github.com/coleyrockin/linkx/actions/workflows/audit.yml/badge.svg)](https://github.com/coleyrockin/linkx/actions/workflows/audit.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live site →](https://coleyrockin.github.io/linkx/)**

![LinkX](src/assets/imgs/LinkxRefactor.png)

## Why this exists

Most link-in-bio pages are rented real estate on someone else's platform. LinkX is a small, deliberate alternative: mine to own, mine to style, and a playground for the motion, graphics, and accessibility work I enjoy.

## What it demonstrates

- **WebGL fragment-shader backdrop.** A full-screen aurora rendered by a GLSL fragment shader — layered simplex-noise FBM with cursor-driven warp. Theme-aware (palette swaps on `prefers-color-scheme`) and motion-aware (animation paused when `prefers-reduced-motion` is set). Falls back to a CSS aurora if WebGL is unavailable. See [`useShaderField.js`](src/hooks/useShaderField.js).
- **Canvas 2D particle field.** A second layer — ~80 softly-repelling particles with cursor interaction and neighbor-connection lines — running in a single `requestAnimationFrame` loop. Extracted into [`useParticleField.js`](src/hooks/useParticleField.js).
- **Hidden developer terminal.** The Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`) opens a real interactive terminal. Core commands: `help`, `whoami`, `skills`, `projects`, `contact`, `links`, `theme`, `clear`, `exit`. Easter-egg shell commands: `ls`, `pwd`, `date`, `echo`, `sudo`, `rm -rf /`. On desktop a footer pill shows the sequence as styled `<kbd>` keys; on touch devices the same pill becomes a tap-to-open button so the easter egg isn't desktop-only. Every command is unit-tested; the terminal is e2e-tested via Playwright. See [`Terminal/`](src/components/Terminal/).
- **Live "Now" feed from the GitHub API.** The Now section fetches my most recent public pushes, dedupes by repo, and formats relative timestamps. Cached in `localStorage` with a 15-minute TTL; gracefully falls back to a static JSON list if the API is unreachable or rate-limited. See [`lib/github.js`](src/lib/github.js).
- **Light + dark themes.** The palette, shader colors, particle opacity, and glass panels all flip on `prefers-color-scheme` — no toggle required.
- **Progressive enhancement end-to-end.** Shader → canvas → CSS. JavaScript-off still shows the link stack. Service worker makes it installable and offline-capable.
- **Privacy-friendly analytics.** Outbound clicks tracked through Plausible (no cookies, no PII) via a [`trackOutbound`](src/lib/analytics.js) helper with a dev-mode console fallback.
- **Accessible by default.** Skip-link, semantic landmarks, labeled `nav` and `dialog`, visible focus rings, explicit outbound link labels, `rel="noopener noreferrer"` on external links. Enforced in CI by axe-core.
- **Data-driven content.** Both [`links.json`](src/data/links.json) and [`now.json`](src/data/now.json) decouple data from presentation.
- **Error boundary.** If the app crashes, the user still sees their most important links and a retry button — not a blank screen. See [`ErrorBoundary.jsx`](src/components/ErrorBoundary.jsx).
- **Real CI.** Every push runs unit tests before deploy; a parallel audit workflow runs end-to-end Playwright tests and an axe a11y audit against the built site.

## Tech stack

- **React 18** on **Vite 6**
- **Vanilla CSS** with custom-property-driven theming (no Tailwind, no CSS-in-JS)
- **Canvas 2D** and **WebGL 1** for the backdrops
- **react-icons** for social/link icons
- **Vitest** + **@testing-library/react** for unit tests
- **Playwright** + **@axe-core/playwright** for end-to-end and a11y tests
- **ESLint 9** (flat config) for lint
- **Service worker** for PWA offline support
- **GitHub Actions** → **GitHub Pages** for deploys

## Keyboard shortcuts

- `Tab` — cycle through skip-link, link stack, footer.
- `↑` / `↓` — move focus between links while the stack is focused.
- `Enter` — open the focused link in a new tab.
- `↑ ↑ ↓ ↓ ← → ← → B A` — open the hidden terminal. (Or click/tap the footer pill — same thing.)
- `Esc` — close the terminal.

## Local development

```bash
npm install
npm run dev
```

Then open **http://localhost:5188/** (Vite is pinned to port **5188** with `strictPort` so you do not accidentally hit another project on the default **5173**). Local dev uses base `/`; production builds still use `/linkx/` for GitHub Pages.

## Tests

```bash
npm test            # Unit tests (Vitest) — commands parser, rendering contract
npm run test:e2e    # End-to-end + a11y audit (Playwright + axe-core)
npm run lint        # ESLint flat config, zero warnings allowed
```

## Deployment

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): unit tests → Vite build → Pages artifact → deploy. The audit workflow ([`.github/workflows/audit.yml`](.github/workflows/audit.yml)) runs the full Playwright suite against the built site in parallel.

## Regenerating assets

```bash
npm run og          # Rebuild public/og-image.jpg from scripts/og.svg
npm run screenshot  # Capture a fresh README screenshot from a running preview
```

## What I'd build next

- **Shader evolution** — swap the aurora fragment shader for a reaction-diffusion simulation or signed-distance-field metaballs. The same uniforms and resize logic already live in [`useShaderField.js`](src/hooks/useShaderField.js).
- **Per-link landing pages with SSR** — migrate to Next.js with static export, one page per destination, each with tailored OG metadata.
- **Realtime visitor count** — small Partykit WebSocket showing a live "n people here now" ambient counter.

## License

[MIT](LICENSE)
