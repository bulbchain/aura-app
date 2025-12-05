import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { tradeModels } from "./TradeModels"
import ModelCard from "./ModelCard"
import TenixAIHeader from "./TenixAIHeader"

export default function Dashboard() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* ====================== HEADER ====================== */}
     <TenixAIHeader/>

      {/* Add padding top because header is fixed */}
      <div className="pt-24 p-8">

        {/* PAGE TITLE */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
            >
            <h1
                className="text-4xl font-extrabold mb-2 
                        bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                        text-transparent bg-clip-text"
            >
                Trading Dashboard
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto">
                Monitor and manage your AI-powered trading models in real-time
            </p>
        </motion.div>


        {/* ====================== STATS OVERVIEW ====================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-6 border border-blue-500/20">
            <p className="text-sm text-slate-400 mb-2">Active Models</p>
            <p className="text-3xl font-bold text-white">{tradeModels.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-6 border border-green-500/20">
            <p className="text-sm text-slate-400 mb-2">Avg Win Rate</p>
            <p className="text-3xl font-bold text-green-400">
              {(tradeModels.reduce((a, m) => a + m.winRate, 0) / tradeModels.length).toFixed(1)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-6 border border-purple-500/20">
            <p className="text-sm text-slate-400 mb-2">Total Trades</p>
            <p className="text-3xl font-bold text-purple-400">
              {tradeModels.reduce((a, m) => a + m.totalTrades, 0)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-6 border border-orange-500/20">
            <p className="text-sm text-slate-400 mb-2">Monthly Return</p>
            <p className="text-3xl font-bold text-orange-400">+$12,450</p>
          </div>
        </motion.div>

        {/* ====================== MODELS GRID ====================== */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-white mb-6">Trading Models</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeModels.map((model, i) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <ModelCard {...model} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
