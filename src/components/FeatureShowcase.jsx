"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureShowcase() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section className="w-full bg-background text-foreground overflow-hidden">
      {/* ✨ Header */}
      <motion.div
        className="text-center max-w-4xl mx-auto py-16 px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime-500/10 px-4 py-2 text-sm font-medium text-lime-400">
          <Star className="h-4 w-4" />
          Features
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
          All Agents Built to Think Like Degen Traders
        </h1>

        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Built for investors and institutions, it delivers real-time market insights.
          AI-driven intelligence helps unlock accurate forecasts and smarter decisions.
        </p>
      </motion.div>

      {/* ✨ Features Grid */}
      <motion.div
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 🔹 Large Feature Card */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-lime-500/30 hover:shadow-lg hover:shadow-lime-500/10"
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-block bg-lime-500/10 px-4 py-2 rounded-lg">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    Analytics
                  </span>
                </div>
                <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
                  AI Powered Predictive Analytics
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tenix agents deliver real-time, AI-driven insights using models like neural networks,
                  ARIMA, and linear regression to generate accurate market forecasts and risk assessments.
                </p>
              </div>

              <div className="relative flex items-center justify-center h-64 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 via-transparent to-lime-500/10 rounded-full blur-3xl" />
                <motion.img
                  src="/tenix-stratergy.png"
                  alt="AI Analytics"
                  className="relative h-full w-auto max-w-xs object-contain rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>

          {/* 🔹 DePIN Card */}
          <motion.div
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-lime-500/30 hover:shadow-lg hover:shadow-lime-500/10"
          >
            <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="order-2 sm:order-1">
                <div className="relative h-48 sm:h-56 flex items-center justify-center">
                  <motion.img
                    src="/depin-soro.png"
                    alt="DePIN"
                    className="h-full w-auto object-contain rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              <div className="order-1 sm:order-2">
                <div className="mb-4 inline-block bg-lime-500/10 px-4 py-2 rounded-lg">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    DePIN
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold">
                  Trustless Data Sources and Distributed Network
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  On-chain financial applications require trustless sources & low latency data.
                  OSN, our DePIN network & Data Vaults act as a massive data warehouse for smooth data streaming.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 🔹 Strategy Card */}
          <motion.div
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-lime-500/30 hover:shadow-lg hover:shadow-lime-500/10"
          >
            <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="relative h-48 sm:h-56 flex items-center justify-center">
                <motion.img
                  src="/globe-tenix.png"
                  alt="Strategy"
                  className="h-full w-auto object-contain rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>

              <div>
                <div className="mb-4 inline-block bg-lime-500/10 px-4 py-2 rounded-lg">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    Strategy
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold">Financial Market Modelling</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Research & analyze trends, react quickly & capitalize on real-time insights.
                  Devise your strategies to stay ahead of competition.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
