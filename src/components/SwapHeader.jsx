import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function SwapHeader({ isMobile }) {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();

  // Format address like 8 chars ... 4 chars
  const shortAddress = publicKey
    ? `${publicKey.toString().slice(0, 4)}...${publicKey
        .toString()
        .slice(-4)}`
    : null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between px-5 md:px-10 py-6 border-b border-white/10 
                 backdrop-blur-xl bg-black/30"
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img
          src="/tenix-logo.png"
          alt="Tenix Logo"
          className="w-12 h-12 object-contain transition-all duration-500
                     group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(180,0,255,0.8)]"
        />
        <span className="text-white font-bold text-xl tracking-wide group-hover:text-[#b400ff] transition-colors">
          Tenix
        </span>
      </div>

      {/* WALLET BUTTON — EXACT SAME BEHAVIOR AS NAVIGATION */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <WalletMultiButton
          className="!bg-white/10 !text-white !px-4 !py-2 !rounded-xl 
          !border !border-white/20 hover:!bg-white/20 
          !transition-all !flex !items-center !gap-2 !text-sm"
        >
          {!connected ? (
            <>
              <span className="font-bold">Connect</span>
              <Wallet size={18} />
            </>
          ) : (
            <>
              {/* SAME AS NAVBAR → SHOW ADDRESS */}
              <span className="font-bold text-white">{shortAddress}</span>
            </>
          )}
        </WalletMultiButton>
      </motion.div>
    </motion.nav>
  );
}
