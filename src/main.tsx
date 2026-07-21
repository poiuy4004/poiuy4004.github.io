import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initTheme } from "./main/hooks/useTheme.ts";

initTheme();

// The portfolio used to live at /main behind a route guard. Everything is on
// one page now, so fold any stale deep link (and any unknown path served by
// the GitHub Pages 404 fallback) back onto the root.
if (window.location.pathname !== "/") {
  window.history.replaceState(null, "", "/");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
