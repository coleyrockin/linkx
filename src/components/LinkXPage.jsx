import { useRef, useEffect, useState, useCallback } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS from "../data/links";
import NOW from "../data/now.json";
import useParticleField from "../hooks/useParticleField";
import { trackOutbound } from "../lib/analytics";

function LinkXPage() {
  const canvasRef = useRef(null);
  const linkRefs = useRef([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useParticleField(canvasRef);

  const onKeyDown = useCallback((e, index) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" ? 1 : -1;
    const next = (index + delta + LINKS.length) % LINKS.length;
    linkRefs.current[next]?.focus();
  }, []);

  const formattedNowDate = new Date(NOW.updated).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`lx ${revealed ? "lx--revealed" : ""}`}>
      <canvas className="lx-particles" ref={canvasRef} aria-hidden="true" />
      <div className="lx-aurora" aria-hidden="true" />
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
                ref={(el) => (linkRefs.current[i] = el)}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`lx-link ${link.toneClass}`}
                style={{ "--i": i }}
                onClick={() => trackOutbound(link.id, link.href)}
                onKeyDown={(e) => onKeyDown(e, i)}
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

        <section className="lx-now" aria-labelledby="lx-now-heading">
          <div className="lx-now-head">
            <h2 id="lx-now-heading" className="lx-now-title">Now</h2>
            <span className="lx-now-date">{formattedNowDate}</span>
          </div>
          <ul className="lx-now-list">
            {NOW.items.map((item, i) => (
              <li key={i} className="lx-now-item">{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default LinkXPage;
