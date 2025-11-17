// X402IntegrationSnippets.jsx
import React, { useState } from "react";

/**
 * X402IntegrationSnippets
 * - Requires Tailwind CSS for styling (glass look).
 * - If you don't have Tailwind, adapt the classNames to inline styles or your CSS.
 */
export default function X402IntegrationSnippets() {
  const [tab, setTab] = useState("html");

  const snippets = {
    html: `<!-- 402x widget (example) -->
<!-- Add this to your page <head> or just before </body> -->
<script async src="https://cdn.402x.io/widget.js"></script>

<!-- Simple embed -->
<div class="x402-paywall" data-resource="/api/article/123" data-price-usd="0.10">
  <button class="x402-pay-btn">Unlock for $0.10</button>
</div>

<!-- Note: The official 402x / x402 widget URL & attributes depend on provider. -->`,

    client: `// client-x402.js (browser)
async function fetchWithX402(url, opts = {}) {
  // 1) Try to fetch the protected resource
  let resp = await fetch(url, opts);

  // 2) If server replies 402 Payment Required, it will include payment terms (JSON)
  if (resp.status === 402) {
    const challenge = await resp.json(); // { amount, currency, facilitator, invoice }
    console.log("Payment required:", challenge);

    // TODO: open wallet or facilitator flow for signing + sending stablecoin (USDC)
    // Example: navigator.xr/wallet api or open a facilitator payment modal
    // After payment, create a proof token/header (the exact value depends on facilitator)
    // For demo create a mock proof:
    const mockPaymentProof = "paid-proof-demo-" + Date.now();

    // 3) Retry original request with X-PAYMENT header containing payment proof
    const retry = await fetch(url, {
      ...opts,
      headers: {
        ...opts.headers,
        "X-PAYMENT": mockPaymentProof,
      },
    });

    if (retry.ok) {
      return retry;
    } else {
      throw new Error("Payment made but server rejected the proof.");
    }
  }

  return resp;
}

// Usage example
document.querySelectorAll(".x402-pay-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    try {
      const r = await fetchWithX402("/api/article/123");
      const text = await r.text();
      document.querySelector("#article-content").innerHTML = text;
    } catch (e) { console.error(e); alert('Payment or fetch failed'); }
  });
});`,

    server: `// server-x402-example.js (Node + Express)
// Minimal example: respond 402 with payment challenge, then accept X-PAYMENT header on retry
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// In-memory placeholder - production: use real facilitator + onchain verification
function buildPaymentChallenge(resourcePath) {
  return {
    resource: resourcePath,
    amount: "0.10",      // price in USD (for example)
    currency: "USDC",
    facilitator: "https://facilitator.example/pay", // where to start payment
    invoice: "inv_" + Date.now()
  };
}

app.get("/api/article/123", (req, res) => {
  const paymentProof = req.header("X-PAYMENT");
  if (!paymentProof) {
    // Respond 402 with JSON payment challenge
    res.status(402).json(buildPaymentChallenge(req.path));
    return;
  }

  // In a real setup, verify the proof with on-chain transaction or facilitator API
  // Here, accept any non-empty X-PAYMENT for demo:
  if (paymentProof && paymentProof.startsWith("paid-proof-demo")) {
    res.status(200).send("<h2>Protected article content — unlocked</h2><p>Thanks for paying!</p>");
  } else {
    res.status(402).json({ error: "Invalid payment proof" });
  }
});

app.listen(3000, () => console.log("x402 demo server listening on http://localhost:3000"));`,

    readme: `# Quick steps (README)
1. Add the HTML widget snippet to your page (or include the client script).
2. On click, the client requests your protected resource.
3. Server responds 402 with a JSON challenge (amount, currency, facilitator invoice). See x402 docs for exact fields and headers. :contentReference[oaicite:3]{index=3}
4. Client uses a wallet/facilitator to pay (USDC or configured stablecoin).
5. Client retries request attaching 'X-PAYMENT' header with payment proof (signature/txid/receipt).
6. Server verifies payment (on-chain or via facilitator API) and returns 200 + resource.
7. For production, use official helper SDKs and hosted facilitators (e.g., Coinbase x402 helper packages). :contentReference[oaicite:4]{index=4}`
  };

  const copyToClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      alert("Code copied to clipboard");
    } catch (err) {
      console.error("copy failed", err);
      alert("Unable to copy — select and copy manually");
    }
  };

  // tab list order display
  const tabs = [
    { id: "html", label: "HTML Snippet" },
    { id: "client", label: "Client JS" },
    { id: "server", label: "Server (Node)" },
    { id: "readme", label: "README" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">402x Integration Snippets</h3>
          <div className="text-sm opacity-80">Optimized for 402x stack</div>
        </div>

        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                `px-3 py-1 rounded-lg text-sm font-medium transition ` +
                (tab === t.id
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/3")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg overflow-hidden border border-white/5">
          <div className="p-4 bg-black/60">
            <div className="flex justify-end gap-2 mb-2">
              <button
                onClick={() => copyToClipboard(snippets[tab])}
                className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/10 text-sm"
              >
                Copy
              </button>
              <a
                href="https://402x.io/docs"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-md text-sm bg-white/3 hover:bg-white/10"
              >
                Docs
              </a>
            </div>

            <pre className="whitespace-pre-wrap text-xs leading-5 font-mono text-white/90">
              {snippets[tab]}
            </pre>
          </div>
        </div>

        <div className="mt-4 text-sm text-white/70">
          <strong>Note:</strong> This is a **demo pattern**. For production use you should integrate an official facilitator or SDK, use real on-chain verification, and handle receipts/webhooks. See the x402 / 402x docs linked above.
        </div>
      </div>
    </div>
  );
}
