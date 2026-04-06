import { useRef, useEffect, useState } from "react";
import ProfilePhoto from "../assets/imgs/boyd-striped.jpeg";
import LINKS from "../data/links";

function LinkXPage() {
  const canvasRef = useRef(null);
  const pageRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isCoarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const PARTICLE_COUNT = isCoarse ? 40 : 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    if (!isCoarse) window.addEventListener("pointermove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Gentle cursor repulsion
        if (!isCoarse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (!isCoarse) window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={`lx ${revealed ? "lx--revealed" : ""}`} ref={pageRef}>
      <canvas className="lx-particles" ref={canvasRef} aria-hidden="true" />
      <div className="lx-aurora" aria-hidden="true" />
      <div className="lx-grain" aria-hidden="true" />

      <main className="lx-content">
        <div className="lx-stage" aria-hidden="true" />

        <div className="lx-identity">
          <div className="lx-photo-wrap">
            <div className="lx-photo-halo" aria-hidden="true" />
            <div className="lx-photo-ring" aria-hidden="true" />
            <img
              src={ProfilePhoto}
              alt="Boyd Roberts"
              className="lx-photo"
            />
          </div>

          <div className="lx-text">
            <h1 className="lx-name">Boyd Roberts</h1>
            <p className="lx-tagline">Creative. Builder. Professional.</p>
          </div>
        </div>

        <nav className="lx-links" aria-label="Links">
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`lx-link ${link.toneClass}`}
                style={{ "--i": i }}
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
      </main>
    </div>
  );
}

export default LinkXPage;
