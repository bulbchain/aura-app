import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Clock, Users, Plus, X, CheckCircle2, Globe } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import toast, { Toaster } from "react-hot-toast";
import ExternalMarkets from "./ExternalMarkets";

// 🎁 Configurations
const INITIAL_BALANCE = 100; // USDT
const MARKET_CREATION_FEE = 5; // USDT

export default function PredictionMarket() {
  const [activeTab, setActiveTab] = useState("local"); // "local" or "external"
  const [markets, setMarkets] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [balance, setBalance] = useState(0);
  const [solPrice, setSolPrice] = useState(0);

  const { publicKey, connected } = useWallet();
  const walletAddr = publicKey?.toBase58?.();

  // 🔑 Helper keys for localStorage
  const balKey = (addr) => `prediction_balance_${addr}`;
  const marketsKey = () => `prediction_markets`;
  const betsKey = (addr) => `prediction_bets_${addr}`;
  const initKey = (addr) => `prediction_init_${addr}`;

  // 🪙 Load balance on wallet change
  useEffect(() => {
    if (!walletAddr) {
      setBalance(0);
      return;
    }
    const stored = localStorage.getItem(balKey(walletAddr));
    setBalance(stored ? Number(stored) : 0);
  }, [walletAddr]);

  // 🎁 Give initial balance once per wallet
  useEffect(() => {
    if (!connected || !walletAddr) return;
    const initBal = localStorage.getItem(initKey(walletAddr));

    if (!initBal) {
      localStorage.setItem(balKey(walletAddr), INITIAL_BALANCE.toString());
      localStorage.setItem(initKey(walletAddr), "1");
      setBalance(INITIAL_BALANCE);
      toast.success(`💰 You received ${INITIAL_BALANCE} test USDT for predictions!`);
    }
  }, [walletAddr, connected]);

  // 📊 Fetch SOL price from CoinGecko (existing API pattern)
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        setSolPrice(data.solana?.usd || 0);
      } catch (err) {
        console.error("Failed to fetch SOL price:", err);
      }
    };
    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // 📋 Load markets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(marketsKey());
    if (stored) {
      try {
        setMarkets(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to load markets:", err);
      }
    }
  }, []);

  // 💾 Save markets to localStorage
  const saveMarkets = useCallback((newMarkets) => {
    localStorage.setItem(marketsKey(), JSON.stringify(newMarkets));
    setMarkets(newMarkets);
  }, []);

  // 🆕 Create new market
  const handleCreateMarket = (e) => {
    e.preventDefault();
    if (!connected) return toast.error("Connect your wallet first");
    if (balance < MARKET_CREATION_FEE) {
      return toast.error(`Insufficient balance. Need ${MARKET_CREATION_FEE} USDT`);
    }

    const formData = new FormData(e.target);
    const question = formData.get("question");
    const outcome1 = formData.get("outcome1");
    const outcome2 = formData.get("outcome2");
    const endDate = formData.get("endDate");

    if (!question || !outcome1 || !outcome2 || !endDate) {
      return toast.error("Please fill all fields");
    }

    const newMarket = {
      id: Date.now().toString(),
      question,
      outcomes: [outcome1, outcome2],
      creator: walletAddr,
      endDate: new Date(endDate).toISOString(),
      createdAt: new Date().toISOString(),
      bets: {
        [outcome1]: { amount: 0, count: 0 },
        [outcome2]: { amount: 0, count: 0 },
      },
      resolved: false,
      winner: null,
      totalPool: 0,
    };

    const updatedMarkets = [...markets, newMarket];
    saveMarkets(updatedMarkets);

    // Deduct creation fee
    const newBalance = balance - MARKET_CREATION_FEE;
    localStorage.setItem(balKey(walletAddr), String(newBalance));
    setBalance(newBalance);

    setShowCreateModal(false);
    e.target.reset();
    toast.success("Market created successfully! 🎉");
  };

  // 🎲 Place a bet
  const handlePlaceBet = () => {
    if (!connected) return toast.error("Connect your wallet first");
    if (!selectedMarket || !selectedOutcome || !betAmount) {
      return toast.error("Select market, outcome, and amount");
    }

    const amount = Number(betAmount);
    if (amount <= 0 || amount > balance) {
      return toast.error("Invalid bet amount");
    }

    const market = markets.find((m) => m.id === selectedMarket);
    if (!market || market.resolved) {
      return toast.error("Market not found or already resolved");
    }

    if (new Date(market.endDate) < new Date()) {
      return toast.error("Market has ended");
    }

    // Update market bets
    const updatedMarkets = markets.map((m) => {
      if (m.id === selectedMarket) {
        const updatedBets = {
          ...m.bets,
          [selectedOutcome]: {
            amount: (m.bets[selectedOutcome]?.amount || 0) + amount,
            count: (m.bets[selectedOutcome]?.count || 0) + 1,
          },
        };
        const totalPool = Object.values(updatedBets).reduce(
          (sum, bet) => sum + bet.amount,
          0
        );

        return {
          ...m,
          bets: updatedBets,
          totalPool,
        };
      }
      return m;
    });

    saveMarkets(updatedMarkets);

    // Save user bet
    const userBets = JSON.parse(localStorage.getItem(betsKey(walletAddr)) || "[]");
    userBets.push({
      marketId: selectedMarket,
      outcome: selectedOutcome,
      amount,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(betsKey(walletAddr), JSON.stringify(userBets));

    // Deduct balance
    const newBalance = balance - amount;
    localStorage.setItem(balKey(walletAddr), String(newBalance));
    setBalance(newBalance);

    setBetAmount("");
    setSelectedMarket(null);
    setSelectedOutcome(null);
    toast.success(`Bet placed: ${amount} USDT on "${selectedOutcome}" 🎯`);
  };

  // ✅ Resolve market (creator only)
  const handleResolveMarket = (marketId, winner) => {
    if (!connected) return toast.error("Connect your wallet first");
    const market = markets.find((m) => m.id === marketId);
    if (!market) return toast.error("Market not found");
    if (market.creator !== walletAddr) {
      return toast.error("Only the creator can resolve this market");
    }
    if (market.resolved) return toast.error("Market already resolved");

    const updatedMarkets = markets.map((m) => {
      if (m.id === marketId) {
        return { ...m, resolved: true, winner };
      }
      return m;
    });

    saveMarkets(updatedMarkets);

    // Distribute winnings
    const resolvedMarket = updatedMarkets.find((m) => m.id === marketId);
    const userBets = JSON.parse(localStorage.getItem(betsKey(walletAddr)) || "[]");
    const winningBets = userBets.filter(
      (bet) => bet.marketId === marketId && bet.outcome === winner
    );

    if (winningBets.length > 0) {
      const totalWinningBets = winningBets.reduce((sum, bet) => sum + bet.amount, 0);
      const payoutRatio = resolvedMarket.totalPool / totalWinningBets;
      const userWinnings = winningBets.reduce(
        (sum, bet) => sum + bet.amount * payoutRatio,
        0
      );

      const newBalance = balance + userWinnings;
      localStorage.setItem(balKey(walletAddr), String(newBalance));
      setBalance(newBalance);

      toast.success(`Market resolved! You won ${userWinnings.toFixed(2)} USDT 🎉`);
    } else {
      toast.success("Market resolved!");
    }
  };

  // Calculate odds
  const calculateOdds = (market, outcome) => {
    if (market.totalPool === 0) return "50%";
    const outcomeAmount = market.bets[outcome]?.amount || 0;
    const odds = (outcomeAmount / market.totalPool) * 100;
    return `${odds.toFixed(1)}%`;
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

        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Prediction <span className="text-white/70">Markets</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg font-light tracking-wide">
            Bet on outcomes using Solana price data and market events
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-8 flex justify-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 inline-flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("local")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
               activeTab === "local"
  ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
  : "text-white/50 hover:text-white hover:bg-white/5"




              }`}
            >
              Local Markets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("external")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === "external"
  ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
  : "text-white/50 hover:text-white hover:bg-white/5"


              }`}
            >
              <Globe className="w-4 h-4" />
              External Markets (On-Chain)
            </motion.button>
          </div>
        </div>

        {/* Render based on active tab */}
        {activeTab === "external" ? (
          <ExternalMarkets />
        ) : (
          <>

        {/* Balance & Create Button */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          {connected && (
            <div className="flex items-center gap-4">
              <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                <span className="text-white/70 text-sm">Balance:</span>
                <span className="text-white font-bold text-xl ml-2">{balance.toFixed(2)} USDT</span>
              </div>
              {solPrice > 0 && (
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                  <span className="text-white/70 text-sm">SOL Price:</span>
                  <span className="text-white font-bold text-xl ml-2">${solPrice.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!connected) {
                toast.error("Connect your wallet first");
                return;
              }
              setShowCreateModal(true);
            }}
           className="flex items-center gap-2 px-6 py-3 
                      bg-cyan-500/10 text-cyan-300 
                      border border-cyan-500/30 
                      rounded-xl font-semibold 
                      shadow-[0_0_20px_rgba(34,211,238,0.2)] 
                      hover:bg-cyan-500/20 
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] 
                      hover:text-cyan-200 
                      transition-all"

          >
            <Plus className="w-5 h-5" />
            Create Market
          </motion.button>
        </div>

        {/* Markets Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <TrendingUp className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/50 text-lg">No markets yet. Create the first one!</p>
            </div>
          ) : (
            markets.map((market) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-white font-bold text-lg flex-1">{market.question}</h3>
                  {market.resolved && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  {market.outcomes.map((outcome) => {
                    const odds = calculateOdds(market, outcome);
                    const isWinner = market.resolved && market.winner === outcome;
                    return (
                      <div
                        key={outcome}
                        className={`p-3 rounded-lg border ${
                          isWinner
                            ? "bg-green-500/20 border-green-500/50"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium">{outcome}</span>
                          <span className="text-white/70 text-sm">{odds}</span>
                        </div>
                        <div className="text-xs text-white/50">
                          {market.bets[outcome]?.amount.toFixed(2) || "0.00"} USDT •{" "}
                          {market.bets[outcome]?.count || 0} bets
                        </div>
                      </div>
                    );
                  })}
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
                    <span>Pool: {market.totalPool.toFixed(2)} USDT</span>
                  </div>
                </div>

                {!market.resolved && !isMarketEnded(market.endDate) && connected && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedMarket(market.id);
                      setSelectedOutcome(null);
                      setBetAmount("");
                    }}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    Place Bet
                  </motion.button>
                )}

                {market.creator === walletAddr && !market.resolved && isMarketEnded(market.endDate) && (
                  <div className="mt-2 space-y-2">
                    {market.outcomes.map((outcome) => (
                      <motion.button
                        key={outcome}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleResolveMarket(market.id, outcome)}
                        className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 text-white rounded-lg transition-all text-sm font-medium"
                      >
                        Resolve: {outcome}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Create Market Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-2xl font-bold">Create Market</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateMarket} className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Question</label>
                    <input
                      name="question"
                      type="text"
                      placeholder="e.g., Will SOL price reach $200 by end of month?"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Outcome 1</label>
                    <input
                      name="outcome1"
                      type="text"
                      placeholder="e.g., Yes"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Outcome 2</label>
                    <input
                      name="outcome2"
                      type="text"
                      placeholder="e.g., No"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">End Date</label>
                    <input
                      name="endDate"
                      type="datetime-local"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div className="text-xs text-white/50 bg-white/5 p-3 rounded-lg">
                    Creation fee: {MARKET_CREATION_FEE} USDT
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 
                            bg-cyan-500/10 text-cyan-300 
                            border border-cyan-500/30 
                            rounded-xl font-semibold 
                            shadow-[0_0_20px_rgba(34,211,238,0.2)] 
                            hover:bg-cyan-500/20 
                            hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] 
                            hover:text-cyan-200 
                            transition-all"

                  >
                    Create Market
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <h2 className="text-white text-2xl font-bold">Place Bet</h2>
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

                {(() => {
                  const market = markets.find((m) => m.id === selectedMarket);
                  if (!market) return null;

                  return (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white font-medium mb-2">{market.question}</p>
                        <div className="text-xs text-white/50">
                          Pool: {market.totalPool.toFixed(2)} USDT
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Select Outcome</label>
                        {market.outcomes.map((outcome) => (
                          <motion.button
                            key={outcome}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedOutcome(outcome)}
                            className={`w-full p-3 rounded-lg border transition-all ${
                              selectedOutcome === outcome
                                ? "bg-purple-500/30 border-purple-500/50"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">{outcome}</span>
                              <span className="text-white/70 text-sm">
                                {calculateOdds(market, outcome)}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Bet Amount (USDT)</label>
                        <input
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          placeholder="0.00"
                          min="0.01"
                          max={balance}
                          step="0.01"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                        />
                        <div className="text-xs text-white/50 mt-1">
                          Available: {balance.toFixed(2)} USDT
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePlaceBet}
                        disabled={!selectedOutcome || !betAmount || Number(betAmount) <= 0}
                        className="w-full py-3 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30 
                        hover:from-purple-500/50 hover:to-pink-500/50 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        text-white font-semibold rounded-xl border border-white/10 transition-all"
                      >
                        Place Bet
                      </motion.button>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </>
        )}
      </div>
    </>
  );
}
