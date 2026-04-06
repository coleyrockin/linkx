import { useRef, useCallback } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS from "../data/links";
import usePointerEffects from "../hooks/usePointerEffects";

function LinkXPage() {
  const pageRef = useRef(null);
  const portraitRef = useRef(null);

  usePointerEffects(pageRef, portraitRef);

  const handlePillMove = useCallback((e) => {
    const pill = e.currentTarget;
    const r = pill.getBoundingClientRect();
    const ox = (e.clientX - (r.left + r.width / 2)) / r.width;
    const oy = (e.clientY - (r.top + r.height / 2)) / r.height;
    pill.style.setProperty("--mag-x", `${(ox * 4).toFixed(2)}px`);
    pill.style.setProperty("--mag-y", `${(oy * 4).toFixed(2)}px`);
  }, []);

  const handlePillLeave = useCallback((e) => {
    const pill = e.currentTarget;
    pill.style.setProperty("--mag-x", "0px");
    pill.style.setProperty("--mag-y", "0px");
  }, []);

  return (
    <main className="linkx-page" ref={pageRef}>
      <div className="grid-lines" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />
      <div className="atmosphere atmosphere-c" aria-hidden="true" />

      <section className="linkx-card" aria-label="Boyd Roberts links">
        <div className="card-border-glow" aria-hidden="true" />

        <div className="hero-grid">
          <header className="linkx-header">
            <p className="eyebrow">Boyd Roberts</p>
            <h1 className="hero-heading">
              Doors into my world
            </h1>
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
                onPointerMove={handlePillMove}
                onPointerLeave={handlePillLeave}
              >
                <span className="icon-badge" aria-hidden="true">
                  <Icon />
                </span>
                <span className="link-copy">
                  <span className="link-name">{link.name}</span>
                  <span className="link-tagline">{link.tagline}</span>
                </span>
                <span className="link-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            );
          })}
        </nav>
      </section>
    </main>
  );
}

export default LinkXPage;
