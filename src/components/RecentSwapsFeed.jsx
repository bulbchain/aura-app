"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";

const swapData = [
  // SOL → TENIX
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "0.12", amountOut: "28.44", time: "2 min ago" },
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "0.45", amountOut: "106.80", time: "5 min ago" },
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "1.03", amountOut: "244.20", time: "9 min ago" },
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "0.74", amountOut: "175.50", time: "14 min ago" },

  // TENIX → SOL
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "320", amountOut: "1.33", time: "18 min ago" },
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "150", amountOut: "0.62", time: "22 min ago" },
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "980", amountOut: "4.13", time: "29 min ago" },
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "460", amountOut: "1.92", time: "33 min ago" },

  // SOL → TENIX
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "0.29", amountOut: "68.55", time: "40 min ago" },
  { tokenIn: "SOL", tokenOut: "TENIX", amountIn: "0.88", amountOut: "208.80", time: "47 min ago" },

  // TENIX → SOL
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "720", amountOut: "3.00", time: "51 min ago" },
  { tokenIn: "TENIX", tokenOut: "SOL", amountIn: "260", amountOut: "1.09", time: "57 min ago" },
];


export default function RecentSwapsFeed() {
  const [index, setIndex] = useState(0);

  // Change batch every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 4) % swapData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleSwaps = swapData.slice(index, index + 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mt-10 p-6 rounded-2xl 
                 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white tracking-wide flex items-center gap-2">
        <ArrowRightLeft className="text-purple-400" size={24} />
        Recent Swaps
      </h2>

      {/* FIX: Absolute stacked container (prevents height jumps) */}
      <div className="relative h-[410px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full flex flex-col gap-4"
          >
            {visibleSwaps.map((swap, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 rounded-xl 
                       bg-white/5 border border-white/10 hover:bg-white/10 
                       transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-300">{swap.time}</span>
                  <span className="text-white font-medium">
                    {swap.tokenIn} → {swap.tokenOut}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-gray-300 text-sm">
                    {swap.amountIn} {swap.tokenIn}
                  </span>
                  <br />
                  <span className="text-purple-400 text-lg font-semibold">
                    {swap.amountOut} {swap.tokenOut}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
