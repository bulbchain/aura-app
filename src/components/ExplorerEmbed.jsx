"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ExplorerEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full flex justify-center px-4 md:px-0 mt-16"
    >
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
        
        <h2 className="text-xl font-semibold mb-4 text-white/80">
          🔍 Blockchain Explorer (Live)
        </h2>

        {!isLoaded && (
          <div className="w-full text-center text-white/40 pb-4">
            Loading Explorer…
          </div>
        )}

        <iframe
          src="https://explorer.solana.com/?cluster=mainnet"
          className="w-full h-[700px] rounded-xl border border-white/10"
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>
    </motion.section>
  );
}
