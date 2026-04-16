export function trackOutbound(id, href) {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible("Outbound Link: Click", { props: { id, href } });
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[analytics] outbound", { id, href });
  }
}
