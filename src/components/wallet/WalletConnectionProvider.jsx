import React, { useMemo } from "react";
import {ConnectionProvider,WalletProvider,} from "@solana/wallet-adapter-react";
import {WalletModalProvider,} from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter,SolflareWalletAdapter,TorusWalletAdapter,} from "@solana/wallet-adapter-wallets";
import { NETWORK_CONFIG, getClusterApiUrl } from "../../config/solanaConfig";

import "@solana/wallet-adapter-react-ui/styles.css"; // Default UI styles

export const WalletConnectionProvider = ({ children }) => {
  // Use production mainnet-beta network
  // Can be overridden with VITE_SOLANA_NETWORK environment variable
  const network = NETWORK_CONFIG.network;
  const endpoint = useMemo(() => {
    // Use custom RPC if provided, otherwise use cluster API URL
    return NETWORK_CONFIG.rpcEndpoint || getClusterApiUrl(network);
  }, [network]);

  // Wallets to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
