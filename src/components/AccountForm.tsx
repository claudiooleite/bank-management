"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../redux/slices/accountSlice";
import { AppDispatch } from "../redux/store";

export default function AccountForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [ownerName, setOwnerName] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountData = {
      ownerId: crypto.randomUUID(), // ✅ Generate unique ID
      ownerName,
      currency,
      balance: Number(balance),
    };

    dispatch(addAccount(accountData));

    // ✅ Reset the form after submission
    setOwnerName("");
    setCurrency("EUR");
    setBalance("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col ">
      <h3 className="text-xl font-semibold mb-2">Create New Account</h3>

      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      />

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 rounded mb-2"
      >
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
      </select>

      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Create Account
      </button>
    </form>
  );
}
