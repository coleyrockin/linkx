import { useRef, useEffect, useState, useCallback } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS from "../data/links";
import useParticleField from "../hooks/useParticleField";
import useShaderField from "../hooks/useShaderField";
import useKonamiCode from "./Terminal/useKonamiCode";
import Terminal from "./Terminal/Terminal";
import NowSection from "./NowSection";
import { trackOutbound } from "../lib/analytics";

function LinkXPage() {
  const particleRef = useRef(null);
  const shaderRef = useRef(null);
  const linkRefs = useRef([]);
  const [revealed, setRevealed] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const shaderSupported = useShaderField(shaderRef);
  // Only run the 2D particle layer when the shader is active. If the shader
  // failed or is still probing, the CSS aurora and grain remain as a fallback.
  useParticleField(shaderSupported ? particleRef : { current: null });

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);
  useKonamiCode(openTerminal);

  const onLinkKeyDown = useCallback((e, index) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" ? 1 : -1;
    const next = (index + delta + LINKS.length) % LINKS.length;
    linkRefs.current[next]?.focus();
  }, []);

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

      <main id="main" className="lx-content">
        <div className="lx-stage" aria-hidden="true" />

        <div className="lx-identity">
          <div className="lx-photo-wrap">
            <div className="lx-photo-halo" aria-hidden="true" />
            <div className="lx-photo-ring" aria-hidden="true" />
            <img
              src={ProfilePhoto}
              alt="Boyd Roberts"
              className="lx-photo"
              width="360"
              height="480"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="lx-text">
            <h1 className="lx-name">Boyd Roberts</h1>
            <p className="lx-tagline">Creative. Builder. Professional.</p>
          </div>
        </div>

        <nav className="lx-links" aria-label="External links">
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`lx-link ${link.toneClass}`}
                style={{ "--i": i }}
                onClick={() => trackOutbound(link.id, link.href)}
                onKeyDown={(e) => onLinkKeyDown(e, i)}
                data-link-id={link.id}
              >
                <span className="lx-link-glow" aria-hidden="true" />
                <span className="lx-link-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="lx-link-body">
                  <span className="lx-link-name">{link.name}</span>
                  <span className="lx-link-sub">{link.tagline}</span>
                </span>
                <span className="lx-link-go" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>
            );
          })}
        </nav>

        <NowSection />

        <footer className="lx-foot">
          <button
            type="button"
            className="lx-foot-hint"
            onClick={openTerminal}
            aria-label="Open developer terminal"
          >
            <span className="lx-foot-hint-label">secret:</span>
            <span className="lx-foot-keys" aria-hidden="true">
              <kbd>↑</kbd>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <kbd>↓</kbd>
              <kbd>←</kbd>
              <kbd>→</kbd>
              <kbd>←</kbd>
              <kbd>→</kbd>
              <kbd>B</kbd>
              <kbd>A</kbd>
            </span>
            <span className="lx-foot-hint-tap">tap to open</span>
          </button>
        </footer>
      </main>

      {terminalOpen && <Terminal onClose={closeTerminal} />}
    </div>
  );
}

export default LinkXPage;
