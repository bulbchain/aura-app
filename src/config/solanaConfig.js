/**
 * Solana Network Configuration
 * Production-ready configuration for mainnet-beta
 */

// Network configuration
export const NETWORK_CONFIG = {
  // Use mainnet-beta for production
  network: import.meta.env.VITE_SOLANA_NETWORK || "mainnet-beta",
  
  // Production RPC endpoints (use environment variables or fallback to public)
  // For production, use a reliable RPC provider like Helius, QuickNode, or Alchemy
  rpcEndpoint: import.meta.env.VITE_SOLANA_RPC_URL || 
    (import.meta.env.VITE_SOLANA_NETWORK === "mainnet-beta" 
      ? "https://api.mainnet-beta.solana.com" 
      : "https://api.devnet.solana.com"),
  
  // Alternative: Use a premium RPC provider for better performance
  // Examples:
  // - Helius: `https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY`
  // - QuickNode: `https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_TOKEN/`
  // - Alchemy: `https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY`
  
  // Transaction confirmation settings
  commitment: "confirmed", // "processed" | "confirmed" | "finalized"
  maxRetries: 3,
  skipPreflight: false,
};

// Bet program configuration
// In production, replace with your deployed program ID
export const BET_PROGRAM_ID = import.meta.env.VITE_BET_PROGRAM_ID || 
  "11111111111111111111111111111111"; // Placeholder - replace with actual program ID

// Escrow account for holding bet funds
// In production, this should be a PDA (Program Derived Address) from your program
export const ESCROW_ACCOUNT = import.meta.env.VITE_ESCROW_ACCOUNT || 
  "11111111111111111111111111111111"; // Placeholder

// Minimum bet amount in SOL
export const MIN_BET_AMOUNT_SOL = 0.01;

// Maximum bet amount in SOL (optional safety limit)
export const MAX_BET_AMOUNT_SOL = 1000;

// Transaction fee estimation (in SOL)
export const ESTIMATED_TX_FEE_SOL = 0.000005; // ~5000 lamports

// Get cluster API URL
export function getClusterApiUrl(network) {
  const networks = {
    "mainnet-beta": "https://api.mainnet-beta.solana.com",
    "testnet": "https://api.testnet.solana.com",
    "devnet": "https://api.devnet.solana.com",
  };
  return networks[network] || networks["mainnet-beta"];
}

// Check if we're on mainnet
export function isMainnet() {
  return NETWORK_CONFIG.network === "mainnet-beta";
}

// Get explorer URL for a transaction
export function getExplorerUrl(signature, network = NETWORK_CONFIG.network) {
  const baseUrl = network === "mainnet-beta" 
    ? "https://explorer.solana.com"
    : `https://explorer.solana.com?cluster=${network}`;
  return `${baseUrl}/tx/${signature}`;
}
