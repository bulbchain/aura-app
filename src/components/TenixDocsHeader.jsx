import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TenixDocsHeader() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <nav className="w-full bg-black/100 backdrop-blur-xl border-b border-white/10 px-6 md:px-10 py-5 flex items-center justify-between fixed top-0 left-0 z-50">
      
      {/* 🔥 Logo + Back */}
      <div className="flex items-center gap-4">
        <img
          src="/tenix-logo.png"
          alt="Tenix"
          onClick={() => navigate("/home")}
          className="w-10 h-10 cursor-pointer transition-all drop-shadow-[0_0_8px_rgba(0,200,255,0.5)] hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(180,0,255,0.8)]"
        />
      </div>
    </nav>
  );
}
