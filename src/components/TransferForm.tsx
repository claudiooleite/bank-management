"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { makeTransfer } from "../redux/slices/transferSlice";
import { useTranslations } from "next-intl";

/**
 * TransferForm Component
 * - Allows users to transfer funds between accounts.
 * - Validates input fields before submission.
 * - Dispatches a transfer action to update the Redux store.
 */
export default function TransferForm() {
  const dispatch = useDispatch<AppDispatch>();

  // Retrieve accounts and transfer status from Redux store
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const transferStatus = useSelector(
    (state: RootState) => state.transfer.status,
  );
  const transferError = useSelector((state: RootState) => state.transfer.error);

  // Component state for form inputs
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const t = useTranslations();

  /**
   * Handles the form submission
   * - Ensures all fields are filled before dispatching the transfer action.
   * - Dispatches the `makeTransfer` action with the selected accounts and amount.
   * - Resets the form fields after submission.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Reset the form after submission
    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{t("transferFunds")}</h3>

      {/* Sender Account Selection */}
      <select
        value={fromAccount}
        onChange={(e) => setFromAccount(e.target.value)}
        required
        className="border p-2 rounded mb-2">
        <option value="">{t("selectSender")}</option>
        {accounts.map((acc) => (
          <option key={acc.ownerId} value={acc.ownerId}>
            {acc.ownerName} ({acc.currency}) - {acc.balance}
          </option>
        ))}
      </select>

      {/* Receiver Account Selection */}
      <select
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        required
        className="border p-2 rounded mb-2">
        <option value="">{t("selectReceiver")}</option>
        {accounts.map((acc) => (
          <option key={acc.ownerId} value={acc.ownerId}>
            {acc.ownerName} ({acc.currency}) - {acc.balance}
          </option>
        ))}
      </select>

      {/* Transfer Amount Input */}
      <input
        type="number"
        placeholder={t("amount")}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded mb-2"
        required
        min={1}
      />

      {/* Transfer Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {t("transfer")}
      </button>

      {/* Display Loading, Success, or Error Messages */}
      {transferStatus === "loading" && (
        <p className="text-gray-600">Processing transfer...</p>
      )}
      {transferStatus === "failed" && (
        <p className="text-red-500">Error: {transferError}</p>
      )}
    </form>
  );
}
