/**
 * Market Service - Fetches prediction markets from external APIs
 * Supports multiple market providers (Polymarket, Kalshi/DFlow, etc.)
 */

// Configuration
const POLYMARKET_API = "https://clob.polymarket.com";
const SOLANA_RPC = "https://api.devnet.solana.com";

/**
 * Fetch markets from Polymarket API
 * Note: Polymarket uses a GraphQL API, but we'll use a simplified approach
 * For production, you'd want to use their official API or GraphQL endpoint
 */
export async function fetchPolymarketMarkets() {
  try {
    // In production, you would use the actual Polymarket API
    // For now, we'll create realistic mock data based on real market structure
    // You can replace this with actual API calls:
    // const response = await fetch(`${POLYMARKET_API}/markets`);
    
    // Mock data representing real prediction markets
const mockMarkets = [
  {
    id: "poly-1",
    source: "polymarket",
    question: "Will Bitcoin (BTC) be above $100,000 by March 31, 2026?",
    outcomes: [
      { name: "Yes", price: 0.38, probability: 38, tokenAddress: null },
      { name: "No", price: 0.62, probability: 62, tokenAddress: null }
    ],
    category: "Crypto",
    endDate: new Date("2026-03-31T23:59:59Z").toISOString(),
    volume: 6800000,
    liquidity: 2200000,
    imageUrl: null
  },
  {
    id: "poly-2",
    source: "polymarket",
    question: "Will Bitcoin (BTC) be above $120,000 by June 30, 2026?",
    outcomes: [
      { name: "Yes", price: 0.29, probability: 29, tokenAddress: null },
      { name: "No", price: 0.71, probability: 71, tokenAddress: null }
    ],
    category: "Crypto",
    endDate: new Date("2026-06-30T23:59:59Z").toISOString(),
    volume: 5400000,
    liquidity: 1700000,
    imageUrl: null
  },
  {
    id: "poly-3",
    source: "polymarket",
    question: "Will Ethereum (ETH) be above $4,000 by May 31, 2026?",
    outcomes: [
      { name: "Yes", price: 0.47, probability: 47, tokenAddress: null },
      { name: "No", price: 0.53, probability: 53, tokenAddress: null }
    ],
    category: "Crypto",
    endDate: new Date("2026-05-31T23:59:59Z").toISOString(),
    volume: 3200000,
    liquidity: 1020000,
    imageUrl: null
  },
  {
    id: "poly-4",
    source: "polymarket",
    question: "Will Solana (SOL) exceed $200 by December 31, 2026?",
    outcomes: [
      { name: "Yes", price: 0.25, probability: 25, tokenAddress: null },
      { name: "No", price: 0.75, probability: 75, tokenAddress: null }
    ],
    category: "Crypto",
    endDate: new Date("2026-12-31T23:59:59Z").toISOString(),
    volume: 2900000,
    liquidity: 930000,
    imageUrl: null
  },
  {
    id: "poly-5",
    source: "polymarket",
    question: "Will the total crypto market cap exceed $3 trillion by September 30, 2026?",
    outcomes: [
      { name: "Yes", price: 0.53, probability: 53, tokenAddress: null },
      { name: "No", price: 0.47, probability: 47, tokenAddress: null }
    ],
    category: "Crypto",
    endDate: new Date("2026-09-30T23:59:59Z").toISOString(),
    volume: 4100000,
    liquidity: 1500000,
    imageUrl: null
  },
  {
    id: "poly-6",
    source: "polymarket",
    question: "Will USDC remain within $0.99–$1.01 throughout 2026?",
    outcomes: [
      { name: "Yes", price: 0.88, probability: 88, tokenAddress: null },
      { name: "No", price: 0.12, probability: 12, tokenAddress: null }
    ],
    category: "Stablecoins",
    endDate: new Date("2026-12-31T23:59:59Z").toISOString(),
    volume: 2300000,
    liquidity: 780000,
    imageUrl: null
  }
];



    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockMarkets;
  } catch (error) {
    console.error("Error fetching Polymarket markets:", error);
    return [];
  }
}

/**
 * Fetch markets from Kalshi/DFlow (Solana-based)
 * This would integrate with DFlow's API when available
 */
export async function fetchKalshiMarkets() {
  try {
    // Mock data for Kalshi/DFlow markets
    // In production, use: https://api.dflow.solana.com/markets
    const mockMarkets = [
      {
        id: "kalshi-1",
        source: "kalshi",
        question: "Will Bitcoin ETF see net inflows in January 2025?",
        outcomes: [
          { name: "Yes", price: 0.68, probability: 68, tokenAddress: null },
          { name: "No", price: 0.32, probability: 32, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 980000,
        liquidity: 350000,
        imageUrl: null
      },
      {
        id: "kalshi-2",
        source: "kalshi",
        question: "Will Ethereum complete the Dencun upgrade successfully?",
        outcomes: [
          { name: "Yes", price: 0.88, probability: 88, tokenAddress: null },
          { name: "No", price: 0.12, probability: 12, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 450000,
        liquidity: 180000,
        imageUrl: null
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMarkets;
  } catch (error) {
    console.error("Error fetching Kalshi markets:", error);
    return [];
  }
}

/**
 * Fetch all available markets from all sources
 */
export async function fetchAllMarkets() {
  try {
    const [polymarketMarkets, kalshiMarkets] = await Promise.all([
      fetchPolymarketMarkets(),
      fetchKalshiMarkets()
    ]);

    return [...polymarketMarkets, ...kalshiMarkets];
  } catch (error) {
    console.error("Error fetching all markets:", error);
    return [];
  }
}

/**
 * Get market details by ID
 */
export async function getMarketDetails(marketId) {
  const allMarkets = await fetchAllMarkets();
  return allMarkets.find(m => m.id === marketId);
}
