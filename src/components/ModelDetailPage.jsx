import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import TenixDocsHeader from "./TenixDocsHeader";  // ✅ ADD THIS
import { TradesTable } from "./TradesTable";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { generateModelDetail } from "./TradeModels";
import { PerformanceStats } from "./PerformanceStats";

export default function ModelDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const model = generateModelDetail(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* ✅ Global Header */}
      <TenixDocsHeader />

      {/* Add margin-top so page is not hidden under fixed header */}
      <div className="p-8 mt-[var(--header-height)]">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2
                            rounded-lg text-slate-300 bg-gradient-to-r from-slate-700/40 to-slate-600/40
                            hover:from-slate-600 hover:to-slate-500
                            hover:text-white transition-all duration-300 shadow-lg shadow-slate-900/20"
                >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>


          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg opacity-30"
              style={{ backgroundColor: model.color }}
            />
            <div>
              <h1 className="text-4xl font-bold text-white">{model.name}</h1>
              <p className="text-slate-400 mt-1">{model.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Performance Metrics</h2>
          <PerformanceStats {...model} />
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          {/* Equity Curve */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Equity Curve</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={model.equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={model.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Daily P/L */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Daily P/L</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={model.dailyPnL}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="profit" fill={model.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Win vs Loss */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Win vs Loss</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Wins", value: model.winLossRatio.wins },
                    { name: "Losses", value: model.winLossRatio.losses },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Timeframe Dist */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Timeframe Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { timeframe: "1m", trades: 245 },
                  { timeframe: "5m", trades: 189 },
                  { timeframe: "15m", trades: 156 },
                  { timeframe: "1h", trades: 98 },
                  { timeframe: "4h", trades: 45 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="trades" fill={model.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trades Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Trades</h2>
          <TradesTable trades={model.trades} />
        </motion.div>
      </div>
    </div>
  );
}
