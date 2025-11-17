import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { gsap } from "gsap";

export default function CategoryPieChart() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const listRef = useRef(null);

  const COLORS = ["#60A5FA", "#F87171", "#FACC15", "#34D399", "#A78BFA"];

  const chartData = {
    weekly: [
      { name: "RWA", value: 28 },
      { name: "AI", value: 18 },
      { name: "Gaming", value: 22 },
      { name: "Meme", value: 15 },
      { name: "DeFi", value: 17 },
    ],
    monthly: [
      { name: "RWA", value: 30 },
      { name: "AI", value: 20 },
      { name: "Gaming", value: 25 },
      { name: "Meme", value: 10 },
      { name: "DeFi", value: 15 },
    ],
    yearly: [
      { name: "RWA", value: 35 },
      { name: "AI", value: 25 },
      { name: "Gaming", value: 20 },
      { name: "Meme", value: 10 },
      { name: "DeFi", value: 10 },
    ],
  };

  const trends = [
    { name: "RWA", weekly: "+5%", monthly: "+8%", yearly: "+12%" },
    { name: "AI", weekly: "+2%", monthly: "+6%", yearly: "+15%" },
    { name: "Gaming", weekly: "-1%", monthly: "+4%", yearly: "+10%" },
    { name: "Meme", weekly: "-3%", monthly: "+1%", yearly: "+5%" },
    { name: "DeFi", weekly: "+4%", monthly: "+5%", yearly: "+9%" },
  ];

  // 👀 Observe visibility of section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setData(chartData[timeframe]);
          setChartKey((prev) => prev + 1);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [timeframe]);

  // 👇 Run GSAP animations when visible or timeframe changes
  useEffect(() => {
    if (isVisible) {
      setData(chartData[timeframe]);
      setChartKey((prev) => prev + 1);

      // fade in chart
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // fade in each list item with slight stagger
      gsap.fromTo(
        listRef.current.querySelectorAll(".cat-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, [timeframe, isVisible]);

  return (
    <div
      ref={sectionRef}
      className="mt-12 max-w-5xl mx-auto p-8 flex flex-col gap-10 bg-gradient-to-br from-black/80 to-gray-900 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
    >
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
          Your Allocation vs Market Trends
        </h1>
        <p className="text-white/70 text-sm sm:text-base mb-6 text-center max-w-xl mx-auto">
          Analyze how your portfolio stacks up against evolving market
          narratives.
        </p>
      </div>

      {/* Header + Timeframe Buttons */}
      <div className="w-full flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-xl font-semibold text-white">Category Distribution</h3>
        <div className="flex gap-2">
          {["weekly", "monthly", "yearly"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                timeframe === tf
                  ? "bg-white/20 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pie Chart + Category Trends */}
      <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
        {/* Pie Chart */}
        <div ref={chartRef} className="w-full md:w-1/2 h-80 flex items-center justify-center">
          {isVisible && (
            <ResponsiveContainer key={chartKey} width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={70}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(255,255,255,0.2)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(20, 20, 20, 0.95)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                    boxShadow: "0 0 12px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                  }}
                  itemStyle={{
                    color: "#fff",
                    fontWeight: "500",
                  }}
                  labelStyle={{
                    color: "#fff",
                    fontWeight: "600",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Trends */}
        <div ref={listRef} className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold text-white mb-3">
            Category Allocation
          </h3>
          <div className="space-y-3">
            {data.map((entry, index) => (
              <div
                key={entry.name}
                className="cat-item flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-white text-sm font-medium">
                    {entry.name}
                  </span>
                </div>
                <span className="text-white/80 text-sm font-semibold">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Table */}
      <div className="w-full">
        <h4 className="text-lg text-white/90 mb-2 font-semibold">
          Weekly / Monthly / Yearly Trends
        </h4>
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-4 text-sm text-gray-300 bg-white/10 px-4 py-2 font-semibold">
            <div>Category</div>
            <div>Weekly</div>
            <div>Monthly</div>
            <div>Yearly</div>
          </div>
          {trends.map((cat, i) => (
            <div
              key={cat.name}
              className={`grid grid-cols-4 px-4 py-2 text-white/80 ${
                i % 2 ? "bg-white/0" : "bg-white/5"
              }`}
            >
              <div>{cat.name}</div>
              <div
                className={`${
                  cat.weekly.includes("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                {cat.weekly}
              </div>
              <div
                className={`${
                  cat.monthly.includes("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                {cat.monthly}
              </div>
              <div
                className={`${
                  cat.yearly.includes("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                {cat.yearly}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
