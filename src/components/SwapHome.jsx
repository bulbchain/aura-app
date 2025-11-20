"use client";

import SwapHeader from "./SwapHeader";
import SwapPage from "./SwapPage";
import PriceChart from "./PriceChart";   // ✅ ADD THIS LINE

import { useState, useEffect } from "react";
import RecentSwapsFeed from "./RecentSwapsFeed";
import Footer from "./Footer";

export default function SwapHome({ navigate }) {
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
      <SwapHeader
        isMobile={isMobile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        connected={connected}
        navigate={navigate}
      />

      {/* ⭐ SWAP MAIN CONTENT */}
      <section className="flex justify-center px-4 md:px-0 mt-10">
        <div className="w-full max-w-xl">
          <SwapPage />
        </div>
      </section>

      {/* ⭐ PRICE CHART SECTION (ADDED HERE) */}
      <section className="px-4 md:px-12 mt-16 mb-20">
        <PriceChart />
      </section>

       {/* ⭐ Swaps Feed (ADDED HERE) */}
      <section className="px-4 md:px-12 mt-16 mb-20">
        <RecentSwapsFeed />
      </section>

 <section className="px-4 md:px-12 mt-16 mb-0">
        <Footer />
      </section>



    </main>
  );
}
