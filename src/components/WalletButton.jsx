import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletButton = () => {
  return (
    <div className="">
      {/* <h1 className="text-2xl mb-4">Solana Wallet Connect 🚀</h1> */}
      <WalletMultiButton />
    </div>
  );
};

export default WalletButton;
