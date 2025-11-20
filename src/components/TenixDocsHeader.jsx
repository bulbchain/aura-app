import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TenixDocsHeader() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems = [
    { label: "Docs Home", action: () => navigate("/docs") },
    { label: "API", action: () => navigate("/docs?section=api") },
    { label: "Architecture", action: () => navigate("/docs?section=architecture") },
    { label: "Security", action: () => navigate("/docs?section=security") },
  ];

  return (
    <nav className="w-full bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 md:px-10 py-5 flex items-center justify-between fixed top-0 left-0 z-50">
      
      {/* 🔥 Logo + Back */}
      <div className="flex items-center gap-4">
        <img
          src="/tenix-logo.png"
          alt="Tenix"
          onClick={() => navigate("/home")}
          className="w-10 h-10 cursor-pointer transition-all drop-shadow-[0_0_8px_rgba(0,200,255,0.5)] hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(180,0,255,0.8)]"
        />

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button> */}
      </div>

      {/* 🔥 Desktop Nav */}
      {!isMobile && (
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileHover={{ scale: 1.05 }}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* 🔥 Mobile Menu Button */}
      {isMobile && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      )}

      {/* 🔥 Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-md px-6 py-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  item.action();
                }}
                className="text-white/70 text-sm py-2 border-b border-white/10 text-left"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
