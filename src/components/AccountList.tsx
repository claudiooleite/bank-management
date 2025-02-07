"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  updateAccount,
  deleteAccount,
} from "../redux/slices/accountSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useTranslations } from "next-intl";

/**
 * AccountList Component
 * - Displays a list of bank accounts.
 * - Supports account editing, deleting, and filtering.
 * - Responsive layout for both desktop and mobile.
 */
export default function AccountList() {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const t = useTranslations();

  // Ensure component renders only on the client (fixes hydration issues)
  const [isClient, setIsClient] = useState(false);

  // Fetch accounts on component mount
  useEffect(() => {
    setIsClient(true);
    dispatch(fetchAccounts());
  }, [dispatch]);

  // Local state for edit mode and form values
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedAccounts, setEditedAccounts] = useState<{ [key: string]: any }>(
    {},
  );
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /** Handles input field changes for editing */
  const handleChange = (id: string, field: string, value: string | number) => {
    setEditedAccounts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  /** Enables edit mode for an account */
  const handleEdit = (id: string, account: any) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
    setEditedAccounts((prev) => ({
      ...prev,
      [id]: { ...account }, // Copy current account data
    }));
  };

  /** Saves the edited account to Redux */
  const handleSave = (id: string) => {
    if (!editedAccounts[id]) return;

    dispatch(updateAccount({ ...editedAccounts[id], ownerId: id }));

    // Reset edit mode and clear edited data
    setEditMode((prev) => ({ ...prev, [id]: false }));
    setExpandedAccount(null);
    setEditedAccounts((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  /** Cancels the editing process */
  const handleCancel = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
    setExpandedAccount(null);
    setEditedAccounts((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  // Filter accounts based on search query
  const filteredAccounts = accounts.filter(
    (account) =>
      account?.ownerName &&
      account.ownerName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Prevent server-side rendering issues
  if (!isClient) return null;

  return (
    <div className="p-4">
      {/* Header with Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t("bankAccount")}</h2>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full sm:w-64 mt-2 sm:mt-0"
        />
      </div>

      {/* ✅ Desktop & Tablet View (Table) */}
      <div className="hidden sm:block border rounded">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">{t("ownerName")}</th>
              <th className="p-2 border">{t("currency")}</th>
              <th className="p-2 border">{t("balance")}</th>
              <th className="p-2 border text-center">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.ownerId} className="hover:bg-gray-100">
                <td className="p-2 border">
                  {editMode[account.ownerId] ? (
                    <input
                      type="text"
                      placeholder={t("ownerName")}
                      value={
                        editedAccounts[account.ownerId]?.ownerName ??
                        account.ownerName
                      }
                      onChange={(e) =>
                        handleChange(
                          account.ownerId,
                          "ownerName",
                          e.target.value,
                        )
                      }
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>{account.ownerName}</span>
                  )}
                </td>

                <td className="p-2 border">
                  <span>{account.currency}</span>
                </td>

                <td className="p-2 border">
                  {editMode[account.ownerId] ? (
                    <input
                      type="number"
                      placeholder={t("balance")}
                      value={
                        editedAccounts[account.ownerId]?.balance ??
                        account.balance
                      }
                      onChange={(e) =>
                        handleChange(
                          account.ownerId,
                          "balance",
                          Number(e.target.value),
                        )
                      }
                      min={1}
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>
                      {account.currency === "EUR" ? "€" : "£"}
                      {typeof account.balance === "number"
                        ? account.balance.toFixed(2)
                        : "0.00"}
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="p-2 border flex gap-2 justify-center">
                  {editMode[account.ownerId] ? (
                    <>
                      <button
                        onClick={() => handleSave(account.ownerId)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel(account.ownerId)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(account.ownerId, account)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(deleteAccount(account.ownerId))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile View (Card Style) */}
      <div className="sm:hidden">
        {filteredAccounts.map((account) => (
          <div
            key={account.ownerId}
            className="bg-white border rounded-md p-4 mb-3">
            <div className="flex justify-between items-center">
              <div>
                {editMode[account.ownerId] ? (
                  <>
                    <input
                      type="text"
                      value={
                        editedAccounts[account.ownerId]?.ownerName ??
                        account.ownerName
                      }
                      onChange={(e) =>
                        handleChange(
                          account.ownerId,
                          "ownerName",
                          e.target.value,
                        )
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={
                        editedAccounts[account.ownerId]?.currency ??
                        account.currency
                      }
                      className="border p-2 w-full mb-2"
                      disabled
                    />
                    <input
                      type="number"
                      value={
                        editedAccounts[account.ownerId]?.balance ??
                        account.balance
                      }
                      onChange={(e) =>
                        handleChange(
                          account.ownerId,
                          "balance",
                          Number(e.target.value),
                        )
                      }
                      min={1}
                      className="border p-2 w-full mb-2"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">
                      {account.ownerName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {account.currency} -{" "}
                      {account.currency === "EUR" ? "€" : "£"}
                      {typeof account.balance === "number"
                        ? account.balance.toFixed(2)
                        : "0.00"}
                    </p>
                  </>
                )}
              </div>
              {!editMode[account.ownerId] && (
                <button
                  onClick={() => {
                    setExpandedAccount(account.ownerId); // Expand the account
                    handleEdit(account.ownerId, account); // Enable edit mode
                  }}
                  className="text-blue-500">
                  Edit
                </button>
              )}
            </div>

            {/* Show Save & Cancel Buttons Only in Edit Mode */}
            {editMode[account.ownerId] && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    handleSave(account.ownerId);
                    setExpandedAccount(null); // Close expanded section after saving
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded w-full">
                  Save
                </button>
                <button
                  onClick={() => handleCancel(account.ownerId)}
                  className="px-4 py-2 bg-gray-500 text-white rounded w-full">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
