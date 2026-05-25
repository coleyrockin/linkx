const PLAUSIBLE_DOMAIN = "coleyrockin.github.io";
const PLAUSIBLE_SRC = "https://plausible.io/js/script.outbound-links.js";

export function loadAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.location.hostname !== PLAUSIBLE_DOMAIN) return;
  if (document.querySelector(`script[src="${PLAUSIBLE_SRC}"][data-domain="${PLAUSIBLE_DOMAIN}"]`)) return;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = PLAUSIBLE_SRC;
  document.head.appendChild(script);
}

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
