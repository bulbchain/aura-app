"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ExplorerEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  // ⭐ Load iframe ONLY when user scrolls near it
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true); // Load iframe NOW
        }
      },
      { rootMargin: "300px" } // load slightly before visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center px-4 md:px-0 mt-16 mb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl bg-white/5 border border-white/10 
                   backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-white/80">
          🔍 Blockchain Explorer (Live)
        </h2>

        {!isLoaded && (
          <div className="w-full text-center text-white/40 pb-4">
            Loading Explorer…
          </div>
        )}

        <div
          className="w-full h-[600px] overflow-hidden rounded-xl border border-white/10 relative"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 pointer-events-none" />
          )}

          {/* ⭐ IFRAME LOADS ONLY WHEN VISIBLE — No scroll jump */}
          {shouldLoad && (
            <iframe
              src="https://explorer.solana.com/?cluster=mainnet"
              className="w-full h-full"
              tabIndex={-1} // no auto-focus
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              onLoad={() => setIsLoaded(true)}
              style={{
                pointerEvents: isLoaded ? "auto" : "none",
              }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}
