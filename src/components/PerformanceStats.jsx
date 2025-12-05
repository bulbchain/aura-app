export function PerformanceStats({
  winRate,
  totalTrades,
  avgProfitPerTrade,
  maxDrawdown,
  sharpeRatio,
  profitFactor,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Win Rate</p>
        <p className="text-2xl font-bold text-green-400">{winRate}%</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Total Trades</p>
        <p className="text-2xl font-bold text-white">{totalTrades}</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Avg Profit/Trade</p>
        <p className="text-2xl font-bold text-green-400">
          ${avgProfitPerTrade}
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Max Drawdown</p>
        <p className="text-2xl font-bold text-red-400">-{maxDrawdown}%</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Sharpe Ratio</p>
        <p className="text-2xl font-bold text-blue-400">{sharpeRatio}</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-2">Profit Factor</p>
        <p className="text-2xl font-bold text-purple-400">{profitFactor}</p>
      </div>
    </div>
  );
}
