import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo at /linkx/. Local dev uses "/" so http://localhost:5188/
// is unambiguous (port 5173 is often another Vite project).
const pagesBase = "/linkx/";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : pagesBase,
  define: {
    // Shown in UI so you can confirm GitHub Pages served the latest deploy (see public/sw.js).
    __LINKX_BUILD__: JSON.stringify(
      process.env.GITHUB_SHA?.slice(0, 7) || "local"
    ),
  },
  plugins: [
    react(),
    {
      name: "linkx-dev-html-asset-paths",
      transformIndexHtml(html, ctx) {
        if (!ctx.server) return html;
        // index.html hardcodes /linkx/ for production OG URLs and public assets;
        // rewrite only same-origin asset links for dev with base "/".
        return html.replaceAll('href="/linkx/', 'href="/');
      },
    },
  ],
  server: {
    port: 5188,
    strictPort: true,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
    exclude: ["node_modules", "tests/e2e/**", "build"],
  },
}));
