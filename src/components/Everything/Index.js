import { useEffect, useRef } from "react";
import ProfilePhoto from "../../assets/imgs/boyd26.jpeg";
import { FaInstagram, FaLinkedin, FaGithub, FaGlobeAmericas } from "react-icons/fa";

const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/coleyrockin/",
    tagline: "Behind the scenes",
    icon: FaInstagram,
    toneClass: "tone-instagram"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/boydcroberts/",
    tagline: "Professional world",
    icon: FaLinkedin,
    toneClass: "tone-linkedin"
  },
  {
    name: "Portfolio",
    href: "https://coleyrockin.github.io/react-portfolio/",
    tagline: "Projects and builds",
    icon: FaGlobeAmericas,
    toneClass: "tone-portfolio"
  },
  {
    name: "GitHub",
    href: "https://github.com/coleyrockin",
    tagline: "Code and open source",
    icon: FaGithub,
    toneClass: "tone-github"
  }
];

function Everything() {
  const pageRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const pageElement = pageRef.current;
    const portraitElement = portraitRef.current;
    const coarsePointerQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer: coarse)")
        : null;

    if (!pageElement || coarsePointerQuery?.matches) {
      return undefined;
    }

    const setAuraPosition = (event) => {
      const rect = pageElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      pageElement.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
      pageElement.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
      pageElement.style.setProperty("--pointer-opacity", "0.85");
    };

    const fadeAura = () => {
      pageElement.style.setProperty("--pointer-opacity", "0");
    };

    const setPortraitDepth = (event) => {
      if (!portraitElement) {
        return;
      }

      const rect = portraitElement.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = offsetX * 10;
      const rotateX = offsetY * -10;
      const shiftX = offsetX * 16;
      const shiftY = offsetY * 16;
      const glowX = ((event.clientX - rect.left) / rect.width) * 100;
      const glowY = ((event.clientY - rect.top) / rect.height) * 100;

      portraitElement.style.setProperty("--portrait-rotate-x", `${rotateX.toFixed(2)}deg`);
      portraitElement.style.setProperty("--portrait-rotate-y", `${rotateY.toFixed(2)}deg`);
      portraitElement.style.setProperty("--portrait-shift-x", `${shiftX.toFixed(2)}px`);
      portraitElement.style.setProperty("--portrait-shift-y", `${shiftY.toFixed(2)}px`);
      portraitElement.style.setProperty("--portrait-glow-x", `${glowX.toFixed(2)}%`);
      portraitElement.style.setProperty("--portrait-glow-y", `${glowY.toFixed(2)}%`);
    };

    const resetPortraitDepth = () => {
      if (!portraitElement) {
        return;
      }

      portraitElement.style.setProperty("--portrait-rotate-x", "0deg");
      portraitElement.style.setProperty("--portrait-rotate-y", "0deg");
      portraitElement.style.setProperty("--portrait-shift-x", "0px");
      portraitElement.style.setProperty("--portrait-shift-y", "0px");
      portraitElement.style.setProperty("--portrait-glow-x", "50%");
      portraitElement.style.setProperty("--portrait-glow-y", "34%");
    };

    pageElement.addEventListener("pointermove", setAuraPosition);
    pageElement.addEventListener("pointerenter", setAuraPosition);
    pageElement.addEventListener("pointerleave", fadeAura);

    if (portraitElement) {
      portraitElement.addEventListener("pointermove", setPortraitDepth);
      portraitElement.addEventListener("pointerenter", setPortraitDepth);
      portraitElement.addEventListener("pointerleave", resetPortraitDepth);
      resetPortraitDepth();
    }

    return () => {
      pageElement.removeEventListener("pointermove", setAuraPosition);
      pageElement.removeEventListener("pointerenter", setAuraPosition);
      pageElement.removeEventListener("pointerleave", fadeAura);

      if (portraitElement) {
        portraitElement.removeEventListener("pointermove", setPortraitDepth);
        portraitElement.removeEventListener("pointerenter", setPortraitDepth);
        portraitElement.removeEventListener("pointerleave", resetPortraitDepth);
      }
    };
  }, []);

  return (
    <main className="linkx-page" ref={pageRef}>
      <div className="grid-lines" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />
      <div className="atmosphere atmosphere-c" aria-hidden="true" />

      <section className="linkx-card" aria-label="Boyd Roberts links">
        <div className="hero-grid">
          <header className="linkx-header">
            <p className="eyebrow">Boyd Roberts</p>
            <h1>Doors into my world</h1>
            <p className="subcopy">
              A tiny control panel for my corner of the internet.
            </p>
            <div className="signal-row" aria-label="Brand themes">
              <span className="signal-pill">Creative</span>
              <span className="signal-pill">Professional</span>
              <span className="signal-pill">Builder</span>
            </div>
          </header>

          <aside
            className="portrait-panel"
            aria-label="Boyd Roberts portrait"
            ref={portraitRef}
          >
            <div className="portrait-glow portrait-glow-a" aria-hidden="true" />
            <div className="portrait-glow portrait-glow-b" aria-hidden="true" />
            <div className="photo-shell">
              <span className="photo-ring" aria-hidden="true" />
              <span className="photo-backdrop" aria-hidden="true" />
              <img
                src={ProfilePhoto}
                alt="Portrait of Boyd Roberts"
                className="profile-photo"
              />
            </div>
          </aside>
        </div>

        <nav className="link-stack" aria-label="Social and professional links">
          {LINKS.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-pill ${link.toneClass}`}
                style={{ "--stagger-delay": `${280 + index * 110}ms` }}
              >
                <span className="icon-badge" aria-hidden="true">
                  <Icon />
                </span>

                <span className="link-copy">
                  <span className="link-name">{link.name}</span>
                  <span className="link-tagline">{link.tagline}</span>
                </span>
              </a>
            );
          })}
        </nav>
      </section>
    </main>
  );
}

export default Everything;
