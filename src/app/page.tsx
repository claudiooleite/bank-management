"use client";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import { useState } from "react";

export default function Home() {
  const [editingAccount, setEditingAccount] = useState(null);

  return (
    <main>
      <h1>Bank Account Management</h1>
      <AccountForm
        existingAccount={editingAccount}
        clearEdit={() => setEditingAccount(null)}
      />
      <TransferForm />
      <AccountList onEdit={setEditingAccount} />
    </main>
  );
}
