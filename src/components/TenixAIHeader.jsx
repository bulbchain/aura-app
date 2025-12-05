"use client"

import { useState, useEffect } from "react";
import { Menu, X, Home, TrendingUp, Activity, Settings, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function TenixAIHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/models", icon: TrendingUp, label: "Models" },
    { path: "/live-trades", icon: Activity, label: "Live Trades" },
    // { path: "/settings", icon: Settings, label: "Settings" },
    // { path: "/support", icon: HelpCircle, label: "Support" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-10 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/home")}>
        <img
          src="/tenix-logo.png"
          alt="Tenix"
          className="w-10 h-10 transition-all drop-shadow-[0_0_8px_rgba(0,200,255,0.5)] hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(180,0,255,0.8)]"
        />
        <span className="text-white font-bold text-xl">Tenix AI</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isActive(item.path)
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 flex flex-col px-4 py-4 space-y-2 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
