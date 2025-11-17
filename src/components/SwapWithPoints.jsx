// SwapWithPoints.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";

/**
 * Simple localStorage-backed points logic.
 * - points are stored per-wallet: "points_<addr>"
 * - initial bonus flag: "points_init_<addr>"
 *
 * Rules:
 * - initialBonus = 50 points (granted once on first connect)
 * - pointsPerSwap = 10 points per successful swap (flat)
 *   OR pointsPerUSDDollar = 1 (sample amount-based)
 */

const INITIAL_BONUS = 50;
const POINTS_PER_SWAP = 10;
// const POINTS_PER_USD = 1; // alternative: calculate based on swap value

export default function SwapWithPoints() {
  const { publicKey, connected } = useWallet();
  const walletAddr = publicKey?.toBase58?.();
  const [points, setPoints] = useState(0);
  const [toast, setToast] = useState(null);

  // helper: localStorage key helpers
  const ptsKey = (addr) => `points_${addr}`;
  const initKey = (addr) => `points_init_${addr}`;

  // load points for wallet when address changes
  useEffect(() => {
    if (!walletAddr) {
      setPoints(0);
      return;
    }

    const stored = localStorage.getItem(ptsKey(walletAddr));
    if (stored !== null) {
      setPoints(Number(stored));
    } else {
      // not present -> treat as 0 but do NOT auto-award here,
      // we'll award initial bonus if init flag missing (next block).
      setPoints(0);
    }
  }, [walletAddr]);

  // award initial bonus the first time user connects (if not given)
  useEffect(() => {
    if (!walletAddr || !connected) return;

    const initFlag = localStorage.getItem(initKey(walletAddr));
    if (!initFlag) {
      // give initial bonus
      const newPts = (Number(localStorage.getItem(ptsKey(walletAddr)) || 0) + INITIAL_BONUS);
      localStorage.setItem(ptsKey(walletAddr), String(newPts));
      localStorage.setItem(initKey(walletAddr), "1");
      setPoints(newPts);
      setToast({ message: `Welcome! You received ${INITIAL_BONUS} points.`, type: "success" });
      setTimeout(() => setToast(null), 2500);
    }
  }, [walletAddr, connected]);

  // function to award points (call after swap success)
  const awardPoints = useCallback((amount = POINTS_PER_SWAP, reason = "Swap reward") => {
    if (!walletAddr) {
      setToast({ message: "Connect wallet to earn points", type: "warn" });
      setTimeout(() => setToast(null), 1500);
      return;
    }
    const current = Number(localStorage.getItem(ptsKey(walletAddr)) || 0);
    const updated = current + Number(amount);
    localStorage.setItem(ptsKey(walletAddr), String(updated));
    setPoints(updated);
    setToast({ message: `+${amount} points — ${reason}`, type: "success" });
    setTimeout(() => setToast(null), 1800);
  }, [walletAddr]);

  // simulated swap handler (replace with real swap logic)
  const handleSwap = async () => {
    if (!connected) {
      setToast({ message: "Connect your wallet first", type: "warn" });
      setTimeout(() => setToast(null), 1500);
      return;
    }

    try {
      // --- place your real swap logic here (Jupiter or on-chain) ---
      // await doSwap(...)  <-- if success then award points
      // Simulate success:
      await new Promise((r) => setTimeout(r, 800));

      // award flat points or calculate from swapped amount
      awardPoints(POINTS_PER_SWAP, "Swap complete");
    } catch (err) {
      console.error("swap failed", err);
      setToast({ message: "Swap failed", type: "error" });
      setTimeout(() => setToast(null), 1500);
    }
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-12 bg-black/50">
      <div className="max-w-md mx-auto border border-white/20 rounded-2xl bg-black/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-white font-semibold">Swap</h3>
          <div className="text-right">
            <div className="text-xs text-white/60">Points</div>
            <div className="text-sm font-bold text-white">{points}</div>
          </div>
        </div>

        {/* ... your swap inputs here (simplified) */}
        <div className="mb-4">
          <input
            placeholder="Amount"
            className="w-full p-3 rounded-md bg-black/30 text-white"
          />
        </div>

        <button
          onClick={handleSwap}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white font-medium"
        >
          Swap (simulate)
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${
            toast.type === "success" ? "bg-green-600/90" : toast.type === "error" ? "bg-red-600/90" : "bg-yellow-600/90"
          } text-white`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
