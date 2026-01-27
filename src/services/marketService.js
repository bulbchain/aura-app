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
        question: "Will Bitcoin (BTC) reach $100,000 by end of 2024?",
        outcomes: [
          { name: "Yes", price: 0.45, probability: 45, tokenAddress: null },
          { name: "No", price: 0.55, probability: 55, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 1250000,
        liquidity: 450000,
        imageUrl: null
      },
      {
        id: "poly-2",
        source: "polymarket",
        question: "Will Ethereum (ETH) reach $5,000 by Q2 2025?",
        outcomes: [
          { name: "Yes", price: 0.62, probability: 62, tokenAddress: null },
          { name: "No", price: 0.38, probability: 38, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 890000,
        liquidity: 320000,
        imageUrl: null
      },
      {
        id: "poly-3",
        source: "polymarket",
        question: "Will Solana (SOL) price exceed $200 by end of Q1 2025?",
        outcomes: [
          { name: "Yes", price: 0.35, probability: 35, tokenAddress: null },
          { name: "No", price: 0.65, probability: 65, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 2100000,
        liquidity: 780000,
        imageUrl: null
      },
      {
        id: "poly-4",
        source: "polymarket",
        question: "Will total crypto market cap exceed $5 trillion by end of 2025?",
        outcomes: [
          { name: "Yes", price: 0.28, probability: 28, tokenAddress: null },
          { name: "No", price: 0.72, probability: 72, tokenAddress: null }
        ],
        category: "Crypto",
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 3400000,
        liquidity: 1200000,
        imageUrl: null
      },
      {
        id: "poly-5",
        source: "polymarket",
        question: "Will USDC maintain its $1 peg throughout 2025?",
        outcomes: [
          { name: "Yes", price: 0.95, probability: 95, tokenAddress: null },
          { name: "No", price: 0.05, probability: 5, tokenAddress: null }
        ],
        category: "Stablecoins",
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        volume: 560000,
        liquidity: 210000,
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
