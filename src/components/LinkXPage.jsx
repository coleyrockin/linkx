import { useRef, useEffect, useState, useCallback, lazy, Suspense } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS from "../data/links";
import useParticleField from "../hooks/useParticleField";
import useShaderField from "../hooks/useShaderField";
import useKonamiCode from "./Terminal/useKonamiCode";
import { trackOutbound } from "../lib/analytics";

const Terminal = lazy(() => import("./Terminal/Terminal"));
const NowSection = lazy(() => import("./NowSection"));

// Injected at build time (first 7 chars of GITHUB_SHA on CI, else "local").
const BUILD_ID = __LINKX_BUILD__;

function LinkXPage() {
  const particleRef = useRef(null);
  const shaderRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const onSwUpdated = () => setUpdateReady(true);
    window.addEventListener("linkx-sw-updated", onSwUpdated);
    return () => window.removeEventListener("linkx-sw-updated", onSwUpdated);
  }, []);

  const shaderSupported = useShaderField(shaderRef);
  useParticleField(shaderSupported ? particleRef : { current: null });

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);
  useKonamiCode(openTerminal);

  return (
    <div className={`lx ${revealed ? "lx--revealed" : ""}`}>
      <canvas
        className="lx-shader"
        ref={shaderRef}
        aria-hidden="true"
        data-active={shaderSupported === true ? "true" : "false"}
      />
      <canvas className="lx-particles" ref={particleRef} aria-hidden="true" />
      <div className="lx-aurora" aria-hidden="true" data-shader={shaderSupported === true ? "true" : "false"} />
      <div className="lx-grain" aria-hidden="true" />
      <div className="lx-vignette" aria-hidden="true" />

      {updateReady && (
        <div className="lx-update-banner" role="status">
          <span>New version available.</span>
          <button type="button" className="lx-update-reload" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      <main id="main" className="lx-main">
        <article className="lx-panel" aria-label="Profile and links">
          <header className="lx-panel-head" aria-labelledby="lx-profile-heading">
            <div className="lx-avatar">
              <img
                src={ProfilePhoto}
                alt=""
                role="presentation"
                className="lx-avatar-img"
                width="160"
                height="160"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="lx-panel-intro">
              <h1 id="lx-profile-heading" className="lx-title">
                Boyd Roberts
              </h1>
              <p className="lx-subtitle">Creative. Builder. Professional.</p>
            </div>
          </header>

          <div className="lx-section">
            <h2 className="lx-section-label">Outbound</h2>
          </div>

          <nav className="lx-nav" aria-label="External links">
            <ul className="lx-list">
              {LINKS.map((link, i) => {
                const Icon = link.icon;
                const label = `${link.name} — ${link.tagline} (opens in new tab)`;
                return (
                  <li key={link.id} className="lx-list-item">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`lx-row ${link.toneClass}`}
                      style={{ "--i": i }}
                      data-link-id={link.id}
                      aria-label={label}
                      onClick={() => trackOutbound(link.id, link.href)}
                    >
                      <span className="lx-row-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="lx-row-text">
                        <span className="lx-row-name">{link.name}</span>
                        <span className="lx-row-desc">{link.tagline}</span>
                      </span>
                      <span className="lx-row-chevron" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="lx-panel-divider" aria-hidden="true" />

          <Suspense fallback={null}>
            <NowSection />
          </Suspense>

          <footer className="lx-panel-foot">
            <button type="button" className="lx-terminal-trigger" onClick={openTerminal}>
              <span className="lx-terminal-trigger-label">Open terminal</span>
              <span className="lx-terminal-trigger-hint" aria-hidden="true">
                Konami · or tap
              </span>
            </button>
            <p
              className="lx-build"
              title="Deploy id from GitHub Actions (production) or “local” in dev. If this looks old, hard-refresh or tap Reload when an update banner appears."
            >
              deploy <code>{BUILD_ID}</code>
            </p>
          </footer>
        </article>
      </main>

      {terminalOpen && (
        <Suspense fallback={null}>
          <Terminal onClose={closeTerminal} />
        </Suspense>
      )}
    </div>
  );
}

export default LinkXPage;
