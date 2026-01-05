import React, { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DocsPage from "./components/DocsPage";
import SwapHome from "./components/SwapHome";
import Policy from "./components/Policy";
import Terms from "./components/Terms";
import Dashboard from "./components/Dashboard";
import ModelDetailPage from "./components/ModelDetailPage";
import Models from "./components/Models";
import LiveTradesPage from "./components/LiveTradesPage";
import NotFound404 from "./components/NotFound404";


gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const homeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 🧭 Scroll to top whenever route changes
    window.scrollTo(0, 0);

    // ✅ Refresh GSAP ScrollTrigger after route change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage ref={homeRef} />} />
      <Route path='/docs' element={<DocsPage />} />
      <Route path='/swap' element={<SwapHome />} />
      <Route path='/privacy' element={<Policy />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/model/:id" element={<ModelDetailPage />} />
      <Route path="/models" element={<Models />} />
      <Route path="/live-trades" element={<LiveTradesPage />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
