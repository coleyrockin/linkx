# Roadmap

Planned features and improvements for LinkX.

---

## Near-term

- [ ] **Dark mode** — respect `prefers-color-scheme` and add a manual toggle
- [ ] **Click analytics** — lightweight outbound-link tracking (e.g. Plausible or a simple Cloudflare Worker) to see which links get the most engagement
- [ ] **Configurable links** — move the `LINKS` array to a JSON config file so destinations can be updated without touching component code
- [ ] **Staggered card animation** — individual link pills animate in sequentially rather than all at once

## Medium-term

- [ ] **TypeScript migration** — add type safety to the component and config
- [ ] **CMS-backed content** — pull profile info and links from a headless CMS (e.g. Sanity or Contentful) for easy non-code updates
- [ ] **Custom domain** — set up a short personal domain (e.g. `boyd.link`) instead of the GitHub Pages subdomain
- [ ] **More link types** — support for email, phone, calendar booking, and file download destinations

## Long-term

- [ ] **Theme builder** — let visitors pick an accent color palette for a personalized view
- [ ] **Vite migration** — move off Create React App to Vite for faster dev starts and smaller bundles
- [ ] **i18n** — support multiple display languages for an international audience
- [ ] **QR code** — generate a shareable QR code for the page that can be used on printed materials
