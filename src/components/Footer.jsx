import { X, ShieldCheck, FileText, Compass } from "lucide-react";

export default function Footer({ homeRef }) {
  const footerLinks = [
    { label: "Company", icon: Compass, action: () => homeRef?.current?.scrollToHero() },
    { label: "Swap", icon: Compass, action: () => homeRef?.current?.scrollToSwap() },
    { label: "Growth", icon: FileText, action: () => homeRef?.current?.scrollToChart() },
    { label: "Roadmap", icon: ShieldCheck, action: () => homeRef?.current?.scrollToRoadmap() },
    { label: "FAQ", icon: FileText, action: () => homeRef?.current?.scrollToFAQ() },
    { label: "Contact", icon: ShieldCheck, action: () => homeRef?.current?.scrollToContact() },
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 text-white/70 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        {/* Logo + Tagline */}
        <div>
          
          <div className="flex items-center gap-0 mb-4 group">
            <img
              src="/tenix-logo.png"
              alt="Tenix Logo"
              className="mt-0 w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-500
                        drop-shadow-[0_0_8px_rgba(0,200,255,0.5)]
                        group-hover:drop-shadow-[0_0_12px_rgba(180,0,255,0.8)]
                        group-hover:scale-110 animate-pulse"
            />
            <span className="text-white font-semibold text-lg group-hover:text-[#b400ff] transition-colors duration-500">
              Tenix
            </span>
          </div>

          <p className="text-white/50">
            Powering financial intelligence across the 402x ecosystem. Built on ERC-8004.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-medium mb-3">Explore</h4>
          <ul className="space-y-2">
            {footerLinks.map(({ label, icon: Icon, action }) => (
              <li key={label}>
                <button
                  onClick={action}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Icon size={16} /> {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Legal */}
        <div>
          <h4 className="text-white font-medium mb-3">Connect</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 hover:text-white">
              <X size={16} />{" "}
              <a href="https://x.com/tenixagi" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-white">
              <FileText size={16} />{" "}
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white">
              <ShieldCheck size={16} />{" "}
              <a href="#terms">Terms of Use</a>
            </li>

            <li className="flex items-center gap-2 hover:text-white">
              <img
                src="./github.png"   // 🔹 your custom image path
                alt="github Icon"
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
              GitHub
              </a>
            </li>

            <li className="flex items-center gap-2 hover:text-white">
              <img
                src="./pump.png"   // 🔹 your custom image path
                alt="Buy Icon"
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://pump.fun/"
                target="_blank"
                rel="noreferrer"
              >
                Buy Now
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Soro. All rights reserved.
      </div>
    </footer>
  );
}
