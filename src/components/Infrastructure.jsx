"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"

export default function Infrastructure() {
  const [activeTab, setActiveTab] = useState("individuals")

  const tabs = [
    { id: "individuals", label: "For Individuals" },
    { id: "businesses", label: "For Businesses" },
    { id: "depin", label: "DePIN" },
  ]

  const tabData = {
    individuals: [
      {
        image: "/vault-logo.png",
        title: "Build Your Private Data Vault",
        description:
          "Connect wallets, exchanges, RSS feeds, and social sentiment streams into a single encrypted vault that only you can access. Drag-and-drop widgets let you build dashboards in minutes.",
      },
      {
        image: "/ai-box-logo.png",
        title: "Train Your Own AI",
        description:
          "Spin up a personal Prediction Agent (PA) with just a few clicks. Select indicators, set risk thresholds, and back-test on years of historical data. Perfect for daily trading or long-term portfolio shifts.",
      },
      {
        image: "/connectors-logo.png",
        title: "Monetize Your Edge",
        description:
          "Optionally publish your signals to others and earn $TENIX each time someone subscribes. Keep your raw data private while turning insights into passive income.",
      },
    ],
    businesses: [
      {
        image: "/lock-image.png",
        title: "Enterprise-Grade Security",
        description:
          "Our zero-knowledge infrastructure ensures sensitive data is encrypted end-to-end, meeting institutional compliance standards and maintaining full transparency on-chain.",
      },
      {
        image: "/ai-image.png",
        title: "Collaborative AI Workspaces",
        description:
          "Empower teams to build, test, and deploy AI models collaboratively. Integrate APIs, manage datasets, and visualize insights through real-time dashboards.",
      },
      {
        image: "/wallet-image.png",
        title: "Scalable Infrastructure",
        description:
          "Deploy globally distributed compute nodes with sub-second latency and auto-scaling to handle millions of data points per second — optimized for financial workloads.",
      },
    ],
    depin: [
      {
        image: "/data-source-image.png",
        title: "Trustless Data Sources",
        description:
          "On-chain financial applications rely on trustless, low-latency data streams. Our DePIN network ensures decentralized access to accurate, real-time market feeds.",
      },
      {
        image: "/data-image.png",
        title: "Distributed Data Vaults",
        description:
          "Data Vaults act as decentralized warehouses for financial and sentiment data, allowing smooth cross-chain data flows and verifiable storage integrity.",
      },
      {
        image: "/atom-image.png",
        title: "Compute-as-a-Network",
        description:
          "Harness community compute power for AI inference and analytics. The DePIN layer transforms idle nodes into a globally scalable compute grid.",
      },
    ],
  }

  const activeCards = tabData[activeTab]

  return (
    <section className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ✨ Scroll Animation Container */}
      <motion.main
        className="mx-auto max-w-7xl px-6 py-12 md:py-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* 🔥 Header Section */}
        <div className="text-center max-w-4xl mx-auto py-16 px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime-500/10 px-4 py-2 text-sm font-medium text-lime-400">
            <Star className="h-4 w-4" />
            Features
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            Fast & Scalable Infrastructure
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Designed for trading desks, hedge funds, and fintech platforms that need enterprise-grade AI,
            compliance, and collaboration.
          </p>
        </div>

        {/* 🟢 Tabs */}
        <div className="mb-12 flex gap-4 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border border-lime-500/40 bg-lime-500/10 text-lime-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🪄 Cards with Transition Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {activeCards.map((card, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-lime-500/30 hover:shadow-lg hover:shadow-lime-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="mb-4 h-16 flex items-center justify-center">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </section>
  )
}
