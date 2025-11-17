import "../App.css";

export default function Partnership() {
  const companies = [
    { name: "BNB", logo: "companies/bnb-chain-icon.png" },
    { name: "Metamask", logo: "companies/metamask-icon.png" },
    { name: "Ethereum", logo: "companies/ethereum-icon.png" },
    { name: "Grafana", logo: "companies/grafana-icon.png" },
    { name: "Appkit", logo: "companies/appkit-icon.png" },
    { name: "Foundry", logo: "companies/foundry-icon.png" },
    { name: "Prometheus", logo: "companies/prometheus-icon.png" },
    { name: "Chat Gpt", logo: "companies/chatgpt-icon.png" },
    { name: "Gemini", logo: "companies/gemini-icon.png" },
  ];

    const technology = [
    { name: "React", logo: "companies/react-icon.png" },
    { name: "Claude", logo: "companies/claude-icon.png" },
    { name: "Viem", logo: "companies/viem-icon.png" },
    { name: "Solidity", logo: "companies/solidity-icon.png" },
    { name: "Cloudflare", logo: "companies/cloudflare-icon.png" },
    { name: "Docusaurus", logo: "companies/docusaurus-icon.png" },
    { name: "Next.js", logo: "companies/nextjs-icon.png" },
    { name: "Google Cloud", logo: "companies/google-cloud-icon.png" },
    { name: "Prometheus", logo: "companies/prometheus-icon.png" },
  ];

//   const technology = [...companies];
  const extendedCompanies = [...companies, ...companies];
  const extendedTechnology = [...technology, ...technology];

  return (
    <section className="relative py-20 overflow-hidden border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-center text-white text-2xl font-semibold mb-2">
          Trusted by 4,000+ Web3 Companies and Decentralized Technologies
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 z-10 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 z-10 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>

        {/* Marquee track */}
        <div className="flex gap-6 animate-marquee">
          {extendedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-800/50 rounded-2xl whitespace-nowrap hover:border-slate-700/50 transition group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500/30 to-pink-600/30 group-hover:from-pink-500/50 group-hover:to-pink-600/50 transition">
                {company.logo.endsWith(".png") ||
                company.logo.endsWith(".jpg") ||
                company.logo.endsWith(".svg") ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-7 h-7 object-contain rounded-full"
                  />
                ) : (
                  <span className="text-base font-extrabold text-pink-400">
                    {company.logo}
                  </span>
                )}
              </div>
              <span className="text-slate-200 text-base font-semibold tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second marquee reverse */}
      <div className="relative overflow-hidden mt-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 z-10 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 z-10 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>

        <div className="flex gap-6 animate-marquee-reverse">
          {extendedTechnology.map((company, index) => (
            <div
              key={`reverse-${index}`}
              className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-800/50 rounded-xl whitespace-nowrap hover:border-slate-700/50 transition group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500/30 to-pink-600/30 group-hover:from-pink-500/50 group-hover:to-pink-600/50 transition">
                {company.logo.endsWith(".png") ||
                company.logo.endsWith(".jpg") ||
                company.logo.endsWith(".svg") ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-7 h-7 object-contain rounded-full"
                  />
                ) : (
                  <span className="text-base font-extrabold text-pink-400">
                    {company.logo}
                  </span>
                )}
              </div>
              <span className="text-slate-200 text-base font-semibold tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
