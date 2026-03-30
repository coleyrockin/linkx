# LinkX

A personal link hub built with React — one clean page to connect visitors to my work and socials.

**[View Live Site](https://coleyrockin.github.io/linkx/)**

![LinkX screenshot](src/assets/imgs/LinkxRefactor.png)

## Features

- Branded profile hero with interactive parallax portrait
- Cursor-tracking ambient lighting (desktop)
- Staggered entrance animations with reduced-motion support
- Responsive layout optimized for mobile and desktop
- Accessible markup with semantic structure and focus states

## Tech Stack

- **React** (Create React App)
- **Tailwind CSS** with custom properties for design tokens
- **React Icons** for platform iconography
- **Syne + Space Grotesk** typography pairing
- **GitHub Actions** for automated deployment to GitHub Pages

## Local Development

```bash
npm install
npm start
```

## Testing

```bash
npm test -- --watchAll=false
```

## Deployment

Pushes to `main` trigger an automatic build and deploy via GitHub Actions.

To configure: go to repo **Settings > Pages** and set **Source** to **GitHub Actions**.
