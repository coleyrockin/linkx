import { useEffect } from "react";

const DESKTOP_PARTICLE_COUNT = 80;
const MOBILE_PARTICLE_COUNT = 40;
const CURSOR_INFLUENCE_RADIUS = 150;
const LINK_DISTANCE = 120;
const DRIFT_SPEED = 0.3;
const DRIFT_DECAY = 0.995;
const REPULSION_STRENGTH = 0.15;

export default function useParticleField(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const match = (q) =>
      typeof window.matchMedia === "function" && window.matchMedia(q).matches;
    const isCoarse = match("(pointer: coarse)");
    const prefersReducedMotion = match("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion) return undefined;

    let raf;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const count = isCoarse ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    if (!isCoarse) window.addEventListener("pointermove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (!isCoarse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_INFLUENCE_RADIUS) {
            const force = (CURSOR_INFLUENCE_RADIUS - dist) / CURSOR_INFLUENCE_RADIUS;
            p.vx += (dx / dist) * force * REPULSION_STRENGTH;
            p.vy += (dy / dist) * force * REPULSION_STRENGTH;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= DRIFT_DECAY;
        p.vy *= DRIFT_DECAY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / LINK_DISTANCE)})`;
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
  }, [canvasRef]);
}
