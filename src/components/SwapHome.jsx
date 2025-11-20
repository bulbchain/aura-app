"use client";

import SwapHeader from "./SwapHeader";
import SwapPage from "./SwapPage";
import PriceChart from "./PriceChart";
import RecentSwapsFeed from "./RecentSwapsFeed";
import Footer from "./Footer";
import ExplorerEmbed from "./ExplorerEmbed";

import { useState, useEffect } from "react";

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

      {/* ⭐ WRAPPER FOR ALL SECTIONS */}
      <div className="flex flex-col gap-20 px-4 md:px-12">

        {/* ⭐ SWAP MAIN CONTENT */}
        <section className="flex justify-center mt-10">
          <div className="w-full max-w-xl">
            <SwapPage />
          </div>
        </section>

        {/* ⭐ PRICE CHART (Comes BEFORE Swaps Feed) */}
        <section id="price-chart">
          <PriceChart />
        </section>

        {/* ⭐ RECENT SWAPS FEED */}
        <section id="recent-swaps">
          <RecentSwapsFeed />
        </section>

        {/* ⭐ BLOCKCHAIN EXPLORER */}
       <section id="explorer" className="px-4 md:px-12 mt-16 mb-20 min-h-[600px]">
  <ExplorerEmbed />
</section>


        {/* ⭐ FOOTER */}
        <section id="footer" className="mb-10">
          <Footer />
        </section>

      </div>
    </main>
  );
}
