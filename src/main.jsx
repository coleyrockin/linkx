import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import LinkXPage from "./components/LinkXPage";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <LinkXPage />
    </ErrorBoundary>
  </React.StrictMode>
);

// Register the service worker in production so the site is installable
// and serves its last-known version when the network drops.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* intentional: install is best-effort */
    });
  });
}
