// HostedPaymentWidgetWithTabs.jsx
import React, { useState, useEffect } from "react";

/**
 * HostedPaymentWidgetWithTabs.jsx
 * - Tailwind CSS required for styles (glass look).
 * - Mocked hosted-checkout flow (no real chain). Clicking "Pay 0.10 USDC"
 *   will simulate invoice creation and a payment confirmation.
 *
 * Props:
 * - resourceId (string) default "article_123"
 * - price (string|number) default "0.10"
 * - currency (string) default "USDC"
 * - onSuccess(invoice) callback after simulated payment success
 *
 * Usage:
 * <HostedPaymentWidgetWithTabs />
 */
export default function HostedPaymentWidgetWithTabs({
  resourceId = "article_123",
  price = "0.10",
  currency = "USDC",
  onSuccess = () => {},
}) {
  const tabs = [
    { id: "html", label: "HTML Embed" },
    { id: "react", label: "Client React" },
    { id: "server", label: "Server Mock" },
    { id: "readme", label: "README" },
  ];

  const [activeTab, setActiveTab] = useState("html");

  // Hosted modal/payment state
  const [modalOpen, setModalOpen] = useState(false);
  const [invoice, setInvoice] = useState(null); // { id, amount, currency, payUrl, qr }
  const [status, setStatus] = useState("idle"); // idle, creating, pending, paid, failed
  const [error, setError] = useState(null);

  // Simulated polling timer id
  useEffect(() => {
    let timer;
    if (status === "pending" && invoice?.id) {
      // simulate verify: After 4s become paid
      timer = setTimeout(() => {
        // simulate success
        setStatus("paid");
        setInvoice((i) => ({ ...i, status: "paid", tx: `tx_demo_${Date.now()}` }));
        onSuccess({ ...invoice, status: "paid", tx: `tx_demo_${Date.now()}` });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [status, invoice, onSuccess]);

  // Mock create invoice
  const startHostedPayment = () => {
    setError(null);
    setStatus("creating");
    // simulate network call to create invoice
    setTimeout(() => {
      const inv = {
        id: `inv_demo_${Date.now()}`,
        amount: price,
        currency,
        payUrl: "https://hosted-checkout.example/checkout/" + Math.random().toString(36).slice(2, 9),
        qr: null, // optionally could be data URL
        expiresAt: Date.now() + 1000 * 60 * 5,
      };
      setInvoice(inv);
      setStatus("pending");
    }, 900); // small delay to mimic network
  };

  const closeModal = () => {
    setModalOpen(false);
    setInvoice(null);
    setStatus("idle");
    setError(null);
  };

  // Unlock action available after paid
  const unlockContent = () => {
    // in real app, you'd refetch resource or set access token
    closeModal();
  };

  // Copy helper
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied");
    } catch (e) {
      alert("Unable to copy automatically. Select and copy the text.");
    }
  };

  // lightweight toast (visual feedback)
  const toast = (msg) => {
    const el = document.createElement("div");
    el.innerText = msg;
    Object.assign(el.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      background: "rgba(0,0,0,0.75)",
      color: "white",
      padding: "8px 12px",
      borderRadius: "8px",
      zIndex: 99999,
      fontSize: "13px",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  };

  // Code snippets shown in tabs (Tailwind-friendly examples)
  const snippets = {
    html: `<!-- HTML Embed: drop this on any site -->
<div id="x402-widget-root"></div>
<script>
  (function(){
    var s = document.createElement('script');
    s.src = "https://cdn.yourdomain.com/x402-widget.min.js"; // host your compiled widget
    s.async = true;
    document.body.appendChild(s);
  })();
</script>`,
    react: `// Minimal integration example (React)
import HostedPaymentWidgetWithTabs from "./HostedPaymentWidgetWithTabs";

function App(){
  const handleSuccess = (invoice) => {
    console.log("paid", invoice);
    // fetch protected resource / show content
  };
  return <HostedPaymentWidgetWithTabs onSuccess={handleSuccess} />;
}`,
    server: `// Minimal mock server (Node/Express) for local testing
// POST /api/facilitator/create-invoice -> returns { id, amount, currency, payUrl }
// POST /api/facilitator/verify-invoice -> returns { status: 'paid'|'pending'|'expired', invoice }
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/facilitator/create-invoice', (req, res) => {
  const id = 'inv_' + Date.now();
  res.json({
    id, amount: req.body.amount || '0.10', currency: req.body.currency || 'USDC',
    payUrl: 'https://hosted-checkout.example/checkout/' + id
  });
});

app.post('/api/facilitator/verify-invoice', (req, res) => {
  // In production check actual payment status; here we simulate paid
  res.json({ status: 'paid', invoice: { id: req.body.invoiceId, status: 'paid', tx: 'tx_demo' } });
});

app.listen(4000);`,
    readme: `# 402x Hosted Widget (Mock)
1. Include the HTML embed snippet on other sites as shown.
2. Use the React component in your app; implement /api endpoints or use the mock server.
3. Widget creates an invoice, opens hosted payment page (payUrl) and polls verification.
4. For production: replace mocked endpoints with real facilitator APIs, verify on-chain or via facilitator, secure callbacks/webhooks.`,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      
      <div className="rounded-2xl p-4 bg-gradient-to-br from-black/60 to-white/3 backdrop-blur-md border border-white/10 shadow-xl">
      
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Hosted Checkout — 0.10 {currency}</h2>
            <p className="text-sm text-white/70">Mock hosted checkout widget • dark glass style</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setModalOpen(true); setError(null); }}
              className="px-4 py-2 rounded-full bg-white/6 hover:bg-white/10 text-sm border border-white/10"
            >
              Unlock • {price} {currency}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  activeTab === t.id ? "bg-white/10 border border-white/20" : "hover:bg-white/3"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code panel */}
        <div className="rounded-lg overflow-hidden border border-white/5">
          <div className="p-4 bg-black/60">
            <div className="flex justify-between items-start gap-2 mb-2">
              <div className="text-xs text-white/70">Snippet — {tabs.find(t => t.id === activeTab).label}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => { copyToClipboard(snippets[activeTab]); }}
                  className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/10 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap text-xs leading-5 font-mono text-white/90 bg-transparent p-2 rounded">
              {snippets[activeTab]}
            </pre>
          </div>
        </div>

        {/* Example unlocked content area */}
        <div className="mt-4 p-4 rounded-lg bg-white/3 border border-white/5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-white/80">Protected Resource Preview</div>
              <div id="protected-content" className="text-sm text-white/70 mt-1">
                (Locked) — Pay 0.10 {currency} to unlock full content.
              </div>
            </div>

            <div>
              <button
                onClick={() => { setModalOpen(true); }}
                className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400 text-sm font-medium shadow"
              >
                Pay {price} {currency}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Hosted Checkout (mock) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal>
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => closeModal()}
          />
          <div className="relative w-full max-w-lg mx-4">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/80 border border-white/8 shadow-2xl">
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <div>
                  <div className="text-white font-semibold">Hosted Checkout</div>
                  <div className="text-xs text-white/60">{resourceId} • {price} {currency}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => closeModal()}
                    className="text-white/80 hover:text-white text-lg p-1"
                    aria-label="close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* body */}
              <div className="p-6">
                {status === "idle" && (
                  <>
                    <p className="text-sm text-white/70 mb-4">
                      You will be redirected to a hosted checkout to complete a micro-payment of <strong>{price} {currency}</strong>.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { startHostedPayment(); }}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-medium shadow"
                      >
                        Pay {price} {currency}
                      </button>
                      <button
                        onClick={() => closeModal()}
                        className="px-4 py-2 rounded-lg bg-white/6 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {status === "creating" && (
                  <div className="text-sm text-white/70">Creating invoice…</div>
                )}

                {status === "pending" && invoice && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-md bg-white/3 border border-white/6">
                      <div className="flex justify-between text-sm text-white/80">
                        <div>Amount</div>
                        <div>{invoice.amount} {invoice.currency}</div>
                      </div>
                      <div className="flex justify-between text-sm text-white/70 mt-2">
                        <div>Invoice</div>
                        <div className="font-mono text-xs">{invoice.id}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={invoice.payUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 text-sm"
                      >
                        Open Hosted Checkout
                      </a>

                      <button
                        onClick={() => {
                          // simulate immediate on-widget success (for local demo)
                          setStatus("paid");
                          setInvoice((i) => ({ ...i, status: "paid", tx: `tx_demo_${Date.now()}` }));
                          onSuccess({ ...invoice, status: "paid", tx: `tx_demo_${Date.now()}` });
                        }}
                        className="px-3 py-2 rounded-md bg-green-600 text-white text-sm"
                      >
                        Simulate Payment Success
                      </button>
                    </div>

                    <div className="text-xs text-white/60 mt-2">
                      Waiting for payment confirmation… (automatically completes in ~4s in demo)
                    </div>
                  </div>
                )}

                {status === "paid" && invoice && (
                  <div className="space-y-3">
                    <div className="text-green-400 font-semibold">Payment received ✓</div>
                    <div className="text-sm text-white/70">Transaction: <span className="font-mono text-xs">{invoice.tx || "tx_demo"}</span></div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Unlock: replace preview content with unlocked content
                          const el = document.getElementById("protected-content");
                          if (el) el.innerHTML = "<strong class='text-white'>Unlocked content — thanks for paying!</strong><div class='text-white/70 mt-2'>Here is the full article content...</div>";
                          unlockContent();
                          toast("Content unlocked");
                        }}
                        className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
                      >
                        View Content
                      </button>
                      <button onClick={() => closeModal()} className="px-3 py-2 rounded-md bg-white/6 text-white">Close</button>
                    </div>
                  </div>
                )}

                {status === "failed" && (
                  <div>
                    <div className="text-red-400 font-semibold">Payment failed</div>
                    <div className="text-sm text-white/70 mt-2">Try again or contact support.</div>
                    <div className="mt-3">
                      <button onClick={() => { setStatus("idle"); setInvoice(null); }} className="px-3 py-2 rounded-md bg-white/6 text-white">Retry</button>
                    </div>
                  </div>
                )}

                {error && <div className="text-red-400 mt-3">{error}</div>}
              </div>

              {/* footer */}
              <div className="px-5 py-3 border-t border-white/6 text-xs text-white/60">
                Demo mode — this is a mocked hosted checkout. Replace endpoints and verify on server for production.
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
    
  );
}
