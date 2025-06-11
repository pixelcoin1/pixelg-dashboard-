import { useEffect, useState } from "react";
import { ethers } from "ethers";
import logo from "./logo.png";
import abi from "./PixelGCoinABI.json";

const contractAddress = "0x600Fd6D03E5ad3C40a8FCf8cb70CdF589F617C8B";

export default function App() {
  const [account, setAccount] = useState("");
  const [pxgBalance, setPxgBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        setAccount(addr);

        const token = new ethers.Contract(contractAddress, abi, signer);
        setContract(token);

        const balance = await token.balanceOf(addr);
        setPxgBalance(ethers.formatUnits(balance, 18));

        const owner = await token.owner();
        setIsOwner(owner.toLowerCase() === addr.toLowerCase());
      }
    };
    init();
  }, []);

  const handleTransfer = async () => {
    const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
    await tx.wait();
    alert("Transfer abgeschlossen!");
  };

  const handleMint = async () => {
    const tx = await contract.mint(account, ethers.parseUnits(amount, 18));
    await tx.wait();
    alert("Mint abgeschlossen!");
  };

  const handleBurn = async () => {
    const tx = await contract.burn(ethers.parseUnits(amount, 18));
    await tx.wait();
    alert("Burn abgeschlossen!");
  };

  const handlePause = async () => {
    const tx = await contract.pause();
    await tx.wait();
    alert("Token pausiert!");
  };

  const handleUnpause = async () => {
    const tx = await contract.unpause();
    await tx.wait();
    alert("Token wieder aktiv!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <img src={logo} alt="PixelG Logo" className="w-24 h-24 mx-auto rounded-full shadow" />
      <h1 className="text-2xl font-bold text-center">PixelG Coin Dashboard</h1>
      <p><strong>Adresse:</strong> {account}</p>
      <p><strong>PXG:</strong> {pxgBalance}</p>

      <input className="border p-2 w-full" placeholder="Empfänger" onChange={(e) => setRecipient(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Menge" onChange={(e) => setAmount(e.target.value)} />

      <button onClick={handleTransfer} className="bg-blue-500 text-white p-2 rounded w-full">Transfer</button>
      <button onClick={handleBurn} className="bg-red-500 text-white p-2 rounded w-full">Burn</button>

      {isOwner && (
        <>
          <button onClick={handleMint} className="bg-green-500 text-white p-2 rounded w-full">Mint</button>
          <button onClick={handlePause} className="bg-yellow-500 text-white p-2 rounded w-full">Pause</button>
          <button onClick={handleUnpause} className="bg-yellow-600 text-white p-2 rounded w-full">Unpause</button>
        </>
      )}
    </div>
  );
}
