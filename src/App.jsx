import React, { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";

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
    </Routes>
  );
}
