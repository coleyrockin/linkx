# Changelog

All notable changes to this project are documented here.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

_Planned work tracked in [ROADMAP.md](ROADMAP.md)._

---

## [1.1.0] — Refactor

### Added
- GitHub Actions automated deploy workflow (`.github/workflows/deploy-pages.yml`) — push to `main` publishes to GitHub Pages automatically
- GitHub link card — fourth destination added alongside Instagram, LinkedIn, and Portfolio
- CSS design token system — custom properties for color, easing, and spacing (`--bg-base`, `--ink`, `--card`, `--focus`, `--ease-out`, etc.)
- Advanced CSS animation — keyframe-driven card entrance, drifting atmosphere orbs, and spinning gradient ring on profile photo
- Typography refresh — `Syne` (headings) + `Space Grotesk` (body) loaded via Google Fonts with preconnect hints
- Platform-specific hover tones — each link pill applies a brand-color tint and border on hover
- `prefers-reduced-motion` media query — disables all animations and transitions for users who prefer reduced motion
- `site.webmanifest` — proper PWA manifest wired into `public/index.html`
- React Testing Library smoke tests — verifies headline text and all four outbound link `href`, `target`, and `rel` attributes

### Changed
- Rebuilt entire UI — replaced previous layout with a focused glassmorphism profile card
- Simplified component tree — single `Everything` component handles the full page
- Updated `public/index.html` metadata — corrected manifest path, aligned font preconnect/load tags

### Removed
- Previous multi-section layout and unrelated content

---

## [1.0.0] — Initial Release

### Added
- React application bootstrapped with Create React App
- Basic personal link hub layout
- Initial link set: Instagram, LinkedIn, Portfolio
- Tailwind CSS integration
- GitHub Pages manual deploy via `gh-pages`
