import { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./wallet.css";
import { useNavigate } from "react-router-dom";

// ✅ Navigation Component
export default function Navigation({ homeRef }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { connected } = useWallet();

  // ✅ Handle responsive mode
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && !isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // ✅ Navigation items with scroll targets
  const navItems = [
    // { label: "Company", action: () => homeRef.current.scrollToHero() },
    { label: "Swap", action: () => homeRef.current.scrollToSwap() },
    { label: "Growth", action: () => homeRef.current.scrollToChart() },
    { label: "Roadmap", action: () => homeRef.current.scrollToRoadmap() },
    { label: "Faq", action: () => homeRef.current.scrollToFAQ() },
    { label: "Contact", action: () => homeRef.current.scrollToContact() },
    { label: "X402Payment", action: () => homeRef.current.scrollToContact() },

  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-white/10 relative z-50"
    >
      {/* ✅ Logo */}
      {/* <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <span className="text-white text-xl font-semibold tracking-wide">Lubox</span>
      </div> */}

<div  onClick={() => navigate("/")} className="flex items-center mb-0 group">
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





      {/* ✅ Desktop Navigation */}
      {!isMobile && (
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileHover={{ scale: 1.05 }}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {item.label === "Company" ? (
                <div className="px-4 py-2 rounded-full border border-white/30 hover:border-white transition-colors">
                  {item.label}
                </div>
              ) : (
                item.label
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* ✅ Desktop Wallet Button */}
      {!isMobile && (
        <div className="flex items-center gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <WalletMultiButton
              className="!bg-white/10 !text-white !rounded-lg !border !border-white/20 
              hover:!bg-white/20 !transition-all !flex !items-center !gap-2 
              !px-3 !py-1.5 !text-sm"
            >
              {!connected && (
                <>
                  <span className="font-bold mx-1">Connect</span>
                  <Wallet className="w-4 h-4" />
                </>
              )}
            </WalletMultiButton>
          </motion.div>
        </div>
      )}

      {/* ✅ Mobile Menu Button */}
      {isMobile && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  variants={menuItemVariants}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label === "Company" ? (
                    <div className="px-4 py-2 rounded-full border border-white/30 hover:border-white transition-colors w-fit">
                      {item.label}
                    </div>
                  ) : (
                    item.label
                  )}
                </motion.button>
              ))}

              {/* ✅ Wallet Button in Mobile Menu */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <WalletMultiButton
                    className="!w-full !px-6 !py-2 !rounded-lg !border !border-white/30 
                      hover:!border-white !transition-all !flex !items-center !gap-2 
                      !bg-transparent !text-white"
                  >
                    {!connected && (
                      <>
                        <span className="font-bold mx-1">Connect</span>
                        <Wallet className="w-4 h-4" />
                      </>
                    )}
                  </WalletMultiButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
