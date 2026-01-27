"use client";

import PredictionMarket from "./PredictionMarket";
import SwapHeader from "./SwapHeader";
import Footer from "./Footer";

import { useState, useEffect } from "react";

export default function PredictionMarketHome({ navigate }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* ⭐ HEADER SECTION */}
      <SwapHeader isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} connected={connected} navigate={navigate} />

      {/* ⭐ PREDICTION MARKET MAIN CONTENT */}
      <section className="flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <PredictionMarket />
        </div>
      </section>

      {/* ⭐ FOOTER */}
      <section id="footer" className="mb-10 mt-20">
        <Footer />
      </section>
    </main>
  );
}
