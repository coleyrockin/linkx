import { useRef, useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS, { filterLinks, groupLinks } from "../data/links";
import useParticleField from "../hooks/useParticleField";
import useShaderField from "../hooks/useShaderField";
import useKonamiCode from "./Terminal/useKonamiCode";
import { trackOutbound } from "../lib/analytics";

const Terminal = lazy(() => import("./Terminal/Terminal"));
const NowSection = lazy(() => import("./NowSection"));

function highlightText(text, queryTokens) {
  if (!queryTokens.length) return text;
  const lowered = text.toLowerCase();
  const firstToken = queryTokens.find((token) => lowered.includes(token));
  if (!firstToken) return text;
  const start = lowered.indexOf(firstToken);
  const end = start + firstToken.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="lx-match">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

function LinkXPage() {
  const particleRef = useRef(null);
  const shaderRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredLinks = useMemo(() => filterLinks(search), [search]);
  const groupedLinks = useMemo(() => groupLinks(filteredLinks), [filteredLinks]);
  const queryTokens = useMemo(
    () => search.trim().toLowerCase().split(/\s+/).filter((token) => token && !token.startsWith("tag:")),
    [search]
  );
  const relatedLookup = useMemo(
    () => Object.fromEntries(LINKS.map((link) => [link.id, link])),
    []
  );

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

        <section className="lx-tree-controls" aria-label="Search links">
          <input
            type="text"
            className="lx-tree-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search links or use tag:build"
            aria-label="Search links"
          />
          <div className="lx-tree-meta">
            <span>{filteredLinks.length} matches</span>
            <span>Try: tag:social, tag:build</span>
          </div>
        </section>

        <nav className="lx-tree" aria-label="External links">
          {groupedLinks.map((group, groupIndex) => (
            <section key={group.id} className="lx-branch" style={{ "--g": groupIndex }} aria-label={group.label}>
              <h2 className="lx-branch-title">{group.label}</h2>
              <ul className="lx-branch-list">
                {group.links.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.id} className={`lx-node ${link.toneClass}`} style={{ "--i": i }} data-link-id={link.id}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`lx-link ${link.toneClass}`}
                        onClick={() => trackOutbound(link.id, link.href)}
                      >
                        <span className="lx-link-glow" aria-hidden="true" />
                        <span className="lx-link-icon" aria-hidden="true">
                          <Icon />
                        </span>
                        <span className="lx-link-body">
                          <span className="lx-link-name">{highlightText(link.name, queryTokens)}</span>
                          <span className="lx-link-sub">{highlightText(link.tagline, queryTokens)}</span>
                          <span className="lx-link-tags" aria-hidden="true">{(link.tags || []).slice(0, 3).join(" · ")}</span>
                        </span>
                        <span className="lx-link-go" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </span>
                      </a>
                      <div className="lx-link-related" aria-hidden="true">
                        {(link.related || []).map((rel) => {
                          const related = relatedLookup[rel];
                          if (!related) return null;
                          return (
                            <span key={rel} className="lx-related-chip">{related.name}</span>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <Suspense fallback={null}>
          <NowSection />
        </Suspense>

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

      {terminalOpen && (
        <Suspense fallback={null}>
          <Terminal onClose={closeTerminal} />
        </Suspense>
      )}
    </div>
  );
}

export default LinkXPage;
