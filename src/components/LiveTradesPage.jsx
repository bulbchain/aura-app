"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw } from "lucide-react"
import TenixAIHeader from "./TenixAIHeader" // ✅ Import your header

const tradeModels = ["LSTM Model", "XGBoost Model", "Scalper Bot", "Swing AI", "Sniper V3"]

function generateLiveTrades() {
  return Array.from({ length: 12 }, (_, i) => {
    const modelName = tradeModels[Math.floor(Math.random() * tradeModels.length)]
    const entryPrice = 45000 + Math.random() * 1000
    const currentPrice = entryPrice * (1 + (Math.random() - 0.5) * 0.02)
    const profitLoss = currentPrice - entryPrice
    const profitLossPercent = (profitLoss / entryPrice) * 100

    return {
      id: `live-${i}`,
      modelName,
      direction: Math.random() > 0.5 ? "Buy" : "Sell",
      entryPrice,
      currentPrice,
      profitLoss,
      profitLossPercent,
      timeframe: ["1m", "5m", "15m", "1h"][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toLocaleTimeString(),
    }
  })
}

export default function LiveTradesPage() {
  const [trades, setTrades] = useState(generateLiveTrades())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshTrades = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setTrades(generateLiveTrades())
      setIsRefreshing(false)
    }, 600)
  }

  useEffect(() => {
    const interval = setInterval(refreshTrades, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ✅ TenixAI Header */}
      <TenixAIHeader />

      {/* Page content */}
      <div className="p-8 pt-28">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div >
            <h1
                className="text-4xl font-extrabold mb-2 
                        bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                        text-transparent bg-clip-text"
            >
                All Models
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto">
               Explore detailed performance metrics for each trading model
            </p>
          </div>
          <button
            onClick={refreshTrades}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </motion.div>

        {/* Trades Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {trades.map((trade) => (
              <motion.div
                key={trade.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 hover:border-slate-600 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white">{trade.modelName}</h3>
                    <p className="text-xs text-slate-400 mt-1">{trade.timestamp}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      trade.direction === "Buy"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {trade.direction}
                  </span>
                </div>

                {/* Price Info */}
                <div className="mb-4 pb-4 border-b border-slate-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Entry</span>
                    <span className="text-sm font-mono text-white">${trade.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Current</span>
                    <span className="text-sm font-mono text-white">${trade.currentPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* P/L */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">P/L</p>
                    <p
                      className={`text-lg font-bold font-mono ${
                        trade.profitLoss > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.profitLoss > 0 ? "+" : ""}${trade.profitLoss.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-lg font-bold ${
                        trade.profitLossPercent > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.profitLossPercent > 0 ? "+" : ""}{trade.profitLossPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Timeframe */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {trade.timeframe}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
