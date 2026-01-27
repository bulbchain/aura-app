# Production Setup Guide

This guide will help you configure the prediction market for production use on Solana Mainnet.

## 🚀 Quick Start

### 1. Network Configuration

The app is now configured to use **Solana Mainnet** by default. To change networks, create a `.env` file in the root directory:

```env
# For Production (Mainnet)
VITE_SOLANA_NETWORK=mainnet-beta

# For Testing (Devnet)
# VITE_SOLANA_NETWORK=devnet
```

### 2. RPC Endpoint Setup

For production, it's **highly recommended** to use a premium RPC provider for better performance and reliability:

#### Option A: Helius (Recommended)
1. Sign up at [helius.dev](https://helius.dev)
2. Get your API key
3. Add to `.env`:
```env
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
```

#### Option B: QuickNode
1. Create account at [quicknode.com](https://quicknode.com)
2. Create a Solana Mainnet endpoint
3. Add to `.env`:
```env
VITE_SOLANA_RPC_URL=https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_TOKEN/
```

#### Option C: Alchemy
1. Sign up at [alchemy.com](https://alchemy.com)
2. Create a Solana app
3. Add to `.env`:
```env
VITE_SOLANA_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

**Note:** If no custom RPC is provided, the app will use the public Solana RPC (slower, rate-limited).

### 3. Program Configuration

Before going live, you need to:

1. **Deploy your prediction market program** to Solana Mainnet
2. **Update the program IDs** in `.env`:
```env
VITE_BET_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
VITE_ESCROW_ACCOUNT=YOUR_ESCROW_ACCOUNT_ADDRESS
```

### 4. Environment Variables

Create a `.env` file with the following:

```env
# Network
VITE_SOLANA_NETWORK=mainnet-beta

# RPC Endpoint (optional, uses public if not set)
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Program IDs (replace with your deployed program)
VITE_BET_PROGRAM_ID=YOUR_PROGRAM_ID
VITE_ESCROW_ACCOUNT=YOUR_ESCROW_ACCOUNT
```

## 📋 Production Checklist

- [ ] Network set to `mainnet-beta`
- [ ] Premium RPC endpoint configured
- [ ] Prediction market program deployed
- [ ] Program IDs updated in `.env`
- [ ] Escrow account configured
- [ ] Tested with small amounts first
- [ ] Security audit completed
- [ ] Error handling tested
- [ ] Transaction confirmation flow tested

## 🔒 Security Considerations

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment variables** for all sensitive configuration
3. **Test thoroughly on devnet** before mainnet deployment
4. **Start with small bet amounts** to verify everything works
5. **Monitor transactions** on Solana Explorer

## 💰 Transaction Costs

- **Transaction Fee:** ~0.000005 SOL (5000 lamports)
- **Minimum Bet:** 0.01 SOL (configurable in `solanaConfig.js`)
- **Maximum Bet:** 1000 SOL (configurable in `solanaConfig.js`)

## 🔍 Verifying Transactions

All transactions are recorded on-chain and can be viewed on:
- **Solana Explorer:** https://explorer.solana.com
- Transaction links are automatically provided after each bet

## 🐛 Troubleshooting

### "Insufficient balance" error
- Ensure wallet has enough SOL for bet + transaction fee
- Check that you're connected to the correct network

### Transaction fails
- Check RPC endpoint is working
- Verify program IDs are correct
- Ensure escrow account is properly configured

### Network mismatch
- Verify `.env` file has correct network
- Clear browser cache and restart dev server

## 📚 Additional Resources

- [Solana Documentation](https://docs.solana.com)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

## ⚠️ Important Notes

1. **This is production-ready code** - All transactions are real and irreversible
2. **Test on devnet first** - Always test thoroughly before mainnet
3. **Use premium RPC** - Public RPC has rate limits and can be unreliable
4. **Monitor your program** - Keep track of all transactions and balances
5. **Have a support plan** - Users may need help with transactions

## 🎯 Next Steps

1. Deploy your prediction market program
2. Configure environment variables
3. Test with small amounts
4. Monitor and iterate
5. Scale up gradually

---

**Ready for production?** Make sure you've completed the checklist above and tested everything thoroughly!
