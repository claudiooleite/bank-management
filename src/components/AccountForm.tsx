"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAccount, updateAccount } from "../redux/slices/accountSlice";
import { AppDispatch } from "../redux/store";

export default function AccountForm({
  existingAccount,
  clearEdit,
}: {
  existingAccount?: any;
  clearEdit: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [ownerId, setOwnerId] = useState(existingAccount?.ownerId || "");
  const [currency, setCurrency] = useState(existingAccount?.currency || "USD");
  const [balance, setBalance] = useState(existingAccount?.balance || "");

  // Update form when editing an account
  useEffect(() => {
    if (existingAccount) {
      setOwnerId(existingAccount.ownerId);
      setCurrency(existingAccount.currency);
      setBalance(existingAccount.balance);
    }
  }, [existingAccount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountData = { ownerId, currency, balance: Number(balance) };

    if (existingAccount) {
      dispatch(updateAccount(accountData));
    } else {
      dispatch(addAccount(accountData));
    }

    // Reset form after submission
    clearEdit();
    setOwnerId("");
    setCurrency("USD");
    setBalance("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{existingAccount ? "Edit Account" : "Create Account"}</h3>
      <input
        type="text"
        placeholder="Owner ID"
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        required
        disabled={!!existingAccount}
      />
      <input
        type="text"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
      />
      <button type="submit">{existingAccount ? "Update" : "Create"}</button>
      {existingAccount && (
        <button type="button" onClick={clearEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
