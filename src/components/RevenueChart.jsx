import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import gsap from "gsap";

const RevenueChart = () => {
  const [period, setPeriod] = useState("weekly");
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  // ✅ Positive-growth mock data
  const data = {
    weekly: [
      { name: "M", revenue: 2000 },
      { name: "T", revenue: 2400 },
      { name: "W", revenue: 2800 },
      { name: "T", revenue: 3000 },
      { name: "F", revenue: 3200 },
      { name: "S", revenue: 3500 },
      { name: "S", revenue: 3700 },
    ],
    monthly: [
      { name: "Week 1", revenue: 15000 },
      { name: "Week 2", revenue: 18000 },
      { name: "Week 3", revenue: 21000 },
      { name: "Week 4", revenue: 24000 },
    ],
    yearly: [
      { name: "Jan", revenue: 15000 },
      { name: "Feb", revenue: 17000 },
      { name: "Mar", revenue: 19000 },
      { name: "Apr", revenue: 22000 },
      { name: "May", revenue: 25000 },
      { name: "Jun", revenue: 27000 },
      { name: "Jul", revenue: 30000 },
      { name: "Aug", revenue: 32000 },
      { name: "Sep", revenue: 34000 },
      { name: "Oct", revenue: 37000 },
      { name: "Nov", revenue: 39000 },
      { name: "Dec", revenue: 42000 },
    ],
  };

// Calculate total revenue and growth within same dataset
const totalRevenue = data[period].reduce((acc, cur) => acc + cur.revenue, 0);
const dataset = data[period];
const firstValue = dataset[0].revenue;
const lastValue = dataset[dataset.length - 1].revenue;
const growth = (((lastValue - firstValue) / firstValue) * 100).toFixed(2);


  // GSAP heading animation
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.4, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] bg-black px-4 sm:px-6">
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-3"
      >
        Track your finance
      </h1>
      <p
        ref={subheadingRef}
        className="text-white/70 text-sm sm:text-base mb-6 text-center max-w-xl"
      >
        Visualize your income and monitor growth dynamically.
      </p>

      <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-5xl text-white shadow-[0_0_40px_rgba(255,255,255,0.04)] overflow-hidden">
        {/* Glossy border */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 rounded-3xl border border-white/10 before:absolute before:inset-0 before:rounded-3xl before:bg-[linear-gradient(130deg,rgba(255,255,255,0.03)_10%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.03)_90%)] before:animate-[moveGloss_6s_linear_infinite] before:bg-[length:300%_300%]"></div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-sm text-white/70 font-medium tracking-wide">
            Revenue Overview
          </h2>
          <div className="flex gap-2 sm:gap-3">
            {["weekly", "monthly", "yearly"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs sm:text-sm px-4 py-1.5 rounded-full transition-colors ${
                  period === p
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 hover:bg-white/20 text-white/70"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data[period]}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.85)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="revenue"
                radius={[6, 6, 0, 0]}
                fill="url(#barGradient)"
                barSize={24}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-white/60">Total revenue</p>
            <p className="text-2xl sm:text-3xl font-semibold">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm mt-3 sm:mt-0 ${
              growth >= 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {growth >= 0 ? "+" : ""}
            {growth}% growth
          </div>
        </div>

        <style>{`
          @keyframes moveGloss {
            0% { background-position: 100% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 100% 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RevenueChart;
