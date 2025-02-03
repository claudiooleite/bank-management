"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts, updateAccount, deleteAccount } from "../redux/slices/accountSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function AccountList() {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  // ✅ Fetch accounts on component load
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  // Local state for editing accounts
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedAccounts, setEditedAccounts] = useState<{ [key: string]: any }>({});
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null); // Tracks which account row is expanded

  // Handle changes in input fields
  const handleChange = (id: string, field: string, value: string | number) => {
    setEditedAccounts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Enable Edit Mode
  const handleEdit = (id: string, account: any) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
    setEditedAccounts((prev) => ({
      ...prev,
      [id]: { ...account }, // Copy existing account data
    }));
  };

  // Save Updated Account to Redux
  const handleSave = (id: string) => {
    if (!editedAccounts[id]) return;

    dispatch(updateAccount({ ...editedAccounts[id], ownerId: id }));
    setEditMode((prev) => ({ ...prev, [id]: false })); // Exit edit mode
    setExpandedAccount(null); // Hide expanded row after saving
    setEditedAccounts((prev) => {
      const newState = { ...prev };
      delete newState[id]; // Remove from edit state after saving
      return newState;
    });
  };

  // Cancel Editing
  const handleCancel = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
    setExpandedAccount(null); // Hide expanded row
    setEditedAccounts((prev) => {
      const newState = { ...prev };
      delete newState[id]; // Remove changes
      return newState;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Bank Accounts</h2>
      {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-200">
              <th className="p-2 border">Owner Name</th>
              <th className="p-2 border">Currency</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
               <React.Fragment key={account.ownerId}>
                {/* Normal Table Row (Desktop & Tablet) */}
                <tr
                  key={account.ownerId}
                  className="hover:bg-gray-100 hidden sm:table-row"
                >
                  <td className="p-2 border">{account.ownerName}</td>
                  <td className="p-2 border">{account.currency}</td>
                  <td className="p-2 border">${account.balance.toFixed(2)}</td>
                  <td className="p-2 border flex gap-2 justify-evenly">
                    <button
                      onClick={() => handleEdit(account.ownerId, account)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteAccount(account.ownerId))}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Mobile View (Hidden on Larger Screens) */}
                <tr
                  key={`${account.ownerId}-mobile`}
                  className="sm:hidden border-b border-gray-300"
                  onClick={() =>
                    setExpandedAccount((prev) =>
                      prev === account.ownerId ? null : account.ownerId
                    )
                  }
                >
                  <td className="p-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">{account.ownerName}</span>
                      <button className="text-sm text-blue-500">Edit</button>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {account.currency} - ${account.balance.toFixed(2)}
                    </div>
                  </td>
                </tr>

                {/* Expanded Actions Row for Mobile */}
                {expandedAccount === account.ownerId && (
                  <tr className="sm:hidden">
                    <td colSpan={3} className="p-3 bg-gray-50">
                      {editMode[account.ownerId] ? (
                        <>
                          <input
                            type="text"
                            value={
                              editedAccounts[account.ownerId]?.ownerName ??
                              account.ownerName
                            }
                            onChange={(e) =>
                              handleChange(account.ownerId, "ownerName", e.target.value)
                            }
                            className="border p-2 w-full mb-2"
                          />
                          <input
                            type="text"
                            value={
                              editedAccounts[account.ownerId]?.currency ??
                              account.currency
                            }
                            onChange={(e) =>
                              handleChange(account.ownerId, "currency", e.target.value)
                            }
                            className="border p-2 w-full mb-2"
                          />
                          <input
                            type="number"
                            value={
                              editedAccounts[account.ownerId]?.balance ??
                              account.balance
                            }
                            onChange={(e) =>
                              handleChange(account.ownerId, "balance", Number(e.target.value))
                            }
                            className="border p-2 w-full mb-2"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(account.ownerId)}
                              className="px-4 py-2 bg-green-500 text-white rounded w-full"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleCancel(account.ownerId)}
                              className="px-4 py-2 bg-gray-500 text-white rounded w-full"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(account.ownerId, account)}
                            className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(deleteAccount(account.ownerId))}
                            className="px-4 py-2 bg-red-500 text-white rounded w-full"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
                </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
