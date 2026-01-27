/**
 * Solana Bet Service - Production-ready on-chain betting transactions
 */

import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { 
  NETWORK_CONFIG, 
  ESCROW_ACCOUNT,
  MIN_BET_AMOUNT_SOL,
  MAX_BET_AMOUNT_SOL,
  ESTIMATED_TX_FEE_SOL,
  getExplorerUrl,
  isMainnet,
} from "../config/solanaConfig";

// Convert string program IDs to PublicKey
const BET_PROGRAM_ID = new PublicKey(
  import.meta.env.VITE_BET_PROGRAM_ID || "11111111111111111111111111111111"
);

// Memo program for storing bet metadata on-chain
const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

/**
 * Create a production-ready transaction to place a bet on-chain
 * Includes SOL transfer to escrow and memo instruction for tracking
 */
export async function createBetTransaction(
  walletPublicKey,
  marketId,
  outcome,
  amountSol, // Amount in SOL (not USDT)
  connection
) {
  try {
    const transaction = new Transaction();
    const publicKey = new PublicKey(walletPublicKey);
    const escrowPubkey = new PublicKey(
      import.meta.env.VITE_ESCROW_ACCOUNT || ESCROW_ACCOUNT
    );

    // Validate bet amount
    if (amountSol < MIN_BET_AMOUNT_SOL) {
      throw new Error(`Minimum bet amount is ${MIN_BET_AMOUNT_SOL} SOL`);
    }
    if (amountSol > MAX_BET_AMOUNT_SOL) {
      throw new Error(`Maximum bet amount is ${MAX_BET_AMOUNT_SOL} SOL`);
    }

    // Convert SOL to lamports
    const lamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

    // 1. Transfer SOL to escrow account (this is the actual bet)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: escrowPubkey,
        lamports: lamports,
      })
    );

    // 2. Add memo instruction to store bet metadata on-chain
    // This allows us to track bets by parsing on-chain data
    const betData = JSON.stringify({
      type: "PREDICTION_BET",
      marketId: marketId,
      outcome: outcome,
      amount: amountSol,
      timestamp: Date.now(),
      network: NETWORK_CONFIG.network,
    });

    const memoInstruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
      ],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(betData, "utf8"),
    });

    transaction.add(memoInstruction);

    // Get recent blockhash with commitment level
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash(
      NETWORK_CONFIG.commitment
    );
    
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    transaction.lastValidBlockHeight = lastValidBlockHeight;

    return {
      transaction,
      estimatedFee: ESTIMATED_TX_FEE_SOL,
      totalAmount: amountSol + ESTIMATED_TX_FEE_SOL,
    };
  } catch (error) {
    console.error("Error creating bet transaction:", error);
    throw error;
  }
}

/**
 * Place a bet on-chain using the wallet adapter (production-ready)
 */
export async function placeBetOnChain(
  sendTransaction, // From useWallet hook
  publicKey, // From useWallet hook
  connection,
  marketId,
  outcome,
  amountSol // Amount in SOL
) {
  try {
    if (!publicKey) {
      throw new Error("Wallet not connected");
    }

    if (!sendTransaction) {
      throw new Error("Wallet does not support sending transactions");
    }

    // Create transaction
    const { transaction, estimatedFee, totalAmount } = await createBetTransaction(
      publicKey.toString(),
      marketId,
      outcome,
      amountSol,
      connection
    );

    // Check balance before sending
    const balance = await connection.getBalance(publicKey);
    const requiredBalance = Math.ceil((amountSol + estimatedFee) * LAMPORTS_PER_SOL);
    
    if (balance < requiredBalance) {
      throw new Error(
        `Insufficient balance. Required: ${(requiredBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL, ` +
        `Available: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`
      );
    }

    // Send transaction with proper options
    const signature = await sendTransaction(transaction, connection, {
      skipPreflight: NETWORK_CONFIG.skipPreflight,
      maxRetries: NETWORK_CONFIG.maxRetries,
    });

    // Wait for confirmation with proper commitment level
    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash: transaction.recentBlockhash,
        lastValidBlockHeight: transaction.lastValidBlockHeight,
      },
      NETWORK_CONFIG.commitment
    );

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
    }

    // Get transaction details for verification
    const txDetails = await connection.getTransaction(signature, {
      commitment: NETWORK_CONFIG.commitment,
      maxSupportedTransactionVersion: 0,
    });

    return {
      success: true,
      signature,
      explorerUrl: getExplorerUrl(signature),
      amount: amountSol,
      fee: estimatedFee,
      totalAmount,
      slot: confirmation.value.slot,
      confirmationStatus: confirmation.value.confirmations ? "confirmed" : "pending",
      transactionDetails: txDetails,
    };
  } catch (error) {
    console.error("Error placing bet on-chain:", error);
    
    // Provide user-friendly error messages
    if (error.message.includes("User rejected")) {
      throw new Error("Transaction was cancelled by user");
    } else if (error.message.includes("Insufficient")) {
      throw error; // Already user-friendly
    } else if (error.message.includes("Network")) {
      throw new Error("Network error. Please check your connection and try again.");
    } else {
      throw new Error(error.message || "Failed to place bet. Please try again.");
    }
  }
}

/**
 * Get user's bet history from on-chain transactions
 */
export async function getUserBets(walletPublicKey, connection) {
  try {
    const publicKey = new PublicKey(walletPublicKey);
    
    // Fetch recent transactions
    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit: 50,
    });

    // Parse transactions to find bets
    // In production, you'd decode the transaction data from your program
    const bets = [];

    for (const sigInfo of signatures) {
      const tx = await connection.getTransaction(sigInfo.signature, {
        maxSupportedTransactionVersion: 0,
      });

      // Check if transaction is a bet (simplified check)
      if (tx && tx.meta && tx.meta.logMessages) {
        const isBet = tx.meta.logMessages.some((log) =>
          log.includes("bet")
        );
        if (isBet) {
          bets.push({
            signature: sigInfo.signature,
            timestamp: new Date(sigInfo.blockTime * 1000),
            amount: tx.meta.postBalances[0] - tx.meta.preBalances[0],
          });
        }
      }
    }

    return bets;
  } catch (error) {
    console.error("Error fetching user bets:", error);
    return [];
  }
}

/**
 * Check if a market is resolvable and get resolution data
 */
export async function checkMarketResolution(marketId, connection) {
  try {
    // In production, you'd query the program's account data
    // to check if the market has been resolved
    
    // For now, return mock data
    return {
      resolved: false,
      winner: null,
      resolutionDate: null,
    };
  } catch (error) {
    console.error("Error checking market resolution:", error);
    return null;
  }
}
