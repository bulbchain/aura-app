import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  X, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw,
  Wallet,
  Zap
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllMarkets, getMarketDetails } from "../services/marketService";
import { placeBetOnChain, getUserBets } from "../services/solanaBetService";
import { isMainnet, MIN_BET_AMOUNT_SOL, MAX_BET_AMOUNT_SOL } from "../config/solanaConfig";

export default function ExternalMarkets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [placingBet, setPlacingBet] = useState(false);
  const [userBets, setUserBets] = useState([]);
  const [solBalance, setSolBalance] = useState(0);

  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const walletAddr = publicKey?.toBase58?.();

  // Fetch markets on mount and when refresh is clicked
  const loadMarkets = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedMarkets = await fetchAllMarkets();
      setMarkets(fetchedMarkets);
      toast.success(`Loaded ${fetchedMarkets.length} markets`);
    } catch (error) {
      console.error("Error loading markets:", error);
      toast.error("Failed to load markets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMarkets();
  }, [loadMarkets]);

  // Fetch user's SOL balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !connection) return;
      try {
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (connected) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [publicKey, connection, connected]);

  // Fetch user's bet history
  useEffect(() => {
    const loadUserBets = async () => {
      if (!publicKey || !connection) return;
      try {
        const bets = await getUserBets(publicKey.toString(), connection);
        setUserBets(bets);
      } catch (error) {
        console.error("Error loading user bets:", error);
      }
    };

    if (connected) {
      loadUserBets();
    }
  }, [publicKey, connection, connected]);

  // Place bet on-chain
  const handlePlaceBet = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!selectedMarket || !selectedOutcome || !betAmount) {
      toast.error("Please select market, outcome, and enter amount");
      return;
    }

    const amount = Number(betAmount);
    if (amount <= 0) {
      toast.error("Invalid bet amount");
      return;
    }

    // Validate amount (now in SOL)
    if (amount < MIN_BET_AMOUNT_SOL) {
      toast.error(`Minimum bet amount is ${MIN_BET_AMOUNT_SOL} SOL`);
      return;
    }
    if (amount > MAX_BET_AMOUNT_SOL) {
      toast.error(`Maximum bet amount is ${MAX_BET_AMOUNT_SOL} SOL`);
      return;
    }

    // Check if user has enough SOL (including transaction fee)
    const estimatedFee = 0.000005; // ~5000 lamports
    const requiredSol = amount + estimatedFee;
    if (solBalance < requiredSol) {
      toast.error(
        `Insufficient balance. Need ${requiredSol.toFixed(4)} SOL (${amount.toFixed(4)} + ${estimatedFee.toFixed(6)} fee)`
      );
      return;
    }

    setPlacingBet(true);
    try {
      // Place bet on-chain using production-ready service
      const result = await placeBetOnChain(
        sendTransaction,
        publicKey,
        connection,
        selectedMarket.id,
        selectedOutcome,
        amount // Amount in SOL
      );

      if (result.success) {
        toast.success(
          (t) => (
            <div className="flex flex-col gap-1">
              <span>✅ Bet placed successfully!</span>
              <a
                href={result.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
                onClick={() => toast.dismiss(t.id)}
              >
                View on Explorer: {result.signature.slice(0, 8)}...
              </a>
            </div>
          ),
          { duration: 8000 }
        );

        // Save bet locally for tracking
        const betRecord = {
          marketId: selectedMarket.id,
          marketQuestion: selectedMarket.question,
          outcome: selectedOutcome,
          amount: amount,
          amountSol: amount,
          timestamp: new Date().toISOString(),
          signature: result.signature,
          explorerUrl: result.explorerUrl,
          slot: result.slot,
        };

        const existingBets = JSON.parse(
          localStorage.getItem(`external_bets_${walletAddr}`) || "[]"
        );
        existingBets.push(betRecord);
        localStorage.setItem(
          `external_bets_${walletAddr}`,
          JSON.stringify(existingBets)
        );

        // Reset form
        setBetAmount("");
        setSelectedMarket(null);
        setSelectedOutcome(null);

        // Reload balance
        const newBalance = await connection.getBalance(publicKey);
        setSolBalance(newBalance / 1e9);

        // Reload user bets
        const bets = await getUserBets(publicKey.toString(), connection);
        setUserBets(bets);
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      toast.error(`Bet failed: ${error.message}`);
    } finally {
      setPlacingBet(false);
    }
  };

  // Calculate odds display
  const getOddsDisplay = (outcome) => {
    if (!selectedMarket) return "N/A";
    const outcomeData = selectedMarket.outcomes.find((o) => o.name === outcome);
    if (!outcomeData) return "N/A";
    return `${outcomeData.probability}% ($${outcomeData.price.toFixed(2)})`;
  };

  // Check if market ended
  const isMarketEnded = (endDate) => {
    return new Date(endDate) < new Date();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-black/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                External <span className="text-white/70">Markets</span>
              </h1>
              <p className="text-white/50 text-sm sm:text-base">
                Bet on real prediction markets from Polymarket, Kalshi, and more
              </p>
            </div>

            <div className="flex items-center gap-4">
              {connected && (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                  <span className="text-white/70 text-sm">Balance:</span>
                  <span className="text-white font-bold ml-2">
                    {solBalance.toFixed(4)} SOL
                  </span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMarkets}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                text-white rounded-xl border border-white/10 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </motion.button>

              <WalletMultiButton className="!bg-white/10 !text-white !rounded-xl !border !border-white/20 
                hover:!bg-white/20 !transition-all" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-6xl mx-auto text-center py-20">
            <RefreshCw className="w-12 h-12 text-white/30 mx-auto mb-4 animate-spin" />
            <p className="text-white/50">Loading markets...</p>
          </div>
        )}

        {/* Markets Grid */}
        {!loading && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <TrendingUp className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/50 text-lg">No markets available</p>
              </div>
            ) : (
              markets.map((market) => (
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 
                  hover:border-white/40 transition-all relative"
                >
                  {/* Source Badge */}
                 <div className="absolute top-4 right-4">
                    <span className="text-xs px-2 py-1 
                    bg-cyan-500/10 text-cyan-300 
                    rounded-full 
                    border border-cyan-500/30 
                    shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {market.source}
                    </span>
                  </div>


                  <div className="mb-4">
                    <h3 className="text-white font-bold text-lg pr-16">{market.question}</h3>
                    <span className="text-xs text-white/50 mt-1 block">{market.category}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {market.outcomes.map((outcome) => (
                      <div
                        key={outcome.name}
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium">{outcome.name}</span>
                          <span className="text-white/70 text-sm">
                            {outcome.probability}%
                          </span>
                        </div>
                        <div className="text-xs text-white/50">
                          Price: ${outcome.price.toFixed(2)} • Volume: ${(market.volume / 1000).toFixed(0)}k
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {isMarketEnded(market.endDate)
                          ? "Ended"
                          : `Ends: ${new Date(market.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Liquidity: ${(market.liquidity / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  {!isMarketEnded(market.endDate) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (!connected) {
                          toast.error("Please connect your wallet first");
                          return;
                        }
                        setSelectedMarket(market);
                        setSelectedOutcome(null);
                        setBetAmount("");
                      }}
                      className="w-full py-2 
                              bg-cyan-500/10 text-cyan-300 
                              border border-cyan-500/30 
                              rounded-lg font-medium text-sm 
                              shadow-[0_0_15px_rgba(34,211,238,0.18)] 
                              hover:bg-cyan-500/20 
                              hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] 
                              hover:text-cyan-200 
                              transition-all 
                              flex items-center justify-center gap-2"

                    >
                      <Zap className="w-4 h-4" />
                      Place Bet (On-Chain)
                    </motion.button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Place Bet Modal */}
        <AnimatePresence>
          {selectedMarket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setSelectedMarket(null);
                setSelectedOutcome(null);
                setBetAmount("");
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-2xl font-bold">Place Bet (On-Chain)</h2>
                  <button
                    onClick={() => {
                      setSelectedMarket(null);
                      setSelectedOutcome(null);
                      setBetAmount("");
                    }}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">{selectedMarket.question}</p>
                    <div className="text-xs text-white/50">
                      Source: {selectedMarket.source} • Market ID: {selectedMarket.id}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/70 text-sm">Select Outcome</label>
                    {selectedMarket.outcomes.map((outcome) => (
                      <motion.button
                        key={outcome.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedOutcome(outcome.name)}
                        className={`w-full p-3 rounded-lg border transition-all ${
                        selectedOutcome === outcome.name
                            ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                            : "bg-white/5 text-white/80 border-white/10 hover:bg-cyan-500/5 hover:border-cyan-500/20 hover:text-cyan-200"
                        }`}

                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{outcome.name}</span>
                          <span className="text-white/70 text-sm">
                            {getOddsDisplay(outcome.name)}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Bet Amount (SOL)</label>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="0.00"
                      min={MIN_BET_AMOUNT_SOL}
                      max={MAX_BET_AMOUNT_SOL}
                      step="0.01"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                    />
                    <div className="text-xs text-white/50 mt-1">
                      Available: {solBalance.toFixed(4)} SOL
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      Min: {MIN_BET_AMOUNT_SOL} SOL • Max: {MAX_BET_AMOUNT_SOL} SOL
                    </div>
                    {isMainnet() && (
                      <div className="text-xs text-yellow-400/70 mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        ⚠️ Production Mode: This will create a real on-chain transaction on Solana Mainnet
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceBet}
                    disabled={!selectedOutcome || !betAmount || Number(betAmount) <= 0 || placingBet}
                    className="w-full py-3 
                            bg-cyan-500/10 text-cyan-300 
                            border border-cyan-500/30 
                            rounded-xl font-semibold 
                            shadow-[0_0_20px_rgba(34,211,238,0.2)] 
                            hover:bg-cyan-500/20 
                            hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] 
                            hover:text-cyan-200 
                            transition-all 
                            flex items-center justify-center gap-2

                            disabled:bg-white/5 
                            disabled:text-white/30 
                            disabled:border-white/10 
                            disabled:shadow-none 
                            disabled:cursor-not-allowed"
                  >
                    {placingBet ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Placing Bet...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Place Bet On-Chain
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </>
  );
}
