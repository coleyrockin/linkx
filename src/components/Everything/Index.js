import React from "react";
import Boyd from "../../assets/imgs/BoydNew.png";
import TextTransition, { presets } from "react-text-transition";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const SAYINGS = [
  "Help me install a coding assistant bot on my MacBook M1 from scratch.",
  "Why does my bot fail during setup? Debug step-by-step.",
  "Create a GitHub repo auto-improvement bot.",
  "Build a bot that reviews my repos and suggests improvements.",
  "Make a bot that auto-generates README files.",
  "Build an AI commit message generator.",
  "Create a script that summarizes my GitHub activity weekly.",
  "Make a bot that writes pull request descriptions.",
  "Help me automate repo linting and formatting.",
  "Build a CLI tool that uses AI to refactor code.",
  "Make a bot that comments on my code with suggestions.",
  "Create an AI that turns ideas into starter repos.",
  "Help me create an AI coding co-pilot for personal projects.",
  "Build a fix my broken project script.",
  "Why does GitHub keep showing branch protection warnings?",
  "Fix my Git push authentication errors.",
  "Explain how to set up GitHub Actions from zero.",
  "Create a GitHub Actions workflow for Node projects.",
  "Auto-deploy my repo when I push to main.",
  "Create a pre-commit hook setup.",
  "Add ESLint + Prettier to my repo.",
  "Explain Git branching strategy for solo devs.",
  "Help me clean up my messy repo structure.",
  "Create a repo template I can reuse.",
  "Fix merge conflicts safely.",
  "Help me understand .gitignore best practices.",
  "Add automated tests to my repo.",
  "Create a repo health checklist.",
  "Build a script that updates dependencies.",
  "Create a starter full-stack website template.",
  "Build a modern landing page with Tailwind.",
  "Create a dashboard layout with cards and charts.",
  "Add login + signup to my website.",
  "Add email verification to my auth system.",
  "Create a user profile page.",
  "Build a settings page.",
  "Add password reset functionality.",
  "Add a contact form that sends emails.",
  "Build a simple blog system.",
  "Create a pricing page UI.",
  "Add Stripe payments to my site.",
  "Create a SaaS subscription system.",
  "Build an admin dashboard.",
  "Add analytics tracking to my site.",
  "Build a crypto price tracker using APIs.",
  "Create a simple trading bot starter.",
  "Build a grid trading simulator.",
  "Create a token portfolio tracker.",
  "Build a staking rewards calculator.",
  "Create a DCA calculator.",
  "Build a crypto alert system.",
  "Create a whale alert tracker.",
  "Build a price prediction experiment tool.",
  "Create a dashboard for Cardano tokens.",
  "Add an AI chat widget to my site.",
  "Create an AI blog generator feature.",
  "Build a prompt saving feature.",
  "Create an AI resume generator.",
  "Build an AI cover letter generator.",
  "Create an AI job search helper.",
  "Build an AI image prompt generator.",
  "Add AI summarization for text input.",
  "Create an AI code explainer tool.",
  "Build an AI idea generator.",
  "I'm so behind on my podcast...",
  "I wonder when we will have flying cars.",
  "God Bless Texas.",
  "Like a Rolling Stone energy for every deploy.",
  "The Times They Are A-Changin in this codebase.",
  "Tangled Up in Blueprints, but still shipping.",
  "Highway 61 runs straight through this sprint.",
  "Knockin on Heavens Door for a green build."
];

const DYLAN_INSPIRED_LINES = [
  "A harmonica and hard rain kind of coding session.",
  "Late-night commits with dusty boots and bright ideas.",
  "Rolling through bugs like a restless highway song.",
  "Every sprint feels like a folk tale in motion.",
  "Shipping features while the storm drums on the roof.",
  "Another release, another wind across the wires.",
  "Building truth in code, one verse at a time.",
  "Midnight coffee, motel lights, and passing trains.",
  "Refactoring in circles until the sunrise agrees.",
  "Old chords, new code, same hungry horizon.",
  "The roadmap bends, but the rhythm keeps moving.",
  "Small fixes today, thunder tomorrow.",
  "Words and functions both need clean timing.",
  "A quiet keyboard and a loud point of view.",
  "Stories in the static, progress in the pull request."
];

const GITHUB_LANGUAGES = [
  "C",
  "C#",
  "C++",
  "CSS",
  "GLSL",
  "Go",
  "HTML",
  "Handlebars",
  "Java",
  "JavaScript",
  "PHP",
  "Perl",
  "Python",
  "Ruby",
  "Rust",
  "Shell",
  "TypeScript"
];

