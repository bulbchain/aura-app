import React, { useRef, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
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
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem("hasVisited")
  );

  // 🔹 FIRST VISIT LOADER
  useEffect(() => {
    if (!loading) return;

    sessionStorage.setItem("hasVisited", "true");

    const timer = setTimeout(() => {
      setLoading(false);
      ScrollTrigger.refresh();
    }, 1200);

    return () => clearTimeout(timer);
  }, [loading]);

  // 🔹 ROUTE CHANGE HANDLING
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, [location]);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage ref={homeRef} />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/swap" element={<SwapHome />} />
        <Route path="/privacy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/model/:id" element={<ModelDetailPage />} />
        <Route path="/models" element={<Models />} />
        <Route path="/live-trades" element={<LiveTradesPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

