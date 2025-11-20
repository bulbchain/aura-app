"use client";

import SwapHeader from "./SwapHeader";
import SwapPage from "./SwapPage"; 
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

      {/* ⭐ SWAP MAIN CONTENT */}
      <section className="flex justify-center px-4 md:px-0 mt-10 mb-20">
        <div className="w-full max-w-xl">
          <SwapPage />
        </div>
      </section>

      {/* ⭐ Footer or Extra Sections (Optional) */}
      {/* <div className="text-center text-white/40 py-10">
        Powered by Tenix Protocol
      </div> */}
    </main>
  );
}
