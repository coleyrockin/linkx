import LINKS from "../../data/links";

const SKILLS = [
  "React, TypeScript, Vite, Next.js",
  "Node.js, Python, shell, small systems design",
  "Browser automation (Playwright), agent orchestration",
  "Motion design, Canvas 2D, WebGL fragment shaders",
  "CI/CD, GitHub Actions, GitHub Pages, Vercel",
  "Accessibility-first UI (WCAG 2.1 AA, axe-core in CI)",
];

const PROJECTS = [
  { name: "LinkX",      href: "https://github.com/coleyrockin/linkx",           why: "this site — React + Vite + WebGL shader + Playwright/axe CI" },
  { name: "Portfolio",  href: "https://coleyrockin.github.io/react-portfolio/", why: "longer-form project gallery" },
  { name: "Agent Daily AI", href: "https://github.com/coleyrockin",             why: "multi-platform social agents — Playwright-driven, isolated browser profiles" },
];

const BANNER = [
  "",
  "  ██╗     ██╗███╗   ██╗██╗  ██╗██╗  ██╗",
  "  ██║     ██║████╗  ██║██║ ██╔╝╚██╗██╔╝",
  "  ██║     ██║██╔██╗ ██║█████╔╝  ╚███╔╝ ",
  "  ██║     ██║██║╚██╗██║██╔═██╗  ██╔██╗ ",
  "  ███████╗██║██║ ╚████║██║  ██╗██╔╝ ██╗",
  "  ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝",
  "",
  "  boyd@linkx:~$ type 'help' to list commands.",
  "",
];

export const COMMANDS = {
  help: () => [
    "available commands:",
    "  help        — this list",
    "  whoami      — short bio",
    "  skills      — stack and strengths",
    "  projects    — things I've shipped",
    "  contact     — reach me",
    "  links       — all outbound links on this page",
    "  theme       — detected color scheme",
    "  clear       — wipe the screen",
    "  exit        — close this terminal (Esc also works)",
  ],

  whoami: () => [
    "Boyd Roberts — builder. creative. professional.",
    "I ship React interfaces, motion design, and small automation systems.",
    "This terminal is real — every command is parsed. Try 'projects'.",
  ],

  skills: () => ["stack:", ...SKILLS.map((s) => `  • ${s}`)],

  projects: () => [
    "selected projects:",
    ...PROJECTS.flatMap((p) => [
      `  ${p.name}`,
      `    ${p.why}`,
      `    → ${p.href}`,
      "",
    ]).slice(0, -1),
  ],

  contact: () => [
    "email: coleyrockin@aol.com",
    "github: https://github.com/coleyrockin",
    "linkedin: https://www.linkedin.com/in/boydcroberts/",
  ],

  links: () => LINKS.map((l) => `  ${l.name.padEnd(10)} ${l.href}`),
  find: (args) => {
    const query = args.join(" ").trim().toLowerCase();
    if (!query) return ["usage: find <query>"];
    const matches = LINKS.filter((link) =>
      [link.name, link.tagline, ...(link.tags || []), ...(link.aliases || []), link.id]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
    if (!matches.length) return [`no matches for "${query}"`];
    return [
      `matches (${matches.length}):`,
      ...matches.map((link) => `  ${link.name.padEnd(10)} ${link.href}`),
    ];
  },
  related: (args) => {
    const id = args[0]?.toLowerCase();
    if (!id) return ["usage: related <link-id>"];
    const link = LINKS.find((item) => item.id.toLowerCase() === id);
    if (!link) return [`unknown link id: ${id}`];
    const related = (link.related || [])
      .map((relId) => LINKS.find((item) => item.id === relId))
      .filter(Boolean);
    if (!related.length) return [`${link.name} has no related links configured`];
    return [
      `${link.name} related links:`,
      ...related.map((item) => `  ${item.name.padEnd(10)} ${item.href}`),
    ];
  },

  theme: () => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return ["theme detection unavailable"];
    }
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return [
      `scheme: ${light ? "light" : "dark"}`,
      `motion: ${reduced ? "reduced" : "full"}`,
    ];
  },

  clear: () => "__CLEAR__",
  cls: () => "__CLEAR__",
  exit: () => "__EXIT__",

  ls: () => ["about.md  skills/  projects/  contact.vcf  linkx.jsx"],
  pwd: () => ["/home/boyd/linkx"],
  date: () => [new Date().toString()],
  echo: (args) => [args.join(" ") || ""],
  sudo: () => ["nice try."],
  rm: (args) => {
    if (args.includes("-rf") && args.some((a) => a === "/" || a === "/*")) {
      return ["rm: refusing to remove '/' or '/*' — this is the whole point."];
    }
    return [`rm: cannot remove '${args.join(" ") || "?"}': Permission denied`];
  },
};

export function runCommand(line) {
  const parts = line.trim().split(/\s+/);
  const name = parts[0]?.toLowerCase() || "";
  const args = parts.slice(1);

  if (!name) return [];
  const handler = COMMANDS[name];
  if (!handler) return [`command not found: ${name} — try 'help'`];
  const out = handler(args);
  if (typeof out === "string") return out;
  return out;
}

export { BANNER };
