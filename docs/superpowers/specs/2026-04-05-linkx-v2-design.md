# LinkX v2 — Full Overhaul Design

## Overview

Complete refactor of LinkX personal link hub: architecture cleanup, visual upgrade, interaction polish, new profile photo.

## Architecture

### Remove dead weight
- Remove Tailwind CSS, postcss.config.js, autoprefixer (installed but never used)
- Remove `tailwind.config.js`
- Remove `@tailwind` directives from index.css
- Remove `App.js` wrapper — import component directly in `index.js`
- Remove `reportWebVitals.js` and its import (called with no callback)
- Remove committed `build/` directory from git tracking

### Component restructure
- Rename `Everything` → `LinkXPage` (descriptive name)
- Move from `src/components/Everything/Index.js` → `src/components/LinkXPage.jsx`
- Extract `usePointerEffects(pageRef, portraitRef)` custom hook → `src/hooks/usePointerEffects.js`
- Extract `LINKS` data → `src/data/links.js`

### Meta & SEO
- Add Open Graph meta tags (og:title, og:description, og:image, og:url)
- Add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Update theme-color to match dark background (#09111f)

## Visual Design

### Profile photo
- Replace `boyd26.jpeg` with new striped polo photo (image 2)
- Crop to match existing aspect ratio (1:1.08)

### Typography
- Hero heading gets gradient text: gold (#ffd166) → coral (#ff8a5b) → purple (#a78bfa)
- Using `background-clip: text` with `-webkit-text-fill-color: transparent`

### Link pills — horizontal layout (desktop)
- Desktop (820px+): horizontal row layout — icon left | name + tagline center-left | arrow chevron right
- Mobile: keep current stacked/centered layout
- Add sliding highlight bar on hover (left-to-right wipe via pseudo-element)

### Animated card border
- Conic-gradient rotating slowly around the card border
- Implemented via `::after` pseudo-element with overflow hidden and border-radius match
- Subtle — 0.15 opacity, 8s rotation

### Entrance animations
- Card: fade up + scale (existing, refined)
- Photo: scale from 0.9 → 1 with slight blur-to-sharp
- Links: stagger with translateY + opacity + slight blur clear
- All using WAAPI where needed (prefers-reduced-motion safe)

### 5th link
- Add X/Twitter: handle @coleyrockin, href https://x.com/coleyrockin
- Icon: FaXTwitter from react-icons (or FaTwitter if v4)
- Tone class: tone-x with dark/charcoal gradient

## Interactions

### Magnetic hover (link pills)
- On pointermove over a link pill, shift pill subtly toward cursor (max 4px)
- Reset on pointerleave with smooth transition
- Disabled on coarse pointer devices

### Photo zoom
- Portrait panel hover: photo scales to 1.03 over 400ms
- Smooth transition back on leave

### Sliding highlight
- Link pill hover: left-to-right highlight wipe via `::after` pseudo-element
- Uses `scaleX(0) → scaleX(1)` with `transform-origin: left`
- Tinted to match each link's tone color

## Files Changed

| File | Action |
|------|--------|
| `src/components/Everything/Index.js` | Delete |
| `src/components/LinkXPage.jsx` | Create (main component) |
| `src/hooks/usePointerEffects.js` | Create (extracted hook) |
| `src/data/links.js` | Create (link data) |
| `src/index.css` | Rewrite (remove Tailwind, add new styles) |
| `src/index.js` | Simplify (remove App, reportWebVitals) |
| `src/App.js` | Delete |
| `src/reportWebVitals.js` | Delete |
| `src/assets/imgs/boyd-striped.jpeg` | Add (new photo) |
| `src/assets/imgs/boyd26.jpeg` | Keep (not deleted, just not referenced) |
| `public/index.html` | Update (OG tags, theme-color) |
| `package.json` | Remove tailwind/postcss/autoprefixer devDeps |
| `tailwind.config.js` | Delete |
| `postcss.config.js` | Delete |
| `src/App.test.js` | Update (new component import, add X link assertion) |
| `build/` | Remove from git tracking |
