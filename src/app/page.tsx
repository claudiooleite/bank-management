"use client";

import { useState } from "react";
import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";

export default function Home() {
  const [editingAccount, setEditingAccount] = useState(null);

  return (
    <main>
      <h1>Bank Account Management</h1>
      <AccountForm
        existingAccount={editingAccount}
        clearEdit={() => setEditingAccount(null)}
      />
      <AccountList onEdit={setEditingAccount} />
    </main>
  );
}
