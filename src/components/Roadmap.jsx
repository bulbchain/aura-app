import { motion } from "framer-motion"
import { useRef } from "react"
import { Rocket, Code2, TrendingUp, Users } from "lucide-react"
import "./roadmap.css"

const roadmapSteps = [
  {
    title: "Phase 1 — Foundation & Team Formation",
    description:
      "Assemble the core team, define project vision, finalize tokenomics, and set up the Solana + x402 development environment."
  },
  {
    title: "Phase 2 — Smart Contract & API Integration",
    description:
      "Develop and deploy SPL token contracts, integrate x402 APIs for payments and swaps, and establish secure backend infrastructure."
  },
  {
    title: "Phase 3 — Core dApp Development",
    description:
 "Architect the core application structure, craft dynamic UI elements, and integrate smooth wallet interactions with reliable transaction handling."
  },
  {
    title: "Phase 4 — Secure Transactions & Asset Tracking",
    description:
      "Add encrypted send/receive token modules, enable transaction validation via x402, and display real-time asset data with performance analytics."
  },
  {
    title: "Phase 5 — Token Launch & Liquidity Setup",
    description:
      "Deploy token on Solana mainnet, initialize liquidity pools on DEXs like Raydium or Jupiter, conduct audits, and airdrop to early users."
  },
  {
    title: "Phase 6 — Ecosystem Expansion",
    description:
      "Introduce rewards, referral systems, and API integrations while optimizing backend APIs and enhancing dApp performance."
  },
  {
    title: "Phase 7 — DAO & Governance",
    description:
      "Launch DAO voting system, establish community-driven proposals, and expand into cross-chain integration for broader accessibility."
  },
  {
    title: "Phase 8 — Global Growth & Sustainability",
    description:
      "Scale partnerships, launch marketing campaigns, grow community presence, and ensure long-term ecosystem stability through ongoing audits and updates."
  }
]


export default function Roadmap() {
  const containerRef = useRef(null)

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-12 bg-black/50 overflow-hidden">
            {/* ✨ Bottom Glossy Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Roadmap Journey
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
          Our phased plan for innovation, growth, and community empowerment.
        </p>
      </div>

      {/* Timeline */}
      <div
        ref={containerRef}
        className="relative border-l border-white/10 max-w-4xl mx-auto pl-6 sm:pl-10"
      >
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="mb-10 last:mb-0 relative"
          >
            {/* Timeline Dot */}
            {/* <div className="absolute -left-3 sm:-left-5 top-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm shadow-md">
              {step.icon}
            </div> */}

            {/* Roadmap Card with Moving Glossy Edge */}
            <div className="relative roadmap-card overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 hover:border-white/40 transition-all p-4 sm:p-6 shadow-lg">
              <div className="edge-glow"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Vertical Gradient Line */}
        <div className="absolute left-[0.9rem] sm:left-[1.3rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
      </div>

      {/* ✨ Bottom Glossy Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
}
