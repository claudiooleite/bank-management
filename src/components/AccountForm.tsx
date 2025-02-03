"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../redux/slices/accountSlice";
import { AppDispatch } from "../redux/store";

export default function AccountForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [ownerName, setOwnerName] = useState("");
  const [currency, setCurrency] = useState("USD");
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
    setCurrency("USD");
    setBalance("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-2">Create New Account</h3>
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      />
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
