import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const IntegrationSection = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (codeId, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(codeId);
    setTimeout(() => setCopied(null), 1500);
  };

  const serverCode = `import { withX402Payment } from '@lib/x402/middleware';

async function handler(req: NextRequest) {
  // Your API logic here
  const data = await processRequest(req);
  return NextResponse.json({ data });
}

// Add payment requirement
export const POST = withX402Payment(handler, "0.01");`;

  const clientCode = `// Client makes request
const response = await fetch('/api/your-endpoint', {
  method: 'POST',
  headers: {
    'X-Payment': signedPayment // Auto-handled by x402 SDK
  },
  body: JSON.stringify({ data })
});`;

  return (
    <section className="relative bg-black/90 text-white py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Glossy horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      {/* Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-white/5 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Simple Integration
        </h2>
        <p className="text-white/60 mb-10 text-lg">
          Add payments to your serverless functions in minutes
        </p>

        {/* Code Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Server Block */}
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-left shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-purple-400 text-sm font-medium">
                SERVER (API ROUTE)
              </h3>
              <button
                onClick={() => handleCopy("server", serverCode)}
                className="p-1 hover:bg-white/10 rounded-md transition"
              >
                {copied === "server" ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <pre className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
              {serverCode}
            </pre>
          </div>

          {/* Client Block */}
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-left shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-purple-400 text-sm font-medium">
                CLIENT (YOUR APP)
              </h3>
              <button
                onClick={() => handleCopy("client", clientCode)}
                className="p-1 hover:bg-white/10 rounded-md transition"
              >
                {copied === "client" ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <pre className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
              {clientCode}
            </pre>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[
            { value: "1 min", label: "Setup Time" },
            { value: "0%", label: "Protocol Fees" },
            { value: "2 sec", label: "Settlement Time" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-md"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default IntegrationSection;
