# LinkX

> A clean, animated personal link hub built with React — one page, four destinations.

[![Deploy to GitHub Pages](https://github.com/coleyrockin/linkx/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/coleyrockin/linkx/actions/workflows/deploy-pages.yml)

**Live site:** [https://coleyrockin.github.io/linkx/](https://coleyrockin.github.io/linkx/)

---

## Overview

LinkX is a polished single-page personal link hub that puts four key destinations front and center: Instagram, LinkedIn, Portfolio, and GitHub. It features a branded profile hero with custom motion design and responsive layout for desktop and mobile.

![LinkX screenshot](src/assets/imgs/LinkxRefactor.png)

---

## Features

- **Profile hero** — animated spinning gradient ring around a circular profile photo
- **Four outbound links** — Instagram, LinkedIn, Portfolio, GitHub — each with a branded icon and hover tint
- **Atmospheric background** — layered blurred blobs that drift for a subtle depth effect
- **Card entrance animation** — the link card fades and scales in on load
- **Fluid typography** — uses `clamp()` for sizes that adapt smoothly across screen widths
- **Accessibility** — semantic HTML, ARIA labels, visible focus indicators, and `prefers-reduced-motion` support
- **Responsive** — works cleanly on phones, tablets, and desktops

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | React 18 (Create React App) |
| Language | JavaScript (ES6+) |
| Styling | CSS3 with custom properties + Tailwind CSS |
| Icons | React Icons (Font Awesome) |
| Animations | CSS keyframes & transitions |
| Fonts | Google Fonts — Syne & Space Grotesk |
| Testing | Jest + React Testing Library |
| Build | Create React App (Webpack) |
| Deployment | GitHub Pages + GitHub Actions |

---

## Installation

```bash
git clone https://github.com/coleyrockin/linkx.git
cd linkx
npm install
```

---

## Running Locally

```bash
npm start
```

Open [http://localhost:3000/linkx](http://localhost:3000/linkx) in your browser.

---

## Testing

```bash
npm test -- --watchAll=false
```

---

## Production Build

```bash
npm run build
```

Optimized output is written to `build/`.

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` triggers the deploy workflow at `.github/workflows/deploy-pages.yml`.

**One-time GitHub setup:**

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

After that, merging to `main` publishes the site automatically at:
[https://coleyrockin.github.io/linkx/](https://coleyrockin.github.io/linkx/)

### Manual (local)

```bash
npm run deploy
```

---

## Project Structure

```
linkx/
├── public/              # Static HTML, favicons, PWA manifest
├── src/
│   ├── assets/
│   │   └── imgs/        # Profile photo and screenshots
│   ├── components/
│   │   └── LinkHub/
│   │       └── LinkHub.js   # Main page component
│   ├── App.js           # Root component
│   ├── App.test.js      # Smoke tests
│   ├── index.css        # Global styles and design tokens
│   └── index.js         # React entry point
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── tailwind.config.js
├── postcss.config.js
├── CHANGELOG.md
└── ROADMAP.md
```

---

## Troubleshooting

- Confirm `homepage` in `package.json` is exactly `https://coleyrockin.github.io/linkx/`
- If auto-deploy does not run, check the **Actions** tab for workflow errors
- If Pages shows old content, hard-refresh after the deploy completes
