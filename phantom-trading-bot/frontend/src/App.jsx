import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [tradingActive, setTradingActive] = useState(false);

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setWalletConnected(true);
        setWalletAddress(publicKey.toString());
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const response = await window.solana.connect();
      setWalletConnected(true);
      setWalletAddress(response.publicKey.toString());
      toast.success("Wallet conectada.");
    } catch {
      toast.error("Error al conectar la wallet.");
    }
  };

  const toggleTrading = async () => {
    const active = !tradingActive;
    setTradingActive(active);
    await fetch("http://localhost:8000/trading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    toast(`${active ? "Trading activado" : "Trading detenido"}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Phantom Trading Bot</h1>
      <div className="mb-4">
        {walletConnected ? (
          <p>Wallet conectada: {walletAddress}</p>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Conectar Wallet Phantom
          </button>
        )}
      </div>
      <div className="mb-4">
        <label className="mr-2">Trading Automático:</label>
        <input
          type="checkbox"
          checked={tradingActive}
          onChange={toggleTrading}
        />
      </div>
      <iframe
        src="https://dexscreener.com/solana"
        className="w-full h-[600px] border rounded"
        title="Dex Screener"
      />
    </div>
  );
}
