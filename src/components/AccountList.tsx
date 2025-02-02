"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAccounts, deleteAccount } from "../redux/slices/accountSlice";

export default function AccountList({
  onEdit,
}: {
  onEdit: (account: any) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div>
      <h2>Bank Accounts</h2>
      <table>
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.ownerId}>
              <td>{account.ownerId}</td>
              <td>{account.currency}</td>
              <td>{account.balance}</td>
              <td>
                <button onClick={() => onEdit(account)}>Edit</button>
                <button
                  onClick={() => dispatch(deleteAccount(account.ownerId))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
