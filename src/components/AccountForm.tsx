"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../redux/slices/accountSlice";
import { AppDispatch } from "../redux/store";
import { useTranslations } from "next-intl";

/**
 * AccountForm Component
 * - Allows users to create a new bank account.
 * - Includes form validation to prevent invalid input.
 */
export default function AccountForm() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  // State for form inputs
  const [ownerName, setOwnerName] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [balance, setBalance] = useState("");

  /**
   * Handles form submission.
   * - Prevents default behavior.
   * - Validates and dispatches the new account data.
   * - Resets form fields after submission.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const accountData = {
      ownerId: crypto.randomUUID(), // Generates a unique ID for the new account
      ownerName,
      currency,
      balance: Number(balance),
    };

    dispatch(addAccount(accountData));

    // Reset the form after successful submission
    setOwnerName("");
    setCurrency("EUR");
    setBalance("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Form Title */}
      <h3 className="text-xl font-semibold mb-2">{t("createAccount")}</h3>

      {/* Owner Name Input */}
      <input
        type="text"
        placeholder={t("ownerName")}
        value={ownerName}
        onChange={(e) => {
          const value = e.target.value;
          // ✅ Restrict input to only letters, spaces, and hyphens
          if (/^[a-zA-Z\s-]*$/.test(value) || value === "") {
            setOwnerName(value);
          }
        }}
        required
        className="border p-2 rounded mb-2"
        minLength={3}
      />

      {/* Currency Selection Dropdown */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 rounded mb-2">
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
      </select>

      {/* Balance Input */}
      <input
        type="number"
        placeholder={t("balance")}
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
        min={1} // ✅ Ensures the balance is at least 1
        className="border p-2 rounded mb-2"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {t("createAccount")}
      </button>
    </form>
  );
}
