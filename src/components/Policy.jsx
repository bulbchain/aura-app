import React from "react";
import TenixDocsHeader from "./TenixDocsHeader"; // adjust path if needed

export default function Policy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050510] to-black text-white">
      
      {/* ✅ Glass Docs Header */}
      <TenixDocsHeader />

      {/* ✅ Main Glass Container */}
      <div className="max-w-4xl mx-auto pt-36 px-6 pb-20">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 space-y-8">

          {/* ✅ Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tenix Privacy Policy
            </h1>
            <p className="text-sm text-white/50">Last updated: December 2025</p>
          </div>

          {/* ✅ Sections */}
          {[
            {
              title: "1. Introduction",
              content:
                "Tenix (“we”, “our”, “us”) values your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data. By using Tenix, you agree to the practices described in this policy.",
            },
            {
              title: "2. Information We Collect",
              list: [
                "Wallet Information: Public wallet addresses used to interact with Tenix pools, swaps, staking, and governance. We never collect private keys or seed phrases.",
                "On-Platform Activity: Participation in pools, swaps, staking, votes, and other protocol interactions.",
                "Optional Personal Data: Support messages, community participation or inquiries.",
                "Cookies & Analytics: Website analytics to improve performance and UX.",
              ],
            },
            {
              title: "3. How We Use Your Information",
              list: [
                "Provide and improve Tenix services.",
                "Prevent fraud and secure platform activity.",
                "Send important announcements and platform updates.",
                "Ensure legal and compliance obligations.",
              ],
            },
            {
              title: "4. Data Sharing",
              list: [
                "Service Providers: Hosting, analytics, and infrastructure providers.",
                "Legal Compliance: Required government requests.",
                "Security Audits: External protocol auditors.",
              ],
            },
            {
              title: "5. User Rights",
              list: [
                "Request access to collected personal data.",
                "Request correction or deletion of data.",
                "Opt-out of analytics where applicable.",
              ],
            },
            {
              title: "6. Data Security",
              list: [
                "Encrypted data storage where applicable.",
                "Non-custodial architecture — we never hold private keys.",
                "Multi-sig controls and audited contracts.",
              ],
            },
            {
              title: "7. Third-Party Services",
              content:
                "Tenix integrates with third-party tools such as wallets, analytics providers, and blockchain RPCs. Each provider manages its own privacy policy and users are advised to review them.",
            },
            {
              title: "8. Transparency & On-Chain Activity",
              content:
                "Tenix interactions are pseudonymous and recorded on public blockchain networks. Wallet addresses are visible, but never directly linked to personal identity unless voluntarily provided.",
            },
            {
              title: "9. Changes to this Privacy Policy",
              content:
                "We may modify this Privacy Policy at any time. Updates will reflect the latest revision date at the top of this document.",
            },
          ].map((section, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-xl font-semibold text-cyan-300">
                {section.title}
              </h2>
              {section.content && (
                <p className="text-white/80">{section.content}</p>
              )}
              {section.list && (
                <ul className="list-disc pl-6 space-y-1 text-white/80">
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* ✅ Contact Section */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              10. Contact Information
            </h2>
            <p className="text-white/80">
              For any questions or requests regarding this Privacy Policy, please
              send a message to us through our official support or contact form
              on the website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
