import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import React, { useState, useMemo } from 'react';
import TenixRiskMetrics from "./TenixRiskMetrics";

// Tenix Docs - single-file React component
// Drop this file into your React project (e.g. src/components/TenixDocs.jsx)
// Usage: import TenixDocs from './components/TenixDocs'; then include <TenixDocs /> at route "/docs" or in a Docs page.

// Added: Advanced sections, diagrams, chart components, and technical illustrations
export default function TenixDocs() {
  const pages = useMemo(() => ({

       overview: { 
  title: 'Overview',
  content: (
    <>
      <p className="mb-4">
        Tenix is your all-in-one crypto command center — built on the advanced <strong>x402</strong> tech stack.
        Track, manage, compare, send, swap and predict market assets seamlessly in one unified dashboard.
        It’s not just finance. It’s precision insight.
      </p>

      <p className="mb-6">
        This documentation covers Tenix’s architecture, token mechanics, security model, pool design,
        and launch details. Use the sidebar to navigate; every section includes clear technical notes
        and user-focused explanations.
      </p>

       {/* ✅ x402 PAYMENTS TECHNICAL FLOW */}
      <h2 className="text-xl font-bold mt-10 mb-4">
        x402 Payments — Before & After
      </h2>

      {/* ✅ x402 BEFORE/AFTER IMAGE */}
      <div className="my-10 flex justify-center">
        <img
          src={"/x402-payments-before-after.jpg"}
          alt="x402 Payments Before and After"
          className="max-w-5xl w-full rounded-xl border border-cyan-400/30 shadow-[0_0_40px_rgba(56,189,248,0.25)]"
        />
      </div>

     

      <h3 className="text-lg font-semibold mt-4 mb-2">
        Before x402 (Traditional API Payments)
      </h3>
      <p className="mb-3">
        In the traditional model, AI agents cannot pay for APIs directly. A <strong>human operator</strong> must manage
        billing through <strong>developer platforms</strong>, credit cards, API keys, and third-party payment processors.
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1 opacity-90">
        <li>Human manages API keys and billing manually</li>
        <li>Credit cards and third-party payment systems handle fees</li>
        <li>Developers receive delayed, periodic payouts</li>
        <li>AI agents are blocked from autonomous economic action</li>
        <li>High friction, custody risk, and centralized failure points</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        After x402 (On-Chain Micropayments)
      </h3>
      <p className="mb-3">
        With <strong>x402</strong>, the payment layer is embedded directly into the API request. AI agents now send a
        <strong> signed request + on-chain USDC authorization</strong> in one atomic action.
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1 opacity-90">
        <li>AI agents pay APIs directly without human involvement</li>
        <li>Each request includes cryptographic payment authorization</li>
        <li>Instant settlement in stablecoins (e.g., $0.01 USDC per call)</li>
        <li>No third-party payment processors required</li>
        <li>Fully autonomous, trust-minimized machine economy</li>
      </ul>

      <p className="mt-4 text-base opacity-95">
        This shift transforms APIs into <strong>permissionless economic endpoints</strong>, enabling true
        machine-to-machine commerce — and <strong>Tenix is built natively on top of this x402 execution layer</strong>.
      </p>
    </>
  )
},



   what: {
  title: 'What is Tenix',
  content: (
    <>
      <p className="mb-4 text-white/90 leading-relaxed">
        <strong>Tenix</strong> is a next-generation <strong>modular Web3 command center</strong> built for traders, builders, 
        and autonomous agents. It unifies <strong>trading, portfolio management, on-chain analytics, and execution tools
          </strong> into a single high-performance platform powered by the <strong>x402 execution layer</strong>.
      </p>

      <p className="mb-4 text-white/70">
        Designed as both a <strong>user dashboard</strong> and a <strong>developer infrastructure layer</strong>, 
        Tenix connects seamlessly to multiple chains, wallets, and liquidity sources while exposing 
        composable financial primitives such as <strong>pools, staking, swaps, and automated strategies</strong>.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-sm">
        <li className="p-3 rounded-xl border border-white/10 bg-white/5">
          🌐 <strong>Unified Multi-Chain Portfolio</strong>
          <div className="text-white/60 mt-1">
            Track assets, positions, and performance across all connected networks in real time.
          </div>
        </li>

        <li className="p-3 rounded-xl border border-white/10 bg-white/5">
          📊 <strong>On-Chain Signals & Predictive AI</strong>
          <div className="text-white/60 mt-1">
            Volatility metrics, whale tracking, liquidity pressure & trend reversal probabilities.
          </div>
        </li>

        <li className="p-3 rounded-xl border border-white/10 bg-white/5">
          🔐 <strong>Secure Wallet & Execution Layer</strong>
          <div className="text-white/60 mt-1">
            Non-custodial wallet control, on-chain verification, and atomic transaction execution.
          </div>
        </li>
      </ul>

      <p className="mt-5 text-white/70 text-sm">
        Tenix is not just a dashboard — it is an <strong>intelligent financial operating system</strong> 
        designed for the emerging <strong>machine-to-machine and autonomous finance economy</strong>.
      </p>
    </>
  )
},

    architecture: {
      title: 'System Architecture',
      content: (
        <>
          <p className="mb-4">The Tenix system architecture is designed as a multi-layer distributed network using the x402 tech stack. It integrates data ingestion, analytics, wallet execution, and on-chain verification.</p>
          <h4 className="mt-3 font-semibold">Diagram: High-Level Architecture</h4>
          <img src="/tenix-x402-protocol-flow.png" alt="Tenix Architecture Diagram" className="w-full rounded-xl border border-white/10 mb-4" />
          <ul className="list-disc pl-6">
            <li>Data Layer (Indexers, Aggregators, Oracle Streams)</li>
            <li>Logic Layer (Smart Contracts, Execution Engine, Security Modules)</li>
            <li>Presentation Layer (Dashboard, Pools UI, Wallet Interactions)</li>
          </ul>
        </>
      )
    },

    analytics: {
  title: 'Predictive Analytics Module',
  content: (
    <>
      <p className="mb-4">
        Tenix integrates on-chain analytics with machine-learning powered prediction models.
        These include volatility predictions, liquidity shifts, whale tracking, and real-time
        trend detection.
      </p>

      <h4 className="font-semibold mt-4 mb-2">Risk Metrics Chart</h4>
      <p className="text-sm text-white/70 mb-4">
        The risk engine continuously evaluates market behavior using real-time volatility,
        liquidity pressure, and probabilistic trend-reversal scoring.
      </p>

      {/* ✅ LIVE RISK METRICS COMPONENT (REPLACES IMAGE) */}
      <TenixRiskMetrics />

      <ul className="list-disc pl-6 mt-5 space-y-1">
        <li><strong>Market Volatility Index (MVI)</strong> — measures systemic market instability</li>
        <li><strong>Liquidity Pressure Score</strong> — tracks buy/sell depth stress</li>
        <li><strong>Trend Reversal Probability</strong> — predicts regime shifts using on-chain signals</li>
      </ul>
    </>
  )
},


    diagrams: {
  title: 'Flow Diagrams & Execution Paths',
  content: (
    <>
      <p className="mb-4">
        Below are system-level execution diagrams showing how transactions, payments,
        and data move through the Tenix protocol and x402 payment layer.
      </p>

      {/* --- 1. WALLET → MERCHANT → SOLANA FLOW --- */}
      <h4 className="font-semibold mt-4 mb-2">
        Customer → Wallet → Merchant → Solana Transaction Flow
      </h4>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>Customer scans the merchant QR code</li>
        <li>Wallet sends POST request with wallet public key</li>
        <li>Merchant returns a serialized transaction</li>
        <li>User reviews and approves inside the wallet</li>
        <li>Wallet signs and submits transaction to Solana</li>
        <li>Blockchain confirms final settlement</li>
      </ul>

        {/* --- 2. X402 HTTP PAYMENT FLOW --- */}
      <h4 className="font-semibold mt-6 mb-2">
        x402 HTTP Micropayment Execution Flow
      </h4>

      <img
        src="/solana-to-pool-interaction.png"
        alt="Customer to Wallet to Merchant to Solana Flow"
        className="w-full rounded-xl border border-white/10 mb-8"
      />

    
      <p className="mb-3">
        This diagram shows how <strong>x402 embeds payments directly inside HTTP requests</strong>,
        enabling autonomous AI and agent-based commerce without third-party payment processors.
      </p>

      <img
        src="/x402-payment-flow-tenix.png"
        alt="HTTP 402 Payment Flow"
        className="w-full rounded-xl border border-white/10 mb-8"
      />

      {/* --- 3. DATA PROCESSING PIPELINE --- */}
      <h4 className="font-semibold mt-6 mb-2">
        Data Processing Pipeline
      </h4>
      <p className="mb-3">
        This pipeline represents how raw blockchain, wallet, and market signals are ingested,
        processed, indexed, and served through Tenix’s analytics and execution layers.
      </p>

      <img
        src="/datapipelines.png"
        alt="Data Processing Pipeline"
        className="w-full rounded-xl border border-white/10 mb-4"
      />
    </>
  )
},
    

vision: {
  title: 'Vision & Mission',
  content: (
    <>
      <p className="mb-4">
        <strong>Vision:</strong> To become the world’s most trusted and intelligent
        Web3 financial operating system — where users, developers, and autonomous
        agents interact with crypto markets through a single, secure, and insight-driven command layer.
      </p>

      <p className="mb-4">
        <strong>Mission:</strong> To build a composable, privacy-first, and cross-chain
        command center that unifies real-time market data, predictive analytics,
        wallet execution, and on-chain verification — empowering smarter decisions
        and safer capital flows.
      </p>

      <hr className="my-5 border-white/10" />

      <h4 className="font-semibold mb-2">Core Objectives</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Abstract blockchain complexity into simple, high-performance user experiences</li>
        <li>Enable real-time, data-driven decision making through on-chain analytics</li>
        <li>Deliver non-custodial, privacy-first transaction execution</li>
        <li>Support both human traders and autonomous AI agents natively</li>
        <li>Standardize cross-chain portfolio and execution infrastructure</li>
      </ul>

      <h4 className="font-semibold mb-2">What We Are Building Toward</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>A unified layer for trading, staking, liquidity, and strategy execution</li>
        <li>On-chain financial intelligence accessible to retail and institutions alike</li>
        <li>Machine-to-machine economic systems powered by autonomous execution</li>
        <li>Composable financial primitives for developers and protocol partners</li>
      </ul>

      <h4 className="font-semibold mb-2">Our Long-Term Commitment</h4>
      <p className="mb-3 text-white/70">
        Tenix is committed to open, composable, and verifiable financial infrastructure.
        We believe the future of finance is autonomous, interoperable, and trust-minimized —
        and Tenix is being built as the execution layer for that future.
      </p>

      <p className="text-white/70 text-sm">
        Our goal is not just to build tools — but to establish a new standard for how
        crypto infrastructure is designed, accessed, and trusted at global scale.
      </p>
    </>
  )
},


core: {
  title: 'Core Technology',
  content: (
    <>
      <p className="mb-3">
        Tenix runs on the <strong>x402 modular tech stack</strong> — a high-performance,
        low-latency infrastructure designed for real-time trading dashboards,
        cross-chain indexing, and on-chain execution environments.
      </p>

      <p className="mb-4 text-white/70">
        The system is architected as a collection of independent, composable services
        that scale horizontally and operate with fault isolation for maximum reliability.
      </p>

      <h4 className="mt-4 font-semibold">Core Infrastructure Layers</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>
          <strong>Indexer & Aggregator:</strong> Real-time block ingestion, transaction
          decoding, and price normalization with caching, throttling, and adaptive rate limits.
        </li>
        <li>
          <strong>RPC Abstraction Layer:</strong> Multi-provider RPC pooling with automatic
          failover, latency routing, and health-based switching.
        </li>
        <li>
          <strong>Edge UI Runtime:</strong> React + Tailwind frontend optimized for
          low-latency updates, partial hydration, and GPU-accelerated visuals.
        </li>
        <li>
          <strong>Secure Wallet Connectors:</strong> Non-custodial integrations with
          WalletConnect and injected wallets, including human-readable transaction previews
          and deterministic signing flows.
        </li>
      </ul>

      <h4 className="mt-4 font-semibold">Data & Intelligence Layer</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Streaming market data pipelines with millisecond refresh rates</li>
        <li>Volatility, liquidity pressure, and trend-reversal signal processors</li>
        <li>On-chain behavioral pattern detection and anomaly scoring</li>
        <li>Historical data warehousing for long-range strategy backtesting</li>
      </ul>

      <h4 className="mt-4 font-semibold">Security & Reliability</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Strict non-custodial architecture with zero private key storage</li>
        <li>End-to-end encrypted wallet sessions and provider communications</li>
        <li>Deterministic transaction simulation before broadcast</li>
        <li>Permission-scoped API access for third-party modules</li>
      </ul>

      <h4 className="mt-4 font-semibold">Execution & Scalability</h4>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-white/80">
        <li>Parallel transaction pipelines for multi-wallet execution</li>
        <li>Queue-based load balancing for burst traffic</li>
        <li>Horizontal scaling for indexers and signal processors</li>
        <li>Edge caching for ultra-fast dashboard response times</li>
      </ul>

      <p className="text-white/70 text-sm">
        This architecture allows Tenix to operate as both a <strong>user-facing trading
        interface</strong> and a <strong>machine-native financial execution layer</strong>,
        ready to support autonomous agents, high-frequency data consumers,
        and institutional-grade strategy engines.
      </p>
    </>
  )
},


   pools: {
  title: 'Tenix Pools',
  content: (
    <>
      <p className="mb-3">
        Tenix Pools are <strong>modular, permissionless liquidity contracts</strong>
        deployed per market and strategy type. Each pool is designed to provide
        deep on-chain liquidity while protecting early LPs through staged release,
        locked reserves, and dynamic incentive balancing.
      </p>

      <p className="mb-4 text-white/70">
        The first Tenix pool introduces a controlled liquidity framework that
        reduces early volatility, mitigates predatory MEV behavior, and ensures
        fair price discovery during initial market formation.
      </p>

      <h4 className="mt-3 font-semibold">Design Principles</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Immutable pool mechanics after launch (where possible)</li>
        <li>Locked liquidity with configurable minimum vesting windows</li>
        <li>Rigorously audited smart contracts and open-source verification</li>
        <li>Transparent pool parameters published on-chain and in the docs</li>
        <li>Predictable emission schedules with time-based unlock curves</li>
      </ul>

      <h4 className="mt-3 font-semibold">Liquidity Protection Mechanisms</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Anti-sniping protection during the first liquidity epochs</li>
        <li>Dynamic fee curves that adjust during high-volatility events</li>
        <li>Soft circuit breakers for abnormal trade volume spikes</li>
        <li>MEV-resistant swap routing and execution guards</li>
      </ul>

      <h4 className="mt-3 font-semibold">LP Incentives & Yield Design</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Time-weighted reward emissions to discourage mercenary liquidity</li>
        <li>Boosted yields for early long-term liquidity providers</li>
        <li>Protocol fee-sharing with sustainability thresholds</li>
        <li>Auto-compounded reward vaults (optional opt-in)</li>
      </ul>

      <h4 className="mt-3 font-semibold">Governance & Control</h4>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-white/80">
        <li>Community governance over new pool deployments</li>
        <li>On-chain voting for fee structure and incentive tuning</li>
        <li>Emergency pause rights via multi-signature safety council</li>
        <li>Upgradeable modules limited strictly to non-custodial components</li>
      </ul>

      <p className="text-white/70 text-sm">
        Tenix Pools form the <strong>backbone of on-chain liquidity</strong> inside
        the Tenix ecosystem, enabling efficient swaps, stable price discovery,
        sustainable yield generation, and institutional-grade liquidity control.
      </p>
    </>
  )
},


token: {
  title: 'Tenix Token',
  content: (
    <>
      <p className="mb-3">
        The Tenix token is the <strong>native utility and governance asset</strong>
        of the Tenix protocol. It powers economic incentives, secures the
        ecosystem through staking, governs protocol evolution, and unlocks
        institutional-grade analytics across the Tenix platform.
      </p>

      <p className="mb-4 text-white/70">
        Every major system in Tenix — trading, liquidity, analytics, governance,
        and protocol revenue — is directly or indirectly aligned through the
        Tenix token to create long-term sustainable value.
      </p>

      <h4 className="mt-3 font-semibold">Primary Utility Functions</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Governance voting on protocol upgrades, emissions, and pool launches</li>
        <li>Staking to earn protocol rewards and long-term yield</li>
        <li>Fee discounts across swaps, pools, analytics, and automation tools</li>
        <li>Access to premium AI analytics, risk scoring, and signal layers</li>
        <li>Collateral asset for future structured products and vaults</li>
      </ul>

      <h4 className="mt-3 font-semibold">Staking & Security Model</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Time-locked staking tiers with boosted rewards for long-term holders</li>
        <li>Slashing conditions for malicious governance actions (future phase)</li>
        <li>Validator and analytics oracle bonding (Phase III expansion)</li>
        <li>Auto-compounding single-sided staking vaults</li>
      </ul>

      <h4 className="mt-3 font-semibold">Governance Mechanics</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>On-chain proposal creation and execution</li>
        <li>Quadratic and delegated voting support</li>
        <li>Treasury spend approvals and ecosystem grants</li>
        <li>Emergency safety votes governed by token-weighted quorum</li>
      </ul>

      <h4 className="mt-3 font-semibold">Fee Flow & Value Capture</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Platform trading fees partially routed to stakers</li>
        <li>Subscription analytics fees settled in Tenix tokens</li>
        <li>Protocol-owned liquidity accumulation</li>
        <li>Buyback and burn cycles funded by revenue surplus</li>
      </ul>

      <h4 className="mt-3 font-semibold">Supply Control & Emissions</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Fixed maximum token supply</li>
        <li>Time-based emission decay for staking rewards</li>
        <li>Cliff + linear unlock schedules for team and ecosystem allocations</li>
        <li>On-chain transparency for all vesting contracts</li>
      </ul>

      <h4 className="mt-3 font-semibold">Cross-Chain Utility</h4>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-white/80">
        <li>Multi-chain bridging with canonical supply tracking</li>
        <li>Unified governance across supported networks</li>
        <li>Cross-chain fee settlement</li>
        <li>Interoperable staking rewards across ecosystems</li>
      </ul>

      <p className="text-white/70 text-sm">
        The Tenix Token is engineered not as a speculative asset, but as a
        <strong>productive economic engine</strong> that aligns protocol users,
        liquidity providers, developers, and long-term governors under a single,
        transparent incentive framework.
      </p>
    </>
  )
},


tokenomics: {
  title: 'Tokenomics',
  content: (
    <>
      <p className="mb-3">
        Tenix tokenomics are engineered to align long-term protocol growth with
        sustainable incentives for users, builders, liquidity providers, and
        governors. The economic design prioritizes <strong>low launch pressure,
        deep liquidity, and long-term value compounding</strong>.
      </p>

      <p className="mb-4 text-white/70">
        The structure below represents a balanced, security-first distribution
        model optimized for both early traction and long-term decentralization.
        Final allocations are configurable through governance.
      </p>

      <h4 className="mt-3 font-semibold">Suggested Distribution (Example)</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li><strong>Community & Ecosystem:</strong> 40% — liquidity mining, grants, growth incentives</li>
        <li><strong>Team & Advisors:</strong> 15% — 4-year vesting, 12-month cliff</li>
        <li><strong>Seed & Strategic Investors:</strong> 10% — linear vesting schedule</li>
        <li><strong>Public Launch & Liquidity:</strong> 25% — DEX + market making depth</li>
        <li><strong>Reserve / Treasury:</strong> 10% — protocol runway & emergency buffer</li>
      </ul>

      <h4 className="mt-3 font-semibold">Emission & Reward Schedule</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Staking rewards follow a time-based emission decay curve</li>
        <li>Early liquidity providers receive boosted emissions</li>
        <li>Long-term stakers benefit from multiplier-based yield boosts</li>
        <li>Governance can dynamically adjust emission rates</li>
      </ul>

      <h4 className="mt-3 font-semibold">Liquidity Design</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Locked protocol-owned liquidity for price stability</li>
        <li>Dynamic LP incentives based on volume and volatility</li>
        <li>Gradual liquidity release to avoid sudden supply shocks</li>
        <li>Multi-pool liquidity routing with automated rebalancing</li>
      </ul>

      <h4 className="mt-3 font-semibold">Anti-Dump & Market Stability Measures</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Locked launch liquidity for the initial stabilization window</li>
        <li>Staggered team and investor vesting contracts</li>
        <li>Sell-pressure dampening via staking incentives</li>
        <li>Protocol buyback and burn during high revenue cycles</li>
        <li>On-chain transparency for all unlock schedules</li>
      </ul>

      <h4 className="mt-3 font-semibold">Treasury & Runway Strategy</h4>
      <ul className="list-disc pl-6 mb-5 space-y-1 text-white/80">
        <li>Treasury assets diversified across stablecoins and blue-chip assets</li>
        <li>Non-inflationary funding for audits, operations, and core R&D</li>
        <li>Ecosystem grants for developers and partner protocols</li>
        <li>Emergency risk buffer controlled via governance quorum</li>
      </ul>

      <h4 className="mt-3 font-semibold">Long-Term Value Capture</h4>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-white/80">
        <li>Trading and analytics fees routed to token stakers</li>
        <li>Protocol-owned liquidity accumulation</li>
        <li>Revenue-backed buyback programs</li>
        <li>Deflationary pressure through supply sinks</li>
      </ul>

      <p className="text-white/70 text-sm">
        Tenix tokenomics are designed to transform the token from a speculative
        asset into a <strong>productive, revenue-linked digital commodity</strong>
        that compounds alongside platform adoption.
      </p>
    </>
  )
},


 security: {
  title: 'Security Model',
  content: (
    <>
      <p className="mb-3">
        Security is foundational. Tenix emphasizes non-custodial flows, minimal trusted components, and comprehensive audits.
      </p>

      <h4 className="mt-2 font-semibold">Security Practices</h4>
      <ul className="list-disc pl-6">
        <li>Third-party audits before any public pool launch</li>
        <li>Bug bounty program and responsible disclosure policy</li>
        <li>Admin key minimization and multi-sig governance for critical operations</li>
        <li>On-chain transparency for all treasury and liquidity actions</li>
      </ul>

      <h4 className="mt-4 font-semibold">Encryption & Data Privacy</h4>
      <p className="mb-3">
        All sensitive data is encrypted both in transit and at rest. Tenix respects user privacy and does not store unnecessary personal information.
      </p>

      <h4 className="mt-4 font-semibold">Monitoring & Threat Detection</h4>
      <p className="mb-3">
        Continuous monitoring of smart contract activity and network behavior ensures early detection of anomalies or suspicious activity. Automated alerts are triggered for any potential threats.
      </p>

      <h4 className="mt-4 font-semibold">Incident Response</h4>
      <p className="mb-3">
        Tenix has a well-defined incident response plan to quickly mitigate any security breaches. The team works closely with auditors and the community to ensure transparency and fast resolution.
      </p>

      <h4 className="mt-4 font-semibold">Community Involvement</h4>
      <p className="mb-3">
        Security is a shared responsibility. Tenix encourages the community to participate in audits, report vulnerabilities, and provide feedback to strengthen the platform continuously.
      </p>
    </>
  )
},



how: {
  title: 'How Tenix Works',
  content: (
    <>
      <p className="mb-3">
        Tenix aggregates market and on-chain data, enriches it through deterministic pipelines, and delivers actionable insights via a user-friendly dashboard. Users interact seamlessly with pools, execute swaps, and actively participate in governance by connecting their wallets.
      </p>

      <h4 className="mt-2 font-semibold">Data Flow & Processing</h4>
      <p className="mb-3">
        1. Data ingestion from multiple sources ensures a comprehensive view of the market.<br />
        2. Deterministic pipelines clean, normalize, and enrich data for accuracy and reliability.<br />
        3. Insights are visualized in real-time on the dashboard, allowing users to make informed decisions.
      </p>

      <h4 className="mt-4 font-semibold">User Flow (High-Level)</h4>
      <ol className="list-decimal pl-6 mb-3">
        <li>Connect wallet (read-only access until transaction signing)</li>
        <li>Explore aggregated portfolio, analytics, and market signals</li>
        <li>Enter a Tenix Pool, perform swaps, or participate in liquidity provision</li>
        <li>Stake TENIX tokens for governance voting, rewards, and incentives</li>
        <li>Track transaction history and pool performance securely on-chain</li>
      </ol>

      <h4 className="mt-4 font-semibold">Governance & Rewards</h4>
      <p className="mb-3">
        Users holding TENIX tokens can vote on protocol upgrades, pool parameters, and new feature proposals. Rewards are distributed transparently, incentivizing participation and aligning community interests.
      </p>

      <h4 className="mt-4 font-semibold">Security & Transparency</h4>
      <p className="mb-3">
        All interactions occur on-chain with minimal trusted components. Multi-sig governance and automated monitoring ensure that user funds and protocol operations remain secure at all times.
      </p>
    </>
  )
},


launch: {
  title: 'Launch Info (Pump.fun)',
  content: (
    <>
      <p className="mb-3">
        Launching on Pump.fun or similar automated market-making platforms requires clarity, transparency, and a fair approach. Tenix emphasizes a measured launch with locked liquidity, audited contracts, and fully published parameters to ensure long-term stability and avoid speculation-only dynamics.
      </p>

      <h4 className="mt-2 font-semibold">Launch Principles</h4>
      <ul className="list-disc pl-6 mb-3">
        <li>Transparency: All tokenomics, vesting schedules, and liquidity lock details are publicly available.</li>
        <li>Security: Smart contracts undergo thorough audits and reports are shared with the community.</li>
        <li>Fairness: Pool parameters and launch timings are announced in advance to ensure equal opportunity for all participants.</li>
        <li>Community Engagement: Coordination across social channels ensures clear communication and smooth participation.</li>
      </ul>

      <h4 className="mt-2 font-semibold">Launch Checklist</h4>
      <ul className="list-disc pl-6">
        <li>Publish detailed tokenomics, vesting schedules, and LP lock durations</li>
        <li>Complete smart contract audits and share the results</li>
        <li>Announce pool parameters, pricing, and exact launch timing</li>
        <li>Prepare community channels and guides to facilitate fair participation</li>
        <li>Monitor post-launch liquidity and governance mechanisms for stability</li>
      </ul>
    </>
  )
},

liquidity: {
  title: 'Liquidity Model',
  content: (
    <>
      <p className="mb-3">
        Tenix employs a hybrid liquidity model designed to provide sufficient market depth while protecting early participants and long-term holders. The goal is to maintain stability, reduce volatility, and encourage healthy ecosystem growth.
      </p>

      <h4 className="mt-2 font-semibold">Key Elements</h4>
      <ul className="list-disc pl-6 mb-3">
        <li>Locked LP paired with stable assets to reduce volatility and ensure trust</li>
        <li>Incentive curves rewarding longer LP commitments and fostering loyalty</li>
        <li>Buy-back & burn or treasury-managed stabilization strategies to maintain token value</li>
        <li>Dynamic liquidity allocation across pools for optimized trading experience</li>
      </ul>

      <h4 className="mt-2 font-semibold">Liquidity Governance</h4>
      <p className="mb-3">
        Liquidity parameters, lock periods, and reward mechanisms are governed transparently. Community participation and multi-sig oversight ensure that liquidity management aligns with the best interests of Tenix holders.
      </p>

      <h4 className="mt-2 font-semibold">Risk Mitigation</h4>
      <p className="mb-3">
        Automated monitoring, multi-asset LP pairing, and phased liquidity releases minimize risks of impermanent loss and sudden market fluctuations, protecting both investors and protocol stability.
      </p>
    </>
  )
},

utility: {
  title: 'Utility',
  content: (
    <>
      <p className="mb-3">
        The TENIX token provides practical, tangible utility across the platform. Rather than purely speculative demand, utility is designed to reward engagement, loyalty, and contribution to the ecosystem.
      </p>

      <h4 className="mt-2 font-semibold">Core Utility</h4>
      <ul className="list-disc pl-6 mb-3">
        <li>Access to premium analytics and data-driven modules</li>
        <li>Lower fees for on-platform swaps and pool interactions</li>
        <li>Priority allocation for new pools, beta features, and limited releases</li>
        <li>Staking rewards and participation in community governance</li>
      </ul>

      <h4 className="mt-2 font-semibold">Extended Utility</h4>
      <ul className="list-disc pl-6 mb-3">
        <li>Incentivized participation in liquidity provision and yield farming</li>
        <li>Access to exclusive educational content, webinars, or AMAs</li>
        <li>Voting power on protocol parameters, upgrades, and treasury allocation</li>
        <li>Community recognition and achievement badges for active contributors</li>
      </ul>

      <h4 className="mt-2 font-semibold">Strategic Impact</h4>
      <p className="mb-3">
        By linking token utility directly to platform features and governance, TENIX ensures sustainable demand, encourages long-term engagement, and aligns the interests of users, developers, and liquidity providers.
      </p>
    </>
  )
},


   faq: {
  title: 'FAQs',
  content: (
    <>
      <h4 className="font-semibold">Q: Is Tenix custodial?</h4>
      <p className="mb-3">
        A: No. Tenix is fully non-custodial — users always sign transactions locally via their wallet of choice. The platform never holds user funds.
      </p>

      <h4 className="font-semibold">Q: How secure are the pools?</h4>
      <p className="mb-3">
        A: Pools are audited and built to minimize privileged controls. Admin actions are gated by multi-sig where possible, ensuring transparency and security.
      </p>

      <h4 className="font-semibold">Q: Can I run my own node for Tenix?</h4>
      <p className="mb-3">
        A: Yes. We publish indexer and RPC recommendations for partners who want dedicated nodes to reduce latency and improve reliability.
      </p>

      <h4 className="font-semibold">Q: How do I participate in launches?</h4>
      <p className="mb-3">
        A: Launch participation details are published in the Launch Info section. Generally, you will need a supported wallet and follow the published pool parameters on Pump.fun. Make sure to join official community channels for announcements.
      </p>

      <h4 className="font-semibold">Q: Are there token lock-ups or vesting?</h4>
      <p className="mb-3">
        A: Yes. Details of vesting schedules, liquidity locks, and allocation rules are fully published to ensure transparency and fair participation.
      </p>

      <h4 className="font-semibold">Q: How can I earn rewards?</h4>
      <p className="mb-3">
        A: Rewards are available through staking TENIX tokens, providing liquidity, and participating in governance. Incentives are designed to encourage long-term engagement.
      </p>

      <h4 className="font-semibold">Q: Where can I find official information?</h4>
      <p className="mb-3">
        A: Official announcements, updates, and guides are shared on Tenix’s website and verified social channels. Always verify sources before engaging in any transactions.
      </p>
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
