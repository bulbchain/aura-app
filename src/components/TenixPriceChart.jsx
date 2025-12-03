"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "10:00", price: 1.12 },
  { time: "10:05", price: 0.96 },
  { time: "10:10", price: 0.78 },
  { time: "10:15", price: 0.55 },
  { time: "10:20", price: 0.38 }, // 🔻 Big dump
  { time: "10:25", price: 0.62 }, // 🔄 Recovery
  { time: "10:30", price: 0.89 },
  { time: "10:35", price: 1.05 },
  { time: "10:40", price: 1.22 }, // 🚀 Pump
  { time: "10:45", price: 1.15 },
  { time: "10:50", price: 1.32 }, // 🚀 Higher high
  { time: "10:55", price: 1.18 },
];


export default function TenixPriceChart() {
  return (
    <section className="mt-10 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
      <h3 className="text-xl font-semibold mb-2">Live Market Price Movement</h3>
      <p className="text-sm text-white/70 mb-6">
        Real-time visualization of asset price fluctuation and momentum trend.
      </p>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                background: "#000",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
