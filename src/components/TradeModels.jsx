export const tradeModels = [
  {
    id: "1",
    name: "LSTM Model",
    winRate: 68.5,
    totalTrades: 245,
    lastUpdated: "2 minutes ago",
    sparklineData: [
      { value: 1000 },
      { value: 1050 },
      { value: 1045 },
      { value: 1100 },
      { value: 1120 },
      { value: 1090 },
      { value: 1150 },
    ],
    description: "Deep learning LSTM model for trend prediction",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "XGBoost Model",
    winRate: 72.3,
    totalTrades: 312,
    lastUpdated: "1 minute ago",
    sparklineData: [
      { value: 1200 },
      { value: 1250 },
      { value: 1280 },
      { value: 1260 },
      { value: 1300 },
      { value: 1320 },
      { value: 1350 },
    ],
    description: "Ensemble tree-based model for classification",
    color: "#10B981",
  }, {
    id: "3",
    name: "Scalper Bot",
    winRate: 65.2,
    totalTrades: 1523,
    lastUpdated: "5 seconds ago",
    sparklineData: [
      { value: 950 },
      { value: 1000 },
      { value: 980 },
      { value: 1020 },
      { value: 1010 },
      { value: 1050 },
      { value: 1080 },
    ],
    description: "High-frequency scalping strategy",
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Swing AI",
    winRate: 71.8,
    totalTrades: 156,
    lastUpdated: "3 minutes ago",
    sparklineData: [
      { value: 1100 },
      { value: 1140 },
      { value: 1130 },
      { value: 1180 },
      { value: 1160 },
      { value: 1200 },
      { value: 1220 },
    ],
    description: "Medium-term swing trading AI",
    color: "#8B5CF6",
  },
  {
    id: "5",
    name: "Sniper V3",
    winRate: 74.1,
    totalTrades: 89,
    lastUpdated: "4 minutes ago",
    sparklineData: [
      { value: 1300 },
      { value: 1320 },
      { value: 1310 },
      { value: 1350 },
      { value: 1370 },
      { value: 1380 },
      { value: 1400 },
    ],
    description: "Precision entry point detection algorithm",
    color: "#EF4444",
  },
  // ...other models
];

export const generateModelDetail = (modelId) => {
  const baseModel = tradeModels.find((m) => m.id === modelId);

  const trades = Array.from({ length: 25 }, (_, i) => ({
    id: `trade-${i}`,
    modelId,
    entryPrice: 45000 + Math.random() * 2000,
    exitPrice: 45000 + Math.random() * 2000 + 100,
    profitLoss: (Math.random() - 0.3) * 500,
    timeframe: ["1m", "5m", "15m", "1h", "4h"][Math.floor(Math.random() * 5)],
    entryTime: new Date(Date.now() - i * 3600000).toISOString(),
    exitTime: new Date(Date.now() - i * 3600000 + 1800000).toISOString(),
    signal: Math.random() > 0.5 ? "Buy" : "Sell",
  }));

  const equityCurve = Array.from({ length: 100 }, (_, i) => ({
    timestamp: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
    value: 10000 + Math.random() * 2000 + i * 30,
  }));

  const dailyPnL = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (30 - i) * 86400000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric" })
      .split(" ")
      .join("\n"),
    profit: (Math.random() - 0.4) * 1000,
  }));

  return {
    ...baseModel,
    avgProfitPerTrade: 245.5,
    maxDrawdown: 8.3,
    sharpeRatio: 1.95,
    profitFactor: 2.1,
    trades,
    equityCurve,
    dailyPnL,
    winLossRatio: {
      wins: Math.floor(baseModel.totalTrades * (baseModel.winRate / 100)),
      losses: Math.floor(baseModel.totalTrades * (1 - baseModel.winRate / 100)),
    },
  };
};
