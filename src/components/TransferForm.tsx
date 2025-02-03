"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { makeTransfer } from "../redux/slices/transferSlice";

export default function TransferForm() {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const transferStatus = useSelector(
    (state: RootState) => state.transfer.status,
  );
  const transferError = useSelector((state: RootState) => state.transfer.error);

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Debugging: Log input values before submitting
    console.log("Submitting Transfer:", { fromAccount, toAccount, amount });

    if (!fromAccount || !toAccount || !amount) {
      alert("Please fill in all fields before transferring.");
      return;
    }

    dispatch(
      makeTransfer({
        fromAccountId: fromAccount,
        toAccountId: toAccount,
        amount: Number(amount),
      }),
    );

    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="text-xl font-semibold mb-2">Transfer Funds</h3>
      <select
        value={fromAccount}
        onChange={(e) => setFromAccount(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      >
        <option value="">Select Sender</option>
        {accounts.map((acc) => (
          <option key={acc.ownerId} value={acc.ownerId}>
            {acc.ownerName} ({acc.currency}) - {acc.balance}
          </option>
        ))}
      </select>

      <select
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        required
        className="border p-2 rounded mb-2"
      >
        <option value="">Select Receiver</option>
        {accounts.map((acc) => (
          <option key={acc.ownerId} value={acc.ownerId}>
            {acc.ownerName} ({acc.currency}) - {acc.balance}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded mb-2"
        required
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Transfer</button>

      {/* Show loading state */}
      {transferStatus === "loading" && <p>Processing transfer...</p>}
      {transferStatus === "failed" && (
        <p style={{ color: "red" }}>Error: {transferError}</p>
      )}
    </form>
  );
}
