import React from "react";
import TenixDocsHeader from "./TenixDocsHeader"; // adjust path if needed

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050510] to-black text-white">

      {/* ✅ Glass Header */}
      <TenixDocsHeader />

      {/* ✅ Main Container */}
      <div className="max-w-4xl mx-auto pt-36 px-6 pb-20">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 space-y-8">

          {/* ✅ Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tenix Terms of Use
            </h1>
            <p className="text-sm text-white/50">Last updated: December 2025</p>
          </div>

          {/* ✅ Sections */}
          <Section
            title="1. Acceptance of Terms"
            text="By accessing or using Tenix, you agree to be legally bound by these Terms of Use. If you do not agree with any part of these terms, you must not use the platform."
          />

          <Section
            title="2. Nature of Tenix"
            text="Tenix is a decentralized analytics, liquidity, and utility protocol. Tenix does not provide financial, legal, or investment advice. All interactions with smart contracts occur at your own risk."
          />

          <Section
            title="3. Eligibility"
            list={[
              "You must be at least 18 years of age.",
              "You are responsible for ensuring compliance with local laws.",
              "You are not located in any restricted jurisdiction.",
            ]}
          />

          <Section
            title="4. Non-Custodial Usage"
            list={[
              "Tenix never controls your wallet or private keys.",
              "You are solely responsible for fund security.",
              "All blockchain actions are irreversible.",
            ]}
          />

          <Section
            title="5. Token & Platform Risks"
            list={[
              "Cryptocurrency markets are highly volatile.",
              "Token value may fluctuate rapidly or go to zero.",
              "Liquidity may be limited at times.",
              "Smart contract risks exist despite audits.",
            ]}
          />

          <Section
            title="6. No Guarantees"
            text="Tenix provides its platform on an “AS IS” and “AS AVAILABLE” basis. We do not guarantee uninterrupted service, error-free execution, or profit outcomes."
          />

          <Section
            title="7. Prohibited Activities"
            list={[
              "Market manipulation or wash trading",
              "Brute-force attacks or exploitation attempts",
              "Uploading malicious code",
              "Using automated bots without permission",
            ]}
          />

          <Section
            title="8. Governance & Protocol Changes"
            text="Tenix may evolve through governance votes or upgrades. By using the protocol, you acknowledge that features, token mechanics, or rules may change over time."
          />

          <Section
            title="9. Launch Disclaimer (Pump.fun & Fair Launches)"
            list={[
              "Tenix does not guarantee launch performance.",
              "Initial volatility is expected.",
              "Participants must perform their own research (DYOR).",
              "No refunds are provided for token purchases.",
            ]}
          />

          <Section
            title="10. Limitation of Liability"
            text="Under no circumstances shall Tenix, its developers, or contributors be liable for any loss of funds, data, profits, or business resulting from platform usage."
          />

          <Section
            title="11. Indemnification"
            text="You agree to indemnify and hold harmless Tenix and its contributors from any claims, damages, liabilities, or legal actions arising from your misuse of the platform."
          />

          <Section
            title="12. Third-Party Services"
            text="Tenix integrates third-party services including wallets, RPC providers, and analytics platforms. Their services are governed by their respective policies."
          />

          <Section
            title="13. Termination"
            text="Tenix reserves the right to restrict access to the platform at any time in cases of abuse, security risk, or legal obligation."
          />

          <Section
            title="14. Governing Jurisdiction"
            text="These Terms shall be governed by applicable international blockchain-compliant legal standards without regard to conflict of law principles."
          />

          <Section
            title="15. Updates to Terms"
            text="We reserve the right to modify these Terms at any time. Updates become effective immediately upon publication."
          />

          {/* ✅ Contact */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              16. Contact & Support
            </h2>
            <p className="text-white/80">
              For any legal questions or concerns regarding these Terms, please
              reach out through our official website support or contact form.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Section Component */
function Section({ title, text, list }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-cyan-300">{title}</h2>
      {text && <p className="text-white/80">{text}</p>}
      {list && (
        <ul className="list-disc pl-6 space-y-1 text-white/80">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
