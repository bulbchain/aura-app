import React, { useMemo } from "react";
import {ConnectionProvider,WalletProvider,} from "@solana/wallet-adapter-react";
import {WalletModalProvider,} from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter,SolflareWalletAdapter,TorusWalletAdapter,} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css"; // Default UI styles

export const WalletConnectionProvider = ({ children }) => {
  // Connect to the devnet or mainnet-beta cluster
  const network = "devnet"; // can be "mainnet-beta" or "testnet"
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

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
