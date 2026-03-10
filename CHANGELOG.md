# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Changed
- Renamed component `Everything/Index.js` → `LinkHub/LinkHub.js` for clarity and naming consistency
- Updated `site.webmanifest` with proper app name, description, theme color, and `start_url`
- Fixed `theme-color` meta tag in `index.html` to match the light design (`#f3f8ff`)
- Rewrote `README.md` with full project title, description, features, tech stack, installation, run instructions, project structure, and troubleshooting sections
- Added `ROADMAP.md` and `CHANGELOG.md`

### Removed
- Unused `react-text-transition` dependency from `package.json`

---

## [0.2.0] — 2025

### Added
- GitHub link as a fourth destination alongside Instagram, LinkedIn, and Portfolio
- GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) for automated GitHub Pages deployment
- `robots.txt` and `site.webmanifest` in `public/`

### Changed
- Rebuilt UI with CSS custom properties design-token system (colors, spacing, easing)
- Advanced CSS motion: atmospheric drifting blobs, card entrance animation, hover lift on links
- Typography refresh: Syne for headings, Space Grotesk for body text
- Profile photo wrapped in animated spinning gradient ring
- Hover tint per platform (Instagram pink, LinkedIn blue, Portfolio teal, GitHub charcoal)
- Updated `App.test.js` to contract-test all four outbound links and heading copy

### Removed
- Outdated multi-page content replaced by focused single-page link hub

---

## [0.1.0] — Initial release

### Added
- Single-page React app with profile hero and outbound social links
- Tailwind CSS integration
- React Icons for social platform icons
- Basic responsive layout
- CRA test scaffold
