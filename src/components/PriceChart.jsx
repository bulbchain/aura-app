"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function PriceChart() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load TradingView Script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: "SOLUSD", // you can change to TENIX pair later
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        hide_top_toolbar: false,
        hide_legend: false,
        container_id: "tenix-chart",
        backgroundColor: "rgba(0,0,0,0)",
        gridColor: "rgba(255,255,255,0.1)",
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full mt-10"
    >
      {/* SECTION TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-white text-2xl md:text-3xl font-bold mb-4 text-center"
      >
       “SOL / USD • Market Chart
      </motion.h2>

      {/* GLASS WRAPPER */}
      <div
        ref={containerRef}
        className="
          w-full h-[420px] 
          rounded-2xl 
          p-[2px]
          bg-gradient-to-r from-[#8a00ff40] via-[#ffffff15] to-[#5a00ff40]
          shadow-[0_0_25px_rgba(150,0,255,0.3)]
        "
      >
        <div
          className="
            w-full h-full rounded-2xl 
            bg-black/40 backdrop-blur-xl
            border border-white/10
          "
        >
          {/* TradingView Chart */}
          <div id="tenix-chart" className="w-full h-full rounded-xl"></div>
        </div>
      </div>
    </motion.div>
  );
}
