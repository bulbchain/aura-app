"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Diamond, Star } from "lucide-react"

export default function TokenUtility() {
  const features = [
    {
      title: "Exclusive AI Agents Access",
      description:
        "Activate and use prediction agents for various financial markets (crypto, equities, forex) using your $TENIX.",
      src: "/ai-brain.png", // 👈 your image path here
    },
    {
      title: "Real-Time Analytics Feeds",
      description:
        "Access premium data streams from the TENIX Streaming Network (OSN) through fees paid in $TENIX.",
      src: "/radar-signal.png",
    },
    {
      title: "Performance Based Rewards",
      description:
        "Earn $TENIX for high-accuracy models and signals, benchmarked by system performance.",
      src: "/tenix-logo.png",
    },
  ]

  const utilities = [
    "Data Vault Access",
    "Staking Yield",
    "Affiliates & Referrals",
    "Free Discounts",
    "Risk Intelligence Subscriptions",
    "Gated Access",
  ]

  return (
    <section className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ✨ Animated Container */}
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
            $TENIX Token
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            Token Utility
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Unlock the power of decentralized intelligence and premium data through the $TENIX ecosystem.
          </p>
        </div>

        {/* 🪄 Feature Cards */}
        <AnimatePresence>
          <motion.div
            className="grid gap-8 md:grid-cols-3 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-lime-500/30 hover:shadow-lg hover:shadow-lime-500/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Image Instead of Icon */}
                    <div className="mb-8 flex justify-center">
                    <div className="bg-zinc-900 rounded-2xl p-8 w-32 h-32 flex items-center justify-center shadow-lg shadow-lime-500/10">
                        <img
                        src={feature.src}
                        alt={feature.title}
                        className="w-24 h-24 object-contain"
                        />
                    </div>
                    </div>


                <h3 className="text-lg font-semibold text-center text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-center leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 💎 Utility Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {utilities.map((utility, idx) => (
            <motion.button
              key={idx}
              className="flex items-center gap-2 bg-background/40 border border-zinc-800 rounded-full px-6 py-3 hover:border-lime-500/40 transition group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Diamond className="w-4 h-4 text-lime-400 fill-lime-400" />
              <span className="text-white font-medium">{utility}</span>
            </motion.button>
          ))}
        </div>
      </motion.main>
    </section>
  )
}
