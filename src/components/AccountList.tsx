"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AccountList() {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  return (
    <div>
      <h2>Bank Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            ID:{account.id}, Owner: {account.ownerId}, Currency:{" "}
            {account.currency}, Balance: {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}
