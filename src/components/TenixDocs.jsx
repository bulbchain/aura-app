import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import React, { useState, useMemo } from 'react';

// Tenix Docs - single-file React component
// Drop this file into your React project (e.g. src/components/TenixDocs.jsx)
// Usage: import TenixDocs from './components/TenixDocs'; then include <TenixDocs /> at route "/docs" or in a Docs page.

// Added: Advanced sections, diagrams, chart components, and technical illustrations
export default function TenixDocs() {
  const pages = useMemo(() => ({
    architecture: {
      title: 'System Architecture',
      content: (
        <>
          <p className="mb-4">The Tenix system architecture is designed as a multi-layer distributed network using the x402 tech stack. It integrates data ingestion, analytics, wallet execution, and on-chain verification.</p>
          <h4 className="mt-3 font-semibold">Diagram: High-Level Architecture</h4>
          <img src="/images/tenix-architecture.png" alt="Tenix Architecture Diagram" className="w-full rounded-xl border border-white/10 mb-4" />
          <ul className="list-disc pl-6">
            <li>Data Layer (Indexers, Aggregators, Oracle Streams)</li>
            <li>Logic Layer (Smart Contracts, Execution Engine, Security Modules)</li>
            <li>Presentation Layer (Dashboard, Pools UI, Wallet Interactions)</li>
          </ul>
        </>
      )
    },
    
    
    overview: {
      title: 'Overview',
      content: (
        <>
          <p className="mb-4">Tenix is your all-in-one crypto command center — built on the advanced <strong>x402</strong> tech stack. Track, manage, compare, send, swap and predict market assets seamlessly in one unified dashboard. It’s not just finance. It’s precision insight.</p>
          <p className="mb-2">This documentation covers Tenix’s architecture, token mechanics, security model, pool design, and launch details. Use the sidebar to navigate; every section includes clear technical notes and user-focused explanations.</p>
        </>
      )
    },

    what: {
      title: 'What is Tenix',
      content: (
        <>
          <p className="mb-4">Tenix is a modular web3 dashboard and infrastructure suite that consolidates trading, portfolio management, analytics, and on-chain utilities into a single product. It connects to multiple chains and wallets, aggregates market data, and exposes composable modules (pools, staking, swaps) for users and partners.</p>
          <ul className="list-disc pl-6">
            <li>Unified portfolio view across chains</li>
            <li>On-chain signal tools and predictive analytics</li>
            <li>Secure wallet integrations and transaction primitives</li>
          </ul>
        </>
      )
    },

    vision: {
      title: 'Vision & Mission',
      content: (
        <>
          <p className="mb-4"><strong>Vision:</strong> Make crypto management intuitive, secure, and insight-driven so professionals and retail users can operate with institutional-grade clarity.</p>
          <p className="mb-4"><strong>Mission:</strong> Build a composable command center that unifies cross-chain data, powerful on-chain tools, and privacy-first operations — enabling smarter decisions and safer flows.</p>
        </>
      )
    },

    core: {
      title: 'Core Technology',
      content: (
        <>
          <p className="mb-2">Tenix runs on the x402 tech stack — a lightweight, modular foundation optimized for latency-sensitive dashboards and cross-chain indexing.</p>
          <h4 className="mt-3 font-semibold">Key components</h4>
          <ul className="list-disc pl-6">
            <li><strong>Indexer & Aggregator:</strong> Real-time block and price feeds with caching and rate limits.</li>
            <li><strong>RPC Layer:</strong> Multi-provider RPC pooling for resiliency and lower latency.</li>
            <li><strong>Edge UI:</strong> React + Tailwind front-end optimized for low-latency updates and component-level hydration.</li>
            <li><strong>Secure Wallet Connectors:</strong> Non-custodial integrations (WalletConnect, injected wallets) with transaction previewing and signing flows.</li>
          </ul>
        </>
      )
    },

    pools: {
      title: 'Tenix Pools',
      content: (
        <>
          <p className="mb-3">Tenix Pools are modular liquidity contracts that can be deployed per-market. The first Tenix pool is designed to provide deep on-chain liquidity while protecting early LPs through staged release and locked reserves.</p>
          <h4 className="mt-2 font-semibold">Design principles</h4>
          <ul className="list-disc pl-6">
            <li>Immutable pool mechanics after launch (where possible)</li>
            <li>Locked liquidity for a minimum vesting window</li>
            <li>Rigorously audited smart contracts</li>
            <li>Transparent pool parameters published on-chain and in the docs</li>
          </ul>
        </>
      )
    },

    token: {
      title: 'Tenix Token',
      content: (
        <>
          <p className="mb-3">The Tenix token is the protocol's native utility token. It is used for governance, staking rewards, fee discounts, and access to premium analytics features.</p>
          <h4 className="mt-2 font-semibold">Primary uses</h4>
          <ul className="list-disc pl-6">
            <li>Governance voting on protocol changes</li>
            <li>Staking to earn rewards and priority access</li>
            <li>Paying reduced fees for swaps and on-platform services</li>
          </ul>
        </>
      )
    },

    tokenomics: {
      title: 'Tokenomics',
      content: (
        <>
          <p className="mb-3">Tenix tokenomics are designed to balance long-term alignment with launch-day liquidity. Below is a recommended structure; adapt numbers to your governance and fundraising needs.</p>
          <h4 className="mt-2 font-semibold">Suggested distribution (example)</h4>
          <ul className="list-disc pl-6">
            <li>Community & Ecosystem: 40% (liquidity mining, grants)</li>
            <li>Team & Advisors: 15% (4 year vesting, 12 month cliff)</li>
            <li>Seed Investors: 10% (vesting schedule)</li>
            <li>Public Launch / Liquidity: 25%</li>
            <li>Reserve / Treasury: 10% (protocol growth)</li>
          </ul>
          <h4 className="mt-3 font-semibold">Anti-dump measures</h4>
          <ul className="list-disc pl-6">
            <li>Locked liquidity for initial period</li>
            <li>Staggered team vesting</li>
            <li>Liquidity incentives for longer-term holders</li>
          </ul>
        </>
      )
    },

    security: {
      title: 'Security Model',
      content: (
        <>
          <p className="mb-3">Security is foundational. Tenix emphasizes non-custodial flows, minimal trusted components, and comprehensive audits.</p>
          <h4 className="mt-2 font-semibold">Security practices</h4>
          <ul className="list-disc pl-6">
            <li>Third-party audits before any public pool launch</li>
            <li>Bug bounty program and responsible disclosure policy</li>
            <li>Admin key minimization and multi-sig governance for critical operations</li>
            <li>On-chain transparency for all treasury and liquidity actions</li>
          </ul>
        </>
      )
    },

    roadmap: {
      title: 'Roadmap',
      content: (
        <>
          <p className="mb-3">A phased roadmap keeps expectations clear and delivers measurable milestones.</p>
          <ol className="list-decimal pl-6">
            <li><strong>Phase 0:</strong> Core stack & indexer deployment, secure wallet connectors.</li>
            <li><strong>Phase 1:</strong> Launch Tenix token and the first Tenix Pool (locked LP).</li>
            <li><strong>Phase 2:</strong> Governance, staking, and analytics module rollout.</li>
            <li><strong>Phase 3:</strong> Cross-chain integrations and partner pools.</li>
            <li><strong>Phase 4:</strong> Marketplace & premium feature set for institutions.</li>
          </ol>
        </>
      )
    },

    how: {
      title: 'How Tenix Works',
      content: (
        <>
          <p className="mb-3">Tenix ingests market and on-chain data, enriches it through deterministic pipelines, and renders insights in the dashboard. Users connect wallets to interact with pools, execute swaps, and participate in governance.</p>
          <h4 className="mt-2 font-semibold">User flow (high level)</h4>
          <ol className="list-decimal pl-6">
            <li>Connect wallet (read-only until transaction signing)</li>
            <li>View aggregated portfolio and signals</li>
            <li>Enter a Tenix Pool or perform swaps</li>
            <li>Stake TENIX tokens for rewards and governance</li>
          </ol>
        </>
      )
    },

    launch: {
      title: 'Launch Info (Pump.fun)',
      content: (
        <>
          <p className="mb-3">If launching on Pump.fun or similar automated market-making launchpads, clarity and transparency are crucial. Tenix prefers a measured launch with locked liquidity and published parameters to avoid speculation-only dynamics.</p>
          <h4 className="mt-2 font-semibold">Launch checklist</h4>
          <ul className="list-disc pl-6">
            <li>Publish tokenomics, vesting and LP lock details</li>
            <li>Audit smart contracts and publish reports</li>
            <li>Announce exact pool parameters and launch time</li>
            <li>Coordinate community channels for fair participation</li>
          </ul>
        </>
      )
    },

    liquidity: {
      title: 'Liquidity Model',
      content: (
        <>
          <p className="mb-3">Tenix uses a hybrid liquidity model to balance depth and protection for early participants.</p>
          <h4 className="mt-2 font-semibold">Key elements</h4>
          <ul className="list-disc pl-6">
            <li>Locked LP paired with stable assets to reduce volatility</li>
            <li>Incentive curves for longer LP commitments</li>
            <li>Buy-back & burn or treasury-managed stabilization strategies (optional)</li>
          </ul>
        </>
      )
    },

    utility: {
      title: 'Utility',
      content: (
        <>
          <p className="mb-3">Token utility drives demand. Tenix focuses on pragmatic utility rather than pure speculation.</p>
          <ul className="list-disc pl-6">
            <li>Access to premium analytics modules</li>
            <li>Lower fees for on-platform swaps</li>
            <li>Priority allocation for new pools and beta features</li>
            <li>Staking rewards and community governance</li>
          </ul>
        </>
      )
    },

    analytics: {
      title: 'Predictive Analytics Module',
      content: (
        <>
          <p className="mb-4">Tenix integrates on-chain analytics with machine-learning powered prediction models. These include volatility predictions, liquidity shifts, whale tracking, and trend detection.</p>
          <h4 className="font-semibold mt-3">Risk Metrics Chart</h4>
          <img src="/images/tenix-risk-chart.png" alt="Risk Chart" className="w-full rounded-xl border border-white/10 mb-4" />
          <ul className="list-disc pl-6">
            <li>Market Volatility Index (MVI)</li>
            <li>Liquidity Pressure Score</li>
            <li>Trend Reversal Probability</li>
          </ul>
        </>
      )
    },

    diagrams: {
      title: 'Flow Diagrams & Execution Paths',
      content: (
        <>
          <p className="mb-4">Below are simplified visual diagrams representing how user actions travel through the Tenix protocol.</p>

          <h4 className="font-semibold">Wallet → Pool Interaction Flow</h4>
          <img src="/images/tenix-flow1.png" alt="Flow Diagram 1" className="w-full rounded-xl border border-white/10 mb-4" />

          <h4 className="font-semibold">Data Processing Pipeline</h4>
          <img src="/images/tenix-flow2.png" alt="Flow Diagram 2" className="w-full rounded-xl border border-white/10 mb-4" />
        </>
      )
    },

    faq: {
      title: 'FAQs',
      content: (
        <>
          <h4 className="font-semibold">Q: Is Tenix custodial?</h4>
          <p className="mb-3">A: No. Tenix is non-custodial — users always sign transactions locally via their wallet of choice.</p>

          <h4 className="font-semibold">Q: How secure are the pools?</h4>
          <p className="mb-3">A: Pools are audited and designed to minimize privileged controls. Admin actions are gated by multi-sig where possible.</p>

          <h4 className="font-semibold">Q: Can I run my own Tenix node?</h4>
          <p className="mb-3">A: Yes — we publish indexer and RPC recommendations for partners who want dedicated nodes for reduced latency.</p>

          <h4 className="font-semibold">Q: How do I participate in launches?</h4>
          <p className="mb-3">A: Launch participation details are published in the Launch Info section; generally you will need a supported wallet and follow the published pool parameters.</p>
        </>
      )
    }
  }), []);

  const [active, setActive] = useState('overview');
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return Object.keys(pages);
    return Object.keys(pages).filter(key => {
      const p = pages[key];
      return (`${p.title} ${String(p.content.props.children).slice(0,200)}`).toLowerCase().includes(q);
    });
  }, [query, pages]);

  
  return (
    <div className="min-h-screen flex bg-black text-white px-4 pt-16 lg:p-6">

      {/* ------------------- MOBILE HEADER ------------------- */}
            {/* SLIM SIDE-EDGE DRAWER HANDLE */}
         <motion.button
            onClick={() => setMobileOpen(true)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: 3 }}
            className="lg:hidden fixed top-24 left-0 z-50
                        h-12 w-6 flex items-center justify-center
                        bg-[rgba(255,255,255,0.06)]
                        border-r border-white/10
                        rounded-r-xl
                        backdrop-blur-md
                        transition-all duration-300
                        hover:bg-white/10"
            >
            <ChevronLeft className="w-4 h-4 text-white/80" />
        </motion.button>






      {/* -------------- MOBILE DRAWER SIDEBAR --------------- */}
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex"
      onClick={() => setMobileOpen(false)}
    >
      {/* Drawer Panel */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        exit={{ x: -280 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="w-72 bg-black border-r border-white/10 p-4 h-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="px-3 py-1 bg-white/10 rounded"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <input
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mb-4 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm"
        />

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {filtered.map((key) => (
            <button
              key={key}
              onClick={() => {
                setActive(key);
                setMobileOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left p-3 rounded-lg transition-all ${
                active === key
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 text-black font-semibold"
                  : "hover:bg-white/5"
              }`}
            >
              {pages[key].title}
            </button>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* -------------------- DESKTOP SIDEBAR -------------------- */}
      <aside
        className="hidden lg:block w-80 mr-6 sticky top-6 h-[85vh] overflow-auto bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-2xl p-4"
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Tenix Docs</h2>
          <p className="text-sm text-white/70">Command center docs — x402 stack</p>
        </div>

        {/* Search */}
        <input
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mb-4 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm"
        />

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {filtered.map((key) => (
            <button
              key={key}
              onClick={() => {
                setActive(key);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left p-3 rounded-lg transition-all ${
                active === key
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 text-black font-semibold"
                  : "hover:bg-white/5"
              }`}
            >
              {pages[key].title}
            </button>
          ))}
        </nav>
      </aside>

      {/* -------------------- MAIN CONTENT -------------------- */}
      <main className="flex-1 max-w-4xl bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-2xl p-6 lg:p-8 mt-16 lg:mt-0">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{pages[active].title}</h1>
          <p className="text-sm text-white/70 mt-1">Documentation • Tenix</p>
        </header>

        <article className="prose prose-invert max-w-none text-sm leading-relaxed">
          {pages[active].content}
        </article>

        <footer className="mt-10 text-xs text-white/60">
          Need changes? Contact the Tenix team.
        </footer>
      </main>
    </div>
  );
}
