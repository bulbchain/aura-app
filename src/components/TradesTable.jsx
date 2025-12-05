export function TradesTable({ trades }) {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Trade ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entry Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Exit Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">P/L</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Timeframe</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Signal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entry Time</th>
            </tr>
          </thead>

          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono text-slate-300">
                  {trade.id.slice(0, 8)}
                </td>

                <td className="px-6 py-4 text-sm font-mono text-white">
                  ${trade.entryPrice.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-sm font-mono text-white">
                  ${trade.exitPrice.toFixed(2)}
                </td>

                <td
                  className={`px-6 py-4 text-sm font-mono font-bold ${
                    trade.profitLoss > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.profitLoss > 0 ? "+" : ""}${trade.profitLoss.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-sm text-slate-300">
                  {trade.timeframe}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trade.signal === "Buy"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {trade.signal}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(trade.entryTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
