# LinkX

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://coleyrockin.github.io/linkx/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/coleyrockin/linkx/deploy-pages.yml?label=Deploy&style=flat-square&logo=github-actions)](https://github.com/coleyrockin/linkx/actions)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

> A polished, animated personal link hub — one page, four destinations.

**LinkX** is a single-page personal link hub built with React. It presents a branded profile card with smooth entrance animations, a rotating gradient ring, and hover-responsive link buttons that direct visitors to Instagram, LinkedIn, a portfolio, and GitHub. Think Linktree, but fully custom-built and designed to reflect a distinct personal brand.

🔗 **Live:** [coleyrockin.github.io/linkx](https://coleyrockin.github.io/linkx/)

---

## Screenshot

![LinkX UI](src/assets/imgs/LinkxRefactor.png)

---

## Features

- **Animated profile card** — entrance animation, glassmorphism card, rotating gradient ring around the profile photo
- **Four branded link buttons** — Instagram, LinkedIn, Portfolio, GitHub — each with platform-specific hover colors and icons
- **Atmospheric background** — softly drifting radial gradients for visual depth
- **Responsive layout** — works cleanly on mobile and desktop
- **Accessibility-first** — semantic HTML, ARIA labels, visible focus ring, `prefers-reduced-motion` support
- **CSS design token system** — custom properties for color, easing, and spacing
- **Auto-deploy pipeline** — GitHub Actions workflow deploys to GitHub Pages on every push to `main`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Language | JavaScript |
| Styling | CSS (custom properties + keyframe animations) + Tailwind CSS |
| Icons | React Icons |
| Typography | Syne + Space Grotesk (Google Fonts) |
| Deployment | GitHub Pages via GitHub Actions |
| Testing | React Testing Library + Jest |

---

## Project Structure

```
linkx/
├── public/
│   ├── index.html          # App shell, font loading, metadata
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── assets/imgs/        # Profile photo and screenshots
│   ├── components/
│   │   └── Everything/
│   │       └── Index.js    # Main page component (profile card + links)
│   ├── App.js              # Root component
│   ├── App.test.js         # Smoke tests for links and headline
│   └── index.css           # Global styles, design tokens, animations
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # Auto-deploy to GitHub Pages
├── package.json
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm (bundled with Node)

### Install & Run

```bash
git clone https://github.com/coleyrockin/linkx.git
cd linkx
npm install
npm start
```

Open [http://localhost:3000/linkx](http://localhost:3000/linkx) in your browser.

---

## Testing

```bash
npm test -- --watchAll=false
```

Tests verify that the headline renders correctly and all four outbound links point to the right URLs with secure attributes (`target="_blank"` + `rel="noopener noreferrer"`).

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` triggers the build-and-deploy workflow automatically.

**One-time setup (GitHub UI):**
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**

Once configured, just push to `main` — the site updates itself.

**Live URL:** [https://coleyrockin.github.io/linkx/](https://coleyrockin.github.io/linkx/)

### Manual Deploy

```bash
npm run predeploy
npm run deploy
```

### Troubleshooting

| Issue | Fix |
|---|---|
| Workflow doesn't run | Check the **Actions** tab for errors |
| Old content after deploy | Hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R) |
| Build fails locally | Confirm `homepage` in `package.json` is `https://coleyrockin.github.io/linkx/` |

---

## Production Build

```bash
npm run build
```

Outputs an optimized static bundle to `build/`.

---

## Future Improvements

See [ROADMAP.md](ROADMAP.md) for the full list of planned enhancements.

Highlights include:
- Dark mode toggle
- Analytics integration (privacy-friendly)
- Custom domain support
- Themeable color palette via admin UI
- Animated link entrance (stagger reveal)

---

## Why This Project

LinkX demonstrates practical skills in:

- **React component architecture** — clean, focused single-component design
- **Advanced CSS** — keyframe animations, CSS custom properties, glassmorphism, `clamp()` responsive typography
- **CI/CD pipelines** — automated GitHub Actions deploy workflow
- **Accessibility** — semantic HTML, ARIA roles, reduced-motion media query
- **Performance-conscious design** — minimal dependencies, optimized build, preconnect font hints
