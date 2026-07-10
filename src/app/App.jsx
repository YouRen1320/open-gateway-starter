import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";
import { DemoLayout } from "../layouts/DemoLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { DocsPage } from "../pages/DocsPage";
import { LandingPage } from "../pages/LandingPage";
import { ModelsPage } from "../pages/ModelsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PricingPage } from "../pages/PricingPage";
import { StatusPage } from "../pages/StatusPage";
import { usePreferences } from "./PreferencesContext";

const DemoDashboard = lazy(() => import("../demo/DemoDashboard"));
const DemoChat = lazy(() => import("../demo/DemoChat"));

function RouteEffects() {
  const location = useLocation();

  // Route changes restore the visual position and move screen-reader focus to the new main region.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.requestAnimationFrame(() => {
      document.querySelector("main[tabindex='-1']")?.focus({ preventScroll: true });
    });
  }, [location.pathname, location.search]);

  return null;
}

function DemoGate({ children }) {
  return siteConfig.demoEnabled ? children : <Navigate to="/" replace />;
}

function DemoFallback() {
  const { language } = usePreferences();
  return <div className="route-loading" role="status"><span />{language === "zh" ? "正在加载演示…" : "Loading demo…"}</div>;
}

export function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="demo" element={<DemoGate><DemoLayout /></DemoGate>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Suspense fallback={<DemoFallback />}><DemoDashboard /></Suspense>} />
          <Route path="chat" element={<Suspense fallback={<DemoFallback />}><DemoChat /></Suspense>} />
        </Route>
      </Routes>
    </>
  );
}
