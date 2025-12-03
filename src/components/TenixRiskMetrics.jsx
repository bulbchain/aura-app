"use client";
import { useEffect, useRef, useState } from "react";
import TenixPriceChart from "./TenixPriceChart";

export default function TenixRiskMetrics() {
  const metrics = [
    {
      name: "Market Volatility Index (MVI)",
      value: 72,
      color: "from-red-500 to-orange-400",
      glow: "shadow-red-500/40",
      desc: "Measures real-time market instability"
    },
    {
      name: "Liquidity Pressure Score",
      value: 61,
      color: "from-yellow-400 to-amber-500",
      glow: "shadow-yellow-500/30",
      desc: "Tracks buy/sell liquidity stress"
    },
    {
      name: "Trend Reversal Probability",
      value: 38,
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/30",
      desc: "Estimates probability of trend shift"
    }
  ];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(
    metrics.map(() => 0)
  );

  // ✅ Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ PERFECTLY SYNCED ANIMATION
  useEffect(() => {
    if (!visible) return;

    const startTime = performance.now();
    const duration = 1000; // 1 second animation

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);

      setAnimatedValues(
        metrics.map(metric => Math.round(metric.value * progress))
      );

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [visible]);

return (
  <>
    {/* ✅ RISK METRICS SECTION */}
    <section
      ref={sectionRef}
      className="mt-10 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur"
    >
      <h3 className="text-xl font-semibold mb-2">
        Risk Chart & Market Stability Metrics
      </h3>

      <p className="text-sm text-white/70 mb-6">
        Tenix continuously evaluates market risk using live volatility, liquidity
        pressure, and AI-based trend reversal probability scoring.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border border-white/10 bg-white/5 transition-all duration-500 ${item.glow}`}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <span className="flex items-center gap-1 text-xs text-white/70">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Live
                </span>
            </div>

            <p className="text-xs text-white/60 mb-3">{item.desc}</p>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color}`}
                style={{ width: `${animatedValues[idx]}%` }}
              />
            </div>

            <p className="text-right text-sm font-semibold mt-2">
              {animatedValues[idx]}%
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* ✅ PRICE CHART SECTION (CLEAN SEPARATE BLOCK) */}
    <TenixPriceChart />
  </>
);

}
