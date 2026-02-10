import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const ctaEl = target?.closest?.("[data-cta]") as HTMLElement | null;
  if (!ctaEl) return;

  const ctaName = ctaEl.getAttribute("data-cta") || "unknown";
  if (typeof window.gtag === "function") {
    window.gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: ctaName,
      cta_name: ctaName,
      page_path: window.location.pathname,
    });
  }
});

createRoot(document.getElementById("root")!).render(<App />);
