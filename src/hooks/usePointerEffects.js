import { useEffect } from "react";

export default function usePointerEffects(pageRef, portraitRef) {
  useEffect(() => {
    const page = pageRef.current;
    const portrait = portraitRef.current;
    const isCoarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (!page || isCoarse) return undefined;

    const setAura = (e) => {
      const r = page.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      page.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
      page.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
      page.style.setProperty("--pointer-opacity", "0.85");
    };

    const fadeAura = () => page.style.setProperty("--pointer-opacity", "0");

    const setDepth = (e) => {
      if (!portrait) return;
      const r = portrait.getBoundingClientRect();
      const ox = (e.clientX - r.left) / r.width - 0.5;
      const oy = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.setProperty("--portrait-rotate-x", `${(oy * -10).toFixed(2)}deg`);
      portrait.style.setProperty("--portrait-rotate-y", `${(ox * 10).toFixed(2)}deg`);
      portrait.style.setProperty("--portrait-shift-x", `${(ox * 16).toFixed(2)}px`);
      portrait.style.setProperty("--portrait-shift-y", `${(oy * 16).toFixed(2)}px`);
      portrait.style.setProperty("--portrait-glow-x", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      portrait.style.setProperty("--portrait-glow-y", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
    };

    const resetDepth = () => {
      if (!portrait) return;
      portrait.style.setProperty("--portrait-rotate-x", "0deg");
      portrait.style.setProperty("--portrait-rotate-y", "0deg");
      portrait.style.setProperty("--portrait-shift-x", "0px");
      portrait.style.setProperty("--portrait-shift-y", "0px");
      portrait.style.setProperty("--portrait-glow-x", "50%");
      portrait.style.setProperty("--portrait-glow-y", "34%");
    };

    page.addEventListener("pointermove", setAura);
    page.addEventListener("pointerenter", setAura);
    page.addEventListener("pointerleave", fadeAura);

    if (portrait) {
      portrait.addEventListener("pointermove", setDepth);
      portrait.addEventListener("pointerenter", setDepth);
      portrait.addEventListener("pointerleave", resetDepth);
      resetDepth();
    }

    return () => {
      page.removeEventListener("pointermove", setAura);
      page.removeEventListener("pointerenter", setAura);
      page.removeEventListener("pointerleave", fadeAura);
      if (portrait) {
        portrait.removeEventListener("pointermove", setDepth);
        portrait.removeEventListener("pointerenter", setDepth);
        portrait.removeEventListener("pointerleave", resetDepth);
      }
    };
  }, [pageRef, portraitRef]);
}
