# Roadmap

This document tracks planned improvements and feature ideas for LinkX.

---

## Near-Term

- [ ] **Staggered link entrance** — animate each link button in with a sequenced delay on page load
- [ ] **Dark mode toggle** — honor `prefers-color-scheme` by default, with a manual toggle button
- [ ] **Copy-to-clipboard on email link** — add an email link card that copies the address instead of opening a mail client
- [ ] **Click analytics** — lightweight, privacy-friendly click tracking per link (e.g. Plausible or a simple API call)

---

## Medium-Term

- [ ] **Custom domain** — point a personal domain (e.g. `boyd.link`) at the GitHub Pages deployment
- [ ] **Configurable link list** — move the `LINKS` array to a JSON config file so the page can be updated without touching component code
- [ ] **Link preview on hover** — show a small visual preview or URL tooltip on hover
- [ ] **Open Graph / social share card** — add `og:image` and `twitter:card` meta tags so the link previews nicely when shared

---

## Longer-Term / Exploratory

- [ ] **Admin UI** — a small settings panel (behind a flag or local-only) for reordering and toggling links
- [ ] **Themeable palette** — expose CSS custom properties as theme options (e.g. warm, cool, dark)
- [ ] **Multiple profiles** — support swappable profile configs for different audiences (personal, professional, creative)
- [ ] **Internationalization (i18n)** — localized taglines for multi-language visitors

---

## Completed

- [x] Single-page profile card with photo, name, and tagline
- [x] Four outbound links: Instagram, LinkedIn, Portfolio, GitHub
- [x] Platform-specific hover tones per link
- [x] CSS design token system (color, easing, spacing)
- [x] Animated background atmosphere (drifting radial gradients)
- [x] Rotating gradient ring around profile photo
- [x] Card entrance animation
- [x] `prefers-reduced-motion` support
- [x] Responsive layout (mobile + desktop)
- [x] Accessible semantic HTML with ARIA labels and visible focus ring
- [x] Automated GitHub Actions deploy pipeline to GitHub Pages
- [x] React Testing Library smoke tests for headline and link URLs
