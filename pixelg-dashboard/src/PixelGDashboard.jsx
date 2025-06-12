
import React from "react";

export default function PixelGDashboard() {
  const tokenAddress = "0x600Fd6D03E5ad3C40a8FCf8cb70CdF589F617C8B";
  const walletAddress = "0xE25BF77469303214B668Dcd2966c27c69EA9594E";

  const addToMetaMask = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: "PXG",
            decimals: 18,
            image: "https://pixelg-dashboard.vercel.app/logo.png",
          },
        },
      });
    } catch (error) {
      console.error("MetaMask hinzufügen fehlgeschlagen", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 text-center">
        <img
          src="/controller_coin_logo_256x256.png"
          alt="PixelG Logo"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">PixelGCoin (PXG)</h1>
        <p className="text-gray-600 mb-4">
          Willkommen beim offiziellen Dashboard des PXG-Tokens auf der BNB Smart Chain. Hier findest du alle relevanten Infos und Funktionen.
        </p>

        <div className="mb-4">
          <strong>Token-Adresse:</strong>
          <p className="break-words text-blue-600">{tokenAddress}</p>
        </div>

        <div className="mb-4">
          <strong>Wallet-Adresse (Owner):</strong>
          <p className="break-words text-green-600">{walletAddress}</p>
        </div>

        <button
          onClick={addToMetaMask}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Zu MetaMask hinzufügen
        </button>
      </div>
    </div>
  );
}
