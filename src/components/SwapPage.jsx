import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import toast, { Toaster } from "react-hot-toast";

// 🎁 Configurations
const INITIAL_USDT = 100;
const POINTS_PER_SWAP = 10;

export default function SwapSection() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [toAmount, setToAmount] = useState("≈ 0.00");
  const [points, setPoints] = useState(0);

  const { publicKey, connected } = useWallet();
  const walletAddr = publicKey?.toBase58?.();

  const tokens = ["SOL", "USDC", "USDT", "BONK", "RAY", "SRM"];

  // 🔑 Helper keys for localStorage
  const ptsKey = (addr) => `points_${addr}`;
  const initKey = (addr) => `init_${addr}`;
  const balKey = (addr, token) => `balance_${addr}_${token}`;

  // 🪙 Load points on wallet change
  useEffect(() => {
    if (!walletAddr) return setPoints(0);
    const stored = localStorage.getItem(ptsKey(walletAddr));
    setPoints(stored ? Number(stored) : 0);
  }, [walletAddr]);

  // 🎁 Give 100 USDT initially once per wallet
  useEffect(() => {
    if (!connected || !walletAddr) return;
    const initBal = localStorage.getItem(initKey(walletAddr));

    if (!initBal) {
      localStorage.setItem(balKey(walletAddr, "USDT"), INITIAL_USDT.toString());
      localStorage.setItem(balKey(walletAddr, "SOL"), "0");
      localStorage.setItem(initKey(walletAddr), "1");
      toast.success(`💰 You received ${INITIAL_USDT} test USDT!`);
    }
  }, [walletAddr, connected]);

  // 🧮 Fetch live token prices
  const fetchPrice = async (token) => {
    const ids = {
      SOL: "solana",
      USDC: "usd-coin",
      USDT: "tether",
      BONK: "bonk",
      RAY: "raydium",
      SRM: "serum",
    };
    const id = ids[token];
    if (!id) return 1;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const data = await res.json();
    return data[id]?.usd || 1;
  };

  // 🔁 Update conversion preview
  const updateConversion = async (amt, from, to) => {
    if (!amt || Number(amt) <= 0) return setToAmount("≈ 0.00");
    const fromPrice = await fetchPrice(from);
    const toPrice = await fetchPrice(to);
    const converted = (amt * fromPrice) / toPrice;
    setToAmount(`≈ ${converted.toFixed(4)}`);
  };

  // 🏅 Award points
  const awardPoints = useCallback(
    (amount = POINTS_PER_SWAP) => {
      if (!walletAddr) return;
      const current = Number(localStorage.getItem(ptsKey(walletAddr)) || 0);
      const updated = current + amount;
      localStorage.setItem(ptsKey(walletAddr), String(updated));
      setPoints(updated);
      toast.success(`🌟 +${amount} points earned!`);
    },
    [walletAddr]
  );

  // 🔄 Handle swap click
  const handleSwap = async () => {
    if (!connected) return toast.error("Connect your wallet first");
    if (!amount || Number(amount) <= 0) return toast.error("Enter a valid amount");

    const fromBal = Number(localStorage.getItem(balKey(walletAddr, fromToken)) || 0);
    if (fromBal < Number(amount)) return toast.error("Insufficient balance");

    try {
      const fromPrice = await fetchPrice(fromToken);
      const toPrice = await fetchPrice(toToken);
      const converted = (amount * fromPrice) / toPrice;

      // Update balances
      localStorage.setItem(balKey(walletAddr, fromToken), String(fromBal - Number(amount)));
      const toBal = Number(localStorage.getItem(balKey(walletAddr, toToken)) || 0);
      localStorage.setItem(balKey(walletAddr, toToken), String(toBal + converted));

      awardPoints();
      toast.success(`✅ Swapped ${amount} ${fromToken} → ${converted.toFixed(3)} ${toToken}`);
      updateConversion(amount, fromToken, toToken);
    } catch (err) {
      toast.error("Swap failed, try again");
    }
  };

  return (
    <>
      {/* Top glossy horizontal line */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-black/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Title Section */}
     <div className="text-center mb-10">
  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
    Instant <span className="text-white/70">Swap</span>
  </h1>
  <p className="text-white/50 text-base sm:text-lg font-light tracking-wide">
    Effortlessly exchange tokens and earn rewards
  </p>
</div>


        <Toaster position="top-center" reverseOrder={false} />

        <div className="max-w-md mx-auto border border-white/20 rounded-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 shadow-lg hover:border-white/40 transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Swap</h2>

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
          </div>

          {/* 🌟 Points Display */}
          {connected && (
            <div className="text-sm text-white/70 mb-3 flex justify-end items-center gap-2">
              <span className="text-yellow-400 text-lg">🌟</span>
              <span>
                Points: <b className="text-white">{points}</b>
              </span>
            </div>
          )}

          {/* From Token */}
          <div className="mb-4">
            <label className="text-sm text-white/60">From</label>
            <div className="flex justify-between items-center mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val);
                  updateConversion(val, fromToken, toToken);
                }}
                className="bg-transparent text-white text-xl outline-none w-1/2"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-black/40 text-white text-sm border border-white/10 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
              >
                {tokens.map((token) => (
                  <option key={token} value={token} className="bg-black">
                    {token}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center my-3">
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
                updateConversion(amount, toToken, fromToken);
              }}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <ArrowDownUp className="text-white w-5 h-5" />
            </motion.button>
          </div>

          {/* To Token */}
          <div className="mb-6">
            <label className="text-sm text-white/60">To</label>
            <div className="flex justify-between items-center mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-white text-xl">{toAmount}</span>
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-black/40 text-white text-sm border border-white/10 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
              >
                {tokens.map((token) => (
                  <option key={token} value={token} className="bg-black">
                    {token}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSwap}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
            bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30 
            hover:from-purple-500/50 hover:to-pink-500/50 
            text-white font-semibold tracking-wide 
            border border-white/10 transition-all"
          >
            Swap Now
          </motion.button>

          {/* 💰 Balance Display */}
          {connected && (
            <div className="text-xs text-white/50 mt-3 text-right">
              Balance:{" "}
              {Number(localStorage.getItem(balKey(walletAddr, fromToken)) || 0).toFixed(2)}{" "}
              {fromToken}
            </div>
          )}
        </div>

        {/* Bottom glossy line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </>
  );
}
