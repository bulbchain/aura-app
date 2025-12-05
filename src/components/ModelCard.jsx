"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ModelCard({
  id,
  name,
  winRate,
  totalTrades,
  lastUpdated,
  sparklineData = [],
  description,
  color,
}) {
  const navigate = useNavigate();

  const safeSparkline =
    Array.isArray(sparklineData) && sparklineData.length > 0
      ? sparklineData
      : [{ value: 0 }, { value: 0 }];

  const isPositive =
    safeSparkline[safeSparkline.length - 1].value >
    safeSparkline[0].value;

  const handleClick = () => {
    navigate(`/model/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group"
      onClick={handleClick}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-slate-600 p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/10">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          </div>
          <div
            className="w-10 h-10 rounded-lg opacity-20"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Chart */}
        <div className="h-16 mb-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeSparkline}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-700">
          <div>
            <p className="text-xs text-slate-400 mb-1">Win Rate</p>
            <p className="text-lg font-bold text-green-400">{winRate}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Total Trades</p>
            <p className="text-lg font-bold text-white">{totalTrades}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Performance</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <>
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                  <span className="text-lg font-bold text-green-400">
                    +8.3%
                  </span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                  <span className="text-lg font-bold text-red-400">
                    -2.1%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500">Updated {lastUpdated}</p>
      </div>
    </motion.div>
  );
}
