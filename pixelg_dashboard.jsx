import React, { useState } from "react";

export default function PixelGDashboard() {
  const tokenAddress = "0x600Fd6D03E5ad3C40a8FCf8cb70CdF589F617C8B";
  const walletAddress = "0xE25BF77469303214B668Dcd2966c27c69EA9594E";
  const [language, setLanguage] = useState("en");
  const [imageError, setImageError] = useState(false);

  const addToMetaMask = async () => {
    if (!window.ethereum || !window.ethereum.request) {
      alert("MetaMask is not available. Please install MetaMask extension.");
      return;
    }

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: "PXG",
            decimals: 18,
            image: `${window.location.origin}/controller_coin_logo_256x256.png`
          },
        },
      });

      if (wasAdded) {
        alert("PixelGCoin has been added to MetaMask!");
      } else {
        alert("You cancelled the MetaMask token addition.");
      }
    } catch (error) {
      console.error("MetaMask add error", error);
      alert("MetaMask hinzufügen fehlgeschlagen.");
    }
  };

  const content = {
    en: {
      title: "PixelGCoin (PXG)",
      description: "Welcome to the official dashboard of PixelGCoin – your token for the digital gaming future on the Binance Smart Chain. This project is part of a game development ecosystem.",
      token: "Token Address",
      wallet: "Wallet Address (Owner)",
      button: "Add to MetaMask",
      translator: "Türkçe'ye geç",
      nextLang: "tr"
    },
    tr: {
      title: "PixelGCoin (PXG)",
      description: "PixelGCoin'in resmi kontrol paneline hoş geldiniz – Binance Smart Chain üzerindeki dijital oyun geleceğiniz için token. Bu proje bir oyun geliştirme ekosisteminin parçasıdır.",
      token: "Token Adresi",
      wallet: "Cüzdan Adresi (Sahip)",
      button: "MetaMask'e Ekle",
      translator: "Deutsch'a geç",
      nextLang: "de"
    },
    de: {
      title: "PixelGCoin (PXG)",
      description: "Willkommen beim offiziellen Dashboard von PixelGCoin – deinem Token für die digitale Gaming-Zukunft auf der Binance Smart Chain. Dieses Projekt ist Teil eines Spieleentwicklungs-Ökosystems.",
      token: "Token-Adresse",
      wallet: "Wallet-Adresse (Inhaber)",
      button: "Zu MetaMask hinzufügen",
      translator: "Switch to English",
      nextLang: "en"
    }
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 text-center border border-purple-200">
        {!imageError ? (
          <img
            src="/controller_coin_logo_256x256.png"
            alt="PixelG Logo"
            onError={() => setImageError(true)}
            className="w-28 h-28 mx-auto mb-6 rounded-full shadow-md border-4 border-white"
          />
        ) : (
          <div className="w-28 h-28 mx-auto mb-6 rounded-full shadow-md border-4 border-white bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600">Logo not found</span>
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{lang.title}</h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{lang.description}</p>

        <div className="mb-6 text-left">
          <h2 className="font-semibold text-gray-800">🔹 {lang.token}:</h2>
          <p className="break-words text-purple-800 font-mono">{tokenAddress}</p>
        </div>

        <div className="mb-6 text-left">
          <h2 className="font-semibold text-gray-800">🔸 {lang.wallet}:</h2>
          <p className="break-words text-green-700 font-mono">{walletAddress}</p>
        </div>

        <button
          onClick={addToMetaMask}
          className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition transform duration-300"
        >
          🦊 {lang.button}
        </button>

        <button
          onClick={() => setLanguage(lang.nextLang)}
          className="mt-4 ml-2 text-sm text-blue-700 hover:underline"
        >
          🌐 {lang.translator}
        </button>

        <p className="mt-8 text-sm text-gray-500">Powered by Emre © 2025</p>
      </div>
    </div>
  );
}
