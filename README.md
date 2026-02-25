# LinkX

A professionally refactored, single-page personal link hub built with React.

## Overview

This project is now focused on a clean one-page experience that highlights:

- A branded profile hero with custom styling and motion
- Three primary destinations: Instagram, LinkedIn, and Portfolio
- Responsive layout for desktop and mobile
- Accessibility basics (semantic structure, focus states, descriptive labels)

## Refactor Highlights

- Simplified app structure to a focused single-page flow
- Rebuilt UI styling for stronger visual direction and consistency
- Removed outdated multi-purpose content in favor of clear personal branding
- Updated tests to match the current public link contract
- Polished metadata/font loading in `public/index.html`

## Screenshot (Refactored UI)

![LinkX refactor screenshot](src/assets/imgs/LinkxRefactor.png)

## New Tech Added In The Refactor

- `CSS custom properties` for a reusable design-token system (color, spacing, easing, emphasis).
- `Advanced CSS motion` using keyframes and staged transitions for atmosphere, card entrance, and interactive links.
- `Typography refresh` with `Syne` + `Space Grotesk` for a stronger visual identity.
- `Structured one-page component architecture` with focused sections (hero, link stack, visual layers).
- `Modernized document metadata wiring` in `public/index.html` (correct `site.webmanifest` path and aligned font preconnect/load tags).
- `Contract-level UI test coverage` in `src/App.test.js` verifying headline and outbound link behavior.

## Tech Stack

- React (Create React App)
- JavaScript
- React Icons
- CSS + Tailwind directives (with custom styles and design tokens)

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm start
```

Then open:

- [http://localhost:3000/linkx](http://localhost:3000/linkx)

## Testing

```bash
npm test -- --watchAll=false
```

## Production Build

```bash
npm run build
```

The optimized output is generated in `build/`.

## Deployment

### Recommended: Automatic Deploy (GitHub Actions)

This repo now includes an automated GitHub Pages workflow:

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: every push to `main` (and manual `workflow_dispatch`)

One-time GitHub setting:

1. Go to your repo on GitHub.
2. Open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

After that, publishing is easy:

1. Merge your PR into `main`.
2. GitHub Actions builds and deploys automatically.
3. Site URL: [https://coleyrockin.github.io/linkx/](https://coleyrockin.github.io/linkx/)

### Fallback: Manual Deploy From Local

```bash
npm run predeploy
npm run deploy
```

### Quick Troubleshooting

- Confirm `homepage` in `package.json` is exactly: `https://coleyrockin.github.io/linkx/`
- If auto deploy does not run, check the `Actions` tab for workflow errors.
- If Pages shows old content, hard refresh the browser after the deploy completes.