const TEXTS = [
  ...SAYINGS,
  ...DYLAN_INSPIRED_LINES,
  ...GITHUB_LANGUAGES.map((language) => `Language in my repos: ${language}.`)
];

const MARKET_TEXTS_LOADING = [
  "Bitcoin (BTC): loading...",
  "NVIDIA (NVDA): loading...",
  "Oil (WTI): loading..."
];

const MARKET_TEXTS_UNAVAILABLE = [
  "Bitcoin (BTC): unavailable right now.",
  "NVIDIA (NVDA): unavailable right now.",
  "Oil (WTI): unavailable right now."
];

function formatUsd(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "unavailable";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function getRandomIndex(max, exclude) {
  if (max <= 1) {
    return 0;
  }

  let nextIndex = exclude;
  while (nextIndex === exclude) {
    nextIndex = Math.floor(Math.random() * max);
  }

  return nextIndex;
}

const LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/coleyrockin",
    icon: FaGithub,
    extraClass: ""
  },
  {
    name: "Portfolio",
    href: "https://coleyrockin.github.io/react-portfolio/",
    icon: FaGlobe,
    extraClass: ""
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/boydcroberts/",
    icon: FaLinkedin,
    extraClass: ""
  }
];

function Everything() {
  const [marketTexts, setMarketTexts] = React.useState(MARKET_TEXTS_LOADING);
  const allTexts = React.useMemo(() => [...TEXTS, ...marketTexts], [marketTexts]);
  const [index, setIndex] = React.useState(() => Math.floor(Math.random() * allTexts.length));

  React.useEffect(() => {
    let isMounted = true;

    const updateMarketTexts = async () => {
      try {
        const response = await fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=BTC-USD,NVDA,CL=F");
        if (!response.ok) {
          throw new Error("Market request failed");
        }

        const data = await response.json();
        const quotes = new Map((data?.quoteResponse?.result || []).map((quote) => [quote.symbol, quote]));
        const nextTexts = [
          `Bitcoin (BTC): ${formatUsd(quotes.get("BTC-USD")?.regularMarketPrice)}.`,
          `NVIDIA (NVDA): ${formatUsd(quotes.get("NVDA")?.regularMarketPrice)}.`,
          `Oil (WTI): ${formatUsd(quotes.get("CL=F")?.regularMarketPrice)}.`
        ];

        if (isMounted) {
          setMarketTexts(nextTexts);
        }
      } catch (error) {
        if (isMounted) {
          setMarketTexts(MARKET_TEXTS_UNAVAILABLE);
        }
      }
    };

    updateMarketTexts();
    const marketIntervalId = setInterval(updateMarketTexts, 120000);

    return () => {
      isMounted = false;
      clearInterval(marketIntervalId);
    };
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((currentIndex) => getRandomIndex(allTexts.length, currentIndex));
    }, 700);

    return () => clearInterval(intervalId);
  }, [allTexts.length]);

  return (
    <section className="surface-card w-full max-w-lg rounded-[2rem] px-6 py-8 sm:px-9 sm:py-10 shadow-[0_24px_50px_rgba(2,14,23,0.44)] transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <header className="text-center">
        <img
          src={Boyd}
          alt="Headshot of Boyd Roberts"
          className="mx-auto h-24 w-24 rounded-full border border-[color:var(--surface-border)] object-cover grayscale sm:h-28 sm:w-28"
        />
        <h1 className="font-display mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl">
          &#123;Boyd Roberts&#125;
        </h1>
        <div className="text-muted mt-4 grid min-h-[6.5rem] w-full place-items-center px-2 text-base italic sm:min-h-[5rem] sm:text-lg">
          <TextTransition className="flash-line text-center leading-tight" direction={presets.default}>
            {allTexts[index % allTexts.length]}
          </TextTransition>
        </div>
        <p className="font-display text-muted mt-3 text-3xl leading-tight sm:text-4xl">Developer</p>
      </header>

      <nav aria-label="Primary links" className="mt-7 flex flex-col gap-3.5 sm:mt-8">
        {LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex w-full items-center justify-between rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--button-bg)] px-5 py-3.5 text-lg font-semibold tracking-[0.01em] text-[var(--text)] shadow-[0_12px_26px_rgba(1,10,17,0.34)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[color:var(--button-bg-hover)] hover:text-[var(--accent-ink)] focus-visible:border-[color:var(--accent)] ${link.extraClass}`}
            >
              <span>{link.name}</span>
              <Icon className="text-2xl text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--accent-ink)]" />
            </a>
          );
        })}
      </nav>
    </section>
  );
}

export default Everything;
