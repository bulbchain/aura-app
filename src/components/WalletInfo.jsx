import { useWallet } from "@solana/wallet-adapter-react";

const WalletInfo = () => {
  const { publicKey } = useWallet();

  return (
    <div>
      {publicKey ? (
        <p>Connected Wallet: {publicKey.toBase58()}</p>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
};
export default WalletInfo;