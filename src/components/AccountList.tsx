"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  updateAccount,
  deleteAccount,
} from "../redux/slices/accountSlice";
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
  const [editedAccounts, setEditedAccounts] = useState<{ [key: string]: any }>(
    {},
  );

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
    setEditedAccounts((prev) => {
      const newState = { ...prev };
      delete newState[id]; // Remove from edit state after saving
      return newState;
    });
  };

  // Cancel Editing
  const handleCancel = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
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
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Owner Name</th>
              <th className="p-2 border">Currency</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.ownerId} className="hover:bg-gray-100">
                {/* Editable Owner Name */}
                <td className="p-2 border">
                  {editMode[account.ownerId] ? (
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
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>{account.ownerName}</span>
                  )}
                </td>

                {/* Editable Currency */}
                <td className="p-2 border">
                  {editMode[account.ownerId] ? (
                    <input
                      type="text"
                      value={
                        editedAccounts[account.ownerId]?.currency ??
                        account.currency
                      }
                      onChange={(e) =>
                        handleChange(
                          account.ownerId,
                          "currency",
                          e.target.value,
                        )
                      }
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>{account.currency}</span>
                  )}
                </td>

                {/* Editable Balance */}
                <td className="p-2 border">
                  {editMode[account.ownerId] ? (
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
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>${account.balance.toFixed(2)}</span>
                  )}
                </td>

                {/* Edit / Save & Delete Actions */}
                <td className="p-2 border flex gap-2">
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
      )}
    </div>
  );
}
