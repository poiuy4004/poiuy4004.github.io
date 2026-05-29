import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./home/Home.tsx";
import RequireGate from "./main/auth/RequireGate.tsx";
import Main from "./main/Main.tsx";
import { initTheme } from "./main/hooks/useTheme.ts";

initTheme();
document.documentElement.style.scrollBehavior = "smooth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/main"
          element={
            <RequireGate>
              <Main />
            </RequireGate>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
